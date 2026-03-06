

import { onCall, HttpsError } from "firebase-functions/v2/https";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth" ;

exports.createNewTenant = onCall(async (request) => {
   // 1. Check if the user is authenticated
   if (!request.auth) {
      throw new HttpsError("unauthenticated", "You must be logged in.");
   }

   const uid = request.auth.uid;
   const { tenantName } = request.data;

   const db = getFirestore();
   const auth = getAuth();

   try {
      // 2. Create a new Tenant Document
      const tenantRef = db.collection("tenants").doc();
      const tenantId = tenantRef.id;

      await tenantRef.set({
         name: tenantName,
         ownerUid: uid,
         createdAt: new Date().toISOString(),
         plan: "free"
      });

      // 3. Set Custom Claims on the User's Auth Token
      // We add 'tenantId' and 'role' so Security Rules can see them instantly
      await auth.setCustomUserClaims(uid, {
         tenantId: tenantId,
         role: "owner"
      });

      return { success: true, tenantId: tenantId };
   } catch (error: any) {
      throw new HttpsError("internal", error.message);
   }
});