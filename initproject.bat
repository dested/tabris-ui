call cordova platform remove android
call cordova platform add c:\tabris\android
cd scripts
call npm install
call tsc
cd ../build
call npm install
call tsc
call node build
cd ../www
call npm install
