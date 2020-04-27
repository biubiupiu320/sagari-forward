<template>
    <div id="app">
        <!--<vue-particles
            color="#dedede"
            :particleOpacity="0.7"
            :particlesNumber="80"
            shapeType="circle"
            :particleSize="4"
            linesColor="#dedede"
            :linesWidth="3"
            :lineLinked="true"
            :lineOpacity="0.7"
            :linesDistance="150"
            :moveSpeed="3"
            :hoverEffect="true"
            hoverMode="grab"
            :clickEffect="true"
            clickMode="push">
        </vue-particles>-->
        <el-backtop target=".el-main" :right="80" :bottom="80"></el-backtop>
        <el-container style="height: 100%; width: 100%"> <!--style="height: 100%; width: 100%"-->
            <el-header height="61px"><nav-bar></nav-bar></el-header>
            <el-main><router-view></router-view></el-main>
            <div class="footer">
                Copyright © 2020 Sagari ·
                <a href="http://beian.miit.gov.cn/" target="_blank">豫ICP备20007157号-1</a>
            </div>
        </el-container>
    </div>
</template>

<script>
    import NavBar from "components/NavBar";
    import Footer from "@/components/Footer";

    export default {
        name: 'App',
        data() {
            return {

            }
        },
        components: {
            NavBar,
            Footer
        }
    }
</script>

<style>
    @import "~element-ui/lib/theme-chalk/index.css";

    #app {
        width: 100%;
        height: 100%;
        background-color: #F0F0F0;
        /*background-color: black;*/
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

    body {
        overflow-y: hidden;
    }

    #particles-js {
        position: absolute;
        width: 100%;
        height: calc(100% - 61px);
    }

    .footer {
        text-align: center;
        font-size: 13px;
        color: #666;
        padding: 15px 0;
        background: rgb(235, 235, 235);
    }

    .footer a {
        text-decoration: none;
        color: #666;
    }

    .footer a:hover {
        text-decoration: underline;
        color: #337ab7;
    }
</style>
