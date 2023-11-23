gcloud firestore databases create --database=$1 --location=us-east1 --type=firestore-native --delete-protection
# Deploy firestore rules
firebase deploy --only firestore:$1
# Update list of avalaible databases (clients)


