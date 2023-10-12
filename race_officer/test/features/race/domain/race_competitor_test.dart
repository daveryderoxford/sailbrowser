import 'package:flutter_test/flutter_test.dart';
import 'package:sailbrowser_flutter/features/race/domain/race_competitor.dart';

RaceCompetitor _makeComp(
  int? manualLaps,
  DateTime? finishTime,
  List<DateTime> laps,
) {
  var comp = RaceCompetitor(
    id: "id",
    raceId: 'raceId',
    seriesId: 'seriesid',
    helm: "helm;",
    boatClass: 'class',
    handicap: 1000,
    sailNumber: 123,
    recordedFinishTime: finishTime,
    lapTimes: laps,
  );
  if (manualLaps != null) {
    comp = comp.copyWith(manualLaps: manualLaps);
  }

  return comp;
}

final dummyLapTime = DateTime(2023, 01, 02, 10, 45);
final finishTime = DateTime(2023, 01, 02, 10, 50);

void main() {
  group("Race competitor", () {
    group("Laps", () {
      test('Competing competitor', () {
        final comp = _makeComp(
            0, null, [dummyLapTime, dummyLapTime, dummyLapTime, dummyLapTime]);
        expect(comp.numLaps, equals(4));
      });

      test('Finishing lap counted ', () {
        final comp = _makeComp(0, finishTime,
            [dummyLapTime, dummyLapTime, dummyLapTime, dummyLapTime]);
        expect(comp.numLaps, equals(5));
      });

      test('manually specified laps overrides lap times ', () {
        final comp = _makeComp(7, finishTime,
            [dummyLapTime, dummyLapTime, dummyLapTime, dummyLapTime]);
        expect(comp.numLaps, equals(7));
      });
    });
  });
}
