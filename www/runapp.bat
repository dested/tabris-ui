cd ../scripts
call tsc
cd ../build
call tsc
call node build
cd ../www
cordova run android