import 'package:sailbrowser_flutter/features/race/domain/result_code.dart';

enum ResultCodeAlgorithm {
  na,
  compInSeries,
  compInStartArea,
  scoreLike,
  avgAll,
  avgBefore,
  timePenalty,
  positionPenalty,
  setByHand
}

sealed class ResultCodeScoringBase {
  ResultCodeScoringBase({required ResultCode code});
}

sealed class ResultCodeScoring extends ResultCodeScoringBase {
  ResultCodeScoring({
    required ResultCodeAlgorithm longSeriesAlgorithm,
    required ResultCodeAlgorithm shortSeriesAlgorithm,
    required num shortSeriesFactor,
    required num longSeriesFactor,
    required bool isDiscardable,
    required bool isStartAreaComp,
    required bool isStartedComp,
    required bool isFinishedComp,
    required super.code,
  });
}

sealed class ResultCodeScoreLike extends ResultCodeScoringBase {
  ResultCodeScoreLike({
    required ResultCode scoreLike,
    required super.code,
  });
}

/*
 Map<ResultCode, ResultCodeData> resultCodes = [
  'NotFinished', {
    label: 'Not Finished',
    description: 'Competitor has not yet finished - Race in progress',
    group: 'Race',
    longSeries: 'NA',
    shortSeries: 'NA',
    shortSeriesFactor: 0,
    longSeriesFactor: 0,
    discardable: true,
    startArea: true,
    started: false,
    finished: false,
    isBasic: true,
}], [
  'OK' , {
    label: 'OK',
    isBasic: true,
    group: 'Race',
    shortSeries: 'NA',
    shortSeriesFactor: 0,
    longSeries: 'NA',
    longSeriesFactor: 0,
    discardable: true,
    startArea: true,
    started: true,
    finished: true,
    description: 'The competitor completed the race'
  }],   [
  'DNC', {
    label: 'Did not compete',
    isBasic: true,
    group: 'Race',
    shortSeries: 'InSeries',
    shortSeriesFactor: 1,
    longSeries: 'InSeries',
    longSeriesFactor: 1,
    discardable: true,
    startArea: false,
    started: false,
    finished: false,
    description: 'Did not come to the starting area'
  }],   [
  'DNF', {
    label: 'Did not Finish',
    isBasic: true,
    group: 'Race',
    shortSeries: 'InSeries',
    shortSeriesFactor: 1,
    longSeries: 'StartArea',
    longSeriesFactor: 1,
    discardable: true,
    startArea: true,
    started: true,
    finished: false,
    description: 'Did not finish the race after starting'
  }],  [
  'RET', {
    label: 'Retired',
    isBasic: true,
    group: 'Race',
    shortSeries: 'ScoreLike',
    longSeries: 'ScoreLike',
    scoreLike: 'DNF',
    description: 'Retired the race after starting'
  }],  [
  'DNS', {
    label: 'Did not start',
    isBasic: false,
    group: 'Race',
    shortSeries: 'InSeries',
    shortSeriesFactor: 1,
    longSeries: 'StartArea',
    longSeriesFactor: 1,
    discardable: true,
    startArea: false,
    started: false,
    finished: false,
    description: 'Did not start the race (other than DNC and OCS)'
  }],  [
  'OOD', {
    label: 'OOD',
    isBasic: true,
    group: 'Race',
    shortSeries: 'AvgAll',
    shortSeriesFactor: 0,
    longSeries: 'AvgAll',
    longSeriesFactor: 0,
    discardable: true,
    startArea: false,
    started: false,
    finished: false,
    description: 'Officer of the day'
  }],  [
  'OCS', {
    label: 'On course side',
    isBasic: true,
    group: 'Start',
    shortSeries: 'ScoreLike',
    longSeries: 'ScoreLike',
    scoreLike: 'DNF',
    description: 'On course side of starting line at her starting signal and failed to start or broke rule 30.1 (I Flag)'
  }],  [
  'BFD', {
    label: 'BFD (black flag)',
    isBasic: false,
    group: 'Start',
    shortSeries: 'ScoreLike',
    longSeries: 'ScoreLike',
    scoreLike: 'DNF',
    description: 'Disqualification under rule 30.4 (Black Flag)'
  }], [
  'DGM', {
    label: 'DGM (non-discarable black flag)',
    isBasic: false,
    group: 'Start',
    shortSeries: 'InSeries',
    shortSeriesFactor: 1,
    longSeries: 'StartArea',
    longSeriesFactor: 1,
    discardable: false,
    startArea: true,
    started: true,
    finished: true,
    description: 'Non-disscardable Black Flag disqualification under rule 30.4.'
  }],  [
  'UFD', {
    label: 'UFD',
    isBasic: false,
    group: 'Start',
    shortSeries: 'ScoreLike',
    longSeries: 'ScoreLike',
    scoreLike: 'DNF',
    description: 'Disqualification under rule 30.3 (U Flag)'
  }], [
  'ZFP', {
    label: 'ZFP',
    isBasic: false,
    group: 'Start',
    shortSeries: 'TimePenalty',
    shortSeriesFactor: 1.2,
    longSeries: 'TimePenalty',
    longSeriesFactor: 1.2,
    discardable: true,
    startArea: true,
    started: true,
    finished: true,
    description: '20% time penalty under rule 30.2 (Z Flag)'
  }], [
  'DSQ', {
    label: 'Disqualified',
    isBasic: true,
    group: 'Penalty',
    shortSeries: 'ScoreLike',
    longSeries: 'ScoreLike',
    scoreLike: 'DNF',
    description: 'Disqualification due to rule infrimgement'
  }], [
  'XPA', {
    label: 'Exoneration penalty',
    isBasic: false,
    group: 'Penalty',
    shortSeries: 'PositionPenalty',
    shortSeriesFactor: 1.2,
    longSeries: 'PositionPenalty',
    longSeriesFactor: 1.2,
    discardable: true,
    startArea: true,
    started: true,
    finished: true,
    description: 'Exoneration penalty as a result of an Advisory Hearing and/or RYA Arbitration.'
  }],  [
  'SCP', {
    label: 'Scoring penalty',
    isBasic: false,
    group: 'Penalty',
    shortSeries: 'TimePenalty',
    shortSeriesFactor: 1.2,
    longSeries: 'TimePenalty',
    longSeriesFactor: 1.2,
    discardable: true,
    startArea: true,
    started: true,
    finished: true,
    description: 'Scoring Penalty applied'
  }],  [
  'DPI', {
    label: 'Discretionary penalty',
    isBasic: false,
    group: 'Penalty',
    shortSeries: 'SetByHand',
    shortSeriesFactor: 0,
    longSeries: 'SetByHand',
    longSeriesFactor: 0,
    discardable: true,
    startArea: true,
    started: true,
    finished: true,
    description: 'Discretionary penalty imposed'
  }],  [
  'RDG', {
    label: 'Redress given (hand set)',
    isBasic: false,
    group: 'Penalty',
    shortSeries: 'SetByHand',
    shortSeriesFactor: 0,
    longSeries: 'SetByHand',
    longSeriesFactor: 0,
    discardable: true,
    startArea: true,
    started: true,
    finished: true,
    description: 'Redress given - Set points by hand'
  }],  [
  'RDGa', {
    label: 'Redress given (avg all races)',
    isBasic: false,
    group: 'Penalty',
    shortSeries: 'AvgAll',
    shortSeriesFactor: 0,
    longSeries: 'AvgAll',
    longSeriesFactor: 0,
    discardable: true,
    startArea: true,
    started: true,
    finished: true,
    description: 'Redress given -  Avg of all races'
  }],  [
  'RDGb', {
    label: 'Redress given (avg races before)',
    isBasic: false,
    group: 'Penalty',
    shortSeries: 'AvgBefore',
    shortSeriesFactor: 0,
    longSeries: 'AvgBefore',
    longSeriesFactor: 0,
    discardable: true,
    startArea: true,
    started: true,
    finished: true,
    description: 'Redress given - Avg of all Races before'
  }], [
  'RDGc', {
    label: 'Redress given (poisition at incidient)',
    isBasic: false,
    group: 'Penalty',
    shortSeries: 'SetByHand',
    shortSeriesFactor: 0,
    longSeries: 'SetByHand',
    longSeriesFactor: 0,
    discardable: true,
    startArea: true,
    started: true,
    finished: true,
    description: 'Redress given - Position at incident'
  }]
]); */