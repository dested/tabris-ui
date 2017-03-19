import {PageManager} from "./pageManager";
export abstract class Composite {
    private callbacks: { [key: string]: Function } = {};
    private __componentInstances: { [key: string]: Composite } = {};

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
        let childrenCommands: ElementResult[] = [];
        let attributes = {};
        let ons = {};

        if (Array.isArray(parm1)) {
            childrenCommands = parm1;
        }
        else if (parm1 != null) {
            attributes = parm1.attrs;
            ons = parm1.on;
            childrenCommands = parm2;
            result.key = parm1.key;
        }


        switch (key) {
            case "Console":
                result.commands.push(new ScreenCommand(CommandType.ConsoleLog, {value: attributes["log"]}));
                break;
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
                let widgetId = attributes["id"];
                result.commands.push(new ScreenCommand(CommandType.CreateWidget, {
                    key: key,
                    widgetId: widgetId
                }));
                result.widgetId = widgetId;

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
                    result.commands.push(new ScreenCommand(CommandType.SetProperty, {
                        key: attrKey,
                        value: value,
                        widgetId: result.widgetId
                    }));
                }


                for (let on in ons) {
                    let callback = ons[on];
                    result.commands.push(new ScreenCommand(CommandType.AddEvent, {
                        key: on,
                        value: callback,
                        widgetId: result.widgetId
                    }));
                }


                if (childrenCommands) {
                    for (let childCommand of childrenCommands) {
                        if (childCommand) {


                            let newWidgetId = result.widgetId + "_child_" + childCommand.widgetId;


                            for (let j = 0; j < childCommand.commands.length; j++) {
                                let c = childCommand.commands[j];

                                if (c.options.widgetId.indexOf(childCommand.widgetId) >= 0) {
                                    c.options.widgetId = c.options.widgetId.replace(childCommand.widgetId, newWidgetId);
                                }


                                if (c.options.key.indexOf(childCommand.widgetId) >= 0) {
                                    c.options.key = c.options.key.replace(childCommand.widgetId, newWidgetId);
                                }
                            }

                            childCommand.widgetId = newWidgetId;


                            result.commands.push(...childCommand.commands);
                            if (childCommand.widgetId) {
                                result.commands.push(new ScreenCommand(CommandType.AppendWidget, {
                                    key: childCommand.widgetId,
                                    widgetId: result.widgetId
                                }));
                            }
                        }

                    }
                }
                break;
            default:
                for (let i = 0; i < this.components.length; i++) {
                    let obj = <any>this.components[i];
                    if (obj.prototype.$$component_name === key) {
                        let component;
                        debugger;
                        if (this.__componentInstances[attributes["id"]]) {
                            component = this.__componentInstances[attributes["id"]];
                        } else {
                            component = this.__componentInstances[attributes["id"]] = new obj();
                        }
                        component.__page = this;
                        for (let attr in attributes) {
                            component[attr] = attributes[attr];
                        }
                        for (let on in ons) {
                            let callback = ons[on];
                            component.callbacks[on] = callback;
                        }

                        return component.render();
                    }
                }
                throw 'component not found: ' + key
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
                var oldWidgetId = result.widgetId;
                var newWidgetId = result.widgetId + "_ind_" + (result.key || val);

                for (let j = 0; j < result.commands.length; j++) {
                    let c = result.commands[j];
                    if (c.options.widgetId.indexOf(oldWidgetId) === 0) {
                        c.options.widgetId = c.options.widgetId.replace(oldWidgetId, newWidgetId);
                    }

                    if (c.options.key.indexOf(oldWidgetId) === 0) {
                        c.options.key = c.options.key.replace(oldWidgetId, newWidgetId);
                    }
                }

                result.widgetId = newWidgetId;
            }
            results.push(result)

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
    widgetId: string;
    key: string;
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