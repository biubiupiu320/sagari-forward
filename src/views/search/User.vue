<template>
    <div class="search-user">
        <div class="search-user-avatar">
            <el-link :underline="false" :href="'/user/' + data.id" target="_blank">
                <el-avatar :size="48" :src="data.avatar">
                    <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
                </el-avatar>
            </el-link>
        </div>
        <div class="search-user-info">
            <div class="name">
                <el-link :href="'/user/' + data.id" target="_blank">{{data.username}}</el-link>
                <i v-if="data.gender === '男'"
                   class="el-icon-male gender"
                   title="男"></i>
                <i v-if="data.gender === '女'"
                   class="el-icon-female gender"
                   title="女"></i>
            </div>
            <div class="introduction">{{data.introduction}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "User",
        props: {
            data: {
                type: Object
            }
        }
    }
</script>

<style scoped>
    .search-user {
        display: flex;
    }

    .search-user-avatar {

    }

    .search-user-info {
        margin-left: 10px;
    }

    .search-user-info .name .el-link {
        color: #009a61;
        font-size: 15px;
        font-weight: 700;
        line-height: 24px;
    }

    .search-user-info .introduction {
        color: #333;
        font-size: 14px;
        font-weight: lighter;
        line-height: 24px;
        font-family: -apple-system,"Helvetica Neue",Helvetica,Arial,"PingFang SC","Hiragino Sans GB",
                    "WenQuanYi Micro Hei","Microsoft Yahei",sans-serif
    }

    .gender {
        font-size: 15px;
        line-height: 24px;
        vertical-align: middle;
        margin-left: 3px;
        font-weight: 700;
        color: #009A61;
    }
</style>
