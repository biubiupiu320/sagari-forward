<template>
    <div>
        <div class="blog-title">
            <el-link :underline="false"
                     :href="'/article/' + data.id"
                     v-html="data.title"
                     target="_blank"></el-link>
        </div>
        <div class="blog-content" v-html="data.content"></div>
        <div>
            <span>
                <el-popover placement="top-start"
                            width="200"
                            trigger="hover"
                            content="我不会使用双截棍">
                    <span slot="reference" class="blog-user">
                        <el-link :underline="false">
                            <el-avatar :size="24" :src="data.user.avatar">
                                <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
                            </el-avatar>
                        </el-link>&nbsp;
                        <el-link :underline="false">{{data.user.username}}</el-link>
                    </span>
                </el-popover>
            </span>
            <span class="blog-info">
                <el-link :underline="false"
                         class="iconfont el-icon-ali-good">{{data.goodCount}}</el-link>
                <el-divider direction="vertical"></el-divider>
                <el-link :underline="false"
                         class="iconfont el-icon-ali-comments">{{data.commentCount}}</el-link>
                <el-divider direction="vertical"></el-divider>
                <el-link :underline="false"
                         class="iconfont el-icon-ali-view">{{data.viewCount}}</el-link>
            </span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Article",
        props: {
            data: {
                type: Object
            }
        }
    }
</script>

<style scoped>
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

    .blog-content {
        margin-bottom: 8px;
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
</style>
