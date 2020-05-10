<template>
    <div class="private-letter">
        <el-row>
            <el-col :span="8">
                <div class="private-letter-left">
                    <div class="private-letter-left-header">
                        <el-link :underline="false" class="blogger-avatar">
                            <el-avatar :size="48" :src="user.avatar">
                                <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
                            </el-avatar>
                        </el-link>
                        <span class="blogger-name">{{user.username}}</span>
                        <span class="setting">
                            <el-button type="text" icon="el-icon-setting"></el-button>
                        </span>
                    </div>
                    <div class="private-letter-left-body">
                        <div class="letter-list">
                            <ul>
                                <li :class="{'active': activeIndex === index}"
                                    v-for="(item,index) in persons"
                                    @click="handleSelect(index)">
                                    <div class="letter-left">
                                        <el-link :underline="false">
                                            <el-avatar :size="48" :src="item.toAvatar">
                                                <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
                                            </el-avatar>
                                        </el-link>
                                    </div>
                                    <div class="letter-right">
                                        <div>
                                            <span class="letter-name">{{item.toUsername}}</span>
                                            <span class="letter-time">{{item.createTime | letter}}</span>
                                        </div>
                                        <div class="letter-content">{{item.msg}}</div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </el-col>
            <el-col :span="16" style="height: 100%;display: inline-block">
                <div class="private-letter-right" v-if="persons.length !== 0 && activeIndex !== -1">
                    <div class="private-letter-right-header">{{persons[activeIndex].toUsername}}</div>
                    <div class="private-letter-right-body" id="letter-body">
                        <div style="text-align: center">
                            <el-button type="text"
                                       icon="el-icon-time"
                                       :loading="isLoading"
                                       @click="loadMore">查看更多消息</el-button>
                        </div>
                        <div v-for="(item, index) in message">
                            <!--<div class="msg-time" v-if="item.type === 'center'">{{item.createTime | letter}}</div>-->
                            <div class="msg-left" v-if="item.fromId !== user.id">
                                <el-link :underline="false">
                                    <el-avatar :size="32" :src="persons[activeIndex].toAvatar">
                                        <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
                                    </el-avatar>
                                </el-link>
                                <span class="msg-content"
                                      :title="item.createTime | letter">
                                    {{item.msg}}
                                    <el-image v-for="url in item.urls"
                                              :src="url"
                                              :preview-src-list="item.urls">
                                    </el-image>
                                </span>
                                <div style="clear: both"></div>
                            </div>
                            <div class="msg-right" v-if="item.fromId === user.id">
                                <el-link :underline="false">
                                    <el-avatar :size="32" :src="user.avatar">
                                        <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
                                    </el-avatar>
                                </el-link>
                                <span class="msg-content"
                                      :title="item.createTime | letter">
                                    {{item.msg}}
                                    <el-image v-for="url in item.urls"
                                              :src="url"
                                              :preview-src-list="item.urls">
                                    </el-image>
                                </span>
                                <el-button type="text"
                                           icon="el-icon-warning-outline"
                                           class="msg-status"
                                           title="点击重新发送"
                                           v-show="item.status === 0"
                                           @click="reSend(index)"></el-button>
                                <i class="el-icon-loading msg-status"
                                   v-show="item.status === 1"
                                   title="发送中..."></i>
                            </div>
                            <div style="clear: both"></div>
                        </div>
                    </div>
                    <div v-if="fileList.length !== 0" class="image-list">
                        <div class="image-list-item" v-for="item in previewList">
                            <el-image :src="item"
                                      :preview-src-list="previewList"
                                      fit="fill">
                            </el-image>
                        </div>
                        <el-button type="primary"
                                   size="mini"
                                   style="float: right;margin-right: 5px"
                                   @click="handleUpload">发送</el-button>
                    </div>
                    <div class="private-letter-right-footer">
                        <div class="btn-list">
                            <el-upload class="upload-btn"
                                       action="#"
                                       ref="upload"
                                       multiple
                                       :limit="10"
                                       :show-file-list="false"
                                       :auto-upload="false"
                                       :on-change="handleChange"
                                       :on-exceed="checkImgCount"
                                       :http-request="handleUpload">
                                <el-button size="mini" type="text" icon="el-icon-picture"></el-button>
                            </el-upload>
                        </div>
                        <textarea autofocus="autofocus"
                                  maxlength="500"
                                  class="msg"
                                  v-model="text"
                                  @keydown="operate"></textarea>
                        <div class="tips">按下Enter键发送，Shift+Enter换行</div>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import {request} from "@/network/request";

    export default {
        name: "PrivateLetter",
        data() {
            return {
                message: [],
                text: '',
                webSocket: null,
                user: {},
                persons: [],
                activeIndex: -1,
                isLoading: false,
                fileList: [],
                previewList: []
            }
        },
        created() {
            setTimeout(() => {
                this.user = this.$store.getters.getUser;
                this.createSocket();
                this.handleSelect(this.activeIndex);
            }, 500);
            request({
                url: "/interactive/getPersonList",
                method: "GET",
                params: {
                    page: 1,
                    size: 10
                }
            }).then(res => {
                let result = res.data;
                if (result.code === 200) {
                    this.persons = result.data.list;
                    for (let person of this.persons) {
                        this.$set(person, 'page', 1);
                        this.$set(person, 'size', 10);
                        if (person.msg.indexOf("http://sagari.oss") !== -1) {
                            person.msg = "[图片]"
                        }
                    }
                    let newPerson = this.$route.params.person;
                    if (newPerson !== undefined) {
                        let personsIds = this.persons.map(item => item.id);
                        let index = personsIds.indexOf(newPerson.id);
                        if (index !== -1) {
                            this.handleSelect(index);
                        } else {
                            this.persons.unshift(newPerson);
                            this.handleSelect(0);
                        }
                    }
                }
            }).catch(err => {

            });
        },
        methods: {
            createSocket() {
                this.webSocket = new WebSocket("ws://39.97.162.33:8400/letter/" + this.user.id);
                this.webSocket.onopen = () => {
                    console.log("socket连接已经建立")
                }
                this.webSocket.onmessage = () => {
                    let data = JSON.parse(event.data);
                    if (data.status === 2) {
                        if (this.user.id === data.fromId) {
                            this.message[data.index - 1].status = 2;
                        } else {
                            this.message.push(this.handleDataSingle(data));
                        }
                        this.scrollBottom();
                    } else {
                        if (this.user.id === data.fromId) {
                            this.$message({
                                message: '发送失败',
                                type: 'error',
                                center: true,
                                offset: 100
                            });
                        }
                    }
                    if (this.user.id !== data.fromId) {
                        this.notice(data);
                    }
                }
                this.webSocket.onclose = () => {
                    console.log("socket连接已经关闭");
                }
            },
            operate() {
                if (event.shiftKey && event.keyCode === 13) {
                    this.text += '\n';
                } else if (event.keyCode === 13) {
                    let data = {
                        index: this.message.length + 1,
                        msg: this.text,
                        fromId: this.user.id,
                        fromUsername: this.user.username,
                        fromAvatar: this.user.avatar,
                        toId: this.persons[this.activeIndex].toId,
                        status: 1
                    }
                    this.message.push(data);
                    this.scrollBottom();
                    this.webSocket.send(JSON.stringify(data));
                    this.text = '';
                    event.preventDefault();
                }
            },
            checkImgCount(files, fileList) {
                if (files.length > 10) {
                    this.$message({
                        type    : 'error',
                        message : '每条消息最多只能发送10张图片！',
                        offset  : 100
                    })
                }
            },
            scrollBottom() {
                this.$nextTick(function() {
                    let div = document.getElementById('letter-body');
                    div.scrollTop = div.scrollHeight;
                });
            },
            handleSelect(index) {
                if (this.activeIndex !== index) {
                    this.activeIndex = index;
                    let toId = this.persons[index].toId;
                    let size = this.persons[index].page * this.persons[index].size;
                    this.message = [];
                    this.getLetters(toId, 0, size);
                    this.scrollBottom();
                }
            },
            notice(data) {
                this.$notify({
                    title: data.fromUsername,
                    message: data.msg,
                    offset: 100
                });
            },
            getLetters(toId, page, size) {
                request({
                    url: "/interactive/getLetters",
                    method: "GET",
                    params: {
                        toId,
                        page,
                        size
                    }
                }).then(res => {
                    let result = res.data;
                    if (result.code === 200) {
                        if (this.message.length === 0) {
                            this.message = result.data.list.reverse();
                        } else {
                            let temps = result.data.list;
                            for (const temp of temps) {
                                this.message.unshift(temp);
                            }
                        }
                        this.persons[this.activeIndex].page++;
                        this.handleData();
                    }
                    this.isLoading = false;
                }).catch(err => {
                    this.isLoading = false;
                });
            },
            loadMore() {
                this.isLoading = true;
                let toId = this.persons[this.activeIndex].toId;
                let page = this.persons[this.activeIndex].page;
                let size = this.persons[this.activeIndex].size;
                this.getLetters(toId, page, size);
            },
            handleChange(file, fileList) {
                this.fileList = fileList;
                this.previewList = [];
                for (let item of this.fileList) {
                    this.previewList.push(URL.createObjectURL(item.raw));
                }
            },
            handleUpload() {
                let fileData = new FormData();
                for (let file of this.fileList) {
                    fileData.append('file', file.raw);
                }
                request({
                    url: "/file/upload-batch",
                    method: "POST",
                    data: fileData
                }).then(res => {
                    let result = res.data;
                    let msg = "";
                    if (result.code === 200) {
                        let urls = result.data.urls;
                        for (const url of urls) {
                            msg += url + ",";
                        }
                        let data = {
                            msg,
                            fromId: this.user.id,
                            fromUsername: this.user.username,
                            fromAvatar: this.user.avatar,
                            toId: this.persons[this.activeIndex].toId,
                            status: 1,
                        }
                        this.webSocket.send(JSON.stringify(data));
                        this.fileList = [];
                        this.previewList = [];
                    }
                }).catch(err => {

                });
            },
            handleData() {
                for (let item of this.message) {
                    if (item.urls === undefined || item.urls.length === 0) {
                        this.$set(item, "urls", []);
                    }
                    let msg = item.msg;
                    if (msg.indexOf("http://sagari.oss") !== -1) {
                        let urls = msg.split(",");
                        for (let url of urls) {
                            item.urls.push(url);
                        }
                        item.msg = "";
                    }
                }
            },
            handleDataSingle(data) {
                if (data.urls === undefined || data.urls.length === 0) {
                    this.$set(data, "urls", []);
                }
                let msg = data.msg;
                if (msg.indexOf("http://sagari.oss") !== -1) {
                    let urls = msg.split(",");
                    for (let url of urls) {
                        data.urls.push(url);
                    }
                    data.msg = "";
                }
                return data;
            },
            reSend(index) {
                let data = this.message[index];
                data.status = 1;
                this.message.splice(index, 1);
                this.message.push(data);
                this.scrollBottom();
                this.webSocket.send(JSON.stringify(data));
            }
        }
    }
