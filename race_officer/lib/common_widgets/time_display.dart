import 'dart:async';

import 'package:clock/clock.dart';
import 'package:flutter/widgets.dart';
import 'package:intl/intl.dart';

class TimeDisplay extends StatefulWidget {
  final TextStyle? style;
  final double? textScaleFactor;

  const TimeDisplay({this.textScaleFactor, this.style, super.key});

  @override
  TimeDisplayState createState() => TimeDisplayState();
}

class TimeDisplayState extends State<TimeDisplay> {
  String _timeString = "";

  late final Timer _timer;

  @override
  void initState() {
    _timeString = _formatDateTime(clock.now());
    _timer = Timer.periodic(const Duration(seconds: 1), (Timer t) => _getTime());
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Text(
      _timeString,
      textScaleFactor: widget.textScaleFactor,
      style: widget.style);
  }

  @override
  void dispose() {
    _timer.cancel();
    super.dispose();
  }

  void _getTime() {
    final DateTime now = clock.now();
    final String formattedDateTime = _formatDateTime(now);
    setState(() {
      _timeString = formattedDateTime;
    });
  }

  String _formatDateTime(DateTime dateTime) {
    return DateFormat('dd-MMM-yyyy hh:mm:ss').format(dateTime);
  }
}