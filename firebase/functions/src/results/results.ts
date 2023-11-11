import { Timestamp, getFirestore } from "firebase-admin/firestore";
import { onDocumentUpdated, onDocumentCreated } from "firebase-functions/v2/firestore";

/** Subset of SeriesResult properties copied from a series 
 * These are updated in the series result when the parent seris is updated
*/
interface CommonData {
    season: string;
    name: string;
    seriesId: String;
    fleetId: string;
    startDate: Timestamp;
    endDate: Timestamp;
    scoringScheme: Object;
}

interface Series {
    season: string;
    name: string;
    id: String;
    fleetId: string;
    startDate: Timestamp;
    endDate: Timestamp;
    scoringScheme: Object;
}

const db = getFirestore();

export const seriesCreated = onDocumentCreated(
    {
        document: '/clubs/{clubId}/series/{seriesId}',
        region: 'europe-west1',
    }, async (event) => {

    if (event.data == null) return;

    const series = event.data.data() as Series;

    const path = makePath(event.params);

    const update = {
        publishedOn: new Timestamp(0,0),
        status: 'provisional',
        races: [],
        competitors: [],
        dirty: false,
        ...createCommonData(series),
    }

    try {
        await db.doc(path).set(update);
    } catch (err: unknown) {
        if (err instanceof Object) {
            console.error('createUser: Error encountered synncing series and resuklts.  Series Id: ' + series.id + "  " + err.toString());
        } else {
            console.error('createUser: Error encountered creating user data.  Series Id: ' + series.id);
        }
    }
});

export const seriesChanged = onDocumentUpdated(
    {
        document: '/clubs/{clubId}/series/{seriesId}',
        region: 'europe-west1',  
    }, async (event) => {

        if (event.data == null) return;

        const series = event.data.after.data() as Series;
        const previousSeries = event.data.before.data() as Series;

        // We'll only update if data we are interested in has changed.
        if (series.season == previousSeries.season &&
            series.id == previousSeries.id &&
            series.name == previousSeries.name &&
            series.fleetId == previousSeries.fleetId &&
            series.startDate == previousSeries.startDate &&
            series.endDate == previousSeries.endDate &&
            deepEqual(series.scoringScheme, previousSeries.scoringScheme)) {
            return;
        }

        // Set result object to reflect series data. 
        const path = makePath(event.params);

        const update = createCommonData(series);
        try {
            await db.doc(path).set(update, { merge: true });
        } catch (err: unknown) {
            if (err instanceof Object) {
                console.error('createUser: Error encountered synncing series and resuklts.  Series Id: ' + series.id + "  " + err.toString());
            } else {
                console.error('createUser: Error encountered creating user data.  Series Id: ' + series.id);
            }
        }
    });

function createCommonData(series: Series): CommonData {
    return {
        season: series.season,
        seriesId: series.id,
        name: series.name,
        fleetId: series.fleetId,
        startDate: series.startDate,
        endDate: series.endDate,
        scoringScheme: series.scoringScheme
    };
}

function makePath(params: Record<string, string>): string {
    return '/clubs/' + params.clubId + '/results/' + params.seriesId;

}

/** Deep object comparison */
function deepEqual(object1: any, object2: any) {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);

    if (keys1.length !== keys2.length) {
        return false;
    }

    for (const key of keys1) {
        const val1 = object1[key];
        const val2 = object2[key];
        const areObjects = isObject(val1) && isObject(val2);
        if (
            areObjects && !deepEqual(val1, val2) ||
            !areObjects && val1 !== val2
        ) {
            return false;
        }
    }

    return true;
}

function isObject(object: Object) {
    return object != null && typeof object === 'object';
}
