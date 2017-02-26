import * as tabris from "tabris";

import LoadingPage from "./LoadingPage.vue";

let loadPage = (page) => {
  var tabrisPage=  page.render();
    tabrisPage.open();
};


loadPage(new LoadingPage());


