// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'series.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#custom-getters-and-methods');

Series _$SeriesFromJson(Map<String, dynamic> json) {
  return _Series.fromJson(json);
}

/// @nodoc
mixin _$Series {
  String get season => throw _privateConstructorUsedError;
  String get id => throw _privateConstructorUsedError;
  String get name => throw _privateConstructorUsedError;
  String get fleetId => throw _privateConstructorUsedError;
  @TimestampSerializer()
  DateTime? get startDate => throw _privateConstructorUsedError;
  @TimestampSerializer()
  DateTime? get endDate => throw _privateConstructorUsedError;
  List<Race> get races => throw _privateConstructorUsedError;
  bool get archived => throw _privateConstructorUsedError;
  SeriesScoringData get scoringScheme => throw _privateConstructorUsedError;
  @optionalTypeArgs
  TResult when<TResult extends Object?>({
    required TResult Function(
            String season,
            String id,
            String name,
            String fleetId,
            @TimestampSerializer() DateTime? startDate,
            @TimestampSerializer() DateTime? endDate,
            List<Race> races,
            bool archived,
            SeriesScoringData scoringScheme)
        def,
  }) =>
      throw _privateConstructorUsedError;
  @optionalTypeArgs
  TResult? whenOrNull<TResult extends Object?>({
    TResult? Function(
            String season,
            String id,
            String name,
            String fleetId,
            @TimestampSerializer() DateTime? startDate,
            @TimestampSerializer() DateTime? endDate,
            List<Race> races,
            bool archived,
            SeriesScoringData scoringScheme)?
        def,
  }) =>
      throw _privateConstructorUsedError;
  @optionalTypeArgs
  TResult maybeWhen<TResult extends Object?>({
    TResult Function(
            String season,
            String id,
            String name,
            String fleetId,
            @TimestampSerializer() DateTime? startDate,
            @TimestampSerializer() DateTime? endDate,
            List<Race> races,
            bool archived,
            SeriesScoringData scoringScheme)?
        def,
    required TResult orElse(),
  }) =>
      throw _privateConstructorUsedError;
  @optionalTypeArgs
  TResult map<TResult extends Object?>({
    required TResult Function(_Series value) def,
  }) =>
      throw _privateConstructorUsedError;
  @optionalTypeArgs
  TResult? mapOrNull<TResult extends Object?>({
    TResult? Function(_Series value)? def,
  }) =>
      throw _privateConstructorUsedError;
  @optionalTypeArgs
  TResult maybeMap<TResult extends Object?>({
    TResult Function(_Series value)? def,
    required TResult orElse(),
  }) =>
      throw _privateConstructorUsedError;
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;
  @JsonKey(ignore: true)
  $SeriesCopyWith<Series> get copyWith => throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $SeriesCopyWith<$Res> {
  factory $SeriesCopyWith(Series value, $Res Function(Series) then) =
      _$SeriesCopyWithImpl<$Res, Series>;
  @useResult
  $Res call(
      {String season,
      String id,
      String name,
      String fleetId,
      @TimestampSerializer() DateTime? startDate,
      @TimestampSerializer() DateTime? endDate,
      List<Race> races,
      bool archived,
      SeriesScoringData scoringScheme});

  $SeriesScoringDataCopyWith<$Res> get scoringScheme;
}

/// @nodoc
class _$SeriesCopyWithImpl<$Res, $Val extends Series>
    implements $SeriesCopyWith<$Res> {
  _$SeriesCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? season = null,
    Object? id = null,
    Object? name = null,
    Object? fleetId = null,
    Object? startDate = freezed,
    Object? endDate = freezed,
    Object? races = null,
    Object? archived = null,
    Object? scoringScheme = null,
  }) {
    return _then(_value.copyWith(
      season: null == season
          ? _value.season
          : season // ignore: cast_nullable_to_non_nullable
              as String,
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
      startDate: freezed == startDate
          ? _value.startDate
          : startDate // ignore: cast_nullable_to_non_nullable
              as DateTime?,
      endDate: freezed == endDate
          ? _value.endDate
          : endDate // ignore: cast_nullable_to_non_nullable
              as DateTime?,
      races: null == races
          ? _value.races
          : races // ignore: cast_nullable_to_non_nullable
              as List<Race>,
      archived: null == archived
          ? _value.archived
          : archived // ignore: cast_nullable_to_non_nullable
              as bool,
      scoringScheme: null == scoringScheme
          ? _value.scoringScheme
          : scoringScheme // ignore: cast_nullable_to_non_nullable
              as SeriesScoringData,
    ) as $Val);
  }

  @override
  @pragma('vm:prefer-inline')
  $SeriesScoringDataCopyWith<$Res> get scoringScheme {
    return $SeriesScoringDataCopyWith<$Res>(_value.scoringScheme, (value) {
      return _then(_value.copyWith(scoringScheme: value) as $Val);
    });
  }
}

