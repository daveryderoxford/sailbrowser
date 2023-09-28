import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:loggy/loggy.dart';
import 'package:sailbrowser_flutter/features/race/domain/race_competitor.dart';
import 'package:sailbrowser_flutter/features/race/domain/race_competitor_service.dart';
import 'package:sailbrowser_flutter/features/race/domain/result_code.dart';
import 'package:sailbrowser_flutter/features/race/finish/domain/finish_lists.dart';

class FinishController with UiLoggy {
  PinnedCompetitors pinned;
  RaceCompetitorService compService; 
  CompFilterNotifier filterNotifier;

  FinishController(this.pinned, this.compService, this.filterNotifier);

  _log(String action, RaceCompetitor comp) {
    loggy.info('$action: ${comp.id} ${comp.helm}');
  }

  _removePin(RaceCompetitor comp) {
    pinned.removeId(comp.id);
    filterNotifier.clear();
  }

  lap(RaceCompetitor comp) {
    compService.saveLap(comp, comp.id, comp.seriesId);
    _removePin(comp);
    _log('lap', comp);
  }

  finish(RaceCompetitor comp) {
    compService.finish(comp, comp.id, comp.seriesId);
    _removePin(comp);
    _log('finish', comp);
  }

  pin(RaceCompetitor comp) {
    pinned.addId(comp.id);
    _log('pin', comp);
  }

  retired(RaceCompetitor comp) {
    final update = comp.copyWith(resultCode: ResultCode.rdg);
    compService.update(update, update.id, comp.seriesId);
    _removePin(comp);
  }

  didNotStart(RaceCompetitor comp) {
    final update = comp.copyWith(resultCode: ResultCode.dns);
    compService.update(update, update.id, comp.seriesId);
    _removePin(comp);
  }

  stillRacing(RaceCompetitor comp) {
    final update =
        comp.copyWith(finishTime: null, resultCode: ResultCode.notFinished);
    compService.update(update, update.id, comp.seriesId);
  }

}

final finshControllerProvider = Provider(
  (ref) => FinishController(
      ref.watch(pinnedCompetitorsProvider.notifier),
      ref.watch(raceCompetitorRepositoryProvider),
      ref.watch(compFilterProvider.notifier)),
);
