<template>
    <div class="user-fans">
        <ul class="user-fans-list">
            <li class="user-fans-item">
                <el-link :underline="false">
                    <el-avatar :size="48" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png">
                        <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
                    </el-avatar>
                </el-link>
                <span class="user-fans-item-nickname">
                    <el-link>嘻嘻</el-link>
                </span>
                <span class="user-fans-item-btn">
                    <el-button type="primary" size="small">关注</el-button>
                    <el-button size="small" icon="el-icon-check">已关注</el-button>
                </span>
            </li>
            <li class="user-fans-item">
                <el-link :underline="false">
                    <el-avatar :size="48" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png">
                        <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
                    </el-avatar>
                </el-link>
                <span class="user-fans-item-nickname">
                    <el-link>嘻嘻</el-link>
                </span>
                <span class="user-fans-item-btn">
                    <el-button type="primary" size="small">关注</el-button>
                    <el-button size="small" icon="el-icon-check">已关注</el-button>
                </span>
            </li>
            <li class="user-fans-item">
                <el-link :underline="false">
                    <el-avatar :size="48" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png">
                        <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
                    </el-avatar>
                </el-link>
                <span class="user-fans-item-nickname">
                    <el-link>嘻嘻</el-link>
                </span>
                <span class="user-fans-item-btn">
                    <el-button type="primary" size="small">关注</el-button>
                    <el-button size="small" icon="el-icon-check">已关注</el-button>
                </span>
            </li>
            <li class="user-fans-item">
                <el-link :underline="false">
                    <el-avatar :size="48" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png">
                        <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
                    </el-avatar>
                </el-link>
                <span class="user-fans-item-nickname">
                    <el-link>嘻嘻</el-link>
                </span>
                <span class="user-fans-item-btn">
                    <el-button type="primary" size="small">关注</el-button>
                    <el-button size="small" icon="el-icon-check">已关注</el-button>
                </span>
            </li>
            <li class="user-fans-item">
                <el-link :underline="false">
                    <el-avatar :size="48" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png">
                        <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
                    </el-avatar>
                </el-link>
                <span class="user-fans-item-nickname">
                    <el-link>嘻嘻</el-link>
                </span>
                <span class="user-fans-item-btn">
                    <el-button type="primary" size="small">关注</el-button>
                    <el-button size="small" icon="el-icon-check">已关注</el-button>
                </span>
            </li>
        </ul>
        <div class="user-fans-pagination">
            <el-pagination
                :background="true"
                layout="prev, pager, next"
                :total="50">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Fans",
        created() {
            console.log('fans created')
        }
    }
</script>

<style scoped>
    .user-fans-list {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .user-fans-item {
        padding: 16px 0 18px;
        border-bottom: 1px solid #f5f6f7;
    }

    .user-fans-item-nickname .el-link {
        font-weight: 700;
        margin-left: 24px;
        font-size: 16px;
        color: #333333;
    }

    .user-fans-item-nickname .el-link:hover {
        color: #409eff;
    }

    .user-fans-item-btn {
        position: relative;
        float: right;
        top: 10px;
    }

    .user-fans-pagination {
        margin: 30px 0;
        text-align: center;
    }
</style>
