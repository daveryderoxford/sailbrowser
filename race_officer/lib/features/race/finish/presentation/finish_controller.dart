import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:loggy/loggy.dart';
import 'package:sailbrowser_flutter/features/race/domain/race_competitor.dart';
import 'package:sailbrowser_flutter/features/race/domain/race_competitor_service.dart';
import 'package:sailbrowser_flutter/features/race/domain/result_code.dart';
import 'package:sailbrowser_flutter/features/race/finish/domain/finish_lists.dart';

class FinishController with UiLoggy {
  get pinned => ref.read(pinnedCompetitorsProvider.notifier);
  get compService => ref.read(raceCompetitorRepositoryProvider);
  get filterNotifier => ref.read(compFilterProvider.notifier);

  ProviderRef ref;

  FinishController(this.ref);

  _log(String action, RaceCompetitor comp) {
    loggy.info('$action: ${comp.id} ${comp.helm}');
  }

/// Resets the filter and removes pinned competitor
/// after action has beeen performed on it
  _reset(RaceCompetitor comp) {
    pinned.removeId(comp.id);
    filterNotifier.clear();
  }

  lap(RaceCompetitor comp) {
    compService.saveLap(comp, comp.id, comp.seriesId);
    _reset(comp);
    _log('lap', comp);
  }

  finish(RaceCompetitor comp) {
    compService.finish(comp, comp.id, comp.seriesId);
    _reset(comp);
    _log('finish', comp);
  }

  pin(RaceCompetitor comp) {
    pinned.addId(comp.id);
    _log('pin', comp);
  }

  retired(RaceCompetitor comp) {
    final update = comp.copyWith(resultCode: ResultCode.ret);
    compService.update(update, update.id, comp.seriesId);
    _reset(comp);
    _log('retired', comp);
  }

  didNotStart(RaceCompetitor comp) {
    final update = comp.copyWith(resultCode: ResultCode.dns);
    compService.update(update, update.id, comp.seriesId);
    _reset(comp);
    _log('DNS', comp);
  }

  stillRacing(RaceCompetitor comp) {
    final update =
        comp.copyWith(recordedFinishTime: null, manualFinishTime: null, resultCode: ResultCode.notFinished);
    compService.update(update, update.id, comp.seriesId);
    _log('still racing', comp);
  }
}

final finshControllerProvider = Provider((ref) => FinishController( ref ));
