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
            result = Observable.from(result);

            result.observe(() => {
                PageManager.queueRender(result);
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
                this.renderPage(page);
                // console.log((new Date() - m))
                // console.profileEnd('render');
            }, 0);
        }
    }

    public static renderPage(page: Page) {
        let result = <ElementResult>(<any>page).render();

        let diffArray = <{ count: number, added: boolean, removed: boolean, value: ScreenCommand[] }[]>JsDiff.diffArrays(this.lastCommands, result.commands);
        this.lastCommands = result.commands;
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
                        attrs[innerCommand.options.key] = innerCommand.options.value;
                    } else {
                        index--;
                        break;
                    }
                }


                this.widgets[command.options.widgetId] = this.createComponent(page, command.options.key, attrs);


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
                // console.log(`removing ${command.commandType} ${command.options.key} ${command.options.value || ''} ${command.options.widgetId} `);
                if (this.widgets[command.options.key] && !this.widgets[command.options.key].isDisposed()) {
                    this.widgets[command.options.key].dispose();
                }
                break;
            case CommandType.ConsoleLog:
                break;
        }
    }

    private static createComponent(page: Page, key: string, attrs: {}) {

        if (['Button',
                'Canvas',
                'Cell',
                'CheckBox',
                'CollectionView',
                'Composite',
                'Drawer',
                'ImageView',
                'NavigationView',
                'Page',
                'Picker',
                'ProgressBar',
                'RadioButton',
                'ScrollView',
                'SearchAction',
                'Slider',
                'Switch',
                'Tab',
                'TabFolder',
                'TextInput',
                'TextView',
                'ToggleButton',
                'Video',
                'WebView'].indexOf(key) != -1) {
            return new tabris[key](attrs);
        } else {
            for (let i = 0; i < page.components.length; i++) {
                let obj = <any>page.components[i];
                if (obj.prototype.$$component_name === key) {
                    let component = new obj();
                    debugger;
                    for (let attr in attrs) {
                        component[attr] = attrs[attr];
                    }
                    //todo
                    //render method returns a list of commands, i think you shoudl append that to the
                    //commands array

                    //maybe you detect that at render of the page and splice it into the commands
                    //idk how attrs should work
                    return component.render();
                }
            }
            throw 'component not found: ' + key
        }
    }
}