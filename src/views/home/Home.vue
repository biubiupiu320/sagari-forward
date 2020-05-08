<template>
    <div class="home">
        <el-row>
            <el-col :span="14" :offset="5">
                <el-row :gutter="12">
                    <el-col :span="2">
                        <nav class="left-nav">
                            <ul>
                                <li :class="{active: 0 === categoryId}" @click="switchNav(0)">
                                    <el-link :underline="false">推荐</el-link>
                                </li>
                                <li v-for="(item, index) in category"
                                    @click="switchNav(index + 1)"
                                    :class="{active: index + 1 === categoryId}">
                                    <el-link :underline="false">{{item.title}}</el-link>
                                </li>
                            </ul>
                        </nav>
                    </el-col>
                    <el-col :span="16">
                        <invitation ref="invitation" :category-id="categoryId"/>
                    </el-col>
                    <el-col :span="6">
                        <div class="login">
                            <div class="title">Sagari</div>
                            <div class="description">一个和大家共同成长的社区</div>
                            <div class="login-form">
                                <el-form :disabled="isLogin">
                                    <el-form-item>
                                        <el-input prefix-icon="el-icon-user"
                                                  size="small"
                                                  v-model="username"
                                                  placeholder="用户名/邮箱"></el-input>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-input prefix-icon="el-icon-lock"
                                                  size="small"
                                                  v-model="password"
                                                  placeholder="密码"
                                                  show-password></el-input>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-button type="primary" size="small" style="width: 100%">登录</el-button>
                                    </el-form-item>
                                </el-form>
                            </div>
                            <div class="oauth" v-if="!isLogin">
                                第三方登录:
                                <a href="https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=101864484&redirect_uri=http://sagari.cn/qq_callback&state=1">
                                    <img src="../../assets/image/qq.svg" alt="QQ" class="oauth-btn">
                                </a>
                                <!--<img src="../../assets/image/github.svg" alt="Github" class="oauth-btn">
                                <img src="../../assets/image/weibo.svg" alt="新浪微博" class="oauth-btn">-->
                            </div>
                        </div>
                        <div class="popular-tags">
                            <div class="popular-tags-header">热门标签</div>
                            <div class="popular-tags-body">
                                <el-tag type="primary" v-for="item in hotTags">{{item.title}}</el-tag>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import Invitation from "@/views/home/Invitation";
    import {request} from "@/network/request";

    export default {
        name: "Home",
        created() {
            setTimeout(() => {
                this.isLogin = this.$store.getters.isLogin;
            }, 500);
            request({
                url: "/tag/getCategory",
                method: "GET",
            }).then(res => {
                let result = res.data;
                if (result.code === 200) {
                    this.category = result.data.category;
                }
            }).catch(err => {
                this.$message({
                    message: '服务器打了个盹，请刷新重试',
                    type: 'error',
                    center: true,
                    offset: 100
                });
            });
            request({
                url: "/tag/getHotTag",
                method: "GET"
            }).then(res => {
                let result = res.data;
                if (result.code === 200) {
                    this.hotTags = result.data.hotTags;
                }
            }).catch(err => {
                this.$message({
                    message: '服务器打了个盹，请刷新重试',
                    type: 'error',
                    center: true,
                    offset: 100
                });
            });
        },
        data() {
            return {
                username: '',
                password: '',
                hotTags: [],
                categoryId: 0,
                category: [],
                isLogin: true
            }
        },
        methods: {
            switchNav(index) {
                this.categoryId = index;
                let invitation = this.$refs["invitation"];
                invitation.loading = true;
                invitation.invitations = [];
                invitation.page = 0;
                if (this.categoryId === 0) {
                    invitation.getHomeArticle();
                } else {
                    invitation.getArticleByCategory(this.categoryId);
                }
            }
        },
        components: {
            Invitation
        }
    }
</script>

<style scoped>
    .home {
        padding-top: 20px;
    }

    .left-nav {
        background-color: #FFFFFF;
        color: #333;
        font-size: 14px;
        line-height: 32px;
        padding-top: 6px;
        padding-bottom: 6px;
        box-sizing: border-box;
        font-family: PingFang SC, Hiragino Sans GB, Arial, Microsoft YaHei, Verdana, Roboto,
                    Noto, Helvetica Neue, sans-serif !important;
        text-align: center;
        word-break: break-all;
        -webkit-text-size-adjust: 100%;
        -moz-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
    }

    .left-nav ul {
        list-style: none;
        text-align: center;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        padding: 0;
        margin: 0;
    }

    .left-nav ul li {
        display: list-item;
    }

    .left-nav ul li .el-link {
        font-size: 14px;
        color: #333;
        font-family: PingFang SC, Hiragino Sans GB, Arial, Microsoft YaHei, Verdana, Roboto,
        Noto, Helvetica Neue, sans-serif !important;
    }

    .left-nav ul .active {
        background-color: #f44444;
    }

    .left-nav ul .active .el-link {
        color: #FFFFFF;
    }

    .left-nav ul li:hover, .left-nav ul li:hover .el-link {
        background-color: #f44444;
        color: #ffffff;
    }

    .login {
        background-color: #FFFFFF;
        padding: 16px;
    }

    .title {
        font-size: 14px;
        font-weight: 600;
        margin-bottom: 6px;
        color: #2E3135;
    }

    .description {
        font-size: 14px;
        margin-bottom: 6px;
        color: #2E3135;
    }

    .login-form .el-form .el-form-item {
        margin: 0 0 5px 0;
    }

    .oauth {
        font-size: 14px;
        color: #767676;
        margin-top: 10px;
    }

    .oauth-btn {
        margin-left: 14px;
        vertical-align: bottom;
        cursor: pointer;
    }

    .popular-tags {
        margin-top: 18px;
        background-color: #FFFFFF;
    }

    .popular-tags-header {
        padding: 0 15px;
        line-height: 45px;
        justify-content: space-between;
        border-bottom: 1px solid #f6f6f6;
        font-size: 14px;
        color: #333;
        display: flex;
    }

    .popular-tags-body {
        padding: 15px;
    }

    .popular-tags-body .el-tag {
        margin: 0 12px 12px 0;
    }

    .popular-tags-body .el-tag:hover {
        background-color: #409eff;
        border-color: #409eff;
        color: #fff;
        cursor: pointer;
    }
</style>

<style>
    body {
        background-color: #f5f6f7;
    }
</style>