</script>

<style scoped>
    .private-letter {
        margin: 0 -32px -30px;
    }

    .private-letter-left {
        background-color: #3D3D3D;
    }

    .private-letter-left-header {
        background-color: #2e2e2e;
        border-bottom: 1px solid #666;
    }

    .blogger-name {
        color: #fff;
        font-size: 16px;
        line-height: 72px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }

    .blogger-avatar {
        margin: 12px 10px 0 14px;
        float: left;
    }

    .setting {
        float: right;
        margin: 11px 10px 0 14px;
    }

    .letter-list {
        height: 550px;
        overflow-y: scroll;
        scrollbar-width: none;
        -ms-overflow-style: none;
        overflow: -moz-scrollbars-none;
    }

    .letter-list::-webkit-scrollbar {
        width: 0;
        height: 0;
    }

    .letter-list ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .letter-list ul li {
        padding: 16px;
        cursor: pointer;
        border-bottom: 1px solid #2E2E2E;
    }

    .letter-list ul li:hover {
        background-color: #2e2e2e;
    }

    .letter-list ul .active {
        background-color: #2e2e2e;
    }

    .letter-left {
        width: 48px;
        height: 52px;
        margin-right: 12px;
        display: inline-block;
    }

    .letter-right {
        display: inline-block;
        line-height: 22px;
        vertical-align: middle;
        width: calc(100% - 64px);
    }

    .letter-name {
        color: #ffffff;
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .letter-content {
        font-size: 14px;
        color: #999999;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .letter-time {
        font-size: 12px;
        color: #999999;
        float: right;
    }

    .private-letter-right {
        height: 100%;
        background-color: #ffffff;
    }

    .private-letter-right-header {
        font-size: 16px;
        color: #3D3D3D;
        line-height: 64px;
        padding-left: 24px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        border-bottom: 1px solid #EBEBEB;
    }

    .private-letter-right-body {
        height: calc(100% - 266px);
        min-height: 350px;
        max-height: 350px;
        padding: 10px 3%;
        overflow-y: scroll;
        scrollbar-width: none;
        -ms-overflow-style: none;
        overflow: -moz-scrollbars-none;
    }

    .private-letter-right-body::-webkit-scrollbar {
        width: 0;
        height: 0;
    }

    .private-letter-right-footer {
        width: 100%;
        height: 180px;
        border-top: 1px solid #EBEBEB;
    }

    .msg {
        resize: none;
        display: block;
        width: 100%;
        padding: 8px;
        height: 110px;
        border: none;
        outline: none;
        box-sizing: border-box;
        font: 14px/1.5 Helvetica, Arial, Tahoma, 'å¾®è½¯é›…é»‘';
        overflow-y: auto;
        scrollbar-width: none;
        -ms-overflow-style: none;
        overflow: -moz-scrollbars-none;
    }

    .msg::-webkit-scrollbar {
        width: 0;
        height: 0;
    }

    .tips {
        padding: 0 24px;
        text-align: right;
        color: #CCCCCC;
        font-size: 12px;
        line-height: 40px;
    }

    .msg-time {
        text-align: center;
        font-size: 12px;
        color: #CCCCCC;
        line-height: 30px;
        margin-top: 15px;
    }

    .msg-left {
        margin-top: 15px;
        width: 80%;
    }

    .msg-right {
        position: relative;
        margin-top: 15px;
        max-width: 80%;
        float: right;
    }

    .msg-left .el-link {
        width: 32px;
        margin-right: 14px;
        float: left;
    }

    .msg-right .el-link {
        width: 32px;
        margin-left: 14px;
        float: right;
    }

    .msg-content {
        float: left;
        border-radius: 8px;
        border: 1px solid #eee;
        color: #6b8299;
        max-width: 75%;
        background: #eaeeef;
        -webkit-box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1), 0 1px 1px rgba(0, 0, 0, 0.06);
        -moz-box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1), 0 1px 1px rgba(0, 0, 0, 0.06);
        box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1), 0 1px 1px rgba(0, 0, 0, 0.06);
        padding: 7px 12px;
        font-size: 14px;
        position: relative;
        word-break: break-all;
        word-wrap: break-word;
    }

    .msg-right .msg-content {
        float: right;
    }

    .msg-content:before, .msg-content:after {
        border-right: 10px solid #eaeeef;
        content: ' ';
        position: absolute;
        top: 11px;
        right: 100%;
        border-top: 5px solid transparent;
        border-bottom: 5px solid transparent;
        width: 0;
        height: 0;
    }

    .msg-right .msg-content:before, .msg-right .msg-content:after {
        border-right: none;
        border-left: 10px solid #eaeeef;
        left: 100%;
    }

    .btn-list {
        padding: 0 12px;
        height: 30px;
        line-height: 30px;
    }

    .btn-list .el-button {
        padding: 0;
    }

    .btn-list .iconfont {
        color: #999999;
        font-size: 18px;
    }

    .emoji-table {
        border-collapse: collapse;
        border: none;
    }

    .emoji-table td {
        width: 42px;
        height: 42px;
        padding: 0;
        text-align: center;
        border: 1px solid #000000;
    }

    .emoji-table td:hover {
        background-color: #ccc;
        cursor: pointer;
    }

    .emoji-table td img {
        width: 24px;
        height: 24px;
        margin: auto;
    }

    .upload-btn {
        display: inline-block;
    }

    .msg-status {
        position: absolute;
        padding: 0;
        bottom: 0;
        left: -20px;
    }


    .image-list {
        border-top: 1px solid #EBEBEB;
        height: 50px;
        padding: 5px 0;
        background-color: white;
        overflow-y: scroll;
        scrollbar-width: none;
        -ms-overflow-style: none;
        overflow: -moz-scrollbars-none;
    }

    .image-list-item {
        height: 100%;
        max-width: 40%;
        margin-left: 5px;
        display: inline-block;
        border: 1px solid #eff2f6;
        border-radius: 2px;
        box-sizing: border-box;
        vertical-align: top;
    }
</style>

<style>
    .setting .el-button i {
        font-size: 24px;
        color: #999999;
    }

    .setting .el-button i:hover {
        color: #40e9ef;
    }

    .btn-list .el-button i {
        color: #999999;
        font-size: 18px;
    }

    .emoji-panel {
        height: 400px;
        overflow-y: scroll;
        scrollbar-width: none;
        -ms-overflow-style: none;
        overflow: -moz-scrollbars-none;
    }

    .emoji-panel::-webkit-scrollbar {
        width: 0;
        height: 0;
    }

    .emoji {
        width: 16px;
        height: 16px;
        margin: 0 1px;
    }

    .letter-img {
        max-width: 100%;
        margin-right: 5px;
    }

    .msg-status .el-icon-warning-outline {
        color: red;
    }

    .image-list-item .el-image {
        width: 100%;
        height: 100%;
    }
</style>
