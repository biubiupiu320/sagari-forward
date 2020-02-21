<template>
    <el-row style="padding-top: 10px; background-color: #F9F9F9;">
        <el-col :span="14" :offset="5">
            <el-row :gutter="10">
                <el-col :span="18">
                    <div class="article">
                        <div class="article-title">
                            {{article.articleTitle}}
                        </div>
                        <div class="article-info">
                            <el-collapse>
                                <el-collapse-item>
                                    <template v-slot:title>
                                        <el-link type="primary"
                                                 :underline="false"
                                                 class="article-author-name"
                                                 href="https://www.baidu.com">
                                            {{article.user.name}}
                                        </el-link>
                                        <el-tooltip effect="dark" :content="'发布于'+article.time" placement="bottom">
                                            <span class="article-time">最后发布于{{article.time}}</span>
                                        </el-tooltip>
                                        <span class="article-read-count">阅读数 {{article.readCount}}</span>
                                    </template>
                                    <div class="article-tag">
                                        本文标签：
                                        <el-tag size="small" v-for="tag in article.tags">{{tag}}</el-tag>
                                    </div>
                                    <div class="article-copyright">
                                        <div>版权声明：
                                            本文为Sagari博主「{{article.user.name}}」的原创文章，
                                            遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接及本声明。</div>
                                        <div>原文链接：
                                            <el-link type="primary" :href="article.link">
                                                {{article.link}}
                                            </el-link>
                                        </div>
                                    </div>
                                </el-collapse-item>
                            </el-collapse>
                        </div>
                        <div class="article-body">
                            <markdown-view :markdown="article.articleContent"></markdown-view>
                        </div>
                        <div class="article-body-foot">
                            <el-button-group>
                                <el-button type="success"
                                           plain
                                           :icon="good"
                                           @click="clickGood"
                                           :class="{good: article.isGood}">{{article.goodCount}}</el-button>
                                <el-button type="warning"
                                           plain
                                           :icon="bad"
                                           @click="clickBad"
                                           :class="{bad: article.isBad}">{{article.badCount}}</el-button>
                                <el-button type="primary"
                                           plain
                                           :icon="collect"
                                           @click="clickCollect"
                                           :class="{collect: article.isCollect}">{{article.collectCount}}</el-button>
                            </el-button-group>
                        </div>
                        <el-divider></el-divider>
                        <div class="article-foot">
                            <el-row>
                                <el-col :span="2">
                                    <el-link :underline="false">
                                        <el-avatar :size="48" :src="article.user.avatar">
                                            <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
                                        </el-avatar>
                                    </el-link>
                                </el-col>
                                <el-col :span="16">
                                    <div class="article-foot-center-top">
                                        <el-link :underline="false">{{article.user.name}}</el-link>
                                    </div>
                                    <div class="article-foot-center-bot">
                                        发布了{{article.user.articleCount}}篇文章 · {{article.user.fansCount}}个粉丝
                                    </div>
                                </el-col>
                                <el-col :span="6" style="text-align: right">
                                    <el-button v-if="!article.user.isConcern"
                                               :loading="isConcerning"
                                               type="primary"
                                               size="medium"
                                               @click="concern">关注</el-button>
                                    <el-button v-if="article.user.isConcern"
                                               :loading="isConcerning"
                                               icon="el-icon-check"
                                               type="primary"
                                               plain
                                               size="medium"
                                               @click="concern">已关注</el-button>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                    <div class="comment">
                        <div class="comment-write">
                            <el-row>
                                <el-col :span="2">
                                    <el-avatar :size="48" :src="article.user.avatar">
                                        <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
                                    </el-avatar>
                                </el-col>
                                <el-col :span="22">
                                    <el-input type="textarea"
                                              placeholder="写下你的评论..."
                                              :autosize="{minRows: 4, maxRows: 8}"
                                              v-model="comment"
                                              resize="none"
                                              class="comment-write-textarea"
                                              @focus="commentButtonShow = true"></el-input>
                                </el-col>
                            </el-row>
                            <el-collapse-transition>
                                <div v-show="commentButtonShow" class="comment-write-button">
                                    <el-button type="danger"
                                               :disabled="comment === ''"
                                               :loading="isCommenting"
                                               round
                                               size="small"
                                               @click="reply">发表</el-button>
                                    <el-button round size="small" @click="commentButtonShow = false">取消</el-button>
                                </div>
                            </el-collapse-transition>
                        </div>
                        <div class="comment-all">
                            <div class="comment-all-header">
                                <span>全部评论 {{article.commentCount}} </span>
                                <el-button size="mini"
                                           round
                                           :class="{onlyLandlord: isOnlyLandlord}"
                                           @click="onlyLandlord">只看作者</el-button>
                                <span class="comment-all-order-rule">
                                    <el-button type="text" :class="{isActive: orderRule}"
                                               @click="changeOrderRule(true)">按时间正序</el-button>
                                    <el-button type="text" :class="{isActive: !orderRule}"
                                               @click="changeOrderRule(false)">按时间倒序</el-button>
                                </span>
                            </div>
                            <div>
                                <comment ref="comment" :article-user-id="article.user.id"></comment>
                            </div>
                        </div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="author">
                        <el-card shadow="never">
                            <template v-slot:header>
                                关于作者
                            </template>
                            <div>
                                <el-row>
                                    <el-col :span="6">
                                        <el-link :underline="false" href="http://www.baidu.com">
                                            <el-avatar :size="48" :src="article.user.avatar">
                                                <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
                                            </el-avatar>
                                        </el-link>
                                    </el-col>
                                    <el-col :span="18">
                                        <div class="author-name">
                                            <el-link :underline="false">
                                                {{article.user.name}}
                                            </el-link>
                                        </div>
                                        <div class="author-description">
                                            我啥都不知道嘻嘻嘻嘻嘻嘻嘻嘻
                                        </div>
                                    </el-col>
                                </el-row>
                                <div class="author-info">
                                    <i class="el-icon-document"></i>
                                    <span>发表文章&nbsp;{{article.user.articleCount}}&nbsp;篇</span>
                                </div>
                                <div class="author-info">
                                    <i class="el-icon-user"></i>
                                    <span>粉丝&nbsp;{{article.user.fansCount}}&nbsp;个</span>
                                </div>
                            </div>
                        </el-card>
                    </div>
                    <div class="relate-article">
                        <el-card shadow="never">
                            <template v-slot:header>
                                相关文章
                            </template>
                            <div class="relate-article-list" v-for="item in relatedArticle">
                                <el-link :underline="false" class="relate-article-list-item">
                                    <div class="relate-article-title">
                                        {{item.articleTitle}}
                                    </div>
                                    <div class="relate-article-info">
                                        <span>
                                            <i class="el-icon-ali-good-fill"></i>{{item.goodCount}}
                                        </span>
                                        <span>
                                            <i class="el-icon-ali-comments-fill"></i>{{item.commentCount}}
                                        </span>
                                    </div>
                                </el-link>
                            </div>
                        </el-card>
                    </div>
                </el-col>
            </el-row>
        </el-col>
    </el-row>
