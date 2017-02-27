import * as tabris from "tabris";
// import * as tabris from "./tabris-ui/tabris";

import * as JsDiff from "./diff";
import {ScreenCommand, CommandType, ElementResult, Page} from "./page";

export class PageManager {
    static lastCommands: ScreenCommand[] = [];
    static widgets = {};
    static tabrisPage: tabris.Page;

    static loadPage(page:Page) {
        page.onLoad();
        this.renderPage(page);
        if (this.tabrisPage) {
            this.tabrisPage.open();
        }
    }
    public static renderPage(page:Page) {
        let result = <ElementResult>(<any>page).render();

        let diffArray = <{count: number, added: boolean, removed: boolean, value: ScreenCommand[]}[]>JsDiff.diffArrays(this.lastCommands, result.commands);
        this.lastCommands = result.commands;
        for (let i = 0; i < diffArray.length; i++) {
            let diff = diffArray[i];
            if (diff.removed) {
                for (let j = 0; j < diff.value.length; j++) {
                    let command = diff.value[j];
                    this.removeCommand(command, j, diff.value);
                }
            }
            else if (diff.added) {
                for (let j = 0; j < diff.value.length; j++) {
                    let command = diff.value[j];
                    this.addCommand(command, j, diff.value);
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

    }


    static addCommand(command: ScreenCommand, index: number, commands: ScreenCommand[]) {
        console.log(`adding ${command.commandType} ${command.options.key} ${command.options.value || ''} ${command.options.widgetId} `);
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

    static removeCommand(command: ScreenCommand, index: number, commands: ScreenCommand[]) {
        switch (command.commandType) {
            case CommandType.CreateWidget:
                break;
            case CommandType.SetProperty:
                break;
            case CommandType.AddEvent:
                console.log(`removing ${command.commandType} ${command.options.key} ${command.options.value || ''} ${command.options.widgetId} `);
                if (this.widgets[command.options.widgetId] && !this.widgets[command.options.widgetId].isDisposed()) {
                    this.widgets[command.options.widgetId].off(command.options.key, command.options.value);
                }
                break;
            case CommandType.AppendWidget:
                console.log(`removing ${command.commandType} ${command.options.key} ${command.options.value || ''} ${command.options.widgetId} `);
                if (this.widgets[command.options.key] && !this.widgets[command.options.key].isDisposed()) {
                    this.widgets[command.options.key].dispose();
                    delete this.widgets[command.options.key];
                }
                break;
            case CommandType.ConsoleLog:
                break;
        }
    }

}