import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_form_builder/flutter_form_builder.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:form_builder_validators/form_builder_validators.dart';
import 'package:sailbrowser_flutter/features/club/domain/boat.dart';
import 'package:sailbrowser_flutter/features/club/presentation/widgets/boat_class_typeahead.dart';
import 'package:sailbrowser_flutter/features/club/domain/boats_service.dart';
import 'package:sailbrowser_flutter/features/race/domain/race_competitor.dart';
import 'package:sailbrowser_flutter/util/list_extensions.dart';

class EntryFormFields extends ConsumerWidget {
  const EntryFormFields({
    super.key,
    this.competitor,
  });

  final RaceCompetitor? competitor;

  List<String> _classNames(List<Boat>? boats) {
    final classNames = boats != null
        ? boats.map((boat) => boat.boatClass).toList().unique((c) => c)
        : <String>[];
    classNames.sort((a, b) => a.compareTo(b));
    return classNames;
  }

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final boats = ref.watch(allBoatProvider).valueOrNull;
    final classNames = _classNames(boats);

    return Column(
      children: [
        BoatClassTypeAhead(
          name: 'boatClass',
          classNames: classNames,
          initialValue: competitor != null ? competitor!.boatClass : "",
        ),
        FormBuilderTextField(
          name: 'sailNumber',
          initialValue:
              competitor != null ? competitor!.sailNumber.toString() : '0',
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
