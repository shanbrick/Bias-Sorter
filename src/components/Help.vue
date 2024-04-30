<template>
    <div class="helpDiv" v-show="show" ref="context">
        <div class="top">
            <p class="helpHeader">Help</p>
            <button class="exit">X</button>
        </div>
        <div>
            <select v-model="helpSelection">
                <option v-for="option in helpOptions" :value="option">{{ option }}</option>
            </select>
        </div>

        <p v-if="helpSelection === 'Get Started'">
        <ol>
            <li>Sign in to the website using the Sign In button at the top right corner of the page!</li>
            <li>Once signed in, many options will appear at the top bar. Feel free to explore these on your own, or
                check out the other section of the help page if you need some guidance!</li>
            <li>Start adding! Instructions are under <b>Add an Idol/Group</b> in this Help window</li>
            <li>Navigate to the <b>List</b> tab. Underneath you will see <b>Bias List</b> and <b>Group List</b>. Click
                on the desired list.</li>
            <li>All newly added idols or groups will be under the <b>Unsorted</b> section. This is the <b>U</b> button
                on the left side of the screen. Once opened, pictures can be dragged to the appropriate section. (Note:
                Only 'drop' the picture into the category once you see a 'ghost' of the picture in the desired section.
                Otherwise, the website will not register the drag.)</li>
            <li>If needed, change category names. Instructions under <b>Edit Categories</b> in this Help window.</li>
        </ol>
        </p>

        <p v-else-if="helpSelection === 'Search for an Idol/Group'">
            There are many different ways to look for a bias or a group!
        <ul>
            <li>Check out the home page! Idols birthdays are listed on the left. Random groups are displayed on the
                right. Clicking on an idol or a group will bring you to their page.</li>
            <li>Go to the <b>Groups</b> tab at the top of the page. Here, a wide selection of boy groups, girl groups,
                and soloists are displayed. Click on a group or soloist to be brought to their page.</li>
            <li>Under the <b>Spreadsheets</b> tab, you can find <b>Birthdays</b> and <b>Survival Shows</b>.
                <ul>
                    <li>Want to find your birthday twin? <b>Birthdays</b> displays all birthdays of the people currently
                        on the website. Click on someone's name to be brought to their page!</li>
                    <li>Looking for an old favorite from a survival show? <b>Survival Shows</b> displays the final
                        rankings of the show as well as the groups in each round. Click on their name or current group
                        to be brought to their page!</li>
                </ul>
            </li>
            <li>Use the search bar! Click on a result to be brought to their page! Accepted searches include:
                <ul>
                    <li>Idol stage names (in English or Korean)</li>
                    <li>Idol full names (in English or Korean)</li>
                    <li>Group names (in English or Korean)</li>
                    <li>Company names (in English)</li>
                </ul>
                Note: For searching in Korean, the ENTER key must be pressed after typing a block a letters in order for
                the input to be registered.
            </li>
        </ul>
        </p>

        <p v-else-if="helpSelection === 'Add an Idol/Group'">
            To add an idol or a group to your list, you must be on a group's page. If you do not know how to get to a
            group's page, I recommend viewing the 'Search for an Idol/Group' instructions.
        <ul>
            <li>To add a group to your Group List (under the <b>List</b> tab at the top), click on the <b>Add</b> button
                present under the group picture.</li>
            <li>To add an idol to your Bias List (under the <b>List</b> tab at the top), scroll down to the list of
                members. Click on the desired person's <b>Add</b> button.</li>
        </ul>
        Repeat this process for all biases and groups.
        </p>

        <p v-else-if="helpSelection === 'Remove an Idol/Group'">
            There are two ways to remove an idol or group from your list!
        <ul>
            <li>On the List page, right click on a picture. Click on 'Remove [name]' to remove that idol or group from
                your list.</li>
            <li>On a group page, clicking on the <b>Added</b> button will remove that idol or group from your list.</li>
        </ul>
        </p>

        <!-- <p>
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
        </p> -->
    </div>
</template>

<script>

export default {
    data() {
        return {
            show: false,
            helpSelection: '',
            helpOptions: ['Get Started', 'Search for an Idol/Group', 'Add an Idol/Group', 'Remove an Idol/Group']
        }
    },
    methods: {
        close() {
            this.show = false;
        },
        open() {
            this.show = true;
        }
    }
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
    border: 1px solid red;
    display: flow;
    margin-bottom: 20px;
}

.top:after {
    content: "";
    clear: both;
    display: table;
}

.helpHeader {
    float: left;
    font-size: 125%;
    font-weight: bolder;
    line-height: 125%;
    margin: 0px;
    padding: 0px;
}

.exit {
    float: right;
}
</style>
