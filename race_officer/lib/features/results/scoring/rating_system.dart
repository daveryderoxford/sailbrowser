
/// Enumeration of supported handicap schemes
enum RatingSystem {
  levelRating(displayName: 'Level rating', max: 0, min: 0),
  py(displayName: 'RYA Portmouth Yardstick', max: 2000, min: 500),
  irc(displayName: 'IRC', max: 2000, min: 500);

  const RatingSystem({
    required this.displayName,
    required this.max,
    required this.min,
  });

  get handicapSchemes => RatingSystem.values.where((e) => e.index != 0);

  final String displayName;
  final double max;
  final double min;
}

enum HandicapScheme {
   py('PY'),
   nhc('NHC'),
   irc('IRC');

  final String displayName;
  const HandicapScheme(this.displayName);
}


