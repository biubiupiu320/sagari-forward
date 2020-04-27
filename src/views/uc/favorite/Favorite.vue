<template>
    <div class="favorite">
        <div class="favorite-header">
            <span>我创建的收藏夹</span>
            <span style="float: right">
                <el-button type="text" icon="el-icon-plus" @click="newDialogVisible = true">新建收藏夹</el-button>
            </span>
        </div>
        <div class="favorite-body">
            <el-tabs :stretch="true" v-model="activeName">
                <el-tab-pane v-for="(item, index) in favorites" :label="item.title" :name="index + ''" :lazy="true">
                    <favorite-list :index="index"
                                   :favorites="favorites"
                                   :current-favorites="item"
                                   @cancelFavorite="cancelFavorite"
                                   @editFavorite="editFavorite"
                                   @delFavorite="delFavorite"
                                   @moveToFavorite="moveToFavorite"></favorite-list>
                </el-tab-pane>
            </el-tabs>
        </div>
        <el-dialog
            :visible.sync="newDialogVisible"
            width="30%"
            :show-close="false"
            class="new">
            <template v-slot:title>
                <div class="new-header">新建收藏夹</div>
            </template>
            <template v-slot:default>
                <div class="new-body">
                    <el-form label-position="left"
                             label-width="100px"
                             :model="newFavorites"
                             :rules="formRule"
                             ref="newFavorite">
                        <el-form-item label="标题" prop="title">
                            <el-input type="text"
                                      size="small"
                                      placeholder="请填写收藏夹的名称"
                                      v-model="newFavorites.title"></el-input>
                        </el-form-item>
                        <el-form-item label="描述（选填）" prop="description">
                            <el-input type="textarea"
                                      placeholder="请输入描述内容"
                                      resize="none"
                                      :rows="6"
                                      v-model="newFavorites.description"></el-input>
                        </el-form-item>
                        <el-form-item label="私密" prop="pri">
                            <el-radio-group v-model="newFavorites.pri">
                                <el-radio :label="false">公开(所有人可见)</el-radio>
                                <el-radio :label="true">私密(只有你可以查看这个收藏夹)</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-form>
                </div>
            </template>
            <template v-slot:footer>
                <div class="new-footer">
                    <el-button @click="newDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="createFavorite">确 定</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script>
    import FavoriteList from "@/views/uc/favorite/FavoriteList";
    import axios from "axios";

    let sessionId = localStorage.getItem("xxl-sso-session-id");
    axios.defaults.headers.common['xxl-sso-session-id'] = sessionId;

    export default {
        name: "Favorite",
        created() {
            setTimeout(() => {
                let userId = this.$store.getters.getUserId;
                if (userId === undefined || userId <= 0) {
                    return;
                }
                axios.get('http://localhost/collect/getFavorites', {
                    params: {
                        targetUserId: userId
                    }
                }).then(res => {
                    let result = res.data;
                    if (result.code === 200) {
                        this.favorites = result.data.favorites;
                    } else {
                        this.$message({
                            message: '获取收藏夹列表失败，请刷新重试',
                            type: 'error',
                            center: true,
                            offset: 100
                        });
                    }
                }).catch(err => {
                    this.$message({
                        message: '服务器打了个盹，请再试一次吧',
                        type: 'error',
                        center: true,
                        offset: 100
                    });
                });
            }, 1000);
        },
        data() {
            let validateTitle = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('标题不能为空'));
                } else if (value.length > 20) {
                    return callback(new Error('标题最多20个字'));
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
                favorites: [],
                newDialogVisible: false,
                newFavorites: {
                    title: '',
                    description: '',
                    pri: false
                },
                formRule: {
                    title: [{ validator: validateTitle, trigger: 'blur' }],
                    description: [{ validator: validateDescription, trigger: 'blur' }],
                    pri:[{ validator: validatePri, trigger: 'blur' }]
                },
                activeName: '0'
            }
        },
        methods: {
            createFavorite() {
                this.$refs['newFavorite'].validate((valid) => {
                    if (valid) {
                        axios.put('http://localhost/collect/createFavorites', {
                            title: this.newFavorites.title,
                            description: this.newFavorites.description,
                            pri: this.newFavorites.pri
                        }).then(res => {
                            let result = res.data;
                            if (result.code === 200) {
                                this.newDialogVisible = false;
                                this.$refs['newFavorite'].resetFields();
                                this.$message({
                                    message: '创建收藏夹成功',
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
                            }
                        }).catch(err => {
                            this.$message({
                                message: '创建收藏夹失败',
                                type: 'error',
                                center: true,
                                offset: 100
                            });
                        });
                    }
                });
            },
            editFavorite(index, editFavorites) {
                this.favorites[index] = editFavorites;
            },
            delFavorite(index) {
                let temp = index - 1;
                this.activeName = temp + '';
                this.favorites.splice(index, 1);
            },
            moveToFavorite(src, target, srcFavorite, favorites) {
                for (let index of srcFavorite) {
                    this.favorites[src].invitations.splice(index, 1);
                }
                for (let favorite of favorites) {
                    this.favorites[target].invitations.push(favorite);
                }
            },
            cancelFavorite(index, temp) {
                this.favorites[index].invitations = temp;
            }
        },
        components: {
            FavoriteList
        }
    }
</script>

<style scoped>
    .favorite {
        padding-bottom: 30px;
    }

    .favorite-header {
        font-size: 20px;
        font-weight: 700;
        color: #3d3d3d;
        height: 90px;
        line-height: 90px;
        border-bottom: 1px solid #e0e0e0;
        margin-top: 0;
        margin-bottom: 0;
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
</style>

<style>
    .new .el-dialog__header {
        padding: 0;
    }

    .new .el-dialog__body {
        padding: 0;
    }
</style>
