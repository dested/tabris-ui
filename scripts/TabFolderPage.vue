<template>

    <Page topLevel="false" id="Another" title="tab tab">
        <TabFolder left="0" right="0" top="0" bottom="50">
            <Tab title="tab 1">
                <TextView text="Text 11" left="0" right="0" top="0" bottom="0" alignment="center"></TextView>
            </Tab>
            <Tab title="tab 2">
                <TextView text="Text 21" left="0" right="0" top="0" bottom="0" alignment="center"></TextView>
            </Tab>
            <Tab title="tab 3">
                <TextView text="Text 31" left="0" right="0" top="0" bottom="0" alignment="center"></TextView>
            </Tab>
        </TabFolder>
        <Composite left="0" right="0" background="#ff0000" top="prev()" bottom="0">
            <TextView textColor="white" text="Next Page" left="0" right="0" top="0" bottom="0" alignment="center"></TextView>
        </Composite>
    </Page>

</template>

<script lang="ts">

    import {Page} from "./tabris-ui/page";
    import {PageManager} from "./tabris-ui/pageManager";

    export default class extends Page {

        onLoad() {
        }

        onComponentCreated() {

        }

        onNavigateTo() {

        }

        onResize() {
        }

    }

</script>

