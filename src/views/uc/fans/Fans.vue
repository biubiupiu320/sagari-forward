<template>
    <div class="fans" v-loading="isLoading">
        <div class="fans-header">
            <span>我的粉丝</span>
            <span class="fans-count">共{{fans.length}}人</span>
            <span style="float: right">
                <el-button size="small" @click="removeAll">全部移除</el-button>
            </span>
        </div>
        <div class="fans-body">
            <ul>
                <li v-for="(item, index) in fans">
                    <span class="fans-avatar">
                        <el-link :underline="false"
                                 :href="'/user/' + item.id"
                                 target="_blank">
                            <el-avatar :size="50" :src="item.avatar">
                                <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
                            </el-avatar>
                        </el-link>
                    </span>
                    <span class="fans-name">
                        <el-link :underline="false"
                                 :href="'/user/' + item.id"
                                 target="_blank">{{item.username}}</el-link>
                    </span>
                    <span class="fans-btn">
                        <el-button size="small"
                                   @click="removeSingle(index)">移除</el-button>
                        <el-button size="small"
                                   v-if="item.follow"
                                   :loading="isFollowing"
                                   @click="cancelFollow(index)">取消关注</el-button>
                        <el-button type="primary"
                                   size="small"
                                   v-else
                                   :loading="isFollowing"
                                   @click="follow(index)">关注</el-button>
                    </span>
                </li>
            </ul>
        </div>
        <div class="fans-footer">
            <el-pagination
                layout="prev, pager, next"
                @current-change="handlerPageChange"
                :total="pagination.total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import {request} from "@/network/request";

    export default {
        name: "Fans",
        created() {
            this.getFansList(1);
        },
        data() {
            return {
                fans: [],
                pagination: {},
                isLoading: false,
                isFollowing: false
            }
        },
        methods: {
            follow(index) {
                this.isFollowing = true;
                let followId = this.fans[index].id;
                request({
                    url: "/interactive/follow?followId=",
                    method: "PUT",
                    params: {
                        followId
                    }
                }).then(res => {
                    let result = res.data;
                    if (result.code === 200) {
                        this.fans[index].follow = true;
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
            cancelFollow(index) {
                this.isFollowing = true;
                let followIds = [];
                followIds.push(this.fans[index].id);
                request({
                    url: "/interactive/cancelFollow",
                    method: "POST",
                    data: {
                        followIds
                    }
                }).then(res => {
                    let result = res.data;
                    if (result.code === 200) {
                        this.fans[index].follow = false;
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
            removeSingle(index) {
                let fansIds = this.fans[index].id;
                this.remove(fansIds);
            },
            removeAll() {
                let fansIds = this.fans.map(item => item.id);
                this.remove(fansIds);
            },
            remove(fansIds) {
                this.isLoading = true;
                request({
                    url: "/interactive/removeFans",
                    method: "POST",
                    data: {
                        fansIds
                    }
                }).then(res => {
                    let result = res.data;
                    if (result.code === 200) {
                        this.getFansList(this.pagination.pageNum);
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
                        message: '服务器打了个盹，请再试一次吧',
                        type: 'error',
                        center: true,
                        offset: 100
                    });
                    this.isLoading = false;
                });
            },
            getFansList(page = 1, size = 10) {
                this.isLoading = true;
                request({
                    url: "/interactive/getFansList",
                    method: "GET",
                    params: {
                        page,
                        size
                    }
                }).then(res => {
                    let result = res.data;
                    if (result.code === 200) {
                        this.fans = result.data.fans;
                        delete result.data.fans;
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
            },
            handlerPageChange(currentPage) {
                this.getFansList(currentPage);
            }
        }
    }
</script>

<style scoped>
    .fans {
        padding-bottom: 30px;
    }

    .fans-header {
        border-bottom: 1px solid #e0e0e0;
    }

    .fans-count {
        vertical-align: bottom;
        font-weight: 400 !important;
        margin-left: 15px !important;
        font-size: 14px !important;
        color: #4D4D4D !important;
    }

    .fans-header span {
        font-size: 20px;
        font-weight: 700;
        color: #3d3d3d;
        height: 90px;
        line-height: 90px;
        margin-top: 0;
        margin-bottom: 0;
    }

    .fans-body ul, .fans-body li {
        padding: 0;
        margin: 0;
        list-style: none;
    }

    .fans-body ul li:not(:last-child) {
        border-bottom: 1px solid #e0e0e0;
    }

    .fans-avatar {
        margin: 16px 16px 0 0;
    }

    .fans-name .el-link {
        font-size: 16px;
        color: #4D4D4D;
        line-height: 82px;
    }

    .fans-btn {
        float: right;
        margin-top: 25px;
    }

    .fans-footer {
        text-align: center;
        margin-top: 30px;
    }
</style>
