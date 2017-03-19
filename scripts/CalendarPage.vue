<template>

    <Page topLevel="true" id="OtherPage" title="foo">
        <CalendarHeader :date="this.date" @dateUpdated="updateDate($event)"></CalendarHeader>


        <Composite left="0" right="0" top="prev() 1" height="150" background="#546E7A">
            <Composite centerX="0" top="20" height="100" width="100" background="red">
            </Composite>
            <Composite centerX="0" :top="20+100-((currentIU/totalIU)*100)" :height="((currentIU/totalIU)*100)"
                       width="100" background="blue">
            </Composite>
            <TextView top="prev() 5" left="0" right="0" alignment="center" textColor="white"
                      :text="date+' '+currentIU+'IU out of '+totalIU+' IU'">
            </TextView>
            <Composite right="5" bottom="5" height="20" width="90" background="#263238">
                <TextView @tap="updateFoods()" text="Foods high in Vitamin A" font="12px" alignment="center" left="0"
                          right="0" textColor="white"></TextView>
            </Composite>
        </Composite>


        <TabFolder textColor="white" left="0" right="0" top="prev()" bottom="0" background="#607D8B">
            <Tab background="white" title="BREAKFAST" textColor="white">
                <ScrollView left="0" right="0" top="0" bottom="0">
                    <Composite left="0" right="0" top="prev()" height="60" background="white"
                               v-for="food in breakfastFoods" :key="food.title">
                        <Card :item="food" @delete="deleteFood(breakfastFoods,food)"></Card>
                    </Composite>
                </ScrollView>
            </Tab>
            <Tab title="LUNCH" textColor="white">
                <ScrollView left="0" right="0" top="0" bottom="0" background="white">

                    <Composite left="0" right="0" top="prev()" height="60" background="white"
                               v-for="food in lunchFoods" :key="food.title">
                        <Card :item="food" @delete="deleteFood(lunchFoods,food)"></Card>
                    </Composite>

                </ScrollView>
            </Tab>
            <Tab title="DINNER" textColor="white">
                <ScrollView left="0" right="0" top="0" bottom="0" background="white">

                    <Composite left="0" right="0" top="prev()" height="60" background="white"
                               v-for="food in dinnerFoods" :key="food.title">
                        <Card :item="food" @delete="deleteFood(dinnerFoods,food)"></Card>
                    </Composite>

                </ScrollView>
            </Tab>
            <Tab title="SNACK" textColor="white">
                <ScrollView left="0" right="0" top="0" bottom="0" background="white">

                    <Composite left="0" right="0" top="prev()" height="60" background="white"
                               v-for="food in snackFoods" :key="food.title">
                        <Card :item="food" @delete="deleteFood(snackFoods,food)"></Card>
                    </Composite>

                </ScrollView>
            </Tab>
        </TabFolder>

    </Page>

</template>

