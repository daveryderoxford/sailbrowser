import 'package:flutter/material.dart';
import 'package:flutter_form_builder/flutter_form_builder.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:loggy/loggy.dart';
import 'package:sailbrowser_flutter/common_widgets/delete_button.dart';
import 'package:sailbrowser_flutter/common_widgets/responsive_center.dart';
import 'package:sailbrowser_flutter/common_widgets/will_pop_form.dart';
import 'package:sailbrowser_flutter/features/club/domain/clubs_service.dart';
import 'package:sailbrowser_flutter/features/race/domain/race_competitor.dart';
import 'package:sailbrowser_flutter/features/race/domain/race_competitor_service.dart';
import 'package:sailbrowser_flutter/features/results/scoring/race_scoring.dart';

import 'widgets/entry_form_fields.dart';

/// Screen to edit an entry.  
/// Use AddEnty screento add an entry
class EditEntry extends ConsumerStatefulWidget {
  final String id;
  final RaceCompetitor raceCompetitor;

  const EditEntry({required this.raceCompetitor, required this.id, super.key});

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
  _submit() {
    final form = _formKey.currentState!;
    form.saveAndValidate();

    final competitorService = ref.read(raceCompetitorRepositoryProvider);


    if (form.isValid) {
      final formData = _formKey.currentState!.value;

      final boatClasses = ref.read(allBoatClassesProvider(HandicapScheme.py)); // TO DO to add suppor for multiple handicap schemes
      final handicap = boatClasses.firstWhere((bs) => bs.name == formData['boatClass']).handicap;  

      final update = raceCompetitor!.copyWith(
        boatClass: formData['boatClass'],
        sailNumber: formData['sailNumber1'],
        helm: formData['helm'],
        crew: formData['crew'],
        handicap: handicap,
      );

      competitorService.update(update, update.id, update.seriesId);
    }

    if (context.mounted) {
      context.pop();
    }
  }

  @override
  Widget build(BuildContext context) {
    return WillPopForm(
        formKey: _formKey,
        child: Scaffold(
          appBar: AppBar(
            title: const Text( 'Edit Entry Details'),
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
        EntryFormFields(competitor: raceCompetitor),
      ]),
    );
  }
}
