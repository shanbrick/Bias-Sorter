<template>
    <div class="listSaver" v-show="show" ref="saver" tabindex="0" @blur="close">
        <button class="closeUpload" @click="close">╳</button>
        <select class="uploadButton" style="background: #dadada" v-model="catSelection">
            <option v-for="cat in catOptions" :value="cat">{{ cat }}</option>
        </select>
        <button class="uploadButton" style="margin-bottom: 20px" @click="saveAsImage(catSelection)">Save Category as
            Image</button>
        <button class="uploadButton" style="margin-bottom: 20px" @click="saveJSON">Save List as JSON</button>
        <input class="uploadButton" type="file" id="selectFiles" @click="uploadJSON" />
        <button class="uploadButton" id="import">Upload List from JSON</button>
    </div>
</template>

<script>
import html2canvas from 'html2canvas';
import {
    getAuth,
    onAuthStateChanged,
} from "firebase/auth";

export default {
    name: "ListSaver",
    mounted() {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.initialize();
            }
        });
    },
    data() {
        return {
            show: false,
            fireSaveData: {},
            jsonSave: false,
            imageSave: true,
            catSelection: 'Unsorted - Bias List',
            catOptions: []
        }
    },
    methods: {
        async initialize() {
            const auth = getAuth();
            const currentUser = auth.currentUser;
            this.currUser = currentUser;
            const userDoc = await this.$db.collection("users").doc(currentUser.uid).get();
            const saveData = userDoc.data();
            this.fireSaveData = saveData;

            for (let i = 0; i < this.fireSaveData.categories.length; i++) {
                let concat = this.fireSaveData.categories[i].catName + " - Bias List"
                this.catOptions.push(concat);
            }
            for (let i = 0; i < this.fireSaveData.groupCategories.length; i++) {
                let concat = this.fireSaveData.groupCategories[i].catName + " - Group List"
                this.catOptions.push(concat);
            }
        },
        close() {
            this.show = false;
        },
        open() {
            this.show = true;
        },
        uploadJSON() {
            document.getElementById("import").onclick = () => {
                const files = document.getElementById("selectFiles").files;
                if (files.length <= 0) {
                    return false;
                }

                const fr = new FileReader();

                fr.onload = (e) => {
                    const result = JSON.parse(e.target.result);
                    this.fireSaveData = result;

                    this.$db.collection("users").doc(this.currUser.uid).set(this.fireSaveData);

                    this.homePageArrays = [];
                    for (let i = 0; i < this.fireSaveData.categories.length; i++) {
                        this.homePageArrays.push(this.fireSaveData.categories[i].people);
                    }
                    this.testArray = [];
                    for (let i = 1; i < this.fireSaveData.categories.length; i++) {
                        this.testArray.push(this.fireSaveData.categories[i]);
                    }
                };
                fr.readAsText(files.item(0));
                this.showFileUploader = false;
            };
        },
        saveJSON() {
            var a = document.createElement("a");
            var file = new Blob([JSON.stringify(this.fireSaveData)], { type: 'application/json' });
            a.href = URL.createObjectURL(file);
            a.download = 'exportSaveData.json';
            a.click();
            this.showFileUploader = false;
        },
        saveAsImage(id) {
            html2canvas(document.getElementById(id)).then(canvas => {
                var link = document.createElement('a');

                if (typeof link.download === 'string') {
                    link.href = canvas.toDataURL();

                    const fileUrl = id.replace(/[^a-zA-Z]+/g, '');
                    link.download = fileUrl + '.jpeg';

                    //Firefox requires the link to be in the body
                    document.body.appendChild(link);
                    //simulate click
                    link.click();
                    //remove the link when done
                    document.body.removeChild(link);

                } else {
                    window.open(canvas.toDataURL());
                }
            });
        }
    }
}
</script>

<style scoped>
.listSaver {
    background: white;
    border-radius: 5px;
    box-shadow: 0px 0px 5px black;
    font-size: 13px;
    height: fit-content;
    margin: auto;
    padding: 5px 10px;
    line-height: 1px;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 300px;
    z-index: 999;
}

.uploadButton {
    background-color: #b3b8e9;
    border: 1px solid #848484;
    border-radius: 5px;
    color: rgb(0, 0, 0);
    cursor: pointer;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    padding: 7px 15px;
    text-align: center;
    text-decoration: none;
    width: 100%;
}

.uploadButton:hover {
    background-color: #505cc7;
}

.closeUpload {
    background-color: #b3b8e9;
    border: 1px solid #848484;
    border-radius: 5px;
    color: rgb(0, 0, 0);
    cursor: pointer;
    display: block;
    float: right;
    font-size: 16px;
    margin-bottom: 20px;
    text-align: center;
    text-decoration: none;
}

.closeUpload:hover {
    background-color: #505cc7;
}
</style>