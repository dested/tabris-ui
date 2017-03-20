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


        <FoodTabs :items="foodItems" @deleteFood="deleteFood($event)"></FoodTabs>

    </Page>

</template>

<script lang="ts">

    import CalendarHeader from "./CalendarHeader.vue";
    import FoodTabs from "./FoodTabs.vue";

    import {Page} from "./tabris-ui/page";
    import {Component} from "./tabris-ui/pageManager";
    import {IFood} from "./IFood";

    @Component({
        name: 'CalendarPage',
        components: [ CalendarHeader,FoodTabs]
    })
    export default class extends Page {


        totalIU: number = 5;

        date: number = 5;

        currentIU: number = 5;

        foodItems: { name: string, items: IFood[] }[] = [];

        onLoad() {
            this.foodItems.push({
                name: "BREAKFAST", items: [
                    {image: 'http://johnvenaproduce.com/OCM/imageuploads/babycorn.jpg', title: 'corn1', cals: 12, fat: 93, carbs: 900, protein: 20},
                    {image: 'http://johnvenaproduce.com/OCM/imageuploads/babycorn.jpg', title: 'corn2', cals: 12, fat: 93, carbs: 900, protein: 20},
                    {image: 'http://johnvenaproduce.com/OCM/imageuploads/babycorn.jpg', title: 'corn3', cals: 12, fat: 93, carbs: 900, protein: 20},
                    {image: 'http://johnvenaproduce.com/OCM/imageuploads/babycorn.jpg', title: 'corn4', cals: 12, fat: 93, carbs: 900, protein: 20},
                    {image: 'http://johnvenaproduce.com/OCM/imageuploads/babycorn.jpg', title: 'corn5', cals: 12, fat: 93, carbs: 900, protein: 20},
                    {image: 'http://johnvenaproduce.com/OCM/imageuploads/babycorn.jpg', title: 'corn6', cals: 12, fat: 93, carbs: 900, protein: 20},
                ]
            });

            this.foodItems.push({name: "LUNCH", items: []});
            this.foodItems.push({name: "DINNER", items: []});
            this.foodItems.push({name: "SNACKS", items: []});

            this.totalIU = 120;
            this.currentIU = 0;
        /*    var ci = setInterval(() => {
                this.currentIU++;
                if (this.currentIU == this.totalIU) {
                    clearInterval(ci)
                }
            }, 1000);*/

        }

        updateDate(newDate: number) {
            this.date = newDate;
        }

        onComponentCreated() {

        }

        deleteFood({items, food}: { items: IFood[], food: IFood }) {
            items.splice(items.indexOf(food), 1);
        }

        updateFoods() {
            this.foodItems[0].items = [];

            this.foodItems[0].items.push({image: 'http://johnvenaproduce.com/OCM/imageuploads/babycorn.jpg', title: 'corn' + ((Math.random() * 100000) | 0), cals: 12, fat: 93, carbs: 900, protein: 20});
            this.foodItems[0].items.push({image: 'http://johnvenaproduce.com/OCM/imageuploads/babycorn.jpg', title: 'corn' + ((Math.random() * 100000) | 0), cals: 12, fat: 93, carbs: 900, protein: 20});
            this.foodItems[0].items.push({image: 'http://johnvenaproduce.com/OCM/imageuploads/babycorn.jpg', title: 'corn' + ((Math.random() * 100000) | 0), cals: 12, fat: 93, carbs: 900, protein: 20});


            this.foodItems[1].items.push({image: 'http://johnvenaproduce.com/OCM/imageuploads/babycorn.jpg', title: 'corn' + ((Math.random() * 100000) | 0), cals: 12, fat: 93, carbs: 900, protein: 20});
            this.foodItems[1].items.push({image: 'http://johnvenaproduce.com/OCM/imageuploads/babycorn.jpg', title: 'corn' + ((Math.random() * 100000) | 0), cals: 12, fat: 93, carbs: 900, protein: 20});
            this.foodItems[1].items.push({image: 'http://johnvenaproduce.com/OCM/imageuploads/babycorn.jpg', title: 'corn' + ((Math.random() * 100000) | 0), cals: 12, fat: 93, carbs: 900, protein: 20});
            this.foodItems[1].items.push({image: 'http://johnvenaproduce.com/OCM/imageuploads/babycorn.jpg', title: 'corn' + ((Math.random() * 100000) | 0), cals: 12, fat: 93, carbs: 900, protein: 20});

            this.foodItems[2].items.push({image: 'http://johnvenaproduce.com/OCM/imageuploads/babycorn.jpg', title: 'corn' + ((Math.random() * 100000) | 0), cals: 12, fat: 93, carbs: 900, protein: 20});
            this.foodItems[2].items.push({image: 'http://johnvenaproduce.com/OCM/imageuploads/babycorn.jpg', title: 'corn' + ((Math.random() * 100000) | 0), cals: 12, fat: 93, carbs: 900, protein: 20});
            this.foodItems[2].items.push({image: 'http://johnvenaproduce.com/OCM/imageuploads/babycorn.jpg', title: 'corn' + ((Math.random() * 100000) | 0), cals: 12, fat: 93, carbs: 900, protein: 20});
            this.foodItems[2].items.push({image: 'http://johnvenaproduce.com/OCM/imageuploads/babycorn.jpg', title: 'corn' + ((Math.random() * 100000) | 0), cals: 12, fat: 93, carbs: 900, protein: 20});
            this.foodItems[2].items.push({image: 'http://johnvenaproduce.com/OCM/imageuploads/babycorn.jpg', title: 'corn' + ((Math.random() * 100000) | 0), cals: 12, fat: 93, carbs: 900, protein: 20});
            this.foodItems[2].items.push({image: 'http://johnvenaproduce.com/OCM/imageuploads/babycorn.jpg', title: 'corn' + ((Math.random() * 100000) | 0), cals: 12, fat: 93, carbs: 900, protein: 20});

            this.foodItems[3].items.push({image: 'http://johnvenaproduce.com/OCM/imageuploads/babycorn.jpg', title: 'corn' + ((Math.random() * 100000) | 0), cals: 12, fat: 93, carbs: 900, protein: 20});
            this.foodItems[3].items.push({image: 'http://johnvenaproduce.com/OCM/imageuploads/babycorn.jpg', title: 'corn' + ((Math.random() * 100000) | 0), cals: 12, fat: 93, carbs: 900, protein: 20});

        }

        onNavigateTo() {

        }

        onResize() {
        }

    }


</script>

