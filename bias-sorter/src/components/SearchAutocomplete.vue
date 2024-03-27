<template>
    <div class="autocomplete">
        <input v-model="search" @input="onChange" type="text" placeholder="Search..." />
        <ul v-show="isOpen" class="autocomplete-results">
            <a href="/groupPage" style="text-decoration: none" v-for="(result, i) in results" :key="i"
                @click="setResult(result)">
                <img class="acPic" :src="require('../assets' + result.groupImage)" />
                <p class="autocomplete-result">{{ result.groupName }}</p>
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
            this.results = this.items.filter(
                (item) => item.groupName.toLowerCase().indexOf(this.search.toLowerCase()) > -1
            );
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
    margin: 0px;
    margin-top: 5px;
    box-shadow: 0px 0px 5px #00000080;
    border-radius: 5px;
    background: white;
    height: 200px;
    min-height: 1em;
    max-height: 200px;
    overflow: auto;
    color: black;
}

.autocomplete-result {
    z-index: 2;
    list-style: none;
    text-align: left;
    text-decoration: none;
    padding: 20px;
    margin: 0px;
    margin-bottom: 5px;
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
    height: 58.5px;
    width: 73.125px;
    margin-right: 10px;
    object-fit: cover;
}
</style>
