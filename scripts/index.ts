
import CalendarPage from "./CalendarPage.vue";
import {PageManager} from "./tabris-ui/pageManager";

setTimeout(()=>{
    PageManager.loadPage(new CalendarPage());
},10)