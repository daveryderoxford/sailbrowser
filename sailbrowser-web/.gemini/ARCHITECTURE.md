# High-Level Overview: 
Application to record results of sailing races.

It comprises of:
- An Angular web application t0
- A Dart application used by the race officer on-the-water to capture race start times and competitor finish times. 

It uses Firebase backend for database, authentication and cloud functions.  

# Directory Structure Rationale: 
Top level directory structure for project is: 
- sailbrowser-web:  Angualar application descibed here
- firebase: Firebase configuration and cloud functions implementation
- race_officer: Dart application for race officer to record results on the water 

The sailbrowser-web/src/app directory has the following structure:
- shared: Shared with sub-directories for components/dialogs/pipes/services and utility functions
- auth: Authentication service and screen
- Feature directories as below

## Feature directory structure
Each feature includes:
- @store directory for each feature contains data object defintions, store and other services as utility functions   
- routing module containing routes <feature>.routes.ts
- view components

## File naming conventions
### Stores
- entity-store.ts - Repository for entity type
- entity.ts - Entity data object

###  Angular component file naming
- Angualar components shoud not include the .component suffix but should have a descriptive name.  This conforms to the latest Angular coding guidelines (2025) 
The following names should be used if applicable: 
- entity-page - top level routed page
- entity-add Page to add an entity
- entity-edit Page to edit an existing entity
- entity-form  Component containing a form used by other pages 
- entity-details - More detailed view of entity.
- dialog - Dialog 
- component names should include the type of control (submit-button.ts)

## State Management: 
- Services in the @store directory of a feature are used to hold global state.  
- A feature may have local services to hold state.  
- Local state is held in componets. 

## Data Flow Patterns: 
TBC

# Backend API Communication: 
All backend communications via store services in feature @store directories.
Store services shall the AngularFire library or Firestore funtions to communicate with the backend.
Helper functions located in the app/shared/firebase/firestore-helpers shall be used to map between Javascript object and Firestore data types. An example is below:
'''
private readonly firestore = getFirestore(inject(FirebaseApp));
private readonly boatsCollection = typedCollectionRef<Boat>(this.firestore, '/boats'); 
'''
On the client when making requets to be backend
-  the request shall be made within a try/catch/finally block as below.
'''
try {
      this.busy.set(true);
      await this._entryService.enterRaces(entryData);
    } catch (error: any) {
      this.snackbar.open("Error encountered adding entries", "Dismiss", { duration: 3000 });
      console.log('EntryPage:  Error adding entris: ' + error.toString());
    } finally {
      this.busy.set(false);
    }
'''
- an animated spinner shall be shown in the button so the user is aware the request is in progrress.  `BusyButton`, `SubmitButton` and `DeleteButton` shall be used to display this spinner.
''' 
  <app-busy-button 
            (click)="onSubmit()" 
            [disabled]="competitorDetailsGroup.invalid"
            [busy]="busy()">
            Enter
  </app-busy-button > 
'''

# Authentication and Authorization: 
The application make use of Firebase authenticaion. 
- AuthService (located in auth directory) wraps Firebase Auth.
- on the client, AuthGuard protects authenticated routes. 
- Each Firebase user has a UserData Firestore object in the users collection.  This is created by a clould function when the user is created.  
- These are 3 user roles/types sys-admin, club-admin, race-officer, user.  
- TBC how roles are implemented. 
- On the server, Firestore rules are used to enforce authentication

# Testing Strategy: 
- vitest used for tesing
- Mock using augular test framework in prefereneve to vitest mocks
- locate tests with the serive under test
- test files named .spec.ts

# Build and Deployment: 
- 2 builds development and production

# Key Dependencies: 
- date-ftns for Date/Time functions.  PPrefered to doing maths if it simplifies the implementaion
- ngx-layout library is being removed from the codebase in an incremental manner.

# Styling and layout

## Component styling:
- Angualar Material Version 3 cmponents
- Customise component appearance using Material 3 scss component design tokens eg ''' @include mat.card-overrides((
    elevated-container-color: red,
    elevated-container-shape: 32px,
    title-text-size: 2rem,
  )); '''
- Use MatButton="<style>" in preference to mat-button-xxx Button element styling buttons.
- Make use of Material design tokens (eg--mat-sys-on-secondary-container to specify color, text, typogrphy, shape and elevation eg '''mat-corner-sm {
  border-radius: var(--mat-sys-corner-small);
}'''

## Responsive screen design
Most application screens shall have an app-toolbar element at the top and a content area below.  An example is below.
'''
<app-toolbar title="Add Races"></app-toolbar>
<mat-stepper class="content" orientation="horizontal" [linear]="true">
'''
Two scss mixins (centered-column-page and form-page) are avalaible in src/styles/_mixims.scss format.  These centre content in the window in desktop view and fill screen on mobile. 
'''
@use "mixins" as mix;
@include mix.centered-column-page(".content", 480px);
'''

# Domain model 
This section describe domain entities and their usage. 

## Club data 
The club data mainatains a list of:
- BoatClasses.  These are types of boat sailed at the club.  They have a associated handicap number.
- Fleets. A series of races has a fleet.  

## Boat
A Boat in the context of this application, a Boat is identified by its boatClass, sail number and helm 
(eg boatClass: "Areo 9", sailNumber: 12345, helm: "Fred Blogs").
Usage:  It is used during the entry process to efficient and accurate but there is no referential integrate between Boat and RaceCompetitor There is no referential integrety between Boats and RaceCompetitors.

## Race calander
- Race
- Series

## ResultsData 
The application uses a two-stage approach for handling race results to provide immediate feedback to the Race Officer while ensuring final published results are accurate and authoritative.

### 1. Provisional Results (During Data Entry)
- **Object**: `ProvisionalResultData`
- **Storage**: Stored as the `result` field on the `RaceCompetitor` Firestore document.
- **Purpose**: To provide immediate, real-time feedback to the Race Officer as they enter finish times. It allows the data entry screen to show calculated elapsed and corrected times for individual competitors.
- **Contents**: This object only contains data that can be calculated for a competitor in isolation, such as `elapsedTime` and `correctedTime`. It specifically **does not** contain fields that depend on the entire fleet, like `position` or `points`.

### 2. Published Results (Final)
- **Object**: A comprehensive `PublishedRaceResult` object/document.
- **Storage**: Generated by a cloud function during a "Publish" event and stored as a single document in a dedicated `publishedResults` Firestore collection. The document ID is the `raceId`.
- **Purpose**: To serve as the read-only, official source of truth for a race's results, intended for competitors and public viewing.
- **Workflow**: A Race Officer triggers a "Publish" action from the UI. This calls a cloud function that reads all `RaceCompetitor` documents for the race, performs a full scoring run using the `RaceScorer` logic (calculating positions, points, and handling ties for the entire fleet), and saves the complete result set as a single document.
- **Benefits**: This separation ensures that published results are calculated atomically and consistently. It also provides a fast, single-read data source for displaying results to end-users.

## Results Date/time/duration repensentation
- The race officer may record start and finish times either in time of day or stopwatch times. 
- The race office will consistently use one method or another to record start and finish times.  
- In the case of stopwatch times the stopwatch time at the start will often be zero but may have a small positive offset. 
- Time durations (elapses/corrected times) will the stored as seconds.
- The DurationPipe shall be used to display durations