#!/bin/bash

# Creates a new club database.
# Will fail if the club database already exist as club databases 
# have delete protection enabled.

if (( $# != 2 )); then
   echo >&2 "Usage: create_club_db.sh tenantId club_name"
   exit 1
fi

# Create the club database - TODO delete protection is only avaalible in alpha currently. 
# TODO - change once delete protection exits alpha
gcloud alpha firestore databases create --database=$1 --location=europe-west2	--type=firestore-native --delete-protection

# Update firebase.json to include the new database


# Deploy firestore rules and indices
firebase deploy --only firestore:$1

# Copy in default club and system data into the database
gcloud firestore import gs://sailbrowser-efef0.appspot.com/system/default_database --database=$1

# Update list of avalaible databases (clients) and upload to test 
echo $1, $2 >> clublist.txt
gcloud storage cp clublist.txt gs://sailbrowser-efef0.appspot.com/system/clublist.txt
