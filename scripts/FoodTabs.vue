<template>
    <TabFolder textColor="white" left="0" right="0" top="prev()" bottom="0" background="#607D8B">
        <Tab v-for="children in items" :key="children.name" background="white" :title="children.name" textColor="white">
            <ScrollView left="0" right="0" top="0" bottom="0">
                <TextView id="text" left="0" right="0" top="prev()" height="30" :text="children.items.length"></TextView>
                <Composite left="0" right="0" top="prev()" height="60" background="white"
                           v-for="food in children.items" :key="food.title">
                    <Card :item="food" @delete="deleteFood(children.items,food)"></Card>
                </Composite>
            </ScrollView>
        </Tab>
    </TabFolder>
</template>

<script lang="ts">


    import {Composite} from "./tabris-ui/page";
    import {Component} from "./tabris-ui/pageManager";
    import {IFood} from "./IFood";
    import Card from "./Card.vue";

    @Component({
        name: 'FoodTabs',
        components: [Card]
    })
    export default class extends Composite {
        items: { name: string, items: IFood[] }[];

        onLoad() {
        }

        deleteFood(items: IFood[], food: IFood) {
            this.$emit('deleteFood', {items, food});
        }

        onComponentCreated() {

        }

        onNavigateTo() {

        }

        onResize() {
        }

    }
</script>

