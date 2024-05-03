<template>
    <div class="autocomplete">
        <input v-model="search" @input="onChange" type="text" placeholder="Search..." />
        <ul v-show="isOpen" class="autocomplete-results">
            <div style="margin-bottom: 10px" v-for="result in peopleResults">
                <div class="searchResultDiv" @click="setResultPeople(result)">
                    <v-lazy-image class="threeDiv acPic" :src="require('../assets/imageArchive/' + result.imgLink)" />
                    <p class="threeDiv autocomplete-result">
                        {{ result.stageName }}
                        <span class="acrSmall"> {{ result.fullName }}</span>
                        <br />
                        <span class="acrSmall">{{ result.grpName }}</span>
                    </p>
                </div>
            </div>
            <div style="margin-bottom: 10px" v-for="result in groupResults">
                <div class="searchResultDiv" @click="setResultGroup(result)">
                    <v-lazy-image class="threeDiv acPic" :src="require('../assets/imageArchive/' + result.imgLink)" />
                    <p class="threeDiv autocomplete-result">
                        {{ result.groupName }}
                        <span v-if="result.members[0].grpName === result.members[0].stageName" class="acrSmall">
                            {{ result.members[0].fullName }}</span>
                        <br />
                        <span class="acrSmall">{{ result.company }}</span>
                    </p>
                </div>
            </div>
        </ul>
    </div>
</template>

<script>
import groupList from "@/jsons/groupList.json";
import VLazyImage from "v-lazy-image";

export default {
    name: "SearchAutocomplete",
    components: {
        VLazyImage,
    },
    props: {
        items: {
            type: Array,
            required: false,
            default: () => [],
        },
    },
    data() {
        return {
            groups: groupList,
            search: "",
            groupResults: [],
            peopleResults: [],
            isOpen: false,
            selectedGroupArray: JSON.parse(localStorage.getItem("selectedGroup")),
            currUser: {},
            fireSaveData: {},
        };
    },
    methods: {
        onChange() {
            this.filterResults();
            this.isOpen = true;
            if (this.search === "") {
                this.isOpen = false;
            }
        },
        filterResults() {
            let groupSearchArr = [];
            for (let i = 0; i < this.groups.length; i++) {
                let noSC = this.groups[i].groupName.replace(/[^a-zA-Z ]/g, "");
                if (
                    this.erm(this.groups[i].groupName) ||
                    this.erm(this.groups[i].groupKR) ||
                    this.erm(noSC) ||
                    (this.erm(this.groups[i].members[0].fullName) && this.groups[i].bgs === "s") ||
                    (this.erm(this.groups[i].members[0].fullKR) && this.groups[i].bgs === "s") ||
                    this.erm(this.groups[i].company)
                ) {
                    groupSearchArr.push(this.groups[i]);
                }
            }
            groupSearchArr = groupSearchArr.sort(
                (a, b) => a.groupName.length - b.groupName.length
            );

            let stageSearch = [];
            for (let i = 0; i < this.groups.length; i++) {
                for (let j = 0; j < this.groups[i].members.length; j++) {
                    let noSC = this.groups[i].members[j].stageName.replace(/[^a-zA-Z ]/g, "");
                    if (
                        (this.erm(this.groups[i].members[j].stageName) ||
                            this.erm(noSC) ||
                            this.erm(this.groups[i].members[j].stageKR)) &&
                        (this.groups[i].members[j].afr === "a" ||
                            this.groups[i].members[j].afr === "f") &&
                        this.groups[i].bgs !== "s"
                    ) {
                        stageSearch.push(this.groups[i].members[j]);
                        stageSearch = stageSearch.sort(
                            (a, b) => a.stageName.length - b.stageName.length
                        );
                    }
                }
            }
            let fullSearch = [];
            for (let i = 0; i < this.groups.length; i++) {
                for (let j = 0; j < this.groups[i].members.length; j++) {
                    let noSC = this.groups[i].members[j].stageName.replace(/[^a-zA-Z ]/g, "");
                    if (
                        (this.erm(this.groups[i].members[j].fullName) ||
                            this.erm(this.groups[i].members[j].fullKR)) &&
                        (this.groups[i].members[j].afr === "a" ||
                            this.groups[i].members[j].afr === "f") &&
                        this.groups[i].bgs !== "s" &&
                        !this.checkInArr(this.groups[i].members[j], stageSearch)
                    ) {
                        fullSearch.push(this.groups[i].members[j]);
                        fullSearch = fullSearch.sort(
                            (a, b) => a.stageName.length - b.stageName.length
                        );
                    }
                }
            }

            this.groupResults = [];
            this.peopleResults = [];
            for (let i = 0; i < stageSearch.length; i++) {
                this.peopleResults.push(stageSearch[i]);
            }
            for (let i = 0; i < fullSearch.length; i++) {
                this.peopleResults.push(fullSearch[i]);
            }
            for (let i = 0; i < groupSearchArr.length; i++) {
                this.groupResults.push(groupSearchArr[i]);
            }
        },
        erm(word) {
            return word.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
        },
        setResultGroup(result) {
            this.search = "";
            this.isOpen = false;
            if (this.selectedGroupArray === null) {
                this.selectedGroupArray = [];
            }
            this.selectedGroupArray = result;
            localStorage.setItem("selectedGroup", JSON.stringify(this.selectedGroupArray));
            if (this.$route.path === '/groupPage') {
                window.location.reload();
            } else {
                this.$router.push('/groupPage')
            }
        },
        setResultPeople(result) {
            this.search = "";
            this.isOpen = false;
            if (this.selectedGroupArray === null) {
                this.selectedGroupArray = [];
            }
            for (let i = 0; i < this.groups.length; i++) {
                for (let j = 0; j < this.groups[i].members.length; j++) {
                    if (this.groups[i].members[j] === result) {
                        this.selectedGroupArray = this.groups[i];
                        break;
                    }
                }
            }
            localStorage.setItem("selectedGroup", JSON.stringify(this.selectedGroupArray));
            if (this.$route.path === '/groupPage') {
                window.location.reload();
            } else {
                this.$router.push('/groupPage')
            }
        },
        checkInArr(search, bigArr) {
            for (let i = 0; i < bigArr.length; i++) {
                if (search === bigArr[i]) {
                    return true;
                }
            }
            return false;
        },
        removeFromHome(person) {
            for (let i = 0; i < this.fireSaveData.categories.length; i++) {
                for (let j = 0; j < this.fireSaveData.categories[i].people.length; j++) {
                    if (this.fireSaveData.categories[i].people[j].imgLink === person.imgLink) {
                        this.fireSaveData.categories[i].people = this.fireSaveData.categories[
                            i
                        ].people.filter((p) => {
                            return p.imgLink !== person.imgLink;
                        });
                        this.$db.collection("users").doc(this.currUser.uid).set(this.fireSaveData);
                        break;
                    }
                }
            }
        },
        checkPerson(input) {
            for (let i = 0; i < this.fireSaveData.categories.length; i++) {
                let array = this.fireSaveData.categories[i].people;
                for (let j = 0; j < array.length; j++) {
                    if (array[j].imgLink === input) {
                        return true;
                    }
                }
            }
            return false;
        },
        handleClickOutside(event) {
            if (!this.$el.contains(event.target)) {
                this.isOpen = false;
            }
        },
    },
};
</script>