</template>

<script>
    import MarkdownView from "@/views/article/MarkdownView";
    import Comment from "@/views/article/Comment";

    export default {
        name: "Article",
        created() {
            let articleId = this.$route.params.articleId;
            console.log(articleId)
        },
        data() {
            return {
                userId: 1,
                comment: '',
                commentButtonShow: false,
                isCommenting: false,
                orderRule: true,    //true代表时间正序,
                isConcerning: false,
                isOnlyLandlord: false,
                article: {
                    articleId: 1,
                    articleTitle: '世间万物，皆系于一箭之上',
                    articleContent: '![](http://sagiri.ufile.ucloud.com.cn/7703ef16-1b8e-4aff-b212-62a6f512d037.png?UCloudPublicKey=Y4dA405-GGFaH-juHyHszNazLa_Cjrz9NGJTqn2b&Signature=yZltD6xlUb1XN2lx1ZMEIu%2F7xGc%3D&Expires=1582031346)\n' +
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
                        '![](http://sagiri.ufile.ucloud.com.cn/3c160759-7d13-4419-b913-a4e3bdeafbde.jpg?UCloudPublicKey=Y4dA405-GGFaH-juHyHszNazLa_Cjrz9NGJTqn2b&Signature=06faB7yk3HKIGXe7ySafR9ErM74%3D&Expires=1582031399)\n' +
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
                        '```\n',
                    isGood: false,
                    goodCount: 0,
                    isBad: false,
                    badCount: 0,
                    isCollect: false,
                    collectCount: 0,
                    commentCount: 10,
                    readCount: 8376,
                    tags: ['javascript', 'java'],
                    time: '2020-02-02 16:13:59',
                    link: 'https://www.baidu.com',
                    user: {
                        id: 1,
                        name: 'Sakura',
                        avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
                        articleCount: 10,
                        fansCount: 100,
                        isConcern: false
                    }
                },
                relatedArticle:[
                    {
                        articleTitle: '2020 前端面试 | 第一波面试题总结',
                        goodCount: 420,
                        commentCount: 95
                    },
                    {
                        articleTitle: 'Vue中级指南-04 Vue中跨域以及打包部署到nginx跨域设置',
                        goodCount: 105,
                        commentCount: 29
                    },
                    {
                        articleTitle: 'JavaScript入门指南(学习笔记) 两万余字的基础总结',
                        goodCount: 69,
                        commentCount: 11
                    },
                    {
                        articleTitle: 'React入门指南(学习笔记)',
                        goodCount: 51,
                        commentCount: 6
                    },
                    {
                        articleTitle: 'Vue入门指南-06 Vue中的动画(快速上手vue)',
                        goodCount: 47,
                        commentCount: 0
                    },
                    {
                        articleTitle: '2020 前端面试 | 第一波面试题总结',
                        goodCount: 420,
                        commentCount: 95
                    },
                    {
                        articleTitle: 'Vue中级指南-04 Vue中跨域以及打包部署到nginx跨域设置',
                        goodCount: 105,
                        commentCount: 29
                    },
                    {
                        articleTitle: 'JavaScript入门指南(学习笔记) 两万余字的基础总结',
                        goodCount: 69,
                        commentCount: 11
                    },
                    {
                        articleTitle: 'React入门指南(学习笔记)',
                        goodCount: 51,
                        commentCount: 6
                    },
                    {
                        articleTitle: 'Vue入门指南-06 Vue中的动画(快速上手vue)',
                        goodCount: 47,
                        commentCount: 0
                    }
                ]
            }
        },
        methods: {
            clickGood() {
                let article = this.article;
                if (article.isBad) {
                    article.isBad = false;
                    article.badCount--;
                }
                if (article.isGood) {
                    article.isGood = false;
                    article.goodCount--;
                } else {
                    article.isGood = true;
                    article.goodCount++;
                }
            },
            clickBad() {
                let article = this.article;
                if (article.isGood) {
                    article.isGood = false;
                    article.goodCount--;
                }
                if (article.isBad) {
                    article.isBad = false;
                    article.badCount--;
                } else {
                    article.isBad = true;
                    article.badCount++;
                }
            },
            clickCollect() {
                let article = this.article;
                if (article.isCollect) {
                    article.isCollect = false;
                    article.collectCount--;
                } else {
                    article.isCollect = true;
                    article.collectCount++;
                }
            },
            changeOrderRule(flag) {
                this.orderRule = flag;
                this.$refs.comment.order(this.orderRule);
            },
            concern() {
                this.isConcerning = !this.isConcerning;
                let user = this.article.user;
                setTimeout(() => {
                    if (user.isConcern) {
                        user.isConcern = false;
                        user.fansCount--;
                    } else {
                        user.isConcern = true;
                        user.fansCount++;
                    }
                    this.isConcerning = !this.isConcerning;
                }, 2000);
            },
            reply() {
                this.isCommenting = true;
                setTimeout(() => {
                    let comment = {};
                    comment.commentId = this.article.commentCount + 1;
                    comment.userId = this.userId;
                    if (this.userId === 1) {
                        comment.userName = 'Sakura';
                        comment.userAvatar = 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png';
                    } else if (this.userId === 2) {
                        comment.userName = '远坂凛';
                        comment.userAvatar = 'https://ae01.alicdn.com/kf/Hd60a3f7c06fd47ae85624badd32ce54dv.jpg';
                    } else if (this.userId === 3) {
                        comment.userName = '伊莉雅';
                        comment.userAvatar = 'https://ae01.alicdn.com/kf/Hf6c0b4a7428b4edf866a9fbab75568e6U.jpg';
                    }
                    comment.content = this.comment;
                    comment.isActive = 0;
                    comment.good = 0;
                    comment.bad = 0;
                    comment.time = new Date().getTime() / 1000;
                    comment.isShowReplyAndDel = false;
                    comment.selfContent = '';
                    comment.selfContentHead = '';
                    comment.toId = undefined;
                    comment.childComments = [];
                    this.$refs.comment.comments.push(comment);
                    this.article.commentCount++;
                    this.$refs.comment.commentCount++;
                    this.$refs.comment.pagination.total++;
                    this.comment = '';
                    this.commentButtonShow = false;
                    this.isCommenting = false;
                }, 2000);
            },
            onlyLandlord() {
                this.isOnlyLandlord = !this.isOnlyLandlord;
                this.$refs.comment.onlyLandlord(this.isOnlyLandlord);
                return this.isOnlyLandlord ? 'primary' : '';
            }
        },
        computed: {
            good() {
                if (this.article.isGood) {
                    return 'el-icon-ali-good-fill';
                } else {
                    return 'el-icon-ali-good';
                }
            },
            bad() {
                if (this.article.isBad) {
                    return 'el-icon-ali-bad-fill';
                } else {
                    return 'el-icon-ali-bad';
                }
            },
            collect() {
                if (this.article.isCollect) {
                    return 'el-icon-ali-collect-fill';
                } else {
                    return 'el-icon-ali-collect';
                }
            }
        },
        components: {
            MarkdownView,
            Comment
        }
    }
