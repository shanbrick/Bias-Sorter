<template>
    <button @click="switchList(months)" class="diffList">By Month</button>
    <button @click="switchList(years)" class="diffList">By Year</button>
    <div style="display: flex; justify-content: center; margin: auto" v-for="category in currentList">
        <div class="birthdayDiv">
            <p class="monthName">{{ category.name }} - {{ category.total }}</p>
            <table class="mainTable">
                <tr class="trtdth">
                    <th class="trtdth">Group Name</th>
                    <th class="trtdth">Stage Name</th>
                    <th class="trtdth">Full Name</th>
                    <th class="trtdth">Birthday</th>
                </tr>
                <tr class="trtdth" v-for="person in category.people">
                    <td class="trtdth">
                        <a href="/groupPage" @click="populateGroupPage(person.grpName)">
                            <span v-if="person.grpName === person.stageName">Solo</span>
                            <span v-else>{{ person.grpName }}<span v-if="person.afr === 'f'"> (ex)</span></span>
                        </a>
                    </td>
                    <td class="trtdth">
                        <a href="/groupPage" @click="populateGroupPage(person.grpName)">
                            {{ person.stageName }}
                            <span v-if="person.birthday === 'September 30, 2002'"
                                style="font-size: 17px; line-height: 10px">
                                ★</span>
                        </a>
                    </td>
                    <td class="trtdth">
                        <a href="/groupPage" @click="populateGroupPage(person.grpName)">
                            {{ person.fullName }}
                        </a>
                    </td>
                    <td class="trtdth">
                        {{ person.birthday }}
                    </td>
                </tr>
            </table>
        </div>
        <div class="twinDiv">
            <p class="twinTitleName">Twinnies - {{ category.twinTotal }}</p>
            <table>
                <tr class="trtdth">
                    <th class="trtdthTwin">Group Name</th>
                    <th class="trtdthTwin">Stage Name</th>
                    <th class="trtdthTwin">Birthday</th>
                    <th class="trtdthTwin">Year</th>
                </tr>
                <tr class="trtdthTwin" v-for="twinSet in category.twinnies">
                    <td class="trtdthTwin">
                        <p v-for="twin in twinSet.twins">
                            <a href="/groupPage" @click="populateGroupPage(twin.grpName)">
                                <span v-if="twin.grpName === twin.stageName">Solo</span>
                                <span v-else>{{ twin.grpName }}<span v-if="twin.afr === 'f'"> (ex)</span></span>
                            </a>
                        </p>
                    </td>
                    <td class="trtdthTwin">
                        <p v-for="twin in twinSet.twins">
                            <a href="/groupPage" @click="populateGroupPage(twin.grpName)">
                                {{ twin.stageName }}
                            </a>
                        </p>
                    </td>
                    <td class="trtdthTwin">
                        <p>{{ twinSet.birthday }}</p>
                    </td>
                    <td class="trtdthTwin">
                        <p v-for="twin in twinSet.twins">
                            {{ twin.birthday.substring(twin.birthday.length - 4) }}
                        </p>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
import groupListEdit from "@/groupListEdit.json";

