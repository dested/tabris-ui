cordova platform remove android
cordova platform add c:\tabris\android
cd scripts
npm install
call tsc
cd ../build
npm install
call tsc
call node build
cd ../www
npm install
