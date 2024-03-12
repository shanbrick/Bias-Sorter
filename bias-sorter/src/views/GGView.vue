<template>
    <!-- <div class="directoryBox">
        <p class="directory">
            <a href="#symbol">#</a>
            <a href="#A">A</a>
            <a href="#B">B</a>
            <a href="#C">C</a>
            <a href="#D">D</a>
            <a href="#E">E</a>
            <a href="#F">F</a>
            <a href="#G">G</a>
            <a href="#H">H</a>
            <a href="#I">I</a>
            <a href="#J">J</a>
            <a href="#K">K</a>
            <a href="#L">L</a>
            <a href="#M">M</a>
            <a href="#N">N</a>
            <a href="#O">O</a>
            <a href="#P">P</a>
            <a href="#Q">Q</a>
            <a href="#R">R</a>
            <a href="#S">S</a>
            <a href="#T">T</a>
            <a href="#U">U</a>
            <a href="#V">V</a>
            <a href="#W">W</a>
            <a href="#X">X</a>
            <a href="#Y">Y</a>
            <a href="#Z">Z</a>
        </p>
    </div> -->

    <div class="listBox">
        <div v-for="group in groupsData">
            <div class="groupDiv" v-if="group.bgs === 'g' || group.bgs === 'bg'">
                <a href="/groupPage" @click="populateGroupPage(group)">
                    <img class="groupPicList" :src="require('../assets' + group.groupImage)">
                    <p class="groupNameList">{{ group.groupName }}</p>
                </a>
            </div>
        </div>
    </div>

</template>

<script>
import groupListEdit from '@/groupListEdit.json'
let selectedGroupArray = JSON.parse(localStorage.getItem('selectedGroup'));

export default {
    name: 'GGView',
    data: () => {
        return { groupsData: groupListEdit }
    },
    methods: {
        populateGroupPage(group) {
            if (selectedGroupArray === null) {
                selectedGroupArray = []
            }
            selectedGroupArray = group
            localStorage.setItem('selectedGroup', JSON.stringify(selectedGroupArray));
        }
    }
}
</script>