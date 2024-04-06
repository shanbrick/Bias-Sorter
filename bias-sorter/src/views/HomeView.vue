// add birthday of the day
<template>
    <div style="display: flex">
        <div class="birthdayDisplay">
            <p class="date">Today is {{ currentDate }}! Happy Birthday to:</p>
            <div class="insideDisplay">
                <div class="peopleDiv" v-for="pers in birthdayToday">
                    <a href="/groupPage" style="text-decoration: none" @click="populateGroupPage(pers.grpName)">
                        <img class="bdayPic" :src="require('../assets/imageArchive/' + pers.imgLink)" />
                        <p class="bdayStage">{{ pers.stageName }}</p>
                        <p class="bdayGroup">{{ pers.grpName }}</p>
                    </a>
                </div>
            </div>
        </div>
        <div class="randomDisplay">
            <p class="date">Looking for a new group to stan? Check out these groups!</p>
            <div class="insideDisplay">
                <div class="randomDiv" v-for="group in randomGroups">
                    <a href="/groupPage" style="text-decoration: none" @click="populateGroupPage(group.groupName)">
                        <img class="randomPic" :src="require('../assets/imageArchive/' + group.groupImage)" />
                        <p class="randomName">{{ group.groupName }}</p>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import groupListEdit from "@/groupListEdit.json";

export default {
    name: "HomeView",
    data() {
        return {
            groups: groupListEdit,
            selectedGroupArray: [],
            birthdayToday: [],
            currentDate: "",
            monthArray: [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
            ],
            randomGroups: [],
        };
    },
    mounted() {
        this.birthdayToday = [];

        const date = new Date();
        let month = this.convertMonth(date.getMonth() + 1);
        let day = date.getDate().toString();

        this.currentDate = month + " " + day;

        if (day.length === 1) {
            let old = day;
            day = "0" + old;
        }
        let today = month + " " + day;

        for (let i = 0; i < this.groups.length; i++) {
            for (let j = 0; j < this.groups[i].members.length; j++) {
                let pb = this.groups[i].members[j].birthday;
                let pbshort = pb.substring(0, pb.indexOf(","));
                if (pbshort === today) {
                    this.birthdayToday.push(this.groups[i].members[j]);
                }
            }
        }
        let ranNumArr = [];
        while (ranNumArr.length < 6) {
            let r = Math.floor(Math.random() * this.groups.length);
            if (ranNumArr.indexOf(r) === -1) {
                ranNumArr.push(r);
                this.randomGroups.push(this.groups[r]);
            }
        }
    },
    methods: {
        convertBday(birthday) {
            let month = birthday.substring(0, birthday.indexOf(" "));
            let monthNum = 0;
            for (let i = 0; i < this.monthArray.length; i++) {
                if (month === this.monthArray[i]) {
                    monthNum = i + 1;
                }
            }
            let day = birthday.substring(birthday.indexOf(" ") + 1, birthday.indexOf(","));

            let converted = monthNum.toString() + " " + day.toString();

            return converted;
        },
        convertMonth(monthNum) {
            for (let i = 0; i < this.monthArray.length; i++) {
                if (monthNum - 1 === i) {
                    return this.monthArray[i];
                }
            }
        },
        populateGroupPage(grpName) {
            let selectedGroup = [];
            for (let i = 0; i < this.groups.length; i++) {
                if (this.groups[i].groupName === grpName) {
                    selectedGroup = this.groups[i];
                    break;
                }
            }
            localStorage.setItem("selectedGroup", JSON.stringify(selectedGroup));
        },
    },
};
</script>

<style scoped>
.insideDisplay {
    margin: auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: left;
}

.birthdayDisplay {
    background: rgb(195, 195, 195);
    background: linear-gradient(180deg,
            rgba(179, 184, 233, 1) 0px,
            rgba(116, 127, 230, 1) 45px,
            rgba(218, 218, 218, 1) 45px,
            rgba(255, 255, 255, 1) 63%,
            rgba(218, 218, 218, 1) 100%);
    border-radius: 10px;
    box-shadow: 0px 0px 5px black;
    /* display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center; */
    height: fit-content;
    margin: 20px;
    overflow-x: hidden;
    padding: 10px;
    width: 30%;
}

.date {
    color: white;
    font-size: 1.3vw;
    font-weight: bolder;
    padding: 0px;
    margin: 1px 0px 20px;
}

.peopleDiv {
    border-radius: 5px;
    height: fit-content;
    padding: 10px 0px 0px;
    margin-bottom: 0px;
    text-align: center;
    width: 33%;
}

.peopleDiv:hover {
    background-color: #b3b8e9;
}

.bdayStage {
    color: black;
    font-size: 15px;
    font-weight: bold;
    margin: 5px;
    text-align: center;
}

.bdayGroup {
    color: black;
    font-size: 0.75em;
    margin: 5px;
    text-align: center;
}

.bdayPic {
    border-radius: 8px;
    box-shadow: 0px 0px 5px #00000080;
    margin: 0px;
    padding: 0px;
    width: 80%;
}

.randomDisplay {
    background: rgb(195, 195, 195);
    background: linear-gradient(180deg,
            rgba(179, 184, 233, 1) 0px,
            rgba(116, 127, 230, 1) 45px,
            rgba(218, 218, 218, 1) 45px,
            rgba(255, 255, 255, 1) 63%,
            rgba(218, 218, 218, 1) 100%);
    border-radius: 10px;
    box-shadow: 0px 0px 5px black;
    /* display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center; */
    height: fit-content;
    margin: 20px;
    overflow-x: hidden;
    padding: 10px;
    width: 65%;
}

.randomDiv {
    border-radius: 10px;
    height: fit-content;
    padding: 10px 20px 0px;
    margin-bottom: 0px;
    text-align: center;
    width: 33%;
}

.randomDiv:hover {
    background-color: #b3b8e9;
}

.randomPic {
    border-radius: 8px;
    box-shadow: 0px 0px 5px #00000080;
    height: 165px;
    margin: 0px;
    object-fit: cover;
    padding: 0px;
    width: 100%;
}

.randomName {
    font-size: 20px;
    font-weight: bold;
    margin: 10px 0px 20px;
    text-align: center;
}
</style>
