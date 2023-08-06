// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'race_series.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#custom-getters-and-methods');

RaceSeries _$RaceSeriesFromJson(Map<String, dynamic> json) {
  return _RaceSeries.fromJson(json);
}

/// @nodoc
mixin _$RaceSeries {
  String get id => throw _privateConstructorUsedError;
  String get name => throw _privateConstructorUsedError;
  String get fleetId => throw _privateConstructorUsedError;
  @TimestampSerializer()
  DateTime get startDate => throw _privateConstructorUsedError;
  @TimestampSerializer()
  DateTime get endDate => throw _privateConstructorUsedError;
  List<Race> get races => throw _privateConstructorUsedError;

  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;
  @JsonKey(ignore: true)
  $RaceSeriesCopyWith<RaceSeries> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $RaceSeriesCopyWith<$Res> {
  factory $RaceSeriesCopyWith(
          RaceSeries value, $Res Function(RaceSeries) then) =
      _$RaceSeriesCopyWithImpl<$Res, RaceSeries>;
  @useResult
  $Res call(
      {String id,
      String name,
      String fleetId,
      @TimestampSerializer() DateTime startDate,
      @TimestampSerializer() DateTime endDate,
      List<Race> races});
}

/// @nodoc
class _$RaceSeriesCopyWithImpl<$Res, $Val extends RaceSeries>
    implements $RaceSeriesCopyWith<$Res> {
  _$RaceSeriesCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? name = null,
    Object? fleetId = null,
    Object? startDate = null,
    Object? endDate = null,
    Object? races = null,
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
      fleetId: null == fleetId
          ? _value.fleetId
          : fleetId // ignore: cast_nullable_to_non_nullable
              as String,
      startDate: null == startDate
          ? _value.startDate
          : startDate // ignore: cast_nullable_to_non_nullable
              as DateTime,
      endDate: null == endDate
          ? _value.endDate
          : endDate // ignore: cast_nullable_to_non_nullable
              as DateTime,
      races: null == races
          ? _value.races
          : races // ignore: cast_nullable_to_non_nullable
              as List<Race>,
    ) as $Val);
  }
}

/// @nodoc
abstract class _$$_RaceSeriesCopyWith<$Res>
    implements $RaceSeriesCopyWith<$Res> {
  factory _$$_RaceSeriesCopyWith(
          _$_RaceSeries value, $Res Function(_$_RaceSeries) then) =
      __$$_RaceSeriesCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call(
      {String id,
      String name,
      String fleetId,
      @TimestampSerializer() DateTime startDate,
      @TimestampSerializer() DateTime endDate,
      List<Race> races});
}

