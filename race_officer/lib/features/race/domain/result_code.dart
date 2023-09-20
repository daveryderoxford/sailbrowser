

/// Results codes as derived from the ISAF with additional code of OOD
enum ResultCode {
  notFinished('Not Finished', 'Competitor has not finished', ResultCodeGroup.race, true),
  ok('OK', 'The competitor completed the race', ResultCodeGroup.race, true),
  ood('OOD', 'Officer of the day', ResultCodeGroup.race, true),
  dnc('DNC',  'Did not come to the starting area', ResultCodeGroup.race, true),
  dnf('DNF', 'Did not finish the race after starting', ResultCodeGroup.race, true),
  ret('RET',  'Retired the race after starting', ResultCodeGroup.race, true),
  dns('DNS', 'Did not start the race (other than DNC and OCS)', ResultCodeGroup.race, true),
  ocs('OCS', 'On course side of starting line at her starting signal and failed to start or broke rule 30.1 (I Flag)', ResultCodeGroup.start, true),
  zfp('ZFP', '20% time penalty under rule 30.2 (Z Flag)', ResultCodeGroup.start, false),
  udf('UFD', 'Disqualification under rule 30.3 (U Flag)', ResultCodeGroup.start, false),
  bdf('BFD', 'Disqualification under rule 30.4 (Black Flag)', ResultCodeGroup.start, false),
  dgm('DGM', 'Non-disscardable Black Flag disqualification under rule 30.4.', ResultCodeGroup.start, false),
  dsq('DSQ', 'Disqualification due to rule infrimgement', ResultCodeGroup.penalty, true),
  xpa('XPA', 'Exoneration penalty as a result of an Advisory Hearing and/or RYA Arbitration.', ResultCodeGroup.penalty, false),
  scp('SCP', 'Scoring Penalty applied', ResultCodeGroup.penalty, false),
  rdg('RDG', 'Redress given (hand set)', ResultCodeGroup.penalty, false),
  rdga('RDGa', 'Redress given -  Avg of all races', ResultCodeGroup.penalty, false),
  rdgb('RDGb',  'Redress given - Avg of all Races before', ResultCodeGroup.penalty, false),
  rdgc('RDGc', 'Redress given - Position at incident',ResultCodeGroup.penalty, false),
  dpi('DPI', 'Discretionary penalty imposed', ResultCodeGroup.penalty, false);

  final String displayName;
  final String description;
  final ResultCodeGroup group;
  final bool isBasic;
  const ResultCode(this.displayName, this.description, this.group, this.isBasic);
}

enum ResultCodeGroup { race, start, penalty }
