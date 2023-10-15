import 'dart:async';

import 'package:audioplayers/audioplayers.dart';
import 'package:clock/clock.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:loggy/loggy.dart';
import 'package:sailbrowser_flutter/features/race-calander/domain/series.dart';
import 'package:sailbrowser_flutter/features/race-calander/domain/series_service.dart';
import 'package:sailbrowser_flutter/features/race/start/domain/start_sequence.dart';

enum StartWhen {
  now,
  nextMinute,
  scheduledStartTime,
}

enum BeepDuration { short, long }

class StartSequence extends StateNotifier<StartSequenceState> with UiLoggy {
  StartSequence(this.ref, [StartSequenceState? initialStartState])
      : super(initialStartState ?? const StartSequenceState());

  final _shortBeepTimes = [1, 2, 3, 4, 5, 10, 15, 30];

  StateNotifierProviderRef ref;

  Timer? _timer;

  /// Configures the start sequece
  configure(List<Race> races, Duration interalBetweenStarts) {
    state = StartSequenceState(
      races: races,
      intervalBetweenStarts: interalBetweenStarts,
      startStatus: StartStatus.waiting,
    );
  }

  reset() {
    state = const StartSequenceState();
  }

  run(StartWhen option) {
    _beep();

    _timer = Timer.periodic(const Duration(seconds: 1), _timerTickHandler);

    DateTime firstStartTime;

    final baseTime = _roundNextMinute(clock.now());

    switch (option) {
      case StartWhen.nextMinute:
        firstStartTime = baseTime.add(const Duration(minutes: 1));
        break;

      case StartWhen.now:
        firstStartTime = baseTime;
        break;

      case StartWhen.scheduledStartTime:
        firstStartTime = state.races[0].actualStart;
        break;
    }

    final races = _calculateRaceStartTimes(firstStartTime, state.races);

    state = state.copyWith(
      startStatus: StartStatus.running,
      races: races,
      timeToNextStart: firstStartTime.difference(clock.now()),
    );
  }

  stopStartSequence() {
    _timer!.cancel();
    state = state.copyWith(startStatus: StartStatus.stopped);
  }

  generalRecall(bool moveToEnd) {
    /* 
      final races = [...state.races];

      // Recalculate time of the first start adding one minuite for postponement
      const recalledStartTime = state.races[0].actualStart;
      const firstStartTime = addMinutes(recalledStartTime, s.sequence.classUp + 1);

      // Reorder races if required
      if (moveToEnd) {
        races.add(races[0]);
        races.shift();
      }

      races = this._calculateRaceStartTimes(firstStartTime, races, s.sequence);

      const flags = this._calculateFlags(races, s.sequence);

      // Add recall flag
      const flag = createStartFlagTiming({ time: recallDown, recall: 'up' });

      return { races: races, flags: [flag, ...s.flagTimes] };
    }); */
  }

  /// Handler for one second timer
  _timerTickHandler(Timer timer) {
    final secondstoStart = state.timeToNextStart.inSeconds - 1;
    // loggy.info(
    //     'Time to next start:  ${state.timeToNextStart.inSeconds}  Race start: ${state.races[0].raceOfDay.toString()}');

    /** Beep at set times before the start */
    if (_shortBeepTimes.contains(secondstoStart)) {
      _beep();
    }
    if (secondstoStart == 0) {
      _beep(duration: BeepDuration.long);
    }

    if (secondstoStart > 0) {
      state = state.copyWith(
        timeToNextStart: Duration(seconds: secondstoStart),
      );
    } else {
      final races = [...state.races];
      final startedRaces = [...state.startedRaces];

      final race = races[0].copyWith(
        status: RaceStatus.inProgress,
        actualStart: clock.now(),
      );

      final series = ref.read(seriesProvider(race.seriesId)); //TODO may be a problem wiht read here??
      ref.read(seriesRepositoryProvider).updateRace(series!, race.id, race);

      startedRaces.add(races[0]);
      races.removeAt(0);

      // End of start sequence
      if (races.isEmpty) {
        state = state.copyWith(
          races: races,
          startedRaces: startedRaces,
          startStatus: StartStatus.finished,
          timeToNextStart: const Duration(),
        );
        timer.cancel();
      } else {
        state = state.copyWith(
          races: races,
          startedRaces: startedRaces,
          timeToNextStart: state.intervalBetweenStarts,
        );
      }
    }
  }

  List<Race> _calculateRaceStartTimes(
      DateTime firstStartTime, List<Race> races) {
    final updated = races.map((race) {
      final r = race.copyWith(actualStart: firstStartTime);
      firstStartTime = firstStartTime.add(state.intervalBetweenStarts);
      return r;
    }).toList();

    for (var r in updated) {
      loggy.info('${r.fleetId}  ${r.actualStart}\n');
    }

    return updated;
  }

  _beep({BeepDuration? duration = BeepDuration.short}) {
    String audioasset = (duration == BeepDuration.short)
        ? "audio/beep-short.mp3"
        : "audio/beep-long.mp3";

    AudioPlayer player = AudioPlayer();

    player.play(AssetSource(audioasset), mode: PlayerMode.lowLatency);
  }

  DateTime _roundNextMinute(DateTime val) {
    return DateTime(val.year, val.month, val.day, val.hour, val.minute);
  }
}

final startSequenceProvider =
    StateNotifierProvider<StartSequence, StartSequenceState>(
        (ref) => StartSequence(ref));