/// @nodoc
class __$$_RaceSeriesCopyWithImpl<$Res>
    extends _$RaceSeriesCopyWithImpl<$Res, _$_RaceSeries>
    implements _$$_RaceSeriesCopyWith<$Res> {
  __$$_RaceSeriesCopyWithImpl(
      _$_RaceSeries _value, $Res Function(_$_RaceSeries) _then)
      : super(_value, _then);

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? name = null,
    Object? fleetId = null,
    Object? startDate = null,
    Object? endDate = null,
    Object? races = null,
  }) {
    return _then(_$_RaceSeries(
      id: null == id
          ? _value.id
          : id // ignore: cast_nullable_to_non_nullable
              as String,
      name: null == name
          ? _value.name
          : name // ignore: cast_nullable_to_non_nullable
              as String,
      fleetId: null == fleetId
          ? _value.fleetId
          : fleetId // ignore: cast_nullable_to_non_nullable
              as String,
      startDate: null == startDate
          ? _value.startDate
          : startDate // ignore: cast_nullable_to_non_nullable
              as DateTime,
      endDate: null == endDate
          ? _value.endDate
          : endDate // ignore: cast_nullable_to_non_nullable
              as DateTime,
      races: null == races
          ? _value._races
          : races // ignore: cast_nullable_to_non_nullable
              as List<Race>,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$_RaceSeries extends _RaceSeries {
  const _$_RaceSeries(
      {this.id = RaceSeries.unsetId,
      required this.name,
      required this.fleetId,
      @TimestampSerializer() required this.startDate,
      @TimestampSerializer() required this.endDate,
      final List<Race> races = const []})
      : _races = races,
        super._();

  factory _$_RaceSeries.fromJson(Map<String, dynamic> json) =>
      _$$_RaceSeriesFromJson(json);

  @override
  @JsonKey()
  final String id;
  @override
  final String name;
  @override
  final String fleetId;
  @override
  @TimestampSerializer()
  final DateTime startDate;
  @override
  @TimestampSerializer()
  final DateTime endDate;
  final List<Race> _races;
  @override
  @JsonKey()
  List<Race> get races {
    if (_races is EqualUnmodifiableListView) return _races;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(_races);
  }

  @override
  String toString() {
    return 'RaceSeries(id: $id, name: $name, fleetId: $fleetId, startDate: $startDate, endDate: $endDate, races: $races)';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$_RaceSeries &&
            (identical(other.id, id) || other.id == id) &&
            (identical(other.name, name) || other.name == name) &&
            (identical(other.fleetId, fleetId) || other.fleetId == fleetId) &&
            (identical(other.startDate, startDate) ||
                other.startDate == startDate) &&
            (identical(other.endDate, endDate) || other.endDate == endDate) &&
            const DeepCollectionEquality().equals(other._races, _races));
  }

  @JsonKey(ignore: true)
  @override
  int get hashCode => Object.hash(runtimeType, id, name, fleetId, startDate,
      endDate, const DeepCollectionEquality().hash(_races));

  @JsonKey(ignore: true)
  @override
  @pragma('vm:prefer-inline')
  _$$_RaceSeriesCopyWith<_$_RaceSeries> get copyWith =>
      __$$_RaceSeriesCopyWithImpl<_$_RaceSeries>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$_RaceSeriesToJson(
      this,
    );
  }
}

abstract class _RaceSeries extends RaceSeries {
  const factory _RaceSeries(
      {final String id,
      required final String name,
      required final String fleetId,
      @TimestampSerializer() required final DateTime startDate,
      @TimestampSerializer() required final DateTime endDate,
      final List<Race> races}) = _$_RaceSeries;
  const _RaceSeries._() : super._();

  factory _RaceSeries.fromJson(Map<String, dynamic> json) =
      _$_RaceSeries.fromJson;

  @override
  String get id;
  @override
  String get name;
  @override
  String get fleetId;
  @override
  @TimestampSerializer()
  DateTime get startDate;
  @override
  @TimestampSerializer()
  DateTime get endDate;
  @override
  List<Race> get races;
  @override
  @JsonKey(ignore: true)
  _$$_RaceSeriesCopyWith<_$_RaceSeries> get copyWith =>
      throw _privateConstructorUsedError;
}

Race _$RaceFromJson(Map<String, dynamic> json) {
  return _Race.fromJson(json);
}

/// @nodoc
mixin _$Race {
  String get id => throw _privateConstructorUsedError;
  String get name => throw _privateConstructorUsedError;
  String get fleetId => throw _privateConstructorUsedError;
  String get seriesId => throw _privateConstructorUsedError;
  @TimestampSerializer()
  DateTime get scheduledStart => throw _privateConstructorUsedError;
  @TimestampSerializer()
  DateTime get actualStart => throw _privateConstructorUsedError;
  RaceType get type => throw _privateConstructorUsedError;
  RaceStatus get status => throw _privateConstructorUsedError;
  bool get isDiscardable => throw _privateConstructorUsedError;
  bool get isAverageLap => throw _privateConstructorUsedError;
  int get startNumber => throw _privateConstructorUsedError;

  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;
  @JsonKey(ignore: true)
  $RaceCopyWith<Race> get copyWith => throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $RaceCopyWith<$Res> {
  factory $RaceCopyWith(Race value, $Res Function(Race) then) =
      _$RaceCopyWithImpl<$Res, Race>;
  @useResult
  $Res call(
      {String id,
      String name,
      String fleetId,
      String seriesId,
      @TimestampSerializer() DateTime scheduledStart,
      @TimestampSerializer() DateTime actualStart,
      RaceType type,
      RaceStatus status,
      bool isDiscardable,
      bool isAverageLap,
      int startNumber});
}

/// @nodoc
class _$RaceCopyWithImpl<$Res, $Val extends Race>
    implements $RaceCopyWith<$Res> {
  _$RaceCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? name = null,
    Object? fleetId = null,
    Object? seriesId = null,
    Object? scheduledStart = null,
    Object? actualStart = null,
    Object? type = null,
    Object? status = null,
    Object? isDiscardable = null,
    Object? isAverageLap = null,
    Object? startNumber = null,
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
      fleetId: null == fleetId
          ? _value.fleetId
          : fleetId // ignore: cast_nullable_to_non_nullable
              as String,
      seriesId: null == seriesId
          ? _value.seriesId
          : seriesId // ignore: cast_nullable_to_non_nullable
              as String,
      scheduledStart: null == scheduledStart
          ? _value.scheduledStart
          : scheduledStart // ignore: cast_nullable_to_non_nullable
              as DateTime,
      actualStart: null == actualStart
          ? _value.actualStart
          : actualStart // ignore: cast_nullable_to_non_nullable
              as DateTime,
      type: null == type
          ? _value.type
          : type // ignore: cast_nullable_to_non_nullable
              as RaceType,
      status: null == status
          ? _value.status
          : status // ignore: cast_nullable_to_non_nullable
              as RaceStatus,
      isDiscardable: null == isDiscardable
          ? _value.isDiscardable
          : isDiscardable // ignore: cast_nullable_to_non_nullable
              as bool,
      isAverageLap: null == isAverageLap
          ? _value.isAverageLap
          : isAverageLap // ignore: cast_nullable_to_non_nullable
              as bool,
      startNumber: null == startNumber
          ? _value.startNumber
          : startNumber // ignore: cast_nullable_to_non_nullable
              as int,
    ) as $Val);
  }
}

