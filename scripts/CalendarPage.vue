<template>

    <Page topLevel="true" id="OtherPage" title="foo">
        <Composite background="#37474F" top="0" left="0" right="0" height="40">
            <Composite background="#455A64" left="0" width="40" top="0" bottom="0" highlightOnTouch="true"
                       @tap="date>0 && date--">
                <TextView centerX="0" centerY="0" textColor="white" text="<" v-if="date>0">
                </TextView>
            </Composite>
            <Composite background="#455A64" top="0" left="41" right="41" height="40" highlightOnTouch="true">
                <TextView left="0" alignment="center" textColor="white" right="0" top="0" bottom="0" :text="date">
                </TextView>
            </Composite>
            <Composite background="#455A64" left="prev() 1" width="40" top="0" bottom="0" highlightOnTouch="true"
                       @tap="date<10 && date++">
                <TextView centerX="0" centerY="0" text=">" textColor="white" v-if="date<10">
                </TextView>
            </Composite>
        </Composite>

        <Composite left="0" right="0" top="prev() 1" height="150" background="#546E7A">
            <Composite centerX="0" top="20" height="100" width="100" background="red">
            </Composite>
            <Composite centerX="0" :top="20+100-((currentIU/totalIU)*100)" :height="((currentIU/totalIU)*100)" width="100" background="blue">
            </Composite>
            <TextView top="prev() 5" left="0" right="0" alignment="center" textColor="white"
                      :text="currentIU+'IU out of '+totalIU+' IU'">
            </TextView>
            <Composite right="5" bottom="5" height="20" width="90" background="#263238" >
                <TextView @tap="updateFoods()" text="Foods high in Vitamin A" font="12px" alignment="center" left="0" right="0" textColor="white" ></TextView>
            </Composite>
        </Composite>


        <TabFolder textColor="white" left="0" right="0" top="prev()" bottom="0" background="#607D8B">
            <Tab background="white" title="BREAKFAST" textColor="white">
                <ScrollView left="0" right="0" top="0" bottom="0">

                    <Composite left="0" right="0" top="prev()" height="60" background="white"
                               v-for="food in breakfastFoods" :key="food.title">
                        <Composite left="0" right="0" top="0" bottom="1" background="white">
                            <Composite left="8" top="8" width="44" height="44" background="#455A64" cornerRadius="22">
                            </Composite>
                            <ImageView scaleMode="stretch" cornerRadius="20" left="10" top="10" width="40"
                                       height="40" :image="food.image" cornerRadius="22">
                            </ImageView>


                            <TextView left="60" top="20" right="40" alignment="left" :text="food.title"
                                      textColor="black" maxLines="1" font="13px">

                            </TextView>
                            <Composite right="5" top="5" bottom="5" width="50" highlightOnTouch="true" @tap="deleteFood(breakfastFoods,food)">
                                <TextView alignment="center" centerY="0" text="Delete" textColor="red" font="13px"></TextView>
                            </Composite>
                        </Composite>

                        <Composite left="0" right="0" height="1" bottom="0" background="#78909C">

                        </Composite>
                    </Composite>

                </ScrollView>

            </Tab>
            <Tab title="LUNCH" textColor="white">
                <ScrollView left="0" right="0" top="0" bottom="0" background="white">

                    <Composite left="0" right="0" top="prev()" height="60" background="white"
                               v-for="food in lunchFoods" :key="food.title">
                        <Composite left="0" right="0" top="0" bottom="1" background="white">
                            <Composite left="8" top="8" width="44" height="44" background="#455A64" cornerRadius="22">
                            </Composite>
                            <ImageView scaleMode="stretch" cornerRadius="20" left="10" top="10" width="40"
                                       height="40" :image="food.image" cornerRadius="22">
                            </ImageView>


                            <TextView left="60" top="20" right="40" alignment="left" :text="food.title"
                                      textColor="black" maxLines="1" font="13px">

                            </TextView>
                            <Composite right="5" top="5" bottom="5" width="50" highlightOnTouch="true" @tap="deleteFood(lunchFoods,food)">
                                <TextView alignment="center" centerY="0" text="Delete" textColor="red" font="13px"></TextView>
                            </Composite>
                        </Composite>

                        <Composite left="0" right="0" height="1" bottom="0" background="#78909C">

                        </Composite>
                    </Composite>

                </ScrollView>
            </Tab>
            <Tab title="DINNER" textColor="white">
                <ScrollView left="0" right="0" top="0" bottom="0" background="white">

                    <Composite left="0" right="0" top="prev()" height="60" background="white"
                               v-for="food in dinnerFoods" :key="food.title">
                        <Composite left="0" right="0" top="0" bottom="1" background="white">
                            <Composite left="8" top="8" width="44" height="44" background="#455A64" cornerRadius="22">
                            </Composite>
                            <ImageView scaleMode="stretch" cornerRadius="20" left="10" top="10" width="40"
                                       height="40" :image="food.image" cornerRadius="22">
                            </ImageView>


                            <TextView left="60" top="20" right="40" alignment="left" :text="food.title"
                                      textColor="black" maxLines="1" font="13px">

                            </TextView>
                            <Composite right="5" top="5" bottom="5" width="50" highlightOnTouch="true" @tap="deleteFood(dinnerFoods,food)">
                                <TextView alignment="center" centerY="0" text="Delete" textColor="red" font="13px"></TextView>
                            </Composite>
                        </Composite>

                        <Composite left="0" right="0" height="1" bottom="0" background="#78909C">

                        </Composite>
                    </Composite>

                </ScrollView>
            </Tab>
            <Tab title="SNACK" textColor="white">
                <ScrollView left="0" right="0" top="0" bottom="0" background="white">

                    <Composite left="0" right="0" top="prev()" height="60" background="white"
                               v-for="food in snackFoods" :key="food.title">
                        <Composite left="0" right="0" top="0" bottom="1" background="white">
                            <Composite left="8" top="8" width="44" height="44" background="#455A64" cornerRadius="22">
                            </Composite>
                            <ImageView scaleMode="stretch" cornerRadius="20" left="10" top="10" width="40"
                                       height="40" :image="food.image" cornerRadius="22">
                            </ImageView>


                            <TextView left="60" top="20" right="40" alignment="left" :text="food.title"
                                      textColor="black" maxLines="1" font="13px">

                            </TextView>
                            <Composite right="5" top="5" bottom="5" width="50" highlightOnTouch="true" @tap="deleteFood(snackFoods,food)">
                                <TextView alignment="center" centerY="0" text="Delete" textColor="red" font="13px"></TextView>
                            </Composite>
                        </Composite>

                        <Composite left="0" right="0" height="1" bottom="0" background="#78909C">

                        </Composite>
                    </Composite>

                </ScrollView>
            </Tab>
        </TabFolder>

    </Page>

