import 'package:meta/meta.dart';
import 'package:sailbrowser_flutter/features/results/domain/race_result.dart';
import 'package:sailbrowser_flutter/features/results/domain/series_results.dart';
import 'package:sailbrowser_flutter/features/results/scoring/series_scoring.dart';
import 'package:sailbrowser_flutter/util/list_extensions.dart';

/// Functions related to calculating series points.
class SeriesScorer {
  SeriesScorer();

  /// Finds is a race competitor is present in series.
  @visibleForTesting
  SeriesCompetitor? findSeriesCompetitor(RaceResult raceComp, List<SeriesCompetitor> seriesComps,
       SeriesEntryAlgorithm algorithm) {

     return seriesComps.firstWhereOrNull((seriesComp) {
        switch (algorithm) {
          case SeriesEntryAlgorithm.classSailNumber:
            return seriesComp.boatClass == raceComp.boatClass &&
                seriesComp.sailNumber == raceComp.sailNumber;

          case SeriesEntryAlgorithm.classSailNumberHelm:
            return seriesComp.helm == raceComp.helm &&
                seriesComp.boatClass == raceComp.boatClass &&
                seriesComp.sailNumber == raceComp.sailNumber;

          case SeriesEntryAlgorithm.helm:
            return seriesComp.helm == raceComp.helm;
        }
      });
    }

    @visibleForTesting
    List<SeriesCompetitor> getSeriesCompetitors( List<RaceResult> raceComps, SeriesResults series,
       SeriesEntryAlgorithm algorithm) {

      final seriesComps = <SeriesCompetitor>[];
       
      for (final comp in raceComps) {
        var seriesComp = findSeriesCompetitor(comp, series.competitors, algorithm);
        seriesComp ??= SeriesCompetitor.fromRaceResult(comp);
        seriesComps.add(seriesComp);
      }
      return seriesComps;
    }

    /// Calculates series results based on:
    /// * current partial series results,  List of race results.
    /// * for races where race results are supplied then updated data will replace existing races.
    SeriesResults? calculateSeriesResults(SeriesResults seriesResults, List<RaceResults> races ) {
      
     // find races to update 
     // Compute series competitors
     // Compute max competitors
     // Create seriesresults data 
     // points for series dependent 
     // Identify discards 
     // Order by points
      
     
    }

}
