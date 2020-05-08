<template>
    <div class="sign-up">
        <div class="title">
            <span @click="jump('/sign_in')">
                <el-link type="warning"
                         :underline="false"
                         href="/sign_in"
                         v-on:click.native.prevent>登录</el-link>
            </span>
            <span class="dot">·</span>
            <span @click="jump('/sign_up')">
                <el-link type="warning"
                         :underline="false"
                         href="/sign_up"
                         class="sign-active"
                         v-on:click.native.prevent>注册</el-link>
            </span>
        </div>
        <div class="sign">
            <el-form :model="formData" :rules="formRule" ref="formData" label-position="right" label-width="100px">
                <el-form-item prop="avatar" label="用户头像" id="avatar">
                    <el-upload
                        class="avatar-uploader"
                        action="http://data.sagari.cn/file/upload"
                        :data="{type:1}"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                        <img v-if="formData.avatar !== ''" :src="formData.avatar" alt="头像" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item prop="username" label="用户名">
                    <el-input prefix-icon="el-icon-user"
                              placeholder="用户名"
                              v-model="formData.username"
                              show-word-limit
                              maxlength="10"
                              minlength="2"></el-input>
                </el-form-item>
                <el-form-item prop="password" label="密码">
                    <el-input
                        type="password"
                        prefix-icon="el-icon-lock"
                        placeholder="密码"
                        v-model="formData.password"
                        show-password></el-input>
                    <el-checkbox label="6-16位"
                                 :is-tab="false"
                                 v-on:click.native.prevent
                                 v-model="isLength"></el-checkbox>
                    <el-checkbox label="必须包含英文字母，区分大小写"
                                 :is-tab="false"
                                 v-on:click.native.prevent
                                 v-model="isContainLetter"></el-checkbox>
                    <el-checkbox label="必须包含特殊符号(. _ ~ ! @ # $ ^ & * %)"
                                 :is-tab="false"
                                 v-on:click.native.prevent
                                 v-model="isContainSymbol"></el-checkbox>
                    <el-checkbox label="必须包含数字"
                                 :is-tab="false"
                                 v-on:click.native.prevent
                                 v-model="isContainNumber"></el-checkbox>
                </el-form-item>
                <el-form-item prop="passwordCheck" label="再次输入密码">
                    <el-input
                        type="password"
                        prefix-icon="el-icon-lock"
                        placeholder="再次输入密码"
                        v-model="formData.passwordCheck"></el-input>
                </el-form-item>
                <el-form-item prop="email" label="邮箱">
                    <el-input placeholder="请输入邮箱"
                              prefix-icon="el-icon-message"
                              v-model="formData.email"></el-input>
                </el-form-item>
                <el-form-item prop="phone" label="手机号">
                    <el-input placeholder="请输入手机号码"
                              prefix-icon="el-icon-mobile-phone"
                              v-model="formData.phone"></el-input>
                </el-form-item>
                <el-form-item prop="vCode" label="验证码">
                    <el-input placeholder="请输入验证码"
                              prefix-icon="el-icon-key"
                              v-model="formData.vCode">
                        <template v-slot:append>
                            <el-button type="primary"
                                       :disabled="vCodeTime !== 0"
                                       @click="getVCode">获取验证码{{getContent}}</el-button>
                        </template>
                    </el-input>
                </el-form-item>
                <div class="sign-up-btn">
                    <el-button type="success"
                               round
                               @click="signUp"
                               style="width: 70%">注册</el-button>
                </div>
            </el-form>
        </div>
        <div class="more-sign">
            <el-divider>免注册登录</el-divider>
            <ul>
                <li>
                    <a href="https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=101864484&redirect_uri=http://sagari.cn/qq_callback&state=1">
                        <img src="../../assets/image/qq.svg" alt="QQ登录">
                    </a>
                </li>
                <!--<li>
                    <a>
                        <img src="../../assets/image/github.svg" alt="GitHub登录">
                    </a>
                </li>
                <li>
                    <a>
                        <img src="../../assets/image/weibo.svg" alt="新浪微博登录">
                    </a>
                </li>-->
            </ul>
        </div>
    </div>
</template>

