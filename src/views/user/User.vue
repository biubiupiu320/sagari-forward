<template>
    <el-row style="padding-top: 20px;">
        <el-col :span="14" :offset="5" class="user">
            <div class="business-card">
                <div class="business-card-avatar">
                    <el-avatar :size="100" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png">
                        <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
                    </el-avatar>
                </div>
                <div class="business-card-body">
                    <p class="nickname">Sakura0408</p>
                    <div class="introduction">
                        <i class="el-icon-postcard" title="简介"></i>
                        <p>发就打可能否卡迪那法看电视方块那段十块饭卡十多年付款纳斯达克发能打开焚枯食淡饭卡打死你看焚枯食淡饭卡
                            打死你客服那倒是看女生宿舍宿舍所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所
                            所所所所所所所所所</p>
                    </div>
                </div>
                <div class="business-card-right">
                    <el-button type="primary" size="medium">关注</el-button>
                    <el-button size="medium" icon="el-icon-check">已关注</el-button>
                    <el-button type="success" size="medium">私信</el-button>
                </div>
                <div style="clear: both"></div>
            </div>
            <div class="user-resource">
                <el-tabs>
                    <el-tab-pane :lazy="true">
                        <template v-slot:label>
                            <span>博客</span>
                            <span>12</span>
                        </template>
                        <blog></blog>
                    </el-tab-pane>
                    <el-tab-pane :lazy="true">
                        <template v-slot:label>
                            <span>收藏</span>
                            <span>54</span>
                        </template>
                        <favorite></favorite>
                    </el-tab-pane>
                    <el-tab-pane :lazy="true">
                        <template v-slot:label>
                            <span>TA的关注</span>
                            <span>12</span>
                        </template>
                        <follow></follow>
                    </el-tab-pane>
                    <el-tab-pane :lazy="true">
                        <template v-slot:label>
                            <span>TA的粉丝</span>
                            <span>12</span>
                        </template>
                        <fans></fans>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </el-col>
    </el-row>
</template>

<script>
    import Blog from "@/views/user/blog/Blog";
    import Favorite from "@/views/user/favorite/Favorite";
    import Follow from "@/views/user/follow/Follow";
    import Fans from "@/views/user/fans/Fans";

    export default {
        name: "User",
        components: {
            Favorite,
            Follow,
            Blog,
            Fans
        }
    }
</script>

<style scoped>
    .user {
        border-radius: 4px;
    }

    .business-card {
        background-color: #ffffff;
    }

    .business-card-avatar {
        margin: 19px 24px 32px;
        position: relative;
        float: left;
    }

    .business-card-body {
        float: left;
        position: relative;
        margin: 24px 0;
        width: 55%;
    }

    .nickname {
        font-size: 26px;
        color: #4d4d4d;
        min-height: 24px;
        margin: 0;
        padding: 0;
    }

    .introduction {
        margin-top: 7px;
        display: flex;
        align-items: flex-start;
        text-align: justify;
    }

    .introduction i {
        vertical-align: top;
    }

    .introduction p {
        margin: 0 0 0 8px;
        padding: 0;
        display: inline-block;
        font-family: 'Microsoft YaHei',Arial,serif;
        text-align: justify;
        font-size: 14px;
        color: #999999;
        line-height: 20px;
    }

    .business-card-right {
        margin-top: 24px;
        position: relative;
        float: right;
        margin-right: 24px;
    }

    .user-resource {
        margin-top: 8px;
        padding: 0 28px;
        background-color: #ffffff;
    }

    .user-resource .el-tabs .el-tabs__item span {
        font-size: 16px;
    }

    .user-resource .el-tabs .el-tabs__item span:first-child {
        padding-left: 8px;
        padding-right: 4px;
    }

    .user-resource .el-tabs .el-tabs__item span:last-child {
        padding-left: 4px;
        padding-right: 8px;
    }
</style>

<style>
    body {
        background-color: #f5f6f7;
    }

    .user-resource .el-tabs .el-tabs__nav {
        padding-bottom: 15px;
    }

    .user-resource .el-tabs .el-tabs__nav .el-tabs__item {
        line-height: 60px;
    }
</style>
