<template>
    <el-row style="padding-top: 20px;">
        <el-col :span="14" :offset="5" class="user">
            <div class="business-card" v-loading="isLoading">
                <div class="business-card-avatar">
                    <el-avatar :size="100" :src="user.avatar">
                        <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
                    </el-avatar>
                </div>
                <div class="business-card-body">
                    <p class="nickname">{{user.username}}</p>
                    <div class="introduction">
                        <i class="el-icon-postcard" title="简介"></i>
                        <p>{{user.introduction === null ? "这个家伙很懒，什么都没有留下..." : user.introduction}}</p>
                    </div>
                </div>
                <div class="business-card-right">
                    <el-button v-if="!isFollow"
                               type="primary"
                               size="medium"
                               :loading="following"
                               @click="follow">关注</el-button>
                    <el-button v-else
                               size="medium"
                               icon="el-icon-check"
                               :loading="following"
                               @click="cancelFollow">已关注</el-button>
                    <el-button type="success"
                               size="medium"
                               @click="sendLetter">私信</el-button>
                </div>
                <div style="clear: both"></div>
            </div>
            <div class="user-resource">
                <el-tabs>
                    <el-tab-pane :lazy="true">
                        <template v-slot:label>
                            <span>博客</span>
                            <!--<span>{{user.articleCount}}</span>-->
                        </template>
                        <blog :user-id="id"></blog>
                    </el-tab-pane>
                    <el-tab-pane :lazy="true">
                        <template v-slot:label>
                            <span>收藏</span>
                            <!--<span>54</span>-->
                        </template>
                        <favorite :user-id="id"></favorite>
                    </el-tab-pane>
                    <el-tab-pane :lazy="true">
                        <template v-slot:label>
                            <span>TA的关注</span>
                            <!--<span>{{user.followCount}}</span>-->
                        </template>
                        <follow :user-id="id"></follow>
                    </el-tab-pane>
                    <el-tab-pane :lazy="true">
                        <template v-slot:label>
                            <span>TA的粉丝</span>
                            <!--<span>{{user.fansCount}}</span>-->
                        </template>
                        <fans :user-id="id"></fans>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </el-col>
    </el-row>
</template>

<script>
    import Blog from "@/views/user/blog/Blog";
    import Favorite from "@/views/user/favorite/Favorite";
    import Follow from "@/views/user/follow/Follow";
    import Fans from "@/views/user/fans/Fans";
    import {request} from "@/network/request";

    export default {
        name: "User",
        created() {
            this.isLoading = true;
            this.id = Number(this.$route.params.userId);
            if (this.id <= 0) {
                this.$router.push("/");
            }
            request({
                url: "/user/getSimpleUser",
                method: "GET",
                params: {
                    id: this.id
                }
            }).then(res => {
                let result = res.data;
                if (result.code === 200) {
                    this.user = result.data;
                    request({
                        url: "/interactive/isFollow",
                        method: "GET",
                        params: {
                            followId: this.id
                        }
                    }).then(res => {
                        this.isFollow = res.data;
                    });
                }
                this.isLoading = false;
            }).catch(err => {
                this.isLoading = false;
            });
        },
        data() {
            return {
                id: 0,
                user: {},
                isFollow: false,
                isLoading: false,
                following: false
            }
        },
        methods: {
            follow() {
                this.following = true;
                request({
                    url: "/interactive/follow",
                    method: "PUT",
                    params: {
                        followId: this.id
                    }
                }).then(res => {
                    let result = res.data;
                    if (result.code === 200) {
                        this.$message({
                            message: "关注成功",
                            type: "success",
                            center: true,
                            offset: 100
                        });
                        this.isFollow = true;
                    } else {
                        this.$message({
                            message: result.msg,
                            type: "error",
                            center: true,
                            offset: 100
                        });
                    }
                    this.following = false;
                }).catch(err => {
                    this.$message({
                        message: "服务器打了个盹，请再试一次吧",
                        type: "error",
                        center: true,
                        offset: 100
                    });
                    this.following = false;
                });
            },
            cancelFollow() {
                this.following = true;
                let ids = [];
                ids.push(this.id);
                request({
                    url: "/interactive/cancelFollow",
                    method: "POST",
                    data: {
                        followIds: ids
                    }
                }).then(res => {
                    let result = res.data;
                    if (result.code === 200) {
                        this.$message({
                            message: "取消关注成功",
                            type: "success",
                            center: true,
                            offset: 100
                        });
                        this.isFollow = false;
                    } else {
                        this.$message({
                            message: result.msg,
                            type: "error",
                            center: true,
                            offset: 100
                        });
                    }
                    this.following = false;
                }).catch(err => {
                    this.$message({
                        message: "服务器打了个盹，请再试一次吧",
                        type: "error",
                        center: true,
                        offset: 100
                    });
                    this.following = false;
                });
            },
            sendLetter() {
                if (this.$store.getters.getUserId === undefined) {
                    this.$message({
                        message: "您需要登录之后才可以向该用户发送私信",
                        type: "error",
                        center: true,
                        offset: 100
                    });
                } else if (this.id === this.$store.getters.getUserId) {
                    this.$message({
                        message: "您不能向自己发送私信",
                        type: "error",
                        center: true,
                        offset: 100
                    });
                } else {
                    let person = {
                        toId: this.user.id,
                        toUsername: this.user.username,
                        toAvatar: this.user.avatar,
                        msg: " ",
                        createTime: (new Date()).getTime(),
                        page: 1,
                        size: 10
                    }
                    this.$router.push({
                        name: "private-letter",
                        params: {
                            person
                        }
                    });
                }
            }
        },
        components: {
            Favorite,
            Follow,
            Blog,
            Fans
        }
    }
</script>

<style scoped>
    .user {
        border-radius: 4px;
    }

    .business-card {
        background-color: #ffffff;
    }

    .business-card-avatar {
        margin: 19px 24px 32px;
        position: relative;
        float: left;
    }

    .business-card-body {
        float: left;
        position: relative;
        margin: 24px 0;
        width: 55%;
    }

    .nickname {
        font-size: 26px;
        color: #4d4d4d;
        min-height: 24px;
        margin: 0;
        padding: 0;
    }

    .introduction {
        margin-top: 7px;
        display: flex;
        align-items: flex-start;
        text-align: justify;
    }

    .introduction i {
        vertical-align: top;
    }

    .introduction p {
        margin: 0 0 0 8px;
        padding: 0;
        display: inline-block;
        font-family: 'Microsoft YaHei',Arial,serif;
        text-align: justify;
        font-size: 14px;
        color: #999999;
        line-height: 20px;
    }

    .business-card-right {
        margin-top: 24px;
        position: relative;
        float: right;
        margin-right: 24px;
    }

    .user-resource {
        margin-top: 8px;
        padding: 0 28px;
        background-color: #ffffff;
    }

    .user-resource .el-tabs .el-tabs__item span {
        font-size: 16px;
    }

    .user-resource .el-tabs .el-tabs__item span:first-child {
        padding-left: 8px;
        padding-right: 4px;
    }

    .user-resource .el-tabs .el-tabs__item span:last-child {
        padding-left: 4px;
        padding-right: 8px;
    }
</style>

<style>
    body {
        background-color: #f5f6f7;
    }

    .user-resource .el-tabs .el-tabs__nav {
        padding-bottom: 15px;
    }

    .user-resource .el-tabs .el-tabs__nav .el-tabs__item {
        line-height: 60px;
    }
</style>