</script>

<style scoped>
    .article {
        background-color: #FFFFFF;
        border-radius: 4px;
        padding: 24px;
    }

    .article-title {
        font-size: 30px;
        font-weight: 700;
        word-break: break-word;
        color: #404040;
        text-rendering: optimizelegibility;
        margin-bottom: 15px;
    }

    .article-author-right {
        display: inline-block;
        margin-left: 8px;
    }

    .article-author-name {
        font-size: 14px;
        color: #78A5F1;
        margin-right: 8px;
        line-height: 26px;
    }

    .article-time {
        font-size: 14px;
        color: #858585;
        margin-right: 8px;
        line-height: 26px;
    }

    .article-copyright {
        background-color: #f5f6f7;
        padding: 8px;
        border-left: 4px solid #d8d8d8;
        font-size: 12px;
        color: #999999;
    }

    .article-read-count {
        font-size: 14px;
        color: #858585;
        line-height: 26px;
    }

    .article-body .editormd-html-preview {
        padding: 20px 0;
    }

    .article-body-foot {
        text-align: center;
    }

    .article-foot-center-bot {
        color: #6B6B6B;
        font-size: 14px;
        line-height: 24px;
    }

    .comment {
        margin-top: 10px;
        background-color: #FFFFFF;
    }

    .comment-write {
        padding: 20px;
    }

    .comment-write-button {
        text-align: right;
        margin-top: 16px;
    }

    .onlyLandlord {
        color: #FFF;
        background-color: #409EFF;
        border-color: #409EFF;
    }

    .comment-all {
        padding: 0 20px;
    }

    .comment-all-header {
        line-height: 20px;
        margin-bottom: 16px;
        padding-left: 12px;
        border-left: 4px solid #ec7259;
        font-size: 18px;
        font-weight: 500;
    }

    .comment-all-header span {
        vertical-align: middle;
        vertical-align: -webkit-baseline-middle;
    }

    .comment-all-header .el-button {
        vertical-align: -webkit-baseline-middle;
    }

    .comment-all-order-rule {
        float: right;
    }

    .comment-all-order-rule .el-button {
        color: #969696;
    }

    .comment-all-order-rule .isActive {
        color: #2D2D2D !important;
    }

    .author {
        background-color: #FFFFFF;
        border-radius: 4px;
    }

    .good {
        background: #67C23A;
        border-color: #67C23A;
        color: #FFF;
    }

    .bad {
        background: #E6A23C;
        border-color: #E6A23C;
        color: #FFF;
    }

    .collect {
        background: #409EFF;
        border-color: #409EFF;
        color: #FFF;
    }

    .author-description {
        font-size: 15px;
        margin-top: 6px;
        color: #72777b;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .author-info i {
        font-size: 20px;
        padding: 5px;
        background-color: #e1efff;
        border-radius: 50%;
        margin-top: 10px;
        color: #7bb9ff;
        margin-right: 12px;
    }

    .author-info span {
        font-size: 15px;
    }

    .relate-article {
        margin-top: 10px;
    }

    .relate-article-list-item {
        padding: 12px 15px;
        text-align: left;
        display: block;
    }

    .relate-article-list-item:hover {
        background-color: hsla(0,0%,85.1%,.1);
    }

    .relate-article-list-item:hover .relate-article-info {
        color: #409EFF;
    }

    .relate-article-info {
        margin-top: 0.4rem;
        font-size: 13px;
        color: #b2bac2;
    }

    .relate-article-info span {
        margin-right: 1.5rem;
    }

    .relate-article-info span i {
        margin-right: .5rem;
    }
</style>

<style>
    .el-button-group .el-button i {
        font-size: 18px;
    }

    .comment-write-textarea .el-textarea__inner {
        padding: 12px 16px !important;
        background-color: #FAFAFA !important;
        font-size: 13px;
        border: 1px solid #eee;
        vertical-align: top;
        outline-style: none;
        font-family: -apple-system,sans-serif;
        font-weight: 400;
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

    .article-foot-center-top .el-link {
        font-size: 16px;
        color: #3D3D3D;
        font-weight: 500;
        line-height: 24px;
    }

    .el-collapse {
        border-top: none;
    }

    .el-collapse-item__content {
        padding-bottom: 14px;
    }

    .author .el-card .el-card__header {
        font-size: 14px;
        padding: 12px 15px;
        border-bottom: 1px solid #ebeef5;
    }

    .author .el-card .el-card__body {
        padding: 12px 15px;
    }

    .author-name .el-link {
        font-size: 16px;
    }

    .relate-article .el-card .el-card__header {
        font-size: 14px;
        padding: 12px 15px;
        border-bottom: 1px solid #ebeef5;
    }

    .relate-article .el-card .el-card__body {
        padding: 0;
    }
</style>

<style src="../../assets/css/iconfont.css"></style>
