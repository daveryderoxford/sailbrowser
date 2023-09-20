import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:sailbrowser_flutter/features/race-calander/domain/series.dart';

part 'start_service.freezed.dart';

@freezed
class StartState with _$StartState {
  const factory StartState({
    @Default([]) List<Race> races,
  }) = _StartState;

  const StartState._();
}

class StartSequence extends StateNotifier<StartState> {
  StartSequence([StartState? initialStartState])
      : super(initialStartState ?? const StartState(races: []));

  set races(List<Race> races) {
    state = state.copyWith(races: races);
  }

  startSequence() {
    state = state.copyWith();
  }

  pause() {}

  abort() {}
}
