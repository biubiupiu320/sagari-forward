<template>
    <div>
        <el-menu default-active="/index" mode="horizontal" router>
            <el-menu-item class="logo el-menu-item">
                <img src="../assets/image/logo.png" alt="">
            </el-menu-item>
            <el-menu-item index="/">
                <el-link icon="el-icon-s-home" :underline="false">首页</el-link>
            </el-menu-item>
            <el-menu-item>
                <div>
                    <el-autocomplete placeholder="搜你想搜的"
                                     size="medium"
                                     suffix-icon="el-icon-search"
                                     v-model="search"
                                     @select="handleSelect"
                                     @keydown.native="handleEnter"
                                     :fetch-suggestions="querySearchAsync"
                                     :trigger-on-focus="false">
                    </el-autocomplete>
                </div>
            </el-menu-item>
            <el-menu-item v-if="$store.state.user===''"
                          class="btn-login"
                          index="/sign_in">
                <el-button type="text">登录</el-button>
            </el-menu-item>
            <el-menu-item v-if="$store.state.user===''"
                          index="/sign_up">
                <el-button type="primary" plain round>注册</el-button>
            </el-menu-item>

            <el-menu-item v-if="$store.state.user!==''"
                          index="/uc/comment-notice"
                          class="btn-login">
                <el-badge :value="unreadCount"
                          :hidden="unreadCount === 0"
                          :max="99"
                          class="badge-notification">
                    <el-button type="text" class="btn-notification">
                        <i class="el-icon-message-solid notification"></i>
                    </el-button>
                </el-badge>
            </el-menu-item>

            <el-submenu v-if="$store.state.user!==''" index="/uc">
                <template v-slot:title>
                    <el-avatar :size="45" :src="$store.state.user.avatar"></el-avatar>
                </template>
                <el-menu-item index="/uc">
                    <el-dropdown-item>
                        <el-link :underline="false"
                                 icon="el-icon-user-solid"
                                 href="/uc/profile"
                                 v-on:click.native.prevent>我的主页</el-link>
                    </el-dropdown-item>
                </el-menu-item>
                <el-menu-item>
                    <el-dropdown-item>
                        <el-link :underline="false"
                                 href="/uc/comment-notice"
                                 icon="el-icon-s-comment">消息
                            <el-badge class="mark"
                                      type="primary"
                                      :max="99"
                                      :value="unreadCount"
                                      :hidden="unreadCount === 0"/>
                        </el-link>
                    </el-dropdown-item>
                </el-menu-item>
                <el-menu-item>
                    <el-dropdown-item>
                        <el-link :underline="false"
                                 href="/uc/favorite"
                                 icon="el-icon-star-on">收藏的文章</el-link>
                    </el-dropdown-item>
                </el-menu-item>
                <el-menu-item>
                    <el-dropdown-item>
                        <el-link :underline="false"
                                 href="/uc/login-history"
                                 icon="el-icon-time">登录历史</el-link>
                    </el-dropdown-item>
                </el-menu-item>
                <el-menu-item>
                    <el-dropdown-item>
                        <el-link :underline="false"
                                 icon="el-icon-error"
                                 @click="logout">退出</el-link>
                    </el-dropdown-item>
                </el-menu-item>
            </el-submenu>

            <el-menu-item index="/publish">
                <el-button type="success"
                           icon="el-icon-position"
                           plain round
                           class="btn-pub">写文章</el-button>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
    import axios from "axios";
    import {request} from "@/network/request";

    let sessionId = localStorage.getItem("xxl-sso-session-id");
    axios.defaults.headers.common['xxl-sso-session-id'] = sessionId;

    export default {
        name: 'NavBar',
        data() {
            return {
                search: '',
            };
        },
        methods: {
            querySearchAsync(queryString, cb) {
                axios.get('http://localhost/search/searchAtBar', {
                    params: {
                        search: queryString
                    }
                }).then(res => {
                    let result = res.data;
                    if (result.code === 200) {
                        let suggest = [];
                        let options = result.data.suggest.suggestion[0].options;
                        for (const option of options) {
                            suggest.push({"value":option.text});
                        }
                        cb(suggest);
                    }
                });
            },
            handleSelect(item) {
                this.$router.push({
                    path: '/search',
                    query: {
                        search: item.value
                    }
                });
            },
            handleEnter() {
                if (event.keyCode === 13) {
                    this.$router.push({
                        path: '/search',
                        query: {
                            search: this.search
                        }
                    });
                }
            },
            jump(str) {
                this.$router.push(str);
            },
            loginCheck() {
                request({
                    url: "/xxl-sso-server/loginCheck",
                    method: "GET"
                }).then(res => {
                    let result = res.data;
                    if (result.code === 200) {
                        let userData = JSON.parse(result.data);
                        this.$store.commit('setUser', userData);
                        if (this.$route.path === '/sign_in' || this.$route.path === '/sign_up') {
                            if (this.$store.getters.isLogin) {
                                this.$router.replace('/');
                            }
                        }
                    }
                });
                request({
                    url: "/notice/unreadNoticeCount",
                    method: "GET"
                }).then(res => {
                    let result = res.data;
                    if (result.code === 200) {
                        this.$store.commit("setUnreadNotice", result.data);
                    }
                });
                /*axios.get('http://localhost/xxl-sso-server/loginCheck').then(res => {
                    let result = res.data;
                    if (result.code === 200) {
                        let userData = JSON.parse(result.data);
                        this.$store.commit('setUser', userData);
                        if (this.$route.path === '/sign_in' || this.$route.path === '/sign_up') {
                            if (this.$store.getters.isLogin) {
                                this.$router.replace('/');
                            }
                        }
                    }
                });
                axios.get("http://localhost/notice/unreadNoticeCount").then(res => {
                    let result = res.data;
                    if (result.code === 200) {
                        this.$store.commit("setUnreadNotice", result.data);
                    }
                });*/
            },
            logout() {
                request({
                    url: "/xxl-sso-server/logout",
                    method: "GET"
                }).then(res => {
                    let result = res.data;
                    if (result.code === 200) {
                        this.$store.commit('clearUser');
                        this.$message({
                            message: '已成功退出登录',
                            type: "success",
                            center: true,
                            offset: 100
                        });
                        setTimeout(() => {
                            this.$forceUpdate();
                        }, 1000);
                    }
                }).catch(err => {
                    this.$message({
                        message: '退出登录失败，请重试',
                        type: "error",
                        center: true,
                        offset: 100
                    });
                })
                /*let sessionId = localStorage.getItem("xxl-sso-session-id");
                axios.get('http://localhost/xxl-sso-server/logout', {
                    headers: { 'xxl-sso-session-id': sessionId }
                }).then(res => {
                    let result = res.data;
                    if (result.code === 200) {
                        this.$store.commit('clearUser');
                        this.$message({
                            message: '已成功退出登录',
                            type: "success",
                            center: true,
                            offset: 100
                        });
                        setTimeout(() => {
                            this.$forceUpdate();
                        }, 1000);
                    }
                }).catch(error => {
                    this.$message({
                        message: '退出登录失败，请重试',
                        type: "error",
                        center: true,
                        offset: 100
                    });
                });*/
            }
        },
        watch: {
            "$route": "loginCheck"
        },
        computed: {
            unreadCount() {
                let unreadNotice = this.$store.getters.getUnreadNotice;
                let total = unreadNotice.unreadCommentCount + unreadNotice.unreadFollowCount;
                total += unreadNotice.unreadGoodCount;
                total += unreadNotice.unreadSystemCount;
                return total;
            }
        }
    }
</script>

<style scoped>
    @import "~element-ui/lib/theme-chalk/index.css";

    .el-menu-demo .el-menu-item {
        border-bottom: #ffffff !important;
    }

    .logo {
        margin-left: 20%;
    }

    .btn-login {
        margin-left: 25%;
    }

    .mark {
        margin-left: 100%;
    }

    .notification {
        font-size: 25px;
    }

    .badge-notification {
        margin-top: 15px;
    }

    .btn-notification {
        margin-bottom: 15px;padding-top: 0
    }
</style>

<style>
    .el-button .el-icon-position {
        color: #67C23A;
    }

    .el-button:hover .el-icon-position,
    .el-button:active .el-icon-position,
    .el-button:focus .el-icon-position {
        color: white;
    }

    .el-menu--horizontal>.el-menu-item {
        line-height: 56px;
        border-bottom: none;
    }

    .el-menu--horizontal>.el-menu-item.is-active {
        border-bottom: none !important;
    }

    .el-menu--horizontal>.el-submenu.is-active .el-submenu__title {
        border-bottom: none !important;
    }
</style>
