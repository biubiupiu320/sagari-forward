<template>
    <div class="system-notice">
        <div class="system-notice-header">
            <span class="unread-count">未读消息：{{unreadCount}}</span>
            <span style="float: right;">
                <el-button type="text" @click="markReadAll">全部标记为已读</el-button>
            </span>
        </div>
        <div class="system-notice-body">
            <ul class="system-notice-list">
                <li class="system-notice-item" v-for="(item, index) in notices">
                    <div class="system-notice-item-header">
                        <div class="item-left">
                            <el-tag type="warning" size="mini" v-if="!item.read">未读</el-tag>
                            {{item.title}}
                        </div>
                        <div class="item-right">{{item.createTime | formatTime}}</div>
                    </div>
                    <div class="system-notice-item-body">
                        {{item.content}}
                        <!--<el-link type="primary"
                                 icon="el-icon-link"
                                 target="_blank"
                                 @click.native="markRead(index)"
                                 :href="item.link">网页链接</el-link>-->
                    </div>
                </li>
            </ul>
            <div class="no-content" v-if="notices.length === 0">
                (⊙o⊙)…暂时没有通知哟
            </div>
        </div>
        <div class="system-notice-footer">
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
    import moment from 'moment';
    import axios from "axios";

    let sessionId = localStorage.getItem("xxl-sso-session-id");
    axios.defaults.headers.common['xxl-sso-session-id'] = sessionId;

    export default {
        name: "SystemNotice",
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
                this.notices[index].read = true;
                let id = [];
                id.push(this.notices[index].id);
                axios.put("http://localhost/notice/markReadSystem", id).then(res => {
                    let result = res.data;
                    if (result.code === 200) {
                        let notice = this.notices[index];
                        notice.read = true;
                        this.notices.splice(index, 1);
                        this.notices.push(notice);
                    }
                });
            },
            markReadAll() {
                axios.put("http://localhost/notice/markReadSystemAll").then(res => {
                    let result = res.data;
                    if (result.code === 200) {
                        this.notices = this.notices.map(item => {
                            item.read = true;
                            return item;
                        });
                    }
                });
            },
            handlePageChange(page) {
                this.getNotice(page);
            },
            getNotice(page = 1, size = 10) {
                this.isLoading = true;
                axios.get("http://localhost/notice/getNoticeSystem", {
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
        },
        filters: {
            formatTime(value) {
                return moment(value).format('YYYY-MM-DD HH:mm:ss');
            }
        }
    }
</script>

<style scoped>
    .system-notice {
        padding-top: 24px;
        padding-bottom: 30px;
    }

    .system-notice-header {
        margin-bottom: 8px;
    }

    .unread-count {
        font-size: 14px;
        color: #3d3d3d;
    }

    .system-notice-header .el-button {
        padding: 0;
    }

    .system-notice-list {
        list-style: none;
        padding: 0;
    }

    .item-left {
        display: inline-block;
        width: 80%;
        font-size: 14px;
        color: #4d4d4d;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        vertical-align: middle;
    }

    .item-right {
        display: inline-block;
        width: 20%;
        text-align: right;
        font-size: 14px;
        color: #CCC;
    }

    .system-notice-item {
        padding-top: 16px;
        border-bottom: 1px solid #e0e0e0;
    }

    .system-notice-item-body {
        margin-top: 15px;
        padding: 15px;
        background-color: #f7f7f7;
        font-size: 14px;
        color: #4d4d4d;
        line-height: 22px;
    }

    .system-notice-footer {
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
