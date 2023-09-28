import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:loggy/loggy.dart';
import 'package:sailbrowser_flutter/common_widgets/null_widget.dart';
import 'package:sailbrowser_flutter/common_widgets/numeric_keypad.dart';
import 'package:sailbrowser_flutter/features/race-calander/domain/series.dart';
import 'package:sailbrowser_flutter/features/race/finish/domain/finish_lists.dart';
import 'package:sailbrowser_flutter/features/race/finish/presentation/finish_list.dart';
import 'package:sailbrowser_flutter/util/list_extensions.dart';

class FinishEntry extends ConsumerStatefulWidget {
  final Series? series;

  const FinishEntry({this.series, super.key});

  @override
  ConsumerState<FinishEntry> createState() => _FinishEntryState();
}

class _FinishEntryState extends ConsumerState<FinishEntry> with UiLoggy {
  Series? series;

  @override
  void initState() {
    super.initState();
    ServicesBinding.instance.keyboard.addHandler(_onKey);

    series = widget.series;
  }

  @override
  void dispose() {
    ServicesBinding.instance.keyboard.removeHandler(_onKey);
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final filter = ref.watch(compFilterProvider);

    return Column(
      children: [
        const Expanded(
          child: FinishList(racing: true, filtered: true,),
        ),
        const SizedBox(height: 5),
        _buildClassFilter(context, filter.boatClass),
        const SizedBox(height: 10),
        Center(
          child: Text(
            'Sail number:  ${filter.sailNumber}',
            textScaleFactor: 1.2,
          ),
        ),
        const SizedBox(height: 5),
        NumericKeyPad(
          onKeyboardTap: (key) {
            String sailNumber = filter.sailNumber;
            if (key == 'backspace') {
              if (sailNumber.isNotEmpty) {
                _setSailNumber(sailNumber.substring(0, sailNumber.length - 1));
              }
            } else if (key == 'clear') {
              _setSailNumber("");
            } else {
              _setSailNumber(sailNumber + key);
            }
          },
        ),
      ],
    );
  }

  Widget _buildClassFilter(BuildContext context, String boatClass) {
    final competitors = ref.watch(racingCompetitorsProvider(true));
    final boatClasses = competitors.map((e) => e.boatClass).toList().unique();
    boatClasses.sort();

    return boatClasses.isEmpty || boatClasses.length == 1
        ? const NullWidget()
        : Wrap(
            spacing: 5.0,
            children: boatClasses
                .map(
                  (bc) => ChoiceChip(
                    label: Text(bc),
                    selected: (boatClass == bc),
                    onSelected: (bool selected) {
                      ref.read(compFilterProvider.notifier).boatClass =
                          (selected ? bc : null);
                    },
                  ),
                )
                .toList(),
          );
  }

  bool _onKey(KeyEvent event) {
    final key = event.logicalKey.keyLabel;
    String sailNumber = ref.read(compFilterProvider).sailNumber;

    if (event is KeyDownEvent) {
      loggy.info("Kery pressed $key");
      final num = int.tryParse(key);
      if (num != null) {
        _setSailNumber(sailNumber + key);
      }
      if (key == "Backspace") {
        if (sailNumber.isNotEmpty) {
          _setSailNumber(sailNumber.substring(0, sailNumber.length - 1));
        }
      }
    }
    return false;
  }

  _setSailNumber(String s) {
    ref.read(compFilterProvider.notifier).sailNumber = s;
  }
}
