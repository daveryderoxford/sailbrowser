import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'dart:math' as math;

import 'package:intl/intl.dart';

class TimeInputField extends StatefulWidget {
  const TimeInputField({this.onChanged, this.initialValue, super.key});

  final ValueChanged<DateTime?>? onChanged;
  final DateTime? initialValue;

  @override
  TimeInputFieldState createState() => TimeInputFieldState();
}

class TimeInputFieldState extends State<TimeInputField> {
  final TextEditingController _txtTimeController = TextEditingController();

  late final ValueChanged<DateTime?>? onChanged;

  final format = DateFormat('HH:mm:ss');

  @override
  void initState() {
    super.initState();
    onChanged = widget.onChanged;
    if (widget.initialValue != null) {
      final initialStr = format.format(widget.initialValue!);
      _txtTimeController.value = TextEditingValue(
        text: initialStr,
        selection: TextSelection.fromPosition(
          TextPosition(offset: initialStr.length),
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return TextFormField(
      onChanged: (value) {
        DateTime? date;
        try {
          date = format.parse(value);
        } catch (e) {
          date = null;
        }

        if (widget.onChanged != null) {
          onChanged!(date);
        }
      },
      controller: _txtTimeController,
      keyboardType: const TextInputType.numberWithOptions(decimal: false),
      decoration:  InputDecoration(
        hintText: '00:00:00',
        suffixIcon: IconButton(
          onPressed: () => _txtTimeController.clear(),
          icon: const Icon(Icons.clear),
        ),
      ),
      inputFormatters: <TextInputFormatter>[
        TimeTextInputFormatter() // This input formatter will do the job
      ],
    );
  }
}

class TimeTextInputFormatter extends TextInputFormatter {
  late final RegExp _exp;
  TimeTextInputFormatter() {
    _exp = RegExp(r'^[0-9:]+$');
  }

  @override
  TextEditingValue formatEditUpdate(
    TextEditingValue oldValue,
    TextEditingValue newValue,
  ) {
    if (_exp.hasMatch(newValue.text)) {
      TextSelection newSelection = newValue.selection;

      String value = newValue.text;
      String newText;

      String leftChunk = '';
      String rightChunk = '';

      if (value.length >= 8) {
        if (value.substring(0, 7) == '00:00:0') {
          leftChunk = '00:00:';
          rightChunk = value.substring(leftChunk.length + 1, value.length);
        } else if (value.substring(0, 6) == '00:00:') {
          leftChunk = '00:0';
          rightChunk = "${value.substring(6, 7)}:${value.substring(7)}";
        } else if (value.substring(0, 4) == '00:0') {
          leftChunk = '00:';
          rightChunk =
              "${value.substring(4, 5)}${value.substring(6, 7)}:${value.substring(7)}";
        } else if (value.substring(0, 3) == '00:') {
          leftChunk = '0';
          rightChunk =
              "${value.substring(3, 4)}:${value.substring(4, 5)}${value.substring(6, 7)}:${value.substring(7, 8)}${value.substring(8)}";
        } else {
          leftChunk = '';
          rightChunk =
              "${value.substring(1, 2)}${value.substring(3, 4)}:${value.substring(4, 5)}${value.substring(6, 7)}:${value.substring(7)}";
        }
      } else if (value.length == 7) {
        if (value.substring(0, 7) == '00:00:0') {
          leftChunk = '';
          rightChunk = '';
        } else if (value.substring(0, 6) == '00:00:') {
          leftChunk = '00:00:0';
          rightChunk = value.substring(6, 7);
        } else if (value.substring(0, 1) == '0') {
          leftChunk = '00:';
          rightChunk =
              "${value.substring(1, 2)}${value.substring(3, 4)}:${value.substring(4, 5)}${value.substring(6, 7)}";
        } else {
          leftChunk = '';
          rightChunk =
              "${value.substring(1, 2)}${value.substring(3, 4)}:${value.substring(4, 5)}${value.substring(6, 7)}:${value.substring(7)}";
        }
      } else {
        leftChunk = '00:00:0';
        rightChunk = value;
      }

      if (oldValue.text.isNotEmpty && oldValue.text.substring(0, 1) != '0') {
        if (value.length > 7) {
          return oldValue;
        } else {
          leftChunk = '0';
          rightChunk =
              "${value.substring(0, 1)}:${value.substring(1, 2)}${value.substring(3, 4)}:${value.substring(4, 5)}${value.substring(6, 7)}";
        }
      }

      newText = leftChunk + rightChunk;

      newSelection = newValue.selection.copyWith(
        baseOffset: math.min(newText.length, newText.length),
        extentOffset: math.min(newText.length, newText.length),
      );

      return TextEditingValue(
        text: newText,
        selection: newSelection,
        composing: TextRange.empty,
      );
    }
    return oldValue;
  }
}
