import * as tabris from './tabris-lib'

import {Observable} from "./object-observer";

import * as JsDiff from "./diff";
import {ScreenCommand, CommandType, ElementResult, Page, Composite} from "./page";


export function Component(options: { name: string; components?: any[] } = {name: 'Comp'}) {
    return function (target: any) {
        // save a reference to the original constructor
        let original = target;

        // a utility function to generate instances of a class
        function construct(constructor, args) {
            let c: any = function () {
                return constructor.apply(this, args);
            };
            c.prototype = constructor.prototype;
            return new c();
        }

        // the new constructor behaviour
        let f: any = function (...args) {
            let result = construct(original, args);
            result.components = options.components || [];
            if (result instanceof Page) {
                setInterval(() => {
                    PageManager.queueRender(result);
                }, 1000);
            }
            return result;
            result = Observable.from(result);

            result.observe((changes: any[]) => {
                if (changes[0].path[0].indexOf("__") == 0)return;
                console.log('changes', changes[0].path.join('.'));
                if (result instanceof Page) {
                    PageManager.queueRender(result);
                } else if (result instanceof Composite) {
                    PageManager.queueRender(result.__page);
                }

            });
            return result;
        };

        // copy prototype so instanceof operator still works
        f.prototype = original.prototype;
        f.prototype.$$component_name = options.name
        return f;
    }
}
export class PageManager {
    buildCommands: any;
    static lastCommands: ScreenCommand[] = [];
    static widgets = {};
    static tabrisPage: tabris.Page;

    static loadPage(page: Page) {
        page.onLoad();
        this.renderPage(page);
        if (this.tabrisPage) {
            this.tabrisPage.open();
        }
    }

    static renders = {};

    public static queueRender(page: Page) {
        if (!this.renders[page._id]) {
            this.renders[page._id] = true;
            setTimeout(() => {
                delete this.renders[page._id];
                // console.profile('render');
                // var m = new Date();
                console.log('draw');
                this.renderPage(page);
                // console.log((new Date() - m))
                // console.profileEnd('render');
            }, 0);
        }
    }

    private static getWidgetId(result: ElementResult) {
        let name = (result.widgetId + (result.iteratorKey ? "_" + result.iteratorKey : ''));
        if (result.parent) {
            name = result.parent.widgetId + "_" + name;
        }
        return name;
    }

    public static processTree(page: Page, result: ElementResult): ScreenCommand[] {
        let commands: ScreenCommand[] = [];
        if (result.custom) {
            let widgetId = this.getWidgetId(result);
            if (!page.componentInstances[widgetId]) {
                page.componentInstances[widgetId] = new (result.custom)();
                page.componentInstances[widgetId].__page = page;
                for (let attr in result.attributes) {
                    page.componentInstances[widgetId][attr] = result.attributes[attr];
                }
                for (let on in result.ons) {
                    page.componentInstances[widgetId].callbacks[on] = result.ons[on];
                }
            } else {
                /*
                 for (let attr in result.attributes) {
                 if (result.attributes[attr] && typeof result.attributes[attr] === 'object') {
                 if (JSON.stringify(result.attributes[attr],null,'\t')!== JSON.stringify(page.componentInstances[widgetId][attr],null,'\t')) {
                 debugger;
                 page.componentInstances[widgetId][attr] = result.attributes[attr];
                 }
                 }
                 }
                 */
            }


            let child = page.componentInstances[widgetId].render();
            child.parent = result.parent;
            commands.push(...this.processTree(page, child));
            result.widgetId = child.widgetId;
        } else {
            let widgetId = this.getWidgetId(result);
            result.widgetId = widgetId;
            if (result.commands.length == 0) {
                result.commands.push(new ScreenCommand(CommandType.CreateWidget, {
                    key: result.tag,
                    widgetId: widgetId
                }));

                for (let key in result.attributes) {
                    result.commands.push(new ScreenCommand(CommandType.SetProperty, {
                        key: key,
                        value: result.attributes[key],
                        widgetId: widgetId
                    }));
                }

                for (let key in result.ons) {
                    result.commands.push(new ScreenCommand(CommandType.AddEvent, {
                        key: key,
                        value: result.ons[key],
                        widgetId: widgetId
                    }));
                }
            }
            commands.push(...result.commands);
            for (let i = 0; i < result.children.length; i++) {
                let child = result.children[i];
                child.parent = result;
                commands.push(...this.processTree(page, child));
                commands.push(new ScreenCommand(CommandType.AppendWidget, {
                    key: child.widgetId,
                    widgetId: widgetId,
                    value: !!page.componentInstances[child.widgetId]
                }));

            }
        }


        return commands;
    }

