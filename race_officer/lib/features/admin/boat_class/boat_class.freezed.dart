// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'boat_class.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#custom-getters-and-methods');

BoatClass _$BoatClassFromJson(Map<String, dynamic> json) {
  return _BoatClass.fromJson(json);
}

/// @nodoc
mixin _$BoatClass {
  String get name => throw _privateConstructorUsedError;
  num get handicap => throw _privateConstructorUsedError;

  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;
  @JsonKey(ignore: true)
  $BoatClassCopyWith<BoatClass> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $BoatClassCopyWith<$Res> {
  factory $BoatClassCopyWith(BoatClass value, $Res Function(BoatClass) then) =
      _$BoatClassCopyWithImpl<$Res, BoatClass>;
  @useResult
  $Res call({String name, num handicap});
}

/// @nodoc
class _$BoatClassCopyWithImpl<$Res, $Val extends BoatClass>
    implements $BoatClassCopyWith<$Res> {
  _$BoatClassCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? name = null,
    Object? handicap = null,
  }) {
    return _then(_value.copyWith(
      name: null == name
          ? _value.name
          : name // ignore: cast_nullable_to_non_nullable
              as String,
      handicap: null == handicap
          ? _value.handicap
          : handicap // ignore: cast_nullable_to_non_nullable
              as num,
    ) as $Val);
  }
}

/// @nodoc
abstract class _$$_BoatClassCopyWith<$Res> implements $BoatClassCopyWith<$Res> {
  factory _$$_BoatClassCopyWith(
          _$_BoatClass value, $Res Function(_$_BoatClass) then) =
      __$$_BoatClassCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({String name, num handicap});
}

/// @nodoc
class __$$_BoatClassCopyWithImpl<$Res>
    extends _$BoatClassCopyWithImpl<$Res, _$_BoatClass>
    implements _$$_BoatClassCopyWith<$Res> {
  __$$_BoatClassCopyWithImpl(
      _$_BoatClass _value, $Res Function(_$_BoatClass) _then)
      : super(_value, _then);

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? name = null,
    Object? handicap = null,
  }) {
    return _then(_$_BoatClass(
      name: null == name
          ? _value.name
          : name // ignore: cast_nullable_to_non_nullable
              as String,
      handicap: null == handicap
          ? _value.handicap
          : handicap // ignore: cast_nullable_to_non_nullable
              as num,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$_BoatClass extends _BoatClass {
  const _$_BoatClass({required this.name, required this.handicap}) : super._();

  factory _$_BoatClass.fromJson(Map<String, dynamic> json) =>
      _$$_BoatClassFromJson(json);

  @override
  final String name;
  @override
  final num handicap;

  @override
  String toString() {
    return 'BoatClass(name: $name, handicap: $handicap)';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$_BoatClass &&
            (identical(other.name, name) || other.name == name) &&
            (identical(other.handicap, handicap) ||
                other.handicap == handicap));
  }

  @JsonKey(ignore: true)
  @override
  int get hashCode => Object.hash(runtimeType, name, handicap);

  @JsonKey(ignore: true)
  @override
  @pragma('vm:prefer-inline')
  _$$_BoatClassCopyWith<_$_BoatClass> get copyWith =>
      __$$_BoatClassCopyWithImpl<_$_BoatClass>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$_BoatClassToJson(
      this,
    );
  }
}

abstract class _BoatClass extends BoatClass {
  const factory _BoatClass(
      {required final String name, required final num handicap}) = _$_BoatClass;
  const _BoatClass._() : super._();

  factory _BoatClass.fromJson(Map<String, dynamic> json) =
      _$_BoatClass.fromJson;

  @override
  String get name;
  @override
  num get handicap;
  @override
  @JsonKey(ignore: true)
  _$$_BoatClassCopyWith<_$_BoatClass> get copyWith =>
      throw _privateConstructorUsedError;
}
