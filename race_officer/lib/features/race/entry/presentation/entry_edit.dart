import 'package:flutter/material.dart';
import 'package:flutter_form_builder/flutter_form_builder.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:loggy/loggy.dart';
import 'package:sailbrowser_flutter/common_widgets/delete_button.dart';
import 'package:sailbrowser_flutter/common_widgets/responsive_center.dart';
import 'package:sailbrowser_flutter/common_widgets/will_pop_form.dart';
import 'package:sailbrowser_flutter/features/race-calander/domain/series.dart';
import 'package:sailbrowser_flutter/features/race-calander/domain/series_service.dart';
import 'package:sailbrowser_flutter/features/race/domain/race_competitor.dart';
import 'package:sailbrowser_flutter/features/race/domain/race_competitor_service.dart';
import 'package:sailbrowser_flutter/features/system/domain/boat_class.dart';
import 'package:uuid/uuid.dart';

import 'existing_entry_form_fields.dart';
import 'select_races_filter_chip.dart';

class EditEntry extends ConsumerStatefulWidget {
  final String id;
  final RaceCompetitor? raceCompetitor;

  const EditEntry({this.raceCompetitor, required this.id, super.key});

  @override
  ConsumerState<EditEntry> createState() => _EditSeriesState();
}

class _EditSeriesState extends ConsumerState<EditEntry> with UiLoggy {
  final _formKey = GlobalKey<FormBuilderState>();

  RaceCompetitor? raceCompetitor;
  String? selectedClass;
  String selectedView = 'existing';

  @override
  void initState() {
    super.initState();
    raceCompetitor = widget.raceCompetitor;
  }

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

      if (raceCompetitor == null) {
        for (var race in formData['races']) {
          final update = RaceCompetitor(
            id: const Uuid().v4(),
            boatClass: formData['boatClass'],
            sailNumber: formData['sailNumber'],
            helm: formData['helm'],
            crew: formData['crew'],
            raceId: race.id,
            seriesId: _getSeriesId(race.id),
            handicap: 0, // TODO getHandicap(race, formData['boatClass']),
          );

          competitorService.add(update, race.seriesId);
        }
      } else {
        final update = raceCompetitor!.copyWith(
          boatClass: formData['boatClass'],
          sailNumber: formData['sailNumber'],
          helm: formData['helm'],
          crew: formData['crew'],
        );

        competitorService.update(update, update.id, update.seriesId);
      }

      if (context.mounted) {
        context.pop();
      }
    }
  }

  String _getSeriesId(String raceId) {
    final allRaces = ref.read(allRacesProvider).valueOrNull;
    final race = allRaces?.firstWhere((r) => r.id == raceId);
    return (race!.seriesId);
  }

  @override
  Widget build(BuildContext context) {
    return WillPopForm(
        formKey: _formKey,
        child: Scaffold(
          appBar: AppBar(
            title: Text(widget.raceCompetitor == null
                ? 'New Entry'
                : 'Edit Entry Details'),
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
              SegmentedButton<String>(
                segments: const <ButtonSegment<String>>[
                  ButtonSegment<String>(
                    value: 'existing',
                    label: Text('Existing boat'),
                  ),
                  ButtonSegment<String>(
                    value: 'new',
                    label: Text('Create new boat'),
                  ),
                ],
                selected: <String>{selectedView},
                onSelectionChanged: (Set<String> newSelection) {
                  setState(() {
                    selectedView = newSelection.first;
                  });
                },
              ),
              Padding(
                padding: const EdgeInsets.all(16.0),
                child: _buildForm(),
              ),
              DeleteButton(
                itemName: 'entry',
                visible: raceCompetitor != null,
                onDelete: () {
                  ref.read(raceCompetitorRepositoryProvider).remove(
                        raceCompetitor!.id,
                        raceCompetitor!.seriesId,
                      );
                  context.pop();
                },
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
        ExistingEntryFormFields(competitor: raceCompetitor),
        SelectRacesFilterChip(competitor: raceCompetitor),
      ]),
    );
  }
}
