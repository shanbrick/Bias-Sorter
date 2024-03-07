<template>
    <div class="directoryBox">
        <p class="directory">
            <a href="#symbol">#</a>
            <a href="#A">A</a>
            <a href="#B">B</a>
            <a href="#C">C</a>
            <a href="#D">D</a>
            <a href="#E">E</a>
            <a href="#F">F</a>
            <a href="#G">G</a>
            <a href="#H">H</a>
            <a href="#I">I</a>
            <a href="#J">J</a>
            <a href="#K">K</a>
            <a href="#L">L</a>
            <a href="#M">M</a>
            <a href="#N">N</a>
            <a href="#O">O</a>
            <a href="#P">P</a>
            <a href="#Q">Q</a>
            <a href="#R">R</a>
            <a href="#S">S</a>
            <a href="#T">T</a>
            <a href="#U">U</a>
            <a href="#V">V</a>
            <a href="#W">W</a>
            <a href="#X">X</a>
            <a href="#Y">Y</a>
            <a href="#Z">Z</a>
        </p>
    </div>

    <div class="listBox">
        <div v-for="group in groupsData" class="groupDiv">
            <img class="groupPicList" :src="require('../assets' + group.groupImage)">
            <p class="groupNameList">{{ group.groupName }}</p>
        </div>
    </div>

    <div id="symbol" class="listBox">
        <p class="directory">#</p>
        <div class="groupDiv">
            <a href="group.html"><img class="groupPicList" src="../assets/imageArchive/&TEAM/group.jpeg"></a>
            <p class="groupNameList">
                <a href="group.html">&TEAM</a>
            </p>
        </div>
        <div class="groupDiv">
            <a href="group.html"><img class="groupPicList" src="../assets/imageArchive/8TURN/group.jpeg"></a>
            <p class="groupNameList">
                <a href="group.html">8TURN</a>
            </p>
        </div>
    </div>

    <div id="A" class="listBox">
        <p class="directory">A</p>
        <div class="groupDiv">
            <a href="group.html"><img class="groupPicList" src="../assets/default.jpeg"></a>
            <p class="groupNameList">
                <a href="group.html">A.C.E</a>
            </p>
        </div>
        <div class="groupDiv">
            <a href="group.html"><img class="groupPicList" src="../assets/imageArchive/AMPERS&ONE/group.jpeg"></a>
            <p class="groupNameList">
                <a href="group.html">AMPERS&ONE</a>
            </p>
        </div>
        <div class="groupDiv">
            <a href="group.html"><img class="groupPicList" src="../assets/default.jpeg"></a>
            <p class="groupNameList">
                <a href="group.html">ASTRO</a>
            </p>
        </div>
        <div class="groupDiv">
            <a href="group.html"><img class="groupPicList" src="../assets/imageArchive/ATEEZ/group.jpeg"></a>
            <p class="groupNameList">
                <a href="group.html">ATEEZ</a>
            </p>
        </div>
    </div>

    <div id="B" class="listBox">
        <p class="directory">B</p>
        <div class="groupDiv">
            <a href="group.html"><img class="groupPicList" src="../assets/default.jpeg"></a>
            <p class="groupNameList">
                <a href="group.html">BAE173</a>
            </p>
        </div>
        <div class="groupDiv">
            <a href="group.html"><img class="groupPicList" src="../assets/imageArchive/BLITZERS/group.jpeg"></a>
            <p class="groupNameList">
                <a href="group.html">BLITZERS</a>
            </p>
        </div>
        <div class="groupDiv">
            <a href="group.html"><img class="groupPicList" src="../assets/imageArchive/BOYNEXTDOOR/group.jpeg"></a>
            <p class="groupNameList">
                <a href="group.html">BOYNEXTDOOR</a>
            </p>
        </div>
        <div class="groupDiv">
            <a href="group.html"><img class="groupPicList" src="../assets/default.jpeg"></a>
            <p class="groupNameList">
                <a href="group.html">BTS</a>
            </p>
        </div>
    </div>

    <div id="C" class="listBox">
        <p class="directory">C</p>
        <div class="groupDiv">
            <a href="group.html"><img class="groupPicList" src="../assets/imageArchive/CIX/group.jpeg"></a>
            <p class="groupNameList">
                <a href="group.html">CIX</a>
            </p>
        </div>
        <div class="groupDiv">
            <a href="group.html"><img class="groupPicList" src="../assets/imageArchive/CRAVITY/group.jpeg"></a>
            <p class="groupNameList">
                <a href="group.html">CRAVITY</a>
            </p>
        </div>
    </div>

    <div id="D" class="listBox">
        <p class="directory">D</p>
        <div class="groupDiv">
            <a href="group.html"><img class="groupPicList" src="../assets/default.jpeg"></a>
            <p class="groupNameList">
                <a href="group.html">DAY6</a>
            </p>
        </div>
        <div class="groupDiv">
            <a href="group.html"><img class="groupPicList" src="../assets/default.jpeg"></a>
            <p class="groupNameList">
                <a href="group.html">DKB</a>
            </p>
        </div>
        <div class="groupDiv">
            <a href="group.html"><img class="groupPicList" src="../assets/default.jpeg"></a>
            <p class="groupNameList">
                <a href="group.html">DRIPPIN</a>
            </p>
        </div>
    </div>

    <div id="E" class="listBox">
        <p class="directory">E</p>
        <div class="groupDiv">
            <a href="group.html"><img class="groupPicList" src="../assets/imageArchive/ENHYPEN/group.jpeg"></a>
            <p class="groupNameList">
                <a href="group.html">ENHYPEN</a>
            </p>
        </div>
        <div class="groupDiv">
            <a href="group.html"><img class="groupPicList" src="../assets/default.jpeg"></a>
            <p class="groupNameList">
                <a href="group.html">EPEX</a>
            </p>
        </div>
        <div class="groupDiv">
            <a href="group.html"><img class="groupPicList" src="../assets/default.jpeg"></a>
            <p class="groupNameList">
                <a href="group.html">EXO</a>
            </p>
        </div>
    </div>

    <div id="F" class="listBox">
        <p class="directory">F</p>
    </div>

    <div id="G" class="listBox">
        <p class="directory">G</p>
        <div class="groupDiv">
            <a href="group.html"><img class="groupPicList" src="../assets/default.jpeg"></a>
            <p class="groupNameList">
                <a href="group.html">GHOST9</a>
            </p>
        </div>
        <div class="groupDiv">
            <a href="group.html"><img class="groupPicList" src="../assets/default.jpeg"></a>
            <p class="groupNameList">
                <a href="group.html">Golden Child</a>
            </p>
        </div>
        <div class="groupDiv">
            <a href="group.html"><img class="groupPicList" src="../assets/default.jpeg"></a>
            <p class="groupNameList">
                <a href="group.html">GOT7</a>
            </p>
        </div>
    </div>

    <div id="H" class="listBox">
        <p class="directory">H</p>
    </div>

    <div id="I" class="listBox">
        <p class="directory">I</p>
    </div>

    <div id="J" class="listBox">
        <p class="directory">J</p>
        <div class="groupDiv">
            <a href="group.html"><img class="groupPicList" src="../assets/default.jpeg"></a>
            <p class="groupNameList">
                <a href="group.html">JO1</a>
            </p>
        </div>
        <div class="groupDiv">
            <a href="group.html"><img class="groupPicList" src="../assets/default.jpeg"></a>
            <p class="groupNameList">
                <a href="group.html">JUSTB</a>
            </p>
        </div>
    </div>

    <div id="K" class="listBox">
        <p class="directory">K</p>
        <div class="groupDiv">
            <a href="group.html"><img class="groupPicList" src="../assets/default.jpeg"></a>
            <p class="groupNameList">
                <a href="group.html">KARD</a>
            </p>
        </div>
    </div>

    <div id="L" class="listBox">
        <p class="directory">L</p>
        <div class="groupDiv">
            <a href="group.html"><img class="groupPicList" src="../assets/default.jpeg"></a>
            <p class="groupNameList">
                <a href="group.html">LUN8</a>
            </p>
        </div>
    </div>

    <div id="M" class="listBox">
        <p class="directory">M</p>
        <div class="groupDiv">
            <a href="group.html"><img class="groupPicList" src="../assets/default.jpeg"></a>
            <p class="groupNameList">
                <a href="group.html">MCND</a>
            </p>
        </div>
        <div class="groupDiv">
            <a href="group.html"><img class="groupPicList" src="../assets/default.jpeg"></a>
            <p class="groupNameList">
                <a href="group.html">MIRAE</a>
            </p>
        </div>
        <div class="groupDiv">
            <a href="group.html"><img class="groupPicList" src="../assets/default.jpeg"></a>
            <p class="groupNameList">
                <a href="group.html">MONSTA X</a>
            </p>
        </div>
        <div class="groupDiv">
            <a href="group.html"><img class="groupPicList" src="../assets/default.jpeg"></a>
            <p class="groupNameList">
                <a href="group.html">M.O.N.T</a>
            </p>
        </div>
    </div>

    <div id="N" class="listBox">
        <p class="directory">N</p>
        <div class="groupDiv">
            <a href="group.html"><img class="groupPicList" src="../assets/default.jpeg"></a>
            <p class="groupNameList">
                <a href="group.html">NCT</a>
            </p>
        </div>
        <div class="groupDiv">
            <a href="group.html"><img class="groupPicList" src="../assets/default.jpeg"></a>
            <p class="groupNameList">
                <a href="group.html">N.Flying</a>
            </p>
        </div>
        <div class="groupDiv">
            <a href="group.html"><img class="groupPicList" src="../assets/default.jpeg"></a>
            <p class="groupNameList">
                <a href="group.html">NINE.i</a>
            </p>
        </div>
    </div>

    <div id="O" class="listBox">
        <p class="directory">O</p>
        <div class="groupDiv">
            <a href="group.html"><img class="groupPicList" src="../assets/default.jpeg"></a>
            <p class="groupNameList">
                <a href="group.html">ONE PACT</a>
            </p>
        </div>
        <div class="groupDiv">
            <a href="group.html"><img class="groupPicList" src="../assets/default.jpeg"></a>
            <p class="groupNameList">
                <a href="group.html">OnlyOneOf</a>
            </p>
        </div>
    </div>

    <div id="P" class="listBox">
        <p class="directory">P</p>
        <div class="groupDiv">
            <a href="group.html"><img class="groupPicList" src="../assets/imageArchive/P1Harmony/group.jpeg"></a>
            <p class="groupNameList">
                <a href="group.html">P1Harmony</a>
            </p>
        </div>
    </div>

    <div id="Q" class="listBox">
        <p class="directory">Q</p>
    </div>

    <div id="R" class="listBox">
        <p class="directory">R</p>
        <div class="groupDiv">
            <a href="group.html"><img class="groupPicList" src="../assets/imageArchive/RIIZE/group.jpeg"></a>
            <p class="groupNameList">
                <a href="group.html">RIIZE</a>
            </p>
        </div>
    </div>

    <div id="S" class="listBox">
        <p class="directory">S</p>
        <div class="groupDiv">
            <a href="group.html"><img class="groupPicList" src="../assets/default.jpeg"></a>
            <p class="groupNameList">
                <a href="group.html">SEVENTEEN</a>
            </p>
        </div>
        <div class="groupDiv">
            <a href="group.html"><img class="groupPicList" src="../assets/default.jpeg"></a>
            <p class="groupNameList">
                <a href="group.html">SF9</a>
            </p>
        </div>
        <div class="groupDiv">
            <a href="group.html"><img class="groupPicList" src="../assets/default.jpeg"></a>
            <p class="groupNameList">
                <a href="group.html">SHINee</a>
            </p>
        </div>
        <div class="groupDiv">
            <a href="group.html"><img class="groupPicList" src="../assets/default.jpeg"></a>
            <p class="groupNameList">
                <a href="group.html">Stray Kids</a>
            </p>
        </div>
    </div>

    <div id="T" class="listBox">
        <p class="directory">T</p>
        <div class="groupDiv">
            <a href="group.html"><img class="groupPicList" src="../assets/default.jpeg"></a>
            <p class="groupNameList">
                <a href="group.html">TAN</a>
            </p>
        </div>
        <div class="groupDiv">
            <a href="group.html"><img class="groupPicList" src="../assets/default.jpeg"></a>
            <p class="groupNameList">
                <a href="group.html">TEMPEST</a>
            </p>
        </div>
        <div class="groupDiv">
            <a href="group.html"><img class="groupPicList" src="../assets/default.jpeg"></a>
            <p class="groupNameList">
                <a href="group.html">TFN</a>
            </p>
        </div>
        <div class="groupDiv">
            <a href="group.html"><img class="groupPicList" src="../assets/default.jpeg"></a>
            <p class="groupNameList">
                <a href="group.html">THE BOYZ</a>
            </p>
        </div>
        <div class="groupDiv">
            <a href="group.html"><img class="groupPicList" src="../assets/default.jpeg"></a>
            <p class="groupNameList">
                <a href="group.html">TREASURE</a>
            </p>
        </div>
        <div class="groupDiv">
            <a href="group.html"><img class="groupPicList" src="../assets/default.jpeg"></a>
            <p class="groupNameList">
                <a href="group.html">TWS</a>
            </p>
        </div>
        <div class="groupDiv">
            <a href="group.html"><img class="groupPicList" src="../assets/default.jpeg"></a>
            <p class="groupNameList">
                <a href="group.html">TXT</a>
            </p>
        </div>
    </div>

    <div id="U" class="listBox">
        <p class="directory">U</p>
    </div>

    <div id="V" class="listBox">
        <p class="directory">V</p>
        <div class="groupDiv">
            <a href="group.html"><img class="groupPicList" src="../assets/default.jpeg"></a>
            <p class="groupNameList">
                <a href="group.html">VERIVERY</a>
            </p>
        </div>
    </div>

    <div id="W" class="listBox">
        <p class="directory">W</p>
        <div class="groupDiv">
            <a href="group.html"><img class="groupPicList" src="../assets/default.jpeg"></a>
            <p class="groupNameList">
                <a href="group.html">WEi</a>
            </p>
        </div>
    </div>

    <div id="X" class="listBox">
        <p class="directory">X</p>
        <div class="groupDiv">
            <a href="group.html"><img class="groupPicList" src="../assets/imageArchive/XdinaryHeroes/group.jpeg"></a>
            <p class="groupNameList">
                <a href="group.html">Xdinary Heroes</a>
            </p>
        </div>
        <div class="groupDiv">
            <a href="group.html"><img class="groupPicList" src="../assets/imageArchive/xikers/group.jpeg"></a>
            <p class="groupNameList">
                <a href="group.html">xikers</a>
            </p>
        </div>
    </div>

    <div id="Y" class="listBox">
        <p class="directory">Y</p>
    </div>

    <div id="Z" class="listBox">
        <p class="directory">Z</p>
        <div class="groupDiv">
            <a href="group.html"><img class="groupPicList" src="../assets/imageArchive/ZEROBASEONE/group.jpeg"></a>
            <p class="groupNameList">
                <a href="group.html">ZEROBASEONE</a>
            </p>
        </div>
    </div>
