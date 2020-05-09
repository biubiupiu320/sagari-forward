<template>
    <div class="follow-notice" v-loading="isLoading">
        <div class="follow-notice-header">
            <span class="unread-count">未读消息：{{unreadCount}}</span>
            <span style="float: right">
                <el-button type="text" @click="markReadAll">全部标记为已读</el-button>
                <el-divider direction="vertical"></el-divider>
                <el-button type="text" @click="removeAll">清空所有消息</el-button>
            </span>
        </div>
        <div class="follow-notice-body">
            <ul>
                <li v-for="(item, index) in notices" style="line-height: 20px;">
                    <el-tag effect="dark"
                            type="warning"
                            size="mini"
                            v-if="!item.read"
                            :disable-transitions="true">未读</el-tag>
                    <el-link :href="'/user/' + item.fromId"
                             target="_blank"
                             type="primary">{{item.fromUsername}}</el-link>
                    <span style="margin-left: 5px">关注了你</span>
                    <span style="float: right;">
                        <span class="follow-notice-time">{{item.createTime | letter}}</span>
                        <el-link icon="el-icon-view"
                                 :underline="false"
                                 title="标记为已读"
                                 v-if="!item.read"
                                 @click="markRead(index)"></el-link>
                        <el-divider direction="vertical"
                                    v-if="!item.read"></el-divider>
                        <el-link icon="el-icon-delete"
                                 :underline="false"
                                 title="删除此条消息"
                                 @click="remove(index)"></el-link>
                    </span>
                </li>
            </ul>
            <div class="no-content" v-if="notices.length === 0">
                (⊙o⊙)…暂时没有通知哟
            </div>
        </div>
        <div class="follow-notice-footer">
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

    export default {
        name: "FollowNotice",
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
                    url: "/notice/noticeFollow",
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
                    url: "/notice/noticeFollow",
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
                    url: "/notice/noticeFollow",
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
                    url: "/notice/noticeFollow",
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
                    url: "/notice/noticeFollow",
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
    .follow-notice {
        padding-top: 24px;
        padding-bottom: 30px;
    }

    .follow-notice-header {
        margin-bottom: 8px;
    }

    .follow-notice-header .el-button {
        padding-top: 0;
        padding-bottom: 0;
    }

    .unread-count {
        font-size: 14px;
        color: #3D3D3D;
    }

    .follow-notice-body ul {
        padding: 0;
        list-style: none;
    }

    .follow-notice-body ul li {
        padding: 16px 0;
        border-bottom: 1px solid #e0e0e0;
    }

    .follow-notice-body ul li span .el-link {
        vertical-align: inherit;
    }

    .follow-notice-body span {
        font-size: 14px;
        color: #4d4d4d;
    }

    .follow-notice-time {
        margin-right: 20px !important;
        font-size: 14px !important;
        color: #CCCCCC !important;
    }

    .follow-notice-footer {
        margin-top: 30px;
        text-align: center;
    }

    .no-content {
        text-align: center;
        padding: 15px;
        font-size: 18px;
        color: #999999;
    }
</style>
