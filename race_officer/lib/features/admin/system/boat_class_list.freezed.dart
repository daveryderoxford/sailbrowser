// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'boat_class_list.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#custom-getters-and-methods');

BoatClassList _$BoatClassListFromJson(Map<String, dynamic> json) {
  return _BoatClassList.fromJson(json);
}

/// @nodoc
mixin _$BoatClassList {
  String get name => throw _privateConstructorUsedError;
  HandicapScheme get handicapScheme => throw _privateConstructorUsedError;
  List<BoatClass> get boats => throw _privateConstructorUsedError;

  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;
  @JsonKey(ignore: true)
  $BoatClassListCopyWith<BoatClassList> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $BoatClassListCopyWith<$Res> {
  factory $BoatClassListCopyWith(
          BoatClassList value, $Res Function(BoatClassList) then) =
      _$BoatClassListCopyWithImpl<$Res, BoatClassList>;
  @useResult
  $Res call(
      {String name, HandicapScheme handicapScheme, List<BoatClass> boats});
}

/// @nodoc
class _$BoatClassListCopyWithImpl<$Res, $Val extends BoatClassList>
    implements $BoatClassListCopyWith<$Res> {
  _$BoatClassListCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? name = null,
    Object? handicapScheme = null,
    Object? boats = null,
  }) {
    return _then(_value.copyWith(
      name: null == name
          ? _value.name
          : name // ignore: cast_nullable_to_non_nullable
              as String,
      handicapScheme: null == handicapScheme
          ? _value.handicapScheme
          : handicapScheme // ignore: cast_nullable_to_non_nullable
              as HandicapScheme,
      boats: null == boats
          ? _value.boats
          : boats // ignore: cast_nullable_to_non_nullable
              as List<BoatClass>,
    ) as $Val);
  }
}

/// @nodoc
abstract class _$$_BoatClassListCopyWith<$Res>
    implements $BoatClassListCopyWith<$Res> {
  factory _$$_BoatClassListCopyWith(
          _$_BoatClassList value, $Res Function(_$_BoatClassList) then) =
      __$$_BoatClassListCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call(
      {String name, HandicapScheme handicapScheme, List<BoatClass> boats});
}

/// @nodoc
class __$$_BoatClassListCopyWithImpl<$Res>
    extends _$BoatClassListCopyWithImpl<$Res, _$_BoatClassList>
    implements _$$_BoatClassListCopyWith<$Res> {
  __$$_BoatClassListCopyWithImpl(
      _$_BoatClassList _value, $Res Function(_$_BoatClassList) _then)
      : super(_value, _then);

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? name = null,
    Object? handicapScheme = null,
    Object? boats = null,
  }) {
    return _then(_$_BoatClassList(
      name: null == name
          ? _value.name
          : name // ignore: cast_nullable_to_non_nullable
              as String,
      handicapScheme: null == handicapScheme
          ? _value.handicapScheme
          : handicapScheme // ignore: cast_nullable_to_non_nullable
              as HandicapScheme,
      boats: null == boats
          ? _value._boats
          : boats // ignore: cast_nullable_to_non_nullable
              as List<BoatClass>,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$_BoatClassList extends _BoatClassList {
  const _$_BoatClassList(
      {required this.name,
      required this.handicapScheme,
      final List<BoatClass> boats = const []})
      : _boats = boats,
        super._();

  factory _$_BoatClassList.fromJson(Map<String, dynamic> json) =>
      _$$_BoatClassListFromJson(json);

  @override
  final String name;
  @override
  final HandicapScheme handicapScheme;
  final List<BoatClass> _boats;
  @override
  @JsonKey()
  List<BoatClass> get boats {
    if (_boats is EqualUnmodifiableListView) return _boats;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(_boats);
  }

  @override
  String toString() {
    return 'BoatClassList(name: $name, handicapScheme: $handicapScheme, boats: $boats)';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$_BoatClassList &&
            (identical(other.name, name) || other.name == name) &&
            (identical(other.handicapScheme, handicapScheme) ||
                other.handicapScheme == handicapScheme) &&
            const DeepCollectionEquality().equals(other._boats, _boats));
  }

  @JsonKey(ignore: true)
  @override
  int get hashCode => Object.hash(runtimeType, name, handicapScheme,
      const DeepCollectionEquality().hash(_boats));

  @JsonKey(ignore: true)
  @override
  @pragma('vm:prefer-inline')
  _$$_BoatClassListCopyWith<_$_BoatClassList> get copyWith =>
      __$$_BoatClassListCopyWithImpl<_$_BoatClassList>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$_BoatClassListToJson(
      this,
    );
  }
}

abstract class _BoatClassList extends BoatClassList {
  const factory _BoatClassList(
      {required final String name,
      required final HandicapScheme handicapScheme,
      final List<BoatClass> boats}) = _$_BoatClassList;
  const _BoatClassList._() : super._();

  factory _BoatClassList.fromJson(Map<String, dynamic> json) =
      _$_BoatClassList.fromJson;

  @override
  String get name;
  @override
  HandicapScheme get handicapScheme;
  @override
  List<BoatClass> get boats;
  @override
  @JsonKey(ignore: true)
  _$$_BoatClassListCopyWith<_$_BoatClassList> get copyWith =>
      throw _privateConstructorUsedError;
}