</template>

<script lang="ts">

    import {Page} from "./tabris-ui/page";
    import {PageManager} from "./tabris-ui/pageManager";

    export default class extends Page {

        _totalIU: number = 5;
        get totalIU(): number {
            return this._totalIU;
        };
        set totalIU(value: number) {
            this._totalIU = value;
            PageManager.renderPage(this);
        };

        _date: number = 5;
        get date(): number {
            return this._date;
        };
        set date(value: number) {
            this._date = value;
            PageManager.renderPage(this);
        };

        _currentIU: number = 5;
        get currentIU(): number {
            return this._currentIU;
        };
        set currentIU(value: number) {
            this._currentIU = value;
            PageManager.renderPage(this);
        };


        breakfastFoods: IFood[] = [];
        lunchFoods: IFood[] = [];
        dinnerFoods: IFood[] = [];
        snackFoods: IFood[] = [];



        onLoad() {
            this.breakfastFoods.push({image:'http://johnvenaproduce.com/OCM/imageuploads/babycorn.jpg',title:'corn1',cals:12,fat:93,carbs:900,protein:20})
            this.breakfastFoods.push({image:'http://johnvenaproduce.com/OCM/imageuploads/babycorn.jpg',title:'corn2',cals:12,fat:93,carbs:900,protein:20})
            this.breakfastFoods.push({image:'http://johnvenaproduce.com/OCM/imageuploads/babycorn.jpg',title:'corn3',cals:12,fat:93,carbs:900,protein:20})
            this.breakfastFoods.push({image:'http://johnvenaproduce.com/OCM/imageuploads/babycorn.jpg',title:'corn4',cals:12,fat:93,carbs:900,protein:20})
            this.breakfastFoods.push({image:'http://johnvenaproduce.com/OCM/imageuploads/babycorn.jpg',title:'corn5',cals:12,fat:93,carbs:900,protein:20})
            this.breakfastFoods.push({image:'http://johnvenaproduce.com/OCM/imageuploads/babycorn.jpg',title:'corn6',cals:12,fat:93,carbs:900,protein:20})
            this.breakfastFoods.push({image:'http://johnvenaproduce.com/OCM/imageuploads/babycorn.jpg',title:'corn7',cals:12,fat:93,carbs:900,protein:20})
            this.breakfastFoods.push({image:'http://johnvenaproduce.com/OCM/imageuploads/babycorn.jpg',title:'corn8',cals:12,fat:93,carbs:900,protein:20})
            this.breakfastFoods.push({image:'http://johnvenaproduce.com/OCM/imageuploads/babycorn.jpg',title:'corn9',cals:12,fat:93,carbs:900,protein:20})
            this.breakfastFoods.push({image:'http://johnvenaproduce.com/OCM/imageuploads/babycorn.jpg',title:'corn10',cals:12,fat:93,carbs:900,protein:20})
            this.breakfastFoods.push({image:'http://johnvenaproduce.com/OCM/imageuploads/babycorn.jpg',title:'corn11',cals:12,fat:93,carbs:900,protein:20})


            this.totalIU=120;
            this.currentIU=0;
/*
            var ci=setInterval(()=>{
                this.currentIU++;
                if(this.currentIU==this.totalIU){
                    clearInterval(ci)
                }
            },200);
*/
//            PageManager.renderPage(this);

        }

        onComponentCreated() {

        }
        deleteFood(foods:IFood[],food:IFood) {
            foods.splice(foods.indexOf(food),1);
            PageManager.renderPage(this);
        }

        updateFoods() {


            this.breakfastFoods=[];

            this.breakfastFoods.push({image:'http://johnvenaproduce.com/OCM/imageuploads/babycorn.jpg',title:'corn12',cals:12,fat:93,carbs:900,protein:20})
            this.breakfastFoods.push({image:'http://johnvenaproduce.com/OCM/imageuploads/babycorn.jpg',title:'corn13',cals:12,fat:93,carbs:900,protein:20})
            this.breakfastFoods.push({image:'http://johnvenaproduce.com/OCM/imageuploads/babycorn.jpg',title:'corn14',cals:12,fat:93,carbs:900,protein:20})


            this.lunchFoods.push({image:'http://johnvenaproduce.com/OCM/imageuploads/babycorn.jpg',title:'corn1',cals:12,fat:93,carbs:900,protein:20})
            this.lunchFoods.push({image:'http://johnvenaproduce.com/OCM/imageuploads/babycorn.jpg',title:'corn2',cals:12,fat:93,carbs:900,protein:20})
            this.lunchFoods.push({image:'http://johnvenaproduce.com/OCM/imageuploads/babycorn.jpg',title:'corn3',cals:12,fat:93,carbs:900,protein:20})

            this.dinnerFoods.push({image:'http://johnvenaproduce.com/OCM/imageuploads/babycorn.jpg',title:'corn1',cals:12,fat:93,carbs:900,protein:20})
            this.dinnerFoods.push({image:'http://johnvenaproduce.com/OCM/imageuploads/babycorn.jpg',title:'corn2',cals:12,fat:93,carbs:900,protein:20})
            this.dinnerFoods.push({image:'http://johnvenaproduce.com/OCM/imageuploads/babycorn.jpg',title:'corn3',cals:12,fat:93,carbs:900,protein:20})
            this.dinnerFoods.push({image:'http://johnvenaproduce.com/OCM/imageuploads/babycorn.jpg',title:'corn1',cals:12,fat:93,carbs:900,protein:20})
            this.dinnerFoods.push({image:'http://johnvenaproduce.com/OCM/imageuploads/babycorn.jpg',title:'corn2',cals:12,fat:93,carbs:900,protein:20})
            this.dinnerFoods.push({image:'http://johnvenaproduce.com/OCM/imageuploads/babycorn.jpg',title:'corn3',cals:12,fat:93,carbs:900,protein:20})


            this.snackFoods.push({image:'http://johnvenaproduce.com/OCM/imageuploads/babycorn.jpg',title:'corn1',cals:12,fat:93,carbs:900,protein:20})
            this.snackFoods.push({image:'http://johnvenaproduce.com/OCM/imageuploads/babycorn.jpg',title:'corn2',cals:12,fat:93,carbs:900,protein:20})

            PageManager.renderPage(this);
        }

        onNavigateTo() {

        }

        onResize() {
        }

    }

    export interface IFood {image:string;title:string;cals:number;fat:number;carbs:number;protein:number;}[]
</script>

