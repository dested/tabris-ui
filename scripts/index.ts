﻿import TestPage from "./TestPage.vue";
import CalendarPage from "./CalendarPage.vue";
import {PageManager} from "./tabris-ui/pageManager";


setTimeout(() => {
    let calendarPage = new CalendarPage();
    PageManager.loadPage(calendarPage);
}, 10);