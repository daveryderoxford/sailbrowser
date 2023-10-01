import 'package:flutter/material.dart';
import 'package:form_builder_extra_fields/form_builder_extra_fields.dart';
import 'package:form_builder_validators/form_builder_validators.dart';

/// Typeahead form control that prmopts for classname based on classes 
/// present in a list of class names
class BoatClassTypeAhead extends StatelessWidget {
  const BoatClassTypeAhead({
    super.key,
    required this.name,
    required this.classNames,
    required this.initialValue,
    this.onChanged,
  });

  final String initialValue;
  final String name;
  final List<String> classNames;
  final Function(String?)? onChanged;

  @override
  Widget build(BuildContext context) {

    return FormBuilderTypeAhead<String>(
      decoration: const InputDecoration(
          labelText: 'Class', hintText: 'Start typing class to be prompted'),
      name: 'boatClass',
      itemBuilder: (context, className) {
        return ListTile(title: Text(className));
      },
      initialValue: initialValue,
      validator: FormBuilderValidators.required(
          errorText: 'A class is required to be selected'),
      onChanged: onChanged,
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
    );
  }
}