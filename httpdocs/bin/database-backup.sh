#!/usr/bin/env sh

DEV_URL="mongodb://db:db@mongo:27017/db?authSource=admin"
PROD_URL="mongodb+srv://inet2you:A_j7!quAD6E7X-Q@cluster0.lfpl4ux.mongodb.net/inet2you_prod?retryWrites=true&w=majority&appName=Cluster0"

echo "Dumping database..."
mongodump --uri $PROD_URL -o=/tmp --gzip

echo "Restoring database..."
mongorestore --uri $DEV_URL --drop --gzip --nsInclude="db.*" --dir=/tmp/inet2you_prod
rm -rf /tmp/inet2you_prod

echo "Run migrations..."
echo y | npm run payload migrate

echo "Done!"
