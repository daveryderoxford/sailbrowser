import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:sailbrowser_flutter/common_widgets/responsive_center.dart';

typedef KeyboardTapCallback = void Function(String text);

class NumericKeyPad extends StatefulWidget {
  /// Color of the text [default = Colors.black]
  final TextStyle textStyle;

  /// Display a custom right icon
  final Widget? rightIcon;

  /// Action to trigger when right button is pressed
  final Function()? rightButtonFn;

  /// Action to trigger when right button is long pressed
  final Function()? rightButtonLongPressFn;

  /// Display a custom left icon
  final Widget? leftIcon;

  /// Action to trigger when left button is pressed
  final Function()? leftButtonFn;

  /// Callback when an item is pressed
  final KeyboardTapCallback onKeyboardTap;

  /// Main axis alignment [default = MainAxisAlignment.spaceEvenly]
  final MainAxisAlignment mainAxisAlignment;

  const NumericKeyPad(
      {super.key,
      required this.onKeyboardTap,
      this.textStyle = const TextStyle(color: Colors.black),
      this.rightButtonFn,
      this.rightButtonLongPressFn,
      this.rightIcon,
      this.leftButtonFn,
      this.leftIcon,
      this.mainAxisAlignment = MainAxisAlignment.spaceBetween});
      
  @override
  State<StatefulWidget> createState() {
    return _NumericKeyPadState();
  }
}

class _NumericKeyPadState extends State<NumericKeyPad> {
  @override
  Widget build(BuildContext context) {
    return ResponsiveCenter(
      maxContentWidth: 400,
      padding: const EdgeInsets.only(left: 32, right: 32),
      child: Column(
        children: <Widget>[
          ButtonBar(
            buttonPadding: const EdgeInsets.all(5),
            alignment: widget.mainAxisAlignment,
            children: <Widget>[
              _textButton('1'),
              _textButton('2'),
              _textButton('3'),
            ],
          ),
          ButtonBar(
            alignment: widget.mainAxisAlignment,
            buttonPadding: const EdgeInsets.all(3),
            children: <Widget>[
              _textButton('4'),
              _textButton('5'),
              _textButton('6'),
            ],
          ),
          ButtonBar(
            alignment: widget.mainAxisAlignment,
            buttonPadding: const EdgeInsets.all(3),
            children: <Widget>[
              _textButton('7'),
              _textButton('8'),
              _textButton('9'),
            ],
          ),
          ButtonBar(
            buttonPadding: const EdgeInsets.all(3),
            alignment: widget.mainAxisAlignment,
            children: <Widget>[
              _iconButton('clear', const Icon(Icons.clear_outlined)),
              _textButton('0'),
              _iconButton(
                  'backspace', const Icon(Icons.backspace_outlined)),
            ],
          ),
        ],
      ),
    );
  }

  Widget _textButton(String value) {
    return InkWell(
        borderRadius: BorderRadius.circular(45),
        onTap: () {
          widget.onKeyboardTap(value);
          HapticFeedback.mediumImpact();
        },
        child: Container(
          alignment: Alignment.center,
          width: 45,
          height: 45,
          child: Text(
            value,
            style: widget.textStyle,
          ),
        ),
        );
  }

  Widget _iconButton(String value, Icon icon) {
    return InkWell(
        borderRadius: BorderRadius.circular(45),
        onTap: () {
          widget.onKeyboardTap(value);
          HapticFeedback.mediumImpact();
        },
        child: Container(
          alignment: Alignment.center,
          width: 45,
          height: 45,
          child: icon,
        ),
      );
  }
}
