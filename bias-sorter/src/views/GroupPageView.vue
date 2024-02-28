<template>
    <div id='groupPage' class="groupPageBox">
        <!-- <img class="groupPicIndividual" src="xdinary.jpeg"> -->
        <p class="directory" style="font-size: 25px; margin-bottom:40px;">Xdinary Heroes</p>

        <div class="groupPageDivs" v-for="person in groupData">
            <!-- <img class="personPicIndividual" src="'../assets' + person.imgLink"> -->
            <img class="personPicIndividual" :src="require('./assets' + person.imgLink)">
            <p class="idolName">{{ person.stageName }}</p>
            <p class="idolName">{{ person.birthday }}</p>
            <button @click="addToUnsorted(person.groupName,person.num,person.stageName,person.fullName,person.birthday,person.imgLink)">Add</button>
        </div>
    </div>
</template>

<script>
import groupList from '@/groupList.json'
let unsortedArray = JSON.parse(localStorage.getItem('unsorted'));

export default {
    name: 'GroupPageView',
    data() {
        return { groupData: groupList }
    },
    methods: {
        addToUnsorted(groupName, num, stageName, fullName, birthday, imgLink) {
            if (unsortedArray === null) {
                unsortedArray = []
            }
            unsortedArray.push(
                {
                    "groupName": groupName,
                    "num": num,
                    "stageName": stageName,
                    "fullName": fullName,
                    "birthday": birthday,
                    "imgLink": imgLink
                }
            )

            localStorage.setItem('unsorted', JSON.stringify(unsortedArray));
            console.log("unsorted: ", JSON.parse(localStorage.getItem('unsorted')));
        }
    }
}
</script>

<style scoped>
.groupPageBox {
    width: 800px;
    margin: auto;
    margin-top: 20px;
    text-align: center;
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    border: 1px solid #B0B0B0;
}

.groupPageBox:after {
    content: "";
    display: table;
    clear: both;
}

.groupPageDivs {
    float: left;
    height: 310px;
    width: fit-content;
    text-align: center;
    padding: 10px;
    padding-left: 20px;
    padding-right: 20px;
    /* border: 1px solid red; */
}

.personPicIndividual {
    width: 210px;
    border-radius: 8px;
}

.idolName {
    font-size: 20px;
    text-align: center;
    margin: 5px;
    font-weight: bold;
    color: black;
}

button {
    border: 1px solid #B0B0B0;
    border-radius: 5px;
    color: white;
    background-color: #b3b8e9;
    padding: 5px 15px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
}
</style>