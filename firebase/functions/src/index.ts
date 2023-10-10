
import * as admin from "firebase-admin";
import * as user from "./user/user";

admin.initializeApp();

export const createUsder = user.createUser;
export const deleteUsder = user.deleteUser;

