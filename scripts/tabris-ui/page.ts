// import * as tabris from "tabris";
import * as tabris from "./tabris";

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
        let result = new ElementResult();
        let childrenCommands: ElementResult[] = [];
        let attributes = {};
        let ons = {};

        if (Array.isArray(parm1)) {
            childrenCommands = parm1;
        }
        else {
            attributes = parm1.attrs;
            ons = parm1.on;
            childrenCommands = parm2;
        }


        switch (key) {
            case "Console":
                result.commands.push(new ScreenCommand(CommandType.ConsoleLog, {value: attributes["log"]}));
                break;
            default:
                let widgetId = attributes["id"];
                result.commands.push(new ScreenCommand(CommandType.CreateWidget, {
                    key: key,
                    widgetId: widgetId
                }));
                result.widgetId = widgetId;


                for (let attrKey in attributes) {
                    let float = parseFloat(attributes[attrKey]);
                    let value;
                    if (!isNaN(float)) {
                        value = float;
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


                            for (let j = 0; j < childCommand.commands.length; j++) {
                                let c = childCommand.commands[j];
                                if (c.options.widgetId === childCommand.widgetId) {
                                    c.options.widgetId = result.widgetId + "_child_" + childCommand.widgetId;
                                }


                                if (c.options.key === childCommand.widgetId) {
                                    c.options.key = result.widgetId + "_child_" + childCommand.widgetId;
                                }


                            }


                            childCommand.widgetId = result.widgetId + "_child_" + childCommand.widgetId;


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
        let results: ElementResult[] = [];
        for (let i = 0; i < values.length; i++) {
            let val = values[i];
            let result = callback(val);
            if (result) {

                var oldWidgetId=result.widgetId;
                var newWidgetId=result.widgetId+"_ind_" + val;

                for (let j = 0; j < result.commands.length; j++) {
                    let c = result.commands[j];
                    if (c.options.widgetId .indexOf(oldWidgetId)===0) {
                        c.options.widgetId = c.options.widgetId.replace(oldWidgetId,newWidgetId);
                    }

                    if (c.options.key .indexOf(oldWidgetId)===0) {
                        c.options.key = c.options.key.replace(oldWidgetId,newWidgetId);
                    }
                }

                result.widgetId = newWidgetId;
            }
            results.push(result)

        }
        return results;
    }
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