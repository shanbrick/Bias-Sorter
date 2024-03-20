<template>
    <div class="topBar">
        <button class="topBarButton" @click="addNewCategory('Untitled')">&nbsp;+&nbsp; Add New Category</button>
        <button class="topBarButton" @click="toggleEditMode()" v-if="!editModeOn">&nbsp;✎&nbsp; Edit Categories</button>
        <button class="topBarButton" @click="toggleEditMode()" v-else>&nbsp;✓&nbsp; Save Categories</button>
    </div>


    <div id="unsorted" class="unsorted">
        <div class="boxHeaderUnsorted">
            <p class="categoryTitle">Unsorted</p>
        </div>
        <draggable :list="unsorted" group="people" :animation="300">
            <template #item="{ element: unsorted }">
                <div class="peopleUnsorted" :key="unsorted.stageName">
                    <img class="homePeoplePics" :src="require('../assets' + unsorted.imgLink)">
                    <p class="idolName">{{ unsorted.stageName }}</p>
                    <p class="groupName">{{ unsorted.groupName }}</p>
                </div>
            </template>
        </draggable>
    </div>

    <div class="sideCats">
        <div v-for="(cat, index) in categoryArray" class="categories">
            <div :id=index class="boxHeaderCategories">
                <div v-if="!editModeOn">
                    <p class="categoryTitle">{{ cat }}</p>
                </div>
                <div v-else>
                    <input class="boxHeaderCatsInput" type="text" v-model="inputs[index]"></input>
                </div>
            </div>
            <div v-if="!editModeOn" :id=cat>
                <draggable :list="cat1" group="people" :animations="300">
                    <template #item="{ element: cat1 }">
                        <div class="peopleUnsorted" :key="cat1.stageName">
                            <img class="homePeoplePics" :src="require('../assets' + cat1.imgLink)">
                            <p class="idolName">{{ cat1.stageName }}</p>
                            <p class="groupName">{{ cat1.groupName }}</p>
                        </div>
                    </template>
                </draggable>
            </div>
        </div>


    </div>
</template>

<script>
// localStorage.setItem('categories', JSON.stringify(["Ults", "Semis", "Regs"]));
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
        console.log(this.saveData)
        for (let i = 1; i < this.saveData.categories.length; i++) {
            this.inputs.push(this.saveData.categories[i].catName)
            console.log(this.saveData.categories[i].catName)
        }

        this.unsorted === this.saveData.categories[0].people
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
            unsorted: [],
            cat1: JSON.parse(localStorage.getItem('cat1')),
            categoryArray: JSON.parse(localStorage.getItem('categories')),
            editModeOn: false,
            inputs: []
        }
    },
    computed: {

    },
    methods: {
        addNewCategory(title) {
            this.categoryArray.push(title)
            localStorage.setItem('categories', JSON.stringify(this.categoryArray));
        },
        toggleEditMode() {
            this.editModeOn = !this.editModeOn;
        },
        log: function (evt) {
            window.console.log(evt);
        },
        checkSaveData() {

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
    z-index: 1;
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

.peopleUnsorted {
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
