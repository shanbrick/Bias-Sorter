<template>
    <div class="groupInfoDiv">
        <img class="fullGroupPic" :src="require('../assets' + group.groupImage)" />
        <p class="groupName">{{ group.groupName }}</p>
        <p><i>Company:</i> {{ group.company }}</p>
        <p><i>Debut:</i> {{ group.debutDate }}</p>
    </div>
    <div class="bigBox">
        <div v-for="person in group.members" class="memberDivs">
            <img class="memberPic" :src="require('../assets' + person.imgLink)" />
            <p class="memberName">{{ person.stageName }}</p>
            <p class="memberInfo"><i>Full Name:</i> {{ person.fullName }}</p>
            <p class="memberInfo"><i>Birthday:</i> {{ person.birthday }}</p>
            <div v-if="checkPerson(person.imgLink)" class="added">
                <p>Added</p>
            </div>
            <button v-else-if="person.afr !== 'a' && person.afr !== 'f'" @click="populateGroupPage(person.afr)">
                ➜
            </button>
            <button v-else @click="
            addToUnsorted(
                group.groupName,
                person.num,
                person.stageName,
                person.fullName,
                person.birthday,
                person.imgLink
            )
            ">
                Add
            </button>
        </div>
    </div>
</template>

<script>
import groupListEdit from "@/groupListEdit.json";

export default {
    name: "GroupPageView",
    mounted() { },
    data() {
        return {
            groupList: groupListEdit,
            group: JSON.parse(localStorage.getItem("selectedGroup")),
            saveData: JSON.parse(localStorage.getItem("save_data")),
        };
    },
    methods: {
        addToUnsorted(groupName, num, stageName, fullName, birthday, imgLink) {
            this.saveData.categories[0].people.push({
                groupName: groupName,
                num: num,
                stageName: stageName,
                fullName: fullName,
                birthday: birthday,
                imgLink: imgLink,
            });
            localStorage.setItem("save_data", JSON.stringify(this.saveData));
        },
        checkPerson(input) {
            for (var i = 0; i < this.saveData.categories.length; i++) {
                let array = this.saveData.categories[i].people;
                for (var j = 0; j < array.length; j++) {
                    if (array[j].imgLink === input) {
                        return true;
                    }
                }
            }
            return false;
        },
        populateGroupPage(groupInput) {
            if (this.group === null) {
                this.group = [];
            }
            let groupArray = [];
            for (var i = 0; i < this.groupList.length; i++) {
                if (this.groupList[i].groupName === groupInput) {
                    groupArray = this.groupList[i];
                }
            }
            localStorage.setItem("selectedGroup", JSON.stringify(groupArray));
            this.group = JSON.parse(localStorage.getItem("selectedGroup"));
        },
    },
};
</script>

<style scoped>
.bigBox {
    width: 1200px;
    margin: auto;
    margin-top: 20px;
    margin-bottom: 20px;
    align-content: center;
    text-align: center;
    /* background: radial-gradient(#ffffff, #dadada); */
    padding: 20px;
    border-radius: 10px;
    /* border: 1px solid #b0b0b0; */
    display: flex;
    justify-content: center;
    flex-direction: row;
    flex-wrap: wrap;
}

.bigBox:after {
    content: "";
    display: table;
    clear: both;
}

.groupInfoDiv {
    height: fit-content;
    width: fit-content;
    text-align: center;
    padding: 40px;
    padding-left: 40px;
    padding-right: 40px;
    margin: auto;
    margin-top: 20px;
    margin-bottom: 20px;
    border-radius: 8px;
    background-color: #edecff;
    /* background-image: linear-gradient(#747fe6, #b3b8e9); */
    background: radial-gradient(#ffffff, #dadada);
    box-shadow: 0px 0px 5px black;
}

.fullGroupPic {
    height: 400px;
    border: 1px solid #848484;
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
    width: 310px;
    text-align: center;
    padding: 20px;
    margin: 20px;
    border-radius: 8px;
    background-color: #edecff;
    /* background-image: linear-gradient(#747fe6, #b3b8e9); */
    background: radial-gradient(#ffffff, #dadada);
    box-shadow: 0px 0px 5px black;
}

.memberPic {
    width: 270px;
    border: 1px solid #848484;
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

.former {
    font-size: 12px;
    text-align: center;
    margin: 5px;
    position: relative;
    font-style: italic;
}

button {
    border: 1px solid #848484;
    border-radius: 5px;
    color: rgb(0, 0, 0);
    background-color: #b3b8e9;
    padding: 7px 15px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
}

.added {
    border: 1px solid #898989;
    border-radius: 5px;
    color: #474747;
    background-color: #747fe6;
    padding: 0px 15px;
    text-align: center;
    line-height: 0px;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
}
</style>
