export enum ResultCodeGroup {
  Race = 'race',
  Start = 'start',
  Penalty = 'penalty',
}

export enum ResultCode {
  NotFinished = 'notFinished',
  Ok = 'ok',
  Ood = 'ood',
  Dnc = 'dnc',
  Dnf = 'dnf',
  Ret = 'ret',
  Dns = 'dns',
  Ocs = 'ocs',
  Zfp = 'zfp',
  Ufd = 'ufd',
  Bfd = 'bfd',
  Dgm = 'dgm',
  Dsq = 'dsq',
  Xpa = 'xpa',
  Scp = 'scp',
  Rdg = 'rdg',
  Rdga = 'rdga',
  Rdgb = 'rdgb',
  Rdgc = 'rdgc',
  Dpi = 'dpi',
}

export interface ResultCodeDefinition {
  code: ResultCode;
  displayName: string;
  description: string;
  group: ResultCodeGroup;
  isBasic: boolean;
}

export const ResultCodeDefinitions: Record<ResultCode, ResultCodeDefinition> = {
  [ResultCode.NotFinished]: {
    code: ResultCode.NotFinished,
    displayName: 'Not Finished',
    description: 'Competitor has not finished',
    group: ResultCodeGroup.Race,
    isBasic: true,
  },
  [ResultCode.Ok]: {
    code: ResultCode.Ok,
    displayName: 'OK',
    description: 'The competitor completed the race',
    group: ResultCodeGroup.Race,
    isBasic: true,
  },
  [ResultCode.Ood]: {
    code: ResultCode.Ood,
    displayName: 'OOD',
    description: 'Officer of the day',
    group: ResultCodeGroup.Race,
    isBasic: true,
  },
  [ResultCode.Dnc]: {
    code: ResultCode.Dnc,
    displayName: 'DNC',
    description: 'Did not come to the starting area',
    group: ResultCodeGroup.Race,
    isBasic: true,
  },
  [ResultCode.Dnf]: {
    code: ResultCode.Dnf,
    displayName: 'DNF',
    description: 'Did not finish the race after starting',
    group: ResultCodeGroup.Race,
    isBasic: true,
  },
  [ResultCode.Ret]: {
    code: ResultCode.Ret,
    displayName: 'RET',
    description: 'Retired the race after starting',
    group: ResultCodeGroup.Race,
    isBasic: true,
  },
  [ResultCode.Dns]: {
    code: ResultCode.Dns,
    displayName: 'DNS',
    description: 'Did not start the race (other than DNC and OCS)',
    group: ResultCodeGroup.Race,
    isBasic: true,
  },
  [ResultCode.Ocs]: {
    code: ResultCode.Ocs,
    displayName: 'OCS',
    description: 'Over line at start or broke rule 30.1 (I Flag)',
    group: ResultCodeGroup.Start,
    isBasic: true,
  },
  [ResultCode.Zfp]: {
    code: ResultCode.Zfp,
    displayName: 'ZFP',
    description: '20% time penalty under rule 30.2 (Z Flag)',
    group: ResultCodeGroup.Start,
    isBasic: false,
  },
  [ResultCode.Ufd]: {
    code: ResultCode.Ufd,
    displayName: 'UFD',
    description: 'Disqualification under rule 30.3 (U Flag)',
    group: ResultCodeGroup.Start,
    isBasic: false,
  },
  [ResultCode.Bfd]: {
    code: ResultCode.Bfd,
    displayName: 'BFD',
    description: 'Disqualification under rule 30.4 (Black Flag)',
    group: ResultCodeGroup.Start,
    isBasic: false,
  },
  [ResultCode.Dgm]: {
    code: ResultCode.Dgm,
    displayName: 'DGM',
    description: 'Non-discardable Black Flag disqualification under rule 30.4.',
    group: ResultCodeGroup.Start,
    isBasic: false,
  },
  [ResultCode.Dsq]: {
    code: ResultCode.Dsq,
    displayName: 'DSQ',
    description: 'Disqualification due to rule infringement',
    group: ResultCodeGroup.Penalty,
    isBasic: true,
  },
  [ResultCode.Xpa]: {
    code: ResultCode.Xpa,
    displayName: 'XPA',
    description: 'Exoneration penalty - Advisory Hearing/RYA Arbitration.',
    group: ResultCodeGroup.Penalty,
    isBasic: false,
  },
  [ResultCode.Scp]: {
    code: ResultCode.Scp,
    displayName: 'SCP',
    description: 'Scoring Penalty applied',
    group: ResultCodeGroup.Penalty,
    isBasic: false,
  },
  [ResultCode.Rdg]: {
    code: ResultCode.Rdg,
    displayName: 'RDG',
    description: 'Redress given (hand set)',
    group: ResultCodeGroup.Penalty,
    isBasic: false,
  },
  [ResultCode.Rdga]: {
    code: ResultCode.Rdga,
    displayName: 'RDGa',
    description: 'Redress given - Avg of all races',
    group: ResultCodeGroup.Penalty,
    isBasic: false,
  },
  [ResultCode.Rdgb]: {
    code: ResultCode.Rdgb,
    displayName: 'RDGb',
    description: 'Redress given - Avg of all Races before',
    group: ResultCodeGroup.Penalty,
    isBasic: false,
  },
  [ResultCode.Rdgc]: {
    code: ResultCode.Rdgc,
    displayName: 'RDGc',
    description: 'Redress given - Position at incident',
    group: ResultCodeGroup.Penalty,
    isBasic: false,
  },
  [ResultCode.Dpi]: {
    code: ResultCode.Dpi,
    displayName: 'DPI',
    description: 'Discretionary penalty imposed',
    group: ResultCodeGroup.Penalty,
    isBasic: false,
  },
};
