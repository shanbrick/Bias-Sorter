<template>
  <button @click="switchList(b)">Boy Groups</button>
  <button @click="switchList(g)">Girl Groups</button>
  <button @click="switchList(s)">Soloists</button>
  <div class="listBox">
    <div v-for="group in groupsData">
      <div class="groupDiv" v-if="group.bgs === 'b' || group.bgs === 'bg'">
        <a href="/groupPage" style="text-decoration: none" @click="populateGroupPage(group)">
          <img class="groupPicList" :src="require('../assets/imageArchive/' + group.groupImage)" />
          <p class="groupNameList">{{ group.groupName }}</p>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import groupListEdit from "@/groupListEdit.json";
let selectedGroupArray = JSON.parse(localStorage.getItem("selectedGroup"));

export default {
  name: "BGView",
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
    },
    computed: {
      boyGroups: function () {
        let arr = this.groupsData;
        return arr.filter((i) => i.bgs === "b");
      },
      girlGroups: function () {
        let arr = this.groupsData;
        return arr.filter((i) => i.bgs !== "g");
      },
      solo: function () {
        let arr = this.groupsData;
        return arr.filter((i) => i.bgs !== "s");
      },
    },
  },
};
</script>

<style>
.listBox {
  background: radial-gradient(#ffffff, #c7c7c7);
  border-radius: 10px;
  box-shadow: 0px 0px 5px black;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin: 40px auto 50px;
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
  box-shadow: 0px 0px 5px black;
}

.groupNameList {
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
</style>
