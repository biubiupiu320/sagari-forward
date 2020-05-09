<template>
    <div class="user-follow" v-loading="isLoading">
        <ul class="user-follow-list">
            <li class="user-follow-item" v-for="item in follows">
                <el-link :underline="false"
                         :href="'/user/' + item.id"
                         target="_blank">
                    <el-avatar :size="48" :src="item.avatar">
                        <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
                    </el-avatar>
                </el-link>
                <span class="user-follow-item-nickname">
                    <el-link :href="'/user/' + item.id">{{item.username}}</el-link>
                </span>
                <!--<span class="user-follow-item-btn">
                    <el-button type="primary" size="small">关注</el-button>
                    <el-button size="small" icon="el-icon-check">已关注</el-button>
                </span>-->
            </li>
            <li class="user-follow-item no-content" v-if="follows.length === 0">
                这家伙竟然一个人都没有关注...
            </li>
        </ul>
        <div class="user-follow-pagination">
            <el-pagination hide-on-single-page
                           :background="true"
                           layout="prev, pager, next"
                           :total="pagination.total"
                           @current-change="handleCurrentChange">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import {request} from "@/network/request";

    export default {
        name: "Follow",
        created() {
            this.getFollow();
        },
        data() {
            return {
                isLoading: false,
                follows: [],
                pagination: {
                    total: 0
                }
            }
        },
        props: {
            userId: {
                type: Number,
                default: 0
            }
        },
        methods: {
            getFollow(page = 1, size = 10) {
                this.isLoading = true;
                request({
                    url: "/interactive/getFollowList",
                    method: "GET",
                    params: {
                        fansId: this.userId,
                        page,
                        size
                    }
                }).then(res => {
                    let result = res.data;
                    if (result.code === 200) {
                        if (result.data.follows != null) {
                            this.follows = result.data.follows;
                        }
                        delete result.data.follows;
                        this.pagination = result.data;
                    } else {
                        this.$message({
                            message: result.msg,
                            type: "error",
                            center: true,
                            offset: 100
                        });
                    }
                    this.isLoading = false;
                }).catch(err => {
                    this.isLoading = false;
                });
            },
            handleCurrentChange(page) {
                this.getFollow(page);
            }
        }
    }
</script>

<style scoped>
    .user-follow-list {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .user-follow-item {
        padding: 16px 0 18px;
        border-bottom: 1px solid #f5f6f7;
    }

    .user-follow-item-nickname .el-link {
        font-weight: 700;
        margin-left: 24px;
        font-size: 16px;
        color: #333333;
    }

    .user-follow-item-nickname .el-link:hover {
        color: #409eff;
    }

    .user-follow-item-btn {
        position: relative;
        float: right;
        top: 10px;
    }

    .user-follow-pagination {
        margin: 30px 0;
        text-align: center;
    }

    .no-content {
        text-align: center;
        padding: 35px;
        font-size: 18px;
        color: #999999;
    }

    .user-follow ul li:last-child {
        border: none;
    }
</style>
