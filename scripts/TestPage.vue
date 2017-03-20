<template>

    <Page topLevel="true" id="OtherPage" title="foPppo">


        <ScrollView left="50" right="50" top="50" bottom="100" background="red">
            <Composite left="0" right="0" top="prev()" height="60" background="white"
                       v-for="item in items" :key="item">
                <TextView :text="item"></TextView>
            </Composite>
            <TextView text="flare" left="0" right="0" top="prev()" height="60" background="purple"></TextView>
        </ScrollView>


    </Page>

</template>

<script lang="ts">

    import {Page} from "./tabris-ui/page";
    import {Component} from "./tabris-ui/pageManager";

    @Component({
        name: 'TestPage',
    })
    export default class extends Page {


        items: number[] = [1, 2, 3, 4, 5];

        onLoad() {

            setInterval(() => {
                this.items.push(this.items.length + 4);
            }, 2000);

        }

        onComponentCreated() {

        }


        onNavigateTo() {

        }

        onResize() {
        }

    }


</script>

