<template>
    <div id="app">
        <el-container style="height: 100%; width: 100%">
            <el-header height="61px"><nav-bar></nav-bar></el-header>
            <el-main><router-view></router-view></el-main>
        </el-container>
    </div>
</template>

<script>
    import NavBar from "@/components/NavBar";

    export default {
        name: 'App',
        data() {
            return {

            }
        },
        components: {
            NavBar
        }
    }
</script>

<style>
    @import "~element-ui/lib/theme-chalk/index.css";

    #app {
        width: 100%;
        height: 100%;
    }

    .el-header {
        padding: 0;
        position: fixed;
        z-index: 9999;
        width: 100%;
    }

    .el-main {
        padding: 0;
        margin-top: 61px;
    }

    html, body {
        width: 100%;
        height: 100%;
    }
</style>
