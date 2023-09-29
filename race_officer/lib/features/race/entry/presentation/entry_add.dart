import 'package:flutter/material.dart';
import 'package:flutter_form_builder/flutter_form_builder.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:loggy/loggy.dart';
import 'package:sailbrowser_flutter/common_widgets/responsive_center.dart';
import 'package:sailbrowser_flutter/common_widgets/will_pop_form.dart';
import 'package:sailbrowser_flutter/features/club/presentation/boat_edit.dart';
import 'package:sailbrowser_flutter/features/race-calander/domain/series.dart';
import 'package:sailbrowser_flutter/features/race-calander/domain/series_service.dart';
import 'package:sailbrowser_flutter/features/race/domain/race_competitor.dart';
import 'package:sailbrowser_flutter/features/race/domain/race_competitor_service.dart';
import 'package:sailbrowser_flutter/features/system/domain/boat_class.dart';
import 'package:uuid/uuid.dart';

import 'widgets/entry_form_fields.dart';
import 'widgets/select_races_filter_chip.dart';

enum AddEntryMode { existingBoat, newBoat }

class AddEntry extends ConsumerStatefulWidget {
  const AddEntry({super.key});

  @override
  ConsumerState<AddEntry> createState() => _AddSeriesState();
}

class _AddSeriesState extends ConsumerState<AddEntry> with UiLoggy {
  final _formKey = GlobalKey<FormBuilderState>();

  String? selectedClass;
  AddEntryMode entryMode = AddEntryMode.existingBoat;

  num _getHandicap(Race race, BoatClass boatClass) {
    // TODO - look up handlicap based on algorithm
    return (0);
  }

  _submit() {
    final form = _formKey.currentState!;
    form.saveAndValidate();

    final competitorService = ref.read(raceCompetitorRepositoryProvider);

    if (form.isValid) {
      final formData = _formKey.currentState!.value;

      for (var race in formData['races']) {
        RaceCompetitor update;

        switch (entryMode) {
          case AddEntryMode.existingBoat:
            update = RaceCompetitor(
              id: const Uuid().v4(),
              boatClass: formData['boatClass'],
              sailNumber: formData['sailNumber'],
              helm: formData['helm'],
              crew: formData['crew'],
              raceId: race.id,
              seriesId: ref.read(raceProvider(race.id))!.seriesId,
              handicap: 0, // TODO getHandicap(race, formData['boatClass']),
            );
          case AddEntryMode.newBoat:
            update = RaceCompetitor(
              id: const Uuid().v4(),
              boatClass: formData['boatClass'],
              sailNumber: formData['sailNumber'],
              helm: formData['helm'],
              crew: formData['crew'],
              raceId: race.id,
              seriesId: ref.read(raceProvider(race.id))!.seriesId,
              handicap: 0, // TODO getHandicap(race, formData['boatClass']),
            );
        }

        competitorService.add(update, race.seriesId);
      }

      if (context.mounted) {
        context.pop();
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return WillPopForm(
        formKey: _formKey,
        child: Scaffold(
          appBar: AppBar(
            title: const Text('New Entry'),
            actions: <Widget>[
              FilledButton(
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
              SegmentedButton<AddEntryMode>(
                segments: const <ButtonSegment<AddEntryMode>>[
                  ButtonSegment<AddEntryMode>(
                    value: AddEntryMode.existingBoat,
                    label: Text('Existing boat'),
                  ),
                  ButtonSegment<AddEntryMode>(
                    value: AddEntryMode.newBoat,
                    label: Text('Create new boat'),
                  ),
                ],
                selected: <AddEntryMode>{entryMode},
                onSelectionChanged: (Set<AddEntryMode> newSelection) {
                  setState(() {
                    entryMode = newSelection.first;
                  });
                },
              ),
              Padding(
                padding: const EdgeInsets.all(16.0),
                child: _buildForm(),
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
        loggy.info(_formKey.currentState!.value.toString());
      },
      child: Column(crossAxisAlignment: CrossAxisAlignment.stretch, children: [
        if (entryMode == AddEntryMode.existingBoat)
          const EntryFormFields(competitor: null)
        else
          Column(
            children: [
              const BoatFormFields(),
              FormBuilderSwitch(
                name: 'saveBoat',
                title: const Text('Save Boat details'),
                subtitle: const Text('If selected boat detailds will be saved to database of boats'),
                initialValue: false,
                controlAffinity: ListTileControlAffinity.leading
              )
            ],
          ),
        const SelectRacesFilterChip(competitor: null),
      ]),
    );
  }
}