</template>

<script>
import groupListEdit from '@/groupListEdit.json'
export default {
    name: 'BGView',
    data: () => {
        return { groupsData : groupListEdit }
    },
    mounted() {
        this.$router.push({ path: '/groupPage', params: { data } })
    }
}
</script>

<style>
.directoryBox {
    height: 400px;
    width: 100px;
    position: fixed;
    z-index: 1;
    overflow-x: hidden; /* disable horizontal scroll */
    overflow-y:auto;
    background-color: #ffffff;
    border: 1px solid #B0B0B0;
    border-radius: 10px;
    padding: 0px;
    margin: 20px;
}
.directory {
    padding-left: 0px;
    padding-top: 0px;
    font-size: 30px;
    line-height: 0px;
}
.directory a {
    float: left;
    font-size: 20px;
    display: block;
    color: black;
    padding: 5px;
    padding-top: 0px;
    margin: 10px;
    text-align: center;
}

.listBox {
    background-color: white;
    margin: 20px;
    margin-left: 140px;
    padding: 10px;
    padding-left: 20px;
    padding-right: 20px;
    border-radius: 10px;
    border: 1px solid #B0B0B0;
}
.listBox:after {
    content: "";
    display: table;
    clear: both;
}

.groupDiv {
    float: left;
    height: fit-content;
    width: 340px;
    text-align: center;
    padding:10px;
    padding-left: 20px;
    padding-right: 20px;
    border: 1px solid red;
}
.groupPicList {
    width: 300px;
    border-radius: 8px;
}
.groupNameList {
    font-size: 18px;
    text-align: center;
    padding: 10px;
    margin: 0px;
}
.groupNameList a {
    color:black;
    text-decoration: none;
}
</style>