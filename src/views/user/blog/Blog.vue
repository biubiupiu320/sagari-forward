<template>
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
                这家伙还没发表过文章...
            </li>
        </ul>
        <div class="user-blogs-pagination">
            <el-pagination hide-on-single-page
                           layout="prev, pager, next"
                           :background="true"
                           :total="pagination.total"
                           @current-change="handleCurrentChange">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import {request} from "@/network/request";
    import {defaultConfig} from "@/config/previewConfig";
    import Vditor from "vditor";

    export default {
        name: "Blog",
        created() {
            this.getArticle();
        },
        data() {
            return {
                isLoading: false,
                articles: [],
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
            getArticle(page = 1, size = 10) {
                this.isLoading = true;
                request({
                    url: "/article/getArticleByAuthor",
                    method: "GET",
                    params: {
                        author: this.userId,
                        page,
                        size
                    }
                }).then(res => {
                    let result = res.data;
                    if (result.code === 200) {
                        this.articles = result.data.list.map(item => {
                            Vditor.md2html(item.content, defaultConfig).then(res => {
                                item.content = res.replace(/<.*?>/ig, "");
                            });
                            return item;
                        });
                        delete result.data.list;
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
        padding: 35px;
        font-size: 18px;
        color: #999999;
    }

    .user-blogs ul li:last-child {
        border: none;
    }
</style>
