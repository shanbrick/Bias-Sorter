<template>
    <div class="topBar">
        <button class="topBarButton" @click="openFileUploader()">&nbsp;<span
                style="font-size: 130%">↥</span>&nbsp;Upload/Save List</button>
        <button class="topBarButton" @click="addNewCategory()">&nbsp;+&nbsp; Add New Category</button>
        <button class="topBarButton" @click="toggleEditModeOn()" v-if="!editModeOn">&nbsp;✎&nbsp; Edit
            Categories</button>
        <button class="topBarButton" @click="toggleEditModeOff()" v-else>&nbsp;✓&nbsp; Save Categories</button>
    </div>

    <ContextMenu :display="showContextMenu" ref="menu">
        <p class="contextButton" @click="removeFromHome()">Remove {{ clickedPerson.stageName }}</p>
    </ContextMenu>

    <ContextMenu :display="showContextMenuCat" ref="menuCat">
        <p class="contextButton" @click="removeFromHomeCat($event, true)">Remove category and move people to
            Unsorted</p>
        <br>
        <p class="contextButton" @click="removeFromHomeCat($event, false)">Remove category and people</p>
    </ContextMenu>

    <div class="upload" v-show="showFileUploader" @blur="close">
        <button class="closeUpload" @click="closeUploader()">╳</button>
        <button class="uploadButton" style="margin-bottom: 20px" @click="saveJSON()">Save List</button>
        <input class="uploadButton" type="file" id="selectFiles" @click="uploadFile" />
        <button class="uploadButton" id="import">Upload List</button>
    </div>

    <div id="unsorted" class="unsorted">
        <div class="boxHeaderUnsorted">
            <p class="categoryTitle">Unsorted</p>
        </div>
        <div class="unsortedPeople">
            <draggable :list="homePageArrays[0]" group="everyone" :animation="300"
                @change="updateStorage(0, homePageArrays[0])" :disabled="editModeOn" item-key="a">
                <template #item="{ element }">
                    <div class="peopleDivss" :key="element.stageName">
                        <v-lazy-image oncontextmenu="return false;" v-on:click.right="openContextMenu($event, element)"
                            class="homePeoplePics" :src="require('../assets/imageArchive/' + element.imgLink)" />
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
                    <div class="boxHeaderCategories" v-on:click.right="openContextMenuCat($event, catArr, index)"
                        oncontextmenu="return false;">
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
                                    <v-lazy-image oncontextmenu="return false;"
                                        v-on:click.right="openContextMenu($event, pers)" class="homePeoplePics"
                                        :src="require('../assets/imageArchive/' + pers.imgLink)" />
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
import VLazyImage from "v-lazy-image";
import {
    getAuth,
    onAuthStateChanged,
} from "firebase/auth";

