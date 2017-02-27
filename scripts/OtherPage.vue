<template>

    <Page topLevel="false" id="OtherPage" title="foo">
        <ActivityIndicator top="prev() 20" centerX="0" :width="48*2" :height="48*2"></ActivityIndicator>
        <ActivityIndicator top="prev() 20" centerX="0" :width="48*2" :height="48*2"></ActivityIndicator>
        <ActivityIndicator top="prev() 20" centerX="0" :width="48*2" :height="48*2"></ActivityIndicator>
        <Composite background="red" top="prev() 20" left="0" right="0" :height="drawHeight"></Composite>
    </Page>

</template>

<script lang="ts">

    import {Page} from "./tabris-ui/page";
    import {PageManager} from "./tabris-ui/pageManager";

    export default class extends Page {

        _height: number = 30;

        get drawHeight(): number {
            return this._height;
        };

        set drawHeight(value: number) {
            this._height = value
            PageManager.renderPage(this);
        };


        onLoad() {
            setInterval(() => {
                this.drawHeight += 1;
            }, 200)
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

