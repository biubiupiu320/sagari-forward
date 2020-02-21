<template>
    <div>
        <div class="blogs">
            <div class="blogs-header">
                <span>{{editFavorite.count}}条内容</span>
                <el-divider direction="vertical"></el-divider>
                <span>
                <el-button v-show="!isManageMode" type="text" @click="editDialogVisible = true">编辑此收藏夹</el-button>
                <el-button v-show="isManageMode" type="text" @click="cancelFavorite">取消收藏</el-button>
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
            <ul>
                <li v-show="isManageMode && invitations.length !== 0">
                    <el-checkbox :indeterminate="isIndeterminate" v-model="isCheckAll" @change="checkAll">全选</el-checkbox>
                </li>
                <li class="blog" v-for="(item, index) in invitations">
                    <el-row>
                        <el-col v-show="isManageMode" :span="1">
                            <el-checkbox v-model="item.isChecked" @change="check"></el-checkbox>
                        </el-col>
                        <el-col :span="isManageMode ? 23 : 24">
                            <div class="blog-title">
                                <el-link :underline="false" :href="'/article/' + item.articleId">{{item.articleTitle}}</el-link>
                                <span class="blog-del-btn" @click="removeBlog(index)"><i class="el-icon-close"></i></span>
                            </div>
                            <div class="blog-content">
                                {{item.articleContent}}
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
                                            <el-link :underline="false">{{item.user.name}}</el-link>
                                        </span>
                                    </el-popover>
                                </span>
                                <span class="blog-info">
                                    <el-link :underline="false" icon="el-icon-ali-good">{{item.goodCount}}</el-link>
                                    <el-divider direction="vertical"></el-divider>
                                    <el-link :underline="false" icon="el-icon-ali-comments">{{item.commentCount}}</el-link>
                                    <el-divider direction="vertical"></el-divider>
                                    <el-link :underline="false" icon="el-icon-view">{{item.viewCount}}</el-link>
                                </span>
                            </div>
                        </el-col>
                    </el-row>
                </li>
            </ul>
            <div class="pagination">
                <el-pagination
                    layout="prev, pager, next"
                    :total="50">
                </el-pagination>
            </div>
        </div>
        <el-dialog
            :visible.sync="editDialogVisible"
            width="30%"
            :show-close="false"
            class="new">
            <template v-slot:title>
                <div class="new-header">编辑收藏夹</div>
            </template>
            <template v-slot:default>
                <div class="new-body">
                    <el-form label-position="left" label-width="100px" :model="editFavorite" ref="editFavorite">
                        <el-form-item label="标题" prop="name">
                            <el-input type="text"
                                      size="small"
                                      placeholder="请填写收藏夹的名称"
                                      v-model="editFavorite.name"></el-input>
                        </el-form-item>
                        <el-form-item label="描述（选填）" prop="description">
                            <el-input type="textarea"
                                      placeholder="请输入描述内容"
                                      resize="none"
                                      :rows="6"
                                      v-model="editFavorite.description"></el-input>
                        </el-form-item>
                        <el-form-item label="私密">
                            <el-radio-group v-model="editFavorite.isPublic">
                                <el-radio :label="true">公开(所有人可见)</el-radio>
                                <el-radio :label="false">私密(只有你可以查看这个收藏夹)</el-radio>
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
            :visible.sync="delDialogVisible"
            width="30%"
            :show-close="false"
            class="new">
            <template v-slot:title>
                <div class="new-header">删除收藏夹</div>
            </template>
            <template v-slot:default>
                <div class="del-body">
                    <el-radio>一并删除（删除操作不可恢复）</el-radio>
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
                <div class="new-header">编辑收藏夹</div>
            </template>
            <template v-slot:default>
                <div class="del-body">
                    <el-form label-position="left" label-width="80px">
                        <el-form-item label="移动至">
                            <el-select v-model="moveToIndex">
                                <el-option v-for="(item, index) in favorites"
                                           :key="index"
                                           :label="item.name"
                                           :value="index">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </div>
            </template>
            <template v-slot:footer>
                <div class="new-footer">
                    <el-button @click="moveDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="moveToFavorite">确 定</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "FavoriteList",
        data() {
            return {
                isManageMode: false,
                isCheckAll: false,
                isIndeterminate: false,
                editDialogVisible: false,
                delDialogVisible: false,
                moveDialogVisible: false,
                moveToIndex: ''
            }
        },
        props: {
            invitations: {
                type: Array,
                default: []
            },
            editFavorite: {
                type: Object,
                default: null
            },
            index: {
                type: Number,
                default: 0
            },
            favorites: {
                type: Array,
                default: []
            }
        },
        methods: {
            removeBlog(index) {
                this.invitations.splice(index, 1);
            },
            check() {
                let checkCount = this.invitations.filter(item => item.isChecked).length;
                this.isCheckAll = checkCount === this.invitations.length;
                this.isIndeterminate = checkCount > 0 && checkCount < this.invitations.length;
            },
            checkAll(val) {
                for (let item of this.invitations) {
                    item.isChecked = val;
                }
                this.isIndeterminate = false;
            },
            cancelFavorite() {
                let temp = this.invitations.filter(item => !item.isChecked);
                this.$emit('cancelFavorite', this.index, temp);
                setTimeout(() => {
                    this.check();
                }, 500);
            },
            editFavorites() {
                this.$emit('editFavorite', this.index, this.editFavorite);
                this.editDialogVisible = false;
            },
            delFavorites() {
                this.$emit('delFavorite', this.index);
                this.delDialogVisible = false;
            },
            moveToFavorite() {
                let temp = this.invitations.filter(item => item.isChecked);
                let srcFavorite = [];
                for (let i = 0; i < this.invitations.length; i++) {
                    if (this.invitations[i].isChecked) {
                        srcFavorite.push(i);
                    }
                }
                this.$emit('moveToFavorite', this.index, this.moveToIndex, srcFavorite, temp);
                this.moveDialogVisible = false;
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

<style src="../../../assets/css/iconfont.css"></style>
