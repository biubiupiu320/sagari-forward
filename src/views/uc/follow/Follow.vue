<template>
    <div class="follow">
        <div class="follow-header">
            <span>我的关注</span>
            <span class="follow-count">共{{followList.length}}人</span>
            <span style="float: right">
                <el-button size="small" @click="cancelAllFollow">全部取消</el-button>
            </span>
        </div>
        <div class="follow-body">
            <ul>
                <li v-for="(item, index) in followList">
                    <span class="follow-avatar">
                        <el-link :underline="false">
                            <el-avatar :size="50" :src="item.avatar">
                                <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
                            </el-avatar>
                        </el-link>
                    </span>
                    <span class="follow-name">
                        <el-link :underline="false">{{item.name}}</el-link>
                    </span>
                    <span class="follow-btn">
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
        <div class="follow-footer">
            <el-pagination
                layout="prev, pager, next"
                :total="50">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Follow",
        data() {
            return {
                followList: [
                    {
                        id: 1,
                        name: 'Sakura',
                        avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
                        isFollow: true
                    },
                    {
                        id: 2,
                        name: '哟吼',
                        avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
                        isFollow: true
                    }
                ]
            }
        },
        methods: {
            follow(index) {
                this.followList[index].isFollow = true;
            },
            cancelFollow(index) {
                this.followList[index].isFollow = false;
            },
            cancelAllFollow() {
                this.followList = this.followList.map(item => {
                    item.isFollow = false;
                    return item;
                });
            }
        }
    }
</script>

<style scoped>
    .follow-header {
        border-bottom: 1px solid #e0e0e0;
    }

    .follow-count {
        vertical-align: bottom;
        font-weight: 400 !important;
        margin-left: 15px !important;
        font-size: 14px !important;
        color: #4D4D4D !important;
    }

    .follow-header span {
        font-size: 20px;
        font-weight: 700;
        color: #3d3d3d;
        height: 90px;
        line-height: 90px;
        margin-top: 0;
        margin-bottom: 0;
    }

    .follow-body ul, .follow-body li {
        padding: 0;
        margin: 0;
        list-style: none;
    }

    .follow-body ul li:not(:last-child) {
        border-bottom: 1px solid #e0e0e0;
    }

    .follow-avatar {
        margin: 16px 16px 0 0;
    }

    .follow-name .el-link {
        font-size: 16px;
        color: #4D4D4D;
        line-height: 82px;
    }

    .follow-btn {
        float: right;
        margin-top: 25px;
    }

    .follow-footer {
        text-align: center;
        margin-top: 30px;
    }
</style>
