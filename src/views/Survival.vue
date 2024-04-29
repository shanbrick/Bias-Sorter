<template>
    <table>
        <tr>
            <th>Name</th>
            <th>1st Elim</th>
            <th>2nd Elim</th>
            <th>3rd Elim</th>
            <th>Final Ep</th>
            <th>Avg. Place</th>
            <th>Group</th>
        </tr>
        <tr v-for="contestant in boysPlanet[0].contestants">
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
    <div v-for="(round, i) in boysPlanet[0].rounds">
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
</template>

<script>
import groupListEdit from "@/groupListEdit.json";
import boysPlanet from '@/jsons/BoysPlanet.json'

export default {
    name: 'Survival',
    data() {
        return {
            boysPlanet: boysPlanet,
            groups: groupListEdit
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