    public static renderPage(page: Page) {
        let result = <ElementResult>(<any>page).render();


        let commands = this.processTree(page, result);


        let diffArray = <{ count: number, added: boolean, removed: boolean, value: ScreenCommand[] }[]>
            JsDiff.diffArrays(this.lastCommands, commands);
        this.lastCommands = commands;
        for (let i = 0; i < diffArray.length; i++) {
            let diff = diffArray[i];
            if (diff.removed) {
                for (let j = 0; j < diff.value.length; j++) {
                    let command = diff.value[j];
                    this.removeCommand(page, command, j, diff.value);
                }
            }
            else if (diff.added) {
                for (let j = 0; j < diff.value.length; j++) {
                    let command = diff.value[j];
                    this.addCommand(page, command, j, diff.value);
                }
            } else {
                for (let j = 0; j < diff.value.length; j++) {
                    let command = diff.value[j];
                    switch (command.commandType) {
                        case CommandType.CreateWidget:
                            this.widgets[command.options.widgetId].lastModifiedWidget = null;
                            break;
                        case CommandType.AppendWidget:
                            this.widgets[command.options.widgetId].lastModifiedWidget = this.widgets[command.options.key];
                            break;
                    }
                }

            }
        }

        this.tabrisPage.forceResize && this.tabrisPage.forceResize()

    }


    static addCommand(page: Page, command: ScreenCommand, index: number, commands: ScreenCommand[]) {
        // console.log(`adding ${command.commandType} ${command.options.key} ${command.options.value || ''} ${command.options.widgetId} `);
        switch (command.commandType) {
            case CommandType.CreateWidget:
                let attrs = {};
                for (index++; index < commands.length; index++) {
                    let innerCommand = commands[index];
                    if (innerCommand.commandType == CommandType.SetProperty && innerCommand.options.widgetId === command.options.widgetId) {
                        if (innerCommand.options.key === "id") {
                            attrs[innerCommand.options.key] = innerCommand.options.widgetId;
                        } else {
                            attrs[innerCommand.options.key] = innerCommand.options.value;
                        }
                    } else {
                        index--;
                        break;
                    }
                }


                this.widgets[command.options.widgetId] = new tabris[command.options.key](attrs);

                if (command.options.key === "Page") {
                    this.tabrisPage = this.widgets[command.options.widgetId];
                }
                break;
            case CommandType.SetProperty:
                this.widgets[command.options.widgetId].set(command.options.key, command.options.value);
                break;
            case CommandType.AddEvent:
                this.widgets[command.options.widgetId].on(command.options.key, command.options.value);
                break;
            case CommandType.AppendWidget:
                if (this.widgets[command.options.widgetId].lastModifiedWidget) {
                    this.widgets[command.options.key].insertAfter(this.widgets[command.options.widgetId].lastModifiedWidget)
                } else {
                    this.widgets[command.options.widgetId].append(this.widgets[command.options.key]);
                }
                break;
            case CommandType.ConsoleLog:
                console.log(command.options.value);
                break;
        }
    }

    static removeCommand(page: Page, command: ScreenCommand, index: number, commands: ScreenCommand[]) {
        switch (command.commandType) {
            case CommandType.CreateWidget:
                break;
            case CommandType.SetProperty:
                break;
            case CommandType.AddEvent:
                // console.log(`removing ${command.commandType} ${command.options.key} ${command.options.value || ''} ${command.options.widgetId} `);
                if (this.widgets[command.options.widgetId] && !this.widgets[command.options.widgetId].isDisposed()) {
                    this.widgets[command.options.widgetId].off(command.options.key, command.options.value);
                }
                break;
            case CommandType.AppendWidget:
                if (this.widgets[command.options.key] && !this.widgets[command.options.key].isDisposed()) {
                    this.widgets[command.options.key].dispose();
                    if (command.options.value) {
                        delete page.componentInstances[command.options.key];
                    }
                }
                break;
            case CommandType.ConsoleLog:
                break;
        }
    }
}