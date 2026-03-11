
/// Enumeration of supported handicap schemes
enum HandicapScheme {
  levelRating(displayName: 'Level rating', max: 0, min: 0),
  py(displayName: 'RYA Portmouth Yardstick', max: 1800, min: 500),
  irc(displayName: 'IRC', max: 2.000, min: 0.750);

  const HandicapScheme({
    required this.displayName,
    required this.max,
    required this.min,
  });

  static get nonLevelRatingSchemes => HandicapScheme.values.where((e) => e.index != 0);

  final String displayName;
  final double max;
  final double min;
}
