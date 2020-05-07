<template>
    <div>
        <div id="preview"></div>
        <image-viewer :z-index="10000"
                      :url-list="imageUrlList"
                      :display="imageViewerDisplay"
                      ref="imageViewer"
                      @hide="hideImage"></image-viewer>
    </div>
</template>

<script>
    import ImageViewer from "@/views/article/ImageViewer";
    import Vditor from "vditor/dist/method.min";
    import "vditor/src/assets/scss/index.scss";
    import {defaultConfig} from "@/config/previewConfig";

    export default {
        name: "Preview",
        data() {
            return {
                imageUrlList: [],
                imageViewerDisplay: 'none',
                imageDoms: ''
            }
        },
        mounted() {
            setTimeout(() => {
                this.imageDoms = document.getElementById("preview")
                    .querySelectorAll("img");
                for (let imageDom of this.imageDoms) {
                    let imageUrl = imageDom.getAttribute("data-src");
                    if (imageUrl === undefined || imageUrl == null || imageUrl === "") {
                        imageUrl = imageDom.getAttribute("src");
                    }
                    this.imageUrlList.push(imageUrl);
                    imageDom.onclick = this.showImage;
                }
            }, 1000);
        },
        methods: {
            setValue(value) {
                Vditor.preview(document.getElementById("preview"), value, defaultConfig)
            },
            hideImage() {
                this.imageViewerDisplay = 'none';
            },
            showImage() {
                for(let i = 0; i < this.imageDoms.length; i++) {
                    if (this.imageDoms[i].isEqualNode(event.target)) {
                        this.$refs['imageViewer'].index = i;
                    }
                }
                this.imageViewerDisplay = 'block';
            }
        },
        components: {
            ImageViewer
        }
    }
</script>

<style scoped>

</style>

<style>
    .vditor-copy {
        display: inline;
    }

    .vditor-copy span {
        z-index: 1;
    }

    .vditor-copy span svg {
        color: #ffffff;
    }

    .vditor-reset--anchor {
        padding-left: 0;
    }

    #preview p img {
        border-radius: 5px;
        margin: 10px auto;
        cursor: zoom-in;
    }
</style>
