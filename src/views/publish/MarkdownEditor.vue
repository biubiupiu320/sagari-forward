<template>
    <div class="markdown-editor-box">
        <link rel="stylesheet" href="editor.md/css/editormd.min.css">
        <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/KaTeX/0.1.1/katex.min.css">
        <link rel="stylesheet" href="editor.md/lib/codemirror/codemirror.min.css" />
        <link rel="stylesheet" href="editor.md/lib/codemirror/addon/dialog/dialog.css" />
        <link rel="stylesheet" href="editor.md/lib/codemirror/addon/search/matchesonscrollbar.css" />
        <div :id="editorId" class="md-editor"></div>
    </div>
</template>
<script>
    import scriptjs from 'scriptjs'
    import { defaultConfig } from '../../config/editor.md'

    export default {
        name: 'MarkdownEditor',
        props: {
            editorId: {
                'type': String,
                'default': 'markdown-editor'
            },
            onchange: { // 内容改变时回调，返回（html, markdown, text）
                type: Function
            },
            config: { // 编辑器配置
                type: Object
            },
            initData: {
                'type': String
            },
            initDataDelay: {
                'type': Number, // 延迟初始化数据时间，单位毫秒
                'default': 0
            }
        },
        data: function () {
            return {
                editor: null,
                timer: null,
                doc: {},
                jsLoadOver: false
            }
        },
        methods: {
            fetchScript: function (url) {
                return new Promise((resolve) => {
                    scriptjs(url, () => {
                        resolve()
                    })
                })
            },
            getConfig: function () {
                return { ...defaultConfig, ...this.config }
            },
            getEditor: function () {
                return this.editor
            },
            previewing: function () {
                return this.editor.previewing()
            },
            getMarkdown: function () {
                return this.editor.getMarkdown()
            },
            setMarkdown: function (markdown) {
                return this.editor.setMarkdown(markdown)
            },
            init (id) {
                let vm = this
                vm.initEditor('');
            },
            initEditor: function (markdown) {
                let vm = this
                let config = vm.getConfig()
                if (markdown) {
                    config.markdown = markdown
                }
                (async () => {
                    await vm.fetchScript('editor.md/jquery.min.js')
                    await vm.fetchScript('editor.md/editormd.min.js')
                    await vm.fetchScript('editor.md/lib/codemirror/codemirror.min.js')
                    await vm.fetchScript('editor.md/lib/codemirror/addons.min.js')
                    await vm.fetchScript('editor.md/lib/codemirror/modes.min.js')
                    await vm.fetchScript('editor.md/lib/marked.min.js')
                    await vm.fetchScript('editor.md/lib/prettify.min.js')
                    await vm.fetchScript('editor.md/lib/raphael.min.js')
                    await vm.fetchScript('editor.md/lib/underscore.min.js')
                    await vm.fetchScript('editor.md/lib/sequence-diagram.min.js')
                    await vm.fetchScript('editor.md/lib/flowchart.min.js')
                    await vm.fetchScript('editor.md/lib/jquery.flowchart.min.js')
                    await vm.fetchScript('//cdnjs.cloudflare.com/ajax/libs/KaTeX/0.1.1/katex.min.js')
                    vm.jsLoadOver = true
                    vm.$nextTick(() => {
                        vm.editor = window.editormd(vm.editorId, config);
                        vm.editor.on('load', () => {
                            setTimeout(() => { // hack bug: 一个页面多个编辑器只能初始化其中一个数据问题
                                vm.initData && vm.editor.setMarkdown(vm.initData)
                            }, vm.initDataDelay)
                        })
                        vm.onchange && vm.editor.on('change', () => {
                            let html = vm.editor.getPreviewedHTML()
                            vm.onchange({
                                markdown: vm.editor.getMarkdown(),
                                html: html,
                                text: window.$(html).text()
                            })
                        })
                    })
                })();
            }
        },
        mounted: function () {
            let vm = this
            vm.init('')
            vm.timer = setInterval(function () {
                if (vm.editor && vm.jsLoadOver) {
                    try {
                        window.clearInterval(vm.timer)
                        vm.timer = null
                    } catch (e) {}
                }
            }, 80);
        },
        destroyed: function () {
            let vm = this
            if (vm.timer != null) {
                window.clearInterval(vm.timer)
                vm.timer = null
            }
        }
    }
</script>

<style scoped>
    .md-editor {
        border-radius: 5px;
        z-index: 10000;
    }
</style>
