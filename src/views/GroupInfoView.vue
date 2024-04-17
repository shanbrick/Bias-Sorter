<template>
    <div class="groupInfoDiv">
        <v-lazy-image class="fullGroupPic" :src="require('../assets/imageArchive/' + group.imgLink)" />
        <p class="groupName">{{ group.groupName }} ({{ group.groupKR }})</p>
        <p><i style="font-weight: bold">Company:</i> {{ group.company }}</p>
        <p><i style="font-weight: bold">Debut:</i> {{ group.debutDate }}</p>
    </div>
    <div class="bigBox">
        <div v-for="person in active" class="memberDivs">
            <v-lazy-image class="memberPic" :src="require('../assets/imageArchive/' + person.imgLink)" />
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
            <button v-if="checkPerson(person.imgLink)" @click="removeFromHome(person)" class="added">
                Added
            </button>
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
            <v-lazy-image class="memberPic" :src="require('../assets/imageArchive/' + person.imgLink)" />
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
            <button v-if="checkPerson(person.imgLink)" class="added">Added</button>
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
import { getAuth, onAuthStateChanged } from "firebase/auth";
import VLazyImage from "v-lazy-image";

export default {
    name: "GroupInfoView",
    components: {
        VLazyImage,
    },
    data() {
        return {
            groupList: groupListEdit,
            group: JSON.parse(localStorage.getItem("selectedGroup")),
            currUser: {},
            fireSaveData: {},
            fsdLength: 0,
        };
    },
    mounted() {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.initialize();
            }
        });
    },
    methods: {
        async initialize() {
            const auth = getAuth();
            const currentUser = auth.currentUser;
            this.currUser = currentUser;
            const userDoc = await this.$db.collection("users").doc(currentUser.uid).get();
            if (userDoc.exists) {
                const saveData = userDoc.data();
                this.fireSaveData = saveData;
                this.fsdLength = this.fireSaveData.categories.length;
            } else {
                const saveData = await this.$db
                    .collection("users")
                    .doc(currentUser.uid)
                    .set({
                        categories: [
                            {
                                catName: "Unsorted",
                                people: [],
                            },
                            {
                                catName: "Ults",
                                people: [],
                            },
                            {
                                catName: "Semis",
                                people: [],
                            },
                            {
                                catName: "Regs",
                                people: [],
                            },
                        ],
                    });
            }
        },
        addToUnsorted(grpName, stageName, stageKR, fullName, fullKR, birthday, imgLink, afr) {
            if (stageName === grpName) {
                this.fireSaveData.categories[0].people.push({
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
                this.fireSaveData.categories[0].people.push({
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
            this.$db.collection("users").doc(this.currUser.uid).set(this.fireSaveData);
        },
        checkPerson(input) {
            for (let i = 0; i < this.fsdLength; i++) {
                let array = this.fireSaveData.categories[i].people;
                for (let j = 0; j < array.length; j++) {
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
            for (let i = 0; i < this.groupList.length; i++) {
                if (this.groupList[i].groupName === groupInput) {
                    groupArray = this.groupList[i];
                    break;
                }
            }
            localStorage.setItem("selectedGroup", JSON.stringify(groupArray));
            this.group = JSON.parse(localStorage.getItem("selectedGroup"));
            this.$router.push('/groupPage')
        },
        removeFromHome(person) {
            for (let i = 0; i < this.fireSaveData.categories.length; i++) {
                for (let j = 0; j < this.fireSaveData.categories[i].people.length; j++) {
                    if (this.fireSaveData.categories[i].people[j].imgLink === person.imgLink) {
                        this.fireSaveData.categories[i].people = this.fireSaveData.categories[
                            i
                        ].people.filter((p) => {
                            return p.imgLink !== person.imgLink;
                        });
                        this.$db.collection("users").doc(this.currUser.uid).set(this.fireSaveData);
                        break;
                    }
                }
            }
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
    align-content: center;
    /* border: 1px solid red; */
    border-radius: 10px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    margin: 20px auto 20px;
    max-width: 1095px;
    padding: 20px;
    text-align: center;
    width: 100%;
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
    filter: blur(5px);
    transition: filter 0.7s;
}

.v-lazy-image-loaded {
    filter: blur(0);
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
    /* width: 310px; */
    width: 29%;
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
    /* width: 270px; */
    width: 100%;
    border: 1px solid #848484;
    border-radius: 8px;
    margin-bottom: 5px;
    filter: blur(5px);
    transition: filter 0.7s;
}

.v-lazy-image-loaded {
    filter: blur(0);
    box-shadow: 0px 0px 5px black;
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
    background-color: #b3b8e9;
    border: 1px solid #848484;
    border-radius: 5px;
    color: rgb(0, 0, 0);
    cursor: pointer;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    padding: 7px 15px;
    text-align: center;
    text-decoration: none;
}

button:hover {
    background-color: #747fe6;
}

.added {
    background-color: #747fe6;
    border: 1px solid #898989;
    color: #474747;
}

.added:hover {
    background-color: #b3b8e9;
}
</style>
