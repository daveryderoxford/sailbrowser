import 'package:flutter/material.dart';
import 'package:flutter_form_builder/flutter_form_builder.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:form_builder_validators/form_builder_validators.dart';
import 'package:go_router/go_router.dart';
import 'package:intl/intl.dart';
import 'package:loggy/loggy.dart';
import 'package:sailbrowser_flutter/common_widgets/responsive_center.dart';
import 'package:sailbrowser_flutter/common_widgets/will_pop_form.dart';

import '../race_series.dart';
import '../race_series_service.dart';

class EditRace extends ConsumerStatefulWidget {
  final String id;
  final Race? race;
  final RaceSeries series;

  const EditRace(
      {this.race, required this.series, required this.id, super.key});

  @override
  ConsumerState<EditRace> createState() => _EditRaceSeriesState();
}

class _EditRaceSeriesState extends ConsumerState<EditRace> with UiLoggy {
  final _formKey = GlobalKey<FormBuilderState>();

  Race? race;

  @override
  void initState() {
    super.initState();
    race = widget.race;
  }

  Future<void> _submit() async {
    final form = _formKey.currentState!;

    final boatService = ref.read(seriesProvider);

    if (form.isValid) {
      final formData = _formKey.currentState!.value;

      bool success;

   /*   if (race == null) {
        final update = Race(
            name: formData['name'],
            fleetId: formData['fleetId'],
            seriesId: series.id,
            startDate: DateTime(1970, 0, 0),
            endDate: DateTime(1970, 0, 0));
        success = await boatService.add(update);
      } else {
        final update = series!
            .copyWith(name: formData['name'], fleetId: formData['fleetId']);

        success = await boatService.update(update, update.id);
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
      } */
    }
  }

  @override
  Widget build(BuildContext context) {
    return WillPopForm(
        formKey: _formKey,
        child: Scaffold(
          appBar: AppBar(
            title: Text(
                widget.race == null ? 'New Race' : 'Edit Race Details'),
            actions: <Widget>[
              TextButton(
                //      onPressed: state.isLoading ? null : _submit,
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
          child: Padding(
            padding: const EdgeInsets.all(16.0),
            child: _buildForm(),
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

/*
    @Default(RaceSeries.unsetId) String id,
    required String name,
    required String fleetId, // from series 
    required String seriesId, // from series 

     @TimestampSerializer() required DateTime scheduledStart,  // Separate as date and time
     @TimestampSerializer()  required DateTime actualStart,

     @Default(RaceType.conventional) RaceType type,  // specified 
    @Default(RaceStatus.future) RaceStatus status,  // specified
    @Default(true) bool isDiscardable,  // specified 
    @Default(true) bool isAverageLap, // sepeciifed */

  List<Widget> _buildFormChildren() {
    return [
      FormBuilderDateTimePicker(
        name: "scheduledStartDate",
        initialEntryMode: DatePickerEntryMode.calendar,
        initialDate: race == null ? DateTime.now() : race!.scheduledStart,
        initialTime: const TimeOfDay(hour: 0, minute: 0),
        inputType: InputType.date,
        format: DateFormat("MM-dd-yyyy"),
        autovalidateMode: AutovalidateMode.onUserInteraction,
        decoration: const InputDecoration(labelText: "Scheduled date"),
      ),

      FormBuilderDateTimePicker(
        name: "scheduledStartTime",
        autovalidateMode: AutovalidateMode.onUserInteraction,
        initialEntryMode: DatePickerEntryMode.calendar,
        initialTime: race == null ? const TimeOfDay(hour: 0, minute: 0) : TimeOfDay(hour: race!.scheduledStart.hour, minute: race!.scheduledStart.minute),
        inputType: InputType.time,
        format: DateFormat("hh:mm"),
        decoration: const InputDecoration(labelText: "Scheduled date"),
      ), 
      FormBuilderDropdown<String>(
        name: 'type',
        initialValue: race == null ? RaceType.conventional.name : race?.type.name,
        decoration: const InputDecoration(
          labelText: 'Type',
        ),
        validator: FormBuilderValidators.required(),
        autovalidateMode: AutovalidateMode.onUserInteraction,
        items: RaceType.values
            .map((type) => DropdownMenuItem(
                  value: type.name,
                  child: Text(type.displayName),
                ))
            .toList(),
      ),
    ];
  }
}
