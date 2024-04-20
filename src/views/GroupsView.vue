<template>
  <div>
    <button @click="switchList('b')" class="diffList">Boy Groups</button>
    <button @click="switchList('g')" class="diffList">Girl Groups</button>
    <button @click="switchList('s')" class="diffList">Soloists</button>
  </div>
  <div class="listBox">
    <div v-for="group in currentList">
      <div class="groupDiv" @click="populateGroupPage(group)">
        <v-lazy-image class="groupPicList" :src="require('../assets/imageArchive/' + group.imgLink)" />
        <p class="groupNameList">{{ group.groupName }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import groupListEdit from "@/groupListEdit.json";
let selectedGroupArray = JSON.parse(localStorage.getItem("selectedGroup"));
import VLazyImage from "v-lazy-image";

export default {
  name: "GroupsView",
  components: {
    VLazyImage,
  },
  data: () => {
    return {
      groupsData: groupListEdit,
      currentList: [],
    };
  },
  methods: {
    populateGroupPage(group) {
      if (selectedGroupArray === null) {
        selectedGroupArray = [];
      }
      selectedGroupArray = group;
      localStorage.setItem("selectedGroup", JSON.stringify(selectedGroupArray));
      this.$router.push('/groupPage')
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
    switchList(list) {
      if (list === "b") {
        this.currentList = this.boyGroups;
      } else if (list === "g") {
        this.currentList = this.girlGroups;
      } else {
        this.currentList = this.solo;
      }
    },
  },
  computed: {
    boyGroups: function () {
      let arr = this.groupsData;
      return arr.filter((i) => i.bgs.indexOf("b") > -1);
    },
    girlGroups: function () {
      let arr = this.groupsData;
      return arr.filter((i) => i.bgs.indexOf("g") > -1);
    },
    solo: function () {
      let arr = this.groupsData;
      return arr.filter((i) => i.bgs.indexOf("s") > -1);
    },
  },
  mounted() {
    this.currentList = this.boyGroups;
  },
};
</script>

<style scoped>
.listBox {
  background: radial-gradient(#ffffff, #c7c7c7);
  border-radius: 10px;
  box-shadow: 0px 0px 5px black;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin: 25px auto 50px;
  padding: 10px 20px;
  width: 85%;
}

.listBox:after {
  content: "";
  clear: both;
  display: table;
}

.groupDiv {
  /* border: 1px solid red; */
  border-radius: 8px;
  cursor: pointer;
  float: left;
  height: fit-content;
  padding: 20px;
  text-align: center;
  width: 294px;
}

.groupDiv:hover {
  background-color: #b3b8e9;
}

.groupPicList {
  width: 254px;
  height: 170px;
  border-radius: 8px;
  object-fit: cover;
  /* border: 1px solid #848484; */
  /* box-shadow: 0px 0px 5px black; */
  filter: blur(5px);
  transition: filter 0.7s;
}

.v-lazy-image-loaded {
  filter: blur(0);
  box-shadow: 0px 0px 5px black;
}

.groupNameList {
  color: #551b8b;
  font-size: 20px;
  text-align: center;
  padding: 10px;
  padding-bottom: 0px;
  margin: 0px;
}

.groupNameList a {
  color: black;
  text-decoration: none;
}

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
</style>
