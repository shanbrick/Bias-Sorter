<template>
    <div style="text-align: center;">
        <select v-model="showSelection">
            <option v-for="option in showOptions" :value="option">{{ option }}</option>
        </select>
    </div>

    <div v-show="currentShow.showTitle !== ''">
        <div>
            <button @click="switchList(0)">Contestants</button>
            <button @click="switchList(1)">Rounds</button>
        </div>
        <table v-show="currentList === currentShow.contestants" id="conTable" class="conTable">
            <tr>
                <th @click="sortTableABC(0, 'conTable')">Name</th>
                <th @click="sortTableNum(1, 'conTable')">1st Elim</th>
                <th @click="sortTableNum(2, 'conTable')">2nd Elim</th>
                <th @click="sortTableNum(3, 'conTable')">3rd Elim</th>
                <th @click="sortTableNum(4, 'conTable')">Final Ep</th>
                <th @click="sortTableNum(5, 'conTable')">Avg. Place</th>
                <th @click="sortTableABC(6, 'conTable')">Group</th>
            </tr>
            <tr v-for="contestant in currentShow.contestants">
                <td>{{ contestant.name }}</td>
                <td>{{ contestant.firstElim }}</td>
                <td>{{ contestant.secondElim }}</td>
                <td>{{ contestant.thirdElim }}</td>
                <td>{{ contestant.finalEp }}</td>
                <td>{{ contestant.avgPlace }}</td>
                <td class="group" @click="populateGroupPage(contestant.group)" v-if="contestant.group !== '-'">{{
                    contestant.group }}</td>
                <td v-else>-</td>
            </tr>
        </table>
        <div v-show="currentList === currentShow.rounds" v-for="(round, i) in currentShow.rounds">
            <p>{{ round.roundName }}</p>
            <div v-if="i === 1" v-for="cat in round.performances">
                <p>{{ cat.type }}</p>
                <table>
                    <tr>
                        <th>Original Artist</th>
                        <th>Song</th>
                        <th>Team Name</th>
                        <th>Contestants</th>
                    </tr>
                    <tr v-for="performance in cat.pf">
                        <td>{{ performance.ogArtist }}</td>
                        <td>{{ performance.songName }}</td>
                        <td>{{ performance.teamName }}</td>
                        <td>
                            <p v-for="contestant in performance.contestants">{{ contestant }}</p>
                        </td>
                    </tr>
                </table>
            </div>
            <div v-else>
                <table>
                    <tr>
                        <th>Original Artist</th>
                        <th>Song</th>
                        <th>Team Name</th>
                        <th>Contestants</th>
                    </tr>
                    <tr v-for="performance in round.performances">
                        <td>{{ performance.ogArtist }}</td>
                        <td>{{ performance.songName }}</td>
                        <td>{{ performance.teamName }}</td>
                        <td>
                            <p v-for="contestant in performance.contestants">{{ contestant }}</p>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import groupList from "@/jsons/groupList.json";

import p101s1 from '@/jsons/survivalShows/Produce101S1.json'
import p101s2 from '@/jsons/survivalShows/Produce101S2.json'
import p48 from '@/jsons/survivalShows/Produce48.json'
import px101 from '@/jsons/survivalShows/ProduceX101.json'
import girlsPlanet from '@/jsons/survivalShows/GirlsPlanet999.json'
import boysPlanet from '@/jsons/survivalShows/BoysPlanet.json'

export default {
    name: 'Survival',
    data() {
        return {
            p101s1: p101s1,
            p101s2: p101s2,
            p48: p48,
            px101: px101,
            girlsPlanet: girlsPlanet,
            boysPlanet: boysPlanet,
            groups: groupList,
            showSelection: '',
            showOptions: [
                'Produce 101 Season 1 (2016)',
                'Produce 101 Season 2 (2017)',
                'Produce 48 (2018)',
                'Produce X 101 (2019)',
                'Girls Planet 999 (2021)',
                'Boys Planet (2023)'
            ],
            currentShow: { "showTitle": "" },
            currentList: 0,
        }
    },
    watch: {
        showSelection(show) {
            if (show === this.showOptions[0]) {

            } else if (show === this.showOptions[1]) {
            } else if (show === this.showOptions[2]) {
            } else if (show === this.showOptions[3]) {
            } else if (show === this.showOptions[4]) {
            } else if (show === this.showOptions[5]) {
                this.currentShow = this.boysPlanet;
            }
        }
    },
    methods: {
        findElim(name, round) {
            for (let i = 0; i < this.boysPlanet[0].contestants; i++) {
                if (this.boysPlanet[0].contestants[i].name === name) {
                    if (round === "0") {
                        return contestants[i].firstElim;
                    } else if (round === "1") {
                        return contestants[i].secondElim;
                    } else if (round === "2") {
                        return contestants[i].thirdElim;
                    } else if (round === "3") {
                        return contestants[i].finalEp;
                    }
                }
            }
        },
        sortTableABC(n, id) {
            var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
            table = document.getElementById(id);
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
        sortTableNum(n, id) {
            var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
            table = document.getElementById(id);
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
                        if (Number(x.innerHTML) > Number(y.innerHTML)) {
                            shouldSwitch = true;
                            break;
                        }
                    } else if (dir == "desc") {
                        if (Number(x.innerHTML) < Number(y.innerHTML)) {
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
            if (list === 0) {
                this.currentList = this.currentShow.contestants;
            } else {
                this.currentList = this.currentShow.rounds;
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
            this.$router.push('/groupPage')
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        }
    }
}
</script>

<style scoped>
.group:hover {
    color: violet;
    cursor: pointer;
}

table {
    border-collapse: collapse;
    border-radius: 10px;
    box-shadow: 0px 0px 5px black;
    margin: 20px auto;
    text-align: left;
}

th,
td {
    padding: 10px;
}

.conTable th:hover {
    cursor: pointer;
}

tr:nth-child(even) {
    background-color: rgb(220, 220, 220);
}

tr:nth-child(odd) {
    background-color: rgb(189, 189, 189);
}

tr:first-child {
    background-image: linear-gradient(#b3b8e9, #747fe6);
    color: white;
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