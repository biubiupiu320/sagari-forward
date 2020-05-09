<template>
    <div class="user-fans">
        <ul class="user-fans-list">
            <li class="user-fans-item" v-for="item in fans">
                <el-link :underline="false"
                         :href="'/user/' + item.id"
                         target="_blank">
                    <el-avatar :size="48" :src="item.avatar">
                        <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
                    </el-avatar>
                </el-link>
                <span class="user-fans-item-nickname">
                    <el-link :href="'/user/' + item.id"
                             target="_blank">{{item.username}}</el-link>
                </span>
                <!--<span class="user-fans-item-btn">
                    <el-button type="primary" size="small">关注</el-button>
                    <el-button size="small" icon="el-icon-check">已关注</el-button>
                </span>-->
            </li>
            <li class="user-fans-item no-content" v-if="fans.length === 0">
                这家伙竟然一个粉丝都没有...
            </li>
        </ul>
        <div class="user-fans-pagination">
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
        name: "Fans",
        created() {
            this.getFans();
        },
        data() {
            return {
                isLoading: false,
                fans: [],
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
            getFans(page = 1, size = 10) {
                this.isLoading = true;
                request({
                    url: "/interactive/getFansList",
                    method: "GET",
                    params: {
                        followId: this.userId,
                        page,
                        size
                    }
                }).then(res => {
                    let result = res.data;
                    if (result.code === 200) {
                        if (result.data.fans != null) {
                            this.fans = result.data.fans;
                        }
                        delete result.data.fans;
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
                this.getFans(page);
            }
        }
    }
</script>

<style scoped>
    .user-fans-list {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .user-fans-item {
        padding: 16px 0 18px;
        border-bottom: 1px solid #f5f6f7;
    }

    .user-fans-item-nickname .el-link {
        font-weight: 700;
        margin-left: 24px;
        font-size: 16px;
        color: #333333;
    }

    .user-fans-item-nickname .el-link:hover {
        color: #409eff;
    }

    .user-fans-item-btn {
        position: relative;
        float: right;
        top: 10px;
    }

    .user-fans-pagination {
        margin: 30px 0;
        text-align: center;
    }

    .no-content {
        text-align: center;
        padding: 35px;
        font-size: 18px;
        color: #999999;
    }

    .user-fans ul li:last-child {
        border: none;
    }
</style>
