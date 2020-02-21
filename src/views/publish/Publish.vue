<template>
    <el-row class="publish">
        <el-col :span="12" :offset="6">
            <el-form label-position="top">
                <el-form-item label="文章标题：">
                    <el-input type="text"
                              placeholder="请输入文章标题"
                              show-word-limit
                              maxlength="25"
                              clearable
                              v-model="title"></el-input>
                </el-form-item>
                <el-form-item label="添加标签：">
                    <el-tag v-for="tag in tags"
                            closable
                            @close="removeTag(tag)">{{tag}}</el-tag>
                    <el-popover
                        placement="bottom-start"
                        width="500"
                        trigger="click"
                        :visible-arrow="false"
                        transition="el-zoom-in-top">
                        <div class="publish-tag">
                            <div class="publish-tag-head">
                                <span>还可以添加{{5 - tagCount}}个标签</span>
                                <span style="float: right">找不到标签？创建</span>
                            </div>
                            <div>
                                <el-autocomplete
                                    placeholder="搜索标签"
                                    suffix-icon="el-icon-search"
                                    v-model="search"
                                    :fetch-suggestions="queryTag"
                                    :trigger-on-focus="false"
                                    @select="selectSuggestTag"
                                    style="width: 100%">
                                </el-autocomplete>
                            </div>
                            <div>
                                <el-tabs stretch>
                                    <el-tab-pane v-for="(name, index) in allTagName" :label="name">
                                        <el-tag v-for="tag in allTag[index]"
                                                @click="addTag(tag)">{{tag}}</el-tag>
                                    </el-tab-pane>
                                </el-tabs>
                            </div>
                        </div>
                        <el-button plain
                                   size="small"
                                   icon="el-icon-plus"
                                   slot="reference">添加标签</el-button>
                    </el-popover>
                </el-form-item>
                <el-form-item label="文章内容：">
                    <markdown-editor></markdown-editor>
                </el-form-item>
                <el-form-item>
                    <el-button plain type="primary"
                               class="pull-right"
                               @click="submit"
                               :loading="loading">发布文章</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
    <!--<div class="publish">
        <el-menu background-color="#f3f3f3" mode="horizontal">
            <el-menu-item class="back">
                <el-button type="text" icon="el-icon-arrow-left">文章管理</el-button>
            </el-menu-item>
            <el-menu-item class="title">
                <el-input type="text"
                          placeholder="输入文章标题"
                          show-word-limit
                          maxlength="25"
                          clearable
                          v-model="title"></el-input>
            </el-menu-item>
            <el-menu-item>
                <el-button plain type="primary"
                           class="pull-right"
                           @click="submit"
                           :loading="loading">发布文章</el-button>
            </el-menu-item>
            <el-submenu>
                <template slot="title">
                    <el-avatar
                        :size="45"
                        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                </template>
                <el-menu-item>
                    <el-dropdown-item>
                        <el-link :underline="false" icon="el-icon-user-solid">我的主页</el-link>
                    </el-dropdown-item>
                </el-menu-item>
                <el-menu-item>
                    <el-dropdown-item>
                        <el-link :underline="false" icon="el-icon-s-comment">
                            消息
                            <el-badge class="mark" type="primary" :value="12"/>
                        </el-link>
                    </el-dropdown-item>
                </el-menu-item>
                <el-menu-item>
                    <el-dropdown-item>
                        <el-link :underline="false" icon="el-icon-star-on">收藏的文章</el-link>
                    </el-dropdown-item>
                </el-menu-item>
                <el-menu-item>
                    <el-dropdown-item>
                        <el-link :underline="false" icon="el-icon-s-tools">设置</el-link>
                    </el-dropdown-item>
                </el-menu-item>
                <el-menu-item>
                    <el-dropdown-item>
                        <el-link :underline="false" icon="el-icon-error">退出</el-link>
                    </el-dropdown-item>
                </el-menu-item>
            </el-submenu>
        </el-menu>
        <div>
            <markdown-editor></markdown-editor>
        </div>
    </div>-->
</template>

