import * as fs from "fs";
import * as jsdom from "jsdom";
import * as ts from "typescript";
import * as uglifyJS from "uglify-js";
import * as  compiler from './vueTemplateCompiler';


export default class Build {

    static async main() {
        let tsconfig = (await awaiter(fs.readFile, "../scripts/tsconfig.json")).toString();


        let files = await awaiter(fs.readdir, "../scripts/")


        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            if (file.indexOf(".vue") >= 0) {
                console.log('starting '+file)
                let component = (await awaiter(fs.readFile, "../scripts/" + file)).toString()

                let window = await awaiter(jsdom.env, `<vue>${component}</vue>`, ["http://code.jquery.com/jquery.js"]);

                let txt = component.match(new RegExp(`<template>((.|[\r\n])*)<\/template>`))
                let template = txt[1];


                let script = window.$('script').html();

                var jsFile = ts.transpile(script, JSON.parse(tsconfig)).replace(/\"use strict\";/g, "");


                let templateJS = compiler.compile(template, {}).render;
                jsFile += `
                        default_1.prototype.render=function(){
                            var _c=page_1.Builder.create;
                            var _e=page_1.Builder.empty;
                            var _l=page_1.Builder.loop;
                            var _v=page_1.Builder.space;
                            ${templateJS}
                        }`;


                var toplevel_ast = uglifyJS.parse(jsFile, {strict: false});
                jsFile = toplevel_ast.print_to_string({beautify: true});

                var writeResult = await awaiter(fs.writeFile, "../www/scripts/" + file, jsFile);
                console.log('writing '+file)

            }
        }


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
    attributes: {[key: string]: string};
    elements: Element[];
}

