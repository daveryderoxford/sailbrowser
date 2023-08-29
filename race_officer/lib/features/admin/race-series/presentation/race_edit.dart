import 'package:flutter/material.dart';
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
  ConsumerState<EditRace> createState() => _EditRaceSeriesState();
}

class _EditRaceSeriesState extends ConsumerState<EditRace> with UiLoggy {
  final _formKey = GlobalKey<FormBuilderState>();

  Race? race;
  Series? series;

  @override
  void initState() {
    super.initState();
    race = widget.race;
    series = widget.series;
  }

  Future<void> _submit() async {
    _formKey.currentState?.saveAndValidate();
    final form = _formKey.currentState!;

    final raceSeriesService = ref.read(seriesRepositoryProvider);

    if (form.isValid) {
      final formData = _formKey.currentState!.value;

      bool success;

      final DateTime startDate = formData['scheduledStartDate'];
      final DateTime startTime = formData['scheduledStartTime'];
      final duration =
          Duration(hours: startTime.hour, minutes: startTime.minute);
      final DateTime startDateTime = startDate.add(duration);

      if (race == null) {
        final update = Race(
          fleetId: series!.fleetId,
          seriesId: series!.id,
          actualStart: DateTime(1970, 1, 1),
          scheduledStart: startDateTime,
          type: formData['type'],
          isDiscardable: formData['isDiscardable'],
          isAverageLap: formData['isAverageLap'],
        );

        success = await raceSeriesService.addRace(series!, update);
      } else {
        final update = race!.copyWith(
            type: formData['type'],
            isDiscardable: formData['isDiscardable'],
            isAverageLap: formData['isAverageLap'],
            scheduledStart: startDateTime);

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
    final initialDate =
        race == null ? _defaultDate(series!.races) : DateTime(s!.year, s.month, s.day);
     final initialTime =
        race == null ? _defaultTime(series!.races) : DateTime(1970, 1, 1, s!.hour, s.minute);

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
      FormBuilderDateTimePicker(
        name: "scheduledStartTime",
        autovalidateMode: AutovalidateMode.onUserInteraction,
        initialEntryMode: DatePickerEntryMode.input,
        initialValue: initialTime,
        inputType: InputType.time,
        format: DateFormat.Hm(),
        decoration: const InputDecoration(labelText: "Scheduled time"),
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

/// Returns default time
///   10:30 if no reaces exist
///   Same as last race in the series if one exists
    static DateTime _defaultTime(List<Race> races) {
    if (races.isEmpty) {
      return DateTime(1970, 1, 1, 10, 30);
    } else {
      final d = races.last.scheduledStart;
      return DateTime(1970, 1, 1, d.hour, d.minute);
    }
  }
}