<script lang="ts">

    import Card from "./Card.vue";
    import CalendarHeader from "./CalendarHeader.vue";

    import {Page} from "./tabris-ui/page";
    import {Component} from "./tabris-ui/pageManager";
    import {IFood} from "./IFood";

    @Component({
        name: 'CalendarPage',
        components: [Card, CalendarHeader]
    })
    export default class extends Page {


        totalIU: number = 5;

        date: number = 5;

        currentIU: number = 5;

        breakfastFoods: IFood[] = [];
        lunchFoods: IFood[] = [];
        dinnerFoods: IFood[] = [];
        snackFoods: IFood[] = [];

        onLoad() {
            this.breakfastFoods.push({
                image: 'http://johnvenaproduce.com/OCM/imageuploads/babycorn.jpg',
                title: 'corn1',
                cals: 12,
                fat: 93,
                carbs: 900,
                protein: 20
            })
            this.breakfastFoods.push({
                image: 'http://johnvenaproduce.com/OCM/imageuploads/babycorn.jpg',
                title: 'corn2',
                cals: 12,
                fat: 93,
                carbs: 900,
                protein: 20
            })
            this.breakfastFoods.push({
                image: 'http://johnvenaproduce.com/OCM/imageuploads/babycorn.jpg',
                title: 'corn3',
                cals: 12,
                fat: 93,
                carbs: 900,
                protein: 20
            })
            this.breakfastFoods.push({
                image: 'http://johnvenaproduce.com/OCM/imageuploads/babycorn.jpg',
                title: 'corn4',
                cals: 12,
                fat: 93,
                carbs: 900,
                protein: 20
            })
            this.breakfastFoods.push({
                image: 'http://johnvenaproduce.com/OCM/imageuploads/babycorn.jpg',
                title: 'corn5',
                cals: 12,
                fat: 93,
                carbs: 900,
                protein: 20
            })
            this.breakfastFoods.push({
                image: 'http://johnvenaproduce.com/OCM/imageuploads/babycorn.jpg',
                title: 'corn6',
                cals: 12,
                fat: 93,
                carbs: 900,
                protein: 20
            })
            this.breakfastFoods.push({
                image: 'http://johnvenaproduce.com/OCM/imageuploads/babycorn.jpg',
                title: 'corn7',
                cals: 12,
                fat: 93,
                carbs: 900,
                protein: 20
            })
            this.breakfastFoods.push({
                image: 'http://johnvenaproduce.com/OCM/imageuploads/babycorn.jpg',
                title: 'corn8',
                cals: 12,
                fat: 93,
                carbs: 900,
                protein: 20
            })
            this.breakfastFoods.push({
                image: 'http://johnvenaproduce.com/OCM/imageuploads/babycorn.jpg',
                title: 'corn9',
                cals: 12,
                fat: 93,
                carbs: 900,
                protein: 20
            })


            this.totalIU = 120;
            this.currentIU = 0;
            var ci = setInterval(() => {
                this.currentIU++;
                if (this.currentIU == this.totalIU) {
                    clearInterval(ci)
                }
            }, 1000);

        }

        updateDate(newDate: number) {
            this.date = newDate;
        }

        onComponentCreated() {

        }

        deleteFood(foods: IFood[], food: IFood) {
            foods.splice(foods.indexOf(food), 1);
        }

        updateFoods() {


            this.breakfastFoods = [];

            this.breakfastFoods.push({
                image: 'http://johnvenaproduce.com/OCM/imageuploads/babycorn.jpg',
                title: 'corn' + ((Math.random() * 100000) | 0),
                cals: 12,
                fat: 93,
                carbs: 900,
                protein: 20
            })
            this.breakfastFoods.push({
                image: 'http://johnvenaproduce.com/OCM/imageuploads/babycorn.jpg',
                title: 'corn' + ((Math.random() * 100000) | 0),
                cals: 12,
                fat: 93,
                carbs: 900,
                protein: 20
            })
            this.breakfastFoods.push({
                image: 'http://johnvenaproduce.com/OCM/imageuploads/babycorn.jpg',
                title: 'corn' + ((Math.random() * 100000) | 0),
                cals: 12,
                fat: 93,
                carbs: 900,
                protein: 20
            })


            this.lunchFoods.push({
                image: 'http://johnvenaproduce.com/OCM/imageuploads/babycorn.jpg',
                title: 'corn' + ((Math.random() * 100000) | 0),
                cals: 12,
                fat: 93,
                carbs: 900,
                protein: 20
            })
            this.lunchFoods.push({
                image: 'http://johnvenaproduce.com/OCM/imageuploads/babycorn.jpg',
                title: 'corn' + ((Math.random() * 100000) | 0),
                cals: 12,
                fat: 93,
                carbs: 900,
                protein: 20
            })
            this.lunchFoods.push({
                image: 'http://johnvenaproduce.com/OCM/imageuploads/babycorn.jpg',
                title: 'corn' + ((Math.random() * 100000) | 0),
                cals: 12,
                fat: 93,
                carbs: 900,
                protein: 20
            })

            this.dinnerFoods.push({
                image: 'http://johnvenaproduce.com/OCM/imageuploads/babycorn.jpg',
                title: 'corn' + ((Math.random() * 100000) | 0),
                cals: 12,
                fat: 93,
                carbs: 900,
                protein: 20
            })
            this.dinnerFoods.push({
                image: 'http://johnvenaproduce.com/OCM/imageuploads/babycorn.jpg',
                title: 'corn' + ((Math.random() * 100000) | 0),
                cals: 12,
                fat: 93,
                carbs: 900,
                protein: 20
            })
            this.dinnerFoods.push({
                image: 'http://johnvenaproduce.com/OCM/imageuploads/babycorn.jpg',
                title: 'corn' + ((Math.random() * 100000) | 0),
                cals: 12,
                fat: 93,
                carbs: 900,
                protein: 20
            })
            this.dinnerFoods.push({
                image: 'http://johnvenaproduce.com/OCM/imageuploads/babycorn.jpg',
                title: 'corn' + ((Math.random() * 100000) | 0),
                cals: 12,
                fat: 93,
                carbs: 900,
                protein: 20
            })
            this.dinnerFoods.push({
                image: 'http://johnvenaproduce.com/OCM/imageuploads/babycorn.jpg',
                title: 'corn' + ((Math.random() * 100000) | 0),
                cals: 12,
                fat: 93,
                carbs: 900,
                protein: 20
            })
            this.dinnerFoods.push({
                image: 'http://johnvenaproduce.com/OCM/imageuploads/babycorn.jpg',
                title: 'corn' + ((Math.random() * 100000) | 0),
                cals: 12,
                fat: 93,
                carbs: 900,
                protein: 20
            })


            this.snackFoods.push({
                image: 'http://johnvenaproduce.com/OCM/imageuploads/babycorn.jpg',
                title: 'corn' + ((Math.random() * 100000) | 0),
                cals: 12,
                fat: 93,
                carbs: 900,
                protein: 20
            })
            this.snackFoods.push({
                image: 'http://johnvenaproduce.com/OCM/imageuploads/babycorn.jpg',
                title: 'corn' + ((Math.random() * 100000) | 0),
                cals: 12,
                fat: 93,
                carbs: 900,
                protein: 20
            })

        }

        onNavigateTo() {

        }

        onResize() {
        }

    }


</script>

