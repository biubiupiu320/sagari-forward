<template>
    <div>
        <nav class="left-nav">
            <ul>
                <li :class="{active: 1 === index}"
                    @click="switchNav(1)">
                    <el-link :underline="false"
                             href="/uc/profile"
                             v-on:click.native.prevent>个人资料</el-link>
                </li>
                <li :class="{active: 2 === index}"
                    @click="switchNav(2)">
                    <el-link :underline="false"
                             href="/uc/article"
                             v-on:click.native.prevent>我的文章</el-link>
                </li>
                <li :class="{active: 3 === index}"
                    @click="switchNav(3)">
                    <el-link :underline="false"
                             href="/uc/favorite"
                             v-on:click.native.prevent>我的收藏</el-link>
                </li>
                <li :class="{active: 4 === index}"
                    @click="switchNav(4)">
                    <el-link :underline="false"
                             href="/uc/follow"
                             v-on:click.native.prevent>我关注的人</el-link>
                </li>
                <li :class="{active: 5 === index}"
                    @click="switchNav(5)">
                    <el-link :underline="false"
                             href="/uc/fans"
                             v-on:click.native.prevent>我的粉丝</el-link>
                </li>
                <li :class="{active: 6 === index}"
                    @click="switchNav(6)">
                    <el-link :underline="false"
                             href="/uc/my-tag"
                             v-on:click.native.prevent>我的标签</el-link>
                </li>
            </ul>
        </nav>
        <nav class="left-nav">
            <ul>
                <li :class="{active: 7 === index}"
                    @click="switchNav(7)">
                    <el-link :underline="false"
                             href="/uc/comment-notice"
                             v-on:click.native.prevent>评论
                        <el-badge class="mark"
                                  :max="99"
                                  :value="$store.getters.getUnreadNotice.unreadCommentCount"
                                  :hidden="$store.getters.getUnreadNotice.unreadCommentCount === 0"/>
                    </el-link>
                </li>
                <li :class="{active: 8 === index}"
                    @click="switchNav(8)">
                    <el-link :underline="false"
                             href="/uc/follow-notice"
                             v-on:click.native.prevent>关注
                        <el-badge class="mark"
                                  :max="99"
                                  :value="$store.getters.getUnreadNotice.unreadFollowCount"
                                  :hidden="$store.getters.getUnreadNotice.unreadFollowCount === 0"/>
                    </el-link>
                </li>
                <li :class="{active: 9 === index}"
                    @click="switchNav(9)">
                    <el-link :underline="false"
                             href="/uc/good-notice"
                             v-on:click.native.prevent>点赞
                        <el-badge class="mark"
                                  :max="99"
                                  :value="$store.getters.getUnreadNotice.unreadGoodCount"
                                  :hidden="$store.getters.getUnreadNotice.unreadGoodCount === 0"/>
                    </el-link>
                </li>
                <li :class="{active: 10 === index}"
                    @click="switchNav(10)">
                    <el-link :underline="false"
                             href="/uc/private-letter"
                             v-on:click.native.prevent>私信</el-link>
                </li>
                <li :class="{active: 11 === index}"
                    @click="switchNav(11)">
                    <el-link :underline="false"
                             href="/uc/system-notice"
                             v-on:click.native.prevent>系统通知
                        <el-badge class="mark"
                                  :max="99"
                                  :value="$store.getters.getUnreadNotice.unreadSystemCount"
                                  :hidden="$store.getters.getUnreadNotice.unreadSystemCount === 0"/>
                    </el-link>
                </li>
                <li :class="{active: 12 === index}"
                    @click="switchNav(12)">
                    <el-link :underline="false"
                             href="/uc/ban-record"
                             v-on:click.native.prevent>封禁记录</el-link>
                </li>
            </ul>
        </nav>
        <nav class="left-nav">
            <ul>
                <li :class="{active: 13 === index}"
                    @click="switchNav(13)">
                    <el-link :underline="false"
                             href="/uc/modify-password"
                             v-on:click.native.prevent>修改密码</el-link>
                </li>
                <li :class="{active: 14 === index}"
                    @click="switchNav(14)">
                    <el-link :underline="false"
                             href="/uc/modify-email"
                             v-on:click.native.prevent>修改邮箱</el-link>
                </li>
                <li :class="{active: 15 === index}"
                    @click="switchNav(15)">
                    <el-link :underline="false"
                             href="/uc/bind-account"
                             v-on:click.native.prevent>绑定第三方账号</el-link>
                </li>
                <li :class="{active: 16 === index}"
                    @click="switchNav(16)">
                    <el-link :underline="false"
                             href="/uc/login-history"
                             v-on:click.native.prevent>登录历史</el-link>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
    export default {
        name: "LeftNav",
        created() {
            let path = this.$route.path;
            switch (path) {
                case '/uc/profile'          : this.index = 1; break;
                case '/uc/article'          : this.index = 2; break;
                case '/uc/favorite'         : this.index = 3; break;
                case '/uc/follow'           : this.index = 4; break;
                case '/uc/fans'             : this.index = 5; break;
                case '/uc/my-tag'           : this.index = 6; break;
                case '/uc/comment-notice'   : this.index = 7; break;
                case '/uc/follow-notice'    : this.index = 8; break;
                case '/uc/good-notice'      : this.index = 9; break;
                case '/uc/private-letter'   : this.index = 10;break;
                case '/uc/system-notice'    : this.index = 11;break;
                case '/uc/ban-record'       : this.index = 12;break;
                case '/uc/modify-password'  : this.index = 13;break;
                case '/uc/modify-email'     : this.index = 14;break;
                case '/uc/bind-account'     : this.index = 15;break;
                case '/uc/login-history'    : this.index = 16;break;
            }
        },
        data() {
            return {
                index: 1
            }
        },
        methods: {
            switchNav(index) {
                this.index = index;
                switch (index) {
                    case 1 : this.$router.push('/uc/profile');          break;
                    case 2 : this.$router.push('/uc/article');          break;
                    case 3 : this.$router.push('/uc/favorite');         break;
                    case 4 : this.$router.push('/uc/follow');           break;
                    case 5 : this.$router.push('/uc/fans');             break;
                    case 6 : this.$router.push('/uc/my-tag');           break;
                    case 7 : this.$router.push('/uc/comment-notice');   break;
                    case 8 : this.$router.push('/uc/follow-notice');    break;
                    case 9 : this.$router.push('/uc/good-notice');      break;
                    case 10: this.$router.push('/uc/private-letter');   break;
                    case 11: this.$router.push('/uc/system-notice');    break;
                    case 12: this.$router.push('/uc/ban-record');       break;
                    case 13: this.$router.push('/uc/modify-password');  break;
                    case 14: this.$router.push('/uc/modify-email');     break;
                    case 15: this.$router.push('/uc/bind-account');     break;
                    case 16: this.$router.push('/uc/login-history');    break;
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

    .mark {
        float: right;
        margin-right: 15px;
    }
</style>

<style>
    .left-nav ul li .el-link .el-link--inner {
        width: 100%;
    }

    .left-nav ul li .el-link .el-badge .el-badge__content {
        vertical-align: text-bottom;
    }
</style>
