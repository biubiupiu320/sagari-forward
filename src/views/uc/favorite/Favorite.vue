<template>
    <div class="favorite">
        <div class="favorite-header">
            <span>我创建的收藏夹</span>
            <span style="float: right">
                <el-button type="text" icon="el-icon-plus" @click="newDialogVisible = true">新建收藏夹</el-button>
            </span>
        </div>
        <div class="favorite-body">
            <el-tabs :stretch="true" active-name="0">
                <el-tab-pane v-for="(item, index) in favorites" :label="item.name" :name="index + ''">
                    <favorite-list :invitations="item.invitations"
                                   :edit-favorite="item"
                                   :index="index"
                                   :favorites="favorites"
                                   @cancelFavorite="cancelFavorite"
                                   @editFavorite="editFavorite"
                                   @delFavorite="delFavorite"
                                   @moveToFavorite="moveToFavorite"></favorite-list>
                </el-tab-pane>
            </el-tabs>
        </div>
        <el-dialog
            :visible.sync="newDialogVisible"
            width="30%"
            :show-close="false"
            class="new">
            <template v-slot:title>
                <div class="new-header">新建收藏夹</div>
            </template>
            <template v-slot:default>
                <div class="new-body">
                    <el-form label-position="left" label-width="100px" :model="newFavorite" ref="newFavorite">
                        <el-form-item label="标题" prop="name">
                            <el-input type="text"
                                      size="small"
                                      placeholder="请填写收藏夹的名称"
                                      v-model="newFavorite.name"></el-input>
                        </el-form-item>
                        <el-form-item label="描述（选填）" prop="description">
                            <el-input type="textarea"
                                      placeholder="请输入描述内容"
                                      resize="none"
                                      :rows="6"
                                      v-model="newFavorite.description"></el-input>
                        </el-form-item>
                        <el-form-item label="私密">
                            <el-radio-group v-model="newFavorite.isPublic">
                                <el-radio :label="true">公开(所有人可见)</el-radio>
                                <el-radio :label="false">私密(只有你可以查看这个收藏夹)</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-form>
                </div>
            </template>
            <template v-slot:footer>
                <div class="new-footer">
                    <el-button @click="newDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="createFavorite">确 定</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script>
    import FavoriteList from "@/views/uc/favorite/FavoriteList";

    export default {
        name: "Favorite",
        data() {
            return {
                favorites: [
                    {
                        id: 1,
                        name: '用户管理',
                        count: 11,
                        isPublic: true,
                        description: '',
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
                                },
                                isChecked: false
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
                                },
                                isChecked: false
                            }
                        ]
                    },
                    {
                        id: 2,
                        name: '配置管理',
                        count: 9,
                        isPublic: true,
                        description: '',
                        invitations: [
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
                                },
                                isChecked: false
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
                                },
                                isChecked: false
                            }
                        ]
                    },
                    {
                        id: 3,
                        name: '角色管理',
                        count: 8,
                        isPublic: true,
                        description: '',
                        invitations: [
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
                                },
                                isChecked: false
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
                                },
                                isChecked: false
                            }
                        ],
                    },
                    {
                        id: 4,
                        name: '定时任务补偿',
                        count: 15,
                        isPublic: true,
                        description: '',
                        invitations: [
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
                                },
                                isChecked: false
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
                                },
                                isChecked: false
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
                                },
                                isChecked: false
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
                                },
                                isChecked: false
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
                                },
                                isChecked: false
                            }
                        ]
                    }
                ],
                newDialogVisible: false,
                newFavorite: {
                    name: '',
                    description: '',
                    isPublic: true
                }
            }
        },
        methods: {
            createFavorite() {
                let temp = {
                    id: this.favorites.length + 1,
                    name: this.newFavorite.name,
                    description: this.newFavorite.description,
                    isPublic: this.newFavorite.isPublic,
                    count: 0
                };
                this.favorites.push(temp);
                this.newDialogVisible = false;
                this.$refs['newFavorite'].resetFields();
            },
            editFavorite(index, editFavorite) {
                this.favorites[index] = editFavorite;
            },
            delFavorite(index) {
                this.favorites.splice(index, 1);
            },
            moveToFavorite(src, target, srcFavorite, favorites) {
                for (let index of srcFavorite) {
                    this.favorites[src].invitations.splice(index, 1);
                }
                for (let favorite of favorites) {
                    this.favorites[target].invitations.push(favorite);
                }
            },
            cancelFavorite(index, temp) {
                this.favorites[index].invitations = temp;
            }
        },
        components: {
            FavoriteList
        }
    }
</script>

<style scoped>
    .favorite-header {
        font-size: 20px;
        font-weight: 700;
        color: #3d3d3d;
        height: 90px;
        line-height: 90px;
        border-bottom: 1px solid #e0e0e0;
        margin-top: 0;
        margin-bottom: 0;
    }

    .new-header {
        border-bottom: 1px solid #e0e0e0;
        font-size: 16px;
        color: #000000;
        line-height: 54px;
        padding: 0 16px;
    }

    .new-body {
        padding: 5px 16px;
    }
</style>

<style>
    .new .el-dialog__header {
        padding: 0;
    }

    .new .el-dialog__body {
        padding: 0;
    }
</style>
