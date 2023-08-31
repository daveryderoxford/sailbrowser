import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_form_builder/flutter_form_builder.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:form_builder_validators/form_builder_validators.dart';
import 'package:go_router/go_router.dart';
import 'package:loggy/loggy.dart';
import 'package:sailbrowser_flutter/common_widgets/responsive_center.dart';
import 'package:sailbrowser_flutter/common_widgets/will_pop_form.dart';
import 'package:sailbrowser_flutter/features/admin/club/clubs_service.dart';
import 'package:uuid/uuid.dart';

import '../series.dart';
import '../series_service.dart';

class CopySeries extends ConsumerStatefulWidget {
  final Series? series;

  const CopySeries({this.series, super.key});

  @override
  ConsumerState<CopySeries> createState() => _CopySeriesState();
}

class _CopySeriesState extends ConsumerState<CopySeries> with UiLoggy {
  final _formKey = GlobalKey<FormBuilderState>();

  Series? series;

  @override
  void initState() {
    super.initState();
    series = widget.series;
  }

  Future<void> _submit() async {
    _formKey.currentState?.saveAndValidate();
    final form = _formKey.currentState!;

    final raceSeriesService = ref.read(seriesRepositoryProvider);

    if (form.isValid) {
      final formData = _formKey.currentState!.value;
      final updatedFleetId = formData['fleetId'];
      final updatedSeriesId = const Uuid().v4();

      final updatedRaces = series!.races.map(
        (race) {
          return race.copyWith(
            id: const Uuid().v4(),
            seriesId: updatedSeriesId,
            fleetId: updatedFleetId,
          );
        },
      ).toList();

      final updatedSeries = series!.copyWith(
        id: updatedSeriesId,
        name: formData['name'],
        fleetId: updatedFleetId,
        races: updatedRaces,
      );

      bool success = await raceSeriesService.add(updatedSeries);

      if (success) {
        // TODO: Could not use context.goNamed('series') as it did not navigate back
        // up the stack - admin worked.  Need to look at how Navigator and goRouter interact.
        // Currently just using gorouter to manage the top-level navigation stacks
        // ignore: use_build_context_synchronously
          context.pop();
          // ignore: use_build_context_synchronously
          context.pop();
      } else {
        loggy.error('Error encountered copying series');
        SnackBar(
          content: const Text('Error encountered copying series'),
          action: SnackBarAction(
            label: 'Discard changes',
            onPressed: () {
              context.pop();
            },
          ),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return WillPopForm(
      formKey: _formKey,
      child: Scaffold(
        appBar: AppBar(
          title: const Text('Copy series'),
          actions: <Widget>[
            TextButton(
              onPressed: _submit,
              child: const Text(
                'Submit',
              ),
            ),
          ],
        ),
        body: _buildContents(),
      ),
    );
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
          labelText: 'New name',
          helperText: "eg Summer",
        ),
        validator: FormBuilderValidators.required(),
      ),
      FormBuilderDropdown<String>(
        name: 'fleetId',
        initialValue: fleets[0].id,
        decoration: const InputDecoration(
          labelText: 'New fleet',
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
