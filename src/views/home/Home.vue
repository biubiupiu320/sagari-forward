<template>
    <div class="home">
        <el-row>
            <el-col :span="14" :offset="5">
                <el-row :gutter="12">
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
                </el-row>
            </el-col>
        </el-row>
    </div>

</template>

<script>
    import Invitation from "@/views/home/Invitation";

    export default {
        name: "Home",
        data() {
            return {
                username: '',
                password: '',
                invitations: [
                    {
                        articleId: 1,
                        articleTitle: '“低配”贪吃蛇“低配”贪吃蛇“低配”贪吃蛇“低配”贪吃蛇“低配”贪吃蛇“低配”贪吃蛇',
                        articleContent: '前两天我们用canvas制作了一个简单的五子棋小游戏，今天我再用canvas制作一个贪吃蛇小游戏。试玩点这里：贪吃蛇吃蛇',
                        goodCount: 20,
                        commentCount: 10,
                        viewCount: 1000,
                        user: {
                            id: 1,
                            name: 'Sakura',
                            avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
                        }
                    },
                    {
                        articleId: 2,
                        articleTitle: 'c语言经典例题',
                        articleContent: '阅读目录：1、计算 int, float, double 和 char 字节大小2、交换两个数的值，使用临时变量3、判断奇数/偶数4、循环区',
                        goodCount: 1,
                        commentCount: 1,
                        viewCount: 221,
                        user: {
                            id: 1,
                            name: 'Sakura',
                            avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
                        }
                    },
                    {
                        articleId: 3,
                        articleTitle: '年度榜单：Python三连冠，碾压Java！你怎么看？',
                        articleContent: 'IEEE Spectrum近日发布了2020年度编程语言排行榜，令人些许意外的是，Python连续三年问鼎巅峰，你怎么看？',
                        goodCount: 100,
                        commentCount: 18,
                        viewCount: 6822,
                        user: {
                            id: 1,
                            name: 'Sakura',
                            avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
                        }
                    },
                    {
                        articleId: 4,
                        articleTitle: '爬取b站视频的名称、地址、简介、观看次数、弹幕数量及发布时间并导入到csv中（附csv',
                        articleContent: '该爬虫大致分为以下步骤：搜索关键词、点击搜索、进入新页面获取每个页面的HTML解析每个页面的HTML将爬取到',
                        goodCount: 5,
                        commentCount: 2,
                        viewCount: 100,
                        user: {
                            id: 1,
                            name: 'Sakura',
                            avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
                        }
                    },
                    {
                        articleId: 5,
                        articleTitle: '好机会，女同事要我帮忙解决Maven冲突问题',
                        articleContent: '任何一个故事起因最重要任何一个职业，女生都有绝对的优势。更别提 IT 行业了，在部门中要是有女程序猿那肯定是香',
                        goodCount: 1,
                        commentCount: 3,
                        viewCount: 279,
                        user: {
                            id: 1,
                            name: 'Sakura',
                            avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
                        }
                    },
                    {
                        articleId: 6,
                        articleTitle: '设计模式的7大原则',
                        articleContent: '一、 设计模式的7个原则1. 单一职责原则2. 接口隔离原则3. 依赖倒转（倒置）原则4. 里氏替换原则5. 开闭原则6. 迪',
                        goodCount: 1,
                        commentCount: 0,
                        viewCount: 184,
                        user: {
                            id: 1,
                            name: 'Sakura',
                            avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
                        }
                    },
                    {
                        articleId: 7,
                        articleTitle: '使用Python对英雄联盟英雄数据进行聚类等分析 (字符串离散化)',
                        articleContent: '一、字符串离散化上图是我们本次需要分析的数据, 有一个 tags 标签, 它代表每个英雄的属性, 每英雄的属性有多个',
                        goodCount: 20,
                        commentCount: 10,
                        viewCount: 1000,
                        user: {
                            id: 1,
                            name: 'Sakura',
                            avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
                        }
                    },
                    {
                        articleId: 8,
                        articleTitle: '2020年 Java面试题整理 最新Java面试题2020',
                        articleContent: '学Python的程序员建议收藏！',
                        goodCount: 20,
                        commentCount: 10,
                        viewCount: 1000,
                        user: {
                            id: 1,
                            name: 'Sakura',
                            avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
                        }
                    },
                    {
                        articleId: 9,
                        articleTitle: '反转！“只问了1个框架，就给了35K的Python岗”',
                        articleContent: '文章目录1、类加载和实例化2、Java是值传递还是引用传递3、类加载的主要过程4、什么是GC5、简述垃圾回收过程',
                        goodCount: 0,
                        commentCount: 10,
                        viewCount: 234,
                        user: {
                            id: 1,
                            name: 'Sakura',
                            avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
                        }
                    },
                    {
                        articleId: 10,
                        articleTitle: 'SpringMVC框架|参数绑定',
                        articleContent: '文章目录一、 简单数据类型绑定1.SpringMVC获得请求参数2.使用@RequestParam做映射二、pojo数据类型绑定1.简单',
                        goodCount: 3,
                        commentCount: 6,
                        viewCount: 391,
                        user: {
                            id: 1,
                            name: 'Sakura',
                            avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
                        }
                    },
                    {
                        articleId: 11,
                        articleTitle: 'Python原来这么好学-1.1节:在windows中安装Python',
                        articleContent: '目录1.1.1 在windows中安装python1.1.2 本节知识要点1.1.3 课后习题这是一本教同学们彻底学通Python的高质量学习',
                        goodCount: 3,
                        commentCount: 10,
                        viewCount: 247,
                        user: {
                            id: 1,
                            name: 'Sakura',
                            avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
                        }
                    },
                ],
                index: 1
            }
        },
        methods: {
            switchNav(index) {
                this.index = index;
            }
        },
        components: {
            Invitation
        }
    }
