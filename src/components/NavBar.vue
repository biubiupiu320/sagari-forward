<template>
    <div>
        <el-menu default-active="/index"mode="horizontal" router>
            <el-menu-item class="logo el-menu-item">
                <img src="../assets/image/logo.png" alt="">
            </el-menu-item>
            <el-menu-item index="/index">
                <el-link icon="el-icon-s-home" :underline="false">首页</el-link>
            </el-menu-item>
            <el-menu-item>
                <div>
                    <el-autocomplete
                        placeholder="搜你想搜的"
                        suffix-icon="el-icon-search"
                        v-model="state"
                        :fetch-suggestions="querySearchAsync"
                        :trigger-on-focus="false">
                    </el-autocomplete>
                </div>
            </el-menu-item>

            <el-menu-item v-if="!isLogin" class="btn-login" index="/sign_in">
                <el-button type="text">登录</el-button>
            </el-menu-item>
            <el-menu-item v-if="!isLogin" index="/sign_up">
                <el-button type="primary" plain round>注册</el-button>
            </el-menu-item>

            <el-menu-item v-if="isLogin" class="btn-login">
                <el-badge :value="12" class="badge-notification">
                    <el-button type="text" class="btn-notification">
                        <i class="el-icon-message-solid notification"></i>
                    </el-button>
                </el-badge>
            </el-menu-item>

            <el-submenu v-if="isLogin">
                <template slot="title">
                    <el-avatar
                        :size="45"
                        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                </template>
                <el-menu-item>
                    <el-dropdown-item>
                        <el-link :underline="false" icon="el-icon-user-solid" href="uc">我的主页</el-link>
                    </el-dropdown-item>
                </el-menu-item>
                <el-menu-item>
                    <el-dropdown-item>
                        <el-link :underline="false" icon="el-icon-s-comment">
                            消息
                            <el-badge class="mark" type="primary" :value="12"/>
                        </el-link>
                    </el-dropdown-item>
                </el-menu-item>
                <el-menu-item>
                    <el-dropdown-item>
                        <el-link :underline="false" icon="el-icon-star-on">收藏的文章</el-link>
                    </el-dropdown-item>
                </el-menu-item>
                <el-menu-item>
                    <el-dropdown-item>
                        <el-link :underline="false" icon="el-icon-s-tools">设置</el-link>
                    </el-dropdown-item>
                </el-menu-item>
                <el-menu-item>
                    <el-dropdown-item>
                        <el-link :underline="false" icon="el-icon-error">退出</el-link>
                    </el-dropdown-item>
                </el-menu-item>
            </el-submenu>

            <el-menu-item index="/publish">
                <el-button type="success" icon="el-icon-position" plain round
                           class="btn-pub">写文章</el-button>
            </el-menu-item>

            <el-menu-item>
                <el-button type="success" @click="isLogin = !isLogin">切换</el-button>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
    export default {
        name: 'NavBar',
        data() {
            return {
                state: '',
                restaurants: [
                    {"value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号"},
                    {"value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号"},
                    {"value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113"}
                ],
                isLogin: false
            };
        },
        methods: {
            querySearchAsync(queryString, cb) {
                let restaurants = this.restaurants;
                let results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

                clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                    cb(results);
                }, 3000 * Math.random());
            },
            createStateFilter(queryString) {
                return (state) => {
                    return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
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
</style>
