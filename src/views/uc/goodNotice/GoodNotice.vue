<template>
    <div class="good-notice" v-loading="isLoading">
        <div class="good-notice-header">
            <span class="unread-count">未读消息：{{unreadCount}}</span>
            <span style="float: right">
                <el-button type="text" @click="markReadAll">全部标记为已读</el-button>
                <el-divider direction="vertical"></el-divider>
                <el-button type="text" @click="removeAll">清空所有消息</el-button>
            </span>
        </div>
        <div class="good-notice-body">
            <ul>
                <li class="good-notice-list-item" v-for="(item, index) in notices">
                    <div>
                        <el-tag effect="dark"
                                size="mini"
                                type="warning"
                                :disable-transitions="true"
                                v-if="!item.read">未读</el-tag>
                        <span class="good-notice-list-item-title">
                            <el-link :href="'/user/' + item.fromId"
                                     target="_blank"
                                     type="primary"
                                     style="margin-left: 0;">{{item.fromUsername}}</el-link>
                            <span v-if="item.type === 1">赞了你的文章</span>
                            <span v-if="item.type === 2">赞了你的评论</span>
                            <span v-if="item.type === 3">赞了你的评论</span>
                        </span>
                        <span style="float: right">
                            <el-link
                                icon="el-icon-view"
                                :underline="false"
                                title="标记为已读"
                                v-if="!item.read"
                                @click="markRead(index)"></el-link>
                            <el-divider
                                direction="vertical"
                                v-if="!item.read"></el-divider>
                            <el-link
                                icon="el-icon-delete"
                                :underline="false"
                                title="删除此条消息"
                                @click="remove(index)"></el-link>
                        </span>
                    </div>
                    <div style="line-height: 18px; margin-top: 8px;">
                        <span class="good-content">{{item.text}}</span>
                        <span class="good-time">{{item.createTime | letter}}</span>
                    </div>
                </li>
            </ul>
            <div class="no-content" v-if="notices.length === 0">
                (⊙o⊙)…暂时没有通知哟
            </div>
        </div>
        <div class="good-notice-footer">
            <el-pagination background
                           @current-change="handlePageChange"
                           layout="total, prev, pager, next"
                           :hide-on-single-page="true"
                           :total="pagination.total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import {request} from "@/network/request";

    let sessionId = localStorage.getItem("xxl-sso-session-id");
    axios.defaults.headers.common['xxl-sso-session-id'] = sessionId;

    export default {
        name: "GoodNotice",
        created() {
            this.isLoading = true;
            this.getNotice();
        },
        data() {
            return {
                notices: [],
                pagination: {},
                isLoading: false
            }
        },
        methods: {
            markRead(index) {
                let id = [];
                id.push(this.notices[index].id);
                request({
                    url: "/notice/noticeGood",
                    method: "POST",
                    data: id
                }).then(res => {
                    let result = res.data;
                    if (result.code === 200) {
                        let notice = this.notices[index];
                        notice.read = true;
                        this.notices.splice(index, 1);
                        this.notices.push(notice);
                    }
                });
            },
            remove(index) {
                let id = [];
                id.push(this.notices[index].id);
                request({
                    url: "/notice/noticeGood",
                    method: "DELETE",
                    data: id
                }).then(res => {
                    let result = res.data;
                    if (result.code === 200) {
                        this.notices.splice(index, 1);
                    }
                });
            },
            markReadAll() {
                let ids = this.notices.filter(item => !item.read).map(item => item.id);
                request({
                    url: "/notice/noticeGood",
                    method: "POST",
                    data: ids
                }).then(res => {
                    let result = res.data;
                    if (result.code === 200) {
                        this.notices = this.notices.map(item => {
                            item.read = true;
                            return item;
                        });
                    }
                });
            },
            removeAll() {
                let ids = this.notices.map(item => item.id);
                request({
                    url: "/notice/noticeGood",
                    method: "DELETE",
                    data: ids
                }).then(res => {
                    let result = res.data;
                    if (result.code === 200) {
                        this.notices = [];
                    }
                });
            },
            handlePageChange(page) {
                this.getNotice(page);
            },
            getNotice(page = 1, size = 10) {
                this.isLoading = true;
                request({
                    url: "/notice/noticeGood",
                    method: "GET",
                    params: {
                        page,
                        size
                    }
                }).then(res => {
                    let result = res.data;
                    if (result.code === 200) {
                        if (result.data !== null) {
                            this.notices = result.data.list;
                            for (let i = 0; i < this.notices.length; i++) {
                                let notice = this.notices[i];
                                if (notice.read) {
                                    this.notices.splice(i, 1);
                                    this.notices.push(notice);
                                }
                            }
                            delete result.data.list;
                            this.pagination = result.data;
                        }
                    }
                    this.isLoading = false;
                });
            }
        },
        computed: {
            unreadCount() {
                return this.notices.filter(item => !item.read).length;
            }
        }
    }
</script>

<style scoped>
    .good-notice {
        padding-top: 24px;
        padding-bottom: 30px;
    }

    .good-notice-header {
        margin-bottom: 8px;
    }

    .good-notice-header .el-button {
        padding-top: 0;
        padding-bottom: 0;
    }

    .unread-count {
        font-size: 14px;
        color: #3D3D3D;
    }

    .good-notice-body ul {
        list-style: none;
        padding: 0;
    }

    .good-notice-list-item {
        padding: 16px 0;
        border-bottom: 1px solid #e0e0e0;
    }

    .good-notice-list-item-title {
        display: inline-block;
        width: 85%;
        font-size: 14px;
        line-height: 18px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: clip;
        vertical-align: middle;
        color: #4d4d4d;
    }

    .good-notice-list-item-title .el-link {
        vertical-align: initial;
        margin-left: 5px;
        margin-right: 5px;
    }

    .good-content {
        display: inline-block;
        width: 80%;
        font-size: 14px;
        line-height: 18px;
        color: #4d4d4d;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        vertical-align: middle;
    }

    .good-time {
        font-size: 14px;
        line-height: 18px;
        color: #CCCCCC;
        float: right;
    }

    .good-notice-footer {
        text-align: center;
        margin-top: 30px;
    }

    .no-content {
        text-align: center;
        padding: 15px;
        font-size: 18px;
        color: #999999;
    }
</style>
