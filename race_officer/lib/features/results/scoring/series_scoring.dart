import 'package:freezed_annotation/freezed_annotation.dart';

part 'series_scoring.freezed.dart';
part 'series_scoring.g.dart';

/// Map of all possible handicap schemes
enum SeriesScoringScheme {
  shortSeries2017('ISAF 2017 Short Series'),
  longSeries2017('ISAF 2017 LongSeries');

  final String displayName;
  const SeriesScoringScheme(this.displayName);
}

/// How to group competitors for scoring
enum SeriesEntryAlgorithm {
  classSailNumberHelm('Class, Sail number, Helm', 'Entries for a boat with different helms will be separated' ),
  classSailNumber('Class, Sail number', 'Entries for a boat with different helmms will be merged'),
  helm('Helm name', 'Entries for helm saing different boats in series will be merged');

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
