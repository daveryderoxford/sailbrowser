// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'boat.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#custom-getters-and-methods');

Boat _$BoatFromJson(Map<String, dynamic> json) {
  return _Boat.fromJson(json);
}

/// @nodoc
mixin _$Boat {
  String get id => throw _privateConstructorUsedError;
  int get sailNumber => throw _privateConstructorUsedError;
  String get sailingClass => throw _privateConstructorUsedError;
  BoatType get type => throw _privateConstructorUsedError;
  String get name => throw _privateConstructorUsedError;
  String get owner => throw _privateConstructorUsedError;
  String get helm => throw _privateConstructorUsedError;
  String get crew => throw _privateConstructorUsedError;

  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;
  @JsonKey(ignore: true)
  $BoatCopyWith<Boat> get copyWith => throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $BoatCopyWith<$Res> {
  factory $BoatCopyWith(Boat value, $Res Function(Boat) then) =
      _$BoatCopyWithImpl<$Res, Boat>;
  @useResult
  $Res call(
      {String id,
      int sailNumber,
      String sailingClass,
      BoatType type,
      String name,
      String owner,
      String helm,
      String crew});
}

/// @nodoc
class _$BoatCopyWithImpl<$Res, $Val extends Boat>
    implements $BoatCopyWith<$Res> {
  _$BoatCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? sailNumber = null,
    Object? sailingClass = null,
    Object? type = null,
    Object? name = null,
    Object? owner = null,
    Object? helm = null,
    Object? crew = null,
  }) {
    return _then(_value.copyWith(
      id: null == id
          ? _value.id
          : id // ignore: cast_nullable_to_non_nullable
              as String,
      sailNumber: null == sailNumber
          ? _value.sailNumber
          : sailNumber // ignore: cast_nullable_to_non_nullable
              as int,
      sailingClass: null == sailingClass
          ? _value.sailingClass
          : sailingClass // ignore: cast_nullable_to_non_nullable
              as String,
      type: null == type
          ? _value.type
          : type // ignore: cast_nullable_to_non_nullable
              as BoatType,
      name: null == name
          ? _value.name
          : name // ignore: cast_nullable_to_non_nullable
              as String,
      owner: null == owner
          ? _value.owner
          : owner // ignore: cast_nullable_to_non_nullable
              as String,
      helm: null == helm
          ? _value.helm
          : helm // ignore: cast_nullable_to_non_nullable
              as String,
      crew: null == crew
          ? _value.crew
          : crew // ignore: cast_nullable_to_non_nullable
              as String,
    ) as $Val);
  }
}

/// @nodoc
abstract class _$$_BoatCopyWith<$Res> implements $BoatCopyWith<$Res> {
  factory _$$_BoatCopyWith(_$_Boat value, $Res Function(_$_Boat) then) =
      __$$_BoatCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call(
      {String id,
      int sailNumber,
      String sailingClass,
      BoatType type,
      String name,
      String owner,
      String helm,
      String crew});
}

