<template>
    <div class="sign-in">
        <div class="title">
            <span @click="jump('/sign_in')">
                <el-link type="warning"
                         :underline="false"
                         class="sign-active"
                         href="/sign_in"
                         v-on:click.native.prevent>登录</el-link>
            </span>
            <span class="dot">·</span>
            <span @click="jump('/sign_up')">
                <el-link type="warning"
                         :underline="false"
                         href="/sign_up"
                         v-on:click.native.prevent>注册</el-link>
            </span>
        </div>
        <div class="sign">
            <el-form :model="formData" :rules="formRule" ref="formData">
                <el-form-item prop="account">
                    <el-input prefix-icon="el-icon-user"
                              placeholder="用户名/邮箱"
                              v-model="formData.account"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password"
                              prefix-icon="el-icon-lock"
                              placeholder="密码"
                              v-model="formData.password"
                              show-password></el-input>
                </el-form-item>
                <el-form-item prop="isRememberMe">
                    <el-switch v-model="formData.isRem" active-text="10天内免登录"></el-switch>
                    <el-link :underline="false" href="/reset-password/1" style="float: right">忘记密码？</el-link>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary"
                               round
                               @click="signIn"
                               style="width: 100%">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="more-sign">
            <el-divider>第三方用户登录</el-divider>
            <ul>
                <li>
                    <a href="https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=101864484&redirect_uri=http://sagari.cn/qq_callback&state=1">
                        <img src="../../assets/image/qq.svg" alt="QQ登录">
                    </a>
                </li>
                <li>
                    <a><img src="../../assets/image/github.svg" alt="GitHub登录"></a>
                </li>
                <li>
                    <a><img src="../../assets/image/weibo.svg" alt="新浪微博登录"></a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import {request} from "@/network/request";

    export default {
        name: "SignIn",
        data() {
            return {
                formData: {
                    account: '',
                    password: '',
                    isRem: false
                },
                formRule: {
                    account: [{
                            require: true,
                            message: '用户名不能为空'
                    }],
                    password: [{
                        require: true,
                        message: '密码不能为空'
                    }],
                }
            }
        },
        methods: {
            signIn() {
                this.$refs['formData'].validate((valid) => {
                    if (valid) {
                        request({
                            url: "/xxl-sso-server/login",
                            method: "GET",
                            params: {
                                account: this.formData.account,
                                password: this.formData.password,
                                isRem: this.formData.isRem
                            }
                        }).then(res => {
                            let data = res.data;
                            if (data.code === 200) {
                                localStorage.setItem("xxl-sso-session-id", data.data);
                                request({
                                    url: "/xxl-sso-server/loginCheck",
                                    method: "GET",
                                    headers: {"xxl-sso-session-id": data.data}
                                }).then(res => {
                                    let result = res.data;
                                    if (result.code === 200) {
                                        let userData = JSON.parse(result.data);
                                        this.$store.commit("setUser", userData);
                                        this.$message({
                                            message: '用户 ' + userData.username + ' 登录成功，欢迎回来！',
                                            type: "success",
                                            center: true,
                                            offset: 100
                                        });
                                        setTimeout(() => {
                                            this.jump('/');
                                        }, 1000);
                                    } else {
                                        this.$message({
                                            message: '用户未登录',
                                            type: "error",
                                            center: true,
                                            offset: 100
                                        });
                                    }
                                }).catch(err => {
                                    this.$message({
                                        message: '用户未登录',
                                        type: "error",
                                        center: true,
                                        offset: 100
                                    });
                                });
                            } else {
                                this.$refs['formData'].resetFields();
                                this.$message({
                                    message: '您输入的用户名或密码不正确',
                                    type: "error",
                                    center: true,
                                    offset: 100
                                });
                            }
                        }).catch(err => {
                            let data = err.response.data;
                            if (data.code === 403) {
                                this.$message({
                                    message: data.msg,
                                    type: "error",
                                    center: true,
                                    offset: 100
                                })
                            } else {
                                this.$message({
                                    message: '服务器打了个盹，再试一次吧',
                                    type: "error",
                                    center: true,
                                    offset: 100
                                });
                            }
                        });
                    }
                })
            },
            jump(str) {
                this.$router.push(str);
            }
        }
    }
</script>

<style scoped>
    .sign-in {
        width: 18%;
        background-color: #FFFFFF;
        margin: 5% auto;
        padding: 50px 50px 30px;
        border-radius: 4px;
        box-shadow: 0 0 8px rgba(0,0,0,.1);
        vertical-align: middle;
    }

    .title {
        padding: 10px;
        line-height: 1.1;
        text-align: center;
    }

    .title .el-link {
        font-size: 18px;
        font-weight: 400;
        line-height: 1.1;
        padding: 10px;
        text-align: center;
        color: #969696;
        border-bottom: 2px solid rgba(255, 255, 255, 0);
    }

    .title .el-link:hover {
        border-bottom: 2px solid #ea6f5a;
    }

    .sign-active {
        font-weight: 700 !important;
        color: #ea6f5a !important;
        border-bottom: 2px solid #ea6f5a !important;
    }

    .dot {
        font-size: 14px;
        padding: 10px;
        font-weight: 700;
        box-sizing: border-box;
    }

    .sign {
        margin-top: 50px;
        margin-bottom: 40px;
    }

    .more-sign ul {
        list-style: none;
        margin-bottom: 10px;
        padding-left: 0;
        text-align: center;
    }

    .more-sign ul li {
        display: inline-block;
        margin: 0 5px;
        line-height: 20px;
        text-align: center;
        -ms-text-size-adjust: 100%;
        -moz-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
    }

    .more-sign ul li img {
        width: 36px;
        height: 36px;
    }
</style>

<style>
    body {
        background-color: #f5f6f7;
    }
</style>
