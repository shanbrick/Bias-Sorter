<template>
    <div class="topBar">
        <button class="topBarButton" @click="addNewCategory()">&nbsp;+&nbsp; Add New Category</button>
        <button class="topBarButton" @click="toggleEditModeOn()" v-if="!editModeOn">&nbsp;✎&nbsp; Edit
            Categories</button>
        <button class="topBarButton" @click="toggleEditModeOff()" v-else>&nbsp;✓&nbsp; Save Categories</button>
    </div>

    <ContextMenu :display="showContextMenu" ref="menu">
        <p @click="removeFromHome()">Remove {{ clickedPerson.stageName }}</p>
    </ContextMenu>

    <div id="unsorted" class="unsorted">
        <div class="boxHeaderUnsorted">
            <p class="categoryTitle">Unsorted</p>
        </div>
        <div class="unsortedPeople">
            <draggable :list="homePageArrays[0]" group="everyone" :animation="300"
                @change="updateStorage(0, homePageArrays[0])" :disabled="editModeOn" item-key="a">
                <template #item="{ element }">
                    <div class="peopleDivss" :key="element.stageName">
                        <img oncontextmenu="return false;" v-on:click.right="openContextMenu($event, element)"
                            class="homePeoplePics" :src="require('../assets/imageArchive/' + element.imgLink)">
                        <p class="idolName">{{ element.stageName }}</p>
                        <a href="/groupPage" @click="populateGroupPage(element.grpName)">
                            <p class="groupName">{{ element.grpName }}</p>
                        </a>
                    </div>
                </template>
            </draggable>
        </div>
    </div>


    <div class="sideCats">
        <draggable :list="testArray" :animation="300" @change="updateCatOrder(testArray)" :disabled="!editModeOn"
            item-key="b">
            <template #item="{ element: catArr, index }">
                <div :id=catArr class="categories">
                    <div class="boxHeaderCategories">
                        <div v-if="!editModeOn">
                            <p class="categoryTitle">{{ catArr.catName }}</p>
                        </div>
                        <div v-else>
                            <input class="boxHeaderCatsInput" type="text" v-model="catArr.catName"
                                v-on:input="updateCatName(index + 1)"></input>
                        </div>
                    </div>
                    <div v-if="!editModeOn">
                        <draggable :list="homePageArrays[index + 1]" group="everyone" :animations="300"
                            @change="updateStorage(index + 1, homePageArrays[index + 1])" :disabled="editModeOn"
                            item-key="c">
                            <template #item="{ element: pers }">
                                <div class="peopleDivss">
                                    <img oncontextmenu="return false;" v-on:click.right="openContextMenu($event, pers)"
                                        class="homePeoplePics" :src="require('../assets/imageArchive/' + pers.imgLink)">
                                    <p class="idolName">{{ pers.stageName }}</p>
                                    <a href="/groupPage" @click="populateGroupPage(pers.grpName)">
                                        <p class="groupName">{{ pers.grpName }}</p>
                                    </a>
                                </div>
                            </template>
                        </draggable>
                    </div>
                </div>
            </template>
        </draggable>
    </div>
</template>

<script>
import groupListEdit from "@/groupListEdit.json";
import { ref } from 'vue';
import draggable from 'vuedraggable';
import ContextMenu from '../components/ContextMenu.vue';
import { useCurrentUser, useDocument, useFirestore } from 'vuefire';
import { collection, doc } from 'firebase/firestore';

export default {
    name: 'ListView',
    order: 1,
    components: {
        draggable,
        ContextMenu,
    },
    props: [

    ],
    mounted() {
        const currentUser = useCurrentUser();
        const db = useFirestore();
        const userData = useDocument(doc(collection(db, 'users'), currentUser.value.uid))

        console.log("users", collection(db, 'users'));
        console.log("currentUser", currentUser.value.uid);
        console.log("userData", userData);
        console.log("user.value", userData.value.id);

        if (localStorage.getItem("save_data") !== null) {
            const saveDataFromStorage = JSON.parse(localStorage.getItem("save_data"))
            this.saveData = saveDataFromStorage
        } else {
            localStorage.setItem("save_data", JSON.stringify(this.saveData));
        }

        for (let i = 0; i < this.saveData.categories.length; i++) {
            this.homePageArrays.push(this.saveData.categories[i].people);
        }

        for (let i = 1; i < this.saveData.categories.length; i++) {
            this.testArray.push(this.saveData.categories[i]);
        }
    },
    data() {
        return {
            // user: useCurrentUser(),
            // userSaveData: useCollection(
            //     query(
            //         collection(db, 'users'),
            //         where("userId", "==", this.user.value.uid),
            //     ),
            // ),
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
            homePageArrays: ref([]),
            testArray: ref([]),
            editModeOn: false,
            showContextMenu: false,
            clickedPerson: {},
            groups: groupListEdit
        }
    },
    computed: {

    },
    methods: {
        addNewCategory() {
            let arr = {
                "catName": "Untitled",
                "people": []
            }
            this.saveData.categories.push(arr);
            localStorage.setItem('save_data', JSON.stringify(this.saveData));

            this.testArray.push(arr)
            this.homePageArrays.push(arr.people);

        },
        toggleEditModeOn() {
            this.editModeOn = !this.editModeOn;
        },
        toggleEditModeOff() {
            this.editModeOn = !this.editModeOn;
            window.location.reload();
        },
        updateCatOrder(arr) {
            console.log("update cat order", arr)
            for (let i = 0; i < arr.length; i++) {
                this.saveData.categories[i + 1] = arr[i];
            }
            console.log("saveData categpories", this.saveData.categories);
            localStorage.setItem('save_data', JSON.stringify(this.saveData));
        },
        updateStorage(i, array) {
            this.saveData.categories[i].people = array;
            localStorage.setItem('save_data', JSON.stringify(this.saveData));
        },
        updateCatName(i) {
            this.saveData.categories[i].catName;
            localStorage.setItem('save_data', JSON.stringify(this.saveData));
        },
        openContextMenu(e, person) {
            this.clickedPerson = person;
            this.$refs.menu.open(e);
        },
        removeFromHome(e) {
            this.$refs.menu.close(e);
            for (let i = 0; i < this.saveData.categories.length; i++) {
                for (let j = 0; j < this.saveData.categories[i].people.length; j++) {
                    if (this.saveData.categories[i].people[j].imgLink === this.clickedPerson.imgLink) {
                        this.saveData.categories[i].people = this.saveData.categories[
                            i
                        ].people.filter((p) => {
                            return p.imgLink !== this.clickedPerson.imgLink;
                        });
                        localStorage.setItem("save_data", JSON.stringify(this.saveData));
                        this.homePageArrays = [];
                        for (let i = 0; i < this.saveData.categories.length; i++) {
                            this.homePageArrays.push(this.saveData.categories[i].people);
                        }
                        break;
                    }
                }
            }
        },
        populateGroupPage(grpName) {
            let selectedGroup = [];
            for (let i = 0; i < this.groups.length; i++) {
                if (this.groups[i].groupName === grpName) {
                    selectedGroup = this.groups[i];
                    break;
                }
            }
            localStorage.setItem("selectedGroup", JSON.stringify(selectedGroup));
        }
    }
}
</script>