export default {
    name: 'ListView',
    order: 1,
    components: {
        draggable,
        ContextMenu,
        VLazyImage
    },
    props: [

    ],
    data() {
        return {
            homePageArrays: ref([]),
            testArray: ref([]),
            editModeOn: false,
            showContextMenu: false,
            showContextMenuCat: false,
            showFileUploader: false,
            clickedPerson: {},
            clickedCat: {},
            clickedIndex: 0,
            groups: groupListEdit,
            currUser: {},
            fireSaveData: {},
        }
    },
    mounted() {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.initialize();
            }
        });
    },
    methods: {
        async initialize() {
            const auth = getAuth();
            const currentUser = auth.currentUser;
            this.currUser = currentUser;
            const userDoc = await this.$db.collection("users").doc(currentUser.uid).get();
            if (userDoc.exists) {
                const saveData = userDoc.data();
                this.fireSaveData = saveData;

                for (let i = 0; i < this.fireSaveData.categories.length; i++) {
                    this.homePageArrays.push(this.fireSaveData.categories[i].people);
                }

                for (let i = 1; i < this.fireSaveData.categories.length; i++) {
                    this.testArray.push(this.fireSaveData.categories[i]);
                }
            } else {
                const saveData = await this.$db.collection("users").doc(currentUser.uid).set(
                    {
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
                    }
                );
            }
        },
        addNewCategory() {
            let arr = {
                "catName": "Untitled",
                "people": []
            }
            this.fireSaveData.categories.push(arr);
            this.$db.collection("users").doc(this.currUser.uid).set(this.fireSaveData);

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
                this.fireSaveData.categories[i + 1] = arr[i];
            }
            this.$db.collection("users").doc(this.currUser.uid).set(this.fireSaveData);
        },
        updateStorage(i, array) {
            this.fireSaveData.categories[i].people = array;
            this.$db.collection("users").doc(this.currUser.uid).set(this.fireSaveData);
        },
        updateCatName(i) {
            this.fireSaveData.categories[i].catName;
            this.$db.collection("users").doc(this.currUser.uid).set(this.fireSaveData);
        },
        openContextMenu(e, person) {
            this.clickedPerson = person;
            this.$refs.menu.open(e);
        },
        openContextMenuCat(e, category, index) {
            this.clickedCat = category;
            this.clickedIndex = index;
            this.$refs.menuCat.open(e);
        },
        openFileUploader() {
            this.showFileUploader = true;
        },
        removeFromHome(e) {
            this.$refs.menu.close(e);
            for (let i = 0; i < this.fireSaveData.categories.length; i++) {
                for (let j = 0; j < this.fireSaveData.categories[i].people.length; j++) {
                    if (this.fireSaveData.categories[i].people[j].imgLink === this.clickedPerson.imgLink) {
                        this.fireSaveData.categories[i].people = this.fireSaveData.categories[i]
                            .people.filter((p) => {
                                return p.imgLink !== this.clickedPerson.imgLink;
                            });

                        this.$db.collection("users").doc(this.currUser.uid).set(this.fireSaveData);

                        this.homePageArrays = [];
                        for (let i = 0; i < this.fireSaveData.categories.length; i++) {
                            this.homePageArrays.push(this.fireSaveData.categories[i].people);
                        }
                        break;
                    }
                }
            }
        },
        removeFromHomeCat(e, moveToUnsorted) {
            this.$refs.menuCat.close(e);
            console.log(this.clickedCat);
            for (let i = 0; i < this.fireSaveData.categories.length; i++) {
                if (this.fireSaveData.categories[i].catName === this.clickedCat.catName) {
                    if (moveToUnsorted) {
                        for (let j = 0; j < this.clickedCat.people.length; j++) {
                            this.fireSaveData.categories[0].people.push(this.clickedCat.people[j]);
                        }
                    }
                    this.fireSaveData.categories = this.fireSaveData.categories.filter((cat) => {
                        return cat.catName !== this.clickedCat.catName;
                    });

                    this.$db.collection("users").doc(this.currUser.uid).set(this.fireSaveData);

                    this.homePageArrays = [];
                    for (let i = 0; i < this.fireSaveData.categories.length; i++) {
                        this.homePageArrays.push(this.fireSaveData.categories[i].people);
                    }

                    this.testArray = [];
                    for (let i = 1; i < this.fireSaveData.categories.length; i++) {
                        this.testArray.push(this.fireSaveData.categories[i]);
                    }

                    break;
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
        },
        saveJSON() {
            var a = document.createElement("a");
            var file = new Blob([this.fireSaveData], { type: 'application/json' });
            a.href = URL.createObjectURL(file);
            a.download = 'exportSaveData.json';
            a.click();
            this.showFileUploader = false;
        },
        uploadFile() {
            document.getElementById("import").onclick = () => {
                const files = document.getElementById("selectFiles").files;
                if (files.length <= 0) {
                    return false;
                }

                const fr = new FileReader();

                fr.onload = (e) => {
                    const result = JSON.parse(e.target.result);
                    this.fireSaveData = result;

                    this.$db.collection("users").doc(this.currUser.uid).set(this.fireSaveData);

                    this.homePageArrays = [];
                    for (let i = 0; i < this.fireSaveData.categories.length; i++) {
                        this.homePageArrays.push(this.fireSaveData.categories[i].people);
                    }
                    this.testArray = [];
                    for (let i = 1; i < this.fireSaveData.categories.length; i++) {
                        this.testArray.push(this.fireSaveData.categories[i]);
                    }
                };
                fr.readAsText(files.item(0));
                this.showFileUploader = false;
            };
        },
        closeUploader() {
            this.showFileUploader = false;
        }
    }
}
</script>

<style scoped>
.topBar {
    background-color: #b3b8e9;
    box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.5);
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

.upload {
    background: white;
    border-radius: 5px;
    box-shadow: 0px 0px 5px black;
    font-size: 13px;
    height: fit-content;
    margin: auto;
    padding: 5px 10px;
    line-height: 1px;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 300px;
    z-index: 999;
}

.uploadButton {
    background-color: #b3b8e9;
    border: 1px solid #848484;
    border-radius: 5px;
    color: rgb(0, 0, 0);
    cursor: pointer;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    padding: 7px 15px;
    text-align: center;
    text-decoration: none;
    width: 100%;
}

.uploadButton:hover {
    background-color: #505cc7;
}

.closeUpload {
    background-color: #b3b8e9;
    border: 1px solid #848484;
    border-radius: 5px;
    color: rgb(0, 0, 0);
    cursor: pointer;
    display: block;
    float: right;
    font-size: 16px;
    margin-bottom: 20px;
    text-align: center;
    text-decoration: none;
}

.closeUpload:hover {
    background-color: #505cc7;
}

.contextButton {
    background-color: #ffffff00;
    border: 1px solid #ffffff00;
    border-radius: 5px;
    color: rgb(0, 0, 0);
    cursor: pointer;
    display: inline-block;
    font-size: 14px;
    margin: 0px;
    padding: 15px 10px;
    text-align: center;
    text-decoration: none;
    width: 100%;
}

.contextButton:hover {
    background-color: #b3b8e9;
}
</style>
