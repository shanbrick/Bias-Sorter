<template>
    <div class="listBox">
        <div v-for="group in groupsData">
            <div class="groupDiv" v-if="group.bgs === 'b' || group.bgs === 'bg'">
                <a href="/groupPage" @click="populateGroupPage(group)">
                    <img class="groupPicList" :src="require('../assets' + group.groupImage)" />
                    <p class="groupNameList">{{ group.groupName }}</p>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
import groupListEdit from "@/groupListEdit.json";
let selectedGroupArray = JSON.parse(localStorage.getItem("selectedGroup"));

export default {
    name: "BGView",
    data: () => {
        return { groupsData: groupListEdit };
    },
    methods: {
        populateGroupPage(group) {
            if (selectedGroupArray === null) {
                selectedGroupArray = [];
            }
            selectedGroupArray = group;
            localStorage.setItem("selectedGroup", JSON.stringify(selectedGroupArray));
        },
    },
};
</script>

<style>
.listBox {
    background-color: #ededed;
    background: radial-gradient(#ffffff, #c7c7c7);
    margin: auto;
    margin-top: 40px;
    width: 88%;
    /* margin-left: 140px; */
    padding: 10px;
    padding-left: 20px;
    padding-right: 20px;
    border-radius: 10px;
    /* border: 1px solid #B0B0B0; */
    box-shadow: 0px 0px 5px black;
    display: flex;
    justify-content: center;
    flex-direction: row;
    flex-wrap: wrap;
}

.listBox:after {
    content: "";
    display: table;
    clear: both;
}

.groupDiv {
    float: left;
    height: fit-content;
    width: 294px;
    text-align: center;
    padding: 10px;
    padding-left: 20px;
    padding-right: 20px;
    margin: 5px;
    /* border: 1px solid red; */
}

.groupPicList {
    width: 254px;
    height: 170px;
    border-radius: 8px;
    object-fit: cover;
    /* border: 1px solid #848484; */
    box-shadow: 0px 0px 5px black;
}

.groupNameList {
    font-size: 18px;
    text-align: center;
    padding: 10px;
    margin: 0px;
}

.groupNameList a {
    color: black;
    text-decoration: none;
}
</style>