<style scoped>
.topBar {
    background-color: #b3b8e9;
    display: flex;
    gap: 10px;
    height: 50px;
    margin: 0px 0px 20px;
    padding: 9px;
    overflow: hidden;
}

.sticky {
    position: absolute;
    top: 0;
    width: 100%;
}

.topBarButton {
    background: #00000000;
    border: 1px solid #00000000;
    border-radius: 5px;
    color: white;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    height: 30px;
    margin: auto;
    text-align: center;
    text-decoration: none;
    width: fit-content;
}

.topBarButton:hover {
    background-color: #505cc7;
}

.unsorted {
    background: linear-gradient(180deg, rgba(179, 184, 233, 1) 0px, rgba(116, 127, 230, 1) 45px, rgba(218, 218, 218, 1) 45px, rgba(255, 255, 255, 1) 63%, rgba(218, 218, 218, 1) 100%);
    border-radius: 10px;
    box-shadow: 0px 0px 5px black;
    height: 60%;
    margin: 0px 20px 20px;
    overflow-x: hidden;
    padding: 55px 0px 10px;
    position: fixed;
    width: 342px;
    z-index: 0;
}

.unsortedPeople {
    position: fixed;
    overflow-x: hidden;
    width: 342px;
    height: 51%;
}

.boxHeaderUnsorted {
    height: 45px;
    margin-top: -54px;
    margin-left: -1px;
    margin-bottom: 15px;
    padding-left: 20px;
    position: fixed;
    width: 342px;
}

.sideCats {
    margin-left: 375px;
    min-width: 500px;
}

.categories {
    background: linear-gradient(180deg, rgba(179, 184, 233, 1) 0px, rgba(116, 127, 230, 1) 45px, rgba(218, 218, 218, 1) 45px, rgba(255, 255, 255, 1) 63%, rgba(218, 218, 218, 1) 100%);
    border-radius: 10px;
    box-shadow: 0px 0px 5px black;
    height: fit-content;
    margin: 0px 20px 30px;
    min-height: 50px;
    padding: 55px 0px 10px;
    position: relative;
}

.categoryTitle {
    color: white;
    font-size: 20px;
    font-weight: 700;
    position: absolute;
    top: -9.5px;
}

.categories:after {
    content: "";
    clear: both;
    display: table;
}

.boxHeaderCategories {
    height: 45px;
    margin: -55px -1px 10px;
    padding: 20px;
    position: relative;
}

.boxHeaderCatsInput {
    background-image: linear-gradient(#747fe6, #b3b8e9);
    border: 1px solid #6e6e6e;
    border-radius: 8px;
    box-shadow: inset 0px 0px 2px rgba(0, 0, 0, 0.5);
    color: #fff;
    height: 35px;
    float: left;
    font-size: 20px;
    font-weight: 700;
    margin: -15px -1px 10px -15px;
    padding: 14px;
    position: relative;
}

.idolName {
    color: black;
    font-size: 15px;
    font-weight: bold;
    margin: 5px;
    text-align: center;
}

.groupName {
    font-size: 0.75em;
    margin: 5px;
    text-align: center;
}

.peopleDivss {
    /* border: 1px solid red; */
    float: left;
    height: fit-content;
    padding: 5px 0px 5px;
    text-align: center;
    width: 170px;
}

.homePeoplePics {
    border-radius: 8px;
    box-shadow: 0px 0px 5px #00000080;
    margin: 0px;
    padding: 0px;
    width: 130px;
}

a {
    color: black;
    text-decoration: none;
}
</style>
