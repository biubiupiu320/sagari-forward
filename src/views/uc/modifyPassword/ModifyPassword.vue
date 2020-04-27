<template>
    <div class="modify-password">
        <div class="modify-password-header">
            <h3>修改密码</h3>
        </div>
        <div class="modify-password-body">
            <el-form label-width="100px"
                     label-position="right"
                     size="small"
                     :model="modifyForm"
                     :rules="modifyRule"
                     ref="modifyForm"
                     class="modify-password-form">
                <el-form-item label="输入新密码：" prop="password">
                    <el-input placeholder="输入新密码"
                              show-password
                              v-model="modifyForm.password"></el-input>
                    <el-checkbox label="6-16位"
                                 v-on:click.native.prevent
                                 v-model="isLength"
                                 :isTab="false"></el-checkbox>
                    <el-checkbox label="必须包含英文字母，区分大小写"
                                 v-on:click.native.prevent
                                 v-model="isContainLetter"
                                 :isTab="false"></el-checkbox>
                    <el-checkbox label="必须包含特殊符号(. _ ~ ! @ # $ ^ & * %)"
                                 v-on:click.native.prevent
                                 v-model="isContainSymbol"
                                 :isTab="false"></el-checkbox>
                    <el-checkbox label="必须包含数字"
                                 v-on:click.native.prevent
                                 v-model="isContainNumber"
                                 :isTab="false"></el-checkbox>
                </el-form-item>
                <el-form-item label="确认新密码：" prop="passwordCheck">
                    <el-input placeholder="确认新密码"
                              show-password
                              v-model="modifyForm.passwordCheck"></el-input>
                </el-form-item>
                <el-form-item label="输入验证码：" prop="vCode">
                    <el-input placeholder="请输入验证码" v-model="modifyForm.vCode">
                        <template v-slot:append>
                            <el-button :disabled="vCodeTime !== 0"
                                       @click="getVCode">获取验证码{{getContent}}</el-button>
                        </template>
                    </el-input>
                </el-form-item>
            </el-form>
            <div style="text-align: center;">
                <el-button type="primary"
                           size="small"
                           :loading="isLoading"
                           @click="modifyPassword">确认</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios";

    let sessionId = localStorage.getItem("xxl-sso-session-id");
    axios.defaults.headers.common['xxl-sso-session-id'] = sessionId;

    export default {
        name: "ModifyPassword",
        created() {
            axios.get('http://localhost/user/getPhone').then(res => {
                let result = res.data;
                if (result.code === 200) {
                    this.phone = result.data.phone;
                }
            }).catch(err => {
                this.$message({
                    message: '服务器打了个盹，请再试一次吧',
                    type: 'error',
                    center: true,
                    offset: 100
                });
            })
        },
        data() {
            let validatePassword = (rule, value, callback) => {
                this.isContainLetter = new RegExp(/[a-zA-Z]+/).test(value);
                this.isContainNumber = new RegExp(/[0-9]/).test(value);
                this.isContainSymbol = new RegExp(/[!@#$%&\^\.~_*]/).test(value);
                this.isLength = !(value.length < 6 || value.length > 16);
                return callback();
            };
            let validatePasswordCheck = (rule, value, callback) => {
                if (value !== this.modifyForm.password) {
                    return callback(new Error('两次输入的密码不一致'));
                }
                return callback();
            };
            let validateVCode = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('验证码不能为空'));
                }
                return callback();
            };
            return {
                modifyForm: {
                    password: '',
                    passwordCheck: '',
                    vCode: ''
                },
                modifyRule: {
                    password: [{ validator: validatePassword, trigger: 'change' }],
                    passwordCheck:[{ validator: validatePasswordCheck, trigger: 'blur' }],
                    vCode: [{ validator: validateVCode, trigger: 'blur' }]
                },
                isLength: false,
                isContainLetter: false,
                isContainSymbol: false,
                isContainNumber: false,
                vCodeTime: 0,
                isLoading: false,
                phone: ''
            }
        },
        methods: {
            getVCode() {
                axios.get('http://localhost/vcode/getCode', {
                    params: {
                        phone: this.phone,
                        type: 2,
                        random: Math.random()
                    }
                }).then(res => {
                    let result = res.data;
                    if (result.code === 200) {
                        this.vCodeTime = 60;
                        let timer = setInterval(() => {
                            this.vCodeTime--;
                            if (this.vCodeTime === 0) {
                                clearInterval(timer);
                            }
                        }, 1000);
                        this.$message({
                            type: 'success',
                            message: '验证码已成功发送至您的手机，有效期30分钟，请注意查收！',
                            offset: 100,
                            center: true
                        });
                    } else {
                        this.$message({
                            type: 'error',
                            message: result.msg,
                            offset: 100,
                            center: true
                        });
                    }
                }).catch(err => {
                    this.$message({
                        type: 'error',
                        message: '服务器打了个盹，请再试一次吧',
                        offset: 100,
                        center: true
                    });
                });
            },
            modifyPassword() {
                this.isLoading = true;
                this.$refs['modifyForm'].validate((valid) => {
                    if (valid) {
                        axios.post('http://localhost/user/modifyPassword', {
                            password: this.modifyForm.password,
                            verifyCode: this.modifyForm.vCode
                        }).then(res => {
                            let result = res.data;
                            if (result.code === 200) {
                                this.$message({
                                    message: result.msg,
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
                            this.isLoading = false;
                        }).catch(err => {
                            this.$message({
                                type: 'error',
                                message: '服务器打了个盹，请再试一次吧',
                                offset: 100,
                                center: true
                            });
                            this.isLoading = false;
                        });
                    }
                });
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
    .modify-password {
         min-height: 600px;
     }

    .modify-password-header h3 {
        font-size: 20px;
        color: #3d3d3d;
        height: 90px;
        line-height: 90px;
        border-bottom: 1px solid #e0e0e0;
        margin-top: 0;
        margin-bottom: 0;
    }

    .modify-password-body {
        padding: 28px 0 30px;
    }

    .modify-password-form {
        width: 60%;
        margin: 0 auto;
    }
</style>
