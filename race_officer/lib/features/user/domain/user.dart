
import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:sailbrowser_flutter/features/club/domain/boat.dart';

part 'user.freezed.dart';
part 'user.g.dart';

@freezed
class User with _$User {
  factory User({
    required String id,
    @Default([]) List<Boat> boats,
  }) = _User; 

  const User._();

  factory User.fromJson(Map<String, Object?> json) => _$UserFromJson(json);

}
