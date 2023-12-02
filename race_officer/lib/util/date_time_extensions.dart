import 'package:intl/intl.dart';

/// Extensions to DateTime including standard sting formatting. 
extension DurationExtensions on DateTime {

  static DateFormat dateFormatter = DateFormat('dd MMM yy'); 
  
  static DateFormat dayDateFormatter = DateFormat('E dd MMM yy'); 

  static DateFormat hourMinFormatter = DateFormat(DateFormat.HOUR24_MINUTE);

  static DateFormat hourMinSecFormatter =
      DateFormat(DateFormat.HOUR24_MINUTE_SECOND);

  /// Returns time formattted as a string with hours and minutes
  String asHourMin() {
    return hourMinFormatter.format(this);
  }

  String asDayDate() {
    return dayDateFormatter.format(this);
  }

  /// Returns time formattted as a string with hours, minutes and seconds
  String asHourMinSec() {
    return hourMinSecFormatter.format(this);
  }

  String asDateString() {
    return dateFormatter.format(this);
  }

}
