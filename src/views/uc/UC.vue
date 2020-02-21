<template>
    <div class="UC">
        <el-row>
            <el-col :span="3" :offset="5">
                <!--<el-row :gutter="12">
                    <el-col :span="2">
                        <nav class="left-nav">
                            <ul>
                                <li :class="{active: 1 === index}" @click="switchNav(1)">
                                    <el-link :underline="false">推荐</el-link>
                                </li>
                                <li :class="{active: 2 === index}" @click="switchNav(2)">
                                    <el-link :underline="false">前端</el-link>
                                </li>
                                <li :class="{active: 3 === index}" @click="switchNav(3)">
                                    <el-link :underline="false">后端</el-link>
                                </li>
                                <li :class="{active: 4 === index}" @click="switchNav(4)">
                                    <el-link :underline="false">移动端</el-link>
                                </li>
                                <li :class="{active: 5 === index}" @click="switchNav(5)">
                                    <el-link :underline="false">数据库</el-link>
                                </li>
                                <li :class="{active: 6 === index}" @click="switchNav(6)">
                                    <el-link :underline="false">运维</el-link>
                                </li>
                                <li :class="{active: 7 === index}" @click="switchNav(7)">
                                    <el-link :underline="false">人工智能</el-link>
                                </li>
                                <li :class="{active: 8 === index}" @click="switchNav(8)">
                                    <el-link :underline="false">开发工具</el-link>
                                </li>
                                <li :class="{active: 9 === index}" @click="switchNav(9)">
                                    <el-link :underline="false">其他</el-link>
                                </li>
                            </ul>
                        </nav>
                    </el-col>
                    <el-col :span="16">
                        <invitation :invitations="invitations"></invitation>
                    </el-col>
                    <el-col :span="6">
                        <div class="login">
                            <div class="title">Sagari</div>
                            <div class="description">一个和大家共同成长的社区</div>
                            <div class="login-form">
                                <el-form>
                                    <el-form-item>
                                        <el-input prefix-icon="el-icon-user"
                                                  size="small"
                                                  v-model="username"
                                                  placeholder="用户名/邮箱"></el-input>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-input prefix-icon="el-icon-lock"
                                                  size="small"
                                                  v-model="password"
                                                  placeholder="密码"
                                                  show-password></el-input>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-button type="primary" size="small" style="width: 100%">登录</el-button>
                                    </el-form-item>
                                </el-form>
                            </div>
                            <div class="oauth">
                                第三方登录:
                                <img src="../../assets/image/github.svg" alt="Github" class="oauth-btn">
                                <img src="../../assets/image/weibo.svg" alt="新浪微博" class="oauth-btn">
                            </div>
                        </div>
                        <div class="popular-tags">
                            <div class="popular-tags-header">
                                <span>热门标签</span>
                                <span>
                                    <el-link :underline="false" type="primary" style="font-size: 12px">查看全部</el-link>
                                </span>
                            </div>
                            <div class="popular-tags-body">
                                <el-tag type="primary">javascrpit</el-tag>
                                <el-tag type="primary">node.js</el-tag>
                                <el-tag type="primary">spring</el-tag>
                                <el-tag type="primary">springcloud</el-tag>
                                <el-tag type="primary">springboot</el-tag>
                                <el-tag type="primary">typescript</el-tag>
                                <el-tag type="primary">python</el-tag>
                                <el-tag type="primary">面试</el-tag>
                                <el-tag type="primary">算法</el-tag>
                            </div>
                        </div>
                    </el-col>
                </el-row>-->
                <div class="left-box">
                    <left-nav></left-nav>
                    <!--<nav class="left-nav">
                        <ul>
                            <li :class="{active: 1 === index}" @click="switchNav(1)">
                                <el-link :underline="false" href="/uc/profile">个人资料</el-link>
                            </li>
                            <li :class="{active: 2 === index}" @click="switchNav(2)">
                                <el-link :underline="false" href="/uc/article">我的文章</el-link>
                            </li>
                            <li :class="{active: 3 === index}" @click="switchNav(3)">
                                <el-link :underline="false">我的收藏</el-link>
                            </li>
                            <li :class="{active: 4 === index}" @click="switchNav(4)">
                                <el-link :underline="false">我关注的人</el-link>
                            </li>
                            <li :class="{active: 5 === index}" @click="switchNav(5)">
                                <el-link :underline="false">我的粉丝</el-link>
                            </li>
                            <li :class="{active: 6 === index}" @click="switchNav(6)">
                                <el-link :underline="false">我的标签</el-link>
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
                    </nav>-->
                </div>
            </el-col>
            <el-col :span="11" class="right-box">
                <router-view></router-view>
            </el-col>
        </el-row>
    </div>

</template>

<script>
    import LeftNav from "@/components/LeftNav";

    export default {
        name: "UC",
        data() {
            return {
                /*index: 1*/
            }
        },
        methods: {
            /*switchNav(index) {
                this.index = index;
            }*/
        },
        components: {
            LeftNav
        }
    }
</script>

<style scoped>
    .UC {
        padding-top: 20px;
    }

    .left-box {
        border-right: 1px solid #e9eaeb;
        -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .05);
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .05);
    }

    .right-box {
        padding: 0 32px 30px;
        background-color: #FFFFFF;
    }
</style>

<style>
    body {
        background-color: #f5f6f7;
    }
</style>
