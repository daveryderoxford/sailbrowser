

import 'package:freezed_annotation/freezed_annotation.dart';

part 'handicap.freezed.dart';
part 'handicap.g.dart';

enum HandicapScheme {
   py('PY'),
   nhc('NHC'),
   irc('IRC');

  final String displayName;
  const HandicapScheme(this.displayName);
}

@freezed
class Handicap with _$Handicap {
  
  const factory Handicap({
    @Default(HandicapScheme.py) HandicapScheme scheme,
    required num value,
  }) = _Handicap;

  const Handicap._();

  factory Handicap.fromJson(Map<String, Object?> json) => _$HandicapFromJson(json);
}