<template>

    <Page topLevel="true" id="LoadingPage">
        <ActivityIndicator layoutData.top="prev() 20" layoutData.centerX="0" layoutData.width="48" layoutData.height="48"></ActivityIndicator>
        <ActivityIndicator layoutData.top="prev() 20" layoutData.centerX="0" layoutData.width="48" layoutData.height="48"></ActivityIndicator>
        <Composite layoutData.top="prev() 50" layoutData.bottom="50">
            <TextView v-for="item in [20,40,60]"
                      :layoutData.top="`prev() `+item"
                      textColor="silver"
                      font="bold 8px"
                      alignment="center"
                      :text="'Version '+version">
            </TextView>
        </Composite>
        <ActivityIndicator layoutData.top="prev() 20" layoutData.centerX="0" layoutData.width="48" layoutData.height="48"></ActivityIndicator>
    </Page>

</template>

<script lang="ts">

    import * as tabris from "tabris";
    import {Page} from "./tabris-ui/page";

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

