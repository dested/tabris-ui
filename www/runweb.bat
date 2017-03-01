cd ../scripts
call tsc
cd ../build
call node build
cd ../www
call webpack ./scripts/index.js bundle.js
call http-server -o