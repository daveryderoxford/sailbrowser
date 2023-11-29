!/bin/bash

# Deeltes club database.
# Will fail if the club database already exist as club databases 
# have delete protection enabled.

if (( $# != 1 )); then
   echo >&2 "Usage: delete_club.sh tenantId"
   exit 1
fi

# Remove delete protection before deleting
gcloud alpha firestore databases update --database=$1  --no-delete-protection

# Deletes the club database - TODO delete protection is only avaalible in alpha currently. 
gcloud alpha firestore databases delete --database=$1 
