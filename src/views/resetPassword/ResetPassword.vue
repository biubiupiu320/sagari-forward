<template>
    <div class="reset-password">
        <div class="reset-password-title">重置密码</div>
        <el-steps :active="step" :simple="true">
            <el-step title="输入账号" :icon="step > 0 ? 'el-icon-check' : ''"></el-step>
            <el-step title="重置密码" :icon="step > 1 ? 'el-icon-check' : ''"></el-step>
            <el-step title="重置成功" :icon="step > 1 ? 'el-icon-check' : ''"></el-step>
        </el-steps>
        <div class="reset-password-1" v-if="judgeStep(0)">
            <el-form>
                <el-form-item>
                    <el-input placeholder="请输入用户名/邮箱" v-model="userId"></el-input>
                </el-form-item>
                <el-form-item style="text-align: center">
                    <el-button type="primary" @click="nextStep(1)">下一步</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="reset-password-2" v-else-if="judgeStep(1)">
            <el-form label-position="right"
                     label-width="100px"
                     :model="formData"
                     :rules="formRule"
                     ref="formData">
                <el-form-item label="新密码：" prop="password">
                    <el-input placeholder="请输入新密码"
                              show-password
                              v-model="formData.password"></el-input>
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
                <el-form-item label="确认密码：" prop="passwordCheck">
                    <el-input placeholder="请输入确认密码"
                              show-password
                              v-model="formData.passwordCheck"></el-input>
                </el-form-item>
                <el-form-item label="邮箱：">
                    <div>442982442@qq.com</div>
                </el-form-item>
                <el-form-item label="验证码：" prop="vCode">
                    <el-input placeholder="请输入验证码" v-model="formData.vCode">
                        <template v-slot:append>
                            <el-button @click="getVCode">获取验证码{{getContent}}</el-button>
                        </template>
                    </el-input>
                </el-form-item>
            </el-form>
            <div style="text-align: center;">
                <el-button type="primary" @click="nextStep(2)">下一步</el-button>
            </div>
        </div>
        <div class="reset-password-3" v-else-if="judgeStep(3)">
            <i class="el-icon-circle-check"></i>
            <div>(￣▽￣)/&nbsp;密码重置成功&nbsp;\(￣▽￣)</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ResetPassword",
        created() {
            this.userId = this.$route.params.userId;
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
                if (value !== this.formData.password) {
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
                step: 0,
                userId: undefined,
                formData: {
                    password: '',
                    passwordCheck: '',
                    vCode: ''
                },
                formRule: {
                    password: [{ validator: validatePassword, trigger: 'change' }],
                    passwordCheck:[{ validator: validatePasswordCheck, trigger: 'blur' }],
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
            getVCode() {
                this.vCodeTime = 60;
                let timer = setInterval(() => {
                    this.vCodeTime--;
                    if (this.vCodeTime === 0) {
                        clearInterval(timer);
                    }
                }, 1000);
                this.$message({
                    type: 'success',
                    message: '验证码已成功发送至您的邮箱，有效期15分钟，请注意查收！',
                    offset: 100,
                    center: true
                });
            },
            nextStep(step) {
                if (step === 1) {
                    if (this.isBlank()) {
                        this.$message({
                            type: 'error',
                            message: '请输入用户名或邮箱',
                            offset: 100,
                            center: true
                        });
                    } else {
                        this.step = step;
                    }
                } else if (step === 2) {
                    this.$refs['formData'].validate((valid) => {
                        if (valid) {
                            this.step = 3;
                            this.$refs['formData'].resetFields();
                            this.isLength = false;
                            this.isContainLetter = false;
                            this.isContainSymbol = false;
                            this.isContainNumber = false;
                        } else {
                            this.$message({
                                type: 'error',
                                message: '请按照要求正确填写信息！',
                                offset: 100,
                                center: true
                            });
                        }
                    });
                }
            },
            judgeStep(step) {
                if (this.step === step && this.isBlank()) {
                    return true;
                } else if (this.step === step && !this.isBlank()) {
                    return true;
                } else if (this.step === step) {
                    return true;
                }
                return false;
            },
            isBlank() {
                if (this.userId === undefined) {
                    return true;
                } else if (this.userId.length === 0) {
                    return true;
                } else {
                    this.userId = this.userId.replace(/\s/g, '');
                    if (this.userId.length === 0) {
                        return true;
                    }
                }
                return false;
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
    .reset-password {
        padding: 20px 30px;
        width: 50%;
        min-height: 500px;
        margin: 50px auto;
        background-color: #ffffff;
        border-radius: 5px;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    }

    .reset-password-title {
        font-size: 18px;
        color: #3d3d3d;
        font-weight: 700;
        margin-bottom: 15px;
    }

    .reset-password-1, .reset-password-2, .reset-password-3 {
        width: 50%;
        margin: 35px auto 0 auto;
    }

    .reset-password-3 {
        text-align: center;
    }

    .reset-password-3 i {
        font-size: 56px;
        color: #409eff;
    }

    .reset-password-3 div {
        font-size: 18px;
        margin-top: 15px;
        color: #3d3d3d;
        text-align: center;
    }
</style>

<style>
    body {
        background-color: #f5f6f7;
    }
</style>