</script>

<style scoped>
    .home {
        padding-top: 20px;
    }

    .left-nav {
        background-color: #FFFFFF;
        color: #333;
        font-size: 14px;
        line-height: 32px;
        padding-top: 6px;
        padding-bottom: 6px;
        box-sizing: border-box;
        font-family: PingFang SC, Hiragino Sans GB, Arial, Microsoft YaHei, Verdana, Roboto,
                    Noto, Helvetica Neue, sans-serif !important;
        text-align: center;
        word-break: break-all;
        -webkit-text-size-adjust: 100%;
        -moz-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
    }

    .left-nav ul {
        list-style: none;
        text-align: center;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        padding: 0;
        margin: 0;
    }

    .left-nav ul li {
        display: list-item;
    }

    .left-nav ul li .el-link {
        font-size: 14px;
        color: #333;
        font-family: PingFang SC, Hiragino Sans GB, Arial, Microsoft YaHei, Verdana, Roboto,
        Noto, Helvetica Neue, sans-serif !important;
    }

    .left-nav ul .active {
        background-color: #f44444;
        /*background-color: #409eff;*/
    }

    .left-nav ul .active .el-link {
        color: #FFFFFF;
    }

    .login {
        background-color: #FFFFFF;
        padding: 16px;
    }

    .title {
        font-size: 14px;
        font-weight: 600;
        margin-bottom: 6px;
        color: #2E3135;
    }

    .description {
        font-size: 14px;
        margin-bottom: 6px;
        color: #2E3135;
    }

    .login-form .el-form .el-form-item {
        margin: 0 0 5px 0;
    }

    .oauth {
        font-size: 14px;
        color: #767676;
        margin-top: 10px;
    }

    .oauth-btn {
        margin-left: 14px;
        vertical-align: bottom;
        cursor: pointer;
    }

    .popular-tags {
        margin-top: 18px;
        background-color: #FFFFFF;
    }

    .popular-tags-header {
        padding: 0 15px;
        line-height: 45px;
        justify-content: space-between;
        border-bottom: 1px solid #f6f6f6;
        font-size: 14px;
        color: #333;
        display: flex;
    }

    .popular-tags-body {
        padding: 15px;
    }

    .popular-tags-body .el-tag {
        margin: 0 12px 12px 0;
    }

    .popular-tags-body .el-tag:hover {
        background-color: #409eff;
        border-color: #409eff;
        color: #fff;
        cursor: pointer;
    }
</style>

<style>
    body {
        background-color: #f5f6f7;
    }
</style>
