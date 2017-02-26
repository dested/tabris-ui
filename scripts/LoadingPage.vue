<template>

    <Page topLevel="true" id="LoadingPage">
        <ActivityIndicator top="prev() 20" centerX="0" width="48" height="48"></ActivityIndicator>
        <ActivityIndicator top="prev() 20" centerX="0" width="48" height="48"></ActivityIndicator>
        <Composite top="prev() 50" bottom="50">
            <TextView v-for="item in [20,40,60]"
                      :top="`prev() `+item"
                      textColor="silver"
                      font="bold 8px"
                      alignment="center"
                      :text="'Version '+version">
            </TextView>
        </Composite>
        <ActivityIndicator top="prev() 20" centerX="0" width="48" height="48"></ActivityIndicator>
    </Page>

</template>

<script lang="ts">

    import * as tabris from "tabris";
    import {Page} from "./tabris-ui/page";

    export default class extends Page {
        version: number = 12;

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

