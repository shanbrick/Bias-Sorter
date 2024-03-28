<template>
    <div v-for="month in months">
        <p>{{ month.monthName }}</p>
        <p v-for="person in month.people">{{ person.stageName }} - {{ person.birthday }}</p>
    </div>
</template>

<script>
import groupListEdit from "@/groupListEdit.json";

export default {
    name: "Birthdays",
    data() {
        return {
            groups: groupListEdit,
            months: [
                {
                    monthName: "January",
                    people: [],
                },
                {
                    monthName: "February",
                    people: [],
                },
                {
                    monthName: "March",
                    people: [],
                },
                {
                    monthName: "April",
                    people: [],
                },
                {
                    monthName: "May",
                    people: [],
                },
                {
                    monthName: "June",
                    people: [],
                },
                {
                    monthName: "July",
                    people: [],
                },
                {
                    monthName: "August",
                    people: [],
                },
                {
                    monthName: "September",
                    people: [],
                },
                {
                    monthName: "October",
                    people: [],
                },
                {
                    monthName: "November",
                    people: [],
                },
                {
                    monthName: "December",
                    people: [],
                },
            ],
        };
    },
    mounted() {
        for (let i = 0; i < this.groups.length; i++) {
            for (let j = 0; j < this.groups[i].members.length; j++) {
                for (let k = 0; k < this.months.length; k++) {
                    if (this.groups[i].members[j].birthday.includes(this.months[k].monthName)) {
                        this.months[k].people.push(this.groups[i].members[j]);

                        this.months[k].people.sort(function (a, b) {
                            return a.birthday.match(/\d{2}/)[0] - b.birthday.match(/\d{2}/)[0];
                        });
                    }
                }
            }
        }
    },
};
</script>
