<template>
    <div class="ban-record">
        <div class="ban-record-table">
            <el-table :data="records"
                      :cell-style="{'text-align': 'center'}"
                      :header-cell-style="{'text-align': 'center'}"
                      stripe
                      style="width: 100%">
                <el-table-column type="index"
                                 label="序号"
                                 width="100">
                </el-table-column>
                <el-table-column prop="reason"
                                 label="封禁原因"
                                 width="180">
                </el-table-column>
                <el-table-column prop="startTime"
                                 label="起始时间"
                                 width="180">
                    <template slot-scope="scope">{{scope.row.startTime | formatTime}}</template>
                </el-table-column>
                <el-table-column prop="endTime"
                                 label="结束时间"
                                 width="180">
                    <template slot-scope="scope">{{scope.row.endTime | formatTime}}</template>
                </el-table-column>
                <el-table-column prop="active"
                                 label="封禁状态">
                    <template slot-scope="scope">{{scope.row.active | banStatus}}</template>
                </el-table-column>
            </el-table>
        </div>
        <div class="pagination">
            <el-pagination background
                           layout="prev, pager, next"
                           :hide-on-single-page="true"
                           :total="pagination.total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import moment from "moment";

    let sessionId = localStorage.getItem("xxl-sso-session-id");
    axios.defaults.headers.common['xxl-sso-session-id'] = sessionId;

    export default {
        name: "BanRecord",
        created() {
            this.getBanRecord();
        },
        data() {
            return {
                records: [],
                pagination: {
                    total: 0
                }
            }
        },
        methods: {
            getBanRecord(page = 1, size = 10) {
                axios.get("http://localhost/user/getBanRecord", {
                    params: {
                        page,
                        size
                    }
                }).then(res => {
                    let result = res.data;
                    if (result.code === 200) {
                        this.records = result.data.list;
                        delete result.data.list;
                        this.pagination = result.data;
                    }
                });
            }
        },
        filters: {
            formatTime(value) {
                return moment(value).format("YYYY-MM-DD HH:mm:ss")
            },
            banStatus(value) {
                if (value) {
                    return "封禁中";
                } else {
                    return "已解除";
                }
            }
        }
    }
</script>

<style scoped>
    .ban-record {
        min-height: 600px;
    }

    .ban-record ul {
        list-style: none;
        padding: 0;
    }

    .ban-record ul li {
        padding: 16px 0;
        border-bottom: 1px solid #e0e0e0;
    }

    .pagination {
        margin-top: 28px;
        text-align: center;
    }

    .ban-record-table {
        margin-top: 25px;
    }
</style>
