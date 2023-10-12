import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_typeahead/flutter_typeahead.dart';
import 'package:form_builder_extra_fields/form_builder_extra_fields.dart';
import 'package:form_builder_validators/form_builder_validators.dart';

/// Typeahead form control that prmopts for classname based on classes
/// present in a list of class names
class SailNumberTypeAhead extends StatelessWidget {
  const SailNumberTypeAhead({
    super.key,
    required this.name,
    required this.sailNumbers,
    required this.initialValue,
    this.onChanged,
  });

  final int initialValue;
  final String name;
  final List<int> sailNumbers;
  final Function(int?)? onChanged;
  final minValue = 0;

  @override
  Widget build(BuildContext context) {
    return FormBuilderTypeAhead<int>(
      decoration: const InputDecoration(
          labelText: 'Sail number',
          hintText: 'Start sail number to be prompted'),
      name: name,
      initialValue: initialValue,
      onChanged: (value) => (onChanged !=null) ? onChanged!(value) : null,
      itemBuilder: (context, sn) {
        return ListTile(title: Text(sn.toString()));
      },
      autovalidateMode: AutovalidateMode.onUserInteraction,
      validator: FormBuilderValidators.compose([
        FormBuilderValidators.required(),
        FormBuilderValidators.min(minValue),
      ]),
      suggestionsCallback: (query) =>
         sailNumbers.where((sn) => query == '0' || sn.toString().startsWith(query)),
      selectionToTextTransformer:(suggestion) => suggestion.toString(),
      textFieldConfiguration: TextFieldConfiguration(
          keyboardType: const TextInputType.numberWithOptions(
          signed: false,
          decimal: false,
        ),
        inputFormatters: <TextInputFormatter>[
          FilteringTextInputFormatter.digitsOnly
        ],
        textInputAction: TextInputAction.next,
        textAlign: TextAlign.start,
      ), 
    );
  }
}