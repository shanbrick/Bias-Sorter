<template>
    <div id="unsorted" class="unsorted">
        <div class="boxHeaderUnsorted">
            <p class="categoryTitle">Unsorted</p>
        </div>
        <div v-for="person in unsorted" class="peopleUnsorted">
            <img class="homePage" :src="require('../assets' + person.imgLink)">
            <p class="idolName">{{ person.stageName }}</p>
            <p class="groupName">{{ person.groupName }}</p>
        </div>
    </div>

    <div class="sideCats">
        <div v-for="cat in categoryArray" class="categories">
            <div class="boxHeaderCategories">
                <p class="categoryTitle">{{ cat }}</p>
            </div>
            <div id="{{cat}}">
                <p>hi</p>
            </div>
        </div>

    </div>
    <div class="sideCats">
        <button @click="addNewCategory('Untitled')"> + </button>
    </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

// let categoryArray = ["Ults", "Semis", "Regs"];
localStorage.setItem('categories', JSON.stringify(["Ults", "Semis", "Regs"]));

export default {
    name: 'HomeView',
    components: {
        HelloWorld
    },
    props: [

    ],
    mounted() {

    },
    data() {
        return { unsorted: JSON.parse(localStorage.getItem('unsorted')), categoryArray: JSON.parse(localStorage.getItem('categories')) }
    },
    computed: {

    },
    methods: {
        addNewCategory(title) {
            this.categoryArray.push(title)
            localStorage.setItem('categories', JSON.stringify(this.categoryArray));
        }
    }
}
</script>

<style scoped>
.unsorted {
    height: 60%;
    width: 342px;
    position: fixed;
    z-index: 1;
    overflow-x: hidden;
    /* disable horizontal scroll */
    background-color: #ffffff;
    border-bottom: 1px solid #B0B0B0;
    border-left: 1px solid #B0B0B0;
    border-right: 1px solid #B0B0B0;
    padding: 10px;
    padding-left: 0px;
    padding-right: 0px;
    margin: 20px;
    margin-top: 65px;
    border-radius: 0px 0px 10px 10px;
}

.boxHeaderUnsorted {
    height: 45px;
    width: 342px;
    background-color: #b3b8e9;
    border-top: 1px solid #B0B0B0;
    border-left: 1px solid #B0B0B0;
    border-right: 1px solid #B0B0B0;
    border-radius: 10px 10px 0px 0px;
    padding-left: 20px;
    margin-top: -55px;
    margin-left: -1px;
    margin-bottom: 15px;
    position: fixed;
}

.sideCats {
    margin-left: 375px;
}

.categories {
    margin: 20px;
    margin-top: 65px;
    position: relative;
    background-color: #ffffff;
    padding: 10px;
    padding-left: 0px;
    padding-right: 0px;
    border-radius: 0px 0px 10px 10px;
    border-bottom: 1px solid #B0B0B0;
    border-left: 1px solid #B0B0B0;
    border-right: 1px solid #B0B0B0;
}

.categoryTitle {
    top: -8px;
    position: absolute;
    z-index: 1;
    color: white;
    font-size: 20px;
    font-weight: 700;
}

.categories:after {
    content: "";
    display: table;
    clear: both;
}

.boxHeaderCategories {
    height: 45px;
    background-color: #b3b8e9;
    border-top: 1px solid B0B0B0;
    border-left: 1px solid #B0B0B0;
    border-right: 1px solid #B0B0B0;
    border-radius: 10px 10px 0px 0px;
    padding: 20px;
    margin-top: -55px;
    /*padding categories + boxheader height*/
    margin-bottom: 10px;
    margin-left: -1px;
    /* categories padding*/
    margin-right: -1px;
    position: relative;
}

.idolName {
    text-align: center;
    font-size: 15px;
    margin: 5px;
    font-weight: bold;
    color: black;
}

.groupName {
    text-align: center;
    margin: 5px;
    font-size: 0.75em;
}

.peopleUnsorted {
    float: left;
    height: fit-content;
    width: 170px;
    text-align: center;
    padding: 10px;
    padding-left: 0px;
    padding-right: 0px;
    /* border: 1px solid red; */
}

.homePage {
    width: 130px;
    border-radius: 8px;
    margin: 0px;
    padding: 0px;
}

button {
    border: 1px solid #B0B0B0;
    border-radius: 5px;
    color: white;
    background-color: #b3b8e9;
    padding: 7px 15px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
}
</style>
