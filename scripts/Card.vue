﻿<template>
    <Composite left="0" right="0" top="0" bottom="0" >



        <Composite left="0" right="0" top="0" bottom="1" background="white">
            <Composite left="8" top="8" width="44" height="44" background="#455A64" cornerRadius="22">
            </Composite>
            <ImageView scaleMode="stretch" cornerRadius="20" left="10" top="10" width="40"
                       height="40" :image="item.image" cornerRadius="22" @tap="item.other +='f'">
            </ImageView>


            <TextView left="60" top="20" right="100" alignment="left" :text="item.title +' '+ foo"
                      textColor="black" maxLines="1" @tap="foo++;" font="13px">

            </TextView>
            <TextView left="prev()" top="20" right="40" alignment="left" :text="item.other"
                      textColor="black" maxLines="1" @tap="foo++;" font="13px">

            </TextView>
            <Composite right="5" top="5" bottom="5" width="50" highlightOnTouch="true"
                       @tap="tapDelete()">
                <TextView alignment="center" centerY="0" text="Delete" textColor="red"
                          font="13px"></TextView>
            </Composite>
        </Composite>

        <Composite left="0" right="0" height="1" bottom="0" background="#78909C">

        </Composite>


    </Composite>
</template>

<script lang="ts">


    import {Composite} from "./tabris-ui/page";
    import {Component} from "./tabris-ui/pageManager";
    import {IFood} from "./IFood";

    @Component({
        name: 'Card',
    })
    export default class extends Composite {
        item: IFood;
        foo: number = 0;

        onLoad() {
        }

        onComponentCreated() {

        }

        tapDelete() {
            this.$emit('delete');
        }

        onNavigateTo() {

        }

        onResize() {
        }

    }
</script>

