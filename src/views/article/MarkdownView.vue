<template>
    <div :id="id">
    </div>
</template>

<script type="module">
    import $ from 'jquery';
    import Vue from 'vue';

    export default {
        name: "MarkdownView",
        data() {
            return {
                /*markdown: '![](http://sagiri.ufile.ucloud.com.cn/7703ef16-1b8e-4aff-b212-62a6f512d037.png?UCloudPublicKey=Y4dA405-GGFaH-juHyHszNazLa_Cjrz9NGJTqn2b&Signature=dFIbsydcBpd9sYZ%2F6evGescHrBg%3D&Expires=1581517887)\n' +
                    '### 测试一下啦\n' +
                    '```javasrcipt\n' +
                    'import Vue from "vue";\n' +
                    'import ElementUI from "element-ui";\n' +
                    'import App from "@/App.vue";\n' +
                    'import router from "@/router";\n' +
                    'import store from "@/store";\n' +
                    '\n' +
                    'Vue.config.productionTip = false;\n' +
                    '\n' +
                    'Vue.use(ElementUI);\n' +
                    '\n' +
                    'new Vue({\n' +
                    '    router,\n' +
                    '    store,\n' +
                    '    render: h => h(App)\n' +
                    '}).$mount("#app");\n' +
                    '```\n' +
                    '![](http://sagiri.ufile.ucloud.com.cn/3c160759-7d13-4419-b913-a4e3bdeafbde.jpg?UCloudPublicKey=Y4dA405-GGFaH-juHyHszNazLa_Cjrz9NGJTqn2b&Signature=kJrzVokPwvWYJ4DZ9JxNQOHanT4%3D&Expires=1581517918)\n' +
                    '### 测试一下啦\n' +
                    '```javasrcipt\n' +
                    'import Vue from "vue";\n' +
                    'import ElementUI from "element-ui";\n' +
                    'import App from "@/App.vue";\n' +
                    'import router from "@/router";\n' +
                    'import store from "@/store";\n' +
                    '\n' +
                    'Vue.config.productionTip = false;\n' +
                    '\n' +
                    'Vue.use(ElementUI);\n' +
                    '\n' +
                    'new Vue({\n' +
                    '    router,\n' +
                    '    store,\n' +
                    '    render: h => h(App)\n' +
                    '}).$mount("#app");\n' +
                    '```\n',*/
            }
        },
        props: {
            id: {
                type: String,
                default: 'markdownView'
            },
            markdown: String
        },
        mounted() {
            let vm = this;
            this.requireView(() => {
                //let test = new RegExp(/[!\[\]\(+\)]/);
                //let test = new RegExp(/((?<=!\[\]\().*?(?=\)))/);
                //let test = new RegExp(/(http.+.+)[(!\[\]\()(\))]/);
                let test = new RegExp(/(http.+.+)[((?<=!\[\]\().*?(?=\)))]/);
                let str = vm.markdown.split(test);
                for (let i = 0; i < str.length; i++) {
                    if (str[i].startsWith("![](")) {
                        continue;
                    } else if (str[i].startsWith("http")) {
                        this.addImageSrc(str[i]);
                        let previewSrcList = this.$store.state.previewSrcList;
                        let component = Vue.extend({
                            render(createElement) {
                                return createElement('el-image', {
                                    attrs: {
                                        src: str[i],
                                        previewSrcList: previewSrcList,
                                        zIndex: 10000
                                    }
                                });
                            },
                            data() {
                                return {

                                }
                            }
                        });
                        let dom = new component().$mount().$el;
                        $('#markdownView').append(dom);
                    } else if (str[i] === ''){
                        continue;
                    } else {
                        let markdown = '';
                        if (str[i].endsWith('![](')) {
                            markdown = str[i].substring(0, str[i].lastIndexOf('![]('))
                        } else {
                            markdown = str[i];
                        }
                        editormd.markdownToHTML(vm.id, {markdown: markdown});
                    }
                }
            });
        },
        methods: {
            requireView(callback) {
                window.$ = window.jQuery = $;
                $.getScript("/lib/editor.md/editormd.min.js", () => {
                    $.getScript("/lib/editor.md/lib/marked.min.js", () => {
                        $.getScript("/lib/editor.md/lib/prettify.min.js", () => {
                            callback();
                        });
                    });
                });
                $('head').append($('<link rel="stylesheet" type="text/css" />').attr('href', '/lib/editor.md/css/editormd.preview.css'));
            },
            addImageSrc(src) {
                this.$store.commit('addImageSrc', src);
            }
        }
    }
</script>

<style scoped>

</style>
