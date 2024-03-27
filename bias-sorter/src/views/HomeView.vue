<template>
    <div class="topBar">
        <button class="topBarButton" @click="addNewCategory()">&nbsp;+&nbsp; Add New Category</button>
        <button class="topBarButton" @click="toggleEditMode()" v-if="!editModeOn">&nbsp;✎&nbsp; Edit Categories</button>
        <button class="topBarButton" @click="toggleEditMode()" v-else>&nbsp;✓&nbsp; Save Categories</button>
    </div>


    <div id="unsorted" class="unsorted">
        <div class="boxHeaderUnsorted">
            <p class="categoryTitle">Unsorted</p>
        </div>
        <draggable :list="homePageArrays[0]" group="everyone" :animation="300"
            @change="updateStorage(0, homePageArrays[0])" :options="{ disabled: !editModeOn }">
            <template #item="{ element }">
                <div class="peopleDivss" :key="element.stageName">
                    <img class="homePeoplePics" :src="require('../assets' + element.imgLink)">
                    <p class="idolName">{{ element.stageName }}</p>
                    <p class="groupName">{{ element.groupName }}</p>
                </div>
            </template>
        </draggable>
    </div>


    <div class="sideCats">
        <!-- <draggable :list="categoryArray" :animation="300">
            <template #item="{ element: catArr, index }">
                <div :id=catArr class="categories">
                    <div class="boxHeaderCategories">
                        <div v-if="!editModeOn">
                            <p class="categoryTitle">{{ saveData.categories[index + 1].catName }}</p>
                        </div>
                        <div v-else>
                            <input class="boxHeaderCatsInput" type="text"
                                v-model="saveData.categories[index + 1].catName"
                                v-on:input="updateCatName(index + 1)"></input>
                        </div>
                    </div>
                    <div v-if="!editModeOn">
                        <draggable :list="homePageArrays[index + 1]" group="everyone" :animations="300" :item-key=cat
                            @change="updateStorage(index + 1, homePageArrays[index + 1])">
                            <template #item="{ element }">
                                <div class="peopleDivss" :key="cat">
                                    <img class="homePeoplePics" :src="require('../assets' + element.imgLink)">
                                    <p class="idolName">{{ element.stageName }}</p>
                                    <p class="groupName">{{ element.groupName }}</p>
                                </div>
                            </template>
                        </draggable>
                    </div>
                </div>
            </template>
        </draggable> -->
        <div v-for="(cat, index) in saveData.categories.slice(1)" class="categories" :key="cat">
            <div :id=index class="boxHeaderCategories">
                <div v-if="!editModeOn">
                    <p class="categoryTitle">{{ cat.catName }}</p>
                </div>
                <div v-else>
                    <input class="boxHeaderCatsInput" type="text" v-model="saveData.categories[index + 1].catName"
                        v-on:input="updateCatName(index + 1)"></input>
                </div>
            </div>
            <div v-if="!editModeOn" :id=cat>
                <draggable :list="homePageArrays[index + 1]" group="everyone" :animations="300" :item-key=cat
                    @change="updateStorage(index + 1, homePageArrays[index + 1])">
                    <template #item="{ element }">
                        <div class="peopleDivss" :key="cat">
                            <img class="homePeoplePics" :src="require('../assets' + element.imgLink)">
                            <p class="idolName">{{ element.stageName }}</p>
                            <p class="groupName">{{ element.groupName }}</p>
                        </div>
                    </template>
                </draggable>
            </div>
        </div>

    </div>
</template>

<script>
import { ref } from 'vue';
import draggable from 'vuedraggable';

export default {
    name: 'HomeView',
    order: 1,
    components: {
        draggable
    },
    props: [

    ],
    mounted() {
        if (localStorage.getItem("save_data") !== null) {
            const saveDataFromStorage = JSON.parse(localStorage.getItem("save_data"))
            this.saveData = saveDataFromStorage
        } else {
            localStorage.setItem("save_data", JSON.stringify(this.saveData));
        }

        for (let i = 1; i < this.saveData.categories.length; i++) {
            this.categoryArray.push(this.saveData.categories[i].catName)
        }

        for (let i = 0; i < this.saveData.categories.length; i++) {
            this.homePageArrays.push(this.saveData.categories[i].people);
        }
    },
    data() {
        return {
            saveData: {
                "categories": [
                    {
                        "catName": "Unsorted",
                        "people": []
                    },
                    {
                        "catName": "Ults",
                        "people": []
                    },
                    {
                        "catName": "Semis",
                        "people": []
                    },
                    {
                        "catName": "Regs",
                        "people": []
                    }
                ]
            },
            unsorted: ref(""),
            ults: ref(""),
            homePageArrays: ref([]),
            categoryArray: ref([]),
            editModeOn: false,
        }
    },
    computed: {

    },
    methods: {
        addNewCategory() {
            this.saveData.categories.push({
                "catName": "Untitled",
                "people": []
            });
            localStorage.setItem('save_data', JSON.stringify(this.saveData));

            this.categoryArray = [];
            for (let i = 1; i < this.saveData.categories.length; i++) {
                this.categoryArray.push(this.saveData.categories[i].catName)
            };
            console.log(this.categoryArray);
        },
        toggleEditMode() {
            this.editModeOn = !this.editModeOn;
        },
        updateStorage(i, array) {
            this.saveData.categories[i].people = array;
            localStorage.setItem('save_data', JSON.stringify(this.saveData));
        },
        updateCatName(i) {
            this.saveData.categories[i].catName;
            localStorage.setItem('save_data', JSON.stringify(this.saveData));
        }
    }
}
</script>

