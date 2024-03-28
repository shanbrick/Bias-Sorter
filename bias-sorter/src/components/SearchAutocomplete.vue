<template>
    <div class="autocomplete">
        <input v-model="search" @input="onChange" type="text" placeholder="Search..." />
        <ul v-show="isOpen" class="autocomplete-results">
            <a href="/groupPage" style="text-decoration: none" v-for="(result, i) in results" :key="i"
                @click="setResult(result)">
                <img class="acPic" :src="require('../assets' + result.groupImage)" />
                <p class="autocomplete-result">
                    {{ result.groupName }}
                    <br />
                    <span style="font-size: 75%">{{ result.company }}</span>
                </p>
            </a>
            <a href="/groupPage" style="text-decoration: none" v-for="(pResult, i) in peopleResults" :key="i"
                @click="setResultPeople(pResult)">
                <img class="acPic" :src="require('../assets' + pResult.imgLink)" />
                <p class="autocomplete-result">
                    {{ pResult.stageName }}
                    <br />
                    <span style="font-size: 75%">{{ pResult.fullName }}</span>
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
            if (this.search.length > 1) {
                let groupSearchArr = [];
                for (let i = 0; i < this.groups.length; i++) {
                    let noSC = this.groups[i].groupName.replace(/[^a-zA-Z ]/g, "");
                    if (
                        this.groups[i].groupName.toLowerCase().indexOf(this.search.toLowerCase()) >
                        -1 ||
                        noSC.toLowerCase().indexOf(this.search.toLowerCase()) > -1
                    ) {
                        groupSearchArr.push(this.groups[i]);
                    }
                }

                let peopleSearchArr = [];
                for (let i = 0; i < this.groups.length; i++) {
                    for (let j = 0; j < this.groups[i].members.length; j++) {
                        if (
                            (this.groups[i].members[j].stageName
                                .toLowerCase()
                                .indexOf(this.search.toLowerCase()) > -1 ||
                                this.groups[i].members[j].fullName
                                    .toLowerCase()
                                    .indexOf(this.search.toLowerCase()) > -1) &&
                            (this.groups[i].members[j].afr === "a" ||
                                this.groups[i].members[j].afr === "f")
                        ) {
                            peopleSearchArr.push(this.groups[i].members[j]);
                        }
                    }
                }

                this.results = groupSearchArr;
                this.peopleResults = peopleSearchArr;
            }
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

.autocomplete-result:hover {
    background-color: #505cc7;
    color: white;
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
