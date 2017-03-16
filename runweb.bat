cd scripts
echo export * from './tabris' > tabris-ui/tabris-lib.ts
call tsc
cd ../build
call tsc
call node build
cd ../www
call webpack ./scripts/index.js bundle.js
cd ..
call http-server -o -p 9292 -c-1 www