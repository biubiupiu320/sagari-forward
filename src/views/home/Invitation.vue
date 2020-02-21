<template>
   <!-- <el-row class="invitation-single">
        <el-col :span="12" :offset="6">
            <el-row :gutter="50">
                <el-col :span="18">
                    <el-row :gutter="15" style="border-bottom: 1px solid #AAAAAA; margin-bottom: 15px">
                        <el-col :span="18" style="padding: 0">
                            <el-card path="/article" class="box-card invitation" shadow="never">
                                <div slot="header">
                                    <el-link href="/article" :underline="false">
                                        <span class="invitation-title">卡片名称</span>
                                    </el-link>
                                </div>
                                <div class="invitation-content">
                                    我哭了我哭了我哭了我哭了我哭了我哭了
                                    我哭了
                                    我哭了
                                    我哭了我哭了我哭了我哭了我哭了我哭了我哭了
                                    我哭了
                                    我哭了
                                    我哭了
                                    我哭了我哭了我哭了我哭了我哭了我哭了我哭了
                                    我哭了我哭了我哭了我哭了我哭了我哭了我哭了
                                    我哭了我哭了我哭了我哭了...
                                </div>
                                <div class="invitation-bot">
                                    <el-link :underline="false">
                                        <span class="invitation-bot-item" style="line-height: 20px">浊字清欢</span>
                                    </el-link>
                                    <span class="invitation-bot-item"><i class="el-icon-ali-good-fill"></i>12</span>
                                    <span class="invitation-bot-item"><i class="el-icon-ali-bad-fill"></i>12</span>
                                    <span class="invitation-bot-item"><i class="el-icon-ali-comments-fill"></i>12</span>
                                    <span class="invitation-bot-item"><i class="el-icon-ali-collect-fill"></i>12</span>
                                </div>
                            </el-card>
                        </el-col>
                        <el-col :span="6" style="padding-right: 0">
                            <el-link :underline="false">
                                <el-image src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg">
                                    <div slot="error" class="image-slot">
                                        <img style="width: 100%" src="../../assets/image/image_error.png" alt="">
                                    </div>
                                </el-image>
                            </el-link>
                        </el-col>
                    </el-row>
                    <el-row :gutter="15" style="border-bottom: 1px solid #AAAAAA; margin-bottom: 15px">
                        <el-col :span="18" style="padding: 0">
                            <el-card class="box-card invitation" shadow="never">
                                <div slot="header">
                                    <el-link :underline="false">
                                        <span class="invitation-title">卡片名称</span>
                                    </el-link>
                                </div>
                                <div class="invitation-content">
                                    我哭了我哭了我哭了我哭了我哭了我哭了
                                    我哭了
                                    我哭了
                                    我哭了我哭了我哭了我哭了我哭了我哭了我哭了
                                    我哭了
                                    我哭了
                                    我哭了
                                    我哭了我哭了我哭了我哭了我哭了我哭了我哭了
                                    我哭了我哭了我哭了我哭了我哭了我哭了我哭了
                                    我哭了我哭了我哭了我哭了...
                                </div>
                                <div class="invitation-bot">
                                    <el-link :underline="false">
                                        <span class="invitation-bot-item" style="line-height: 20px">浊字清欢</span>
                                    </el-link>
                                    <span class="invitation-bot-item"><i class="el-icon-alidianzan"></i>12</span>
                                    <span class="invitation-bot-item"><i class="el-icon-alicai"></i>12</span>
                                    <span class="invitation-bot-item"><i class="el-icon-alihuifu"></i>12</span>
                                    <span class="invitation-bot-item"><i class="el-icon-aliguanzhu"></i>12</span>
                                </div>
                            </el-card>
                        </el-col>
                        <el-col :span="6" style="padding-right: 0">
                            <el-link :underline="false">
                                <el-image src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg">
                                    <div slot="error" class="image-slot">
                                        <img style="width: 100%" src="../../assets/image/image_error.png" alt="">
                                    </div>
                                </el-image>
                            </el-link>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="6" style="padding: 0">
                    <div>
                        <div class="recommend-head">
                            <span class="recommend-head-left">推荐作者</span>
                            <span class="recommend-head-right">
                                    <i class="el-icon-refresh"></i>&nbsp;换一批
                                </span>
                        </div>
                        <div class="recommend-body">
                            <div class="recommend-body-item">
                                <el-link :underline="false" style="float: left">
                                    <el-avatar
                                        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png">
                                    </el-avatar>
                                </el-link>
                                <el-link
                                    :underline="false"
                                    icon="el-icon-plus"
                                    style="float: right">
                                    关注
                                </el-link>
                                <div class="recommend-body-item-head">
                                    <el-link :underline="false">
                                        <span>Sakura</span>
                                    </el-link>
                                </div>
                                <div class="recommend-body-item-bot">
                                    <span>12篇文章</span>
                                    <span>&nbsp;·&nbsp;</span>
                                    <span>20个粉丝</span>
                                </div>
                            </div>
                            <div class="recommend-body-item">
                                <el-link :underline="false" style="float: left">
                                    <el-avatar
                                        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png">
                                    </el-avatar>
                                </el-link>
                                <el-link
                                    :underline="false"
                                    icon="el-icon-plus"
                                    style="float: right">
                                    关注
                                </el-link>
                                <div class="recommend-body-item-head">
                                    <el-link :underline="false">
                                        <span>Sakura</span>
                                    </el-link>
                                </div>
                                <div class="recommend-body-item-bot">
                                    <span>12篇文章</span>
                                    <span>&nbsp;·&nbsp;</span>
                                    <span>20个粉丝</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <el-button type="success"
                                       icon="el-icon-more-outline"
                                       size="small"
                                       style="display: block; width: 100%">查看更多
                            </el-button>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </el-col>
    </el-row>-->
    <div class="blogs">
        <ul>
            <li class="blog" v-for="(item, index) in invitations" v-if="index < size">
                <div class="blog-title">
                    <el-link :underline="false" :href="'/article/' + item.articleId">{{item.articleTitle}}</el-link>
                    <span class="blog-del-btn" @click="removeBlog(index)"><i class="el-icon-close"></i></span>
                </div>
                <div class="blog-content">
                    {{item.articleContent}}
                </div>
                <div>
                    <span>
                        <el-popover placement="top-start" width="200" trigger="hover"
                            content="我不会使用双截棍">
                            <span slot="reference" class="blog-user">
                                <el-link :underline="false">
                                    <el-avatar :size="24" :src="item.user.avatar">
                                        <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
                                    </el-avatar>
                                </el-link>&nbsp;
                                <el-link :underline="false">{{item.user.name}}</el-link>
                            </span>
                        </el-popover>
                    </span>
                    <span class="blog-info">
                        <el-link :underline="false" icon="el-icon-ali-good">{{item.goodCount}}</el-link>
                        <el-divider direction="vertical"></el-divider>
                        <el-link :underline="false" icon="el-icon-ali-comments">{{item.commentCount}}</el-link>
                        <el-divider direction="vertical"></el-divider>
                        <el-link :underline="false" icon="el-icon-view">{{item.viewCount}}</el-link>
                    </span>
                </div>
            </li>
            <li class="blog load-more">
                <el-button type="text" :loading="isLoading" @click="loadMore">加载更多</el-button>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "Invitation",
        data() {
            return {
                isLoading: false,
                size: 5
            }
        },
        props: {
            invitations: {
                type: Array,
                default: []
            },
        },
        methods: {
            removeBlog(index) {
                this.invitations.splice(index, 1);
            },
            loadMore() {
                this.isLoading = true;
                setTimeout(() => {
                    this.size += 5;
                    this.isLoading = false;
                }, 1000);
            }
        }
    }
