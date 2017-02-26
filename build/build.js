var fs = require("fs");
var jsdom = require("jsdom");
var xml2js = require("xml2js");
var ts = require("typescript");

 fs.readFile("../scripts/tsconfig.json",(err, data) => {
    var tsconfig=data.toString();

     fs.readFile("../scripts/LoadingPage.vue", (err, data) => {
         jsdom.env(
             `<vue>${data.toString()}</vue>`,
             ["http://code.jquery.com/jquery.js"],
             function (err, window) {
                 let template = window.$('template').html();
                 let script = window.$('script').html();

                 xml2js.parseString(template, function (err, result) {
                     console.dir(JSON.stringify(result));
                 });
                 var jsFile=ts.transpile(script,JSON.parse(tsconfig));
                 console.log(jsFile)

             }
         );
     })


});
