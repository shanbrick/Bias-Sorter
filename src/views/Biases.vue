<template>
    <div>
        <button @click="switchList(0)" class="diffList">Everyone</button>
        <button @click="switchList(1)" class="diffList">Categories</button>
    </div>
    <!-- <p>{{ fireSaveData }}</p> -->
    <div v-if="currentList === 0">
        <table id="listTable">
            <tr>
                <th @click="sortTableABC(0)">Group</th>
                <th @click="sortTableABC(1)">Stage Name</th>
                <th @click="sortTableABC(2)"></th>
                <th @click="sortTableABC(3)">Full Name</th>
                <th @click="sortTableABC(4)"></th>
                <th @click="sortTableDate(5)">Birthday</th>
                <th @click="sortTableABC(6)">Category</th>
            </tr>
            <tr v-for="person in combinedList">
                <td>{{ person.grpName }}</td>
                <td>{{ person.stageName }}</td>
                <td>{{ person.stageKR }}</td>
                <td>{{ person.fullName }}</td>
                <td>{{ person.fullKR }}</td>
                <td>{{ person.birthday }}</td>
                <td>{{ person.list }}</td>
            </tr>
        </table>
    </div>
    <div v-if="currentList === 1">
        <table v-for="category in fireSaveData.categories.slice(1)" id="listTable">
            <tr>
                <th @click="sortTableABC(0)">Group</th>
                <th @click="sortTableABC(1)">Stage Name</th>
                <th @click="sortTableABC(2)"></th>
                <th @click="sortTableABC(3)">Full Name</th>
                <th @click="sortTableABC(4)"></th>
                <th @click="sortTableDate(5)">Birthday</th>
            </tr>
            <tr v-for="person in category.people">
                <td>{{ person.grpName }}</td>
                <td>{{ person.stageName }}</td>
                <td>{{ person.stageKR }}</td>
                <td>{{ person.fullName }}</td>
                <td>{{ person.fullKR }}</td>
                <td>{{ person.birthday }}</td>
            </tr>
        </table>
    </div>
</template>

<script>
import {
    getAuth,
    onAuthStateChanged,
} from "firebase/auth";

export default {
    name: 'Biases',
    data() {
        return {
            currUser: {},
            currentList: 0,
            fireSaveData: {},
            combinedList: {}
        }
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
                if (this.fireSaveData.groupCategories === undefined) {
                    this.$db.collection("users").doc(this.currUser.uid).set(
                        {
                            "groupCategories": [
                                {
                                    "catName": "Unsorted",
                                    "groups": []
                                },
                                {
                                    "catName": "Ults",
                                    "groups": []
                                },
                                {
                                    "catName": "Semis",
                                    "groups": []
                                },
                                {
                                    "catName": "Regs",
                                    "groups": []
                                }
                            ]
                        }, { merge: true }
                    );
                }
                this.combinedList = this.combineLists(saveData);
            } else {
                const saveData = await this.$db.collection("users").doc(currentUser.uid).set(
                    {
                        "categories": [
                            {
                                "catName": "Unsorted",
                                "people": []
                            },
                            {
                                "catName": "Ults",
                                "people": []
                            },
                            {
                                "catName": "Semis",
                                "people": []
                            },
                            {
                                "catName": "Regs",
                                "people": []
                            }
                        ]
                    }
                );
            }
        },
        combineLists(saveData) {
            let combined = [];
            for (let i = 1; i < saveData.categories.length; i++) {
                for (let j = 0; j < saveData.categories[i].people.length; j++) {
                    let pers = saveData.categories[i].people[j];
                    combined.push(
                        {
                            "grpName": pers.grpName,
                            "stageName": pers.stageName,
                            "stageKR": pers.stageKR,
                            "fullName": pers.fullName,
                            "fullKR": pers.fullKR,
                            "birthday": pers.birthday,
                            "imgLink": pers.imgLink,
                            "afr": pers.afr,
                            "list": saveData.categories[i].catName
                        }
                    )
                }
            }
            for (let i = 0; i < saveData.categories[0].people.length; i++) {
                let pers = saveData.categories[0].people[i];
                combined.push(
                    {
                        "grpName": pers.grpName,
                        "stageName": pers.stageName,
                        "stageKR": pers.stageKR,
                        "fullName": pers.fullName,
                        "fullKR": pers.fullKR,
                        "birthday": pers.birthday,
                        "imgLink": pers.imgLink,
                        "afr": pers.afr,
                        "list": saveData.categories[0].catName
                    }
                )
            }
            return combined;
        },
        sortTableABC(n) {
            var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
            table = document.getElementById("listTable");
            switching = true;

            dir = "asc";

            while (switching) {
                switching = false;
                rows = table.rows;

                for (i = 1; i < (rows.length - 1); i++) {
                    shouldSwitch = false;

                    x = rows[i].getElementsByTagName("TD")[n];
                    y = rows[i + 1].getElementsByTagName("TD")[n];

                    if (dir == "asc") {
                        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                            shouldSwitch = true;
                            break;
                        }
                    } else if (dir == "desc") {
                        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                            shouldSwitch = true;
                            break;
                        }
                    }
                }
                if (shouldSwitch) {
                    rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                    switching = true;
                    switchcount++;
                } else {
                    if (switchcount == 0 && dir == "asc") {
                        dir = "desc";
                        switching = true;
                    }
                }
            }
        },
        sortTableDate(n) {
            var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
            table = document.getElementById("listTable");
            switching = true;

            dir = "asc";

            while (switching) {
                switching = false;
                rows = table.rows;

                for (i = 1; i < (rows.length - 1); i++) {
                    shouldSwitch = false;

                    x = rows[i].getElementsByTagName("TD")[n];
                    y = rows[i + 1].getElementsByTagName("TD")[n];

                    if (dir == "asc") {
                        if (new Date(x.innerHTML) > new Date(y.innerHTML)) {
                            shouldSwitch = true;
                            break;
                        }
                    } else if (dir == "desc") {
                        if (new Date(x.innerHTML) < new Date(y.innerHTML)) {
                            shouldSwitch = true;
                            break;
                        }
                    }
                }
                if (shouldSwitch) {
                    rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                    switching = true;
                    switchcount++;
                } else {
                    if (switchcount == 0 && dir == "asc") {
                        dir = "desc";
                        switching = true;
                    }
                }
            }
        },
        switchList(list) {
            console.log(list);
            if (list === 0) {
                this.currentList = 0;
            } else {
                this.currentList = 1;
            }
        },
    }
}
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

.diffList:hover {
    top: 0.2em;
    box-shadow: 0 0.2em #888bb0;
}

.diffList:active {
    top: 0.4em;
    box-shadow: 0 0em #888bb0;
}

table {
    border-collapse: collapse;
    border-radius: 10px;
    box-shadow: 0px 0px 5px black;
    margin: auto;
    margin-top: 30px;
    margin-bottom: 40px;
    padding: 10px;
    max-width: 1000px;
    width: 100%;
    text-align: left;
}

th {
    color: white;
    cursor: pointer;
    padding: 15px 10px;
}

tr,
td {
    padding: 10px;
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
    background-image: linear-gradient(#b3b8e9, #747fe6);
}

tr:last-child {
    border-bottom: 1px solid rgba(0, 0, 0, 0);
}

tr:first-child th:first-child {
    border-top-left-radius: 10px;
}

tr:first-child th:last-child {
    border-top-right-radius: 10px;
}

tr:last-child td:first-child {
    border-bottom-left-radius: 10px;
}

tr:last-child td:last-child {
    border-bottom-right-radius: 10px;
}
</style>