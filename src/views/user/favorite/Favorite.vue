<template>
    <div class="user-favorite" v-loading="isLoading">
        <div class="user-favorite-header">
            <el-tabs @tab-click="switchTab">
                <el-tab-pane v-for="item in favorites"
                             :label="item.title + '\t' + item.count"></el-tab-pane>
            </el-tabs>
        </div>
        <div class="user-favorite-body">
            <div class="user-blogs" v-loading="isLoading">
                <ul>
                    <li class="user-blog" v-for="item in articles">
                        <h3>
                            <el-link :href="'/article/' + item.id"
                                     target="_blank">{{item.title}}</el-link></h3>
                        <div class="user-blog-content">{{item.content}}</div>
                        <div class="user-blog-info">
                            <span><i class="iconfont el-icon-ali-good"></i>{{item.goodCount}}</span>
                            <el-divider direction="vertical"></el-divider>
                            <span><i class="iconfont el-icon-ali-view"></i>{{item.viewCount}}</span>
                            <el-divider direction="vertical"></el-divider>
                            <span><i class="iconfont el-icon-ali-comments"></i>{{item.commentCount}}</span>
                            <span style="float: right;">{{item.createTime | dateFrm}}</span>
                        </div>
                    </li>
                    <li class="user-blog no-content" v-if="articles.length === 0">
                        这个收藏夹毛也没有(⊙o⊙)…
                    </li>
                </ul>
                <div class="user-blogs-pagination">
                    <el-pagination hide-on-single-page
                                   layout="prev, pager, next"
                                   :background="true"
                                   :total="pagination.total"
                                   :current-page="pagination.page"
                                   @current-change="handleCurrentChange">
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {request} from "@/network/request";
    import Vditor from "vditor";
    import {defaultConfig} from "@/config/previewConfig";

    export default {
        name: "Favorite",
        created() {
            this.isLoading = true;
            request({
                url: "/collect/getFavorites",
                method: "GET",
                params: {
                    targetUserId: this.userId
                }
            }).then(res => {
                let result = res.data;
                if (result.code === 200) {
                    this.favorites = result.data.favorites;
                    this.getArticle();
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
                this.$message({
                    message: "服务器打了个盹，请刷新重试",
                    type: "error",
                    center: true,
                    offset: 100
                });
                this.isLoading = false;
            });
        },
        data() {
            return {
                favorites: [],
                articles: [],
                isLoading: false,
                index: 0,
                pagination: {
                    total: 0,
                    page: 1
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
            switchTab(tab) {
                this.index = Number(tab.index);
                this.articles = [];
                this.pagination.page = 1;
                this.getArticle();
            },
            getArticle(page = 1, size = 10) {
                this.isLoading = true;
                request({
                    url: "/collect/getCollect",
                    method: "GET",
                    params: {
                        favoritesId: this.favorites[this.index].id,
                        page,
                        size
                    }
                }).then(res => {
                    let result = res.data;
                    if (result.code === 200) {
                        let articles = result.data.articles;
                        if (articles !== null) {
                            this.articles = articles.map(item => {
                                Vditor.md2html(item.content, defaultConfig).then(res => {
                                    item.content = res.replace(/<.*?>/ig, "");
                                });
                                return item;
                            });
                        }
                        delete result.data.articles;
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
                    this.$message({
                        message: "服务器打了个盹，请刷新重试",
                        type: "error",
                        center: true,
                        offset: 100
                    });
                    this.isLoading = false;
                });
            },
            handleCurrentChange(page) {
                this.getArticle(page);
            }
        }
    }
</script>

<style scoped>
    .user-blogs ul {
        list-style: none;
        margin: 0;
        padding: 0;
    }

    .user-blogs ul li:last-child {
        border: none;
    }

    .user-blog {
        padding: 12px 0;
        border-bottom: 1px solid #d4d4d4;
    }

    .user-blog h3 {
        margin-top: 0;
        margin-bottom: 6px;
    }

    .user-blog h3 .el-link {
        display: inline-block;
        font-size: 20px;
        font-weight: 700;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .user-blog-content {
        font-size: 14px;
        color: #858585;
        line-height: 24px;
        margin-bottom: 6px;
        display: -webkit-box;
        display: -moz-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        -moz-box-orient: vertical;
        -moz-line-clamp: 2;
        overflow: hidden;
    }

    .user-blog-info span, .user-blog-info span i {
        font-size: 12px;
        color: #999999;
    }

    .user-blogs-pagination {
        margin: 24px 0;
        text-align: center;
    }

    .no-content {
        text-align: center;
        padding: 15px;
        font-size: 18px;
        color: #999999;
    }
</style>

<style>
    .user-favorite-header .el-tabs .el-tabs__nav {
        padding-bottom: 0;
    }

    .user-favorite-header .el-tabs .el-tabs__nav .el-tabs__item {
        line-height: 40px;
    }
</style>
