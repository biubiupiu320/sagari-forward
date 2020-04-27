<template>
    <div class="modify-email">
        <div class="modify-email-header">
            <h3>修改邮箱</h3>
        </div>
        <div class="modify-email-body">
            <el-form label-position="right"
                     label-width="100px"
                     size="small"
                     :model="modifyForm"
                     :rules="modifyRule"
                     ref="modifyForm"
                     class="modify-email-form">
                <el-form-item label="输入原邮箱：" prop="oldEMail">
                    <el-input placeholder="请输入原邮箱地址" v-model="modifyForm.oldEmail"></el-input>
                </el-form-item>
                <el-form-item label="输入新邮箱：" prop="newEMail">
                    <el-input placeholder="请输入新邮箱地址" v-model="modifyForm.newEmail"></el-input>
                </el-form-item>
            </el-form>
            <div style="text-align: center;">
                <el-button type="primary"
                           size="small"
                           :loading="isLoading"
                           @click="modifyEMail">确认</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import {request} from "@/network/request";

    export default {
        name: "ModifyEmail",
        data() {
            let validateEMail = (rule, value, callback) => {
                if (!new RegExp(/\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/).test(value)) {
                    return callback(new Error('请输入正确的邮箱格式'));
                }
                return callback();
            };
            return {
                modifyForm: {
                    newEmail: '',
                    oldEmail: ''
                },
                modifyRule: {
                    newEmail:[{ validator: validateEMail, trigger: 'blur' }],
                    oldEmail:[{ validator: validateEMail, trigger: 'blur' }]
                },
                isLoading: false
            }
        },
        methods: {
            modifyEMail() {
                this.isLoading = true;
                this.$refs['modifyForm'].validate((valid) => {
                    if (valid) {
                        request({
                            url: "/user/modifyEmail",
                            method: "GET",
                            params: {
                                newEmail: this.modifyForm.newEmail,
                                oldEmail: this.modifyForm.oldEmail
                            }
                        }).then(res => {
                            let result = res.data;
                            if (result.code === 200) {
                                this.$message({
                                    message: "修改成功，您可以使用新邮箱账号登录",
                                    type: "success",
                                    center: true,
                                    offset: 100
                                });
                            } else {
                                this.$message({
                                    message: result.msg,
                                    type: "success",
                                    center: true,
                                    offset: 100
                                });
                            }
                            this.isLoading = false;
                        }).catch(err => {
                            this.$message({
                                message: "服务器打了个盹，请再试一次吧",
                                type: "error",
                                center: true,
                                offset: 100
                            });
                            this.isLoading = false;
                        });
                    } else {
                        this.$message({
                            type: 'error',
                            message: '请按照要求正确填写信息！',
                            offset: 100,
                            center: true
                        });
                        this.isLoading = false;
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .modify-email {
        min-height: 600px;
    }

    .modify-email h3 {
        font-size: 20px;
        color: #3d3d3d;
        height: 90px;
        line-height: 90px;
        border-bottom: 1px solid #e0e0e0;
        margin-top: 0;
        margin-bottom: 0;
    }

    .modify-email-body {
        padding: 28px 0 30px;
    }

    .modify-email-form {
        width: 60%;
        margin: 0 auto;
    }
</style>
