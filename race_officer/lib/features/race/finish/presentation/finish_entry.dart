import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:loggy/loggy.dart';
import 'package:sailbrowser_flutter/common_widgets/numeric_keypad.dart';
import 'package:sailbrowser_flutter/features/race-calander/domain/series.dart';
import 'package:sailbrowser_flutter/features/race/finish/presentation/finish_list.dart';

class FinishEntry extends ConsumerStatefulWidget {
  final Series? series;

  const FinishEntry({this.series, super.key});

  @override
  ConsumerState<FinishEntry> createState() => _FinishEntryState();
}

class _FinishEntryState extends ConsumerState<FinishEntry> with UiLoggy {
  Series? series;
  String sailNumber = "";
  int? _boatClass = 1; // temp

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
    return Column(
      children: [
        const Expanded(
          child: FinishList(),
        ),
        _buildClassFilter(context),
        Center(
          child: Text(
            'Sail number:  $sailNumber',
            textScaleFactor: 1.2,
          ),
        ),
        NumericKeyPad(
          onKeyboardTap: (key) => setState(() {
            if (key == 'backspace') {
              if (sailNumber.isNotEmpty) {
                sailNumber = sailNumber.substring(0, sailNumber.length - 1);
              }
            } else if (key == 'clear') {
              sailNumber = "";
            } else {
              sailNumber = sailNumber + key;
            }
          }),
        )
      ],
    );
  }

  Widget _buildClassFilter(BuildContext context) {
    return Column(children: [
      const Text('Choose an item'),
      const SizedBox(height: 10.0),
      Wrap(
        spacing: 5.0,
        children: List<Widget>.generate(
          10,
          (int index) {
            return ChoiceChip(
              label: Text('Item $index'),
              selected: _boatClass == index,
              onSelected: (bool selected) {
                setState(() {
                  _boatClass = selected ? index : null;
                });
              },
            );
          },
        ).toList(),
      ),
    ]);
  }

  bool _onKey(KeyEvent event) {
    final key = event.logicalKey.keyLabel;

    if (event is KeyDownEvent) {
      loggy.info("Kery pressed $key");
      final num = int.tryParse(key);
      if (num != null) {
        setState(() {
          sailNumber = sailNumber + key;
        });
      }
      if (key == "Backspace") {
        setState(() {
          if (sailNumber.isNotEmpty) {
            sailNumber = sailNumber.substring(0, sailNumber.length - 1);
          }
        });
      }
    }
    return false;
  }
}
