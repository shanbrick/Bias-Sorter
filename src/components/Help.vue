<template>
    <div class="helpDiv" v-show="show" ref="context" tabindex="0" @blur="close">
        <div class="top">
            <p class="helpHeader">Help</p>
            <button class="exit" @click="close">X</button>
        </div>
        <div style="text-align: center;">
            <select v-model="helpSelection">
                <option v-for="option in helpOptions" :value="option">{{ option }}</option>
            </select>
        </div>

        <p v-if="helpSelection === 'Get Started' || helpSelection === ''">
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

        <p v-else-if="helpSelection === 'Edit Categories'">
            Categories can be edited in many different ways.
        <ul>
            <li>Change category name: Click <b>Edit Categories</b> while either on <b>Bias List</b> or <b>Group
                    List</b>.
                Here, you can type in a new category title. Click <b>Save Categories</b>.</li>
            <li>Move a category: Click <b>Edit Categories</b> while either on <b>Bias List</b> or <b>Group List</b>.
                Click and drag on a category to swap the order. Click <b>Save Categories</b>.</li>
            <li>Remove a category: You do not need to be "editing" the categories as the other abilities require. Right
                click on a category. You will be prompted with two options:
                <ul>
                    <li>Remove category and move people to Unsorted: This will remove the category from your list, but
                        not the people that were in it.</li>
                    <li>Remove category and people: This will remove both the category and the people inside from your
                        list.</li>
                </ul>
            </li>
        </ul>
        </p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            show: false,
            helpSelection: 'Get Started',
            helpOptions: ['Get Started', 'Search for an Idol/Group', 'Add an Idol/Group', 'Remove an Idol/Group', 'Edit Categories']
        }
    },
    methods: {
        close() {
            this.show = false;
        },
        open() {
            this.show = true;
        },
        handleClickOutside(event) {
            if (!this.$el.contains(event.target)) {
                this.show = false;
            }
        },
    }
}
</script>

<style scoped>
.helpDiv {
    background: linear-gradient(rgba(218, 218, 218, 1) 0%,
            rgba(255, 255, 255, 1) 50%,
            rgba(218, 218, 218, 1) 100%);
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
    position: fixed;
    text-align: left;
    width: 450px;
    z-index: 9999;
}

.top {
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
    font-size: 25px;
    font-weight: bolder;
    line-height: 25px;
    margin: 0px;
    padding: 0px;
}

.exit {
    background-color: #b3b8e9;
    border: 1px solid #b3b8e9;
    border-radius: 5px;
    box-shadow: 0px 0px 5px black;
    cursor: pointer;
    float: right;
}

select {
    background-color: #b3b8e9;
    border: 1px solid #b3b8e9;
    border-radius: 5px;
    box-shadow: 0px 0px 5px black;
    color: black;
    font-size: 16px;
    margin-bottom: 10px;
    padding: 5px;
}

li {
    margin: 10px;
}
</style>
