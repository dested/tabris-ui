cd ../scripts
call tsc
cd ../build
call tsc
call node build
cd ../www
call webpack ./scripts/index.js bundle.js
call http-server -o -p 9292 -c-1