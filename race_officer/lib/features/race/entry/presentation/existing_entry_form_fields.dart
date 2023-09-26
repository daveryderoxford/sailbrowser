import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_form_builder/flutter_form_builder.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:form_builder_extra_fields/form_builder_extra_fields.dart';
import 'package:form_builder_validators/form_builder_validators.dart';
import 'package:sailbrowser_flutter/features/club/presentation/boats_service.dart';
import 'package:sailbrowser_flutter/features/race/domain/race_competitor.dart';
import 'package:sailbrowser_flutter/util/list_extensions.dart';

class ExistingEntryFormFields extends ConsumerWidget {
  const ExistingEntryFormFields({
    super.key,
    this.competitor,
  });

  final RaceCompetitor? competitor;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final boats = ref.watch(allBoatProvider).valueOrNull;

    final classNames = boats != null
        ? boats.map((boat) => boat.sailingClass).toList().unique((c) => c)
        : <String>[];
    classNames.sort((a, b) => a.compareTo(b));

    return Column(
      children: [
        FormBuilderTypeAhead<String>(
          decoration: const InputDecoration(
              labelText: 'Class',
              hintText: 'Start typing class to be prompted'),
          name: 'boatClass',
          itemBuilder: (context, className) {
            return ListTile(title: Text(className));
          },
          initialValue:
              (competitor != null) ? competitor!.boatClass : '',
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
        /*   FormBuilderTypeAhead<int>(
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
          initialValue: competitor != null
              ? competitor!.sailNumber.toString()
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