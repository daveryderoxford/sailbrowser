import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_typeahead/flutter_typeahead.dart';
import 'package:form_builder_extra_fields/form_builder_extra_fields.dart';
import 'package:form_builder_validators/form_builder_validators.dart';
import 'package:sailbrowser_flutter/features/club/domain/boat.dart';

/// Typeahead form control that prmopts for classname based on classes
/// present in a list of class names
class SailNumberTypeAhead extends StatelessWidget {
  const SailNumberTypeAhead({
    super.key,
    required this.name,
   // required this.sailNumbers,
    required this.boats, 
    required this.initialValue,
    this.onChanged,
  });

  final Boat? initialValue;
  final String name;
  //final List<int> sailNumbers;
  final List<Boat> boats;
  final Function(Boat?)? onChanged;
  final minValue = 0;

  @override
  Widget build(BuildContext context) {
    return /* DropdownMenu<int>(
                      initialSelection: initialValue,
                      // requestFocusOnTap is enabled/disabled by platforms when it is null.
                      // On mobile platforms, this is false by default. Setting this to true will
                      // trigger focus request on the text field and virtual keyboard will appear
                      // afterward. On desktop platforms however, this defaults to true.
                      requestFocusOnTap: true,
                      label: const Text('Sail number'),
                      dropdownMenuEntries: ColorLabel.values
                          .map<DropdownMenuEntry<ColorLabel>>(
                              (ColorLabel color) {
                        return DropdownMenuEntry<ColorLabel>(
                          value: color,
                          label: color.label,
                          enabled: color.label != 'Grey',
                          style: MenuItemButton.styleFrom(
                            foregroundColor: color.color,
                          ),
                        );
                      }).toList(),
                    ), */
    
    FormBuilderTypeAhead<Boat>(
      decoration: const InputDecoration(
          labelText: 'Sail number',
          hintText: 'Start sail number to be prompted'),
      name: name,
      initialValue: initialValue,
      onChanged: (value) => (onChanged !=null) ? onChanged!(value) : null,
      itemBuilder: (context, sn) {
        return ListTile(title: Text(sn.toString()), subtitle: const Text('Name'),);
      },
      autovalidateMode: AutovalidateMode.onUserInteraction,
      validator: FormBuilderValidators.compose([
        FormBuilderValidators.required(),
        FormBuilderValidators.min(minValue),
      ]),
      suggestionsCallback: (query) =>
         boats.where((b) => query == '0' || b.sailNumber.toString().startsWith(query)),
      selectionToTextTransformer:(suggestion) => suggestion.sailNumber.toString(),
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