/// @nodoc
abstract class _$$_SeriesCopyWith<$Res> implements $SeriesCopyWith<$Res> {
  factory _$$_SeriesCopyWith(_$_Series value, $Res Function(_$_Series) then) =
      __$$_SeriesCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call(
      {String season,
      String id,
      String name,
      String fleetId,
      @TimestampSerializer() DateTime? startDate,
      @TimestampSerializer() DateTime? endDate,
      List<Race> races,
      bool archived,
      SeriesScoringData scoringScheme});

  @override
  $SeriesScoringDataCopyWith<$Res> get scoringScheme;
}

/// @nodoc
class __$$_SeriesCopyWithImpl<$Res>
    extends _$SeriesCopyWithImpl<$Res, _$_Series>
    implements _$$_SeriesCopyWith<$Res> {
  __$$_SeriesCopyWithImpl(_$_Series _value, $Res Function(_$_Series) _then)
      : super(_value, _then);

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? season = null,
    Object? id = null,
    Object? name = null,
    Object? fleetId = null,
    Object? startDate = freezed,
    Object? endDate = freezed,
    Object? races = null,
    Object? archived = null,
    Object? scoringScheme = null,
  }) {
    return _then(_$_Series(
      season: null == season
          ? _value.season
          : season // ignore: cast_nullable_to_non_nullable
              as String,
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
      startDate: freezed == startDate
          ? _value.startDate
          : startDate // ignore: cast_nullable_to_non_nullable
              as DateTime?,
      endDate: freezed == endDate
          ? _value.endDate
          : endDate // ignore: cast_nullable_to_non_nullable
              as DateTime?,
      races: null == races
          ? _value._races
          : races // ignore: cast_nullable_to_non_nullable
              as List<Race>,
      archived: null == archived
          ? _value.archived
          : archived // ignore: cast_nullable_to_non_nullable
              as bool,
      scoringScheme: null == scoringScheme
          ? _value.scoringScheme
          : scoringScheme // ignore: cast_nullable_to_non_nullable
              as SeriesScoringData,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$_Series extends _Series with DiagnosticableTreeMixin {
  _$_Series(
      {required this.season,
      required this.id,
      required this.name,
      required this.fleetId,
      @TimestampSerializer() this.startDate,
      @TimestampSerializer() this.endDate,
      required final List<Race> races,
      required this.archived,
      required this.scoringScheme})
      : _races = races,
        super._();

  factory _$_Series.fromJson(Map<String, dynamic> json) =>
      _$$_SeriesFromJson(json);

  @override
  final String season;
  @override
  final String id;
  @override
  final String name;
  @override
  final String fleetId;
  @override
  @TimestampSerializer()
  final DateTime? startDate;
  @override
  @TimestampSerializer()
  final DateTime? endDate;
  final List<Race> _races;
  @override
  List<Race> get races {
    if (_races is EqualUnmodifiableListView) return _races;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(_races);
  }

  @override
  final bool archived;
  @override
  final SeriesScoringData scoringScheme;

  @override
  String toString({DiagnosticLevel minLevel = DiagnosticLevel.info}) {
    return 'Series.def(season: $season, id: $id, name: $name, fleetId: $fleetId, startDate: $startDate, endDate: $endDate, races: $races, archived: $archived, scoringScheme: $scoringScheme)';
  }

  @override
  void debugFillProperties(DiagnosticPropertiesBuilder properties) {
    super.debugFillProperties(properties);
    properties
      ..add(DiagnosticsProperty('type', 'Series.def'))
      ..add(DiagnosticsProperty('season', season))
      ..add(DiagnosticsProperty('id', id))
      ..add(DiagnosticsProperty('name', name))
      ..add(DiagnosticsProperty('fleetId', fleetId))
      ..add(DiagnosticsProperty('startDate', startDate))
      ..add(DiagnosticsProperty('endDate', endDate))
      ..add(DiagnosticsProperty('races', races))
      ..add(DiagnosticsProperty('archived', archived))
      ..add(DiagnosticsProperty('scoringScheme', scoringScheme));
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$_Series &&
            (identical(other.season, season) || other.season == season) &&
            (identical(other.id, id) || other.id == id) &&
            (identical(other.name, name) || other.name == name) &&
            (identical(other.fleetId, fleetId) || other.fleetId == fleetId) &&
            (identical(other.startDate, startDate) ||
                other.startDate == startDate) &&
            (identical(other.endDate, endDate) || other.endDate == endDate) &&
            const DeepCollectionEquality().equals(other._races, _races) &&
            (identical(other.archived, archived) ||
                other.archived == archived) &&
            (identical(other.scoringScheme, scoringScheme) ||
                other.scoringScheme == scoringScheme));
  }

  @JsonKey(ignore: true)
  @override
  int get hashCode => Object.hash(
      runtimeType,
      season,
      id,
      name,
      fleetId,
      startDate,
      endDate,
      const DeepCollectionEquality().hash(_races),
      archived,
      scoringScheme);

  @JsonKey(ignore: true)
  @override
  @pragma('vm:prefer-inline')
  _$$_SeriesCopyWith<_$_Series> get copyWith =>
      __$$_SeriesCopyWithImpl<_$_Series>(this, _$identity);

  @override
  @optionalTypeArgs
  TResult when<TResult extends Object?>({
    required TResult Function(
            String season,
            String id,
            String name,
            String fleetId,
            @TimestampSerializer() DateTime? startDate,
            @TimestampSerializer() DateTime? endDate,
            List<Race> races,
            bool archived,
            SeriesScoringData scoringScheme)
        def,
  }) {
    return def(season, id, name, fleetId, startDate, endDate, races, archived,
        scoringScheme);
  }

  @override
  @optionalTypeArgs
  TResult? whenOrNull<TResult extends Object?>({
    TResult? Function(
            String season,
            String id,
            String name,
            String fleetId,
            @TimestampSerializer() DateTime? startDate,
            @TimestampSerializer() DateTime? endDate,
            List<Race> races,
            bool archived,
            SeriesScoringData scoringScheme)?
        def,
  }) {
    return def?.call(season, id, name, fleetId, startDate, endDate, races,
        archived, scoringScheme);
  }

  @override
  @optionalTypeArgs
  TResult maybeWhen<TResult extends Object?>({
    TResult Function(
            String season,
            String id,
            String name,
            String fleetId,
            @TimestampSerializer() DateTime? startDate,
            @TimestampSerializer() DateTime? endDate,
            List<Race> races,
            bool archived,
            SeriesScoringData scoringScheme)?
        def,
    required TResult orElse(),
  }) {
    if (def != null) {
      return def(season, id, name, fleetId, startDate, endDate, races, archived,
          scoringScheme);
    }
    return orElse();
  }

  @override
  @optionalTypeArgs
  TResult map<TResult extends Object?>({
    required TResult Function(_Series value) def,
  }) {
    return def(this);
  }

  @override
  @optionalTypeArgs
  TResult? mapOrNull<TResult extends Object?>({
    TResult? Function(_Series value)? def,
  }) {
    return def?.call(this);
  }

  @override
  @optionalTypeArgs
  TResult maybeMap<TResult extends Object?>({
    TResult Function(_Series value)? def,
    required TResult orElse(),
  }) {
    if (def != null) {
      return def(this);
    }
    return orElse();
  }

  @override
  Map<String, dynamic> toJson() {
    return _$$_SeriesToJson(
      this,
    );
  }
}

abstract class _Series extends Series {
  factory _Series(
      {required final String season,
      required final String id,
      required final String name,
      required final String fleetId,
      @TimestampSerializer() final DateTime? startDate,
      @TimestampSerializer() final DateTime? endDate,
      required final List<Race> races,
      required final bool archived,
      required final SeriesScoringData scoringScheme}) = _$_Series;
  _Series._() : super._();

  factory _Series.fromJson(Map<String, dynamic> json) = _$_Series.fromJson;

  @override
  String get season;
  @override
  String get id;
  @override
  String get name;
  @override
  String get fleetId;
  @override
  @TimestampSerializer()
  DateTime? get startDate;
  @override
  @TimestampSerializer()
  DateTime? get endDate;
  @override
  List<Race> get races;
  @override
  bool get archived;
  @override
  SeriesScoringData get scoringScheme;
  @override
  @JsonKey(ignore: true)
  _$$_SeriesCopyWith<_$_Series> get copyWith =>
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
  DateTime get scheduledStart => throw _privateConstructorUsedError;
  int get raceOfDay => throw _privateConstructorUsedError;
  DateTime get actualStart => throw _privateConstructorUsedError;
  RaceType get type => throw _privateConstructorUsedError;
  RaceStatus get status => throw _privateConstructorUsedError;
  bool get isDiscardable => throw _privateConstructorUsedError;
  bool get isAverageLap => throw _privateConstructorUsedError;
  @optionalTypeArgs
  TResult when<TResult extends Object?>({
    required TResult Function(
            String id,
            String name,
            String fleetId,
            String seriesId,
            DateTime scheduledStart,
            int raceOfDay,
            DateTime actualStart,
            RaceType type,
            RaceStatus status,
            bool isDiscardable,
            bool isAverageLap)
        def,
  }) =>
      throw _privateConstructorUsedError;
  @optionalTypeArgs
  TResult? whenOrNull<TResult extends Object?>({
    TResult? Function(
            String id,
            String name,
            String fleetId,
            String seriesId,
            DateTime scheduledStart,
            int raceOfDay,
            DateTime actualStart,
            RaceType type,
            RaceStatus status,
            bool isDiscardable,
            bool isAverageLap)?
        def,
  }) =>
      throw _privateConstructorUsedError;
  @optionalTypeArgs
  TResult maybeWhen<TResult extends Object?>({
    TResult Function(
            String id,
            String name,
            String fleetId,
            String seriesId,
            DateTime scheduledStart,
            int raceOfDay,
            DateTime actualStart,
            RaceType type,
            RaceStatus status,
            bool isDiscardable,
            bool isAverageLap)?
        def,
    required TResult orElse(),
  }) =>
      throw _privateConstructorUsedError;
  @optionalTypeArgs
  TResult map<TResult extends Object?>({
    required TResult Function(_Race value) def,
  }) =>
      throw _privateConstructorUsedError;
  @optionalTypeArgs
  TResult? mapOrNull<TResult extends Object?>({
    TResult? Function(_Race value)? def,
  }) =>
      throw _privateConstructorUsedError;
  @optionalTypeArgs
  TResult maybeMap<TResult extends Object?>({
    TResult Function(_Race value)? def,
    required TResult orElse(),
  }) =>
      throw _privateConstructorUsedError;
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
      DateTime scheduledStart,
      int raceOfDay,
      DateTime actualStart,
      RaceType type,
      RaceStatus status,
      bool isDiscardable,
      bool isAverageLap});
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
    Object? raceOfDay = null,
    Object? actualStart = null,
    Object? type = null,
    Object? status = null,
    Object? isDiscardable = null,
    Object? isAverageLap = null,
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
      raceOfDay: null == raceOfDay
          ? _value.raceOfDay
          : raceOfDay // ignore: cast_nullable_to_non_nullable
              as int,
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
      DateTime scheduledStart,
      int raceOfDay,
      DateTime actualStart,
      RaceType type,
      RaceStatus status,
      bool isDiscardable,
      bool isAverageLap});
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
    Object? raceOfDay = null,
    Object? actualStart = null,
    Object? type = null,
    Object? status = null,
    Object? isDiscardable = null,
    Object? isAverageLap = null,
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
      raceOfDay: null == raceOfDay
          ? _value.raceOfDay
          : raceOfDay // ignore: cast_nullable_to_non_nullable
              as int,
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
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$_Race extends _Race with DiagnosticableTreeMixin {
  _$_Race(
      {required this.id,
      required this.name,
      required this.fleetId,
      required this.seriesId,
      required this.scheduledStart,
      required this.raceOfDay,
      required this.actualStart,
      required this.type,
      required this.status,
      required this.isDiscardable,
      required this.isAverageLap})
      : super._();

  factory _$_Race.fromJson(Map<String, dynamic> json) => _$$_RaceFromJson(json);

  @override
  final String id;
  @override
  final String name;
  @override
  final String fleetId;
  @override
  final String seriesId;
  @override
  final DateTime scheduledStart;
  @override
  final int raceOfDay;
  @override
  final DateTime actualStart;
  @override
  final RaceType type;
  @override
  final RaceStatus status;
  @override
  final bool isDiscardable;
  @override
  final bool isAverageLap;

  @override
  String toString({DiagnosticLevel minLevel = DiagnosticLevel.info}) {
    return 'Race.def(id: $id, name: $name, fleetId: $fleetId, seriesId: $seriesId, scheduledStart: $scheduledStart, raceOfDay: $raceOfDay, actualStart: $actualStart, type: $type, status: $status, isDiscardable: $isDiscardable, isAverageLap: $isAverageLap)';
  }

  @override
  void debugFillProperties(DiagnosticPropertiesBuilder properties) {
    super.debugFillProperties(properties);
    properties
      ..add(DiagnosticsProperty('type', 'Race.def'))
      ..add(DiagnosticsProperty('id', id))
      ..add(DiagnosticsProperty('name', name))
      ..add(DiagnosticsProperty('fleetId', fleetId))
      ..add(DiagnosticsProperty('seriesId', seriesId))
      ..add(DiagnosticsProperty('scheduledStart', scheduledStart))
      ..add(DiagnosticsProperty('raceOfDay', raceOfDay))
      ..add(DiagnosticsProperty('actualStart', actualStart))
      ..add(DiagnosticsProperty('type', type))
      ..add(DiagnosticsProperty('status', status))
      ..add(DiagnosticsProperty('isDiscardable', isDiscardable))
      ..add(DiagnosticsProperty('isAverageLap', isAverageLap));
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
            (identical(other.raceOfDay, raceOfDay) ||
                other.raceOfDay == raceOfDay) &&
            (identical(other.actualStart, actualStart) ||
                other.actualStart == actualStart) &&
            (identical(other.type, type) || other.type == type) &&
            (identical(other.status, status) || other.status == status) &&
            (identical(other.isDiscardable, isDiscardable) ||
                other.isDiscardable == isDiscardable) &&
            (identical(other.isAverageLap, isAverageLap) ||
                other.isAverageLap == isAverageLap));
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
      raceOfDay,
      actualStart,
      type,
      status,
      isDiscardable,
      isAverageLap);

  @JsonKey(ignore: true)
  @override
  @pragma('vm:prefer-inline')
  _$$_RaceCopyWith<_$_Race> get copyWith =>
      __$$_RaceCopyWithImpl<_$_Race>(this, _$identity);

  @override
  @optionalTypeArgs
  TResult when<TResult extends Object?>({
    required TResult Function(
            String id,
            String name,
            String fleetId,
            String seriesId,
            DateTime scheduledStart,
            int raceOfDay,
            DateTime actualStart,
            RaceType type,
            RaceStatus status,
            bool isDiscardable,
            bool isAverageLap)
        def,
  }) {
    return def(id, name, fleetId, seriesId, scheduledStart, raceOfDay,
        actualStart, type, status, isDiscardable, isAverageLap);
  }

  @override
  @optionalTypeArgs
  TResult? whenOrNull<TResult extends Object?>({
    TResult? Function(
            String id,
            String name,
            String fleetId,
            String seriesId,
            DateTime scheduledStart,
            int raceOfDay,
            DateTime actualStart,
            RaceType type,
            RaceStatus status,
            bool isDiscardable,
            bool isAverageLap)?
        def,
  }) {
    return def?.call(id, name, fleetId, seriesId, scheduledStart, raceOfDay,
        actualStart, type, status, isDiscardable, isAverageLap);
  }

  @override
  @optionalTypeArgs
  TResult maybeWhen<TResult extends Object?>({
    TResult Function(
            String id,
            String name,
            String fleetId,
            String seriesId,
            DateTime scheduledStart,
            int raceOfDay,
            DateTime actualStart,
            RaceType type,
            RaceStatus status,
            bool isDiscardable,
            bool isAverageLap)?
        def,
    required TResult orElse(),
  }) {
    if (def != null) {
      return def(id, name, fleetId, seriesId, scheduledStart, raceOfDay,
          actualStart, type, status, isDiscardable, isAverageLap);
    }
    return orElse();
  }

  @override
  @optionalTypeArgs
  TResult map<TResult extends Object?>({
    required TResult Function(_Race value) def,
  }) {
    return def(this);
  }

  @override
  @optionalTypeArgs
  TResult? mapOrNull<TResult extends Object?>({
    TResult? Function(_Race value)? def,
  }) {
    return def?.call(this);
  }

  @override
  @optionalTypeArgs
  TResult maybeMap<TResult extends Object?>({
    TResult Function(_Race value)? def,
    required TResult orElse(),
  }) {
    if (def != null) {
      return def(this);
    }
    return orElse();
  }

  @override
  Map<String, dynamic> toJson() {
    return _$$_RaceToJson(
      this,
    );
  }
}

abstract class _Race extends Race {
  factory _Race(
      {required final String id,
      required final String name,
      required final String fleetId,
      required final String seriesId,
      required final DateTime scheduledStart,
      required final int raceOfDay,
      required final DateTime actualStart,
      required final RaceType type,
      required final RaceStatus status,
      required final bool isDiscardable,
      required final bool isAverageLap}) = _$_Race;
  _Race._() : super._();

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
  DateTime get scheduledStart;
  @override
  int get raceOfDay;
  @override
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
  @JsonKey(ignore: true)
  _$$_RaceCopyWith<_$_Race> get copyWith => throw _privateConstructorUsedError;
}
