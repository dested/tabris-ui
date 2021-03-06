import {PageManager} from "./pageManager";
export abstract class Composite {
    private callbacks: { [key: string]: Function } = {};
    public componentInstances: { [key: string]: any } = {};

    abstract onLoad();

    __page: Page = undefined;
    components: Composite[] = [];

    onComponentCreated() {

    }

    onNavigateTo() {

    }

    onResize() {
    }

    $emit(key: string, ...args: any[]) {
        if (this.callbacks[key]) {
            this.callbacks[key].apply(this, args);
        } else {
            throw "Callback not found " + key;
        }
    }


    _create(key: string, parm1: any, parm2: any): ElementResult {
        let result = new ElementResult();
        result.tag = key;
        let childrenResults: (ElementResult[] | ElementResult[][]) = [];
        let attributes = {};
        let ons = {};

        if (Array.isArray(parm1)) {
            childrenResults = parm1 || [];
        }
        else if (parm1 != null) {
            attributes = parm1.attrs || {};
            ons = parm1.on || [];
            childrenResults = parm2 || [];
            result.iteratorKey = parm1.key;
        }

        let children: ElementResult[] = [];
        for (let i = 0; i < childrenResults.length; i++) {
            let child = childrenResults[i];
            if (!child)continue;
            if (Array.isArray(child)) {
                for (let j = 0; j < child.length; j++) {
                    let c = child[j];
                    children.push(c);
                }
            } else {
                children.push(child)
            }
        }

        switch (key) {
            case "Console":
                result.commands.push(new ScreenCommand(CommandType.ConsoleLog, {value: attributes["log"]}));
                break;
            case 'ActivityIndicator':
            case 'Button':
            case 'Canvas':
            case 'Cell':
            case 'CheckBox':
            case 'CollectionView':
            case 'Composite':
            case 'Drawer':
            case 'ImageView':
            case 'NavigationView':
            case 'Page':
            case 'Picker':
            case 'ProgressBar':
            case 'RadioButton':
            case 'ScrollView':
            case 'SearchAction':
            case 'Slider':
            case 'Switch':
            case 'Tab':
            case 'TabFolder':
            case 'TextInput':
            case 'TextView':
            case 'ToggleButton':
            case 'Video':
            case 'WebView:' :
                result.widgetId = attributes["id"];
                result.attributes = {};
                result.ons = {};

                for (let attrKey in attributes) {
                    let value;
                    if (!isNaN(attributes[attrKey])) {
                        value = parseFloat(attributes[attrKey]);
                    }
                    else if (attributes[attrKey] === "true") {
                        value = true;
                    }
                    else if (attributes[attrKey] === "false") {
                        value = false;
                    } else {
                        value = attributes[attrKey];
                    }

                    result.attributes[attrKey] = value;

                }


                for (let on in ons) {
                    let callback = ons[on];
                    result.ons[on] = callback;
                }


                for (let childCommand of children) {
                    result.children.push(childCommand);
                }
                break;
            default:
                for (let i = 0; i < this.components.length; i++) {
                    let obj = <any>this.components[i];
                    if (obj.prototype.$$component_name === key) {
                        result.widgetId = attributes["id"];
                        result.attributes = {};
                        result.custom = obj;
                        result.ons = {};

                        for (let attrKey in attributes) {
                            let value;
                            if (!isNaN(attributes[attrKey])) {
                                value = parseFloat(attributes[attrKey]);
                            }
                            else if (attributes[attrKey] === "true") {
                                value = true;
                            }
                            else if (attributes[attrKey] === "false") {
                                value = false;
                            } else {
                                value = attributes[attrKey];
                            }

                            result.attributes[attrKey] = value;

                        }


                        for (let on in ons) {
                            let callback = ons[on];
                            result.ons[on] = callback;
                        }


                        for (let childCommand of children) {
                            result.children.push(childCommand);
                        }
                        return result;
                    }
                }
                throw 'component not found: ' + key;
                break;
        }
        return result;
    }

    _space(key: string) {
        return null
    }

    _empty() {
        return null
    }

    _loop(values: any[], callback: (item: any) => ElementResult): ElementResult[] {
        let results: ElementResult[] = [];
        for (let i = 0; i < values.length; i++) {
            let val = values[i];
            let result = callback(val);
            if (result) {
                if (!result.iteratorKey) {
                    result.iteratorKey = i.toString();
                }
                results.push(result);
            }
        }
        return results;
    }
}

export abstract class Page extends Composite {

    _id = (Math.random() * 10000000) | 0;

}


export class ScreenCommand {
    commandType: string;
    options: ICommandOptions;

    constructor(commandType: string, options: ICommandOptions) {
        this.commandType = commandType;
        this.options = options;
    }
}
export class ElementResult {
    commands: ScreenCommand[] = [];
    children: ElementResult[] = [];
    widgetId: string;
    iteratorKey: string;
    tag: string;
    attributes: { [key: string]: any };
    ons: { [key: string]: Function };
    parent: ElementResult;
    custom: any;
}
export class CommandType {
    static AppendWidget = "AppendWidget";
    static ConsoleLog = "ConsoleLog";
    static CreateWidget = "CreateWidget";
    static SetProperty = "SetProperty";
    static AddEvent = "AddEvent";
}
export interface ICommandOptions {
    value?: any;
    key?: string;
    widgetId?: string;
}