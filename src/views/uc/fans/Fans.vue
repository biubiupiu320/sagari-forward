<template>
    <div class="fans">
        <div class="fans-header">
            <span>我的粉丝</span>
            <span class="fans-count">共{{fans.length}}人</span>
            <span style="float: right">
                <el-button size="small" @click="removeAll">全部移除</el-button>
            </span>
        </div>
        <div class="fans-body">
            <ul>
                <li v-for="(item, index) in fans">
                    <span class="fans-avatar">
                        <el-link :underline="false">
                            <el-avatar :size="50" :src="item.avatar">
                                <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
                            </el-avatar>
                        </el-link>
                    </span>
                    <span class="fans-name">
                        <el-link :underline="false">{{item.name}}</el-link>
                    </span>
                    <span class="fans-btn">
                        <el-button size="small"
                                   v-if="item.isFans"
                                   @click="remove(index)">移除</el-button>
                        <el-button size="small"
                                   v-if="item.isFollow"
                                   @click="cancelFollow(index)">取消关注</el-button>
                        <el-button type="primary"
                                   size="small"
                                   v-else
                                   @click="follow(index)">关注</el-button>
                    </span>
                </li>
            </ul>
        </div>
        <div class="fans-footer">
            <el-pagination
                layout="prev, pager, next"
                :total="50">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Fans",
        data() {
            return {
                fans: [
                    {
                        id: 1,
                        name: 'Sakura',
                        avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
                        isFans: true,
                        isFollow: false
                    },
                    {
                        id: 2,
                        name: '哟吼',
                        avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
                        isFans: true,
                        isFollow: false
                    }
                ]
            }
        },
        methods: {
            follow(index) {
                this.fans[index].isFollow = true;
            },
            cancelFollow(index) {
                this.fans[index].isFollow = false;
            },
            remove(index) {
                this.fans[index].isFans = false;
                this.fans.splice(index, 1);
            },
            removeAll() {
                this.fans = this.fans.map(item => {
                    item.isFans = false;
                    return item;
                });
                this.fans = [];
            }
        }
    }
</script>

<style scoped>
    .fans-header {
        border-bottom: 1px solid #e0e0e0;
    }

    .fans-count {
        vertical-align: bottom;
        font-weight: 400 !important;
        margin-left: 15px !important;
        font-size: 14px !important;
        color: #4D4D4D !important;
    }

    .fans-header span {
        font-size: 20px;
        font-weight: 700;
        color: #3d3d3d;
        height: 90px;
        line-height: 90px;
        margin-top: 0;
        margin-bottom: 0;
    }

    .fans-body ul, .fans-body li {
        padding: 0;
        margin: 0;
        list-style: none;
    }

    .fans-body ul li:not(:last-child) {
        border-bottom: 1px solid #e0e0e0;
    }

    .fans-avatar {
        margin: 16px 16px 0 0;
    }

    .fans-name .el-link {
        font-size: 16px;
        color: #4D4D4D;
        line-height: 82px;
    }

    .fans-btn {
        float: right;
        margin-top: 25px;
    }

    .fans-footer {
        text-align: center;
        margin-top: 30px;
    }
</style>
