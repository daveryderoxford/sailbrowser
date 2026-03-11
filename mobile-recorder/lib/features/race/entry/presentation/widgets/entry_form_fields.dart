import 'package:flutter/material.dart';
import 'package:flutter_form_builder/flutter_form_builder.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:form_builder_validators/form_builder_validators.dart';
import 'package:loggy/loggy.dart';
import 'package:sailbrowser_flutter/features/club/domain/boat.dart';
import 'package:sailbrowser_flutter/features/club/domain/boats_service.dart';
import 'package:sailbrowser_flutter/features/club/presentation/widgets/boat_class_typeahead.dart';
import 'package:sailbrowser_flutter/features/race/domain/race_competitor.dart';
import 'package:sailbrowser_flutter/features/race/entry/presentation/widgets/boats_filter.dart';
import 'package:sailbrowser_flutter/features/race/entry/presentation/widgets/sail_number_typeahead.dart';
import 'package:sailbrowser_flutter/util/list_extensions.dart';

class EntryFormFields extends ConsumerWidget with UiLoggy {
  const EntryFormFields({super.key, this.competitor, required this.formKey});

  final RaceCompetitor? competitor;
  final GlobalKey<FormBuilderState> formKey;

  List<String> _classNames(List<Boat>? boats) {
    final classNames = boats != null
        ? boats.map((boat) => boat.boatClass).toList().unique((c) => c)
        : <String>[];
    classNames.sort((a, b) => a.compareTo(b));
    return classNames;
  }

  List<int> _sailNumbers(List<Boat>? boats) {
    final sailNumbers = boats != null
        ? boats.map((boat) => boat.sailNumber).toList().unique((c) => c)
        : <int>[];
    sailNumbers.sort((a, b) => a - b);
    return sailNumbers;
  }

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final allBoats = ref.watch(allBoatProvider).valueOrNull;
    final classNames = _classNames(allBoats);

    final filtered = ref.watch(filteredBoats);
    final sailNumbers = _sailNumbers(filtered);

    return Column(
      children: [
        BoatClassTypeAhead(
            name: 'boatClass',
            classNames: classNames,
            initialValue: competitor != null ? competitor!.boatClass : "",
            onChanged: (val) {
              ref.read(classBoatFilter.notifier).state = val;
              formKey.currentState?.patchValue({'sailNumber1': 0});
            }), 
        SailNumberTypeAhead(
          name: 'sailNumber1',
          boats: filtered,
          initialValue: null, // competitor != null ? competitor!.sailNumber : 0,
          onChanged: (val) {
            if (val != null) {
              //final boat =
              //    filtered.firstWhere((boat) => boat.sailNumber == val);
              formKey.currentState
                  ?.patchValue({'helm': val.helm, 'crew': val.crew});
            }
          },
        ),
        FormBuilderTextField(
          decoration: const InputDecoration(
            labelText: 'Helm',
          ),
          name: 'helm',
          initialValue: (competitor != null) ? competitor!.helm : '',
          validator: FormBuilderValidators.required(),
          autovalidateMode: AutovalidateMode.onUserInteraction,
        ),
        FormBuilderTextField(
          decoration: const InputDecoration(
            labelText: 'Crew',
          ),
          name: 'crew',
          initialValue: (competitor != null) ? competitor!.crew : '',
        ),
      ],
    );
  }
}
