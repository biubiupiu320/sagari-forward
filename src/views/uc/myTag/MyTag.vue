<template>
    <div class="tag" v-loading="isLoading">
        <div class="tag-header">
            <h3>我的标签</h3>
        </div>
        <div class="tag-body">
            <el-collapse accordion>
                <el-collapse-item v-for="(item, index1) in category">
                    <template v-slot:title>
                        <span class="left">{{item.title}}</span>
                        <span class="right">共{{item.tags.length}}个相关标签</span>
                    </template>
                    <template v-slot:default>
                        <div class="tags">
                            <ul>
                                <li v-for="(tag, index2) in item.tags">
                                    <span>{{tag.title}}</span>
                                    <span style="float: right">
                                        <el-button size="small"
                                                   v-if="tag.follow"
                                                   @click="toggleFollow(index1, index2)">已关注</el-button>
                                        <el-button size="small"
                                                   type="primary"
                                                   v-else
                                                   @click="toggleFollow(index1, index2)">关注</el-button>
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </template>
                </el-collapse-item>
            </el-collapse>
        </div>
    </div>
</template>

<script>
    import axios from "axios";

    let sessionId = localStorage.getItem("xxl-sso-session-id");
    axios.defaults.headers.common['xxl-sso-session-id'] = sessionId;

    export default {
        name: "MyTag",
        created() {
            this.isLoading = true;
            axios.get('http://localhost/tag/getTag').then(res => {
                let result = res.data;
                if (result.code === 200) {
                    console.log(result.data.category)
                    this.category = result.data.category;
                }
                this.isLoading = false;
            }).catch(err => {
                this.$message({
                    message: '服务器打了个盹，请刷新重试',
                    type: 'error',
                    center: true,
                    offset: 100
                });
                this.isLoading = false;
            });
        },
        data() {
            return {
                category: [],
                isLoading: false
            }
        },
        methods: {
            toggleFollow(index1, index2) {
                let tag = this.category[index1].tags[index2];
                let tagId = tag.id;
                axios.post('http://localhost/tag/toggleFollowTag?tagId=' + tagId).then(res => {
                    let result = res.data;
                    if (result.code === 200) {
                        tag.follow = !tag.follow;
                    }
                }).catch(err => {
                    this.$message({
                        message: '服务器打了个盹，请再试一次吧',
                        type: 'error',
                        center: true,
                        offset: 100
                    });
                });
            }
        }
    }
</script>

<style scoped>
    .tag {
        padding-bottom: 30px;
    }

    .tag-header h3 {
        font-size: 20px;
        color: #3d3d3d;
        height: 90px;
        line-height: 90px;
        border-bottom: 1px solid #e0e0e0;
        margin-top: 0;
        margin-bottom: 0;
    }

    .tag-body {
    }

    .tag-body .el-collapse {
        border-top: none;
    }

    .tag-body .el-collapse .el-collapse-item .el-collapse-item__header .left {
        font-size: 16px;
        color: #3d3d3d;
    }

    .tag-body .el-collapse .el-collapse-item .el-collapse-item__header .right {
        font-size: 12px;
        color: #999999;
        margin-left: 16px;
    }

    .tags ul, .tags li {
        padding: 0;
        margin: 0;
        list-style: none;
    }

    .tags ul li {
        width: 25%;
        display: inline-block;
        line-height: 36px;
        margin-right: 35px;
        margin-bottom: 8px;
        padding: 8px 16px;
        position: relative;
        background: #fff;
        -webkit-box-shadow: 0 1px 2px 0 rgba(0,0,0,.1);
        box-shadow: 0 1px 2px 0 rgba(0,0,0,.1);
        border-radius: 4px;
    }

    .tags ul li span {
        font-size: 14px;
        color: #3D3D3D;
    }
</style>
