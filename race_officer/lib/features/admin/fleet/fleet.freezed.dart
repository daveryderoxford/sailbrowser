// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'fleet.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#custom-getters-and-methods');

Fleet _$FleetFromJson(Map<String, dynamic> json) {
  return _Fleet.fromJson(json);
}

/// @nodoc
mixin _$Fleet {
  String get id => throw _privateConstructorUsedError;
  String get shortName => throw _privateConstructorUsedError;
  String get name => throw _privateConstructorUsedError;
  dynamic get handicapScheme => throw _privateConstructorUsedError;
  String get classFlag => throw _privateConstructorUsedError;

  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;
  @JsonKey(ignore: true)
  $FleetCopyWith<Fleet> get copyWith => throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $FleetCopyWith<$Res> {
  factory $FleetCopyWith(Fleet value, $Res Function(Fleet) then) =
      _$FleetCopyWithImpl<$Res, Fleet>;
  @useResult
  $Res call(
      {String id,
      String shortName,
      String name,
      dynamic handicapScheme,
      String classFlag});
}

/// @nodoc
class _$FleetCopyWithImpl<$Res, $Val extends Fleet>
    implements $FleetCopyWith<$Res> {
  _$FleetCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? shortName = null,
    Object? name = null,
    Object? handicapScheme = freezed,
    Object? classFlag = null,
  }) {
    return _then(_value.copyWith(
      id: null == id
          ? _value.id
          : id // ignore: cast_nullable_to_non_nullable
              as String,
      shortName: null == shortName
          ? _value.shortName
          : shortName // ignore: cast_nullable_to_non_nullable
              as String,
      name: null == name
          ? _value.name
          : name // ignore: cast_nullable_to_non_nullable
              as String,
      handicapScheme: freezed == handicapScheme
          ? _value.handicapScheme
          : handicapScheme // ignore: cast_nullable_to_non_nullable
              as dynamic,
      classFlag: null == classFlag
          ? _value.classFlag
          : classFlag // ignore: cast_nullable_to_non_nullable
              as String,
    ) as $Val);
  }
}

/// @nodoc
abstract class _$$_FleetCopyWith<$Res> implements $FleetCopyWith<$Res> {
  factory _$$_FleetCopyWith(_$_Fleet value, $Res Function(_$_Fleet) then) =
      __$$_FleetCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call(
      {String id,
      String shortName,
      String name,
      dynamic handicapScheme,
      String classFlag});
}

/// @nodoc
class __$$_FleetCopyWithImpl<$Res> extends _$FleetCopyWithImpl<$Res, _$_Fleet>
    implements _$$_FleetCopyWith<$Res> {
  __$$_FleetCopyWithImpl(_$_Fleet _value, $Res Function(_$_Fleet) _then)
      : super(_value, _then);

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? shortName = null,
    Object? name = null,
    Object? handicapScheme = freezed,
    Object? classFlag = null,
  }) {
    return _then(_$_Fleet(
      id: null == id
          ? _value.id
          : id // ignore: cast_nullable_to_non_nullable
              as String,
      shortName: null == shortName
          ? _value.shortName
          : shortName // ignore: cast_nullable_to_non_nullable
              as String,
      name: null == name
          ? _value.name
          : name // ignore: cast_nullable_to_non_nullable
              as String,
      handicapScheme:
          freezed == handicapScheme ? _value.handicapScheme! : handicapScheme,
      classFlag: null == classFlag
          ? _value.classFlag
          : classFlag // ignore: cast_nullable_to_non_nullable
              as String,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$_Fleet extends _Fleet {
  const _$_Fleet(
      {this.id = Fleet.unsetId,
      required this.shortName,
      required this.name,
      this.handicapScheme = RatingSystem.ryaPY,
      this.classFlag = ""})
      : super._();

  factory _$_Fleet.fromJson(Map<String, dynamic> json) =>
      _$$_FleetFromJson(json);

  @override
  @JsonKey()
  final String id;
  @override
  final String shortName;
  @override
  final String name;
  @override
  @JsonKey()
  final dynamic handicapScheme;
  @override
  @JsonKey()
  final String classFlag;

  @override
  String toString() {
    return 'Fleet(id: $id, shortName: $shortName, name: $name, handicapScheme: $handicapScheme, classFlag: $classFlag)';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$_Fleet &&
            (identical(other.id, id) || other.id == id) &&
            (identical(other.shortName, shortName) ||
                other.shortName == shortName) &&
            (identical(other.name, name) || other.name == name) &&
            const DeepCollectionEquality()
                .equals(other.handicapScheme, handicapScheme) &&
            (identical(other.classFlag, classFlag) ||
                other.classFlag == classFlag));
  }

  @JsonKey(ignore: true)
  @override
  int get hashCode => Object.hash(runtimeType, id, shortName, name,
      const DeepCollectionEquality().hash(handicapScheme), classFlag);

  @JsonKey(ignore: true)
  @override
  @pragma('vm:prefer-inline')
  _$$_FleetCopyWith<_$_Fleet> get copyWith =>
      __$$_FleetCopyWithImpl<_$_Fleet>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$_FleetToJson(
      this,
    );
  }
}

abstract class _Fleet extends Fleet {
  const factory _Fleet(
      {final String id,
      required final String shortName,
      required final String name,
      final dynamic handicapScheme,
      final String classFlag}) = _$_Fleet;
  const _Fleet._() : super._();

  factory _Fleet.fromJson(Map<String, dynamic> json) = _$_Fleet.fromJson;

  @override
  String get id;
  @override
  String get shortName;
  @override
  String get name;
  @override
  dynamic get handicapScheme;
  @override
  String get classFlag;
  @override
  @JsonKey(ignore: true)
  _$$_FleetCopyWith<_$_Fleet> get copyWith =>
      throw _privateConstructorUsedError;
}
