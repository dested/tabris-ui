<template>

    <Page topLevel="true" id="LoadingPage">
        <ActivityIndicator top="prev() 20" centerX="0" :width="48*2" :height="48*2"></ActivityIndicator>
        <ActivityIndicator top="prev() 20" centerX="0" :width="48*2" :height="48*2"></ActivityIndicator>
        <ScrollView top="prev() 50" bottom="50" left="0" right="0">
            <Composite v-for="item of [20,40,60,100,120,140,190]"  :top="`prev() `+item">
                <Console :log="item"></Console>
                <TextView v-if="item >=40"
                          centerX="0"
                          textColor="silver"
                          font="bold 8px"
                          alignment="center"
                          :text="'Version '+version+' '+item">
                </TextView>
            </Composite>
        </ScrollView>
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

        onComponentCreated() {

        }

        onNavigateTo() {

        }

        onResize() {
            tabris.ui.set("toolbarVisible", false);
        }
    }

</script>

