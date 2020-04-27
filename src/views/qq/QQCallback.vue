<template>

</template>

<script>
    import axios from 'axios';

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
            axios.get("http://localhost/user/qq_signin", {
                params: {
                    code,
                }
            }).then(res => {
                let result = res.data;
                console.log(result)
                if (result.code === 200) {
                    localStorage.setItem("xxl-sso-session-id", result.data.sessionId);
                    this.$router.push("/");
                } else if (result.code === 403) {
                    this.$alert(result.msg, "此账号已被封禁", {
                        confirmButtonText: "确定",
                        callback: action => {
                            this.$router.push("/");
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
                console.log(err.response)
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

