<template>
    <div>
        <div class="blogs">
            <div class="blogs-header">
                <span>{{currentFavorites.count}}条内容</span>
                <el-divider direction="vertical"></el-divider>
                <span>
                <el-button v-show="!isManageMode" type="text" @click="editDialogVisible = true">编辑此收藏夹</el-button>
                <el-button v-show="isManageMode" type="text" @click="cancelCollectBatch">取消收藏</el-button>
            </span>
                <el-divider direction="vertical"></el-divider>
                <span>
                <el-button v-show="!isManageMode" type="text" @click="delDialogVisible = true">删除此收藏夹</el-button>
                <el-button v-show="isManageMode" type="text" @click="moveDialogVisible = true">移动至其他收藏夹</el-button>
            </span>
                <el-divider direction="vertical"></el-divider>
                <span>
                <el-button v-show="!isManageMode" type="text" @click="isManageMode = true">内容批量管理</el-button>
                <el-button v-show="isManageMode" type="text" @click="isManageMode = false">退出管理模式</el-button>
            </span>
            </div>
            <ul v-loading="loading">
                <li v-show="isManageMode && articles.length !== 0">
                    <el-checkbox :indeterminate="isIndeterminate" v-model="isCheckAll" @change="checkAll">全选</el-checkbox>
                </li>
                <li class="blog" v-for="(item, index) in articles">
                    <el-row>
                        <el-col v-show="isManageMode" :span="1">
                            <el-checkbox v-model="item.isChecked" @change="check"></el-checkbox>
                        </el-col>
                        <el-col :span="isManageMode ? 23 : 24">
                            <div class="blog-title">
                                <el-link :underline="false" :href="'/article/' + item.id">{{item.title}}</el-link>
                                <span class="blog-del-btn" @click="cancelCollectSingle(index)" title="取消收藏">
                                    <i class="el-icon-close"></i>
                                </span>
                            </div>
                            <div class="blog-content">
                                {{item.content}}
                            </div>
                            <div>
                                <span>
                                    <el-popover placement="top-start" width="200" trigger="hover"
                                        content="我不会使用双截棍">
                                        <span slot="reference" class="blog-user">
                                            <el-link :underline="false">
                                                <el-avatar :size="24" :src="item.user.avatar">
                                                    <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
                                                </el-avatar>
                                            </el-link>&nbsp;
                                            <el-link :underline="false">{{item.user.username}}</el-link>
                                        </span>
                                    </el-popover>
                                </span>
                                <span class="blog-info">
                                    <el-link :underline="false"
                                             class="iconfont el-icon-ali-good">
                                        {{item.goodCount}}</el-link>
                                    <el-divider direction="vertical"></el-divider>
                                    <el-link :underline="false"
                                             class="iconfont el-icon-ali-comments">
                                        {{item.commentCount}}</el-link>
                                    <el-divider direction="vertical"></el-divider>
                                    <el-link :underline="false"
                                             class="iconfont el-icon-ali-view">
                                        {{item.viewCount}}</el-link>
                                </span>
                            </div>
                        </el-col>
                    </el-row>
                </li>
            </ul>
            <div class="pagination">
                <el-pagination
                    layout="prev, pager, next"
                    :total="pagination.total"
                    @current-change="switchCurrentPage">
                </el-pagination>
            </div>
        </div>
        <el-dialog
            width="30%"
            :visible.sync="editDialogVisible"
            :show-close="false"
            v-loading="loading"
            class="new">
            <template v-slot:title>
                <div class="new-header">编辑收藏夹</div>
            </template>
            <template v-slot:default>
                <div class="new-body">
                    <el-form label-position="left"
                             label-width="100px"
                             :model="currentFavorites"
                             :rules="formRule"
                             ref="currentFavorites">
                        <el-form-item label="标题" prop="title">
                            <el-input type="text"
                                      size="small"
                                      placeholder="请填写收藏夹的名称"
                                      v-model="currentFavorites.title"></el-input>
                        </el-form-item>
                        <el-form-item label="描述（选填）" prop="description">
                            <el-input type="textarea"
                                      placeholder="请输入描述内容"
                                      resize="none"
                                      :rows="6"
                                      v-model="currentFavorites.description"></el-input>
                        </el-form-item>
                        <el-form-item label="私密" prop="pri">
                            <el-radio-group v-model="currentFavorites.pri">
                                <el-radio :label="false">公开(所有人可见)</el-radio>
                                <el-radio :label="true">私密(只有你可以查看这个收藏夹)</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-form>
                </div>
            </template>
            <template v-slot:footer>
                <div class="new-footer">
                    <el-button @click="editDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="editFavorites">确 定</el-button>
                </div>
            </template>
        </el-dialog>
        <el-dialog
            width="30%"
            :visible.sync="delDialogVisible"
            :show-close="false"
            v-loading="loading"
            class="new">
            <template v-slot:title>
                <div class="new-header">删除收藏夹</div>
            </template>
            <template v-slot:default>
                <div class="del-body">
                    <el-radio>您收藏的文章将被一并删除（删除操作不可恢复）</el-radio>
                </div>
            </template>
            <template v-slot:footer>
                <div class="new-footer">
                    <el-button @click="delDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="delFavorites">确 定</el-button>
                </div>
            </template>
        </el-dialog>
        <el-dialog
            :visible.sync="moveDialogVisible"
            width="30%"
            :show-close="false"
            class="new">
            <template v-slot:title>
                <div class="new-header">移动至其他收藏夹</div>
            </template>
            <template v-slot:default>
                <div class="del-body">
                    <el-form label-position="left" label-width="80px">
                        <el-form-item label="移动至">
                            <el-select v-model="moveToIndex" size="small">
                                <el-option v-for="(item, index) in favorites"
                                           v-if="item.id !== currentFavorites.id"
                                           :key="index"
                                           :label="item.title"
                                           :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </div>
            </template>
            <template v-slot:footer>
                <div class="new-footer">
                    <el-button size="small" @click="moveDialogVisible = false">取 消</el-button>
                    <el-button type="primary" size="small" @click="moveToFavorites">确 定</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script>
    import axios from "axios";

    let sessionId = localStorage.getItem("xxl-sso-session-id");
    axios.defaults.headers.common['xxl-sso-session-id'] = sessionId;

    export default {
        name: "FavoriteList",
        created() {
            this.loading = true;
            axios.get('http://localhost/collect/getCollect', {
                params: {
                    favoritesId: this.currentFavorites.id,
                    page: 1,
                    size: 10
                }
            }).then(res => {
                let result = res.data;
                if (result.code === 200) {
                    let data = result.data;
                    this.articles = data.articles;
                    this.$set(this.articles, 'isChecked', false);
                    delete data.articles;
                    this.pagination = data;
                    this.loading = false;
                } else {
                    this.loading = false;
                    this.$message({
                        message: result.msg,
                        type: 'error',
                        center: true,
                        offset: 100
                    });
                }
            }).catch(err => {
                this.loading = false;
                this.$message({
                    message: '服务器打了个盹，请刷新重试',
                    type: 'error',
                    center: true,
                    offset: 100
                });
            });
        },
        data() {
            let validateTitle = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('标题不能为空'));
                } else if (value.length > 10) {
                    return callback(new Error('标题最多10个字'));
                }
                callback();
            };
            let validateDescription = (rule, value, callback) => {
                if (value.length > 50) {
                    return callback(new Error("描述最多50个字"));
                }
                callback();
            };
            let validatePri = (rule, value, callback) => {
                if (value !== true && value !== false) {
                    return callback(new Error("无效的数据格式"));
                }
                callback();
            };
            return {
                isManageMode: false,
                isCheckAll: false,
                isIndeterminate: false,
                editDialogVisible: false,
                delDialogVisible: false,
                moveDialogVisible: false,
                moveToIndex: '',
                formRule: {
                    title: [{ validator: validateTitle, trigger: 'blur' }],
                    description: [{ validator: validateDescription, trigger: 'blur' }],
                    pri:[{ validator: validatePri, trigger: 'blur' }]
                },
                loading: false,
                articles: [],
                pagination: {}
            }
        },
        props: {
            index: {
                type: Number,
                default: 0
            },
            favorites: {
                type: Array,
                default: []
            },
            currentFavorites: Object
        },
        methods: {
            cancelCollectSingle(index) {
                let articleIds = [];
                articleIds.push(this.articles[index].id);
                let temp = [];
                for (let i = 0; i < this.articles.length; i++) {
                    if (index !== i) {
                        temp.push(this.articles[index]);
                    }
                }
                this.cancelCollect(articleIds, temp);
            },
            cancelCollectBatch() {
                this.loading = true;
                let temp = this.articles.filter(item => !item.isChecked);
                let articleIds = this.articles.filter(item => item.isChecked).map(item => item.id);
                this.cancelCollect(articleIds, temp);
            },
            cancelCollect(articleIds, temp) {
                axios.post('http://localhost/collect/cancelCollectArticle', {
                    articleIds,
                    favoritesId: this.currentFavorites.id
                }).then(res => {
                    let result = res.data;
                    if (result.code === 200) {
                        this.articles = temp.map(item => {
                            item.isChecked = false;
                            return item;
                        });
                        setTimeout(() => {
                            this.check();
                        })
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
                        message: '服务器打了个盹，再试一次吧',
                        type: 'error',
                        center: true,
                        offset: 100
                    });
                    this.loading = false;
                });
            },
            check() {
                let checkCount = this.articles.filter(item => item.isChecked).length;
                this.isCheckAll = checkCount === this.articles.length;
                this.isIndeterminate = checkCount > 0 && checkCount < this.articles.length;
            },
            checkAll(val) {
                for (let item of this.articles) {
                    item.isChecked = val;
                }
                this.isIndeterminate = false;
            },
            editFavorites() {
                this.loading = true;
                this.$refs['currentFavorites'].validate((valid) => {
                    if (valid) {
                        axios.post('http://localhost/collect/modifyFavorites', {
                            id: this.currentFavorites.id,
                            title: this.currentFavorites.title,
                            description: this.currentFavorites.description,
                            pri: this.currentFavorites.pri
                        }).then(res => {
                            let result = res.data;
                            if (result.code === 200) {
                                this.editDialogVisible = false;
                                this.$refs['currentFavorites'].resetFields();
                                this.loading = false;
                                this.$emit('editFavorite', this.index, this.currentFavorites);
                                this.$message({
                                    message: '修改收藏夹成功',
                                    type: 'success',
                                    center: true,
                                    offset: 100
                                });
                            } else {
                                this.$message({
                                    message: result.msg,
                                    type: 'error',
                                    center: true,
                                    offset: 100
                                });
                                this.loading = false;
                            }
                        }).catch(err => {
                            this.$message({
                                message: '服务器打了个盹，请再试一次吧',
                                type: 'error',
                                center: true,
                                offset: 100
                            });
                            this.loading = false;
                        });
                    } else {
                        this.loading = false;
                    }
                });
            },
            delFavorites() {
                this.loading = true;
                axios.post('http://localhost/collect/deleteFavorites?id=' + this.currentFavorites.id).then(res => {
                    let result = res.data;
                    if (result.code === 200) {
                        this.delDialogVisible = false;
                        this.loading = false;
                        this.$emit('delFavorite', this.index);
                        this.$message({
                            message: '删除收藏夹成功',
                            type: 'success',
                            center: true,
                            offset: 100
                        });
                    } else {
                        this.$message({
                            message: result.msg,
                            type: 'error',
                            center: true,
                            offset: 100
                        });
                        this.loading = false;
                    }
                }).catch(err => {
                    this.$message({
                        message: '服务器打了个盹，请再试一次吧',
                        type: 'error',
                        center: true,
                        offset: 100
                    });
                    this.loading = false;
                });
            },
            moveToFavorites() {
                this.loading = true;
                let temp = this.articles.filter(item => !item.isChecked);
                /*let srcFavorite = [];
                for (let i = 0; i < this.articles.length; i++) {
                    if (this.articles[i].isChecked) {
                        srcFavorite.push(i);
                    }
                }
                this.$emit('moveToFavorite', this.index, this.moveToIndex, srcFavorite, temp);*/
                let articleIds = this.articles.filter(item => item.isChecked).map(item => item.id);
                axios.post('http://localhost/collect/moveToFavorites', {
                    articleIds,
                    source: this.currentFavorites.id,
                    target: this.moveToIndex
                }).then(res => {
                    let result = res.data;
                    if (result.code === 200) {
                        this.articles = temp.map(item => {
                            item.isChecked = false;
                            return item;
                        });
                        this.$message({
                            message: '成功移动至其他收藏夹',
                            type: 'success',
                            center: true,
                            offset: 100
                        });
                        this.moveDialogVisible = false;
                        setTimeout(() => {
                            this.check();
                        });
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
                        message: '服务器打了个盹，再试一次吧',
                        type: 'error',
                        center: true,
                        offset: 100
                    });
                    this.loading = false;
                });
            },
            switchCurrentPage(currentPage) {
                this.loading = true;
                axios.get('http://localhost/collect/getCollect', {
                    params: {
                        favoritesId: this.currentFavorites.id,
                        page: currentPage,
                        size: 10
                    }
                }).then(res => {
                    let result = res.data;
                    if (result.code === 200) {
                        let data = result.data;
                        this.articles = data.articles;
                        this.$set(this.articles, 'isChecked', false);
                        delete data.articles;
                        this.pagination = data;
                        this.loading = false;
                    } else {
                        this.loading = false;
                        this.$message({
                            message: result.msg,
                            type: 'error',
                            center: true,
                            offset: 100
                        });
                    }
                }).catch(err => {
                    this.loading = false;
                    this.$message({
                        message: '服务器打了个盹，请刷新重试',
                        type: 'error',
                        center: true,
                        offset: 100
                    });
                });
            }
        }
    }
