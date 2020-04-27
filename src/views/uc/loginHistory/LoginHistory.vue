<template>
    <div class="login-history" v-loading="isLoading">
        <div class="login-history-header">
            <h3>登录历史</h3>
        </div>
        <div class="login-history-body">
            <el-timeline>
                <el-timeline-item placement="top"
                                  v-for="item in history"
                                  :timestamp="item.time | letter">
                    <el-card shadow="hover">
                        <template v-slot:default>
                            <p><span>登录方式：</span><b>{{item.type}}</b></p>
                            <p><span>浏览器：</span><b>{{item.browser}}</b></p>
                            <p><span>登录系统：</span><b>{{item.system}}</b></p>
                            <p><span>登录设备：</span><b>{{item.device}}</b></p>
                            <p><span>登录IP：</span><b>{{item.ip}}</b></p>
                        </template>
                    </el-card>
                </el-timeline-item>
            </el-timeline>
        </div>
        <div class="pagination">
            <el-pagination
                layout="prev, pager, next"
                background
                :hide-on-single-page="true"
                :total="pagination.total"
                @current-change="handlePageChange">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import axios from "axios";

    let sessionId = localStorage.getItem("xxl-sso-session-id");
    axios.defaults.headers.common['xxl-sso-session-id'] = sessionId;

    export default {
        name: "LoginHistory",
        created() {
            this.getHistory();
        },
        data() {
            return {
                history: [],
                pagination: {},
                isLoading: false
            }
        },
        methods: {
            getHistory(page = 1, size = 10) {
                this.isLoading = true;
                axios.get("http://localhost/user/getSignInHistory", {
                    params: {
                        page,
                        size
                    }
                }).then(res => {
                    let result = res.data;
                    if (result.code === 200) {
                        this.history = result.data.list;
                        delete result.data.list;
                        this.pagination = result.data;
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
                        message: "服务器打了个盹，请刷新重试",
                        type: "error",
                        center: true,
                        offset: 100
                    });
                    this.isLoading = false;
                });
            },
            handlePageChange(page) {
                this.getHistory(page);
            }
        }
    }
</script>

<style scoped>
    .login-history {
        min-height: 600px;
    }

    .login-history-header h3 {
        font-size: 20px;
        color: #3d3d3d;
        height: 90px;
        line-height: 90px;
        border-bottom: 1px solid #e0e0e0;
        margin-top: 0;
        margin-bottom: 0;
    }

    .login-history-body {
        padding: 28px 0 30px;
    }

    .pagination {
        text-align: center;
        padding-bottom: 30px;
    }
</style>

<style>
    .login-history-body .el-card .el-card__body {
        padding: 0 20px;
    }
</style>
