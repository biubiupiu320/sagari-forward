<template>
    <div class="bind-account" v-loading="isLoading">
        <div class="bind-account-header">
            <h3>绑定第三方账号</h3>
        </div>
        <div class="bind-account-body">
            <ul class="platforms">
                <li class="platform-item" @click="bindOrUnbind('qq')">
                    <img src="../../../assets/image/qq.svg" alt="qq" class="platform-icon">
                    <span class="platform-name">QQ</span>
                    <span class="platform-username">{{qqId}}</span>
                    <span class="bind-btn">
                        <el-button type="text"
                                   v-if="qqId === ''"
                                   @click="bindOrUnbind('qq')">绑定</el-button>
                        <el-button type="text"
                                   v-else
                                   @click="bindOrUnbind('qq')">解绑</el-button>
                    </span>
                </li>
                <!--<li class="platform-item" @click="bindOrUnbind('github')">
                    <img src="../../../assets/image/github.svg" alt="GitHub" class="platform-icon">
                    <span class="platform-name">GitHub</span>
                    <span class="platform-username">{{githubId}}</span>
                    <span class="bind-btn">
                        <el-button type="text"
                                   v-if="githubId === ''"
                                   @click="bindOrUnbind('github')">绑定</el-button>
                        <el-button type="text"
                                   v-else
                                   @click="bindOrUnbind('github')">解绑</el-button>
                    </span>
                </li>
                <li class="platform-item" @click="bindOrUnbind('weibo')">
                    <img src="../../../assets/image/weibo.svg" alt="微博" class="platform-icon">
                    <span class="platform-name">新浪微博</span>
                    <span class="platform-username">{{bindWeiBo.username}}</span>
                    <span class="bind-btn">
                        <el-button type="text"
                                   v-if="!bindWeiBo.isBind"
                                   @click="bindOrUnbind('weibo')">绑定</el-button>
                        <el-button type="text"
                                   v-else
                                   @click="bindOrUnbind('weibo')">解绑</el-button>
                    </span>
                </li>
                <li class="platform-item" @click="bindOrUnbind('baidu')">
                    <img src="../../../assets/image/baidu.svg" alt="百度" class="platform-icon">
                    <span class="platform-name">百度</span>
                    <span class="platform-username">{{baiduId}}</span>
                    <span class="bind-btn">
                        <el-button type="text"
                                   v-if="baiduId === ''"
                                   @click="bindOrUnbind('baidu')">绑定</el-button>
                        <el-button type="text"
                                   v-else
                                   @click="bindOrUnbind('baidu')">解绑</el-button>
                    </span>
                </li>-->
            </ul>
        </div>
    </div>
</template>

<script>
    import {request} from "@/network/request";

    export default {
        name: "BindAccount",
        created() {
            this.isLoading = true;
            request({
                url: "/user/getOtherPlatform",
                method: "GET"
            }).then(res => {
                let result = res.data;
                if (result.code === 200) {
                    let data = result.data;
                    if (data.qqId !== null && data.qqId !== undefined) {
                        this.qqId = data.qqId;
                    }
                    if (data.baiduId !== null && data.baiduId !== undefined) {
                        this.baiduId = data.baiduId;
                    }
                    if (data.githubId !== null && data.githubId !== undefined) {
                        this.githubId = data.githubId;
                    }
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
        data() {
            return {
                qqId: '',
                isLoading: false
            }
        },
        methods: {
            bindOrUnbind(str) {
                switch (str) {
                    case 'qq':
                        if (this.qqId === '') {
                            window.location.href="https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=101864484&redirect_uri=http://sagari.cn/qq_callback&state=1";
                        } else {
                            this.$confirm("解绑QQ账号之后将不能再使用QQ登录您的账号，是否继续？", "解绑QQ账号", {
                                confirmButtonText: "确定",
                                cancelButtonText: "取消",
                                type: "warning"
                            }).then(() => {
                                request({
                                    url: "/user/unbindQQ",
                                    method: "GET"
                                }).then(res => {
                                    let result = res.data;
                                    if (result.code === 200) {
                                        this.$message({
                                            message: "解绑成功",
                                            type: "success",
                                            center: true,
                                            offset: 100
                                        });
                                        this.qqId = "";
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
                                        message: "服务器打了个盹，请再试一次吧",
                                        type: "error",
                                        center: true,
                                        offset: 100
                                    });
                                });
                            });
                        }
                        break;
                }
                event.stopPropagation();
            }
        }
    }
</script>

<style scoped>
    .bind-account {
        min-height: 600px;
    }

    .bind-account-header h3 {
        font-size: 20px;
        color: #3d3d3d;
        height: 90px;
        line-height: 90px;
        border-bottom: 1px solid #e0e0e0;
        margin-top: 0;
        margin-bottom: 0;
    }

    .platforms {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .platform-item {
        height: 68px;
        line-height: 68px;
        border-bottom: 1px solid #e0e0e0;
        cursor: pointer;
    }

    .platforms .platform-item:last-child {
        border-bottom: none;
    }

    .platform-icon {
        width: 30px;
        height: 30px;
        margin-top: 19px;
        float: left;
    }

    .platform-name {
        font-size: 16px;
        color: #4d4d4d;
        margin-left: 12px;
        height: 68px;
        line-height: 68px;
        display: inline-block;
        float: left;
        width: 25%;
    }

    .platform-username {
        font-size: 14px;
        color: #CCC;
        height: 68px;
        line-height: 68px;
        display: inline-block;
        float: left;
    }

    .bind-btn {
        float: right;
        height: 68px;
        line-height: 68px;
        display: inline-block;
    }
</style>
