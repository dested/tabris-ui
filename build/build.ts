import * as fs from "fs";
import * as jsdom from "jsdom";
import * as convert from "xml-js";
import * as ts from "typescript";


export default class Build {

    static async main() {
        let tsconfig = (await awaiter(fs.readFile, "../scripts/tsconfig.json")).toString();

        let file = "LoadingPage.vue";

        let component = (await awaiter(fs.readFile, "../scripts/" + file)).toString()

        let window = await awaiter(jsdom.env, `<vue>${component}</vue>`, ["http://code.jquery.com/jquery.js"]);

        let txt = component.match(new RegExp(`<template>((.|[\r\n])*)<\/template>`))
        let template = txt[1];

        let script = window.$('script').html();

        let templateJson = <Element>JSON.parse(convert.xml2json(template, {compact: false, spaces: 4}));
        let templateJS = this.buildUIFromTemplate(templateJson.elements[0]);


        var jsFile = ts.transpile(script, JSON.parse(tsconfig));


        jsFile += `default_1.prototype.render=function(){${templateJS.code} return ${templateJS.variable};}`;

        var writeResult = await awaiter(fs.writeFile, "../www/scripts/" + file, jsFile);

    }

    static varCounter = 0;

    static variableName(key: string): string {
        return key + "" + (this.varCounter++);
    }


    static buildUIFromTemplate(element: Element): { variable: string, code: string } {
        var code = '';

        var variable = this.variableName(element.name);
        code += `var ${variable} = new tabris.${element.name}(${this.getOptions(element.attributes)});`;
        if (element.elements) {
            for (let childElement of element.elements) {
                //todo support our components
                //need to determine if the key is in the list of tabris elements
                //if not try to require the component somehow
                var result = this.buildUIFromTemplate(childElement);

                code += result.code;
                code += `${result.variable}.appendTo(${variable});`;
            }
        }

        return {variable, code};

    }

    private static getOptions(options: { [key: string]: string }) {
        var result = {};
        for (let key in options) {
            let curResult = result;
            let locKey = key;
            if (key.indexOf('.') >= 0) {
                let locKeys = key.replace(':', '').split('.');
                for (let l = 0; l < locKeys.length-1; l++) {
                    locKey = locKeys[l];
                    if (!curResult[locKey]) {
                        curResult[locKey] = {};
                    }
                    curResult = curResult[locKey];
                }
                locKey = locKeys[locKeys.length-1];
            }


            if (locKey[0] === ':') {

            } else if (locKey[0] === 'v' && locKey[1] === '-') {

            } else {
                var float = parseFloat(options[key]);
                if (!isNaN(float)) {
                    curResult[locKey] = float;
                    continue;
                }
                if (options[locKey] === "true") {
                    curResult[locKey] = true;
                    continue;
                }
                if (options[locKey] === "false") {
                    curResult[locKey] = false;
                    continue;
                }
                curResult[locKey] = options[key];
            }
        }
        return JSON.stringify(result);
    }
}


let awaiter = (call: Function, ...args: any[]): Promise<any> => {
    return new Promise((resolve, reject) => {
        args.push((err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
        call.apply(null, args);
    });
};
Build.main();


export interface Element {
    type: string;
    name: string;
    attributes: { [key: string]: string };
    elements: Element[];
}