<style scoped>
.topBar {
    background-image: linear-gradient(#b3b8e9, #747fe6);
    border: 1px solid #909090;
    height: 50px;
    margin: 0px;
    margin-bottom: 20px;
    padding: 9px;
    display: flex;
    gap: 10px;
}

.topBarButton {
    height: 30px;
    width: fit-content;
    border: 1px solid #00000000;
    border-radius: 5px;
    color: white;
    background: #00000000;
    text-align: center;
    text-decoration: none;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    margin: auto;
}

.topBarButton:hover {
    background-color: #505cc7;
}

.unsorted {
    height: 60%;
    width: 342px;
    position: fixed;
    z-index: 0;
    overflow-x: hidden;
    background: radial-gradient(#ffffff, #dadada);
    border-bottom: 1px solid #909090;
    border-left: 1px solid #909090;
    border-right: 1px solid #909090;
    padding: 10px;
    padding-left: 0px;
    padding-right: 0px;
    margin: 20px;
    margin-top: 45px;
    border-radius: 0px 0px 10px 10px;
}

.boxHeaderUnsorted {
    height: 45px;
    width: 342px;
    background-color: #b3b8e9;
    background-image: linear-gradient(#b3b8e9, #747fe6);
    border-top: 1px solid #909090;
    border-left: 1px solid #909090;
    border-right: 1px solid #909090;
    border-radius: 10px 10px 0px 0px;
    padding-left: 20px;
    margin-top: -55px;
    margin-left: -1px;
    margin-bottom: 15px;
    position: fixed;
}

.sideCats {
    margin-left: 375px;
}

.categories {
    margin: 20px;
    margin-top: 65px;
    position: relative;
    background: radial-gradient(#ffffff, #dadada);
    padding: 10px;
    padding-left: 0px;
    padding-right: 0px;
    border-radius: 0px 0px 10px 10px;
    border-bottom: 1px solid #909090;
    border-left: 1px solid #909090;
    border-right: 1px solid #909090;
}

.categoryTitle {
    top: -9.5px;
    position: absolute;
    color: white;
    font-size: 20px;
    font-weight: 700;
}

.categories:after {
    content: "";
    display: table;
    clear: both;
}

.boxHeaderCategories {
    height: 45px;
    background-image: linear-gradient(#b3b8e9, #747fe6);
    border-top: 1px solid #909090;
    border-left: 1px solid #909090;
    border-right: 1px solid #909090;
    border-radius: 10px 10px 0px 0px;
    padding: 20px;
    margin-top: -55px;
    /*padding categories + boxheader height*/
    margin-bottom: 10px;
    margin-left: -1px;
    /* categories padding*/
    margin-right: -1px;
    position: relative;
}

.boxHeaderCatsInput {
    height: 35px;
    font-size: 20px;
    font-weight: 700;
    background-image: linear-gradient(#747fe6, #b3b8e9);
    box-shadow: inset 0px 0px 2px rgba(0, 0, 0, 0.5);
    border: 1px solid #6e6e6e;
    color: #fff;
    border-radius: 8px;
    padding: 14px;
    margin-top: -15px;
    /*padding categories + boxheader height*/
    margin-bottom: 10px;
    margin-left: -15px;
    /* categories padding*/
    margin-right: -1px;
    position: relative;
    float: left;
}

.idolName {
    text-align: center;
    font-size: 15px;
    margin: 5px;
    font-weight: bold;
    color: black;
}

.groupName {
    text-align: center;
    margin: 5px;
    font-size: 0.75em;
}

.peopleDivss {
    float: left;
    height: fit-content;
    width: 170px;
    text-align: center;
    padding: 10px;
    padding-left: 0px;
    padding-right: 0px;
    /* border: 1px solid red; */
}

.homePeoplePics {
    width: 130px;
    border-radius: 8px;
    box-shadow: 0px 0px 5px #00000080;
    margin: 0px;
    padding: 0px;
}

.addCategoryButton {
    border: 1px solid #B0B0B0;
    border-radius: 5px;
    color: white;
    background-color: #b3b8e9;
    background-image: linear-gradient(#b3b8e9, #747fe6);
    padding: 7px 15px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
}

.editCategoryButton {
    margin-top: -8px;
    margin-right: -8px;
    border: 1px solid #6e6e6e;
    border-radius: 5px;
    color: white;
    background-image: linear-gradient(#747fe6, #b3b8e9);
    box-shadow: inset 0px 0px 3px rgba(0, 0, 0, 0.5);
    /* padding: 7px 15px; */
    text-align: center;
    text-decoration: none;
    float: right;
    /* display: inline-block; */
    font-size: 16px;
    /* margin: 4px 2px; */
    cursor: pointer;
}
</style>
