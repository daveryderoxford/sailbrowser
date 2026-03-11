import 'package:sailbrowser_flutter/features/race/domain/result_code.dart';
import 'package:sailbrowser_flutter/features/results/domain/race_result.dart';
import 'package:sailbrowser_flutter/features/results/domain/series_results.dart';
import 'package:sailbrowser_flutter/features/results/scoring/series_scoring_data.dart';

const numCompetitors = 30;
const numRaces = 10;

  final r = SeriesResults(
    season: 'Season',
    publishedOn: DateTime.now(),
    status: ResultsStatus.provisional,
    name: 'Summer Fast Handicap',
    fleetId: 'FHC',
    seriesId: 'Unset',
    endDate: DateTime(2023, 12, 14),
    scoringScheme: SeriesScoringData.defaultScheme,
    startDate: DateTime(2023, 9, 9),
    races: List<RaceResults>.generate(
      numRaces,
      (index) => RaceResults(
        publishedOn: DateTime.now(),
        status: ResultsStatus.provisional,
        name: 'name',
        date: DateTime(2023, 5, 21),
        fleet: 'Fleet name',
        raceId: 'Unset',
        seriesId: 'Unset',
        index: index,
        results: List<RaceResult>.generate(
          numCompetitors,
          (index) => RaceResult(
            helm: 'Dave Ryder',
            crew: ' Michelle Ryder',
            boatClass: 'RS400',
            sailNumber: 1544,
            position: (index + 1).toString(),
            points: index + 1,
            resultCode: ResultCode.ok,
            elapsed: const Duration(minutes: 45, seconds: 15),
            corrected: const Duration(minutes: 48, seconds: 21),
          ),
        ),
      ),
    ),
    competitors: List<SeriesCompetitor>.generate(
      numCompetitors,
      (index) => SeriesCompetitor(
        helm: 'Dave Ryder',
        crew: 'Michelle Ryder',
        boatClass: 'RS400',
        sailNumber: 1445,
        name: 'The Dark Destriyer',
        totalPoints: 100.5,
        netPoints: 50.5,
        position: index + 1,
        handicap: 1000.0,
        results: List<SeriesResultData>.generate(
          numRaces,
          (raceIndex) => SeriesResultData(
            points: 1.0,
            resultCode: ResultCode.dns,
            isDiscard: true,
          ),
        ),
      ),
    ),
  ); 