export default {
    name: "Birthdays",
    data() {
        return {
            groups: groupListEdit,
            years: [],
            months: [],
            currentList: [],
        };
    },
    mounted() {
        let yearArray = [];
        let monthArray = [];

        for (let i = 0; i < this.groups.length; i++) {
            for (let j = 0; j < this.groups[i].members.length; j++) {
                let bday = this.groups[i].members[j].birthday;
                if (bday !== "n/a") {
                    yearArray.push(bday.substring(bday.length - 4));
                    monthArray.push(bday.substring(0, bday.indexOf(" ")));
                }
            }
        }

        yearArray = [...new Set(yearArray)].sort();
        monthArray = [...new Set(monthArray)].sort((a, b) => {
            const monthOrder = [
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
            ];
            return monthOrder.indexOf(a) - monthOrder.indexOf(b);
        });

        for (let i = 0; i < yearArray.length; i++) {
            this.years.push({
                name: yearArray[i],
                people: [],
                total: 0,
                twinnies: [],
                twinTotal: 0,
            });
        }

        for (let i = 0; i < monthArray.length; i++) {
            this.months.push({
                name: monthArray[i],
                people: [],
                total: 0,
                twinnies: [],
                twinTotal: 0,
            });
        }

        for (let i = 0; i < this.groups.length; i++) {
            for (let j = 0; j < this.groups[i].members.length; j++) {
                if (
                    this.groups[i].members[j].afr !== "a" &&
                    this.groups[i].members[j].afr !== "f"
                ) {
                    continue;
                }

                for (let k = 0; k < this.months.length; k++) {
                    if (this.groups[i].members[j].birthday.includes(this.months[k].name)) {
                        this.months[k].people.push(this.groups[i].members[j]);
                        this.months[k].total++;

                        this.months[k].people.sort(function (a, b) {
                            return new Date(a.birthday) - new Date(b.birthday);
                        });

                        this.months[k].people.sort(function (a, b) {
                            return a.birthday.match(/\d{2}/)[0] - b.birthday.match(/\d{2}/)[0];
                        });

                        break;
                    }
                }

                for (let k = 0; k < this.years.length; k++) {
                    if (this.groups[i].members[j].birthday.includes(this.years[k].name)) {
                        this.years[k].people.push(this.groups[i].members[j]);
                        this.years[k].total++;
                        break;
                    }
                    this.years[k].people.sort(function (a, b) {
                        return new Date(a.birthday) - new Date(b.birthday);
                    });
                }
            }
        }

        for (let i = 0; i < this.years.length; i++) {
            for (let j = 0; j < this.years[i].people.length - 1; j++) {
                let pj = this.years[i].people[j];
                let pjb = pj.birthday.substring(0, pj.birthday.indexOf(","));
                for (let k = j + 1; k < this.years[i].people.length; k++) {
                    let pk = this.years[i].people[k];
                    let pkb = pk.birthday.substring(0, pk.birthday.indexOf(","));
                    if (pjb === pkb) {
                        this.years[i].twinnies.push({
                            birthday: pjb,
                            twins: [pj, pk],
                        });
                    }
                }
            }

            for (let j = 1; j < this.years[i].twinnies.length - 1; j++) {
                let tj = this.years[i].twinnies[j];
                for (let k = 2; k < this.years[i].twinnies.length; k++) {
                    let tk = this.years[i].twinnies[k];
                    if (tj.birthday === tk.birthday) {
                        let merged = [...new Set([...tj.twins, ...tk.twins])];
                        this.years[i].twinnies[j].twins = merged;
                    }
                }
            }

            let bdayTrack = new Set();
            this.years[i].twinnies = this.years[i].twinnies.reduce((acc, curr) => {
                if (!bdayTrack.has(curr.birthday)) {
                    bdayTrack.add(curr.birthday);
                    acc.push(curr);
                }
                return acc;
            }, []);
            this.years[i].twinTotal = bdayTrack.size;
        }

        for (let i = 0; i < this.months.length; i++) {
            for (let j = 0; j < this.months[i].people.length - 1; j++) {
                let pj = this.months[i].people[j];
                let pjb = pj.birthday.substring(0, pj.birthday.indexOf(","));
                for (let k = j + 1; k < this.months[i].people.length; k++) {
                    let pk = this.months[i].people[k];
                    let pkb = pk.birthday.substring(0, pk.birthday.indexOf(","));
                    if (pjb === pkb) {
                        this.months[i].twinnies.push({
                            birthday: pjb,
                            twins: [pj, pk],
                        });
                    }
                }
            }

            for (let j = 1; j < this.months[i].twinnies.length - 1; j++) {
                let tj = this.months[i].twinnies[j];
                for (let k = 2; k < this.months[i].twinnies.length; k++) {
                    let tk = this.months[i].twinnies[k];
                    if (tj.birthday === tk.birthday) {
                        let merged = [...new Set([...tj.twins, ...tk.twins])];
                        this.months[i].twinnies[j].twins = merged;
                    }
                }
            }

            let bdayTrack = new Set();
            this.months[i].twinnies = this.months[i].twinnies.reduce((acc, curr) => {
                if (!bdayTrack.has(curr.birthday)) {
                    bdayTrack.add(curr.birthday);
                    acc.push(curr);
                }
                return acc;
            }, []);
            this.months[i].twinTotal = bdayTrack.size;
        }
        this.currentList = this.months;
    },
    methods: {
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
        switchList(list) {
            this.currentList = list;
        },
    },
};
</script>

<style scoped>
.diffList {
    background-color: #b3b8e9;
    border: 1px solid #b3b8e9;
    border-radius: 5px;
    box-shadow: 0 0.3em #888bb0;
    color: rgb(0, 0, 0);
    cursor: pointer;
    display: inline-block;
    font-size: 16px;
    margin: 25px 10px 0px;
    padding: 7px 15px;
    text-align: center;
    text-decoration: none;
    position: relative;
    top: 0;
    transition: all 300ms ease-in-out;
}

a {
    color: black;
    text-decoration: none;
}

a:hover {
    color: #3f50e7;
}

.birthdayDiv {
    border-radius: 10px;
    box-shadow: 0px 0px 5px black;
    float: left;
    margin: 20px;
    margin-right: 10px;
    padding: 0px;
    max-width: 630px;
    width: 60%;
}

.twinDiv {
    border-radius: 10px;
    box-shadow: 0px 0px 5px black;
    float: right;
    height: fit-content;
    margin: 20px;
    margin-right: 10px;
    max-width: 400px;
    width: 40%;
}

.monthName {
    background-image: linear-gradient(#b3b8e9, #747fe6);
    border-radius: 10px 10px 0px 0px;
    color: white;
    font-size: 30px;
    font-weight: bolder;
    line-height: 60px;
    /* margin: 40px auto 5px; */
    margin: 0px;
}

.twinTitleName {
    background-image: linear-gradient(#b3b8e9, #747fe6);
    border-radius: 10px 10px 0px 0px;
    color: white;
    font-size: 20px;
    font-weight: bolder;
    line-height: 40px;
    margin: 0px;
    padding-top: 10px;
}

table {
    border-collapse: collapse;
    margin: auto;
    padding: 10px;
    width: 100%;
}

.trtdth {
    padding: 10px;
    text-align: left;
}

.trtdthTwin {
    font-size: 90%;
    padding: 10px;
    text-align: left;
}

.trtdthTwin td,
th {
    padding-top: 1px;
    padding-bottom: 1px;
}

th {
    color: white;
}

tr {
    border-bottom: 1px solid black;
}

tr:nth-child(even) {
    background-color: rgb(220, 220, 220);
}

tr:nth-child(odd) {
    background-color: rgb(189, 189, 189);
}

tr:first-child {
    background-color: #747fe6;
}

tr:last-child {
    border-bottom: 1px solid rgba(0, 0, 0, 0);
}

tr:last-child td:first-child {
    border-bottom-left-radius: 10px;
}

tr:last-child td:last-child {
    border-bottom-right-radius: 10px;
}
</style>
