import 'package:flutter/material.dart';
import 'package:flutter_form_builder/flutter_form_builder.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:form_builder_validators/form_builder_validators.dart';
import 'package:go_router/go_router.dart';
import 'package:loggy/loggy.dart';
import 'package:sailbrowser_flutter/common_widgets/responsive_center.dart';
import 'package:sailbrowser_flutter/common_widgets/will_pop_form.dart';
import 'package:sailbrowser_flutter/models/boat.dart';


import 'boats_service.dart';

class EditBoat extends ConsumerStatefulWidget {
  final String id;
  final Boat? boat;

  const EditBoat(
      {this.boat, required this.id, super.key});

  @override
  ConsumerState<EditBoat> createState() => _EditBoatState();
}

class _EditBoatState extends ConsumerState<EditBoat> with UiLoggy {
  final _formKey = GlobalKey<FormBuilderState>();

  Boat? boat;

  @override
  void initState() {
    super.initState();
    boat = widget.boat;
  }

  Future<void> _submit() async {
    final form = _formKey.currentState!;

    final boatService = ref.read(boatsProvider);

    if (form.isValid) {
      final formData = _formKey.currentState!.value;

      bool success;

      if (boat == null) {
        final u = Boat.fromJson(formData);
        success = await boatService.add(u);
      } else {
        final update = boat!.copyWith(
          sailingClass: formData['sailingClass'],
          type: BoatType.values.byName(formData['type']),
          sailNumber: formData['sailNumber'],
          name: formData['name'],
          owner: formData['owner'],
          helm: formData['helm'],
          crew: formData['crew'],
        );

        success = await boatService.update(update, update.id);
      }
      if (success) {
        // ignore: use_build_context_synchronously
        context.pop();
      } else {
          SnackBar(
            content: const Text('Error encountered saving boat'),
            action: SnackBarAction(
              label: 'Discard changes',
              onPressed: () {
              context.pop();
              },
            ),
          );
        loggy.error('Error encountered saving boat');
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return WillPopForm(
        formKey: _formKey,
        child: Scaffold(
          appBar: AppBar(
            title: Text(widget.boat == null ? 'New Boat' : 'Edit Boat'),
            actions: <Widget>[
              TextButton(
                //      onPressed: state.isLoading ? null : _submit,
                onPressed: _submit,
                child: const Text(
                  'Save',
                ),
              ),
            ],
          ),
          body: _buildContents(),
        ));
  }

  Widget _buildContents() {
    return SingleChildScrollView(
      child: ResponsiveCenter(
        maxContentWidth: 600,
        padding: const EdgeInsets.all(16.0),
        child: Card(
          child: Padding(
            padding: const EdgeInsets.all(16.0),
            child: _buildForm(),
          ),
        ),
      ),
    );
  }

  Widget _buildForm() {
    return FormBuilder(
      key: _formKey,
      onChanged: () {
        _formKey.currentState!.save();
        debugPrint(_formKey.currentState!.value.toString());
      },
      initialValue: boat != null ? boat!.toJson() : {},
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: _buildFormChildren(),
      ),
    );
  }

  List<Widget> _buildFormChildren() {
    return [
      FormBuilderTextField(
        name: 'sailingClass',
        autovalidateMode: AutovalidateMode.onUserInteraction,
        decoration: const InputDecoration(
          labelText: 'Class',
          helperText: "Sailing class eg Fireball",
        ),
        validator: FormBuilderValidators.required(),
      ),
      FormBuilderTextField(
        name: 'sailNumber',
        decoration: const InputDecoration(labelText: 'Sail number'),
        autovalidateMode: AutovalidateMode.onUserInteraction,
        valueTransformer: (text) =>text != null ? num.tryParse(text) : null,
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
    ];
  }
}