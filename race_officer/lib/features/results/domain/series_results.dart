import 'package:freezed_annotation/freezed_annotation.dart';

part 'series_results.freezed.dart';
part 'series_results.g.dart';

@freezed
class SeriesResults with _$SeriesResults {
  const factory SeriesResults({
    required String seriesId,
    @Default(false) bool published,
    @Default([]) List<SeriesCompetitor> competitors,
    @Default([[]]) List<List<SeriesResult>> results,
  }) = _SeriesResults;

  const SeriesResults._();

  factory SeriesResults.fromJson(Map<String, Object?> json) =>
      _$SeriesResultsFromJson(json);

  addResult() {}
}

@freezed
class SeriesCompetitor with _$SeriesCompetitor {
  const factory SeriesCompetitor({
    @Default(false) bool published,
  }) = _SeriesCompetitor;

  const SeriesCompetitor._();

  factory SeriesCompetitor.fromJson(Map<String, Object?> json) =>
      _$SeriesCompetitorFromJson(json);
}

@freezed
class SeriesResult with _$SeriesResult {
  const factory SeriesResult({
    @Default(false) bool published,
  }) = _SeriesResult;

  const SeriesResult._();

  factory SeriesResult.fromJson(Map<String, Object?> json) =>
      _$SeriesResultFromJson(json);
}
