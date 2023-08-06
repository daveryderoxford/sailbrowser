import 'package:flutter/material.dart';
import 'package:flutter_form_builder/flutter_form_builder.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:form_builder_validators/form_builder_validators.dart';
import 'package:go_router/go_router.dart';
import 'package:loggy/loggy.dart';
import 'package:sailbrowser_flutter/common_widgets/responsive_center.dart';
import 'package:sailbrowser_flutter/common_widgets/will_pop_form.dart';
import 'package:sailbrowser_flutter/features/admin/club/clubs_service.dart';

import '../race_series.dart';
import '../race_series_service.dart';

class EditSeries extends ConsumerStatefulWidget {
  final String id;
  final RaceSeries? series;

  const EditSeries({this.series, required this.id, super.key});

  @override
  ConsumerState<EditSeries> createState() => _EditRaceSeriesState();
}

class _EditRaceSeriesState extends ConsumerState<EditSeries> with UiLoggy {
  final _formKey = GlobalKey<FormBuilderState>();

  RaceSeries? series;

  @override
  void initState() {
    super.initState();
    series = widget.series;
  }

  Future<void> _submit() async {
    final form = _formKey.currentState!;

    final boatService = ref.read(seriesProvider);

    if (form.isValid) {
      final formData = _formKey.currentState!.value;

      bool success;

      if (series == null) {
        final update = RaceSeries(
            name: formData['name'],
            fleetId: formData['fleetId'],
            startDate: DateTime(1970, 0, 0),
            endDate: DateTime(1970, 0, 0));
        success = await boatService.add(update);
      } else {
        final update = series!
            .copyWith(name: formData['name'], fleetId: formData['fleetId']);

        success = await boatService.update(update, update.id);
      }
      if (success) {
        // ignore: use_build_context_synchronously
        context.pop();
      } else {
        SnackBar(
          content: const Text('Error encountered saving series'),
          action: SnackBarAction(
            label: 'Discard changes',
            onPressed: () {
              context.pop();
            },
          ),
        );
        loggy.error('Error encountered saving series');
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return WillPopForm(
        formKey: _formKey,
        child: Scaffold(
          appBar: AppBar(
            title: Text(widget.series == null ? 'New Series' : 'Edit Series Details'),
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
      initialValue: series != null ? series!.toJson() : {},
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: _buildFormChildren(),
      ),
    );
  }

  List<Widget> _buildFormChildren() {
    final fleets = ref.read(currentClubProvider).current!.fleets;
    return [
      FormBuilderTextField(
        name: 'name',
        autovalidateMode: AutovalidateMode.onUserInteraction,
        decoration: const InputDecoration(
          labelText: 'Name',
          helperText: "eg Summer",
        ),
        validator: FormBuilderValidators.required(),
      ),
      FormBuilderDropdown<String>(
        name: 'fleetId',
        decoration: const InputDecoration(
          labelText: 'Fleet',
        ),
        validator: FormBuilderValidators.required(),
        autovalidateMode: AutovalidateMode.onUserInteraction,
        items: fleets
            .map((fleet) => DropdownMenuItem(
                  value: fleet.id,
                  child: Text(fleet.name),
                ))
            .toList(),
      ),
    ];
  }
}