</script>

<style scoped>
    /*.invitation-single {
        margin-top: 1%;
    }

    .invitation {
        border: none;
    }

    .invitation-title {
        font-size: 18px;
        font-weight: 700;
        color: #303133;
    }

    .invitation-title:hover, .invitation-title:active {
        border-bottom: 1px solid #303133;
    }

    .invitation-content {
        font-size: 13px;
        line-height: 24px;
        color: #999999;
        margin-bottom: 8px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
    }

    .invitation-bot {
        font-size: 12px;
        height: 20px;
        color: #b4b4b4;
        position: absolute;
        bottom: 5px;
    }

    .invitation-bot-item {
        font-size: 12px;
        font-weight: 400;
        color: #b4b4b4;
        margin-right: 10px;
        cursor: pointer;
    }

    .invitation-bot-item:hover {
        color: #787878;
    }

    .recommend-head {
        font-size: 14px;
        color: #969696;
        margin-bottom: 5%;
    }

    .recommend-head-left {
        text-align: left;
    }

    .recommend-head-right {
        float: right;
        cursor: pointer;
    }

    .recommend-head-right:hover {
        color: #787878;
    }

    .recommend-body-item {
        margin-bottom: 10px;
    }

    .recommend-body-item-head {
        margin-left: 20%;
    }

    .recommend-body-item-bot {
        font-size: 12px;
        color: #969696;
        margin-left: 20%;
    }*/
    .blogs {
        background-color: #FFFFFF;
    }

    .blogs ul {
        padding: 0;
        margin: 0;
        list-style: none;
    }

    .blogs ul li {
        padding: 18px 24px 13px;
        border-bottom: 1px solid #f4f4f4;
        -webkit-box-shadow: 0 0px 2px 0 rgba(0, 0, 0, 0.04);
        box-shadow: 0 0px 2px 0 rgba(0, 0, 0, 0.04);
    }

    .blogs ul li:hover {
        background-color: #fafafa;
    }

    .blog-title .el-link {
        font-size: 18px;
        font-family: PingFang SC, Hiragino Sans GB, Arial, Microsoft YaHei, Verdana, Roboto,
                    Noto, Helvetica Neue, sans-serif !important;
        color: #3D3D3D;
        font-weight: 700;
        height: 24px;
        line-height: 24px;
        text-align: left;
        text-overflow: ellipsis;
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
        -moz-text-size-adjust: 100%;
        white-space: nowrap;
        overflow: hidden;
        display: block;
        width: 96%;
        margin-bottom: 4px;
    }

    .blog-title .el-link:hover {
        color: #ca0616;
    }

    .blog-del-btn {
        float: right;
        cursor: pointer;
        color: #2EC;
        position: relative;
        bottom: 28px;
    }

    .blog-del-btn:hover {
        color: #333;
    }

    .blog-content {
        margin-bottom: 4px;
        color: #8a8a8a;
        font-size: 14px;
        line-height: 24px;
        font-family: PingFang SC, Hiragino Sans GB, Arial, Microsoft YaHei, Verdana, Roboto,
                    Noto, Helvetica Neue, sans-serif !important;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .blog-info {
        float: right;
    }

    .load-more {
        display: flex;
        justify-content: center;
    }
</style>

<style>
    .blog-info .el-link i {
        font-size: 14px !important;
    }
    /*.el-card__header {
        border: none;
        padding: 0;
        margin-bottom: 5px;
    }

    .el-card__body {
        padding: 0;
    }

    .el-image {
        border: 1px solid #f0f0f0;
        border-radius: 4px;
    }

    .image-slot {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        background: #f5f7fa;
        color: #909399;
        font-size: 30px;
    }

    .el-button .el-icon-more-outline {
        color: white;
    }*/
</style>

<style src="../../assets/css/iconfont.css"></style>
