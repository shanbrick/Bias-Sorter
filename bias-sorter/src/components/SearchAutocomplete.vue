<template>
    <div class="autocomplete">
        <input v-model="search" @input="onChange" type="text" placeholder="Search..." />
        <ul v-show="isOpen" class="autocomplete-results">
            <a href="/groupPage" style="text-decoration: none" v-for="(result, i) in results" :key="i"
                @click="setResult(result)">
                <img class="acPic" :src="require('../assets/imageArchive/' + result.groupImage)" />
                <p class="autocomplete-result">
                    {{ result.groupName }}
                    <span v-if="result.members[0].grpName === result.members[0].stageName" class="acrSmall">
                        {{ result.members[0].fullName }}</span>
                    <br />
                    <span class="acrSmall">{{ result.company }}</span>
                </p>
            </a>
            <a href="/groupPage" style="text-decoration: none" v-for="(pResult, i) in peopleResults" :key="i"
                @click="setResultPeople(pResult)">
                <img class="acPic" :src="require('../assets/imageArchive/' + pResult.imgLink)" />
                <p class="autocomplete-result">
                    {{ pResult.stageName }}
                    <span class="acrSmall"> {{ pResult.fullName }}</span>
                    <br />
                    <span class="acrSmall">{{ pResult.grpName }}</span>
                </p>
            </a>
        </ul>
    </div>
</template>

<script>
import groupListEdit from "@/groupListEdit.json";

export default {
    name: "SearchAutocomplete",
    props: {
        items: {
            type: Array,
            required: false,
            default: () => [],
        },
    },
    data() {
        return {
            groups: groupListEdit,
            search: "",
            results: [],
            peopleResults: [],
            isOpen: false,
            selectedGroupArray: JSON.parse(localStorage.getItem("selectedGroup")),
        };
    },
    mounted() {
        document.addEventListener("click", this.handleClickOutside);
    },
    destroyed() {
        document.removeEventListener("click", this.handleClickOutside);
    },
    methods: {
        onChange() {
            this.filterResults();
            this.isOpen = true;
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

            let peopleSearchArr = [];
            for (let i = 0; i < this.groups.length; i++) {
                for (let j = 0; j < this.groups[i].members.length; j++) {
                    let noSC = this.groups[i].members[j].stageName.replace(/[^a-zA-Z ]/g, "");
                    if (
                        (this.erm(this.groups[i].members[j].stageName) ||
                            this.erm(noSC) ||
                            this.erm(this.groups[i].members[j].fullName) ||
                            this.erm(this.groups[i].members[j].stageKR) ||
                            this.erm(this.groups[i].members[j].fullKR)) &&
                        (this.groups[i].members[j].afr === "a" ||
                            this.groups[i].members[j].afr === "f") &&
                        this.groups[i].bgs !== "s"
                    ) {
                        peopleSearchArr.push(this.groups[i].members[j]);
                    }
                }
            }

            this.results = groupSearchArr;
            this.peopleResults = peopleSearchArr;
        },
        erm(word) {
            return word.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
        },
        setResult(result) {
            this.search = result.groupName;
            this.isOpen = false;
            if (this.selectedGroupArray === null) {
                this.selectedGroupArray = [];
            }
            this.selectedGroupArray = result;
            localStorage.setItem("selectedGroup", JSON.stringify(this.selectedGroupArray));
        },
        setResultPeople(result) {
            this.search = result.stageName;
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
        },
        handleClickOutside(event) {
            if (!this.$el.contains(event.target)) {
                this.isOpen = false;
            }
        },
    },
};
</script>

<style>
.autocomplete {
    z-index: 1;
    width: 300px;
    color: black;
}

.autocomplete-results {
    width: 300px;
    z-index: 1;
    position: absolute;
    padding: 10px;
    padding-bottom: 5px;
    margin: 0px;
    margin-top: 5px;
    box-shadow: 0px 0px 5px #00000080;
    border-radius: 5px;
    background: white;
    height: fit-content;
    min-height: 1em;
    max-height: 500px;
    overflow: auto;
    color: black;
}

.autocomplete-result {
    z-index: 2;
    list-style: none;
    text-align: left;
    text-decoration: none;
    padding: 15px;
    margin: 0px;
    margin-bottom: 10px;
    cursor: pointer;
    /* border-bottom: 1px solid #00000036; */
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

.autocomplete-result:hover {
    background-color: #b3b8e9;
    border-radius: 5px;
}

.acPic {
    float: left;
    height: 67px;
    width: 83.75px;
    margin-right: 10px;
    object-fit: cover;
    border-radius: 5px;
}
</style>
