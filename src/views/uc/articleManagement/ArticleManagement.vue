<template>
    <div class="article-management" v-loading="isLoading">
        <div class="article-management-header">
            <el-tabs v-model="activeName" @tab-click="switchType">
                <el-tab-pane label="全部" name="all"></el-tab-pane>
                <el-tab-pane label="已发布" name="published"></el-tab-pane>
                <el-tab-pane label="回收站" name="recycle"></el-tab-pane>
            </el-tabs>
        </div>
        <!--<div class="article-management-filter">
            <el-form :inline="true" size="small">
                <span class="filter-title">筛选：</span>
                <el-form-item class="filter-select-time">
                    <el-select placeholder="年">
                        <el-option>不限</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="filter-select-time">
                    <el-select placeholder="月">
                        <el-option>不限</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="filter-select-type">
                    <el-select placeholder="文章类型">
                        <el-option>公开</el-option>
                        <el-option>私密</el-option>
                        <el-option>草稿</el-option>
                        <el-option>回收站</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-input placeholder="请输入关键词"></el-input>
                </el-form-item>
                <el-form-item style="float: right">
                    <el-button type="primary" size="small">搜索</el-button>
                    <el-button size="small">重置搜索</el-button>
                </el-form-item>
            </el-form>
        </div>-->
        <div class="article-management-body">
            <div class="article-list">
                <div class="article-item" v-for="(item, index) in articles">
                    <div class="article-item-title">
                        <el-link :underline="false" :href="'/article/' + item.id">
                            {{item.title}}
                        </el-link>
                    </div>
                    <div class="article-item-info">
                        <div class="article-item-left">
                            <span>{{item.createTime | letter}}</span>
                            <span>
                                <el-link :underline="false" class="iconfont el-icon-ali-view">
                                    {{item.viewCount}}
                                </el-link>
                            </span>
                            <span>
                                <el-link :underline="false" class="iconfont el-icon-ali-good">
                                    {{item.goodCount}}
                                </el-link>
                            </span>
                            <span>
                                <el-link :underline="false" class="iconfont el-icon-ali-comments">
                                    {{item.commentCount}}
                                </el-link>
                            </span>
                        </div>
                        <div class="article-item-right">
                            <span>
                                <el-link :underline="false"
                                         :href="'/article/' + item.id"
                                         type="primary">查看</el-link>
                            </span>
                            <el-divider direction="vertical"></el-divider>
                            <span>
                                <el-link :underline="false" type="primary">编辑</el-link>
                            </span>
                            <el-divider v-if="!item.del" direction="vertical"></el-divider>
                            <span>
                                <el-link v-if="!item.del"
                                         :underline="false"
                                         type="warning"
                                         @click="delArticle(index)">删除</el-link>
                            </span>
                            <el-divider direction="vertical"></el-divider>
                            <span>
                                <el-link :underline="false"
                                         type="warning"
                                         @click="delCompArticle(index)">彻底删除</el-link>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="no-content" v-if="articles.length === 0">
                暂时没有内容哦(#^.^#)
            </div>
        </div>
        <div class="article-management-footer">
            <el-pagination
                layout="prev, pager, next"
                background
                :hide-on-single-page="true"
                :current-page.sync="pagination.pageNum"
                :total="pagination.total"
                @current-change="handleCurrentChange">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import axios from "axios";

    let sessionId = localStorage.getItem("xxl-sso-session-id");
    axios.defaults.headers.common['xxl-sso-session-id'] = sessionId;

    export default {
        name: "ArticleManagement",
        created() {
            this.getArticle();
        },
        data() {
            return {
                articles: [],
                pagination: {},
                type: 1,
                lastType: 1,
                activeName: "all",
                isLoading: false
            }
        },
        methods: {
            getArticle(page = 1, size = 10, type = 1) {
                this.isLoading = true;
                axios.get("http://localhost/article/getArticle", {
                    params: {
                        page,
                        size,
                        type
                    }
                }).then(res => {
                    let result = res.data;
                    if (result.code === 200) {
                        this.articles = result.data.list;
                        delete result.data.list;
                        this.pagination = result.data;
                    }
                    this.isLoading = false;
                }).catch(err => {
                    this.$message({
                        message: "服务器打了个盹，请刷新重试",
                        type: 'error',
                        center: true,
                        offset: 100
                    });
                    this.isLoading = false;
                })
            },
            handleCurrentChange(page) {
                this.getArticle(page, 10, this.type);
            },
            switchType(tab) {
                if (tab.name === "all") {
                    this.type = 1;
                } else if (tab.name === "published") {
                    this.type = 2;
                } else if (tab.name === "recycle") {
                    this.type = 3;
                } else {
                    this.type = 1;
                }
                if (this.type !== this.lastType) {
                    this.getArticle(1, 10, this.type);
                }
                this.lastType = this.type;
            },
            delArticle(index) {
                let id = this.articles[index].id;
                axios.delete("http://localhost/article/article/" + id).then(res => {
                    let result = res.data;
                    if (result.code === 200) {
                        this.articles.splice(index, 1);
                        this.$message({
                            message: result.msg,
                            type: "success",
                            center: true,
                            offset: 100
                        });
                    } else {
                        this.$message({
                            message: result.msg,
                            type: "error",
                            center: true,
                            offset: 100
                        });
                    }
                }).catch(err => {
                    this.$message({
                        message: "服务器打了个盹，请再试一次吧",
                        type: "error",
                        center: true,
                        offset: 100
                    });
                });
            },
            delCompArticle(index) {
                let id = this.articles[index].id;
                axios.delete("http://localhost/article/deleteArticleComp", {
                    params: {
                        articleId: id
                    }
                }).then(res => {
                    let result = res.data;
                    if (result.code === 200) {
                        this.articles.splice(index, 1);
                        this.$message({
                            message: "彻底删除成功，数据不可恢复",
                            type: "success",
                            center: true,
                            offset: 100
                        });
                    } else {
                        this.$message({
                            message: result.msg,
                            type: "error",
                            center: true,
                            offset: 100
                        });
                    }
                }).catch(err => {
                    this.$message({
                        message: "服务器打了个盹，请再试一次吧",
                        type: "error",
                        center: true,
                        offset: 100
                    });
                });
            }
        }
    }
</script>

<style scoped>
    .article-management {
        padding-top: 24px;
        padding-bottom: 30px;
    }

    .article-management-filter {
        background-color: #f2f5f7;
        padding: 16px 16px 0 16px;
        font-size: 14px;
    }

    .filter-title {
        vertical-align: middle;
        vertical-align: -webkit-baseline-middle;
    }

    .article-management-filter .filter-select-time {
        width: 10%;
    }

    .article-management-filter .filter-select-type {
        margin-left: 32px;
        margin-right: 32px;
        width: 15%;
    }

    .article-item {
        display: flex;
        -webkit-box-direction: normal;
        flex-direction: column;
        border-bottom: 1px dotted #ddd;
        padding: 1rem 0 1rem 0;
        color: #999;
        font-size: 12px;
    }

    .article-item-title .el-link {
        display: block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 18px;
        height: 22px;
        line-height: 22px;
        color: #4d4d4d;
    }

    .article-item-title .el-link:hover {
        color: #409eff;
    }

    .article-item-info {
        margin-top: 10px;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: horizontal;
        -webkit-box-direction: normal;
        -ms-flex-direction: row;
        flex-direction: row;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
    }

    .article-item-left span {
        margin-right: 1.5rem;
    }

    .article-item-left .el-link, .article-item-left .el-link i {
        font-size: 12px;
        line-height: 12px;
        color: #999;
        cursor: default;
    }

    .article-item-right .el-link {
        font-size: 12px;
    }

    .article-management-footer {
        margin-top: 30px;
        text-align: center;
    }

    .no-content {
        text-align: center;
        font-size: 18px;
        padding-top: 30px;
        color: #999999;
    }
</style>