<script>
    import MarkdownEditor from "@/views/publish/MarkdownEditor";

    export default {
        name: "Publish",
        data() {
            return {
                title: null,
                tags:[],
                search: null,
                allTagName: [],
                allTag: [[]],
                loading: false
            }
        },
        computed: {
            tagCount() {
                return this.tags.length;
            }
        },
        created() {
            this.allTagName = ['前端', '后端', '移动端', '数据库', '运维', '人工智能', '工具', '其他'];
            this.allTag[0] = ['javascript', 'vue.js', 'css', 'html', 'html5', 'node.js',
                            'react.js', 'jquery', 'css3', 'es6', 'typescript', 'chrome',
                            'npm', 'bootstrap', 'sass', 'less', 'chrome-devtools', 'firefox',
                            'angular', 'coffeescript', 'safari', 'postcss', 'postman', 'fiddler',
                            'webkit', 'yarn', 'firebug', 'edge'];
            this.allTag[1] = ['php', 'java', 'node.js', 'python', 'c++', 'c', 'golang',
                            'spring', 'django', 'springboot', 'flask', 'c#', 'swoole',
                            'ruby', 'asp.net', 'ruby-on-rails', 'scala', 'rust', 'lavarel'];
            this.allTag[2] = ['java', 'android', 'ios', 'objective-c', '小程序', 'swift',
                            'react-native', 'xcode', 'android-studio', 'webapp', 'flutter',
                            'kotlin'];
            this.allTag[3] = ['mysql', 'redis', 'mongodb', 'sql', 'json', 'elasticsearch',
                            'nosql', 'memcached', 'postgresql', 'sqlite', 'mariadb'];
            this.allTag[4] = ['linux', 'nginx', 'docker', 'apache', 'centos', 'ubuntu',
                            '负载均衡', 'ssh', 'vagrant', 'jenkins', 'devops', 'debian',
                            'fabric'];
            this.allTag[5] = ['算法', '机器学习', '人工智能', '深度学习', '数据挖掘', 'tensorflow',
                            '神经网络', '图像识别', '人脸识别', '自然语言处理', '机器人', 'pytorch',
                            '自动驾驶'];
            this.allTag[6] = ['git', 'github', 'macos', 'visual-studio-code', 'windows', 'vim',
                            'sublime-text', 'intellij-idea', 'eclipse', 'phpstorm', 'webstorm',
                            '编辑器', 'svn', 'visual-studio', 'pycharm', 'emacs'];
            this.allTag[7] = ['程序员', 'http', 'https', '安全', 'websocket', 'restful', 'xss',
                            '区块链', 'csrf', 'graphql', 'rpc', '比特币', '以太坊', 'udp', '智能合约'];
        },
        methods: {
            addTag(tag) {
                if (this.tags.indexOf(tag) !== -1) {
                    alert('已经添加过该标签了！');
                } else {
                    if (this.tagCount >= 5) {
                        alert('标签最多添加5个！');
                    } else {
                        this.tags.push(tag);
                    }
                }
            },
            removeTag(tag) {
                this.tags.splice(this.tags.indexOf(tag), 1);
            },
            queryTag(queryString, cb) {
                let results = [];
                let temp = [];
                for (let tags of this.allTag) {
                    for (let tag of tags) {
                        if (tag.includes(queryString.toLowerCase())) {
                            if (temp.indexOf(tag) === -1) {
                                results.push({'value': tag});
                                temp.push(tag);
                            }
                        }
                    }
                }
                setTimeout(() => {
                    cb(results);
                }, 3000);
            },
            selectSuggestTag(tag) {
                this.addTag(tag.value);
            },
            submit() {
                this.loading = true;
                setTimeout(() => {
                    this.loading = false;
                }, 3000);
            }
        },
        components: {
            MarkdownEditor
        }
    }
</script>

<style scoped>
    .publish {
        background-color: #E9ECEF;
        padding-top: 20px;
        width: 100%;
        height: 100%;
        /*position: absolute;
        z-index: 10000;*/
    }

    /*.back {
        color: rgba(0, 0, 0, 0.75);
    }

    .back:hover {
        background-color: #f3f3f3;
    }*/

    .publish-tag {
        padding: 0 12px;
    }

    .publish-tag-head {
        padding-bottom: 8px;
    }

    /*.publish .title {
        width: 77%;
    }

    .publish .title .el-input {
        font-size: 16px !important;
    }*/
</style>

<style>
    .el-form-item__label {
        font-size: 18px;
    }

    .el-tag {
        margin-right: 8px;
        margin-bottom: 8px;
        cursor: pointer;
    }

    .el-tag:hover {
        background-color: #409EFF;
        color: #FFFFFF;
    }

    .el-tag:hover .el-icon-close {
        color: #FFFFFF;
    }

    .el-tabs__item {
        padding: 0 10px;
    }

    /*.publish .el-menu-item:hover {
        background-color: #f3f3f3 !important;
    }
    .publish .el-submenu:hover .el-submenu__title {
        background-color: #f3f3f3 !important;
    }
    .publish .back .el-button {
        color: rgba(0, 0, 0, 0.75);
        font-size: 18px;
        font-weight: 700;
    }
    .publish .back:hover .el-button {
        color: rgba(0, 0, 0, 1);
    }
    .publish .back .el-button .el-icon-arrow-left {
        font-size: 18px;
        font-weight: 700;
        color: rgba(0, 0, 0, 0.75);
    }
    .publish .back:hover .el-button .el-icon-arrow-left {
        color: rgba(0, 0, 0, 1);
    }
    .el-menu--horizontal {
        z-index: 10000 !important;
        background-color: rgba(0, 0, 0, 0);
    }
    .el-menu--horizontal .el-menu {
        background-color: #FFFFFF !important;
    }
    .el-menu--horizontal .el-menu .el-menu-item {
        background-color: #FFFFFF !important;
    }*/

    .el-popover {
        z-index: 10000 !important;
    }

    .el-autocomplete-suggestion {
        z-index: 10000 !important;
    }
</style>
