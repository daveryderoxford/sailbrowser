import * as admin from "firebase-admin";
import { UserRecord } from "firebase-admin/auth";
import * as functions from "firebase-functions";

/** Creates new user data and saves it to the database */
function createUserData() {
    const userdata = {
        id: "",
        tenantId: "",
        email: "" as string | undefined,
        boats: [],
        archived: false,
    };
    return userdata;
}

export const createUser = functions.region('europe-west1').auth.user().onCreate(async (user: UserRecord, context: functions.EventContext) => {
    // Create user data when a user is created
    const userdata = createUserData();
    userdata.id = user.uid;
    userdata.email = user.email;
    userdata.tenantId = (context.auth?.token as any).tenantId;
    try {
        await admin.firestore().doc('users/' + user.uid).set(userdata);
        console.log('Creating user data for ' + user.uid);
    } catch (err: unknown) {
        if (err instanceof Object) {
            console.error('createUser: Error encountered creating user data.  User Id: ' + user.uid + "  " + err.toString());
        } else {
            console.error('createUser: Error encountered creating user data.  User Id: ' + user.uid);
        }
    }
});

export const deleteUser = functions.region('europe-west1').auth.user().onDelete(async (user: any) => {
    // When a user is deleted mark the user data as archived
    try {
        await admin.firestore().doc('users/' + user.uid).update({ archived: true });
    } catch (err: unknown) {
        if (err instanceof Object) {
            console.error('createUser: Error encountered creating user data.  User Id: ' + user.uid + "  " + err.toString());
        } else {
            console.error('createUser: Error encountered creating user data.  User Id: ' + user.uid);
        }
    }
});