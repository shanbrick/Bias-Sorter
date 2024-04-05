// add birthday of the day
<template>
    <div class="birthdayDisplay">
        <p class="date">Today is {{ currentDate }}! Happy Birthday to:</p>
        <div style="
        margin: auto;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: left;
      ">
            <div class="peopleDiv" v-for="pers in birthdayToday">
                <img class="bdayPic" :src="require('../assets/imageArchive/' + pers.imgLink)" />
                <p class="bdayStage">{{ pers.stageName }}</p>
                <p class="bdayGroup">{{ pers.grpName }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import groupListEdit from "@/groupListEdit.json";

export default {
    name: "Home2",
    data() {
        return {
            groups: groupListEdit,
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
    },
};
</script>

<style scoped>
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
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    height: fit-content;
    margin: 20px;
    overflow-x: hidden;
    padding: 10px;
    width: 395px;
}

.date {
    color: white;
    font-size: 18px;
    font-weight: bolder;
    padding: 0px;
    margin: 1px 0px 20px;
}

.peopleDiv {
    height: fit-content;
    padding: 10px 0px 0px;
    margin-bottom: 0px;
    text-align: center;
    width: 125px;
}

.bdayStage {
    color: black;
    font-size: 15px;
    font-weight: bold;
    margin: 5px;
    text-align: center;
}

.bdayGroup {
    font-size: 0.75em;
    margin: 5px;
    text-align: center;
}

.bdayPic {
    border-radius: 8px;
    box-shadow: 0px 0px 5px #00000080;
    margin: 0px;
    padding: 0px;
    width: 100px;
}
</style>
