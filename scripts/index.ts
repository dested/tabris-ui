import LoadingPage from "./LoadingPage.vue";
import {ElementResult, CommandType, ScreenCommand, Page} from "./tabris-ui/page";


import * as tabris from "tabris";
// import * as tabris from "./tabris-ui/tabris";

import * as JsDiff from "./tabris-ui/diff";

let lastCommands: ScreenCommand[] = [];
let widgets = {};
let tabrisPage: tabris.Page;

function removeCommand(command: ScreenCommand, index: number, commands: ScreenCommand[]) {
    switch (command.commandType) {
        case CommandType.CreateWidget:
            break;
        case CommandType.SetProperty:
            break;
        case CommandType.AddEvent:
            console.log(`removing ${command.commandType} ${command.options.key} ${command.options.value||''} ${command.options.widgetId} `);
            if (widgets[command.options.widgetId] && !widgets[command.options.widgetId].isDisposed()) {
                widgets[command.options.widgetId].off(command.options.key, command.options.value);
            }
            break;
        case CommandType.AppendWidget:
            console.log(`removing ${command.commandType} ${command.options.key} ${command.options.value||''} ${command.options.widgetId} `);
            if (widgets[command.options.key] && !widgets[command.options.key].isDisposed()) {
                widgets[command.options.key].dispose();
                delete widgets[command.options.key];
            }
            break;
        case CommandType.ConsoleLog:
            break;
    }
}


function addCommand(command: ScreenCommand, index: number, commands: ScreenCommand[]) {
    console.log(`adding ${command.commandType} ${command.options.key} ${command.options.value||''} ${command.options.widgetId} `);
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
            widgets[command.options.widgetId] = new tabris[command.options.key](attrs);
            if (command.options.key === "Page") {
                tabrisPage = widgets[command.options.widgetId];
            }
            break;
        case CommandType.SetProperty:
            widgets[command.options.widgetId].set(command.options.key, command.options.value);
            break;
        case CommandType.AddEvent:
            widgets[command.options.widgetId].on(command.options.key, command.options.value);
            break;
        case CommandType.AppendWidget:
            if(widgets[command.options.widgetId].lastModifiedWidget){
                widgets[command.options.key].insertAfter(widgets[command.options.widgetId].lastModifiedWidget)
            }else{
                widgets[command.options.widgetId].append(widgets[command.options.key]);
            }
            break;
        case CommandType.ConsoleLog:
            console.log(command.options.value);
            break;
    }
}
let loadPage = (page) => {
    let result = <ElementResult>page.render();


    let diffArray = <{count: number, added: boolean, removed: boolean, value: ScreenCommand[]}[]>JsDiff.diffArrays(lastCommands, result.commands);
    lastCommands = result.commands;
    for (let i = 0; i < diffArray.length; i++) {
        let diff = diffArray[i];
        if (diff.removed) {
            for (let j = 0; j < diff.value.length; j++) {
                let command = diff.value[j];
                removeCommand(command, j, diff.value);
            }
        }
        else if (diff.added) {
            for (let j = 0; j < diff.value.length; j++) {
                let command = diff.value[j];
                addCommand(command, j, diff.value);
            }
        } else {
            for (let j = 0; j < diff.value.length; j++) {
                let command = diff.value[j];
                switch (command.commandType) {
                    case CommandType.CreateWidget:
                        widgets[command.options.widgetId].lastModifiedWidget = null;
                        break;
                    case CommandType.AppendWidget:
                        widgets[command.options.widgetId].lastModifiedWidget = widgets[command.options.key];
                        break;
                }
            }

        }

    }
    if (tabrisPage) {
        tabrisPage.open();
    }



    setTimeout(() => {
        page.version += 14;
        loadPage(page);
    }, 2000);


};

loadPage(new LoadingPage());


