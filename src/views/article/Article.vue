<template>
    <el-row style="padding-top: 10px" v-loading="isLoading">
        <el-col :span="20" :offset="2"> <!-- :offset="5"-->
            <el-row :gutter="10">
                <el-col :span="4"><!--style="transform: scale3d(1, 1, 1);"-->
                    <div class="table-of-content">
                        <div class="table-header">目录</div>
                        <div id="table-of-content" :style="{width: width + 'px'}"></div>
                    </div>
                </el-col>
                <el-col :span="15" :offset="4"> <!--:offset=4-->
                    <div class="article">
                        <div class="article-title">
                            {{article.title}}
                        </div>
                        <div class="article-info">
                            <el-collapse>
                                <el-collapse-item>
                                    <template v-slot:title>
                                        <el-link type="primary"
                                                 :underline="false"
                                                 class="article-author-name"
                                                 href="https://www.baidu.com">
                                            {{article.user.username}}
                                        </el-link>
                                        <el-tooltip effect="dark"
                                                    placement="bottom">
                                            <template v-slot:content>
                                                发布于 {{article.createTime | letter}}
                                            </template>
                                            <span class="article-time">最后发布于 {{article.updateTime | letter}}</span>
                                        </el-tooltip>
                                        <span class="article-read-count">阅读数 {{article.viewCount}}</span>
                                    </template>
                                    <div class="article-tag">
                                        本文标签：
                                        <el-tag size="small" v-for="tag in article.tags">{{tag.title}}</el-tag>
                                    </div>
                                    <div class="article-copyright">
                                        <div>版权声明：
                                            本文为Sagari博主「{{article.user.username}}」的原创文章，
                                            遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接及本声明。</div>
                                        <div>原文链接：
                                            <el-link type="primary"
                                                     :href="'http://sagari.cn/article/'+article.id"
                                                     style="vertical-align: baseline;">
                                                {{'http://sagari.cn/article/'+article.id}}
                                            </el-link>
                                        </div>
                                    </div>
                                </el-collapse-item>
                            </el-collapse>
                        </div>
                        <div class="article-body">
                            <markdown-view ref="markdown"
                                           :markdown="article.content"
                                           @register="registerEvent"></markdown-view>
                        </div>
                        <div class="article-body-foot">
                            <el-button-group>
                                <el-button type="success"
                                           plain
                                           @click="clickGood"
                                           class="iconfont"
                                           :class="[article.good?'el-icon-ali-good-fill':'el-icon-ali-good']">
                                    {{article.goodCount}}</el-button>
                                <el-button type="primary"
                                           plain
                                           @click="openCollectDialog"
                                           class="iconfont"
                                           :class="[article.collect?'el-icon-ali-collect-fill':'el-icon-ali-collect']">
                                    {{article.collectCount}}</el-button>
                            </el-button-group>
                            <el-dialog title="选择收藏夹"
                                       :visible.sync="favoritesDialogVisible"
                                       top="30vh"
                                       width="20%">
                                <template v-slot:default>
                                    <div>
                                        <span>收藏至：</span>
                                        <el-select v-model="favoritesId" size="small" placeholder="请选择">
                                            <el-option v-for="item in favorites"
                                                       :key="item.id"
                                                       :label="item.title"
                                                       :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </div>
                                </template>
                                <span slot="footer" class="dialog-footer">
                                    <el-button size="small" @click="favoritesDialogVisible = false">取 消</el-button>
                                    <el-button size="small" type="primary" @click="clickCollect">确 定</el-button>
                                </span>
                            </el-dialog>
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
                                        <el-link :underline="false">{{article.user.username}}</el-link>
                                    </div>
                                    <div class="article-foot-center-bot">
                                        发布了{{article.user.articleCount}}篇文章 · {{article.user.fansCount}}个粉丝
                                    </div>
                                </el-col>
                                <el-col :span="6" style="text-align: right">
                                    <el-button v-if="!follow"
                                               :loading="isFollowing"
                                               type="primary"
                                               size="medium"
                                               @click="concern">关注</el-button>
                                    <el-button v-else
                                               :loading="isFollowing"
                                               icon="el-icon-check"
                                               type="primary"
                                               plain
                                               size="medium"
                                               title="取消关注"
                                               @click="cancelConcern">已关注</el-button>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                    <div class="comment">
                        <div class="comment-write">
                            <el-row>
                                <el-col :span="2">
                                    <el-avatar :size="48" :src="user.avatar">
                                        <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
                                    </el-avatar>
                                </el-col>
                                <el-col :span="22">
                                    <el-input type="textarea"
                                              placeholder="写下你的评论..."
                                              :autosize="{minRows: 4, maxRows: 8}"
                                              v-model="content"
                                              resize="none"
                                              class="comment-write-textarea"
                                              @focus="commentButtonShow = true"></el-input>
                                </el-col>
                            </el-row>
                            <el-collapse-transition>
                                <div v-show="commentButtonShow" class="comment-write-button">
                                    <el-button type="danger"
                                               :disabled="content === ''"
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
                                <comment ref="comment"
                                         :article-id="articleId"
                                         :author="article.author"></comment>
                            </div>
                        </div>
                    </div>
                </el-col>
                <el-col :span="5">
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
                                                {{article.user.username}}
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
                            <div class="relate-article-list" v-for="item in relates">
                                <el-link :underline="false"
                                         :href="'/article/' + item.id"
                                         class="relate-article-list-item">
                                    <div class="relate-article-title">
                                        {{item.title}}
                                    </div>
                                    <div class="relate-article-info">
                                        <span>
                                            <i class="iconfont el-icon-ali-good"></i>{{item.goodCount}}
                                        </span>
                                        <span>
                                            <i class="iconfont el-icon-ali-comments"></i>{{item.commentCount}}
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
    import $ from 'jquery';
    import MarkdownView from "@/views/article/MarkdownView";
    import Comment from "@/views/article/Comment";
    import contentOpen from '@/assets/image/content-open.svg';
    import contentClose from '@/assets/image/content-close.svg';
    import {request} from "@/network/request";


    export default {
        name: "Article",
        created() {
            this.isLoading = true;
            window.$ = window.jQuery = $;
            this.articleId = Number(this.$route.params.articleId);
            request({
                url: "/article/article/" + this.articleId,
                method: "GET"
            }).then(res => {
                let result = res.data;
                if (result.code === 200) {
                    this.article = result.data;
                    request({
                        url: "/interactive/isFollow",
                        method: "GET",
                        params: {
                            followId: this.article.user.id
                        }
                    }).then(res => {
                        this.follow = res.data;
                    });
                } else {
                    this.$message({
                        message: result.msg,
                        type: 'error',
                        center: true,
                        offset: 100
                    });
                    this.isLoading = false;
                }
            }).catch(err => {
                this.$message({
                    message: "服务器打了个盹，请刷新重试",
                    type: 'error',
                    center: true,
                    offset: 100
                });
                this.isLoading = false;
            })
            setTimeout(() => {
                this.user = this.$store.getters.getUser;
                this.userId = this.$store.getters.getUserId;
            }, 1000);
            request({
                url: "/search/getRelateArticle",
                method: "GET",
                params: {
                    articleId: this.articleId
                }
            }).then(res => {
                let result = res.data;
                if (result.code === 200) {
                    this.relates = result.data.relates.map(item => item._source);
                }
            });
        },
        data() {
            return {
                user: {
                    username: ''
                },
                articleId: 0,
                userId: 0,
                content: '',
                commentButtonShow: false,
                isCommenting: false,
                orderRule: true,    //true代表时间正序,
                isOnlyLandlord: false,
                article: {
                    user: {
                        username: ''
                    }
                },
                relates:[],
                favorites: [],
                favoritesId: '',
                favoritesDialogVisible: false,
                follow: false,
                isFollowing: false,
                isLoading: false
            }
        },
        methods: {
            clickGood() {
                let article = this.article;
                request({
                    url: "/interactive/good",
                    method: "GET",
                    params: {
                        targetId: this.articleId,
                        articleId: this.article.id,
                        type: 1,
                        author: this.article.author
                    }
                }).then(res => {
                    let result = res.data;
                    if (result.code === 200) {
                        article.good = !article.good;
                        if (article.good) {
                            article.goodCount++;
                        } else {
                            article.goodCount--;
                        }
                    } else {
                        this.$message({
                            message: result.msg,
                            type: 'error',
                            center: true,
                            offset: 100
                        });
                    }
                }).catch(err => {
                    this.$message({
                        message: '获取文章信息失败，请刷新重试',
                        type: 'error',
                        center: true,
                        offset: 100
                    });
                });
            },
            openCollectDialog() {
                let userId = this.$store.getters.getUserId;
                if (userId === undefined || userId <= 0) {
                    return;
                }
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                request({
                    url: "/collect/getFavorites",
                    method: "GET",
                    params: {
                        targetUserId: userId
                    }
                }).then(res => {
                    let result = res.data;
                    if (result.code === 200) {
                        this.favorites = result.data.favorites;
                        this.favoritesDialogVisible = true;
                    } else {
                        this.$message({
                            message: result.msg,
                            type: 'error',
                            center: true,
                            offset: 100
                        });
                    }
                    loading.close();
                }).catch(err => {
                    this.$message({
                        message: '服务器打了个盹，请再试一次吧',
                        type: 'error',
                        center: true,
                        offset: 100
                    });
                    loading.close();
                });
            },
            clickCollect() {
                let article = this.article;
                request({
                    url: "/collect/collectArticle",
                    method: "PUT",
                    data: {
                        articleId: article.id,
                        favoritesId: this.favoritesId
                    }
                }).then(res => {
                    let result = res.data;
                    if (result.code === 200) {
                        article.collectCount++;
                        this.$message({
                            message: '收藏成功',
                            type: 'success',
                            center: true,
                            offset: 100
                        });
                    } else {
                        this.$message({
                            message: result.msg,
                            type: 'error',
                            center: true,
                            offset: 100
                        });
                    }
                }).catch(err => {
                    this.$message({
                        message: '服务器打了个盹，请再试一次吧',
                        type: 'error',
                        center: true,
                        offset: 100
                    });
                });
            },
            changeOrderRule(flag) {
                this.orderRule = flag;
                this.$refs.comment.order(this.orderRule);
            },
            concern() {
                this.isFollowing = true;
                let user = this.article.user;
                request({
                    url: "/interactive/follow",
                    method: "PUT",
                    params: {
                        followId: user.id
                    }
                }).then(res => {
                    let result = res.data;
                    if (result.code === 200) {
                        this.follow = true;
                        user.fansCount++;
                    } else {
                        this.$message({
                            message: result.msg,
                            type: 'error',
                            center: true,
                            offset: 100
                        });
                    }
                    this.isFollowing = false;
                }).catch(err => {
                    this.$message({
                        message: '服务器打了个盹，再试一次吧',
                        type: 'error',
                        center: true,
                        offset: 100
                    });
                    this.isFollowing = false;
                });
            },
            cancelConcern() {
                this.isFollowing = true;
                let user = this.article.user;
                let followIds = [];
                followIds.push(user.id);
                request({
                    url: "/interactive/cancelFollow",
                    method: "POST",
                    data: {
                        followIds
                    }
                }).then(res => {
                    let result = res.data;
                    if (result.code === 200) {
                        this.follow = false;
                        user.fansCount--;
                    } else {
                        this.$message({
                            message: result.msg,
                            type: 'error',
                            center: true,
                            offset: 100
                        });
                    }
                    this.isFollowing = false;
                }).catch(err => {
                    this.$message({
                        message: '服务器打了个盹，再试一次吧',
                        type: 'error',
                        center: true,
                        offset: 100
                    });
                    this.isFollowing = false;
                });
            },
            reply() {
                this.isCommenting = true;
                request({
                    url: "/comment/comment-parent",
                    method: "POST",
                    data: {
                        articleId: this.articleId,
                        content: this.content,
                        userId: this.userId
                    }
                }).then(res => {
                    let result = res.data;
                    if (result.code === 200) {
                        this.$message({
                            message: '评论成功',
                            type: 'success',
                            center: true,
                            offset: 100
                        });
                        this.content = '';
                        this.isCommenting = false;
                    } else {
                        this.$alert(result.msg, '评论失败', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.isCommenting = false;
                            }
                        });
                    }
                }).catch(err => {
                    this.$alert('评论未发表成功', '评论失败', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.isCommenting = false;
                        }
                    });
                });
            },
            onlyLandlord() {
                this.isOnlyLandlord = !this.isOnlyLandlord;
                this.$refs.comment.onlyLandlord(this.isOnlyLandlord);
                return this.isOnlyLandlord ? 'primary' : '';
            },
            registerEvent() {
                for(let item of $('.markdown-toc-list li')) {
                    $(item).click(() => {
                        let dom = $(event.target);
                        event.stopPropagation();
                        if (dom.attr('flag') === undefined || dom.attr('flag') === 'open') {
                            dom.attr('flag', 'close');
                            dom.css({'list-style': 'url(' + contentClose + ')'});
                        } else {
                            dom.attr('flag', 'open');
                            dom.css({'list-style': 'url(' + contentOpen + ')'});
                        }
                        dom.children('ul').slideToggle()
                    });
                }
                for (let item of $('.markdown-body pre')) {
                    let button = $('<input type="button" value="复制" style="float: right;display: none">');
                    button.click(() => {
                        let dom = $(event.target);
                        if (dom.val() !== '复制成功') {
                            let el = dom.parent();
                            let codeEl = $(el).find('code');
                            let code = '';
                            for (let temp of codeEl) {
                                code += $(temp).children('span').text() + '\n';
                            }
                            let text = document.createElement('textarea');
                            text.value = code;
                            document.body.appendChild(text);
                            text.select();
                            document.execCommand('Copy');
                            document.body.removeChild(text);
                            dom.val('复制成功');
                            this.$message({
                                message: '此段代码已成功复制到您的剪贴板！',
                                type: "success",
                                offset: 100
                            })
                        }
                        setTimeout(() => {
                            dom.val('复制');
                        }, 1000)
                    });
                    $(item).prepend(button);
                    $(item).mouseover(() => {
                        let el = $(event.currentTarget);
                        $(el).children('input').css('display', 'inline-block');
                    });
                    $(item).mouseout(() => {
                        let el = $(event.currentTarget);
                        $(el).children('input').css('display', 'none');
                    });
                }
                setTimeout(() => {
                    this.isLoading = false;
                }, 1000);
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
            collect() {
                if (this.article.isCollect) {
                    return 'el-icon-ali-collect-fill';
                } else {
                    return 'el-icon-ali-collect';
                }
            },
            width() {
                return window.innerWidth * 5 / 36 - 10;
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
        background-color: hsla(0, 0%, 85.1%, .1);
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

    .content-parent {

    }

    .table-of-content {
        position: fixed;
        background-color: #ffffff;
        border-radius: 4px;
        padding-bottom: 16px;
    }

    .table-header {
        font-size: 16px;
        padding: 12px 15px;
        border-bottom: 1px solid #ebeef5;
    }
</style>

<style>
    .el-button-group .el-icon-ali-good:before,
    .el-button-group .el-icon-ali-good-fill:before,
    .el-button-group .el-icon-ali-bad:before,
    .el-button-group .el-icon-ali-bad-fill:before,
    .el-button-group .el-icon-ali-collect:before,
    .el-button-group .el-icon-ali-collect-fill:before {
        font-size: 18px !important;
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

    .el-tooltip__popper {
        z-index: 10001 !important;
    }

    #table-of-content ul {
        list-style: url("../../assets/image/content-open.svg");
        padding-left: 35px;
    }

    #table-of-content ul li a {
        font-size: 14px;
        color: #6c757d;
        text-decoration: none;
    }
</style>
