import * as fs from "fs";
import * as jsdom from "jsdom";
import * as xml2js from "xml2js";
import * as ts from "typescript";


let awaiter = (call: Function, ...args: any[]): Promise<any> => {
    return new Promise((resolve, reject) => {
        args.push((err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
        call.apply(null,args);
    });
};


export default class Build {

    static async main() {
        let tsconfig = (await awaiter(fs.readFile, "../scripts/tsconfig.json")).toString();

        let data = await awaiter(fs.readFile, "../scripts/LoadingPage.vue")

        let window = await awaiter(jsdom.env, `<vue>${data.toString()}</vue>`, ["http://code.jquery.com/jquery.js"]);

        let template = window.$('template').html();
        let script = window.$('script').html();


        let templateJson = await awaiter(xml2js.parseString, template);
        var templateJS = this.buildUIFromTemplate(templateJson);

        var jsFile = ts.transpile(script, JSON.parse(tsconfig));
        console.log(jsFile)


    }
    static buildUIFromTemplate(templateJson: string) {
        console.dir(JSON.stringify(templateJson));
    }
}


Build.main();

