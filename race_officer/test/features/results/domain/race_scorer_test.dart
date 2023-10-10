import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:sailbrowser_flutter/features/race/domain/race_competitor.dart';
import 'package:sailbrowser_flutter/features/race/domain/result_code.dart';
import 'package:sailbrowser_flutter/features/results/domain/race_scorer.dart';
import 'package:sailbrowser_flutter/features/results/scoring/rating_system.dart';

RaceCompetitor _makeComp(
  num handicap,
  int? manualLaps,
  DateTime finishTime,
  List<DateTime> laps,
) {
  var comp = RaceCompetitor(
      id: "id",
      raceId: 'raceId',
      seriesId: 'seriesid',
      helm: "helm;",
      boatClass: 'class',
      sailNumber: 123,
      handicap: handicap,
      finishTime: finishTime,
      lapTimes: laps);
  if (manualLaps != null) {
    comp = comp.copyWith(manualLaps: manualLaps);
  }

  return comp;
}

RaceCompetitor _compWithResCode(ResultCode code) {
  var comp = _makeComp(1100, null, DateTime(2023, 01, 02, 11, 15, 10), []);
  return comp.copyWith(resultCode: code);
}

// Start time at 10:30
final startTime = DateTime(2023, 01, 02, 10, 30);

final dummyLapTime = DateTime(2023, 01, 02, 10, 45);

void main() {
  group("RaceScorer", () {
    group("Calculate results times", () {
      group("Single lap race", () {
        test('One lap', () {
          final scorer = ProviderContainer().read(raceScorerProvider);

          const offset = Duration(minutes: 45, seconds: 15);
          final finishTime = startTime.add(offset);
          final res = _makeComp(1100, null, finishTime, []);

          final times = scorer.calculateResultTimes(
              res, RatingSystem.py, true, startTime, 1);
          expect(times.elapsed, equals(offset));
          expect(
              times.corrected,
              equals(Duration(
                  seconds: (offset.inSeconds.toDouble() / 1.1).round())));
        });

        test(
            'Ellapsed time calculation ignores non-time penatly results codes ',
            () {
          final scorer = ProviderContainer().read(raceScorerProvider);

          const offset = Duration(minutes: 45, seconds: 15);
          final finishTime = startTime.add(offset);
          var comp = _makeComp(1100, null, finishTime, []);
          comp = comp.copyWith(resultCode: ResultCode.bdf);

          final times = scorer.calculateResultTimes(
              comp, RatingSystem.py, true, startTime, 1);
          expect(times.elapsed, equals(offset));
          expect(
              times.corrected,
              equals(Duration(
                  seconds: (offset.inSeconds.toDouble() / 1.1).round())));
        });

        test('Rounding to seconds ', () {
          // TODO Test rounding where corrected time is over and under 30 seconds
        });

        test('Start time before finish time ', () {
          final scorer = ProviderContainer().read(raceScorerProvider);

          const offset = Duration(minutes: 45, seconds: 15);
          final finishTime = startTime.subtract(offset);
          var comp = _makeComp(1100, null, finishTime, []);

          final times = scorer.calculateResultTimes(
              comp, RatingSystem.py, true, startTime, 1);

          /// Elapsed / corrected times set to zero.
          expect(times.elapsed, equals(const Duration()));
          expect(times.corrected, equals(const Duration()));
        });
      });

      group("Multi-lap race", () {
        test('Ellapsed times scaled to maximum number of laps', () {
          final scorer = ProviderContainer().read(raceScorerProvider);

          final finishTime =
              startTime.add(const Duration(minutes: 45, seconds: 15));
          final res = _makeComp(1100, null, finishTime,
              [dummyLapTime, dummyLapTime, dummyLapTime]);

          final times = scorer.calculateResultTimes(
              res, RatingSystem.py, true, startTime, 5);

          final seconds = ((45.0 * 60.0 + 15.0) * 5 / 4).round();
          final expected = Duration(seconds: seconds);
          expect(times.elapsed, equals(expected));
        });

        test('Laps ignored if not an average lap race', () {
          final scorer = ProviderContainer().read(raceScorerProvider);
          final finishTime =
              startTime.add(const Duration(minutes: 45, seconds: 15));
          var comp = _makeComp(1100, null, finishTime,
              [dummyLapTime, dummyLapTime, dummyLapTime]);
          comp = comp.copyWith(resultCode: ResultCode.dnf);

          final times = scorer.calculateResultTimes(
              comp, RatingSystem.py, false, startTime, 5);

          expect(
              times.elapsed, equals(const Duration(minutes: 45, seconds: 15)));
        });

        test('Manual number of laps used if specified (non-zero)', () {
          final scorer = ProviderContainer().read(raceScorerProvider);

          final finishTime =
              startTime.add(const Duration(minutes: 45, seconds: 15));
          var comp = _makeComp(1100, null, finishTime,
              [dummyLapTime, dummyLapTime, dummyLapTime]);

          comp = comp.copyWith(manualLaps: 7);

          final times = scorer.calculateResultTimes(
              comp, RatingSystem.py, true, startTime, 7);

          final seconds = ((45.0 * 60.0 + 15.0) * 7 / 7).round();
          final expected = Duration(seconds: seconds);
          expect(times.elapsed, equals(expected));
        });
      });

      test('Number of laps zero', () {
        //TO DO
      });
    });

    group("PY handicaps", () {
      // TODO
    });
    group("IRC handicaps", () {
      // TODO
    });
  });
  group("Number of starters", () {
    test('All finishers', () {
      final scorer = ProviderContainer().read(raceScorerProvider);

      final comps = List<RaceCompetitor>.generate(
          4, (index) => _compWithResCode(ResultCode.ok));

      final starters = scorer.startersInRace(comps);
      expect(starters, equals(4));
    });

    test('Results codes as not started', () {
      final scorer = ProviderContainer().read(raceScorerProvider);
      final comps = [
        _compWithResCode(ResultCode.dns),
        _compWithResCode(ResultCode.ood),
        _compWithResCode(ResultCode.dnc),
      ];
      final starters = scorer.startersInRace(comps);
      expect(starters, equals(0));
    });

    test('Result codes counted as started', () {
      final scorer = ProviderContainer().read(raceScorerProvider);
      final comps = [
        _compWithResCode(ResultCode.bdf),
        _compWithResCode(ResultCode.dgm),
        _compWithResCode(ResultCode.dnf),
        _compWithResCode(ResultCode.dpi),
        _compWithResCode(ResultCode.dsq),
        _compWithResCode(ResultCode.ocs),
        _compWithResCode(ResultCode.ok),
        _compWithResCode(ResultCode.rdg),
        _compWithResCode(ResultCode.rdga),
        _compWithResCode(ResultCode.rdgb),
        _compWithResCode(ResultCode.rdgc),
        _compWithResCode(ResultCode.ret),
        _compWithResCode(ResultCode.scp),
        _compWithResCode(ResultCode.udf),
        _compWithResCode(ResultCode.zfp),
        _compWithResCode(ResultCode.notFinished),
      ];
      final starters = scorer.startersInRace(comps);
      expect(starters, equals(comps.length));
    });

  });
}