<script>
    import {request} from "@/network/request";

    export default {
        name: "SignUp",
        data() {
            let validateUsername = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('用户名不能为空'));
                } else if (value.length < 2 || value.length > 10) {
                    return callback(new Error('用户名只能为2-10个字'));
                }
                request({
                    url: "/user/isExistByUsername",
                    method: "GET",
                    params: {
                        username: value
                    }
                }).then(res => {
                    console.log(res)
                    if (res.data) {
                        return callback(new Error('该用户名已被注册'));
                    } else {
                        callback();
                    }
                }).catch(err => {
                    callback();
                });
            };
            let validatePassword = (rule, value, callback) => {
                this.isContainLetter = new RegExp(/[a-zA-Z]+/).test(value);
                this.isContainNumber = new RegExp(/[0-9]/).test(value);
                this.isContainSymbol = new RegExp(/[!@#$%&\^\.~_*]/).test(value);
                this.isLength = !(value.length < 6 || value.length > 16);
                callback();
            };
            let validatePasswordCheck = (rule, value, callback) => {
                if (value !== this.formData.password) {
                    return callback(new Error('两次输入的密码不一致'));
                }
                callback();
            };
            let validateEmail = (rule, value, callback) => {
                if (!new RegExp(/\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/).test(value)) {
                    return callback(new Error('请输入正确的邮箱地址'));
                }
                request({
                    url: "/user/isExistByEmail",
                    method: "GET",
                    params: {
                        email: value
                    }
                }).then(res => {
                    if (res.data) {
                        return callback(new Error('该邮箱已被注册'));
                    } else {
                        callback();
                    }
                }).catch(err => {
                    callback();
                });
            };
            let validatePhone = (rule, value, callback) => {
                if (!new RegExp(/0?(13|14|15|18|17|19)[0-9]{9}/).test(value)) {
                    return callback(new Error('请输入正确的手机号码'));
                }
                request({
                    url: "/user/isExistByPhone",
                    method: "GET",
                    params: {
                        phone: value
                    }
                }).then(res => {
                    if (res.data) {
                        return callback(new Error('该手机号码已被注册'));
                    } else {
                        callback();
                    }
                }).catch(err => {
                    callback();
                });
            };
            let validateVCode = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('验证码不能为空'));
                }
                callback();
            };
            return {
                formData: {
                    avatar: '',
                    username: '',
                    password: '',
                    passwordCheck: '',
                    email: '',
                    phone: '',
                    vCode: ''
                },
                formRule: {
                    username: [{ validator: validateUsername, trigger: 'blur' }],
                    password: [{ validator: validatePassword, trigger: 'change' }],
                    passwordCheck:[{ validator: validatePasswordCheck, trigger: 'blur' }],
                    email: [{ validator: validateEmail, trigger: 'blur' }],
                    vCode: [{ validator: validateVCode, trigger: 'blur' }],
                    phone: [{ validator: validatePhone, trigger: 'blur' }]
                },
                isLength: false,
                isContainLetter: false,
                isContainSymbol: false,
                isContainNumber: false,
                vCodeTime: 0
            }
        },
        methods: {
            signUp() {
                this.$refs['formData'].validate((valid) => {
                    if (valid) {
                        request({
                            url: "/user/sign-up",
                            method: "POST",
                            data: {
                                username: this.formData.username,
                                password: this.formData.password,
                                email: this.formData.email,
                                phone: this.formData.phone,
                                verifyCode: this.formData.vCode,
                                avatar: this.formData.avatar
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
                                setTimeout(() =>{
                                    this.jump('/sign_in');
                                }, 1000);
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
                                message: '用户注册失败',
                                type: 'error',
                                center: true,
                                offset: 100
                            });
                        });
                    }
                });
            },
            handleAvatarSuccess(res, file) {
                if (res.code === 200) {
                    this.formData.avatar = res.data.url;
                } else {
                    this.$message({
                        message: '上传头像失败，请重试',
                        type: 'error',
                        center: true,
                        offset: 100
                    });
                }
            },
            beforeAvatarUpload(file) {
                const isImage = file.type === 'image/jpeg' ||
                                file.type === 'image/png' ||
                                file.type === 'image/bmp';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isImage) {
                    this.$message({
                        message: '上传头像图片只能是 JPG、PNG或PNG 格式!',
                        type: "error",
                        center: true,
                        offset: 100
                    });
                }
                if (!isLt2M) {
                    this.$message({
                        message: '上传头像图片大小不能超过 2MB!',
                        type: "error",
                        center: true,
                        offset: 100
                    });
                }
                return isImage && isLt2M;
            },
            getVCode() {
                if (!new RegExp(/0?(13|14|15|18|17)[0-9]{9}/).test(this.formData.phone)) {
                    this.$message({
                        message: '请输入正确的手机号码',
                        type: 'error',
                        center: true,
                        offset: 100
                    });
                    return;
                }
                if (this.vCodeTime !== 0) {
                    this.$message({
                        message: '一分钟内不能重复获取验证码',
                        type: 'error',
                        center: true,
                        offset: 100
                    });
                    return;
                }
                request({
                    url: "/vcode/getCode",
                    method: "GET",
                    params: {
                        phone: this.formData.phone,
                        type: 1,
                        random: Math.random()
                    }
                }).then(res => {
                    let result = res.data;
                    if (result.code === 200) {
                        let data = result.data;
                        this.$message({
                            message: '验证码已发送至您的手机，请注意查收。',
                            type: "success",
                            center: true,
                            offset: 100
                        });
                        this.vCodeTime = 60;
                        let timer = setInterval(() => {
                            this.vCodeTime--;
                            if (this.vCodeTime === 0) {
                                clearInterval(timer);
                                this.vCodeTime = 0;
                            }
                        }, 1000);
                    } else {
                        this.$message({
                            message: result.msg,
                            type: "error",
                            center: true,
                            offset: 100
                        });
                    }
                }).catch(err => {
                    this.$message({
                        message: '获取验证码失败',
                        type: "error",
                        center: true,
                        offset: 100
                    });
                });
            },
            jump(str) {
                this.$router.push(str);
            }
        },
        computed: {
            getContent() {
                if (this.vCodeTime !== 0) {
                    return '(' + this.vCodeTime + 's)';
                } else {
                    return '';
                }
            }
        }
    }
</script>

<style scoped>
    .sign-up {
        width: 30%;
        background-color: #FFFFFF;
        margin: 2% auto;
        padding: 30px 50px 30px;
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
        margin-top: 10px;
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

    .sign-up-btn {
        width: 100%;
        margin-top: 10px;
        text-align: center;
    }
</style>

<style>
    body {
        background-color: #f5f6f7;
    }

    .sign .el-input-group__append:hover {
        background-color: #409EFF !important;
        color: #FFFFFF !important;
    }

    .sign .el-form .el-form-item .el-form-item__content {
        line-height: 20px;
    }

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 100px;
        height: 100px;
        line-height: 100px;
        text-align: center;
    }
    .avatar {
        width: 100px;
        height: 100px;
        display: block;
    }
</style>
