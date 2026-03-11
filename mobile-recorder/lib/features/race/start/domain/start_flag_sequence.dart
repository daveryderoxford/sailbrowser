
import 'package:freezed_annotation/freezed_annotation.dart';

part 'start_flag_sequence.freezed.dart';
part 'start_flag_sequence.g.dart'; 

@freezed
class StartFlagSequence with _$StartFlagSequence {

  const factory StartFlagSequence({
  @Default(5) int interval,
  @Default(5) int classUp,
  @Default(4) int prepUp,
  @Default(1) int classDown,
  @Default(0) int prepDown,
  }) = _StartFlagSequence;

  const StartFlagSequence._();

  factory StartFlagSequence.fromJson(Map<String, Object?> json) => _$StartFlagSequenceFromJson(json);
}
