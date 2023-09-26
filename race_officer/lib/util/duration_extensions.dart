enum DurationFormat {
  hoursMinSec,
  hoursMin,
  minSec,
}

extension DurationExtensions on Duration {
  /// Converts the duration into a readable string
  /// 05:15
  ///
  ///
  String _twoDigits(int n) => n.toString().padLeft(2, "0");

  String asFormattedString({DurationFormat format = DurationFormat.minSec}) {
    String twoDigitMinutes = _twoDigits(inMinutes.remainder(60));
    String twoDigitSeconds = _twoDigits(inSeconds.remainder(60));

    switch (format) {
      case DurationFormat.minSec:
        return "$inMinutes:$twoDigitSeconds";

      case DurationFormat.hoursMinSec:
        return "${_twoDigits(inHours)}:$twoDigitMinutes:$twoDigitSeconds";

      case DurationFormat.hoursMin:
        return "${_twoDigits(inHours)}:$twoDigitMinutes";
    }
  }
}
