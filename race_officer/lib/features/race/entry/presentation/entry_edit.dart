import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_form_builder/flutter_form_builder.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:form_builder_extra_fields/form_builder_extra_fields.dart';
import 'package:form_builder_validators/form_builder_validators.dart';
import 'package:go_router/go_router.dart';
import 'package:loggy/loggy.dart';
import 'package:sailbrowser_flutter/common_widgets/delete_button.dart';
import 'package:sailbrowser_flutter/common_widgets/null_widget.dart';
import 'package:sailbrowser_flutter/common_widgets/responsive_center.dart';
import 'package:sailbrowser_flutter/common_widgets/will_pop_form.dart';
import 'package:sailbrowser_flutter/features/club/presentation/boats_service.dart';
import 'package:sailbrowser_flutter/features/race-calander/domain/series.dart';
import 'package:sailbrowser_flutter/features/race-calander/domain/series_service.dart';
import 'package:sailbrowser_flutter/features/race/domain/race_competitor.dart';
import 'package:sailbrowser_flutter/features/race/domain/race_competitor_service.dart';
import 'package:sailbrowser_flutter/features/race/domain/selected_races.dart';
import 'package:sailbrowser_flutter/features/system/domain/boat_class.dart';
import 'package:sailbrowser_flutter/util/list_extensions.dart';
import 'package:uuid/uuid.dart';

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

  Future<void> _submit() async {
    final form = _formKey.currentState!;
    form.saveAndValidate();

    final competitorService = ref.read(raceCompetitorRepositoryProvider);

    if (form.isValid) {
      final formData = _formKey.currentState!.value;

      bool success = false;

      if (raceCompetitor == null) {
        for (var race in formData['races']) {
          final update = RaceCompetitor(
            id: const Uuid().v4(),
            boatClass: formData['boatClass'],
            sailNumber: formData['sailNumber'],
            helm: formData['helm'],
            crew: formData['crew'],
            raceId: race.id,
            handicap: 0, // _getHandicap(race, formData['boatClass']),
          );

          success = await competitorService.add(update, race.seriesId);

          if (!success) break;
        }
      } else {
        final update = raceCompetitor!.copyWith(
          boatClass: formData['boatClass'],
          sailNumber: formData['sailNumber'],
          helm: formData['helm'],
          crew: formData['crew'],
        );

        success = await competitorService.update(
            update, update.id, _getSeriesId(update));
      }

      if (success) {
        if (context.mounted) {
          context.pop();
        }
      } else {
        SnackBar(
          content: const Text('Error encountered saving series'),
          action: SnackBarAction(
            label: 'Discard changes',
            onPressed: () {
              if (context.mounted) {
                context.pop();
              }
            },
          ),
        );
        loggy.error('Error encountered saving series');
      }
    }
  }

  String _getSeriesId(RaceCompetitor competitor) {
    final seriesProvider = ref.read(allRacesProvider);
    final allRaces = seriesProvider.valueOrNull;

    final race = allRaces?.firstWhere((r) => r.id == raceCompetitor!.raceId);
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
                          _getSeriesId(raceCompetitor!),
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
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: _buildFormChildren(),
      ),
    );
  }

  List<Widget> _buildFormChildren() {
    // final classes = ref.watch(allClassesProvider);
    final boats = ref.watch(allBoatProvider).valueOrNull;

    final classNames = boats != null
        ? boats.map((boat) => boat.sailingClass).toList().unique((c) => c)
        : <String>[];
    classNames.sort((a, b) => a.compareTo(b));

    return [
      FormBuilderTypeAhead<String>(
        decoration: const InputDecoration(
            labelText: 'Class', hintText: 'Start typing class to be prompted'),
        name: 'boatClass',
        itemBuilder: (context, className) {
          return ListTile(title: Text(className));
        },
        initialValue: (raceCompetitor != null) ? raceCompetitor!.boatClass : '',
        validator: FormBuilderValidators.required(
            errorText: 'A class is required to be selected'),
        autovalidateMode: AutovalidateMode.onUserInteraction,
        hideOnEmpty: true,
        suggestionsCallback: (query) {
          if (query.isNotEmpty) {
            final q = query.toLowerCase();
            return classNames.where((b) => b.toLowerCase().startsWith(q));
          } else {
            return classNames;
          }
        },
      ),
      /*  FormBuilderTypeAhead<int>(
        decoration: const InputDecoration(
          labelText: 'Sail number',
        ),
        name: 'sailNumber',
        itemBuilder: (context, sailNumber) {
          // return ListTile(title: SailNumber(num: boat.sailNumber));
          return ListTile(
            title: Text(sailNumber.toString()),
          );
        }, 
        controller: TextEditingController(text: ''),
        validator: FormBuilderValidators.required(),
        autovalidateMode: AutovalidateMode.onUserInteraction,
        hideOnEmpty: true,
        selectionToTextTransformer: (sailNumber) => sailNumber.toString(),
        suggestionsCallback: (query) {
          final selectedBoatClass =
              _formKey.currentState?.value['boatClass']?.toLowerCase();
          return boats!
              .where((b) =>
                  b.sailingClass.toLowerCase() == selectedBoatClass &&
                  b.sailNumber.toString().startsWith(query))
              .map((b) => b.sailNumber);
        },
      ), */
      FormBuilderTextField(
        name: 'sailNumber',
        initialValue: raceCompetitor != null
            ? raceCompetitor!.sailNumber.toString()
            : '0',
        autovalidateMode: AutovalidateMode.onUserInteraction,
        decoration: const InputDecoration(
          labelText: 'Sail number',
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
      FormBuilderTextField(
        decoration: const InputDecoration(
          labelText: 'Helm',
        ),
        name: 'helm',
        initialValue: (raceCompetitor != null) ? raceCompetitor!.helm : '',
        validator: FormBuilderValidators.required(),
        autovalidateMode: AutovalidateMode.onUserInteraction,
      ),
      FormBuilderTextField(
        decoration: const InputDecoration(
          labelText: 'Crew',
        ),
        name: 'crew',
        initialValue: (raceCompetitor != null) ? raceCompetitor!.crew : '',
      ),
      _buildRaces(context),
    ];
  }

  Widget _buildRaces(BuildContext context) {
    if (raceCompetitor != null) return const NullWidget();
    final raceData = ref.watch(selectedRacesProvider).toList();
    return FormBuilderFilterChip<Race>(
      name: 'races',
      initialValue: raceData.map((data) => data.race).toList(),
      validator: FormBuilderValidators.required(
          errorText: 'At least one race must be selected'),
      autovalidateMode: AutovalidateMode.onUserInteraction,
      direction: Axis.vertical,
      options: raceData.map(
        (data) {
          return FormBuilderChipOption(
            value: data.race,
            child: Text('${data.series.name} - ${data.race.name} '),
          );
        },
      ).toList(),
    );
  }
}
