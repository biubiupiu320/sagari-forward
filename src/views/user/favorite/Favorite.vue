<template>
    <div class="user-favorite">
        <div class="user-favorite-header">
            <el-tabs>
                <el-tab-pane :label="'用户管理\t'+12"></el-tab-pane>
                <el-tab-pane :label="'配置管理\t'+13"></el-tab-pane>
                <el-tab-pane :label="'角色管理\t'+14"></el-tab-pane>
                <el-tab-pane :label="'定时任务补偿\t'+15"></el-tab-pane>
            </el-tabs>
        </div>
        <div class="user-favorite-body">
            <blog></blog>
        </div>
    </div>
</template>

<script>
    import Blog from "@/views/user/blog/Blog";
    export default {
        name: "Favorite",
        created() {
            console.log('favorite created')
        },
        components: {
            Blog
        }
    }
</script>

<style scoped>

</style>

<style>
    .user-favorite-header .el-tabs .el-tabs__nav {
        padding-bottom: 0;
    }

    .user-favorite-header .el-tabs .el-tabs__nav .el-tabs__item {
        line-height: 40px;
    }
</style>
