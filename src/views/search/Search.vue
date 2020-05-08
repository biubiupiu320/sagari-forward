<template>
    <div>
        <el-row class="search">
            <el-col :span="14" :offset="5">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="全部" name="all" :lazy="true"></el-tab-pane>
                    <el-tab-pane label="文章" name="article" :lazy="true"></el-tab-pane>
                    <el-tab-pane label="标签" name="tag" :lazy="true"></el-tab-pane>
                    <el-tab-pane label="用户" name="user" :lazy="true"></el-tab-pane>
                </el-tabs>
                <el-radio-group v-show="activeName === 'article'"
                                v-model="checkedRadio"
                                @change="handleRadioChange"
                                style="padding: 15px 0">
                    <el-radio :label="1">全部</el-radio>
                    <el-radio :label="2">根据标题搜索</el-radio>
                    <el-radio :label="3">根据内容搜索</el-radio>
                </el-radio-group>
            </el-col>
        </el-row>
        <el-row v-loading="isLoading">
            <el-col :span="14" :offset="5" class="result">
                <ul>
                    <li v-for="item in results">
                        <Article v-if="item._index.indexOf('article') !== -1"
                                 :data="item._source"></Article>
                        <Tag v-if="item._index.indexOf('tag') !== -1"
                             :data="item._source"></Tag>
                        <User v-if="item._index.indexOf('user') !== -1"
                              :data="item._source"></User>
                    </li>
                    <li v-if="results.length === 0">
                        <div class="no-result">w(ﾟДﾟ)w，没有搜到你想要的，换个词再搜一次吧~
                            <i class="el-icon-lollipop"></i>
                        </div>
                    </li>
                </ul>
                <div class="pagination">
                    <el-pagination background
                                   layout="prev, pager, next"
                                   hide-on-single-page
                                   :page-size="pageSize"
                                   :total="total"
                                   :current-page.sync="currentPage"
                                   @current-change="handlePageChange">
                    </el-pagination>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import {request} from "@/network/request";
    import Article from "@/views/search/Article";
    import Tag from "@/views/search/Tag";
    import User from "@/views/search/User";

    export default {
        name: "Search",
        created() {
            this.search = this.$route.query.search;
            this.isLoading = true;
            this.searchFunc(0);
        },
        data() {
            return {
                search : '',
                activeName: 'all',
                checkedRadio: 1,
                results: [],
                total: 0,
                isLoading: false,
                pageSize: 30,
                currentPage: 1
            }
        },
        methods: {
            handleClick(tab) {
                this.isLoading = true;
                this.currentPage = 1;
                if (tab.name === "all") {
                    this.pageSize = 30;
                    setTimeout(() => {
                        this.searchFunc(0);
                    }, 500);
                } else if (tab.name === "article") {
                    this.pageSize = 10;
                    setTimeout(() => {
                        this.searchArticle(0);
                    }, 500);
                } else if (tab.name === "tag") {
                    this.pageSize = 10;
                    setTimeout(() => {
                        this.searchTag(0);
                    }, 500);
                } else if (tab.name === "user") {
                    this.pageSize = 10;
                    setTimeout(() => {
                        this.searchUser(0);
                    });
                }
            },
            handleRadioChange(value) {
                this.isLoading = true;
                this.currentPage = 1;
                if (value === 1) {
                    setTimeout(() => {
                        this.searchArticle(0);
                    }, 500);
                } else if (value === 2) {
                    setTimeout(() => {
                        this.searchArticleByTitle(0);
                    }, 500);
                } else if (value === 3) {
                    setTimeout(() => {
                        this.searchArticleByContent(0);
                    }, 500);
                }
            },
            handleData(data) {
                let results = data.result;
                this.total = data.total;
                for (let result of results) {
                    if (result._index.indexOf("article") === -1) {
                        continue;
                    }
                    let titleTemp = result.highlight.title;
                    let title = '';
                    let titleRemoveTag = '';
                    if (titleTemp !== undefined) {
                        for (const temp of titleTemp) {
                            title += temp;
                        }
                        titleRemoveTag = title.replace(/<b>/g, '');
                        titleRemoveTag = titleRemoveTag.replace(/<\/b>/g, '');
                        let titleSource = result._source.title;
                        result._source.title = titleSource.replace(titleRemoveTag, title);
                    }
                    let contentTemp = result.highlight.content;
                    let content = '';
                    if (contentTemp !== undefined) {
                        for (const temp of contentTemp) {
                            content += temp;
                        }
                        result._source.content = content;
                    } else {
                        result._source.content = result._source.content.substring(0, 300);
                    }
                    delete result.highlight;
                }
                this.results = results;
            },
            searchArticle(page) {
                request({
                    url: "/search/searchArticle",
                    method: "GET",
                    params: {
                        search: this.search,
                        page,
                        size: 10
                    }
                }).then(res => {
                    let result = res.data;
                    if (result.code === 200) {
                        let data = result.data;
                        this.handleData(data);
                    }
                    this.isLoading = false;
                }).catch(err => {
                    this.isLoading = false;
                });
            },
            searchArticleByTitle(page) {
                request({
                    url: "/search/searchArticleByTitle",
                    method: "GET",
                    params: {
                        search: this.search,
                        page,
                        size: 10
                    }
                }).then(res => {
                    let result = res.data;
                    if (result.code === 200) {
                        let data = result.data;
                        this.handleData(data);
                    }
                    this.isLoading = false;
                }).catch(err => {
                    this.isLoading = false;
                });
            },
            searchArticleByContent(page) {
                request({
                    url: "/search/searchArticleByContent",
                    method: "GET",
                    params: {
                        search: this.search,
                        page,
                        size: 10
                    }
                }).then(res => {
                    let result = res.data;
                    if (result.code === 200) {
                        let data = result.data;
                        this.handleData(data);
                    }
                    this.isLoading = false;
                }).catch(err => {
                    this.isLoading = false;
                });
            },
            searchFunc(page) {
                request({
                    url: "/search/search",
                    params: {
                        search: this.search,
                        page
                    }
                }).then(res => {
                    let result = res.data;
                    if (result.code === 200) {
                        this.handleData(result.data)
                    }
                    this.isLoading = false;
                }).catch(err => {
                    this.isLoading = false;
                });
            },
            searchTag(page) {
                request({
                    url: "/search/searchTag",
                    method: "GET",
                    params: {
                        search: this.search,
                        page,
                        size: 10
                    }
                }).then(res => {
                    let result = res.data;
                    if (result.code === 200) {
                        this.handleData(result.data)
                    }
                    this.isLoading = false;
                }).catch(err => {
                    this.isLoading = false;
                });
            },
            searchUser(page) {
                request({
                    url: "/search/searchUser",
                    method: "GET",
                    params: {
                        search: this.search,
                        page,
                        size: 10
                    }
                }).then(res => {
                    let result = res.data;
                    if (result.code === 200) {
                        this.handleData(result.data)
                    }
                    this.isLoading = false;
                }).catch(err => {
                    this.isLoading = false;
                });
            },
            handlePageChange(page) {
                this.isLoading = true;
                if (this.activeName === "all") {
                    this.searchFunc(page - 1);
                } else if (this.activeName === "article") {
                    if (this.checkedRadio === 1) {
                        this.searchArticle(page - 1);
                    } else if (this.checkedRadio === 2) {
                        this.searchArticleByTitle(page - 1);
                    } else if (this.checkedRadio === 3) {
                        this.searchArticleByContent(page - 1);
                    }
                } else if (this.activeName === "tag") {
                    this.searchTag(page - 1);
                } else if (this.activeName === "user") {
                    this.searchUser(page - 1);
                }
            }
        },
        components: {
            Article,
            Tag,
            User
        }
    }
</script>

<style scoped>
    .search {
        background-color: #ffffff;
        padding: 0 15px;
    }

    .result {
        padding: 10px 0;
        margin-top: 15px;
    }

    .result ul {
        padding: 0;
        margin: 0;
        list-style: none;
    }

    .result ul li {
        padding: 18px 24px 13px;
        -webkit-box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.04);
        box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.04);
        background-color: #FAFAFA;
        margin-bottom: 10px;
        border-radius: 4px;
    }

    .pagination {
        text-align: center;
        padding: 10px 0;
    }

    .no-result {
        text-align: center;
        color: #666;
        font-size: 16px;
        line-height: 64px;
    }
</style>

<style>
    .search .el-tabs__header {
        margin-bottom: 0;
    }

    b {
        color: red;
    }
</style>