/// @nodoc
abstract class _$$_RaceCopyWith<$Res> implements $RaceCopyWith<$Res> {
  factory _$$_RaceCopyWith(_$_Race value, $Res Function(_$_Race) then) =
      __$$_RaceCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call(
      {String id,
      String name,
      String fleetId,
      String seriesId,
      @TimestampSerializer() DateTime scheduledStart,
      @TimestampSerializer() DateTime actualStart,
      RaceType type,
      RaceStatus status,
      bool isDiscardable,
      bool isAverageLap,
      int startNumber});
}

/// @nodoc
class __$$_RaceCopyWithImpl<$Res> extends _$RaceCopyWithImpl<$Res, _$_Race>
    implements _$$_RaceCopyWith<$Res> {
  __$$_RaceCopyWithImpl(_$_Race _value, $Res Function(_$_Race) _then)
      : super(_value, _then);

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? name = null,
    Object? fleetId = null,
    Object? seriesId = null,
    Object? scheduledStart = null,
    Object? actualStart = null,
    Object? type = null,
    Object? status = null,
    Object? isDiscardable = null,
    Object? isAverageLap = null,
    Object? startNumber = null,
  }) {
    return _then(_$_Race(
      id: null == id
          ? _value.id
          : id // ignore: cast_nullable_to_non_nullable
              as String,
      name: null == name
          ? _value.name
          : name // ignore: cast_nullable_to_non_nullable
              as String,
      fleetId: null == fleetId
          ? _value.fleetId
          : fleetId // ignore: cast_nullable_to_non_nullable
              as String,
      seriesId: null == seriesId
          ? _value.seriesId
          : seriesId // ignore: cast_nullable_to_non_nullable
              as String,
      scheduledStart: null == scheduledStart
          ? _value.scheduledStart
          : scheduledStart // ignore: cast_nullable_to_non_nullable
              as DateTime,
      actualStart: null == actualStart
          ? _value.actualStart
          : actualStart // ignore: cast_nullable_to_non_nullable
              as DateTime,
      type: null == type
          ? _value.type
          : type // ignore: cast_nullable_to_non_nullable
              as RaceType,
      status: null == status
          ? _value.status
          : status // ignore: cast_nullable_to_non_nullable
              as RaceStatus,
      isDiscardable: null == isDiscardable
          ? _value.isDiscardable
          : isDiscardable // ignore: cast_nullable_to_non_nullable
              as bool,
      isAverageLap: null == isAverageLap
          ? _value.isAverageLap
          : isAverageLap // ignore: cast_nullable_to_non_nullable
              as bool,
      startNumber: null == startNumber
          ? _value.startNumber
          : startNumber // ignore: cast_nullable_to_non_nullable
              as int,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$_Race extends _Race {
  const _$_Race(
      {this.id = RaceSeries.unsetId,
      required this.name,
      required this.fleetId,
      required this.seriesId,
      @TimestampSerializer() required this.scheduledStart,
      @TimestampSerializer() required this.actualStart,
      this.type = RaceType.conventional,
      this.status = RaceStatus.future,
      this.isDiscardable = true,
      this.isAverageLap = true,
      required this.startNumber})
      : super._();

  factory _$_Race.fromJson(Map<String, dynamic> json) => _$$_RaceFromJson(json);

  @override
  @JsonKey()
  final String id;
  @override
  final String name;
  @override
  final String fleetId;
  @override
  final String seriesId;
  @override
  @TimestampSerializer()
  final DateTime scheduledStart;
  @override
  @TimestampSerializer()
  final DateTime actualStart;
  @override
  @JsonKey()
  final RaceType type;
  @override
  @JsonKey()
  final RaceStatus status;
  @override
  @JsonKey()
  final bool isDiscardable;
  @override
  @JsonKey()
  final bool isAverageLap;
  @override
  final int startNumber;

  @override
  String toString() {
    return 'Race(id: $id, name: $name, fleetId: $fleetId, seriesId: $seriesId, scheduledStart: $scheduledStart, actualStart: $actualStart, type: $type, status: $status, isDiscardable: $isDiscardable, isAverageLap: $isAverageLap, startNumber: $startNumber)';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$_Race &&
            (identical(other.id, id) || other.id == id) &&
            (identical(other.name, name) || other.name == name) &&
            (identical(other.fleetId, fleetId) || other.fleetId == fleetId) &&
            (identical(other.seriesId, seriesId) ||
                other.seriesId == seriesId) &&
            (identical(other.scheduledStart, scheduledStart) ||
                other.scheduledStart == scheduledStart) &&
            (identical(other.actualStart, actualStart) ||
                other.actualStart == actualStart) &&
            (identical(other.type, type) || other.type == type) &&
            (identical(other.status, status) || other.status == status) &&
            (identical(other.isDiscardable, isDiscardable) ||
                other.isDiscardable == isDiscardable) &&
            (identical(other.isAverageLap, isAverageLap) ||
                other.isAverageLap == isAverageLap) &&
            (identical(other.startNumber, startNumber) ||
                other.startNumber == startNumber));
  }

  @JsonKey(ignore: true)
  @override
  int get hashCode => Object.hash(
      runtimeType,
      id,
      name,
      fleetId,
      seriesId,
      scheduledStart,
      actualStart,
      type,
      status,
      isDiscardable,
      isAverageLap,
      startNumber);

  @JsonKey(ignore: true)
  @override
  @pragma('vm:prefer-inline')
  _$$_RaceCopyWith<_$_Race> get copyWith =>
      __$$_RaceCopyWithImpl<_$_Race>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$_RaceToJson(
      this,
    );
  }
}

abstract class _Race extends Race {
  const factory _Race(
      {final String id,
      required final String name,
      required final String fleetId,
      required final String seriesId,
      @TimestampSerializer() required final DateTime scheduledStart,
      @TimestampSerializer() required final DateTime actualStart,
      final RaceType type,
      final RaceStatus status,
      final bool isDiscardable,
      final bool isAverageLap,
      required final int startNumber}) = _$_Race;
  const _Race._() : super._();

  factory _Race.fromJson(Map<String, dynamic> json) = _$_Race.fromJson;

  @override
  String get id;
  @override
  String get name;
  @override
  String get fleetId;
  @override
  String get seriesId;
  @override
  @TimestampSerializer()
  DateTime get scheduledStart;
  @override
  @TimestampSerializer()
  DateTime get actualStart;
  @override
  RaceType get type;
  @override
  RaceStatus get status;
  @override
  bool get isDiscardable;
  @override
  bool get isAverageLap;
  @override
  int get startNumber;
  @override
  @JsonKey(ignore: true)
  _$$_RaceCopyWith<_$_Race> get copyWith => throw _privateConstructorUsedError;
}
