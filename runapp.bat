cd scripts
echo export * from 'tabris' > tabris-ui/tabris-lib.ts
call tsc
cd ../build
call tsc
call node build
cd ../
cordova run android
