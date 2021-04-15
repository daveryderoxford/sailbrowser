

## Static model

![Static model](http://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.github.com/anoff/plantbuddy/master/assets/overview.iuml)

![Static model](https://github.com/daveryderoxford/sailbrowser/blob/master/docs/test.plantuml)

## User stories

### Entries
Two entry use cases:
* Enter as logged on user. 
* Enter from main application 
In the frst case the algorithm shall be 

In the second case the algorithm shall be

### System
* Maintain race schedule


## Expected algorithm
The aim of the expected algorithm is to order competitors in the order they will be expected to next cross the start/finish line.

Once a lap has been completed this shall be based on:
* Time for start of previous lap
* Elapsed time for previous lap (bounded by a maximum)

For the first lap the ordering shall be based on: 
* Race start time
* Expected lap time (club default) 
* Current series results for the competitor
* Handicap of boat 
* Boat sail number

## Scoring Algorithm
General
When each competitor finishes the elaspes and corrected times shall be calculated and populated.
The series scores shall be populated as part of the resuklts calculation/publishing process

The scoring algorithm is implemented as follows:
* Calculate ellapsed time based  
  * Take into account ZPF scoring code.
  * Number of laps completed for average lap race
  * For competitors that have not finished 
* Calculate competitor corrected time
* Sort race competitors in order based on corrected time.
  * Any compettors with 
* Identify number of compeitors in race.
  * Assign points for scoring codes based on number of competitors in race.
* Identify numbrr of competitors in series.  
  * This shall include all sries competitors that have *** at least one race
* Assign points for series-based scoring codes. 
  * Calculate average points for a competitor (excluding discards)
  * For ODD the first N races should be scored the average for the series
* Calculate series points
  * Identify discards
  * 

Average lap time corrections
Scoring an average lap race can result in inconsistent results for bats with the same handicap. 
  It should not be possible.

## Series dual scoring support
It is a normal requirement to support dual scoring of a series. There are a number of forms dual scoring may take:
* Separate out results for a particular class
* Separate results for a particular competitors catagory (eg gold/silver/bronze fleet)
* Alternate handicap scheme (IRC versus NHC)
* Alternate handicap value for entrant (eg Personal handicaps)

The implementaion of these is discussed below:
