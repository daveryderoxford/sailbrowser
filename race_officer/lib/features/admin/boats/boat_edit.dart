import 'package:flutter/material.dart';
import 'package:flutter_form_builder/flutter_form_builder.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:form_builder_validators/form_builder_validators.dart';
import 'package:go_router/go_router.dart';
import 'package:loggy/loggy.dart';

import '../../../common_widgets/responsive_center.dart';
import '../../../common_widgets/will_pop_form.dart';
import '../../../models/boat.dart';
import 'boats_service.dart';

class EditBoat extends ConsumerStatefulWidget {
  final bool isFromEdit;
  final String id;
  final Boat? boat;

  const EditBoat(
      {required this.isFromEdit, this.boat, required this.id, super.key});

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
      final values = _formKey.currentState!.value;

      bool success;

      final u = Boat.fromJson(values);

      if (boat == null) {
        success = await boatService.add(u);
      } else {
        final update = boat!.copyWith(
          sailingClass: values['sailingClass'],
          sailNumber: values['sailNumber'],
          type: values['type'],
          name: values['name'],
          owner: values['owner'],
          helm: values['helm'],
          crew: values['crew'],
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
                  style: TextStyle(fontSize: 18, color: Colors.white),
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
      autovalidateMode: AutovalidateMode.always,
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
        decoration: const InputDecoration(
          labelText: 'Class',
          helperText: "a hint",
        ),
        validator: FormBuilderValidators.required(),
      ),
      FormBuilderTextField(
        name: 'sailNumber',
        decoration: const InputDecoration(labelText: 'Sail number'),
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
      FormBuilderDropdown<BoatType>(
        name: 'type',
        decoration: const InputDecoration(
          labelText: 'Type',
        ),
        validator: FormBuilderValidators.required(),
        items: BoatType.values
            .map((type) => DropdownMenuItem(
                  alignment: AlignmentDirectional.center,
                  value: type,
                  child: Text(type.name),
                ))
            .toList(),
        initialValue: boat?.type,
        //   valueTransformer: (val) => val?.name,
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