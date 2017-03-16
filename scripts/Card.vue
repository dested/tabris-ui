<template>

    <Composite left="0" right="0" top="0" bottom="1" background="white">
        <Composite left="8" top="8" width="44" height="44" background="#455A64" cornerRadius="22">
        </Composite>
        <ImageView scaleMode="stretch" cornerRadius="20" left="10" top="10" width="40"
                   height="40" :image="food.image" cornerRadius="22">
        </ImageView>


        <TextView left="60" top="20" right="40" alignment="left" :text="food.title"
                  textColor="black" maxLines="1" font="13px">

        </TextView>
        <Composite right="5" top="5" bottom="5" width="50" highlightOnTouch="true"
                   @tap="deleteFood(breakfastFoods,food)">
            <TextView alignment="center" centerY="0" text="Delete" textColor="red"
                      font="13px"></TextView>
        </Composite>
    </Composite>

    <Composite left="0" right="0" height="1" bottom="0" background="#78909C">

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
        food: IFood;

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

