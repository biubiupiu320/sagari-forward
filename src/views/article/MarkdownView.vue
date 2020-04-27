<template>
    <div>
        <link rel="stylesheet" href="../../editor.md/css/editormd.min.css">
        <link rel="stylesheet" href="../../editor.md/css/editormd.preview.min.css">
        <div :id="id" style="padding: 20px 0 !important;"></div>
        <image-viewer :z-index="10000"
                      :url-list="imageUrlList"
                      :display="imageViewerDisplay"
                      ref="imageViewer"
                      @hide="hideImage"></image-viewer>
    </div>
</template>

<script type="module">
    import $ from 'jquery';
    import scriptjs from 'scriptjs';
    import {defaultConfig} from "@/config/editor.md";
    import ImageViewer from "@/views/article/ImageViewer";

    export default {
        name: "MarkDownView",
        created() {

        },
        data() {
            return {
                imageUrlList: [],
                imageViewerDisplay: 'none',
                imageDOMs: ''
            }
        },
        props: {
            id: {
                type: String,
                default: 'markdown-view'
            },
            markdown: String,
            config: {
                type: Object
            }
        },
        mounted() {
            window.$ = window.jQuery = $;
            setTimeout(() => {
                this.initView();
                this.imageDOMs = $('.picture');
                for(let item of this.imageDOMs) {
                    this.imageUrlList.push($(item).attr('src'));
                    $(item).click(this.showImage);
                }
                this.$emit('register');
            }, 1000);
        },
        methods: {
            fetchScript(url) {
                return new Promise((resolve) => {
                    scriptjs(url, () => {
                        resolve();
                    });
                });
            },
            initView() {
                (async () => {
                    await this.fetchScript('../../editor.md/jquery.min.js')
                    await this.fetchScript('../../editor.md/editormd.min.js')
                    await this.fetchScript('../../editor.md/lib/marked.min.js')
                    await this.fetchScript('../../editor.md/lib/prettify.min.js')
                    await this.fetchScript('../../editor.md/lib/raphael.min.js')
                    await this.fetchScript('../../editor.md/lib/underscore.min.js')
                    await this.fetchScript('../../editor.md/lib/sequence-diagram.min.js')
                    await this.fetchScript('../../editor.md/lib/flowchart.min.js')
                    await this.fetchScript('../../editor.md/lib/jquery.flowchart.min.js')
                    this.$nextTick(() => {
                        let config = this.getConfig();
                        config.markdown = this.markdown;
                        window.editormd.markdownToHTML(this.id, config);
                    })
                })();
            },
            getConfig() {
                return { ...defaultConfig, ...this.config };
            },
            showImage() {
                for(let i = 0; i < this.imageDOMs.length; i++) {
                    if ($(this.imageDOMs[i]).is($(event.target))) {
                        this.$refs['imageViewer'].index = i;
                    }
                }
                this.imageViewerDisplay = 'block';
            },
            hideImage() {
                this.imageViewerDisplay = 'none';
            }
        },
        components: {
            ImageViewer
        }
    }
</script>

<style scoped>
</style>
