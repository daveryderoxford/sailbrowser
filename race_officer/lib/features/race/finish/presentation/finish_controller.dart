import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:loggy/loggy.dart';
import 'package:sailbrowser_flutter/features/race/domain/race_competitor.dart';
import 'package:sailbrowser_flutter/features/race/domain/race_competitor_service.dart';
import 'package:sailbrowser_flutter/features/race/domain/result_code.dart';
import 'package:sailbrowser_flutter/features/race/finish/domain/finish_lists.dart';

class FinishController with UiLoggy {
  PinnedCompetitors approaching;
  RaceCompetitorService resultService;

  FinishController(this.approaching, this.resultService);

  _log(String action, RaceCompetitor result) {
    loggy.info('$action: ${result.id} ${result.helm}');
  }

  _removeApproaching(RaceCompetitor result) {
    approaching.removeId(result.id);
  }

  lap(RaceCompetitor result) {
    resultService.saveLap(result, result.id, result.seriesId);
    _removeApproaching(result);
    _log('lap', result);
  }

  finish(RaceCompetitor result) {
    _removeApproaching(result);
    _log('finish', result);
  }

  top(RaceCompetitor result) {
    approaching.addId(result.id);
    _log('top', result);
  }

  retired(RaceCompetitor result) {
    final update = result.copyWith(resultCode: ResultCode.rdg);
    resultService.update(update, update.id, result.seriesId);
    _removeApproaching(result);
  }

  didNotStart(RaceCompetitor result) {
    final update = result.copyWith(resultCode: ResultCode.dns);
    resultService.update(update, update.id, result.seriesId);
    _removeApproaching(result);
  }

  stillRacing(RaceCompetitor result) {
    final update =
        result.copyWith(finishTime: null, resultCode: ResultCode.dns);
    resultService.update(update, update.id, result.seriesId);
  }
}

final finshControllerProvider = Provider(
  (ref) => FinishController(ref.watch(pinnedCompetitorsProvider.notifier),
      ref.watch(raceCompetitorRepositoryProvider)),
);
