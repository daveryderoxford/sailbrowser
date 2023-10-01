// Positive integer form field
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_form_builder/flutter_form_builder.dart';
import 'package:form_builder_validators/form_builder_validators.dart';

class FormBuilderIntegerField extends StatelessWidget {
  const FormBuilderIntegerField({
    super.key,
    required this.name,
    required this.initialValue,
    required this.decoration,
    this.minValue,
  });

  final String name;
  final int? initialValue;
  final InputDecoration decoration;
  final int? minValue;

  @override
  Widget build(BuildContext context) {
    return FormBuilderTextField(
      name: name,
      decoration: decoration,
      autovalidateMode: AutovalidateMode.onUserInteraction,
      valueTransformer: (text) => text != null ? num.tryParse(text) : null,
      validator: FormBuilderValidators.compose([
        FormBuilderValidators.required(),
        FormBuilderValidators.integer(),
        if (minValue != null) FormBuilderValidators.min(minValue!),
      ]),
      initialValue: initialValue?.toString(),
      keyboardType: const TextInputType.numberWithOptions(
        signed: false,
        decimal: false,
      ),
      inputFormatters: <TextInputFormatter>[
        FilteringTextInputFormatter.digitsOnly
      ],
      textInputAction: TextInputAction.next,
      textAlign: TextAlign.start,
    );
  }
}
