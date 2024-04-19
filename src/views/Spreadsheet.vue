<template>
    <!-- <p>{{ fireSaveData }}</p> -->
    <table id="listTable">
        <tr>
            <th @click="sortTable(0)">Group</th>
            <th @click="sortTable(1)">Stage Name</th>
            <th @click="sortTable(2)"></th>
            <th @click="sortTable(3)">Full Name</th>
            <th @click="sortTable(4)"></th>
            <th @click="sortTable(5)">Birthday</th>
            <th @click="sortTable(6)">Category</th>
        </tr>
        <tr v-for="person in fireSaveData">
            <td>{{ person.grpName }}</td>
            <td>{{ person.stageName }}</td>
            <td>{{ person.stageKR }}</td>
            <td>{{ person.fullName }}</td>
            <td>{{ person.fullKR }}</td>
            <td>{{ person.birthday }}</td>
            <td>{{ person.list }}</td>
        </tr>
    </table>
</template>

<script>
import {
    getAuth,
    onAuthStateChanged,
} from "firebase/auth";

export default {
    name: 'Spreadsheet',
    data() {
        return {
            currUser: {},
            fireSaveData: {},
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
                this.fireSaveData = this.combineLists(saveData);
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
        sortTable(n) {
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
        }
    }
}
</script>

<style scoped>
table {
    border-collapse: collapse;
    border-radius: 10px;
    box-shadow: 0px 0px 5px black;
    margin: auto;
    margin-top: 40px;
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