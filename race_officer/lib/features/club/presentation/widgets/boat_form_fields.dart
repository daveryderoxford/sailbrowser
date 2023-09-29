import 'package:flutter/material.dart';
import 'package:flutter_form_builder/flutter_form_builder.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:form_builder_validators/form_builder_validators.dart';
import 'package:sailbrowser_flutter/features/club/domain/boat.dart';
import 'package:sailbrowser_flutter/features/club/domain/boats_service.dart';
import 'package:sailbrowser_flutter/features/club/presentation/widgets/boat_class_typeahead.dart';

class BoatFormFields extends ConsumerWidget {
  const BoatFormFields({
    super.key,
    this.boat,
  });

  final Boat? boat;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final classNames =<String>['Laser', 'Merlin Rocket'];

    return Column(crossAxisAlignment: CrossAxisAlignment.stretch, children: [
      BoatClassTypeAhead(
        name: 'boatClass',
        classNames: classNames,
        initialValue: (boat != null) ? boat!.boatClass : "",
      ),
      FormBuilderTextField(
        name: 'sailNumber',
        decoration: const InputDecoration(labelText: 'Sail number'),
        autovalidateMode: AutovalidateMode.onUserInteraction,
        valueTransformer: (text) => text != null ? num.tryParse(text) : null,
        validator: FormBuilderValidators.compose([
          FormBuilderValidators.required(),
          FormBuilderValidators.numeric(),
        ]),
        initialValue: boat?.sailNumber.toString(),
        keyboardType: const TextInputType.numberWithOptions(
          signed: false,
          decimal: false,
        ),
        textInputAction: TextInputAction.next,
        textAlign: TextAlign.start,
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
