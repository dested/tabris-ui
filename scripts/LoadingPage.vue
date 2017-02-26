<template>

    <page topLevel="true" id="LoadingPage">
        <activityIndicator layoutData.top="prev() 20" layoutData.centerX="0" layoutData.width="48" layoutData.height="48"></activityIndicator>
        <textView layoutData.bottom="20" textColor="silver" font="bold 8px" alignment="center" :text="'Version '+version"></textView>
    </page>

</template>

<script lang="ts">

    import * as tabris from "tabris";
    import {Page} from "tabris-ui/page";

    export default class extends Page {
        version: number = <number>'foo';

        onLoad() {

        }

        onComponentsCreated() {

        }

        onNavigateTo() {

        }

        onResize() {
            tabris.ui.set("toolbarVisible", false);
        }
    }

</script>

