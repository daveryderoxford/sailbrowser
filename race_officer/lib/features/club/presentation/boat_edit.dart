import 'package:flutter/material.dart';
import 'package:flutter_form_builder/flutter_form_builder.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:loggy/loggy.dart';
import 'package:sailbrowser_flutter/common_widgets/delete_button.dart';
import 'package:sailbrowser_flutter/common_widgets/responsive_center.dart';
import 'package:sailbrowser_flutter/common_widgets/will_pop_form.dart';
import 'package:sailbrowser_flutter/features/club/domain/boat.dart';
import 'package:sailbrowser_flutter/features/club/presentation/widgets/boat_form_fields.dart';

import '../domain/boats_service.dart';

class EditBoat extends ConsumerStatefulWidget {
  final String id;
  final Boat? boat;

  const EditBoat({this.boat, required this.id, super.key});

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

  _submit() {
    final form = _formKey.currentState!;
    form.saveAndValidate();

    final boatService = ref.read(boatsProvider);

    if (form.isValid) {
      final formData = _formKey.currentState!.value;

      if (boat == null) {
        final u = Boat.fromJson(formData);
        boatService.add(u);
      } else {
        final update = boat!.copyWith(
          boatClass: formData['boatClass'],
          type: BoatType.values.byName(formData['type']),
          sailNumber: formData['sailNumber'],
          name: formData['name'],
          owner: formData['owner'],
          helm: formData['helm'],
          crew: formData['crew'],
        );

        boatService.update(update, update.id);
      }

      if (context.mounted) context.pop();
    }
  }

  _deleteBoat() {
    final boatService = ref.read(boatsProvider);
    boatService.remove(boat!.id);
    if (context.mounted) context.pop();
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
          child: Column(
            children: [
              Padding(
                padding: const EdgeInsets.all(16.0),
                child: _buildForm(),
              ),
              DeleteButton(
                itemName: 'boat',
                visible: boat != null,
                onDelete: _deleteBoat,
              ),
            ],
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
      child: BoatFormFields(boat: boat),
    );
  }
}
