<template>
    <div>
        <div class="tag-title">
            <el-link :underline="false" href="www.baidu.com">
                <el-tag>{{data.title}}</el-tag>
            </el-link>
        </div>
        <p class="tag-description">{{data.description}}</p>
    </div>
</template>

<script>
    export default {
        name: "Tag",
        props: {
            data: {
                type: Object
            }
        }
    }
</script>

<style scoped>
    .tag-description {
        color: #666;
        font-size: 13px;
        line-height: 20px;
    }

    .tag-title .el-tag:hover {
        color: #ffffff;
        background-color: #409eff;
    }
</style>
