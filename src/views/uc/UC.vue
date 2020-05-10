<template>
    <div class="UC">
        <el-row>
            <el-col :span="3" :offset="5">
                <div class="left-box">
                    <left-nav></left-nav>
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
        created() {
            if (!this.$store.getters.isLogin) {
                this.$router.replace("/sign_in");
            }
        },
        methods: {
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
        padding: 0 32px;
        background-color: #FFFFFF;
    }
</style>

<style>
    body {
        background-color: #f5f6f7;
    }
</style>
