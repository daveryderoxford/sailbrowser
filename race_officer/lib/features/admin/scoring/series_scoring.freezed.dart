// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'series_scoring.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#custom-getters-and-methods');

SeriesScoringData _$SeriesScoringDataFromJson(Map<String, dynamic> json) {
  return _SeriesScoringDefinition.fromJson(json);
}

/// @nodoc
mixin _$SeriesScoringData {
  SeriesScoringScheme get scheme => throw _privateConstructorUsedError;
  int get initialDiscardAfter => throw _privateConstructorUsedError;
  int get subsequentDiscardsEveryN => throw _privateConstructorUsedError;
  SeriesEntryAlgorithm get entryAlgorithm => throw _privateConstructorUsedError;

  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;
  @JsonKey(ignore: true)
  $SeriesScoringDataCopyWith<SeriesScoringData> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $SeriesScoringDataCopyWith<$Res> {
  factory $SeriesScoringDataCopyWith(
          SeriesScoringData value, $Res Function(SeriesScoringData) then) =
      _$SeriesScoringDataCopyWithImpl<$Res, SeriesScoringData>;
  @useResult
  $Res call(
      {SeriesScoringScheme scheme,
      int initialDiscardAfter,
      int subsequentDiscardsEveryN,
      SeriesEntryAlgorithm entryAlgorithm});
}

/// @nodoc
class _$SeriesScoringDataCopyWithImpl<$Res, $Val extends SeriesScoringData>
    implements $SeriesScoringDataCopyWith<$Res> {
  _$SeriesScoringDataCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? scheme = null,
    Object? initialDiscardAfter = null,
    Object? subsequentDiscardsEveryN = null,
    Object? entryAlgorithm = null,
  }) {
    return _then(_value.copyWith(
      scheme: null == scheme
          ? _value.scheme
          : scheme // ignore: cast_nullable_to_non_nullable
              as SeriesScoringScheme,
      initialDiscardAfter: null == initialDiscardAfter
          ? _value.initialDiscardAfter
          : initialDiscardAfter // ignore: cast_nullable_to_non_nullable
              as int,
      subsequentDiscardsEveryN: null == subsequentDiscardsEveryN
          ? _value.subsequentDiscardsEveryN
          : subsequentDiscardsEveryN // ignore: cast_nullable_to_non_nullable
              as int,
      entryAlgorithm: null == entryAlgorithm
          ? _value.entryAlgorithm
          : entryAlgorithm // ignore: cast_nullable_to_non_nullable
              as SeriesEntryAlgorithm,
    ) as $Val);
  }
}

/// @nodoc
abstract class _$$_SeriesScoringDefinitionCopyWith<$Res>
    implements $SeriesScoringDataCopyWith<$Res> {
  factory _$$_SeriesScoringDefinitionCopyWith(_$_SeriesScoringDefinition value,
          $Res Function(_$_SeriesScoringDefinition) then) =
      __$$_SeriesScoringDefinitionCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call(
      {SeriesScoringScheme scheme,
      int initialDiscardAfter,
      int subsequentDiscardsEveryN,
      SeriesEntryAlgorithm entryAlgorithm});
}

/// @nodoc
class __$$_SeriesScoringDefinitionCopyWithImpl<$Res>
    extends _$SeriesScoringDataCopyWithImpl<$Res, _$_SeriesScoringDefinition>
    implements _$$_SeriesScoringDefinitionCopyWith<$Res> {
  __$$_SeriesScoringDefinitionCopyWithImpl(_$_SeriesScoringDefinition _value,
      $Res Function(_$_SeriesScoringDefinition) _then)
      : super(_value, _then);

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? scheme = null,
    Object? initialDiscardAfter = null,
    Object? subsequentDiscardsEveryN = null,
    Object? entryAlgorithm = null,
  }) {
    return _then(_$_SeriesScoringDefinition(
      scheme: null == scheme
          ? _value.scheme
          : scheme // ignore: cast_nullable_to_non_nullable
              as SeriesScoringScheme,
      initialDiscardAfter: null == initialDiscardAfter
          ? _value.initialDiscardAfter
          : initialDiscardAfter // ignore: cast_nullable_to_non_nullable
              as int,
      subsequentDiscardsEveryN: null == subsequentDiscardsEveryN
          ? _value.subsequentDiscardsEveryN
          : subsequentDiscardsEveryN // ignore: cast_nullable_to_non_nullable
              as int,
      entryAlgorithm: null == entryAlgorithm
          ? _value.entryAlgorithm
          : entryAlgorithm // ignore: cast_nullable_to_non_nullable
              as SeriesEntryAlgorithm,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$_SeriesScoringDefinition extends _SeriesScoringDefinition {
  _$_SeriesScoringDefinition(
      {required this.scheme,
      required this.initialDiscardAfter,
      required this.subsequentDiscardsEveryN,
      required this.entryAlgorithm})
      : super._();

  factory _$_SeriesScoringDefinition.fromJson(Map<String, dynamic> json) =>
      _$$_SeriesScoringDefinitionFromJson(json);

  @override
  final SeriesScoringScheme scheme;
  @override
  final int initialDiscardAfter;
  @override
  final int subsequentDiscardsEveryN;
  @override
  final SeriesEntryAlgorithm entryAlgorithm;

  @override
  String toString() {
    return 'SeriesScoringData(scheme: $scheme, initialDiscardAfter: $initialDiscardAfter, subsequentDiscardsEveryN: $subsequentDiscardsEveryN, entryAlgorithm: $entryAlgorithm)';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$_SeriesScoringDefinition &&
            (identical(other.scheme, scheme) || other.scheme == scheme) &&
            (identical(other.initialDiscardAfter, initialDiscardAfter) ||
                other.initialDiscardAfter == initialDiscardAfter) &&
            (identical(
                    other.subsequentDiscardsEveryN, subsequentDiscardsEveryN) ||
                other.subsequentDiscardsEveryN == subsequentDiscardsEveryN) &&
            (identical(other.entryAlgorithm, entryAlgorithm) ||
                other.entryAlgorithm == entryAlgorithm));
  }

  @JsonKey(ignore: true)
  @override
  int get hashCode => Object.hash(runtimeType, scheme, initialDiscardAfter,
      subsequentDiscardsEveryN, entryAlgorithm);

  @JsonKey(ignore: true)
  @override
  @pragma('vm:prefer-inline')
  _$$_SeriesScoringDefinitionCopyWith<_$_SeriesScoringDefinition>
      get copyWith =>
          __$$_SeriesScoringDefinitionCopyWithImpl<_$_SeriesScoringDefinition>(
              this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$_SeriesScoringDefinitionToJson(
      this,
    );
  }
}

abstract class _SeriesScoringDefinition extends SeriesScoringData {
  factory _SeriesScoringDefinition(
          {required final SeriesScoringScheme scheme,
          required final int initialDiscardAfter,
          required final int subsequentDiscardsEveryN,
          required final SeriesEntryAlgorithm entryAlgorithm}) =
      _$_SeriesScoringDefinition;
  _SeriesScoringDefinition._() : super._();

  factory _SeriesScoringDefinition.fromJson(Map<String, dynamic> json) =
      _$_SeriesScoringDefinition.fromJson;

  @override
  SeriesScoringScheme get scheme;
  @override
  int get initialDiscardAfter;
  @override
  int get subsequentDiscardsEveryN;
  @override
  SeriesEntryAlgorithm get entryAlgorithm;
  @override
  @JsonKey(ignore: true)
  _$$_SeriesScoringDefinitionCopyWith<_$_SeriesScoringDefinition>
      get copyWith => throw _privateConstructorUsedError;
}
