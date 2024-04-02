<template>
    <div class="groupInfoDiv">
        <img class="fullGroupPic" :src="require('../assets/imageArchive/' + group.groupImage)" />
        <p class="groupName">{{ group.groupName }} ({{ group.groupKR }})</p>
        <p><i>Company:</i> {{ group.company }}</p>
        <p><i>Debut:</i> {{ group.debutDate }}</p>
    </div>
    <div class="bigBox">
        <div v-for="person in active" class="memberDivs">
            <img class="memberPic" :src="require('../assets/imageArchive/' + person.imgLink)" />
            <p class="memberName">{{ person.stageName }} ({{ person.stageKR }})</p>
            <p class="memberInfo">
                <i style="font-weight: bold">Full Name:</i> {{ person.fullName }}
            </p>
            <p class="memberInfo">
                <i style="font-weight: bold">Korean Name:</i> {{ person.fullKR }}
            </p>
            <p class="memberInfo">
                <i style="font-weight: bold">Birthday:</i> {{ person.birthday }}
            </p>
            <div v-if="checkPerson(person.imgLink)" class="added">
                <p>Added</p>
            </div>
            <button v-else-if="person.afr !== 'a' && person.afr !== 'f'" @click="populateGroupPage(person.afr)">
                ➜
            </button>
            <button v-else @click="
            addToUnsorted(
                person.grpName,
                person.stageName,
                person.stageKR,
                person.fullName,
                person.fullKR,
                person.birthday,
                person.imgLink,
                person.afr
            )
            ">
                Add
            </button>
        </div>
    </div>
    <div class="bigBox">
        <div v-for="person in former" class="memberDivs">
            <p class="former">Former Member:</p>
            <img class="memberPic" :src="require('../assets/imageArchive/' + person.imgLink)" />
            <p class="memberName">{{ person.stageName }} ({{ person.stageKR }})</p>
            <p class="memberInfo">
                <i style="font-weight: bold">Full Name:</i> {{ person.fullName }}
            </p>
            <p class="memberInfo">
                <i style="font-weight: bold">Korean Name:</i> {{ person.fullKR }}
            </p>
            <p class="memberInfo">
                <i style="font-weight: bold">Birthday:</i> {{ person.birthday }}
            </p>
            <div v-if="checkPerson(person.imgLink)" class="added">
                <p>Added</p>
            </div>
            <button v-else-if="person.afr !== 'a' && person.afr !== 'f'" @click="populateGroupPage(person.afr)">
                ➜
            </button>
            <button v-else @click="
            addToUnsorted(
                person.grpName,
                person.stageName,
                person.stageKR,
                person.fullName,
                person.fullKR,
                person.birthday,
                person.imgLink,
                person.afr
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
        addToUnsorted(grpName, stageName, stageKR, fullName, fullKR, birthday, imgLink, afr) {
            if (stageName === grpName) {
                this.saveData.categories[0].people.push({
                    grpName: "Solo",
                    stageName: stageName,
                    stageKR: stageKR,
                    fullName: fullName,
                    fullKR: fullKR,
                    birthday: birthday,
                    imgLink: imgLink,
                    afr: afr,
                });
            } else {
                this.saveData.categories[0].people.push({
                    grpName: grpName,
                    stageName: stageName,
                    stageKR: stageKR,
                    fullName: fullName,
                    fullKR: fullKR,
                    birthday: birthday,
                    imgLink: imgLink,
                    afr: afr,
                });
            }
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
                    break;
                }
            }
            localStorage.setItem("selectedGroup", JSON.stringify(groupArray));
            this.group = JSON.parse(localStorage.getItem("selectedGroup"));
        },
    },
    computed: {
        active: function () {
            let arr = this.group.members;
            return arr.filter((i) => i.afr === "a");
        },
        former: function () {
            let arr = this.group.members;
            return arr.filter((i) => i.afr !== "a");
        },
    },
};
</script>

<style scoped>
.bigBox {
    width: 76%;
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
    justify-content: left;
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
    padding-bottom: 20px;
    margin: auto;
    margin-top: 20px;
    margin-bottom: 10px;
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

.former {
    font-size: 20px;
    text-align: center;
    padding-top: 0px;
    margin-top: 0px;
    margin-bottom: 12px;
    font-weight: bold;
}

.memberName {
    font-size: 20px;
    text-align: center;
    margin: 5px;
    font-weight: bold;
}

.memberInfo {
    font-size: 14px;
    text-align: center;
    margin: 5px;
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
