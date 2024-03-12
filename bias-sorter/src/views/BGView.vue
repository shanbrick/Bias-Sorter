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
            <div class="groupDiv" v-if="group.bgs === 'b' || group.bgs === 'bg'">
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
    name: 'BGView',
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

<style>
.directoryBox {
    height: 400px;
    width: 100px;
    position: fixed;
    z-index: 1;
    overflow-x: hidden;
    /* disable horizontal scroll */
    overflow-y: auto;
    background-color: #ededed;
    border: 1px solid #B0B0B0;
    border-radius: 10px;
    padding: 0px;
    margin: 20px;
}

.directory {
    padding-left: 0px;
    padding-top: 0px;
    font-size: 30px;
    line-height: 0px;
}

.directory a {
    float: left;
    font-size: 20px;
    display: block;
    color: black;
    padding: 5px;
    padding-top: 0px;
    margin: 10px;
    text-align: center;
}

.listBox {
    background-color: #ededed;
    margin: auto;
    margin-top: 20px;
    width: 88%;
    /* margin-left: 140px; */
    padding: 10px;
    padding-left: 20px;
    padding-right: 20px;
    border-radius: 10px;
    border: 1px solid #B0B0B0;
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
    border: 1px solid #848484;
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