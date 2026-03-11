import 'package:flutter_test/flutter_test.dart';
import 'package:sailbrowser_flutter/features/results/scoring/series_scorer.dart';

void main() {
  group("Series Scorer", () {
    group("Series competitors", () {});
    group("Result code DNC", () {
      test('Competitors in series plus 1', () {
        final scorer = SeriesScorer();
      });
    });
    group("Result Code Average All", () {
      test('Short series - averge of all results including DNC', () {
        final scorer = SeriesScorer();
      });
    });
  });
}
