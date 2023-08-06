// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'handicap.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#custom-getters-and-methods');

Handicap _$HandicapFromJson(Map<String, dynamic> json) {
  return _Handicap.fromJson(json);
}

/// @nodoc
mixin _$Handicap {
  HandicapScheme get scheme => throw _privateConstructorUsedError;
  num get value => throw _privateConstructorUsedError;

  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;
  @JsonKey(ignore: true)
  $HandicapCopyWith<Handicap> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $HandicapCopyWith<$Res> {
  factory $HandicapCopyWith(Handicap value, $Res Function(Handicap) then) =
      _$HandicapCopyWithImpl<$Res, Handicap>;
  @useResult
  $Res call({HandicapScheme scheme, num value});
}

/// @nodoc
class _$HandicapCopyWithImpl<$Res, $Val extends Handicap>
    implements $HandicapCopyWith<$Res> {
  _$HandicapCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? scheme = null,
    Object? value = null,
  }) {
    return _then(_value.copyWith(
      scheme: null == scheme
          ? _value.scheme
          : scheme // ignore: cast_nullable_to_non_nullable
              as HandicapScheme,
      value: null == value
          ? _value.value
          : value // ignore: cast_nullable_to_non_nullable
              as num,
    ) as $Val);
  }
}

/// @nodoc
abstract class _$$_HandicapCopyWith<$Res> implements $HandicapCopyWith<$Res> {
  factory _$$_HandicapCopyWith(
          _$_Handicap value, $Res Function(_$_Handicap) then) =
      __$$_HandicapCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({HandicapScheme scheme, num value});
}

/// @nodoc
class __$$_HandicapCopyWithImpl<$Res>
    extends _$HandicapCopyWithImpl<$Res, _$_Handicap>
    implements _$$_HandicapCopyWith<$Res> {
  __$$_HandicapCopyWithImpl(
      _$_Handicap _value, $Res Function(_$_Handicap) _then)
      : super(_value, _then);

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? scheme = null,
    Object? value = null,
  }) {
    return _then(_$_Handicap(
      scheme: null == scheme
          ? _value.scheme
          : scheme // ignore: cast_nullable_to_non_nullable
              as HandicapScheme,
      value: null == value
          ? _value.value
          : value // ignore: cast_nullable_to_non_nullable
              as num,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$_Handicap extends _Handicap {
  const _$_Handicap({this.scheme = HandicapScheme.py, required this.value})
      : super._();

  factory _$_Handicap.fromJson(Map<String, dynamic> json) =>
      _$$_HandicapFromJson(json);

  @override
  @JsonKey()
  final HandicapScheme scheme;
  @override
  final num value;

  @override
  String toString() {
    return 'Handicap(scheme: $scheme, value: $value)';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$_Handicap &&
            (identical(other.scheme, scheme) || other.scheme == scheme) &&
            (identical(other.value, value) || other.value == value));
  }

  @JsonKey(ignore: true)
  @override
  int get hashCode => Object.hash(runtimeType, scheme, value);

  @JsonKey(ignore: true)
  @override
  @pragma('vm:prefer-inline')
  _$$_HandicapCopyWith<_$_Handicap> get copyWith =>
      __$$_HandicapCopyWithImpl<_$_Handicap>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$_HandicapToJson(
      this,
    );
  }
}

abstract class _Handicap extends Handicap {
  const factory _Handicap(
      {final HandicapScheme scheme, required final num value}) = _$_Handicap;
  const _Handicap._() : super._();

  factory _Handicap.fromJson(Map<String, dynamic> json) = _$_Handicap.fromJson;

  @override
  HandicapScheme get scheme;
  @override
  num get value;
  @override
  @JsonKey(ignore: true)
  _$$_HandicapCopyWith<_$_Handicap> get copyWith =>
      throw _privateConstructorUsedError;
}
