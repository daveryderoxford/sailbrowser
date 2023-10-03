
import 'package:clock/clock.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sailbrowser_flutter/features/race-calander/domain/series.dart';


// Business functionality related to race calander user interface
class RaceCalanderController {
   RaceCalanderController(this.ref);
   
   final ProviderRef ref;

   // TODO add other handers to race calander controller

 /// Returns default start date based on
  ///  * Current date if no races exist
  ///  * difference between the last 2 races if 2 or more exist
  ///  * 7 days on for first race
  ///  Time is set to 00:00:00
  DateTime defaultRaceStartTime(List<Race> races) {
    if (races.isEmpty) {
      final now = clock.now();
      return DateTime(now.year, now.month, now.day, 0, 0, 0);
    } else if (races.length >1) {
      Duration difference = races.last.scheduledStart.difference(races[races.length-2].scheduledStart);
      final d  =  races.last.scheduledStart.add(difference);
      return DateTime(d.year, d.month, d.day, 0, 0, 0);
    } else {
      /// Default one week in advance
      final d = races.last.scheduledStart.add(const Duration(days: 7));
      return DateTime(d.year, d.month, d.day, 0, 0, 0);
    }
  }

}

final raceCalanderController = Provider((ref) => RaceCalanderController(ref));