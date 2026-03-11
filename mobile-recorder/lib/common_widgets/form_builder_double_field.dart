import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_form_builder/flutter_form_builder.dart';
import 'package:form_builder_validators/form_builder_validators.dart';

// Positive integer form field
class FormBuilderDoubleField extends StatelessWidget {
  const FormBuilderDoubleField({
    super.key,
    required this.name,
    required this.initialValue,
    required this.decoration,
    this.minValue,
    this.maxValue,
  });

  final String name;
  final double? initialValue;
  final InputDecoration decoration;
  final double? minValue;
  final double? maxValue;

  @override
  Widget build(BuildContext context) {
    return FormBuilderTextField(
      name: name,
      decoration: decoration,
      autovalidateMode: AutovalidateMode.onUserInteraction,
      valueTransformer: (text) => text != null ? num.tryParse(text) : null,
      validator: FormBuilderValidators.compose([
        FormBuilderValidators.required(),
        FormBuilderValidators.numeric(),
        if (minValue != null) FormBuilderValidators.min(minValue!),
        if (maxValue != null) FormBuilderValidators.max(maxValue!),
      ]),
      initialValue: initialValue?.toString(),
      keyboardType: const TextInputType.numberWithOptions(
        signed: false,
        decimal: true,
      ),
      inputFormatters: <TextInputFormatter>[
        FilteringTextInputFormatter.allow(RegExp('(^\\d*.?\\d{0,2})'))
      ],
      textInputAction: TextInputAction.next,
      textAlign: TextAlign.start,
    );
  }
}
