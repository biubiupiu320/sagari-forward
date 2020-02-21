<template>
    <div>
        <nav class="left-nav">
            <ul>
                <li :class="{active: 1 === index}" @click="switchNav(1)">
                    <el-link :underline="false" href="/uc/profile" v-on:click.native.prevent>个人资料</el-link>
                </li>
                <li :class="{active: 2 === index}" @click="switchNav(2)">
                    <el-link :underline="false" href="/uc/article" v-on:click.native.prevent>我的文章</el-link>
                </li>
                <li :class="{active: 3 === index}" @click="switchNav(3)">
                    <el-link :underline="false" href="/uc/favorite" v-on:click.native.prevent>我的收藏</el-link>
                </li>
                <li :class="{active: 4 === index}" @click="switchNav(4)">
                    <el-link :underline="false" href="/uc/follow" v-on:click.native.prevent>我关注的人</el-link>
                </li>
                <li :class="{active: 5 === index}" @click="switchNav(5)">
                    <el-link :underline="false" href="/uc/fans" v-on:click.native.prevent>我的粉丝</el-link>
                </li>
                <li :class="{active: 6 === index}" @click="switchNav(6)">
                    <el-link :underline="false" href="/uc/my-tag" v-on:click.native.prevent>我的标签</el-link>
                </li>
            </ul>
        </nav>
        <nav class="left-nav">
            <ul>
                <li :class="{active: 7 === index}" @click="switchNav(7)">
                    <el-link :underline="false">评论</el-link>
                </li>
                <li :class="{active: 8 === index}" @click="switchNav(8)">
                    <el-link :underline="false">关注</el-link>
                </li>
                <li :class="{active: 9 === index}" @click="switchNav(9)">
                    <el-link :underline="false">点赞</el-link>
                </li>
                <li :class="{active: 10 === index}" @click="switchNav(10)">
                    <el-link :underline="false">私信</el-link>
                </li>
                <li :class="{active: 11 === index}" @click="switchNav(11)">
                    <el-link :underline="false">@我的</el-link>
                </li>
                <li :class="{active: 12 === index}" @click="switchNav(12)">
                    <el-link :underline="false">系统通知</el-link>
                </li>
                <li :class="{active: 13 === index}" @click="switchNav(13)">
                    <el-link :underline="false">消息设置</el-link>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
    export default {
        name: "LeftNav",
        data() {
            return {
                index: 1
            }
        },
        methods: {
            switchNav(index) {
                this.index = index;
                switch (index) {
                    case 1: this.$router.push('/uc/profile');break;
                    case 2: this.$router.push('/uc/article');break;
                    case 3: this.$router.push('/uc/favorite');break;
                    case 4: this.$router.push('/uc/follow');break;
                    case 5: this.$router.push('/uc/fans');break;
                    case 6: this.$router.push('/uc/my-tag');break;
                }
            }
        }
    }
</script>

<style scoped>
    .left-nav {
        background-color: #FFFFFF;
        color: #333;
        font-size: 14px;
        line-height: 32px;
        box-sizing: border-box;
        font-family: PingFang SC, Hiragino Sans GB, Arial, Microsoft YaHei, Verdana, Roboto,
        Noto, Helvetica Neue, sans-serif !important;
        text-align: left;
        border-bottom: 1px solid #e9eaeb;
        word-break: break-all;
        -webkit-text-size-adjust: 100%;
        -moz-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
    }

    .left-nav ul {
        list-style: none;
        text-align: left;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        padding: 0;
        margin: 0;
    }

    .left-nav ul li {
        display: list-item;
        padding-left: 16px;
        margin-bottom: 1px;
        cursor: pointer;
    }

    .left-nav ul li:hover {
        background: #fde3e4;
    }

    .left-nav ul li .el-link {
        text-align: left;
        justify-content: left;
        width: 100%;
        font-size: 14px;
        color: #333;
        font-family: PingFang SC, Hiragino Sans GB, Arial, Microsoft YaHei, Verdana, Roboto,
        Noto, Helvetica Neue, sans-serif !important;
    }

    .left-nav ul .active {
        background-color: #b20b13 !important;
    }

    .left-nav ul .active .el-link {
        color: #FFFFFF;
    }
</style>
