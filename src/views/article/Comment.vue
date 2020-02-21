<template>
    <div class="comments">
        <div class="comment" v-for="(comment, index) in comments">
            <div class="comment-header" @mouseover="showReply(index)" @mouseout="hideReply(index)">
                <el-row>
                    <el-col :span="2">
                        <el-link :underline="false">
                            <el-avatar :size="48" :src="comment.userAvatar">
                                <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
                            </el-avatar>
                        </el-link>
                    </el-col>
                    <el-col :span="17">
                        <div class="commenter-name">
                            <el-link :underline="false" style="margin-right: 5px">{{comment.userName}}</el-link>
                            <el-tag size="mini"
                                    effect="plain"
                                    v-if="comment.userId === articleUserId">作者</el-tag>
                        </div>
                        <div class="comment-info">
                            <span>{{index + 1}}楼 </span>
                            <span>{{getTime('YY-mm-dd HH:MM:SS', comment.time)}}</span>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <el-button type="text"
                                   size="mini"
                                   icon="el-icon-ali-good-fill"
                                   :class="{isActive: comment.isActive === 1}"
                                   @click="good(index)">{{comment.good}}
                        </el-button>
                        <el-button type="text"
                                   size="mini"
                                   icon="el-icon-ali-bad-fill"
                                   :class="{isActive: comment.isActive === 2}"
                                   @click="bad(index)">{{comment.bad}}
                        </el-button>
                    </el-col>
                    <el-col :span="2">
                        <el-button v-show="comment.isShowReplyAndDel"
                                   type="text"
                                   size="mini"
                                   @click="showInput(index)">回复</el-button>
                        <el-button v-show="comment.isShowReplyAndDel"
                                   type="text"
                                   size="mini"
                                   @click="del(index)">删除</el-button>
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
            <el-row v-if="comment.childComments.length !== 0">
                <el-col :span="22" :offset="2">
                    <div class="child-comments">
                        <div class="child-comment"
                             v-for="(childComment, childIndex) in comment.childComments"
                             v-if="childIndex < comment.childSize">
                            <div class="comment-header" @mouseover="showReply(index, childIndex)"
                                 @mouseout="hideReply(index, childIndex)">
                                <el-row>
                                    <el-col :span="2">
                                        <el-link :underline="false">
                                            <el-avatar :size="48" :src="childComment.fromAvatar">
                                                <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
                                            </el-avatar>
                                        </el-link>
                                    </el-col>
                                    <el-col :span="16">
                                        <div class="commenter-name">
                                            <el-link :underline="false" style="margin-right: 5px">{{childComment.from}}</el-link>
                                            <el-tag size="mini"
                                                    effect="plain"
                                                    v-if="childComment.fromId === articleUserId">作者</el-tag>
                                        </div>
                                        <div class="comment-info">
                                            <span>{{getTime('YY-mm-dd HH:MM:SS', childComment.time)}}</span>
                                        </div>
                                    </el-col>
                                    <el-col :span="3">
                                        <el-button type="text"
                                                   size="mini"
                                                   icon="el-icon-ali-good-fill"
                                                   :class="{isActive: childComment.isActive === 1}"
                                                   @click="good(index, childIndex)">{{childComment.good}}
                                        </el-button>
                                        <el-button type="text"
                                                   size="mini"
                                                   icon="el-icon-ali-bad-fill"
                                                   :class="{isActive: childComment.isActive === 2}"
                                                   @click="bad(index, childIndex)">{{childComment.bad}}
                                        </el-button>
                                    </el-col>
                                    <el-col :span="3">
                                        <el-button v-show="childComment.isShowReplyAndDel"
                                                   type="text"
                                                   size="mini"
                                                   @click="showInput(index, childIndex)">回复</el-button>
                                        <el-button v-show="childComment.isShowReplyAndDel"
                                                   type="text"
                                                   size="mini"
                                                   @click="del(index, childIndex)">删除</el-button>
                                    </el-col>
                                </el-row>
                            </div>
                            <div class="comment-body" @mouseover="showReply(index, childIndex)"
                                 @mouseout="hideReply(index, childIndex)">
                                <el-row>
                                    <el-col :span="22" :offset="2" class="child-comment-content">
                                        <span v-if="comment.userId !== childComment.toId">
                                            回复&nbsp;
                                            <el-popover
                                                placement="top"
                                                width="200"
                                                trigger="hover">
                                                <el-link slot="reference"
                                                         type="primary"
                                                         :underline="false"
                                                         style="font-size: 16px">{{childComment.to}}</el-link>
                                                <div>你好啊</div>
                                            </el-popover>&nbsp;:
                                        </span>
                                        <span>{{preContent(index, childIndex)}}</span>
                                    </el-col>
                                </el-row>
                            </div>
                        </div>
                        <div class="child-comment load-more"
                             v-if="comment.childComments.length > comment.childSize">
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
        <div style="text-align: center">
            <el-pagination
                background
                layout="total, prev, pager, next, jumper, ->"
                :total="pagination.total"
                :page-size="5"
                :page-count="pagination.pageCount"
                :pager-count="5"
                :current-page="pagination.currentPage"
                hide-on-single-page
                @current-change="currentPage">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Comment',
        data() {
            return {
                commentCount: 0,
                userId: 1,
                isCommenting: false,
                orderRule: true,
                comments: [
                    {
                        commentId: 1,
                        userId: 1,
                        userName: 'Sakura',
                        userAvatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
                        content: '你牛逼行了吧',
                        isActive: 0,
                        good: 0,
                        bad: 0,
                        time: 1581680000,
                        isShowReplyAndDel: false,
                        isShowInput: false,
                        selfContent: '',
                        selfContentHead: '',
                        toId: undefined,
                        childSize: 2,
                        isChildLoading: false,
                        childComments: [
                            {
                                commentId: 2,
                                from: '远坂凛',
                                fromId: 2,
                                fromAvatar: 'https://ae01.alicdn.com/kf/Hd60a3f7c06fd47ae85624badd32ce54dv.jpg',
                                to: 'Sakura',
                                toId: 1,
                                toAvatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
                                content: '孙笑川必死',
                                isActive: 0,
                                good: 0,
                                bad: 0,
                                time: 1581680100,
                                isShowReplyAndDel: false
                            },
                            {
                                commentId: 3,
                                from: '伊莉雅',
                                fromId: 3,
                                fromAvatar: 'https://ae01.alicdn.com/kf/Hf6c0b4a7428b4edf866a9fbab75568e6U.jpg',
                                to: '远坂凛',
                                toId: 2,
                                toAvatar: 'https://ae01.alicdn.com/kf/Hd60a3f7c06fd47ae85624badd32ce54dv.jpg',
                                content: '我也觉得孙笑川必死',
                                isActive: 0,
                                good: 0,
                                bad: 0,
                                time: 1581680200,
                                isShowReplyAndDel: false
                            },
                            {
                                commentId: 3,
                                from: '伊莉雅',
                                fromId: 3,
                                fromAvatar: 'https://ae01.alicdn.com/kf/Hf6c0b4a7428b4edf866a9fbab75568e6U.jpg',
                                to: '远坂凛',
                                toId: 2,
                                toAvatar: 'https://ae01.alicdn.com/kf/Hd60a3f7c06fd47ae85624badd32ce54dv.jpg',
                                content: '你可拉鸡巴倒把你可',
                                isActive: 0,
                                good: 0,
                                bad: 0,
                                time: 1581680200,
                                isShowReplyAndDel: false
                            }
                        ]
                    },
                    {
                        commentId: 4,
                        userId: 1,
                        userName: 'Sakura',
                        userAvatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
                        content: '哈哈',
                        isActive: 0,
                        good: 0,
                        bad: 0,
                        time: 1581680300,
                        isShowReplyAndDel: false,
                        isShowInput: false,
                        selfContent: '',
                        selfContentHead: '',
                        toId: undefined,
                        childSize: 2,
                        isChildLoading: false,
                        childComments: [
                            {
                                commentId: 5,
                                from: '远坂凛',
                                fromId: 2,
                                fromAvatar: 'https://ae01.alicdn.com/kf/Hd60a3f7c06fd47ae85624badd32ce54dv.jpg',
                                to: 'Sakura',
                                toId: 1,
                                toAvatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
                                content: '嘻嘻',
                                isActive: 0,
                                good: 0,
                                bad: 0,
                                time: 1581680400,
                                isShowReplyAndDel: false
                            },
                            {
                                commentId: 6,
                                from: '伊莉雅',
                                fromId: 3,
                                fromAvatar: 'https://ae01.alicdn.com/kf/Hf6c0b4a7428b4edf866a9fbab75568e6U.jpg',
                                to: '远坂凛',
                                toId: 2,
                                toAvatar: 'https://ae01.alicdn.com/kf/Hd60a3f7c06fd47ae85624badd32ce54dv.jpg',
                                content: '嘿嘿',
                                isActive: 0,
                                good: 0,
                                bad: 0,
                                time: 1581680500,
                                isShowReplyAndDel: false
                            }
                        ]
                    },
                    {
                        commentId: 7,
                        userId: 2,
                        userName: '远坂凛',
                        userAvatar: 'https://ae01.alicdn.com/kf/Hd60a3f7c06fd47ae85624badd32ce54dv.jpg',
                        content: 'emiya shero',
                        isActive: 0,
                        good: 0,
                        bad: 0,
                        time: 1581690000,
                        isShowReplyAndDel: false,
                        isShowInput: false,
                        selfContent: '',
                        selfContentHead: '',
                        toId: undefined,
                        childSize: 2,
                        isChildLoading: false,
                        childComments: []
                    },
                    {
                        commentId: 7,
                        userId: 2,
                        userName: '远坂凛',
                        userAvatar: 'https://ae01.alicdn.com/kf/Hd60a3f7c06fd47ae85624badd32ce54dv.jpg',
                        content: 'emiya shero',
                        isActive: 0,
                        good: 0,
                        bad: 0,
                        time: 1581690000,
                        isShowReplyAndDel: false,
                        isShowInput: false,
                        selfContent: '',
                        selfContentHead: '',
                        toId: undefined,
                        childSize: 2,
                        isChildLoading: false,
                        childComments: []
                    },
                    {
                        commentId: 7,
                        userId: 2,
                        userName: '远坂凛',
                        userAvatar: 'https://ae01.alicdn.com/kf/Hd60a3f7c06fd47ae85624badd32ce54dv.jpg',
                        content: 'emiya shero',
                        isActive: 0,
                        good: 0,
                        bad: 0,
                        time: 1581690000,
                        isShowReplyAndDel: false,
                        isShowInput: false,
                        selfContent: '',
                        selfContentHead: '',
                        toId: undefined,
                        childSize: 2,
                        isChildLoading: false,
                        childComments: []
                    }
                ],
                back: [],
                pagination: {
                    total: 6,
                    pageCount: 1,
                    currentPage: 1
                }
            }
        },
        props: {
            articleUserId: String|Number
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
                    let childComment = comment.childComments[childIndex];
                    childComment.isShowReplyAndDel = true;
                }
            },
            hideReply(index, childIndex) {
                let comment = this.comments[index];
                if (childIndex === undefined) {
                    comment.isShowReplyAndDel = false;
                } else {
                    let childComment = comment.childComments[childIndex];
                    childComment.isShowReplyAndDel = false;
                }
            },
            showInput(index, childIndex) {
                let comment = this.comments[index];
                comment.isShowInput = true;
                comment.toId = comment.userId;
                if (childIndex !== undefined) {
                    let childComment = comment.childComments[childIndex];
                    comment.toId = childComment.fromId;
                    comment.selfContentHead = '回复 ' + childComment.from + ' : ';
                    comment.selfContent = comment.selfContentHead;
                }
            },
            hideInput(index) {
                let comment = this.comments[index];
                comment.isShowInput = false;
                comment.toId = undefined;
                comment.selfContent = '';
                comment.selfContentHead = '';
            },
            good(index, childIndex) {
                let comment = this.comments[index];
                if (childIndex === undefined) {
                    if (comment.isActive === 1) {
                        comment.isActive = 0;
                        comment.good--;
                    } else if (comment.isActive === 0) {
                        comment.isActive = 1;
                        comment.good++;
                    } else {
                        comment.isActive = 1;
                        comment.bad--;
                        comment.good++;
                    }
                } else {
                    let childComment = comment.childComments[childIndex];
                    if (childComment.isActive === 1) {
                        childComment.isActive = 0;
                        childComment.good--;
                    } else if (childComment.isActive === 0) {
                        childComment.isActive = 1;
                        childComment.good++;
                    } else {
                        childComment.isActive = 1;
                        childComment.bad--;
                        childComment.good++;
                    }
                }
            },
            bad(index, childIndex) {
                let comment = this.comments[index];
                if (childIndex === undefined) {
                    if (comment.isActive === 2) {
                        comment.isActive = 0;
                        comment.bad--;
                    } else if (comment.isActive === 0) {
                        comment.isActive = 2;
                        comment.bad++;
                    } else {
                        comment.isActive = 2;
                        comment.good--;
                        comment.bad++;
                    }
                } else {
                    let childComment = comment.childComments[childIndex];
                    if (childComment.isActive === 2) {
                        childComment.isActive = 0;
                        childComment.bad--;
                    } else if (childComment.isActive === 0) {
                        childComment.isActive = 2;
                        childComment.bad++;
                    } else {
                        childComment.isActive = 2;
                        childComment.good--;
                        childComment.bad++;
                    }
                }
            },
            reply(index) {
                this.isCommenting = true;
                let comment = this.comments[index];
                let child = {};
                child.commentId = ++this.commentCount;
                if (this.userId === 1) {
                    child.from = 'Sakura';
                    child.fromId = this.userId;
                    child.fromAvatar = 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png';
                } else if (this.userId === 2) {
                    child.from = '远坂凛';
                    child.fromId = this.userId;
                    child.fromAvatar = 'https://ae01.alicdn.com/kf/Hd60a3f7c06fd47ae85624badd32ce54dv.jpg';
                } else if (this.userId === 3) {
                    child.from = '伊莉雅';
                    child.fromId = this.userId;
                    child.fromAvatar = 'https://ae01.alicdn.com/kf/Hf6c0b4a7428b4edf866a9fbab75568e6U.jpg';
                }
                if (comment.toId === 1) {
                    child.to = 'Sakura';
                    child.toId = comment.toId;
                    child.toAvatar = 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png';
                } else if (comment.toId === 2) {
                    child.to = '远坂凛';
                    child.toId = comment.toId;
                    child.toAvatar = 'https://ae01.alicdn.com/kf/Hd60a3f7c06fd47ae85624badd32ce54dv.jpg';
                } else if (comment.toId === 3) {
                    child.to = '伊莉雅';
                    child.toId = comment.toId;
                    child.toAvatar = 'https://ae01.alicdn.com/kf/Hf6c0b4a7428b4edf866a9fbab75568e6U.jpg';
                }
                child.isActive = 0;
                child.good = 0;
                child.bad = 0;
                child.isShowReplyAndDel = false;
                child.time = new Date().getTime() / 1000;
                if (comment.selfContentHead === '') {
                    child.content = comment.selfContent;
                } else {
                    child.content = comment.selfContent.substring(comment.selfContent.indexOf(comment.selfContentHead) + comment.selfContentHead.length);
                }
                setTimeout(() => {
                    comment.childComments.push(child);
                    this.isCommenting = false;
                    comment.selfContent = '';
                    comment.selfContentHead = '';
                    comment.isShowInput = false;
                    let parent = this.$parent.$parent.$parent.$parent.$parent;
                    parent.article.commentCount = this.commentCount;
                }, 1000);
            },
            del(index, childIndex) {
                if (childIndex === undefined) {
                    this.comments.splice(index, 1);
                } else {
                    this.comments[index].childComments.splice(childIndex, 1);
                }
            },
            preContent(index, childIndex) {
                let comment = this.comments[index];
                let childComment = comment.childComments[childIndex];
                return childComment.content;
                /*if (comment.userId === childComment.toId) {
                    return childComment.content;
                } else {
                    return '回复 <el-link :underfalse="false" href="http://www.baidu.com">' +
                        childComment.to + '</el-link> : ' + childComment.content;
                    /!*return '回复 ' + childComment.to + ' : ' + childComment.content;*!/
                }*/
            },
            getCommentCount() {
                let count = this.comments.length;
                for (let comment of this.comments) {
                    count += comment.childComments.length;
                }
                this.$emit('getCommentCount', count);
                return count;
            },
            getTime(fmt, date) {
                date = new Date(date * 1000);
                let ret;
                let opt = {
                    'Y+': date.getFullYear().toString(),        // 年
                    'm+': (date.getMonth() + 1).toString(),     // 月
                    'd+': date.getDate().toString(),            // 日
                    'H+': date.getHours().toString(),           // 时
                    'M+': date.getMinutes().toString(),         // 分
                    'S+': date.getSeconds().toString()          // 秒
                    // 有其他格式化字符需求可以继续添加，必须转化成字符串
                };
                for (let k in opt) {
                    ret = new RegExp('(' + k + ')').exec(fmt);
                    if (ret) {
                        fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, '0')))
                    }
                }
                return fmt;
            },
            order(flag) {
                if (this.orderRule !== flag) {
                    this.orderRule = flag;
                    this.comments = this.comments.reverse();
                    for (let comment of this.comments) {
                        comment.childComments = comment.childComments.reverse();
                    }
                }
            },
            onlyLandlord(flag) {
                if (flag) {
                    this.back = this.comments.slice();
                    let comments = this.comments;
                    for (let i = 0; i < comments.length; i++) {
                        if (this.articleUserId !== comments[i].userId) {
                            comments.splice(i, 1);
                            i--;
                        }
                    }
                } else {
                    this.comments = this.back.slice();
                }
            },
            currentPage(currentPage) {
                if (currentPage === 1) {
                    this.comments = [
                        {
                            commentId: 1,
                            userId: 1,
                            userName: 'Sakura',
                            userAvatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
                            content: '你牛逼行了吧',
                            isActive: 0,
                            good: 0,
                            bad: 0,
                            time: 1581680000,
                            isShowReplyAndDel: false,
                            isShowInput: false,
                            selfContent: '',
                            selfContentHead: '',
                            toId: undefined,
                            childComments: [
                                {
                                    commentId: 2,
                                    from: '远坂凛',
                                    fromId: 2,
                                    fromAvatar: 'https://ae01.alicdn.com/kf/Hd60a3f7c06fd47ae85624badd32ce54dv.jpg',
                                    to: 'Sakura',
                                    toId: 1,
                                    toAvatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
                                    content: '孙笑川必死',
                                    isActive: 0,
                                    good: 0,
                                    bad: 0,
                                    time: 1581680100,
                                    isShowReplyAndDel: false
                                },
                                {
                                    commentId: 3,
                                    from: '伊莉雅',
                                    fromId: 3,
                                    fromAvatar: 'https://ae01.alicdn.com/kf/Hf6c0b4a7428b4edf866a9fbab75568e6U.jpg',
                                    to: '远坂凛',
                                    toId: 2,
                                    toAvatar: 'https://ae01.alicdn.com/kf/Hd60a3f7c06fd47ae85624badd32ce54dv.jpg',
                                    content: '我也觉得孙笑川必死',
                                    isActive: 0,
                                    good: 0,
                                    bad: 0,
                                    time: 1581680200,
                                    isShowReplyAndDel: false
                                }
                            ]
                        },
                        {
                            commentId: 4,
                            userId: 1,
                            userName: 'Sakura',
                            userAvatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
                            content: '哈哈',
                            isActive: 0,
                            good: 0,
                            bad: 0,
                            time: 1581680300,
                            isShowReplyAndDel: false,
                            isShowInput: false,
                            selfContent: '',
                            selfContentHead: '',
                            toId: undefined,
                            childComments: [
                                {
                                    commentId: 5,
                                    from: '远坂凛',
                                    fromId: 2,
                                    fromAvatar: 'https://ae01.alicdn.com/kf/Hd60a3f7c06fd47ae85624badd32ce54dv.jpg',
                                    to: 'Sakura',
                                    toId: 1,
                                    toAvatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
                                    content: '嘻嘻',
                                    isActive: 0,
                                    good: 0,
                                    bad: 0,
                                    time: 1581680400,
                                    isShowReplyAndDel: false
                                },
                                {
                                    commentId: 6,
                                    from: '伊莉雅',
                                    fromId: 3,
                                    fromAvatar: 'https://ae01.alicdn.com/kf/Hf6c0b4a7428b4edf866a9fbab75568e6U.jpg',
                                    to: '远坂凛',
                                    toId: 2,
                                    toAvatar: 'https://ae01.alicdn.com/kf/Hd60a3f7c06fd47ae85624badd32ce54dv.jpg',
                                    content: '嘿嘿',
                                    isActive: 0,
                                    good: 0,
                                    bad: 0,
                                    time: 1581680500,
                                    isShowReplyAndDel: false
                                }
                            ]
                        },
                        {
                            commentId: 7,
                            userId: 2,
                            userName: '远坂凛',
                            userAvatar: 'https://ae01.alicdn.com/kf/Hd60a3f7c06fd47ae85624badd32ce54dv.jpg',
                            content: 'emiya shero',
                            isActive: 0,
                            good: 0,
                            bad: 0,
                            time: 1581690000,
                            isShowReplyAndDel: false,
                            isShowInput: false,
                            selfContent: '',
                            selfContentHead: '',
                            toId: undefined,
                            childComments: []
                        },
                        {
                            commentId: 7,
                            userId: 2,
                            userName: '远坂凛',
                            userAvatar: 'https://ae01.alicdn.com/kf/Hd60a3f7c06fd47ae85624badd32ce54dv.jpg',
                            content: 'emiya shero',
                            isActive: 0,
                            good: 0,
                            bad: 0,
                            time: 1581690000,
                            isShowReplyAndDel: false,
                            isShowInput: false,
                            selfContent: '',
                            selfContentHead: '',
                            toId: undefined,
                            childComments: []
                        },
                        {
                            commentId: 7,
                            userId: 2,
                            userName: '远坂凛',
                            userAvatar: 'https://ae01.alicdn.com/kf/Hd60a3f7c06fd47ae85624badd32ce54dv.jpg',
                            content: 'emiya shero',
                            isActive: 0,
                            good: 0,
                            bad: 0,
                            time: 1581690000,
                            isShowReplyAndDel: false,
                            isShowInput: false,
                            selfContent: '',
                            selfContentHead: '',
                            toId: undefined,
                            childComments: []
                        }
                    ];
                } else if (currentPage === 2) {
                    this.comments = [{
                        commentId: 7,
                        userId: 2,
                        userName: '远坂凛',
                        userAvatar: 'https://ae01.alicdn.com/kf/Hd60a3f7c06fd47ae85624badd32ce54dv.jpg',
                        content: 'emiya shero',
                        isActive: 0,
                        good: 0,
                        bad: 0,
                        time: 1581690000,
                        isShowReplyAndDel: false,
                        isShowInput: false,
                        selfContent: '',
                        selfContentHead: '',
                        toId: undefined,
                        childComments: []
                    }]
                }
            },
            loadMoreChild(index) {
                let comment = this.comments[index];
                comment.isChildLoading = true;
                setTimeout(() => {
                    comment.childSize += 5;
                    comment.isChildLoading = false;
                }, 1000);
            }
        },
        computed: {}
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

    .load-more {
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
