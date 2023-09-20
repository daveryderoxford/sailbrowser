
/// Enumeration of supported handicap schemes
enum RatingSystem {
  levelRating(displayName: 'Level rating', max: 0, min: 0),
  ryaPY(displayName: 'RYA Portmouth Yardstick', max: 2000, min: 500),
  irc(displayName: 'IRC', max: 2000, min: 500);

  const RatingSystem({
    required this.displayName,
    required this.max,
    required this.min,
  });

  get handicapSchemes => RatingSystem.values.where((e) => e.index != 0);

  final String displayName;
  final num max;
  final num min;
}

enum HandicapScheme {
   py('PY'),
   nhc('NHC'),
   irc('IRC');

  final String displayName;
  const HandicapScheme(this.displayName);
}


