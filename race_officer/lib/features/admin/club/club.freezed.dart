// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'club.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#custom-getters-and-methods');

Club _$ClubFromJson(Map<String, dynamic> json) {
  return _Club.fromJson(json);
}

/// @nodoc
mixin _$Club {
  String get id => throw _privateConstructorUsedError;
  String get name => throw _privateConstructorUsedError;
  ClubStatus get status => throw _privateConstructorUsedError;
  List<Fleet> get fleets => throw _privateConstructorUsedError;
  List<BoatClass> get boatClasses => throw _privateConstructorUsedError;

  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;
  @JsonKey(ignore: true)
  $ClubCopyWith<Club> get copyWith => throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $ClubCopyWith<$Res> {
  factory $ClubCopyWith(Club value, $Res Function(Club) then) =
      _$ClubCopyWithImpl<$Res, Club>;
  @useResult
  $Res call(
      {String id,
      String name,
      ClubStatus status,
      List<Fleet> fleets,
      List<BoatClass> boatClasses});
}

/// @nodoc
class _$ClubCopyWithImpl<$Res, $Val extends Club>
    implements $ClubCopyWith<$Res> {
  _$ClubCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? name = null,
    Object? status = null,
    Object? fleets = null,
    Object? boatClasses = null,
  }) {
    return _then(_value.copyWith(
      id: null == id
          ? _value.id
          : id // ignore: cast_nullable_to_non_nullable
              as String,
      name: null == name
          ? _value.name
          : name // ignore: cast_nullable_to_non_nullable
              as String,
      status: null == status
          ? _value.status
          : status // ignore: cast_nullable_to_non_nullable
              as ClubStatus,
      fleets: null == fleets
          ? _value.fleets
          : fleets // ignore: cast_nullable_to_non_nullable
              as List<Fleet>,
      boatClasses: null == boatClasses
          ? _value.boatClasses
          : boatClasses // ignore: cast_nullable_to_non_nullable
              as List<BoatClass>,
    ) as $Val);
  }
}

/// @nodoc
abstract class _$$_ClubCopyWith<$Res> implements $ClubCopyWith<$Res> {
  factory _$$_ClubCopyWith(_$_Club value, $Res Function(_$_Club) then) =
      __$$_ClubCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call(
      {String id,
      String name,
      ClubStatus status,
      List<Fleet> fleets,
      List<BoatClass> boatClasses});
}

/// @nodoc
class __$$_ClubCopyWithImpl<$Res> extends _$ClubCopyWithImpl<$Res, _$_Club>
    implements _$$_ClubCopyWith<$Res> {
  __$$_ClubCopyWithImpl(_$_Club _value, $Res Function(_$_Club) _then)
      : super(_value, _then);

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? name = null,
    Object? status = null,
    Object? fleets = null,
    Object? boatClasses = null,
  }) {
    return _then(_$_Club(
      id: null == id
          ? _value.id
          : id // ignore: cast_nullable_to_non_nullable
              as String,
      name: null == name
          ? _value.name
          : name // ignore: cast_nullable_to_non_nullable
              as String,
      status: null == status
          ? _value.status
          : status // ignore: cast_nullable_to_non_nullable
              as ClubStatus,
      fleets: null == fleets
          ? _value._fleets
          : fleets // ignore: cast_nullable_to_non_nullable
              as List<Fleet>,
      boatClasses: null == boatClasses
          ? _value._boatClasses
          : boatClasses // ignore: cast_nullable_to_non_nullable
              as List<BoatClass>,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$_Club extends _Club {
  const _$_Club(
      {required this.id,
      required this.name,
      required this.status,
      final List<Fleet> fleets = const [],
      final List<BoatClass> boatClasses = const []})
      : _fleets = fleets,
        _boatClasses = boatClasses,
        super._();

  factory _$_Club.fromJson(Map<String, dynamic> json) => _$$_ClubFromJson(json);

  @override
  final String id;
  @override
  final String name;
  @override
  final ClubStatus status;
  final List<Fleet> _fleets;
  @override
  @JsonKey()
  List<Fleet> get fleets {
    if (_fleets is EqualUnmodifiableListView) return _fleets;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(_fleets);
  }

  final List<BoatClass> _boatClasses;
  @override
  @JsonKey()
  List<BoatClass> get boatClasses {
    if (_boatClasses is EqualUnmodifiableListView) return _boatClasses;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(_boatClasses);
  }

  @override
  String toString() {
    return 'Club(id: $id, name: $name, status: $status, fleets: $fleets, boatClasses: $boatClasses)';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$_Club &&
            (identical(other.id, id) || other.id == id) &&
            (identical(other.name, name) || other.name == name) &&
            (identical(other.status, status) || other.status == status) &&
            const DeepCollectionEquality().equals(other._fleets, _fleets) &&
            const DeepCollectionEquality()
                .equals(other._boatClasses, _boatClasses));
  }

  @JsonKey(ignore: true)
  @override
  int get hashCode => Object.hash(
      runtimeType,
      id,
      name,
      status,
      const DeepCollectionEquality().hash(_fleets),
      const DeepCollectionEquality().hash(_boatClasses));

  @JsonKey(ignore: true)
  @override
  @pragma('vm:prefer-inline')
  _$$_ClubCopyWith<_$_Club> get copyWith =>
      __$$_ClubCopyWithImpl<_$_Club>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$_ClubToJson(
      this,
    );
  }
}

abstract class _Club extends Club {
  const factory _Club(
      {required final String id,
      required final String name,
      required final ClubStatus status,
      final List<Fleet> fleets,
      final List<BoatClass> boatClasses}) = _$_Club;
  const _Club._() : super._();

  factory _Club.fromJson(Map<String, dynamic> json) = _$_Club.fromJson;

  @override
  String get id;
  @override
  String get name;
  @override
  ClubStatus get status;
  @override
  List<Fleet> get fleets;
  @override
  List<BoatClass> get boatClasses;
  @override
  @JsonKey(ignore: true)
  _$$_ClubCopyWith<_$_Club> get copyWith => throw _privateConstructorUsedError;
}
