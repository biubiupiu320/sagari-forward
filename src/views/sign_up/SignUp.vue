<template>
    <div class="sign-up">
        <div class="title">
            <el-link type="warning"
                     :underline="false"
                     href="/sign_in">登录</el-link>
            <span class="dot">·</span>
            <el-link type="warning"
                     :underline="false"
                     class="sign-active"
                     href="/sign_up">注册</el-link>
        </div>
        <div class="sign">
            <el-form :model="formData" :rules="formRule" ref="formData" label-position="right" label-width="100px">
                <el-form-item prop="avatar" label="用户头像" id="avatar">
                    <el-upload
                        class="avatar-uploader"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                        <img v-if="formData.avatar" :src="formData.avatar" alt="头像" class="avatar">
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
                                 v-on:click.native.prevent
                                 v-model="isLength"></el-checkbox>
                    <el-checkbox label="必须包含英文字母，区分大小写"
                                 v-on:click.native.prevent
                                 v-model="isContainLetter"></el-checkbox>
                    <el-checkbox label="必须包含特殊符号(. _ ~ ! @ # $ ^ & * %)"
                                 v-on:click.native.prevent
                                 v-model="isContainSymbol"></el-checkbox>
                    <el-checkbox label="必须包含数字"
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
                    <el-input placeholder="请输入邮箱" v-model="formData.email"></el-input>
                </el-form-item>
                <el-form-item prop="vCode" label="验证码">
                    <el-input placeholder="请输入验证码" v-model="formData.vCode">
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
                    <a>
                        <img src="../../assets/image/github.svg" alt="GitHub登录">
                    </a>
                </li>
                <li>
                    <a>
                        <img src="../../assets/image/weibo.svg" alt="新浪微博登录">
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SignUp",
        data() {
            let validateUsername = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('用户名不能为空'));
                } else if (value.length < 2 || value.length > 10) {
                    return callback(new Error('用户名只能为2-10个字'));
                }
            };
            let validatePassword = (rule, value, callback) => {
                this.isContainLetter = new RegExp(/[a-zA-Z]+/).test(value);
                this.isContainNumber = new RegExp(/[0-9]/).test(value);
                this.isContainSymbol = new RegExp(/[!@#$%&\^\.~_*]/).test(value);
                this.isLength = !(value.length < 6 || value.length > 16);
            };
            let validatePasswordCheck = (rule, value, callback) => {
                if (value !== this.formData.password) {
                    return callback(new Error('两次输入的密码不一致'));
                }
            };
            let validateEmail = (rule, value, callback) => {
                if (!new RegExp(/\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/).test(value)) {
                    return callback(new Error('请输入正确的邮箱地址'));
                }
            };
            let validateVCode = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('验证码不能为空'));
                }
            };
            return {
                formData: {
                    avatar: '',
                    username: '',
                    password: '',
                    passwordCheck: '',
                    email: '',
                    vCode: ''
                },
                formRule: {
                    username: [{ validator: validateUsername, trigger: 'change' }],
                    password: [{ validator: validatePassword, trigger: 'change' }],
                    passwordCheck:[{ validator: validatePasswordCheck, trigger: 'blur' }],
                    email: [{ validator: validateEmail, trigger: 'blur' }],
                    vCode: [{ validator: validateVCode, trigger: 'blur' }]
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

                })
            },
            handleAvatarSuccess(res, file) {
                this.formData.avatar = URL.createObjectURL(file.raw);
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
                this.vCodeTime = 60;
                let timer = setInterval(() => {
                    this.vCodeTime--;
                    if (this.vCodeTime === 0) {
                        clearInterval(timer);
                    }
                }, 1000);
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
