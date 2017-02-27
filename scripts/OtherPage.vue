<template>

    <Page topLevel="false" id="OtherPage" title="foo">
        <ActivityIndicator top="prev() 20" centerX="0" :width="48*2" :height="48*2"></ActivityIndicator>
        <ActivityIndicator top="prev() 20" centerX="0" :width="48*2" :height="48*2"></ActivityIndicator>
        <ActivityIndicator top="prev() 20" centerX="0" :width="48*2" :height="48*2"></ActivityIndicator>
        <Composite background="red" top="prev() 20" left="0" right="0" :height="drawHeight"
                   @tap="loadOtherPage()"></Composite>
    </Page>

</template>

<script lang="ts">

    import {Page} from "./tabris-ui/page";
    import {PageManager} from "./tabris-ui/pageManager";
    import TabFolderPage from "./TabFolderPage.vue";

    export default class extends Page {

        drawHeight: number = 30;
        ci = null;

        onLoad() {
            this.ci = setInterval(() => {
                this.drawHeight += 1;
            }, 200)
        }

        onComponentCreated() {

        }


        loadOtherPage() {
            clearInterval(this.ci);
            PageManager.loadPage(new TabFolderPage());
        }

        onNavigateTo() {

        }

        onResize() {
        }

    }

</script>

