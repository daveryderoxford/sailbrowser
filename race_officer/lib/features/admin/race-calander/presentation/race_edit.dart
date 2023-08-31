import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_form_builder/flutter_form_builder.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:form_builder_validators/form_builder_validators.dart';
import 'package:go_router/go_router.dart';
import 'package:intl/intl.dart';
import 'package:loggy/loggy.dart';
import 'package:sailbrowser_flutter/common_widgets/delete_button.dart';
import 'package:sailbrowser_flutter/common_widgets/responsive_center.dart';
import 'package:sailbrowser_flutter/common_widgets/will_pop_form.dart';

import '../series.dart';
import '../series_service.dart';

class EditRace extends ConsumerStatefulWidget {
  final String id;
  final Race? race;
  final Series series;

  const EditRace(
      {this.race, required this.series, required this.id, super.key});

  @override
  ConsumerState<EditRace> createState() => _EditSeriesState();
}

class _EditSeriesState extends ConsumerState<EditRace> with UiLoggy {
  final _formKey = GlobalKey<FormBuilderState>();

  Race? race;
  Series? series;

  @override
  void initState() {
    super.initState();
    race = widget.race;
    series = widget.series;
  }

  Future<bool> _duplicateGroupWarning(BuildContext context, Race update) {
  
    final bool duplicateExists = series!.races.where((r) =>
        update.id != r.id &&
        r.scheduledStart == update.scheduledStart &&
        r.raceOfDay == update.raceOfDay).isNotEmpty;

    if (duplicateExists) {
      // To do make this a dialog rather than just prohibiting it without a warning 
     return Future.value(true);
    } else {
      return Future.value(false);
    }
  }

  Future<void> _submit() async {
    _formKey.currentState?.saveAndValidate();
    final form = _formKey.currentState!;

    final raceSeriesService = ref.read(seriesRepositoryProvider);

    if (form.isValid) {
      final formData = _formKey.currentState!.value;

      bool success;

      final DateTime startDate = formData['scheduledStartDate'];
      final int raceOfDay = formData['raceOfDay'];

      if (race == null) {
        final update = Race(
          fleetId: series!.fleetId,
          seriesId: series!.id,
          scheduledStart: startDate,
          type: formData['type'],
          raceOfDay: raceOfDay,
          isDiscardable: formData['isDiscardable'],
          isAverageLap: formData['isAverageLap'],
        );

        if (await _duplicateGroupWarning(context, update)) {
          return;
        }

        success = await raceSeriesService.addRace(series!, update);
      } else {
        final update = race!.copyWith(
          type: formData['type'],
          isDiscardable: formData['isDiscardable'],
          isAverageLap: formData['isAverageLap'],
          scheduledStart: startDate,
          raceOfDay: raceOfDay,
        );

        if (await _duplicateGroupWarning(context, update)) {
          return;
        }

        success =
            await raceSeriesService.updateRace(series!, update.id, update);
      }
      if (success) {
        // ignore: use_build_context_synchronously
        context.pop();
      } else {
        SnackBar(
          content: const Text('Error encountered saving series'),
          action: SnackBarAction(
            label: 'Discard changes',
            onPressed: () {
              context.pop();
            },
          ),
        );
        loggy.error('Error encountered saving race');
      }
    }
  }

  _deleteRace() {
    final raceSeriesService = ref.read(seriesRepositoryProvider);
    raceSeriesService.removeRace(series!, race!.id);
    context.pop();
  }

  @override
  Widget build(BuildContext context) {
    return WillPopForm(
        formKey: _formKey,
        child: Scaffold(
          appBar: AppBar(
            title: Text(widget.race == null ? 'New Race' : 'Edit Race Details'),
            actions: <Widget>[
              TextButton(
                onPressed: _submit,
                child: const Text(
                  'Save',
                ),
              ),
            ],
          ),
          body: _buildContents(),
        ));
  }

  Widget _buildContents() {
    return SingleChildScrollView(
      child: ResponsiveCenter(
        maxContentWidth: 600,
        padding: const EdgeInsets.all(16.0),
        child: Card(
          child: Column(
            children: [
              Padding(
                padding: const EdgeInsets.all(16.0),
                child: _buildForm(),
              ),
              DeleteButton(
                itemName: 'race',
                visible: race != null,
                onDelete: _deleteRace,
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildForm() {
    return FormBuilder(
      key: _formKey,
      onChanged: () {
        _formKey.currentState!.save();
        debugPrint(_formKey.currentState!.value.toString());
      },
      initialValue: race != null ? race!.toJson() : {},
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: _buildFormChildren(),
      ),
    );
  }

  List<Widget> _buildFormChildren() {
    final DateTime? s = (race == null) ? null : race!.scheduledStart;
    final initialDate = race == null
        ? _defaultDate(series!.races)
        : DateTime(s!.year, s.month, s.day);

    return [
      FormBuilderDateTimePicker(
        name: "scheduledStartDate",
        initialEntryMode: DatePickerEntryMode.calendar,
        initialValue: initialDate,
        inputType: InputType.date,
        format: DateFormat("MMM-dd-yyyy"),
        autovalidateMode: AutovalidateMode.onUserInteraction,
        decoration: const InputDecoration(labelText: "Scheduled date"),
      ),
      FormBuilderDropdown<RaceType>(
        name: 'type',
        initialValue: race == null ? RaceType.conventional : race?.type,
        decoration: const InputDecoration(
          labelText: 'Type',
        ),
        validator: FormBuilderValidators.required(),
        autovalidateMode: AutovalidateMode.onUserInteraction,
        items: RaceType.values
            .map((type) => DropdownMenuItem(
                  value: type,
                  child: Text(type.displayName),
                ))
            .toList(),
      ),
      FormBuilderTextField(
        name: 'raceOfDay',
        initialValue: race != null ? race!.raceOfDay.toString() : '1',
        autovalidateMode: AutovalidateMode.onUserInteraction,
        decoration: const InputDecoration(
          labelText: 'Start of day (for fleet)',
          helperText: "eg Morning=1,  Afternoon=2",
        ),
        validator: FormBuilderValidators.compose([
          FormBuilderValidators.integer(),
          FormBuilderValidators.min(1),
          FormBuilderValidators.required()
        ]),
        keyboardType: TextInputType.number,
        inputFormatters: <TextInputFormatter>[
          FilteringTextInputFormatter.digitsOnly
        ],
        valueTransformer: (text) => text != null ? num.tryParse(text) : null,
      ),
      FormBuilderCheckbox(
        name: "isDiscardable",
        initialValue: race != null ? race!.isDiscardable : true,
        title: const Text("Is discardable"),
      ),
      FormBuilderCheckbox(
        name: "isAverageLap",
        initialValue: race != null ? race!.isAverageLap : true,
        title: const Text("Is avarage lap"),
      ),
    ];
  }

  /// Returns default start date based on
  ///   Now if no races
  ///   7 days after last race in series if one exists
  ///  Time is set to 00:00:00
  static DateTime _defaultDate(List<Race> races) {
    if (races.isEmpty) {
      final now = DateTime.now();
      return DateTime(now.year, now.month, now.day, 0, 0, 0);
    } else {
      final d = races.last.scheduledStart.add(const Duration(days: 7));
      return DateTime(d.year, d.month, d.day, 0, 0, 0);
    }
  }
}
