<template>

    <Page topLevel="true" id="LoadingPage" title="loading">
        <ActivityIndicator top="prev() 20" centerX="0" :width="48*2" :height="48*2"></ActivityIndicator>
        <ActivityIndicator top="prev() 20" centerX="0" :width="48*2" :height="48*2"></ActivityIndicator>
        <ScrollView top="prev() 50" bottom="50" left="0" right="0">
            <Composite v-for="item of [20,40,60,100,120,140,190]" :top="`prev() `+item" v-if="item >=40" @tap="tapit(item)">
                <TextView
                        centerX="0"
                        textColor="red"
                        font="bold 15px"
                        alignment="center"
                        :text="'Version '+version+' '+item">
                </TextView>
                <TextView v-if="version >30 & version<60"
                          centerX="0"
                          top="prev() 5"
                          textColor="red"
                          font="bold 15px"
                          alignment="center"
                          text="this works">
                </TextView>
                <TextView
                        centerX="0"
                        top="prev() 5"
                        textColor="red"
                        font="bold 15px"
                        alignment="center"
                        text="get it right get it tight">
                </TextView>
            </Composite>
        </ScrollView>
        <ActivityIndicator top="prev() 20" centerX="0" width="48" height="48"></ActivityIndicator>
    </Page>

</template>

<script lang="ts">

    import {Page} from "./tabris-ui/page";
    import {Component, PageManager} from "./tabris-ui/pageManager";
    import OtherPage from "./OtherPage.vue";
    @Component()
    export default class extends Page {

        version: number = 12;

        onLoad() {
            var cl = setInterval(() => {
                this.version += (Math.random() * 20) | 0;
                if (this.version > 80) {
                    clearInterval(cl);
                    PageManager.loadPage(new OtherPage());
                }
            }, 500)
        }

        onComponentCreated() {

        }

        onNavigateTo() {

        }

        onResize() {
        }

        tapit(ind: number) {
            console.log('tapped ' + ind);
        }
    }

</script>

