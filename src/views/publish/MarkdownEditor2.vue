<template>
    <div id="vditor"></div>
</template>

<script>
    import Vditor from 'vditor';
    import 'vditor/src/assets/scss/index.scss'

    export default {
        name: "MarkdownEditor2",
        data() {
            return {
                vditor: null
            }
        },
        mounted() {
            this.vditor = new Vditor('vditor', {
                debugger: true,
                typewriterMode: true,
                mode: 'wysiwyg-show',
                placeholder: 'placeholder',
                width: '100%',
                height: 515,
                //theme: 'dark',
                toolbar: ['emoji', '|', 'headings', 'bold', 'italic', 'strike', 'link', '|',
                    'list', 'ordered-list', 'check', '|', 'quote', 'line', 'code', 'inline-code', '|',
                    'upload', 'table', '|', 'undo', 'redo', '|', 'edit-mode', 'preview', 'format', 'fullscreen'],
                preview: {
                    delay: 200,
                    mode: 'both',
                    markdown: {
                        toc: true,
                    },
                    hljs: {
                        lineNumber: true
                    },
                    math: {
                        inlineDigit: true
                    }
                },
                cdn: 'https://cdn.jsdelivr.net/npm/vditor@3.0.4',
                counter: 100,
                hint: {
                    emojiPath: 'https://cdn.jsdelivr.net/npm/vditor@1.8.3/dist/images/emoji',
                    emojiTail: '<a href="https://hacpai.com/settings/function" target="_blank">设置常用表情</a>'
                },
                tab: '\t',
                upload: {
                    max: 3 * 1024 * 1024,
                    accept: 'image/*,.mp3, .wav, .rar',
                    token: 'test',
                    url: '',
                    linkToImgUrl: '',
                    filename (name) {
                        return name.replace(/[^(a-zA-Z0-9\u4e00-\u9fa5\.)]/g, '').
                        replace(/[\?\\/:|<>\*\[\]\(\)\$%\{\}@~]/g, '').
                        replace('/\\s/g', '')
                    },
                }
            });
            this.vditor.renderPreview('666666666666')
        }
    }
</script>

<style scoped>
    @import '../../assets/css/index.css';
</style>

<style>
    .vditor-toolbar__item {
        line-height: normal;
    }
</style>
