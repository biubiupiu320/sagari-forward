<template>

</template>

<script>
    import {request} from "@/network/request";

    export default {
        name: "QQCallback",
        created() {
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)',
                customClass: 'lock'
            });
            let code = this.$route.query.code;
            request({
                url: "/user/qq_signin",
                method: "GET",
                params: {
                    code
                }
            }).then(res => {
                let result = res.data;
                if (result.code === 200) {
                    localStorage.setItem("xxl-sso-session-id", result.data.sessionId);
                    this.$router.push("/");
                } else if (result.code === 403) {
                    this.$alert(result.msg, "此账号已被封禁", {
                        confirmButtonText: "确定",
                        callback: action => {
                            window.location.href = "/";
                        }
                    });
                } else {
                    this.$router.push({
                        name: "qq_signup",
                        params: {
                            code: this.code,
                            avatar: result.data.figureurl_2,
                            openId: result.data.open_id,
                            username: result.data.nickname,
                            gender: result.data.gender
                        }
                    });
                }
                loading.close();
            }).catch(err => {
                let data = err.response.data;
                if (data.code === 403) {
                    this.$alert(data.msg, "此账号已被封禁", {
                        confirmButtonText: "确定",
                        callback: action => {
                            this.$router.push("/");
                        }
                    });
                }
                loading.close();
            });
        }
    }
</script>

<style scoped>

</style>

<style>
    .lock {
        z-index: 10000 !important;
    }
</style>

