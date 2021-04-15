import { Pipe, PipeTransform } from '@angular/core';
import { SeriesScoringScheme } from 'app/scoring/series-scoring';

@Pipe({
  name: 'scoringScheme'
})
export class ScoringSchemePipe implements PipeTransform {

  transform(scheme: SeriesScoringScheme): string {
     if (scheme === 'ISAF2017ShortSeries') {
       return 'Short series';
      } else if (scheme === 'ISAF2017LongSeries') {
        return 'Long series';
      } else {
        return 'Unknown scoring scheme';
      }
  }

}
