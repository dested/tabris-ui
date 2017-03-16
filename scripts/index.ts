import CalendarPage from "./CalendarPage.vue";
import {PageManager} from "./tabris-ui/pageManager";

declare var process;

setTimeout(() => {
    let calendarPage = new CalendarPage();
    PageManager.loadPage(calendarPage);
}, 10);