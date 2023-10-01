import 'package:sailbrowser_flutter/features/race/domain/result_code.dart';

enum ResultCodeAlgorithm {
  na,
  compInSeries,
  compInStartArea,
  avgAll,
  avgBefore,
  timePenalty,
  positionPenalty,
  setByHand
}

sealed class ResultCodeScoringBase {
  ResultCodeScoringBase();
}

class ResultCodeScoring extends ResultCodeScoringBase {
  ResultCodeScoring({
    required this.longSeriesAlgorithm, 
    required this.shortSeriesAlgorithm, 
    required this.shortSeriesFactor, 
    required this.longSeriesFactor, 
    required this.isDiscardable, 
    required this.isStartAreaComp,
    required this.isStartedComp, 
    required this.isFinishedComp, 
  });

  final ResultCodeAlgorithm longSeriesAlgorithm; 
  final ResultCodeAlgorithm shortSeriesAlgorithm; 
  final num shortSeriesFactor; 
  final num longSeriesFactor; 
  final bool isDiscardable;
  final bool isStartAreaComp; 
  final bool isStartedComp; 
  final bool isFinishedComp; 
}

class ResultCodeScoreLike extends ResultCodeScoringBase {
  ResultCodeScoreLike({
    required this.scoreLike,
  });
  final ResultCode scoreLike;
}

