<template>
    <div id="vditor"></div>
</template>

<script>
    import Vditor from 'vditor';
    import "vditor/src/assets/scss/index.scss"
    import config from "@/config/editorConfig"

    export default {
        data() {
            return {
                vditor: ""
            }
        },
        methods: {
            _initEditor (id) {
                return new Vditor(id, config.defaultConfig)
            },
            getValue() {
                return this.vditor.getValue();
            },
            setValue(value) {
                this.vditor.setValue(value);
            },
            enable() {
                this.vditor.enable();
            },
            disable() {
                this.vditor.disabled();
            }
        },
        async mounted () {
            this.vditor = this._initEditor("vditor");
        },
    }
</script>

<style lang="sass">

</style>

<style>
    .vditor-toolbar__item {
        line-height: normal;
    }

    .vditor-textarea::-webkit-scrollbar {
        width : 8px;
        height: 1px;
    }
    .vditor-textarea::-webkit-scrollbar-thumb {
        border-radius   : 10px;
        background-color: skyblue;
        background-image: -webkit-linear-gradient(
            45deg,
            rgba(255, 255, 255, 0.2) 25%,
            transparent 25%,
            transparent 50%,
            rgba(255, 255, 255, 0.2) 50%,
            rgba(255, 255, 255, 0.2) 75%,
            transparent 75%,
            transparent
        );
    }
    .vditor-textarea::-webkit-scrollbar-track {
        box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
        background   : #ededed;
        border-radius: 10px;
    }

    .vditor-preview::-webkit-scrollbar {
        width : 8px;
        height: 1px;
    }
    .vditor-preview::-webkit-scrollbar-thumb {
        border-radius   : 10px;
        background-color: skyblue;
        background-image: -webkit-linear-gradient(
            45deg,
            rgba(255, 255, 255, 0.2) 25%,
            transparent 25%,
            transparent 50%,
            rgba(255, 255, 255, 0.2) 50%,
            rgba(255, 255, 255, 0.2) 75%,
            transparent 75%,
            transparent
        );
    }
    .vditor-preview::-webkit-scrollbar-track {
        box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
        background   : #ededed;
        border-radius: 10px;
    }


</style>
