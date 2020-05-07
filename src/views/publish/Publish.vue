<template>
    <el-row class="publish" v-loading="isLoading">
        <el-col :span="12" :offset="6">
            <el-form label-position="top">
                <el-form-item label="文章标题：">
                    <el-input type="text"
                              placeholder="请输入文章标题"
                              show-word-limit
                              maxlength="25"
                              clearable
                              v-model="title"></el-input>
                </el-form-item>
                <el-form-item label="添加标签：">
                    <el-tag v-for="(tag, index) in tags"
                            closable
                            @close="removeTag(index)">{{tag.title}}</el-tag>
                    <el-popover
                        placement="bottom-start"
                        width="500"
                        trigger="click"
                        :visible-arrow="false"
                        transition="el-zoom-in-top">
                        <div class="publish-tag">
                            <div class="publish-tag-head">
                                <span>还可以添加{{5 - tagCount}}个标签</span>
                                <span class="create-tag-btn" @click="createTagDialog = true">找不到标签？创建</span>
                                <el-dialog title="创建标签" :visible.sync="createTagDialog" width="20%">
                                    <el-form :model="newTag" label-position="right" label-width="auto">
                                        <el-form-item label="标题：" prop="title">
                                            <el-input v-model="newTag.title"
                                                      maxlength="15"
                                                      :show-word-limit="true"
                                                      size="small"></el-input>
                                        </el-form-item>
                                        <el-form-item label="所属类别：" prop="categoryId">
                                            <el-select v-model="newTag.categoryId"
                                                       size="small"
                                                       popper-class="select"
                                                       placeholder="请选择">
                                                <el-option v-for="item in category"
                                                           :key="item.id"
                                                           :label="item.title"
                                                           :value="item.id">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-form>
                                    <div slot="footer" class="dialog-footer">
                                        <el-button size="small" @click="createTagDialog = false">取 消</el-button>
                                        <el-button type="primary"
                                                   size="small"
                                                   @click="createTag">确 定</el-button>
                                    </div>
                                </el-dialog>
                            </div>
                            <div>
                                <el-autocomplete placeholder="搜索标签"
                                                 suffix-icon="el-icon-search"
                                                 v-model="search"
                                                 :fetch-suggestions="queryTag"
                                                 :trigger-on-focus="false"
                                                 @select="selectSuggestTag"
                                                 style="width: 100%">
                                </el-autocomplete>
                            </div>
                            <div>
                                <el-tabs stretch>
                                    <el-tab-pane v-for="(item, index1) in category" :label="item.title">
                                        <el-tag v-for="(tag, index2) in item.tags"
                                                @click="addTag(index1, index2)">{{tag.title}}</el-tag>
                                    </el-tab-pane>
                                </el-tabs>
                            </div>
                        </div>
                        <el-button plain
                                   size="small"
                                   icon="el-icon-plus"
                                   slot="reference">添加标签</el-button>
                    </el-popover>
                </el-form-item>
                <el-form-item label="文章内容：">
                    <!--<markdown-editor class="markdown" ref="editor"></markdown-editor>-->
                    <vditor ref="vditor"></vditor>
                </el-form-item>
                <el-form-item>
                    <el-button plain type="primary"
                               class="pull-right"
                               @click="submit"
                               :loading="loading"
                               style="float: right">发布文章</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<script>
    import Vditor from "@/views/publish/Vditor";
    import {request} from "@/network/request";

    export default {
        name: "Publish",
        data() {
            return {
                title: '',
                tags: [],
                search: null,
                loading: false,
                createTagDialog: false,
                category: [],
                newTag: {
                    categoryId: undefined,
                    title: ''
                },
                isLoading: false
            }
        },
        computed: {
            tagCount() {
                return this.tags.length;
            }
        },
        created() {
            this.isLoading = true;
            request({
                url: "/tag/getTag",
                method: "GET"
            }).then(res => {
                let result = res.data;
                if (result.code === 200) {
                    this.category = result.data.category;
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
        methods: {
            addTag(index1, index2) {
                let tag = this.category[index1].tags[index2];
                if (this.tags.indexOf(tag) !== -1) {
                    alert('已经添加过该标签了！');
                } else {
                    if (this.tagCount >= 5) {
                        alert('标签最多添加5个！');
                    } else {
                        this.tags.push(tag);
                    }
                }
            },
            removeTag(index) {
                this.tags.splice(index, 1);
            },
            queryTag(queryString, cb) {
                let results = [];
                let temp = [];
                for (let category of this.category) {
                    for (let tag of category.tags) {
                        if (tag.title.toLowerCase().indexOf(queryString.toLowerCase()) !== -1) {
                            if (temp.indexOf(tag) === -1) {
                                results.push({'value': tag.title});
                                temp.push(tag);
                            }
                        }
                    }
                }
                setTimeout(() => {
                    cb(results);
                }, 500);
            },
            selectSuggestTag(tag) {
                this.addTag(tag.value);
            },
            submit() {
                this.loading = true;
                if (this.title.length > 25) {
                    this.$message({
                        message: '文章标题最长25个字',
                        type: 'error',
                        center: true,
                        offset: 100
                    });
                    this.loading = false;
                    return;
                } else if (this.title.length <= 0) {
                    this.$message({
                        message: '文章标题不能为空',
                        type: 'error',
                        center: true,
                        offset: 100
                    });
                    this.loading = false;
                    return;
                }
                if (this.tags.length <= 0 || this.tags.length > 5) {
                    this.$message({
                        message: '文章标签最少1个，最多5个',
                        type: 'error',
                        center: true,
                        offset: 100
                    });
                    this.loading = false;
                    return;
                }
                if (this.$refs.vditor.getValue() === '') {
                    this.$message({
                        message: '文章内容不能为空',
                        type: 'error',
                        center: true,
                        offset: 100
                    });
                    this.loading = false;
                    return;
                }
                if (!this.$store.getters.isLogin) {
                    this.$message({
                        message: '您还没有登录，登录之后才能发表文章',
                        type: 'error',
                        center: true,
                        offset: 100
                    });
                    this.loading = false;
                    return;
                }
                let tagIds = this.tags.map(item => item.id).join(',');
                request({
                    url: "/article/article",
                    method: "PUT",
                    data: {
                        title: this.title,
                        content: "[toc]\n\n" + this.$refs.vditor.getValue(),
                        tags: tagIds
                    }
                }).then(res => {
                    let result = res.data;
                    if (result.code === 200) {
                        this.$message({
                            message: result.msg,
                            type: 'success',
                            center: true,
                            offset: 100
                        });
                        this.$router.replace('/');
                    } else {
                        this.$message({
                            message: result.msg,
                            type: 'error',
                            center: true,
                            offset: 100
                        });
                    }
                    this.loading = false;
                }).catch(err => {
                    this.$message({
                        message: '文章发布失败，请稍后重试',
                        type: 'error',
                        center: true,
                        offset: 100
                    });
                    this.loading = false;
                });
            },
            createTag() {
                this.isLoading = true;
                let newTag = this.newTag;
                if (newTag.categoryId === undefined || newTag.categoryId <= 0) {
                    alert('标签所属类别无效');
                    return;
                }
                if (newTag.title.length > 15) {
                    alert('标签的标题最多15个字');
                    return;
                }
                request({
                    url: "/tag/createTag",
                    method: "PUT",
                    data: {
                        categoryId: newTag.categoryId,
                        title: newTag.title
                    }
                }).then(res => {
                    let result = res.data;
                    if (result.code === 200) {
                        this.createTagDialog = false;
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
                        message: '服务器打了个盹，请再试一次吧',
                        type: 'error',
                        center: true,
                        offset: 100
                    });
                    this.isLoading = false;
                });
            }
        },
        components: {
            Vditor
        }
    }
</script>

<style scoped>
    .publish {
        padding-top: 20px;
    }

    .publish-tag {
        padding: 0 12px;
    }

    .publish-tag-head {
        padding-bottom: 8px;
    }

    .create-tag-btn {
        float: right;
        cursor: pointer;
    }

    .create-tag-btn:hover {
        color: #409eff;
    }
</style>

<style>
    body {
        background-color: #E9ECEF;
    }

    .publish .el-form-item__label {
        font-size: 18px;
    }

    .el-tag {
        margin-right: 8px;
        margin-bottom: 8px;
        cursor: pointer;
    }

    .el-tag:hover {
        background-color: #409EFF;
        color: #FFFFFF;
    }

    .el-tag:hover .el-icon-close {
        color: #FFFFFF;
    }

    .el-tabs__item {
        padding: 0 10px;
    }

    .el-popover {
        z-index: 10000 !important;
    }

    .el-autocomplete-suggestion {
        z-index: 10000 !important;
    }

    .select {
        z-index: 10000 !important;
    }
</style>