/// @nodoc
class __$$_BoatCopyWithImpl<$Res> extends _$BoatCopyWithImpl<$Res, _$_Boat>
    implements _$$_BoatCopyWith<$Res> {
  __$$_BoatCopyWithImpl(_$_Boat _value, $Res Function(_$_Boat) _then)
      : super(_value, _then);

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? sailNumber = null,
    Object? sailingClass = null,
    Object? type = null,
    Object? name = null,
    Object? owner = null,
    Object? helm = null,
    Object? crew = null,
  }) {
    return _then(_$_Boat(
      id: null == id
          ? _value.id
          : id // ignore: cast_nullable_to_non_nullable
              as String,
      sailNumber: null == sailNumber
          ? _value.sailNumber
          : sailNumber // ignore: cast_nullable_to_non_nullable
              as int,
      sailingClass: null == sailingClass
          ? _value.sailingClass
          : sailingClass // ignore: cast_nullable_to_non_nullable
              as String,
      type: null == type
          ? _value.type
          : type // ignore: cast_nullable_to_non_nullable
              as BoatType,
      name: null == name
          ? _value.name
          : name // ignore: cast_nullable_to_non_nullable
              as String,
      owner: null == owner
          ? _value.owner
          : owner // ignore: cast_nullable_to_non_nullable
              as String,
      helm: null == helm
          ? _value.helm
          : helm // ignore: cast_nullable_to_non_nullable
              as String,
      crew: null == crew
          ? _value.crew
          : crew // ignore: cast_nullable_to_non_nullable
              as String,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$_Boat extends _Boat with DiagnosticableTreeMixin {
  const _$_Boat(
      {this.id = "UNSET_ID",
      required this.sailNumber,
      required this.sailingClass,
      required this.type,
      this.name = "",
      this.owner = "",
      this.helm = "",
      this.crew = ""})
      : super._();

  factory _$_Boat.fromJson(Map<String, dynamic> json) => _$$_BoatFromJson(json);

  @override
  @JsonKey()
  final String id;
  @override
  final int sailNumber;
  @override
  final String sailingClass;
  @override
  final BoatType type;
  @override
  @JsonKey()
  final String name;
  @override
  @JsonKey()
  final String owner;
  @override
  @JsonKey()
  final String helm;
  @override
  @JsonKey()
  final String crew;

  @override
  String toString({DiagnosticLevel minLevel = DiagnosticLevel.info}) {
    return 'Boat(id: $id, sailNumber: $sailNumber, sailingClass: $sailingClass, type: $type, name: $name, owner: $owner, helm: $helm, crew: $crew)';
  }

  @override
  void debugFillProperties(DiagnosticPropertiesBuilder properties) {
    super.debugFillProperties(properties);
    properties
      ..add(DiagnosticsProperty('type', 'Boat'))
      ..add(DiagnosticsProperty('id', id))
      ..add(DiagnosticsProperty('sailNumber', sailNumber))
      ..add(DiagnosticsProperty('sailingClass', sailingClass))
      ..add(DiagnosticsProperty('type', type))
      ..add(DiagnosticsProperty('name', name))
      ..add(DiagnosticsProperty('owner', owner))
      ..add(DiagnosticsProperty('helm', helm))
      ..add(DiagnosticsProperty('crew', crew));
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$_Boat &&
            (identical(other.id, id) || other.id == id) &&
            (identical(other.sailNumber, sailNumber) ||
                other.sailNumber == sailNumber) &&
            (identical(other.sailingClass, sailingClass) ||
                other.sailingClass == sailingClass) &&
            (identical(other.type, type) || other.type == type) &&
            (identical(other.name, name) || other.name == name) &&
            (identical(other.owner, owner) || other.owner == owner) &&
            (identical(other.helm, helm) || other.helm == helm) &&
            (identical(other.crew, crew) || other.crew == crew));
  }

  @JsonKey(ignore: true)
  @override
  int get hashCode => Object.hash(
      runtimeType, id, sailNumber, sailingClass, type, name, owner, helm, crew);

  @JsonKey(ignore: true)
  @override
  @pragma('vm:prefer-inline')
  _$$_BoatCopyWith<_$_Boat> get copyWith =>
      __$$_BoatCopyWithImpl<_$_Boat>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$_BoatToJson(
      this,
    );
  }
}

abstract class _Boat extends Boat {
  const factory _Boat(
      {final String id,
      required final int sailNumber,
      required final String sailingClass,
      required final BoatType type,
      final String name,
      final String owner,
      final String helm,
      final String crew}) = _$_Boat;
  const _Boat._() : super._();

  factory _Boat.fromJson(Map<String, dynamic> json) = _$_Boat.fromJson;

  @override
  String get id;
  @override
  int get sailNumber;
  @override
  String get sailingClass;
  @override
  BoatType get type;
  @override
  String get name;
  @override
  String get owner;
  @override
  String get helm;
  @override
  String get crew;
  @override
  @JsonKey(ignore: true)
  _$$_BoatCopyWith<_$_Boat> get copyWith => throw _privateConstructorUsedError;
}
