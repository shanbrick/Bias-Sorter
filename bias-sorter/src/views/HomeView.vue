<template>
    <div id="unsorted" class="unsorted">
        <div class="boxHeaderUnsorted">
            <p class="categoryTitle">Unsorted</p>
        </div>
        <div v-for="person in unsorted" class="peopleUnsorted">
            <img class="homePeoplePics" :src="require('../assets' + person.imgLink)">
            <p class="idolName">{{ person.stageName }}</p>
            <p class="groupName">{{ person.groupName }}</p>
        </div>
    </div>

    <div class="sideCats">
        <div v-for="cat in categoryArray" class="categories">
            <div class="boxHeaderCategories">
                <!-- <input class="boxHeaderCatsInput" type="text" value=cat></input> -->
                <p class="categoryTitle">{{ cat }}</p>
                <!-- <button class="editCategoryButton"> ✎ </button> -->
            </div>
            <div id="cat">
                <p></p>
            </div>
        </div>

    </div>
    <div class="sideCats">
        <button @click="addNewCategory('Untitled')" class="addCategoryButton"> + </button>
    </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

// localStorage.setItem('categories', JSON.stringify(["Ults", "Semis", "Regs"]));

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
        },
        editMode() {
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
    background-color: #ededed;
    border-bottom: 1px solid #909090;
    border-left: 1px solid #909090;
    border-right: 1px solid #909090;
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
    background-image: linear-gradient(#b3b8e9, #747fe6);
    border-top: 1px solid #909090;
    border-left: 1px solid #909090;
    border-right: 1px solid #909090;
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
    background-color: #ededed;
    padding: 10px;
    padding-left: 0px;
    padding-right: 0px;
    border-radius: 0px 0px 10px 10px;
    border-bottom: 1px solid #909090;
    border-left: 1px solid #909090;
    border-right: 1px solid #909090;
}

.categoryTitle {
    top: -8px;
    position: absolute;
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
    background-image: linear-gradient(#b3b8e9, #747fe6);
    border-top: 1px solid #909090;
    border-left: 1px solid #909090;
    border-right: 1px solid #909090;
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

.boxHeaderCatsInput {
    height: 35px;
    font-size: 20px;
    font-weight: 700;
    background-color: #8589ad;
    border: 1px solid #6e6e6e;
    border-radius: 8px;
    padding: 15px;
    margin-top: -15px;
    /*padding categories + boxheader height*/
    margin-bottom: 10px;
    margin-left: -15px;
    /* categories padding*/
    margin-right: -1px;
    position: relative;
    float: left;
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

.homePeoplePics {
    width: 130px;
    border-radius: 8px;
    box-shadow: 0px 0px 5px black;
    margin: 0px;
    padding: 0px;
}

.addCategoryButton {
    border: 1px solid #B0B0B0;
    border-radius: 5px;
    color: white;
    background-color: #b3b8e9;
    background-image: linear-gradient(#b3b8e9, #747fe6);
    padding: 7px 15px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
}

.editCategoryButton {
    margin-top: -8px;
    margin-right: -8px;
    border: 1px solid #6e6e6e;
    border-radius: 5px;
    color: white;
    background-color: #8589ad;
    /* padding: 7px 15px; */
    text-align: center;
    text-decoration: none;
    float: right;
    /* display: inline-block; */
    font-size: 16px;
    /* margin: 4px 2px; */
    cursor: pointer;
}
</style>
