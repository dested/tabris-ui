import LoadingPage from "./LoadingPage.vue";
import {ElementResult, CommandType, ScreenCommand} from "./tabris-ui/page";


// import * as tabris from "tabris";
import * as tabris from "./tabris-ui/tabris";

let lastCommands: ScreenCommand[];
let widgets = {};

let loadPage = (page) => {
    var result = <ElementResult>page.render();
    let tabrisPage: tabris.Page;




    for (let i = 0; i < result.commands.length; i++) {
        let command = result.commands[i];
        switch (command.commandType) {
            case CommandType.CreateWidget:
                let attrs = {};
                for (i++; i < result.commands.length; i++) {
                    let innerCommand = result.commands[i];
                    if (innerCommand.commandType == CommandType.SetProperty && innerCommand.options.widgetId === command.options.widgetId) {
                        attrs[innerCommand.options.key] = innerCommand.options.value;
                    } else {
                        i--;
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
                widgets[command.options.widgetId].append(widgets[command.options.key]);
                break;
            case CommandType.ConsoleLog:
                console.log(command.options.value);
                break;
        }
    }
    if (tabrisPage) {
        tabrisPage.open();
    }

    lastCommands=result.commands;

};

loadPage(new LoadingPage());


