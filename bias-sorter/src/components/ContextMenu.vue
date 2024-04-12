<template>
    <div class="contextMenu" v-show="show" :style="style" ref="context" tabindex="0" @blur="close">
        <slot></slot>
    </div>
</template>

<script>
import { nextTick } from "vue";

export default {
    name: "ContextMenu",
    props: {
        display: Boolean,
    },
    data() {
        return {
            left: 0, //left pos
            top: 0, //top pos
            show: false,
        };
    },
    computed: {
        style() {
            return {
                left: this.left + "px",
                top: this.top + "px",
            };
        },
    },
    methods: {
        close() {
            this.show = false;
            this.left = 0;
            this.top = 0;
        },
        open(evt) {
            this.left = evt.pageX || evt.clientX;
            this.top = (evt.pageY || evt.clientY) - window.scrollY;

            nextTick(() => this.$el.focus());
            this.show = true;
        },
    },
};
</script>

<style scoped>
.contextMenu {
    background: white;
    border-radius: 5px;
    box-shadow: 0px 0px 5px black;
    cursor: pointer;
    font-size: 13px;
    outline: none;
    padding: 5px 10px;
    line-height: 1px;
    position: fixed;
    z-index: 999;
}
</style>
