import * as tabris from "tabris";


export abstract class Page {
    abstract onLoad();

    onComponentCreated() {

    }

    onNavigateTo() {

    }

    onResize() {
    }
}

export class Builder {
    static create(key: string, parm1: any, parm2: any): ElementResult {
        let result = null;
        let children: ElementResult[]    :        [];
        var attributes = {};
        var on = {};

        if (Array.isArray(parm1)) {
            children = parm1;
        }
        else {
            attributes = parm1.attrs;
            ons = parm1.on;
            children = parm2;
        }


        switch (key) {
            case "Console":
                console.log(attributes["log"])
                break;
            default:
                for (let attrKey in attributes) {
                    var float = parseFloat(attributes[attrKey]);
                    if (!isNaN(float)) {
                        attributes[attrKey] = float;
                        continue;
                    }
                    if (attributes[attrKey] === "true") {
                        attributes[attrKey] = true;
                        continue;
                    }
                    if (attributes[attrKey] === "false") {
                        attributes[attrKey] = false;
                        continue;
                    }
                }
                console.log(`creating ${key} ${JSON.stringify(attributes)}`)
                var elem = new tabris[key](attributes);


                for (let on in ons) {
                    let callback=ons[on];
                    elem.on(on,()=>{
                        callback();
                    })
                }



                if (children) {
                    for (let child of children) {
                        if (child) {
                            if (Array.isArray(child)) {
                                for (var i = 0; i < child.length; i++) {
                                    if (child[i]) {
                                        elem.append(child[i].element);
                                    }
                                }
                            } else {
                                elem.append(child.element);
                            }
                        }
                    }
                }
                result = new ElementResult();
                result.element = elem;
                break;
        }
        return result;
    }

    static space(key: string) {
        return null
    }

    static empty() {
        return null
    }

    static loop(values: any[], callback: (item: any) => ElementResult): ElementResult[] {
        var elements: ElementResult[] = [];
        for (var i = 0; i < values.length; i++) {
            var val = values[i];
            elements.push(callback(val))
        }
        return elements;
    }
}
export class ElementResult {
    element: tabris.Widget;
}