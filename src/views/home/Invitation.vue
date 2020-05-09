<template>
    <div class="blogs" v-loading="loading">
        <ul>
            <li class="blog" v-for="(item, index) in invitations">
                <div class="blog-title" @click="jump(item.id)">
                    <el-link :underline="false"
                             :href="'/article/' + item.id"
                             v-on:click.native.prevent>{{item.title}}</el-link>
                    <span class="blog-del-btn" @click="removeBlog(index)"><i class="el-icon-close"></i></span>
                </div>
                <div class="blog-content">{{item.content}}</div>
                <div>
                    <span class="blog-user">
                        <el-link :underline="false"
                                 :href="'/user/' + item.user.id"
                                 target="_blank">
                            <el-avatar :size="24" :src="item.user.avatar">
                                <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
                            </el-avatar>
                        </el-link>&nbsp;
                        <el-link :underline="false"
                                 :href="'/user/' + item.user.id"
                                 target="_blank">{{item.user.username}}</el-link>
                    </span>
                    <span class="blog-info">
                        <el-link :underline="false" class="iconfont el-icon-ali-good">{{item.goodCount}}</el-link>
                        <el-divider direction="vertical"></el-divider>
                        <el-link :underline="false" class="iconfont el-icon-ali-comments">{{item.commentCount}}</el-link>
                        <el-divider direction="vertical"></el-divider>
                        <el-link :underline="false" class="iconfont el-icon-ali-view">{{item.viewCount}}</el-link>
                    </span>
                </div>
            </li>
            <li class="blog load-more">
                <el-button type="text" :loading="isLoading" @click="loadMore">加载更多</el-button>
            </li>
        </ul>
    </div>
</template>

<script>
    import {request} from "@/network/request";
    import Vditor from "vditor";
    import {defaultConfig} from "@/config/previewConfig";

    export default {
        name: "Invitation",
        created() {
            this.loading = true;
            if (this.categoryId === 0) {
                this.getHomeArticle(this.page);
            } else {
                this.getArticleByCategory(this.categoryId, this.page);
            }
        },
        data() {
            return {
                loading: false,
                isLoading: false,
                page: 0,
                invitations: []
            }
        },
        props: {
            categoryId: {
                type: Number,
                default: 0
            }
        },
        methods: {
            removeBlog(index) {
                this.invitations.splice(index, 1);
                event.stopPropagation();
            },
            loadMore() {
                if (this.categoryId === 0) {
                    this.getHomeArticle(this.page);
                } else {
                    this.getArticleByCategory(this.categoryId, this.page);
                }
            },
            jump(id) {
                this.$router.push('/article/' + id);
            },
            getHomeArticle(page = 0, size = 10) {
                this.isLoading = true;
                request({
                    url: "/search/getHomeArticle",
                    method: "GET",
                    params: {
                        page,
                        size
                    }
                }).then(res => {
                    let result = res.data;
                    if (result.code === 200) {
                        let temps = result.data.result.map(item => item._source);
                        temps = temps.map(item => {
                            Vditor.md2html(item.content, defaultConfig).then(res => {
                                item.content = res.replace(/<.*?>/ig, "");
                            });
                            return item;
                        })
                        for (const temp of temps) {
                            this.invitations.push(temp)
                        }
                        if (temps.length !== 0) {
                            this.page++;
                        } else {
                            this.$message({
                                message: "没有更多推荐文章了",
                                type: "success",
                                center: true,
                                offset: 100
                            });
                        }
                        this.isLoading = false;
                        this.loading = false;
                    }
                }).catch(err => {

                });
                /*axios.get("http://localhost/search/getHomeArticle", {
                    params: {
                        page,
                        size
                    }
                }).then(res => {
                    let result = res.data;
                    if (result.code === 200) {
                        let temps = result.data.result.map(item => item._source);
                        for (const temp of temps) {
                            this.invitations.push(temp)
                        }
                        if (temps.length !== 0) {
                            this.page++;
                        } else {
                            this.$message({
                                message: "没有更多推荐文章了",
                                type: "success",
                                center: true,
                                offset: 100
                            });
                        }
                        this.isLoading = false;
                        this.loading = false;
                    }
                }).catch(err => {

                });*/
            },
            getArticleByCategory(categoryId, page = 0, size = 10) {
                this.isLoading = true;
                request({
                    url: "/search/getArticleByCategory",
                    method: "GET",
                    params: {
                        categoryId,
                        page,
                        size
                    }
                }).then(res => {
                    let result = res.data;
                    if (result.code === 200) {
                        let temps = result.data.result.map(item => item._source);
                        for (const temp of temps) {
                            this.invitations.push(temp)
                        }
                        if (temps.length !== 0) {
                            this.page++;
                        } else {
                            this.$message({
                                message: "没有更多推荐文章了",
                                type: "success",
                                center: true,
                                offset: 100
                            });
                        }
                        this.isLoading = false;
                        this.loading = false;
                    }
                }).catch(err => {

                });
                /*axios.get("http://localhost/search/getArticleByCategory", {
                    params: {
                        categoryId,
                        page,
                        size
                    }
                }).then(res => {
                    let result = res.data;
                    if (result.code === 200) {
                        let temps = result.data.result.map(item => item._source);
                        for (const temp of temps) {
                            this.invitations.push(temp)
                        }
                        if (temps.length !== 0) {
                            this.page++;
                        } else {
                            this.$message({
                                message: "没有更多推荐文章了",
                                type: "success",
                                center: true,
                                offset: 100
                            });
                        }
                        this.isLoading = false;
                        this.loading = false;
                    }
                }).catch(err => {

                });*/
            }
        }
    }
</script>

<style scoped>
    .blogs {
        background-color: #FFFFFF;
        margin-bottom: 50px;
    }

    .blogs ul {
        padding: 0;
        margin: 0;
        list-style: none;
    }

    .blogs ul li {
        padding: 18px 24px 13px;
        border-bottom: 1px solid #f4f4f4;
        -webkit-box-shadow: 0 0px 2px 0 rgba(0, 0, 0, 0.04);
        box-shadow: 0 0px 2px 0 rgba(0, 0, 0, 0.04);
    }

    .blogs ul li:hover {
        background-color: #fafafa;
    }

    .blog-title .el-link {
        font-size: 18px;
        font-family: PingFang SC, Hiragino Sans GB, Arial, Microsoft YaHei, Verdana, Roboto,
                    Noto, Helvetica Neue, sans-serif !important;
        color: #3D3D3D;
        font-weight: 700;
        height: 24px;
        line-height: 24px;
        text-align: left;
        text-overflow: ellipsis;
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
        -moz-text-size-adjust: 100%;
        white-space: nowrap;
        overflow: hidden;
        display: block;
        width: 96%;
        margin-bottom: 4px;
    }

    .blog-title .el-link:hover {
        color: #ca0616;
    }

    .blog-del-btn {
        float: right;
        cursor: pointer;
        color: #2EC;
        position: relative;
        bottom: 28px;
    }

    .blog-del-btn:hover {
        color: #333;
    }

    .blog-content {
        margin-bottom: 4px;
        color: #8a8a8a;
        font-size: 14px;
        line-height: 24px;
        font-family: PingFang SC, Hiragino Sans GB, Arial, Microsoft YaHei, Verdana, Roboto,
                    Noto, Helvetica Neue, sans-serif !important;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .blog-info {
        float: right;
    }

    .load-more {
        display: flex;
        justify-content: center;
    }
</style>

<style>
    .blog-info .el-link i {
        font-size: 14px !important;
    }
</style>
