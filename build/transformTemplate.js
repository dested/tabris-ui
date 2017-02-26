var through = require('through2');
var xml2js = require('xml2js');

module.exports = function () {
    return through.obj(function (file, encoding, callback) {
        let templateFile = file._contents.toString(encoding);

        xml2js.parseString(templateFile, (err, result) =>{
            console.dir(JSON.stringify(result));
            callback(null, file);
        });

    });
};