<style scoped>
.autocomplete {
    z-index: 1;
    width: 350px;
    color: black;
}

.autocomplete-results {
    width: 350px;
    z-index: 1;
    position: absolute;
    padding: 10px;
    padding-bottom: 5px;
    margin: 10px;
    margin-top: 0px;
    box-shadow: 0px 0px 5px #00000080;
    border-radius: 5px;
    background: white;
    height: fit-content;
    min-height: 1em;
    max-height: 500px;
    overflow: auto;
    color: black;
}

.autocomplete-results:after {
    content: "";
    display: table;
    clear: both;
}

.searchResultDiv {
    cursor: pointer;
    display: flex
}

.searchResultDiv:hover {
    background-color: #b3b8e9;
    border-radius: 5px;
}

.threeDiv {
    float: left;
}

.acPic {
    /* float: left; */
    height: 67px;
    width: 83.75px;
    margin-right: 10px;
    object-fit: cover;
    border-radius: 5px;
}

.autocomplete-result {
    font-weight: bold;
    z-index: 2;
    list-style: none;
    text-align: left;
    text-decoration: none;
    padding: 0px;
    margin: auto;
    margin-left: 0px;
    cursor: pointer;
    /* border-bottom: 1px solid #00000036; */
    overflow-x: visible;
    color: black;
}

.acrSmall {
    z-index: 2;
    font-size: 70%;
    list-style: none;
    text-align: left;
    text-decoration: none;
    margin: auto;
    cursor: pointer;
    color: black;
    font-weight: lighter;
}
</style>