/// Map of the algoritms to use for all results codes 
Map<ResultCode, ResultCodeScoringBase> resultCodes = {
  ResultCode.notFinished: ResultCodeScoring(
    longSeriesAlgorithm: ResultCodeAlgorithm.na,
    shortSeriesAlgorithm: ResultCodeAlgorithm.na,
    shortSeriesFactor: 0,
    longSeriesFactor: 0,
    isDiscardable: true,
    isStartAreaComp: true,
    isStartedComp: false,
    isFinishedComp: false,
  ),
  ResultCode.ok: ResultCodeScoring(
    shortSeriesAlgorithm: ResultCodeAlgorithm.na,
    shortSeriesFactor: 0,
    longSeriesAlgorithm: ResultCodeAlgorithm.na,
    longSeriesFactor: 0,
    isDiscardable: true,
    isStartAreaComp: true,
    isStartedComp: true,
    isFinishedComp: true,
  ),
  ResultCode.dnc: ResultCodeScoring(
    shortSeriesAlgorithm: ResultCodeAlgorithm.compInSeries,
    shortSeriesFactor: 1,
    longSeriesAlgorithm: ResultCodeAlgorithm.compInSeries,
    longSeriesFactor: 1,
    isDiscardable: true,
    isStartAreaComp: false,
    isStartedComp: false,
    isFinishedComp: false,
  ),
  ResultCode.dnf: ResultCodeScoring(
    shortSeriesAlgorithm: ResultCodeAlgorithm.compInSeries,
    shortSeriesFactor: 1,
    longSeriesAlgorithm: ResultCodeAlgorithm.compInStartArea,
    longSeriesFactor: 1,
    isDiscardable: true,
    isStartAreaComp: true,
    isStartedComp: true,
    isFinishedComp: false,
  ),
  ResultCode.ret: ResultCodeScoreLike(
    scoreLike: ResultCode.dnf,
  ),
  ResultCode.dns: ResultCodeScoring(
    shortSeriesAlgorithm: ResultCodeAlgorithm.compInSeries,
    shortSeriesFactor: 1,
    longSeriesAlgorithm: ResultCodeAlgorithm.compInStartArea,
    longSeriesFactor: 1,
    isDiscardable: true,
    isStartAreaComp: false,
    isStartedComp: false,
    isFinishedComp: false,
  ),
  ResultCode.ood: ResultCodeScoring(
    shortSeriesAlgorithm: ResultCodeAlgorithm.avgAll,
    shortSeriesFactor: 0,
    longSeriesAlgorithm: ResultCodeAlgorithm.avgAll,
    longSeriesFactor: 0,
    isDiscardable: true,
    isStartAreaComp: false,
    isStartedComp: false,
    isFinishedComp: false,
  ),
  ResultCode.ocs: ResultCodeScoreLike(
    scoreLike: ResultCode.dnf,
  ),
  ResultCode.bdf: ResultCodeScoreLike(
    scoreLike: ResultCode.dnf,
  ),
  ResultCode.dgm: ResultCodeScoring(
    shortSeriesAlgorithm: ResultCodeAlgorithm.compInSeries,
    shortSeriesFactor: 1,
    longSeriesAlgorithm: ResultCodeAlgorithm.compInStartArea,
    longSeriesFactor: 1,
    isDiscardable: false,
    isStartAreaComp: true,
    isStartedComp: true,
    isFinishedComp: true,
  ),
  ResultCode.udf: ResultCodeScoreLike(
    scoreLike: ResultCode.dnf,
  ),
  ResultCode.zfp: ResultCodeScoring(
    shortSeriesAlgorithm: ResultCodeAlgorithm.timePenalty,
    shortSeriesFactor: 1.2,
    longSeriesAlgorithm: ResultCodeAlgorithm.timePenalty,
    longSeriesFactor: 1.2,
    isDiscardable: true,
    isStartAreaComp: true,
    isStartedComp: true,
    isFinishedComp: true,
  ),
  ResultCode.dsq: ResultCodeScoreLike(
    scoreLike: ResultCode.dnf,
  ),
  ResultCode.xpa: ResultCodeScoring(
    shortSeriesAlgorithm: ResultCodeAlgorithm.positionPenalty,
    shortSeriesFactor: 1.2,
    longSeriesAlgorithm: ResultCodeAlgorithm.positionPenalty,
    longSeriesFactor: 1.2,
    isDiscardable: true,
    isStartAreaComp: true,
    isStartedComp: true,
    isFinishedComp: true,
  ),
  ResultCode.scp: ResultCodeScoring(
    shortSeriesAlgorithm: ResultCodeAlgorithm.timePenalty,
    shortSeriesFactor: 1.2,
    longSeriesAlgorithm: ResultCodeAlgorithm.timePenalty,
    longSeriesFactor: 1.2,
    isDiscardable: true,
    isStartAreaComp: true,
    isStartedComp: true,
    isFinishedComp: true,
  ),
  ResultCode.dpi: ResultCodeScoring(
    shortSeriesAlgorithm: ResultCodeAlgorithm.setByHand,
    shortSeriesFactor: 0,
    longSeriesAlgorithm: ResultCodeAlgorithm.setByHand,
    longSeriesFactor: 0,
    isDiscardable: true,
    isStartAreaComp: true,
    isStartedComp: true,
    isFinishedComp: true,
  ),
  ResultCode.rdg: ResultCodeScoring(
    shortSeriesAlgorithm: ResultCodeAlgorithm.setByHand,
    shortSeriesFactor: 0,
    longSeriesAlgorithm: ResultCodeAlgorithm.setByHand,
    longSeriesFactor: 0,
    isDiscardable: true,
    isStartAreaComp: true,
    isStartedComp: true,
    isFinishedComp: true,
  ),
  ResultCode.rdga: ResultCodeScoring(
    shortSeriesAlgorithm: ResultCodeAlgorithm.avgAll,
    shortSeriesFactor: 0,
    longSeriesAlgorithm: ResultCodeAlgorithm.avgAll,
    longSeriesFactor: 0,
    isDiscardable: true,
    isStartAreaComp: true,
    isStartedComp: true,
    isFinishedComp: true,
  ),
  ResultCode.rdgb: ResultCodeScoring(
    shortSeriesAlgorithm: ResultCodeAlgorithm.avgBefore,
    shortSeriesFactor: 0,
    longSeriesAlgorithm: ResultCodeAlgorithm.avgBefore,
    longSeriesFactor: 0,
    isDiscardable: true,
    isStartAreaComp: true,
    isStartedComp: true,
    isFinishedComp: true,
  ),
  ResultCode.rdgc: ResultCodeScoring(
    shortSeriesAlgorithm: ResultCodeAlgorithm.setByHand,
    shortSeriesFactor: 0,
    longSeriesAlgorithm: ResultCodeAlgorithm.setByHand,
    longSeriesFactor: 0,
    isDiscardable: true,
    isStartAreaComp: true,
    isStartedComp: true,
    isFinishedComp: true,
  )
};