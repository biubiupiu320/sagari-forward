<template>
    <div class="follow" v-loading="isLoading">
        <div class="follow-header">
            <span>我的关注</span>
            <span class="follow-count">共{{follows.length}}人</span>
            <span style="float: right">
                <el-button size="small" @click="cancelAllFollow">全部取消</el-button>
            </span>
        </div>
        <div class="follow-body">
            <ul>
                <li v-for="(item, index) in follows">
                    <span class="follow-avatar">
                        <el-link :underline="false">
                            <el-avatar :size="50" :src="item.avatar">
                                <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
                            </el-avatar>
                        </el-link>
                    </span>
                    <span class="follow-name">
                        <el-link :underline="false">{{item.username}}</el-link>
                    </span>
                    <span class="follow-btn">
                        <el-button size="small"
                                   v-if="item.follow"
                                   :loading="isFollowing"
                                   @click="cancelSingleFollow(index)">取消关注</el-button>
                        <el-button type="primary"
                                   size="small"
                                   v-else
                                   :loading="isFollowing"
                                   @click="follow(index)">关注</el-button>
                    </span>
                </li>
            </ul>
        </div>
        <div class="follow-footer">
            <el-pagination
                layout="prev, pager, next"
                @current-change="handlerPageChange"
                :total="pagination.total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import axios from "axios";

    let sessionId = localStorage.getItem("xxl-sso-session-id");
    axios.defaults.headers.common['xxl-sso-session-id'] = sessionId;

    export default {
        name: "Follow",
        created() {
            this.getFollowList();
        },
        data() {
            return {
                follows: [],
                isFollowing: false,
                pagination: {},
                isLoading: false
            }
        },
        methods: {
            follow(index) {
                this.isFollowing = true;
                let follow = this.follows[index];
                axios.put('http://localhost/interactive/follow?followId=' + follow.id).then(res => {
                    let result = res.data;
                    if (result.code === 200) {
                        follow.follow = true;
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
            cancelSingleFollow(index) {
                this.isFollowing = true;
                let follow = this.follows[index];
                let followIds = [];
                followIds.push(follow.id);
                this.cancelFollow(followIds, index, false);
            },
            cancelAllFollow() {
                let followIds = this.follows.filter(item => item.follow).map(item => item.id);
                this.cancelFollow(followIds, 0, true);
            },
            cancelFollow(followIds, index, flag) {
                axios.post('http://localhost/interactive/cancelFollow', {
                    followIds
                }).then(res => {
                    let result = res.data;
                    if (result.code === 200) {
                        if (flag) {
                            this.handlerPageChange(this.pagination.pageNum);
                        } else {
                            this.follows[index].follow = false;
                        }
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
            handlerPageChange(currentPage) {
                this.getFollowList(currentPage);
            },
            getFollowList(page, size) {
                this.isLoading = true;
                page = page || 1;
                size = size || 10;
                axios.get('http://localhost/interactive/getFollowList', {
                    params: {
                        page,
                        size
                    }
                }).then(res => {
                    let result = res.data;
                    if (result.code === 200) {
                        this.follows = result.data.follows;
                        for (let follow of this.follows) {
                            this.$set(follow, "follow", true);
                        }
                        delete result.data.follows;
                        this.pagination = result.data;
                    } else {
                        this.$message({
                            message: result.msg,
                            type: 'error',
                            center: true,
                            offset: 100
                        });
                    }
                    this.isLoading = false;
                }).catch(err => {
                    this.$message({
                        message: '服务器打了个盹，请刷新重试',
                        type: 'error',
                        center: true,
                        offset: 100
                    });
                    this.isLoading = false;
                });
            }
        }
    }
</script>

<style scoped>
    .follow {
        padding-bottom: 30px;
    }

    .follow-header {
        border-bottom: 1px solid #e0e0e0;
    }

    .follow-count {
        vertical-align: bottom;
        font-weight: 400 !important;
        margin-left: 15px !important;
        font-size: 14px !important;
        color: #4D4D4D !important;
    }

    .follow-header span {
        font-size: 20px;
        font-weight: 700;
        color: #3d3d3d;
        height: 90px;
        line-height: 90px;
        margin-top: 0;
        margin-bottom: 0;
    }

    .follow-body ul, .follow-body li {
        padding: 0;
        margin: 0;
        list-style: none;
    }

    .follow-body ul li:not(:last-child) {
        border-bottom: 1px solid #e0e0e0;
    }

    .follow-avatar {
        margin: 16px 16px 0 0;
    }

    .follow-name .el-link {
        font-size: 16px;
        color: #4D4D4D;
        line-height: 82px;
    }

    .follow-btn {
        float: right;
        margin-top: 25px;
    }

    .follow-footer {
        text-align: center;
        margin-top: 30px;
    }
</style>
