import * as tabris from "tabris";


let loadingPage = new tabris.Page({
    topLevel: true,
    id: 'LoadingPage'
}).on("resize", () => {
    tabris.ui.set("toolbarVisible", false);
});


new tabris.ActivityIndicator({
    layoutData: {top: "prev() 20", centerX: 0, width: 48, height: 48}
}).appendTo(loadingPage);

new tabris.TextView({
    layoutData: {bottom: 20, left: 0, right: 0},
    textColor: "silver",
    font: 'bold 8px',
    alignment: 'center',
    text: "VERSION " + 12
}).appendTo(loadingPage);

loadingPage.open();


let template = {
    "page": {
        topLevel: true,
        id: 'loadingPage',
        children: []
    }
};
let templatehtml = `<page topLevel="true" id="LoadingPage">
<foo></foo>

</page>`;