import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:sailbrowser_flutter/features/race/domain/race_competitor.dart';
import 'package:sailbrowser_flutter/features/race/domain/result_code.dart';
import 'package:sailbrowser_flutter/features/results/domain/race_result.dart';
import 'package:sailbrowser_flutter/features/results/scoring/race_scorer.dart';
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
    recordedFinishTime: finishTime,
    lapTimes: laps,
  );
  if (manualLaps != null) {
    comp = comp.copyWith(manualLaps: manualLaps);
  }

  return comp;
}


RaceResult _makeRaceResult(
  ResultCode code,
    Duration corrected, 
   Duration  elapsed,
   num points, 
   String position,
) {
  var comp = RaceResult(
    helm: "helm;",
    boatClass: 'class',
    sailNumber: 123,
    resultCode: code, 
    corrected: corrected, 
    elapsed: corrected, 
    points: points, 
    position: position
  );

  return comp;
}

RaceResult _resWithResCode(ResultCode code) {
  var comp = _makeRaceResult(code, const Duration(), const Duration(), 0,'unset');
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
            comp: res,
            scheme: RatingSystem.py,
            isAverageLap: true,
            startTime: startTime,
            maxLaps: 1,
          );
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
            comp: comp,
            scheme: RatingSystem.py,
            isAverageLap: true,
            startTime: startTime,
            maxLaps: 1,
          );
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
              comp: comp,
              scheme: RatingSystem.py,
              isAverageLap: true,
              startTime: startTime,
              maxLaps: 1);

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
            comp: res,
            scheme: RatingSystem.py,
            isAverageLap: true,
            startTime: startTime,
            maxLaps: 5,
          );

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
            comp: comp,
            scheme: RatingSystem.py,
            isAverageLap: false,
            startTime: startTime,
            maxLaps: 5,
          );

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
            comp: comp,
            scheme: RatingSystem.py,
            isAverageLap: true,
            startTime: startTime,
            maxLaps: 7,
          );

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

      final comps = List<RaceResult>.generate(
          4, (index) => _resWithResCode(ResultCode.ok));

      final starters = scorer.startersInRace(comps);
      expect(starters, equals(4));
    });

    test('Results codes as not started', () {
      final scorer = ProviderContainer().read(raceScorerProvider);
      final comps = [
        _resWithResCode(ResultCode.dns),
        _resWithResCode(ResultCode.ood),
        _resWithResCode(ResultCode.dnc),
      ];
      final starters = scorer.startersInRace(comps);
      expect(starters, equals(0));
    });

    test('Result codes counted as started', () {
      final scorer = ProviderContainer().read(raceScorerProvider);
      final comps = [
        _resWithResCode(ResultCode.bdf),
        _resWithResCode(ResultCode.dgm),
        _resWithResCode(ResultCode.dnf),
        _resWithResCode(ResultCode.dpi),
        _resWithResCode(ResultCode.dsq),
        _resWithResCode(ResultCode.ocs),
        _resWithResCode(ResultCode.ok),
        _resWithResCode(ResultCode.rdg),
        _resWithResCode(ResultCode.rdga),
        _resWithResCode(ResultCode.rdgb),
        _resWithResCode(ResultCode.rdgc),
        _resWithResCode(ResultCode.ret),
        _resWithResCode(ResultCode.scp),
        _resWithResCode(ResultCode.udf),
        _resWithResCode(ResultCode.zfp),
        _resWithResCode(ResultCode.notFinished),
      ];
      final starters = scorer.startersInRace(comps);
      expect(starters, equals(comps.length));
    });
  });
}
