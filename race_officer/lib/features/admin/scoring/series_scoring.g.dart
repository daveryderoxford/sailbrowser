// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'series_scoring.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$_SeriesScoringDefinition _$$_SeriesScoringDefinitionFromJson(
        Map<String, dynamic> json) =>
    _$_SeriesScoringDefinition(
      scheme: $enumDecode(_$SeriesScoringSchemeEnumMap, json['scheme']),
      initialDiscardAfter: json['initialDiscardAfter'] as int,
      subsequentDiscardsEveryN: json['subsequentDiscardsEveryN'] as int,
      entryAlgorithm:
          $enumDecode(_$SeriesEntryAlgorithmEnumMap, json['entryAlgorithm']),
    );

Map<String, dynamic> _$$_SeriesScoringDefinitionToJson(
        _$_SeriesScoringDefinition instance) =>
    <String, dynamic>{
      'scheme': _$SeriesScoringSchemeEnumMap[instance.scheme]!,
      'initialDiscardAfter': instance.initialDiscardAfter,
      'subsequentDiscardsEveryN': instance.subsequentDiscardsEveryN,
      'entryAlgorithm': _$SeriesEntryAlgorithmEnumMap[instance.entryAlgorithm]!,
    };

const _$SeriesScoringSchemeEnumMap = {
  SeriesScoringScheme.shortSeries2017: 'shortSeries2017',
  SeriesScoringScheme.longSeries2017: 'longSeries2017',
};

const _$SeriesEntryAlgorithmEnumMap = {
  SeriesEntryAlgorithm.classSailNumberHelm: 'classSailNumberHelm',
  SeriesEntryAlgorithm.classSailNumber: 'classSailNumber',
  SeriesEntryAlgorithm.helm: 'helm',
};
