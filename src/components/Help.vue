<template>
    <div class="helpDiv" v-show="show" ref="context">
        <div class="top">
            <p class="helpHeader">Help</p>
            <button class="exit">X</button>
        </div>
        <div class="dropdown">
            <button></button>
        </div>
        <p>How do I start?</p>
        <p>
            In order to start sorting your biases, navigate to a group's page. This can be done
            many ways:
        </p>
        <ul>
            <li>
                Click on 'Groups' at the top of the page. Here, all groups available are
                displayed. Groups are separated into boy and girl groups. Soloists are also
                available to view. Click on a group to be brought to their page to view their
                members.
            </li>
            <li>
                Use the search bar! Available searches include: group names, idol names, and
                company names. Groups and idols can be searched for in both English and Korean.
                Click on a result to be brought to a group's page. (Note: For searching in Korean,
                the ENTER key must be pressed after typing a block a letters in order for the
                input to be registered.)
            </li>
            <li>
                Explore the home page! Clicking on an Idol displayed in the birthday section will
                bring you to their group's page. Also, clicking on a group displayed on the home
                page will bring you to their corresponding page.
            </li>
        </ul>
        <p>
            Once on a group's page, you will see the members of the group underneath the group's
            picture. On each person, an <b>Add</b> button can be seen. Click this button to add
            that idol to your <b>Unsorted</b> category. As a note, in case you want to remove an
            Idol from any of your lists, this button, now displayed as <b>Added</b>, can be
            clicked again to remove that Idol.
        </p>
        <p>
            Once adding all desired Idols to your <b>Unsorted</b> list, you can click on
            <b>List</b> at the top of the page to view your lists! On the left is the
            <b>Unsorted</b> category, where all Idols added will go by default. On the right are
            a few categories Ults, Semis, and Regs. You can add new categories using the Add New
            Category button. This will add a new category to the bottom of the categories.
            Clicking on Edit Categories will then allow you to change the name of this category,
            as well as other category names. Categories can be moved around by clicking and
            dragging while in Edit Mode. (Note: Click and drag from the part of the box that is
            not a text box.)
        </p>
        <p>
            In order to categorize your biases, click and drag their images into the desired
            category.
        </p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            show: false,
        }
    },
    methods: {
        close() {
            this.show = false;
        },
        open() {
            this.show = true;
        },
    },
}
</script>

<style scoped>
.helpDiv {
    background: white;
    border-radius: 10px;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    box-shadow: 0px 0px 5px black;
    height: 500px;
    margin: auto;
    overflow-x: hidden;
    padding: 15px;
    position: absolute;
    text-align: left;
    width: 450px;
    z-index: 9999;
}

.top {
    display: flow;
    margin-bottom: 20px;
}

.helpHeader {
    float: left;
    font-size: 110%;
    font-weight: bolder;
}

.exit {
    float: right;
}
</style>