</script>

<style scoped>
    .blogs {
        background-color: #FFFFFF;
    }

    .blogs-header {
        border-bottom: 1px solid #eaebec;
        margin-bottom: 10px;
    }

    .blogs-header span {
        font-size: 14px;
        color: #999999;
        font-weight: 400;
        vertical-align: unset;
        margin-right: 10px;
    }

    .blogs-header .el-divider {
        margin-right: 16px;
    }

    .blogs-header .el-button {
        color: #6B6B6B;
    }

    .blogs-header .el-button:hover {
        color: #409EFF;
    }

    .blogs ul {
        padding: 0;
        margin: 0;
        list-style: none;
    }

    .blogs ul li {
        padding: 18px 24px 13px;
        -webkit-box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.04);
        box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.04);
        background-color: #FAFAFA;
        margin-bottom: 10px;
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

    .pagination {
        margin-top: 28px;
        text-align: center;
    }

    .new-header {
        border-bottom: 1px solid #e0e0e0;
        font-size: 16px;
        color: #000000;
        line-height: 54px;
        padding: 0 16px;
    }

    .new-body {
        padding: 5px 16px;
    }

    .del-body {
        padding: 25px 16px;
    }
</style>

<style>
    .blog-info .el-link i {
        font-size: 14px !important;
    }
</style>
