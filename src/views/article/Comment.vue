<template>
    <div class="comments">
        <div class="comment" v-for="(comment, index) in comments">
            <div class="comment-header" @mouseover="showReply(index)" @mouseout="hideReply(index)">
                <el-row>
                    <el-col :span="2">
                        <el-link :underline="false"
                                 :href="'/user/' + comment.user.id"
                                 target="_blank">
                            <el-avatar :size="48" :src="comment.user.avatar">
                                <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
                            </el-avatar>
                        </el-link>
                    </el-col>
                    <el-col :span="17">
                        <div class="commenter-name">
                            <el-link :underline="false"
                                     :href="'/user/' + comment.user.id"
                                     target="_blank"
                                     style="margin-right: 5px">{{comment.user.username}}</el-link>
                            <el-tag size="mini"
                                    effect="plain"
                                    v-if="comment.userId === author">作者</el-tag>
                        </div>
                        <div class="comment-info">
                            <span>{{index + 1}}楼 </span>
                            <span>{{comment.createTime | dateFrm}}</span>
                        </div>
                    </el-col>
                    <el-col :span="5" class="comment-icon">
                        <el-button v-show="comment.isShowReplyAndDel"
                                   type="text"
                                   size="mini"
                                   @click="showInput(index)">回复</el-button>
                        <el-button v-show="comment.isShowReplyAndDel"
                                   type="text"
                                   size="mini"
                                   @click="del(index)">删除</el-button>
                        <el-button type="text"
                                   size="mini"
                                   class="iconfont el-icon-ali-good-fill"
                                   :class="{isActive: comment.good}"
                                   @click="good(index)">{{comment.goodCount}}
                        </el-button>
                    </el-col>
                </el-row>
            </div>
            <div class="comment-body" @mouseover="showReply(index)" @mouseout="hideReply(index)">
                <el-row>
                    <el-col :span="22" :offset="2" class="comment-content">
                        {{comment.content}}
                    </el-col>
                </el-row>
            </div>
            <el-row v-if="comment.child.length !== 0">
                <el-col :span="22" :offset="2">
                    <div class="child-comments">
                        <div class="child-comment"
                             v-for="(childComment, childIndex) in comment.child"
                             v-if="childIndex < comment.childOffset + 1">
                            <div class="comment-header"
                                 @mouseover="showReply(index, childIndex)"
                                 @mouseout="hideReply(index, childIndex)">
                                <el-row>
                                    <el-col :span="2">
                                        <el-link :underline="false"
                                                 :href="'/user/' + childComment.fromId"
                                                 target="_blank">
                                            <el-avatar :size="48" :src="childComment.fromAvatar">
                                                <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
                                            </el-avatar>
                                        </el-link>
                                    </el-col>
                                    <el-col :span="16">
                                        <div class="commenter-name">
                                            <el-link :underline="false"
                                                     :href="'/user/' + childComment.fromId"
                                                     target="_blank"
                                                     style="margin-right: 5px">{{childComment.fromUsername}}</el-link>
                                            <el-tag size="mini"
                                                    effect="plain"
                                                    v-if="childComment.fromId === author">作者</el-tag>
                                        </div>
                                        <div class="comment-info">
                                            <span>{{childComment.createTime | dateFrm}}</span>
                                        </div>
                                    </el-col>
                                    <el-col :span="6" class="comment-icon">
                                        <el-button v-show="childComment.isShowReplyAndDel"
                                                   type="text"
                                                   size="mini"
                                                   @click="showInput(index, childIndex)">回复</el-button>
                                        <el-button v-show="childComment.isShowReplyAndDel"
                                                   type="text"
                                                   size="mini"
                                                   @click="del(index, childIndex)">删除</el-button>
                                        <el-button type="text"
                                                   size="mini"
                                                   class="iconfont el-icon-ali-good-fill"
                                                   :class="{isActive: childComment.good}"
                                                   @click="good(index, childIndex)">{{childComment.goodCount}}
                                        </el-button>
                                    </el-col>
                                </el-row>
                            </div>
                            <div class="comment-body"
                                 @mouseover="showReply(index, childIndex)"
                                 @mouseout="hideReply(index, childIndex)">
                                <el-row>
                                    <el-col :span="22" :offset="2" class="child-comment-content">
                                        <span v-if="comment.userId !== childComment.toId">
                                            回复&nbsp;
                                            <el-popover placement="top"
                                                        width="200"
                                                        trigger="hover">
                                                <el-link slot="reference"
                                                         type="primary"
                                                         :underline="false"
                                                         :href="'/user/' + childComment.toId"
                                                         target="_blank"
                                                         style="font-size: 16px">{{childComment.toUsername}}</el-link>
                                                <div>你好啊</div>
                                            </el-popover>&nbsp;:
                                        </span>
                                        <span>{{preContent(index, childIndex)}}</span>
                                    </el-col>
                                </el-row>
                            </div>
                        </div>
                        <div class="child-comment load-more"
                             v-if="comment.childTotal > comment.childOffset">
                            <el-button type="text"
                                       :loading="comment.isChildLoading"
                                       @click="loadMoreChild(index)">加载更多</el-button>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <el-collapse-transition>
                <div class="per-comment-input" v-show="comment.isShowInput">
                    <el-row>
                        <el-col :span="22" :offset="2">
                            <el-input type="textarea"
                                      placeholder="写下你的评论..."
                                      :autosize="{minRows: 4, maxRows: 4}"
                                      v-model="comment.selfContent"
                                      resize="none"
                                      class="comment-write-textarea"
                                      @focus="commentButtonShow = true"></el-input>
                        </el-col>
                    </el-row>
                    <div class="comment-write-button">
                        <el-button type="danger"
                                   :disabled="comment.selfContent === ''"
                                   :loading="isCommenting"
                                   round
                                   size="small"
                                   @click="reply(index)">发表
                        </el-button>
                        <el-button round size="small" @click="hideInput(index)">取消</el-button>
                    </div>
                </div>
            </el-collapse-transition>
            <div class="comment-bot">
                <el-row>
                    <el-col :span="22" :offset="2">
                        <el-divider></el-divider>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="no-content" v-if="comments.length === 0">
            暂时还没有评论，快和作者交流一下吧(#^.^#)
        </div>
        <div style="text-align: center">
            <el-pagination
                background
                layout="total, prev, pager, next, jumper, ->"
                :total="pagination.total"
                :page-size="5"
                :page-count="pagination.pages"
                :pager-count="5"
                :current-page="pagination.pageNum"
                hide-on-single-page
                @current-change="currentPage">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import {request} from "@/network/request";

    export default {
        name: 'Comment',
        created() {
            setTimeout(() => {
                this.userId = this.$store.getters.getUserId;
                if (this.userId === undefined || this.userId <= 0) {
                    this.userId = null;
                }
                request({
                    url: "/comment/comment/" + this.articleId,
                    method: "GET",
                    params: {
                        userId: this.userId,
                        page: 1,
                        size: 5
                    }
                }).then(res => {
                    let result = res.data;
                    if (result.code === 200) {
                        let data = result.data;
                        if (data.list !== undefined) {
                            this.comments = data.list;
                            for (let i = 0; i < this.comments.length; i++) {
                                this.$set(this.comments[i], "isShowReplyAndDel", false);
                                this.$set(this.comments[i], "isChildLoading", false);
                                this.$set(this.comments[i], "selfContent", '');
                                this.$set(this.comments[i], "selfContentHead", '');
                                for (let j = 0; j < this.comments[i].child.length; j++) {
                                    this.$set(this.comments[i].child[j], "isShowReplyAndDel", false);
                                }
                            }
                            delete data.list;
                            this.pagination = data;
                        }
                    }
                }).catch(err => {
                    this.$message({
                        message: '获取评论失败，请刷新重试',
                        type: 'error',
                        center: true,
                        offset: 100
                    });
                });
            }, 1000);
        },
        data() {
            return {
                commentCount: 0,
                userId: undefined,
                isCommenting: false,
                orderRule: true,
                comments: [],
                back: [],
                pagination: {},
                childId: null
            }
        },
        props: {
            author: {
                type: Number,
                default: 0
            },
            articleId: {
                type: Number,
                default: 0
            }
        },
        mounted() {
            this.commentCount = this.getCommentCount();
        },
        methods: {
            showReply(index, childIndex) {
                let comment = this.comments[index];
                if (childIndex === undefined) {
                    comment.isShowReplyAndDel = true;
                } else {
                    let childComment = comment.child[childIndex];
                    childComment.isShowReplyAndDel = true;
                }
            },
            hideReply(index, childIndex) {
                let comment = this.comments[index];
                if (childIndex === undefined) {
                    comment.isShowReplyAndDel = false;
                } else {
                    let childComment = comment.child[childIndex];
                    childComment.isShowReplyAndDel = false;
                }
            },
            showInput(index, childIndex) {
                let comment = this.comments[index];
                comment.isShowInput = true;
                comment.toId = comment.userId;
                if (childIndex !== undefined) {
                    let childComment = comment.child[childIndex];
                    comment.toId = childComment.fromId;
                    comment.selfContentHead = '回复 ' + childComment.fromUsername + ' : ';
                    comment.selfContent = comment.selfContentHead;
                    this.childId = childComment.id;
                }

            },
            hideInput(index) {
                let comment = this.comments[index];
                comment.isShowInput = false;
                comment.toId = undefined;
                comment.selfContent = '';
                comment.selfContentHead = '';
                this.childId = null;
            },
            good(index, childIndex) {
                if (this.userId === undefined || this.userId === null || this.userId <= 0) {
                    this.$message({
                        message: '您需要登录之后才能点赞',
                        type: 'error',
                        center: true,
                        offset: 100,
                    });
                    return;
                }
                let comment = this.comments[index];
                if (childIndex === undefined) {
                    request({
                        url: "/interactive/good",
                        method: "GET",
                        params: {
                            targetId: comment.id,
                            articleId: this.articleId,
                            type: 2,
                            author: this.author,
                            toUserId: comment.userId
                        }
                    }).then(res => {
                        let result = res.data;
                        if (result.code === 200) {
                            comment.good = !comment.good;
                            if (comment.good) {
                                comment.goodCount++;
                            } else {
                                comment.goodCount--;
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
                            message: '服务器打了个盹，请再试一次吧',
                            type: 'error',
                            center: true,
                            offset: 100
                        });
                    });
                } else {
                    let childComment = comment.child[childIndex];
                    request({
                        url: "/interactive/good",
                        method: "GET",
                        params: {
                            targetId: childComment.id,
                            articleId: this.articleId,
                            type: 3,
                            author: this.author,
                            toUserId: childComment.fromId
                        }
                    }).then(res => {
                        let result = res.data;
                        if (result.code === 200) {
                            childComment.good = !childComment.good;
                            if (childComment.good) {
                                childComment.goodCount++;
                            } else {
                                childComment.goodCount--;
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
                            message: '服务器打了个盹，请再试一次吧',
                            type: 'error',
                            center: true,
                            offset: 100
                        });
                    });
                }
            },
            reply(index) {
                this.isCommenting = true;
                let comment = this.comments[index];
                let content = '';
                if (comment.selfContentHead === '') {
                    content = comment.selfContent;
                } else {
                    content = comment.selfContent.substring(comment.selfContent.indexOf(comment.selfContentHead) + comment.selfContentHead.length);
                }
                request({
                    url: "/comment/comment-child",
                    method: "POST",
                    data: {
                        articleId: this.articleId,
                        authorId: this.author,
                        content: content,
                        parentId: comment.id,
                        toId: comment.toId,
                        childId: this.childId
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
                        comment.selfContent = '';
                        comment.selfContentHead = '';
                        comment.isShowInput = false;
                        //comment.child.push(result.data);
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
            del(index, childIndex) {
                this.$confirm("评论删除之后无法恢复，是否继续？", "删除评论", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    let comment = this.comments[index];
                    if (childIndex === undefined) {
                        request({
                            url: "/comment/comment-parent/" + comment.id,
                            method: "DELETE",
                            params: {
                                articleId: this.articleId
                            }
                        }).then(res => {
                            let result = res.data;
                            if (result.code === 200) {
                                this.$message({
                                    message: '删除评论成功',
                                    type: 'success',
                                    center: true,
                                    offset: 100
                                });
                                this.comments.splice(index, 1);
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
                                message: '删除评论失败，请再试一次吧',
                                type: 'error',
                                center: true,
                                offset: 100
                            });
                        });
                    } else {
                        let childComment = comment.child[childIndex];
                        request({
                            url: "/comment/comment-child/" + childComment.id,
                            method: "DELETE",
                            params: {
                                articleId: this.articleId,
                                parentId: childComment.parentId
                            }
                        }).then(res => {
                            let result = res.data;
                            if (result.code === 200) {
                                this.$message({
                                    message: '删除评论成功',
                                    type: 'error',
                                    center: true,
                                    offset: 100
                                });
                                this.comments[index].child.splice(childIndex, 1);
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
                                message: '删除评论失败，请再试一次吧',
                                type: 'error',
                                center: true,
                                offset: 100
                            });
                        });
                    }
                });
            },
            preContent(index, childIndex) {
                let comment = this.comments[index];
                let childComment = comment.child[childIndex];
                return childComment.content;
            },
            getCommentCount() {
                let count = this.comments.length;
                for (let comment of this.comments) {
                    count += comment.child.length;
                }
                this.$emit('getCommentCount', count);
                return count;
            },
            order(flag) {
                if (this.orderRule !== flag) {
                    this.orderRule = flag;
                    this.comments = this.comments.reverse();
                    for (let comment of this.comments) {
                        comment.child = comment.child.reverse();
                    }
                }
            },
            onlyLandlord(flag) {
                if (flag) {
                    this.back = this.comments.slice();
                    let comments = this.comments;
                    for (let i = 0; i < comments.length; i++) {
                        if (this.author !== comments[i].userId) {
                            comments.splice(i, 1);
                            i--;
                        }
                    }
                } else {
                    this.comments = this.back.slice();
                }
            },
            currentPage(currentPage) {
                if (this.userId === undefined || this.userId <= 0) {
                    this.userId = null;
                }
                request({
                    url: "/comment/comment/" + this.articleId,
                    method: "GET",
                    params: {
                        userId: this.userId,
                        page: currentPage,
                        size: 5
                    }
                }).then(res => {
                    let result = res.data;
                    if (result.code === 200) {
                        let data = result.data;
                        this.comments = data.list;
                        for (let i = 0; i < this.comments.length; i++) {
                            this.$set(this.comments[i], "isShowReplyAndDel", false);
                            this.$set(this.comments[i], "isChildLoading", false);
                            this.$set(this.comments[i], "childSize", 2);
                            this.$set(this.comments[i], "selfContent", '');
                            this.$set(this.comments[i], "selfContentHead", '');
                            for (let j = 0; j < this.comments[i].child.length; j++) {
                                this.$set(this.comments[i].child[j], "isShowReplyAndDel", false);
                            }
                        }
                        delete data.list;
                        this.pagination = data;
                    }
                }).catch(err => {
                    this.$message({
                        message: '获取评论失败，请刷新重试',
                        type: 'error',
                        center: true,
                        offset: 100
                    });
                });
            },
            loadMoreChild(index) {
                let comment = this.comments[index];
                comment.isChildLoading = true;
                let limit = 5;
                if (comment.childOffset + limit - 1 > comment.childTotal) {
                    limit = comment.childTotal - comment.childOffset + 1;
                }
                if (this.userId === undefined || this.userId <= 0) {
                    this.userId = null;
                }
                request({
                    url: "/comment/getChildComment",
                    method: "GET",
                    params: {
                        parentId: comment.id,
                        userId: this.userId,
                        offset: comment.childOffset,
                        limit: limit
                    }
                }).then(res => {
                    let result = res.data;
                    if (result.code === 200) {
                        let data = result.data;
                        comment.childOffset = data.offset;
                        comment.childTotal = data.total;
                        for (let i = 0; i < data.child.length; i++) {
                            this.$set(data.child[i], "isShowReplyAndDel", false);
                        }
                        this.comments[index].child = comment.child.concat(data.child);
                        comment.isChildLoading = false;
                    } else {
                        this.$message({
                            message: result.msg,
                            type: 'error',
                            center: true,
                            offset: 100
                        });
                        comment.isChildLoading = false;
                    }
                }).catch(err => {
                    this.$message({
                        message: '获取评论失败，再试一次吧',
                        type: 'error',
                        center: true,
                        offset: 100
                    });
                    comment.isChildLoading = false;
                });
            }
        }
    }
</script>

<style scoped>
    .comments {
        padding-bottom: 24px;
    }

    .commenter-name .el-link {
        font-size: 15px;
        color: #404040;
        line-height: 24px;
    }

    .commenter-name .el-tag:hover {
        background-color: #fff;
        color: #409eff;
    }

    .comment-info {
        font-size: 12px;
        color: #969696;
        line-height: 24px;
    }

    .comment-header .el-button {
        color: #b0b0b0;
    }

    .comment-header .el-button:hover {
        color: #3a8ee6;
    }

    .isActive {
        color: #3a8ee6 !important;
    }

    .per-comment-input {
        margin-top: 16px;
    }

    .comment-write-button {
        text-align: right;
        margin-top: 16px;
    }

    .comment-body {
        font-size: 16px;
        line-height: 1.5;
        word-break: break-word;
    }

    .comment-icon .el-icon-ali-good-fill {
        font-size: 12px !important;
    }

    .comment-icon {
        text-align: right;
        padding-right: 20px;
    }

    .comment .el-divider {
        margin-top: 10px;
        margin-bottom: 10px;
    }

    .child-comments {
        background-color: #fafbfc;
        margin-top: 12px;
        padding-left: 12px;
        border-radius: 4px;
    }

    .child-comments .child-comment:not(:first-child) {
        margin-top: 10px;
    }

    .child-comments .child-comment:first-child {
        padding-top: 10px;
    }

    .child-comments .child-comment:last-child {
        padding-bottom: 10px;
    }

    .child-comments .child-comment:not(:last-child) .child-comment-content {
        padding-bottom: 10px;
        border-bottom: 1px solid #DCDFE6;
    }

    .child-comment-content .el-link {
        vertical-align: bottom;
    }

    .load-more {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .no-content {
        text-align: center;
        padding: 15px;
        font-size: 18px;
        color: #999999;
    }
</style>
