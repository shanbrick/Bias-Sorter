<template>
    <div class="listBox">
        <div v-for="group in groupsData">
            <div class="groupDiv" v-if="group.bgs === 'g' || group.bgs === 'bg'">
                <a href="/groupPage" style="text-decoration: none" @click="populateGroupPage(group)">
                    <img class="groupPicList" :src="require('../assets/imageArchive/' + group.groupImage)" />
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
    name: "GGView",
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
