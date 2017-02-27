import * as fs from "fs";
import * as jsdom from "jsdom";
import * as convert from "xml-js";
import * as ts from "typescript";
import * as uglifyJS from "uglify-js";
import * as  compiler from 'vue-template-compiler';


export default class Build {

    static async main() {
        let tsconfig = (await awaiter(fs.readFile, "../scripts/tsconfig.json")).toString();

        let file = "LoadingPage.vue";

        let component = (await awaiter(fs.readFile, "../scripts/" + file)).toString()

        let window = await awaiter(jsdom.env, `<vue>${component}</vue>`, ["http://code.jquery.com/jquery.js"]);

        let txt = component.match(new RegExp(`<template>((.|[\r\n])*)<\/template>`))
        let template = txt[1];

        let script = window.$('script').html();

        var jsFile = ts.transpile(script, JSON.parse(tsconfig)).replace(/\"use strict\";/g, "");


        // let templateJson = <Element>JSON.parse(convert.xml2json(template, {compact: false, spaces: 4}));
        // let templateJS = this.buildUIFromTemplate(templateJson.elements[0], null);
        // jsFile += `default_1.prototype.render=function(){with(this){${templateJS.code}return ${templateJS.variable};}}`;
        let templateJS =compiler.compile(template, {}).render;
        jsFile += `default_1.prototype.render=function(){page_1.Builder.varCounter=0;var _c=page_1.Builder.create;var _e=page_1.Builder.empty;var _l=page_1.Builder.loop;var _v=page_1.Builder.space;${templateJS}}`;




        var toplevel_ast = uglifyJS.parse(jsFile, {strict: false});
        jsFile = toplevel_ast.print_to_string({beautify: true});

        var writeResult = await awaiter(fs.writeFile, "../www/scripts/" + file, jsFile);

    }

    static varCounter = 0;

    static variableName(key: string): string {
        return key + "" + (this.varCounter++);
    }


    static buildUIFromTemplate(element: Element, parentVariable: string): { variable: string, code: string } {
        var code = '';

        var isConsole = element.name === 'Console';

        var isEmpty = isConsole || element.name === 'Empty';

        var variable = !isEmpty ? this.variableName(element.name) : parentVariable;
        let closeBottom = 0;
        if (element.attributes["v-for"]) {
            code += `for(let ${element.attributes["v-for"]}){` + this.newLine;
            closeBottom++;
        }
        if (element.attributes["v-if"]) {
            code += `if(${element.attributes["v-if"]}){` + this.newLine;
            closeBottom++;
        }

        if (isConsole) {
            code += `console.log(${element.attributes[":log"]})`;
        }
        if (!isEmpty) {
            //todo support more than just tabris elements
            code += `var ${variable} = new tabris.${element.name}(${this.getOptions(element.attributes)});` + this.newLine;
        }
        if (element.elements) {
            for (let childElement of element.elements) {
                let result = this.buildUIFromTemplate(childElement, variable);

                code += result.code + this.newLine;

            }
        }
        if (!isEmpty && parentVariable)
            code += `${parentVariable}.append(${variable});` + this.newLine;

        for (let i = 0; i < closeBottom; i++) {
            code += "}" + this.newLine;
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
                for (let l = 0; l < locKeys.length - 1; l++) {
                    locKey = locKeys[l];
                    if (!curResult[locKey]) {
                        curResult[locKey] = {};
                    }
                    curResult = curResult[locKey];
                }
                locKey = locKeys[locKeys.length - 1];
            }


            if (locKey[0] === ':') {
                curResult[locKey] = options[key];
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
        return this.stringify(result);
    }

    static newLine: string = '\r\n';

    static stringify(obj: any) {
        var sobj = '{';
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                var val = obj[key];

                if (key.indexOf(":") === 0) {
                    key = key.replace(':', '');
                    sobj += key + ":" + val + "," + this.newLine;
                } else if (Array.isArray(val)) {
                    sobj += key + ":[" + val.map((e) => this.stringify(e)).join(',') + "]," + this.newLine;
                } else if (typeof(val) === 'object') {
                    sobj += key + ":" + this.stringify(val) + "," + this.newLine;
                } else if (typeof(val) === 'string') {
                    sobj += key + ":\"" + val + "\"," + this.newLine;
                } else {
                    sobj += key + ":" + val + "," + this.newLine;
                }
            }
        }

        sobj += "}";
        return sobj;
    }

    /*  static fixVariableForThis(val: string) {


     var ast = uglifyJS.parse(val, {});


     var ast2 = ast.transform(new uglifyJS.TreeTransformer(function (node, descend) {
     if (node instanceof uglifyJS.AST_SymbolRef) {
     console.log(node.name);
     node = node.clone();
     }

     descend(node, this);
     return node;
     }));

     console.log(ast2.print_to_string({beautify: true}));
     return ast2.print_to_string({beautify: true});

     }*/
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

