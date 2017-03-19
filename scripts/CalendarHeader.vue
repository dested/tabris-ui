<template>
    <Composite background="#37474F" top="0" left="0" right="0" height="40">
        <Composite background="#455A64" left="0" width="40" top="0" bottom="0" highlightOnTouch="true"
                   @tap="reduceDate()">
            <TextView centerX="0" centerY="0" textColor="white" text="<" v-if="date>0">
            </TextView>
        </Composite>
        <Composite background="#455A64" top="0" left="41" right="41" height="40" highlightOnTouch="true">
            <TextView left="0" alignment="center" textColor="white" right="0" top="0" bottom="0" :text="date">
            </TextView>
        </Composite>
        <Composite background="#455A64" left="prev() 1" width="40" top="0" bottom="0" highlightOnTouch="true"
                   @tap="increaseDate()">
            <TextView centerX="0" centerY="0" text=">" textColor="white" v-if="date<10">
            </TextView>
        </Composite>
    </Composite>
</template>

<script lang="ts">


    import {Composite} from "./tabris-ui/page";
    import {Component} from "./tabris-ui/pageManager";
    import {IFood} from "./IFood";

    @Component({
        name: 'CalendarHeader',
    })
    export default class extends Composite {
        date: number;
        reduceDate(){
            this.date>0 && this.date--;
            this.$emit('dateUpdated',this.date);
        }
        increaseDate(){
            this.date<10 && this.date++;
            this.$emit('dateUpdated',this.date);
        }
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

