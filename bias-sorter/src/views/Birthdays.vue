<template>
    <button @click="switchList(months)">By Month</button>
    <button @click="switchList(years)">By Year</button>
    <div class="birthdayDiv" v-for="category in currentList">
        <p class="monthName">{{ category.name }} - {{ category.total }}</p>
        <table>
            <tr class="trtdth">
                <th class="trtdth">Group Name</th>
                <th class="trtdth">Stage Name</th>
                <th class="trtdth">Full Name</th>
                <th class="trtdth">Birthday</th>
            </tr>
            <tr class="trtdth" v-for="person in category.people">
                <td class="trtdth" v-if="person.grpName === person.stageName">Solo</td>
                <td class="trtdth" v-else>
                    {{ person.grpName }}<span v-if="person.afr === 'f'"> (ex)</span>
                </td>
                <td class="trtdth">
                    {{ person.stageName }}
                    <span v-if="person.birthday === 'September 30, 2002'" style="font-size: 17px; line-height: 10px">
                        ★</span>
                </td>
                <td class="trtdth">{{ person.fullName }}</td>
                <td class="trtdth">{{ person.birthday }}</td>
            </tr>
        </table>
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
            });
        }

        for (let i = 0; i < monthArray.length; i++) {
            this.months.push({
                name: monthArray[i],
                people: [],
                total: 0,
                twinnies: [],
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

        this.findTwinnies(this.years);
        this.findTwinnies(this.months);
        console.log(this.months);
        this.currentList = this.months;
    },
    methods: {
        populateGroupPage(grpName) {
            if (this.selectedGroupArray === null) {
                this.selectedGroupArray = [];
            }
            for (let i = 0; i < this.groups.length; i++) {
                if (this.groups[i].groupName === grpName) {
                    this.selectedGroupArray = this.groups[i];
                    break;
                }
            }
            localStorage.setItem("selectedGroup", JSON.stringify(this.selectedGroupArray));
        },
        findTwinnies(list) {
            for (let i = 0; i < list.length; i++) {
                for (let j = 0; j < list[i].people.length; j++) {
                    let pj = list[i].people[j];
                    let pjb = pj.birthday.substring(0, pj.birthday.indexOf(","));
                    if (this.bdayInTwinnies(pjb, list[i].twinnies) > -1) {
                        console.log("ur bday already here,", pj.stageName);
                        continue;
                    }
                    for (let k = j + 1; k < list[i].people.length; k++) {
                        let pk = list[i].people[k];
                        let pkb = pk.birthday.substring(0, pk.birthday.indexOf(","));
                        if (pjb === pkb) {
                            let num = this.bdayInTwinnies(pjb, list[i].twinnies);
                            console.log(pjb, pkb, num);
                            if (num > -1) {
                                list[i].twinnies[num].twins.push(pk);
                            } else {
                                list[i].twinnies.push({
                                    birthday: pjb,
                                    twins: [pj, pk],
                                });
                            }
                        }
                    }
                }
            }
        },
        bdayInTwinnies(bday, twinnies) {
            console.log(twinnies);
            for (let i = 0; i < twinnies.length; i++) {
                let tb = twinnies[i].birthday.substring(0, twinnies[i].birthday.indexOf(","));
                let result;
                console.log("bday", bday, " tb", tb);
                if (bday === tb) {
                    console.log("tb", tb);
                    result = i;
                    break;
                } else {
                    result = -1;
                }
                return result;
            }
        },
        switchList(list) {
            this.currentList = list;
        },
    },
};
</script>

<style scoped>
.birthdayDiv {
    background-color: #747fe6;
    border-radius: 10px;
    box-shadow: 0px 0px 5px black;
    margin: 20px auto auto;
    max-width: 650px;
    width: 70%;
}

.monthName {
    background-image: linear-gradient(#b3b8e9, #747fe6);
    border-radius: 10px 10px 0px 0px;
    color: white;
    font-size: 30px;
    font-weight: bolder;
    line-height: 60px;
    margin: 40px auto 5px;
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
