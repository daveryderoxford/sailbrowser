import 'package:freezed_annotation/freezed_annotation.dart';

part 'series_scoring_data.freezed.dart';
part 'series_scoring_data.g.dart';

/// Scoring scheme as defined by rules of racing
enum SeriesScoringScheme {
  shortSeries2017('ISAF 2017 Short Series'),
  longSeries2017('ISAF 2017 LongSeries');

  final String displayName;
  const SeriesScoringScheme(this.displayName);
}

/// How entries for a series shall be generated from race entries.
/// Allows clubs to combine results for a single helm sailing different classes
/// or keep then separate.
enum SeriesEntryAlgorithm {
  classSailNumberHelm('Class, Sail number, Helm',
      'Entries for a boat with different helms will be separated'),
  classSailNumber('Class, Sail number',
      'Entries for a boat with different helmms will be merged'),
  helm('Helm name',
      'Entries for helm sailing different boats during series will be merged');

  final String displayName;
  final String hint;
  const SeriesEntryAlgorithm(this.displayName, this.hint);
}

@freezed
class SeriesScoringData with _$SeriesScoringData {
  factory SeriesScoringData({
    required SeriesScoringScheme scheme,
    required int initialDiscardAfter,
    required int subsequentDiscardsEveryN,
    required SeriesEntryAlgorithm entryAlgorithm,
  }) = _SeriesScoringDefinition;

  const SeriesScoringData._();

  factory SeriesScoringData.fromJson(Map<String, Object?> json) =>
      _$SeriesScoringDataFromJson(json);

  static SeriesScoringData defaultScheme = SeriesScoringData(
    scheme: SeriesScoringScheme.longSeries2017,
    initialDiscardAfter: 3,
    subsequentDiscardsEveryN: 2,
    entryAlgorithm: SeriesEntryAlgorithm.classSailNumberHelm,
  );
}
