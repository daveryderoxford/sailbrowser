extension DurationExtensions on Duration {
  /// Formts duration into a readable string
  /// 05:15
  ///
  ///
  String _twoDigits(int n) => n.toString().padLeft(2, "0");

  /// Formats duration as a string in form hh:mm:ss. 
  /// Limited to dureations of less than 99hours
  String asHourMinSec() {

    String twoDigitMinutes = _twoDigits(inMinutes.remainder(60));
    String twoDigitSeconds = _twoDigits(inSeconds.remainder(60));

    if (inHours > 10 ) {
       return "$inHours}:$twoDigitMinutes:$twoDigitSeconds";
    } else {
      return "${_twoDigits(inHours)}:$twoDigitMinutes:$twoDigitSeconds";
    }
  }

  /// Formats duration as a string in form mins:ss. 
  String asMinSec() {
    String twoDigitSeconds = _twoDigits(inSeconds.remainder(60));

    return "$inMinutes:$twoDigitSeconds";
  }

  /// Formats duration as a string in form hh:mm. 
  /// Any seconds are ignored.  No rounding occurs
  String asHourMin() {
    String twoDigitMinutes = _twoDigits(inMinutes.remainder(60));
    return "${_twoDigits(inHours)}:$twoDigitMinutes";
  }
}
