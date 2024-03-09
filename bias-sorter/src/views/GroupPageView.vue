<template>
    <div id='groupPage' class="bigBox">
        <div class="groupInfoDiv">
            <img class="fullGroupPic" :src="require('../assets' + group.groupImage)">
            <p class="groupName">{{ group.groupName }}</p>
            <p><i>Company:</i> {{ group.company }}</p>
            <p><i>Debut:</i> {{ group.debutDate }}</p>
        </div>

        <div v-for="person in group.members" class="memberDivs">
            <img class="memberPic" :src="require('../assets' + person.imgLink)">
            <p class="memberName">{{ person.stageName }}</p>
            <p class="memberInfo"><i>Full Name:</i> {{ person.fullName }}</p>
            <p class="memberInfo"><i>Birthday:</i> {{ person.birthday }}</p>
            <button
                @click="addToUnsorted(group.groupName, person.num, person.stageName, person.fullName, person.birthday, person.imgLink)">Add</button>
        </div>
    </div>
</template>

<script>
let unsortedArray = JSON.parse(localStorage.getItem('unsorted'));
let group = JSON.parse(localStorage.getItem('selectedGroup'));

export default {
    name: 'GroupPageView',
    data() {
        return { group }
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
.bigBox {
    width: 832px;
    margin: auto;
    margin-top: 20px;
    align-content: center;
    text-align: center;
    background-color: white;
    padding: 10px;
    border-radius: 10px;
    border: 1px solid #B0B0B0;
}

.bigBox:after {
    content: "";
    display: table;
    clear: both;
}

.groupInfoDiv {
    height: fit-content;
    width: 480px;
    text-align: center;
    padding: 20px;
    padding-left: 40px;
    padding-right: 40px;
    margin: auto;
    margin-top: 10px;
    margin-bottom: 10px;
    border: 1px solid #B0B0B0;
    border-radius: 8px;
    background-color: #edecff;
}

.fullGroupPic {
    width: 400px;
    border-radius: 8px;
}

.groupName {
    padding-left: 0px;
    padding-top: 0px;
    margin-bottom: 30px;
    line-height: 0px;
    font-size: 25px;
    font-weight: bolder;
    text-decoration: underline;
}

.groupInfo {
    padding-left: 0px;
    padding-top: 0px;
    line-height: 0px;
    font-size: 25px;
}

.memberDivs {
    float: left;
    height: fit-content;
    width: 250px;
    /* width: fit-content; */
    text-align: center;
    padding: 20px;
    padding-left: 20px;
    padding-right: 20px;
    margin: 10px;
    border: 1px solid #B0B0B0;
    border-radius: 8px;
    background-color: #edecff;
}

.memberPic {
    width: 210px;
    border-radius: 8px;
    margin-bottom: 5px;
}

.memberName {
    font-size: 20px;
    text-align: center;
    margin: 5px;
    font-weight: bold;
    text-decoration: underline;
}

.memberInfo {
    font-size: 14px;
    text-align: center;
    margin: 5px;
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