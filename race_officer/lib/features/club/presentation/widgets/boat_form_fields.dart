import 'package:flutter/material.dart';
import 'package:flutter_form_builder/flutter_form_builder.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:form_builder_validators/form_builder_validators.dart';
import 'package:sailbrowser_flutter/common_widgets/form_builder_integer_field.dart';
import 'package:sailbrowser_flutter/features/club/domain/boat.dart';
import 'package:sailbrowser_flutter/features/club/domain/clubs_service.dart';
import 'package:sailbrowser_flutter/features/club/presentation/widgets/boat_class_typeahead.dart';
import 'package:sailbrowser_flutter/features/results/scoring/race_scoring.dart';

class BoatFormFields extends ConsumerWidget {
  const BoatFormFields({
    super.key,
    this.boat,
  });

  final Boat? boat;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final boatClasses = ref.watch(allBoatClassesProvider(HandicapScheme.py));

    final classNames = boatClasses.map((bc) => bc.name).toList();

    return Column(crossAxisAlignment: CrossAxisAlignment.stretch, children: [
      BoatClassTypeAhead(
        name: 'boatClass',
        classNames: classNames,
        initialValue: (boat != null) ? boat!.boatClass : "",
      ),
      FormBuilderIntegerField(
        name: 'sailNumber',
        initialValue: boat?.sailNumber,
        decoration: const InputDecoration(labelText: 'Sail number'),
        minValue: 1,
      ),
      FormBuilderDropdown<String>(
        name: 'type',
        autovalidateMode: AutovalidateMode.onUserInteraction,
        initialValue: boat?.type.name,
        decoration: const InputDecoration(
          labelText: 'Type',
        ),
        validator: FormBuilderValidators.required(),
        items: BoatType.values
            .map((type) => DropdownMenuItem(
                  value: type.name,
                  child: Text(type.displayName),
                ))
            .toList(),
      ),
      FormBuilderTextField(
        name: 'name',
        decoration: const InputDecoration(labelText: 'Boat name'),
      ),
      FormBuilderTextField(
        name: 'helm',
        decoration: const InputDecoration(labelText: 'Helm'),
      ),
      FormBuilderTextField(
        name: 'crew',
        decoration: const InputDecoration(labelText: 'Crew'),
      ),
      FormBuilderTextField(
        name: 'owner',
        decoration: const InputDecoration(labelText: 'Owner'),
      ),
    ]);
  }
}
