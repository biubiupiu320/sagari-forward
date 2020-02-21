<template>
    <div class="tag">
        <div class="tag-header">
            <h3>我的标签</h3>
        </div>
        <div class="tag-body">
            <el-collapse>
                <el-collapse-item v-for="item in list">
                    <template v-slot:title>
                        <span class="left">{{item.name}}</span>
                        <span class="right">共{{item.tags.length}}个相关标签</span>
                    </template>
                    <template v-slot:default>
                        <div class="tags">
                            <ul>
                                <li v-for="tag in item.tags">
                                    <span>{{tag.name}}</span>
                                    <span style="float: right">
                                        <el-button size="small"
                                                   v-if="tag.isFollow"
                                                   @click="tag.isFollow = false">已关注</el-button>
                                        <el-button size="small"
                                                   type="primary"
                                                   v-else
                                                   @click="tag.isFollow = true">关注</el-button>
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
    export default {
        name: "MyTag",
        data() {
            return {
                list: [
                    {
                        name: '后端',
                        tags: [
                            { name: 'Spring Boot', isFollow: false },
                            { name: 'MySQL', isFollow: false },
                            { name: 'Java', isFollow: false },
                            { name: '架构', isFollow: false },
                            { name: 'ElasticSearch', isFollow: false },
                            { name: 'Linux', isFollow: false },
                            { name: 'Spring', isFollow: false },
                            { name: 'C++', isFollow: false },
                            { name: 'C#/.net/asp', isFollow: false },
                            { name: '分布式', isFollow: false },
                            { name: 'Python', isFollow: false },
                            { name: 'PHP', isFollow: false },
                            { name: 'Go/GoLang', isFollow: false },
                            { name: 'Redis', isFollow: false },
                            { name: 'R', isFollow: false },
                            { name: 'Swift', isFollow: false }
                        ]
                    },
                    {
                        name: 'iOS',
                        tags: [
                            { name: 'RxSwift', isFollow: false },
                            { name: 'Xcode', isFollow: false },
                            { name: 'Swift', isFollow: false },
                            { name: 'React Native', isFollow: false },
                            { name: 'WWDC', isFollow: false },
                            { name: 'Objective-C', isFollow: false },
                            { name: 'Flutter', isFollow: false },
                            { name: 'SwiftUI', isFollow: false },
                            { name: 'CocoaPods', isFollow: false }
                        ]
                    },
                    {
                        name: '安全',
                        tags: [
                            { name: 'Web安全', isFollow: false },
                            { name: '安全架构', isFollow: false },
                            { name: '系统安全', isFollow: false }
                        ]
                    },
                    {
                        name: '运维',
                        tags: [
                            { name: '系统架构', isFollow: false },
                            { name: '运维开发', isFollow: false },
                            { name: '网络', isFollow: false },
                            { name: 'Graylog/ELK', isFollow: false },
                            { name: 'Jenkins', isFollow: false },
                            { name: 'Linux/CentOS', isFollow: false },
                            { name: '安全', isFollow: false },
                            { name: 'Kubernetes/容器', isFollow: false },
                            { name: '自动化/DevOps', isFollow: false }
                        ]
                    },
                    {
                        name: '设计',
                        tags: [
                            { name: '3D', isFollow: false },
                            { name: '平面/illustrator', isFollow: false },
                            { name: 'PhotoShop', isFollow: false },
                            { name: 'Sketch', isFollow: false },
                            { name: '交互', isFollow: false },
                            { name: 'UI/UX', isFollow: false }
                        ]
                    },
                    {
                        name: '大数据',
                        tags: [
                            { name: 'storm', isFollow: false },
                            { name: 'Hadoop', isFollow: false },
                            { name: '数据仓库', isFollow: false },
                            { name: 'hive', isFollow: false },
                            { name: 'Spark', isFollow: false },
                            { name: 'ETL', isFollow: false }
                        ]
                    },
                    {
                        name: '产品/运营',
                        tags: [
                            { name: '内容运营', isFollow: false },
                            { name: '新媒体运营', isFollow: false },
                            { name: '产品运营', isFollow: false },
                            { name: 'Axure/墨刀', isFollow: false },
                            { name: '流量运营', isFollow: false },
                            { name: '用户运营', isFollow: false }
                        ]
                    },
                    {
                        name: '算法',
                        tags: [
                            { name: '集成学习', isFollow: false },
                            { name: '聚类', isFollow: false },
                            { name: '迁移学习', isFollow: false },
                            { name: '分类', isFollow: false },
                            { name: '推荐算法', isFollow: false },
                            { name: '回归', isFollow: false },
                            { name: 'scikit-learn', isFollow: false },
                            { name: 'PyTorch', isFollow: false },
                            { name: 'caffe', isFollow: false },
                            { name: 'Mxnet', isFollow: false },
                            { name: 'TensorFlow', isFollow: false },
                            { name: 'NLP', isFollow: false },
                            { name: '计算机视觉', isFollow: false },
                            { name: '排序算法', isFollow: false }
                        ]
                    },
                    {
                        name: 'Android',
                        tags: [
                            { name: '数据结构', isFollow: false },
                            { name: 'Android Studio', isFollow: false },
                            { name: '性能优化', isFollow: false },
                            { name: '面试', isFollow: false },
                            { name: 'Flutter', isFollow: false },
                            { name: 'Gradle', isFollow: false },
                            { name: 'Java', isFollow: false },
                            { name: 'Android Jetpack', isFollow: false },
                            { name: 'Kotlin', isFollow: false },
                            { name: 'RxJava', isFollow: false }
                        ]
                    },
                    {
                        name: '前端',
                        tags: [
                            { name: 'Flutter', isFollow: false },
                            { name: 'XHTML', isFollow: false },
                            { name: 'Webpack', isFollow: false },
                            { name: 'Node.js', isFollow: false },
                            { name: 'ES6', isFollow: false },
                            { name: 'TypeScript', isFollow: false },
                            { name: 'React.js', isFollow: false },
                            { name: '小程序', isFollow: false },
                            { name: 'Vue.js', isFollow: false },
                            { name: '面试', isFollow: false },
                            { name: 'JavaScript', isFollow: false },
                            { name: 'HTTPS', isFollow: false },
                            { name: '前端框架', isFollow: false }
                        ]
                    },
                    {
                        name: '测试',
                        tags: [
                            { name: '测试用例', isFollow: false },
                            { name: 'selenium', isFollow: false },
                            { name: 'Jira', isFollow: false },
                            { name: 'postman', isFollow: false }
                        ]
                    },
                    {
                        name: '人工智能',
                        tags: [
                            { name: '算法', isFollow: false },
                            { name: '机器学习', isFollow: false },
                            { name: '神经网络', isFollow: false },
                            { name: '视觉/OpenCV', isFollow: false },
                            { name: 'Flink', isFollow: false },
                            { name: '深度学习', isFollow: false },
                            { name: '语音识别', isFollow: false },
                            { name: '数据分析', isFollow: false },
                            { name: '自然语言处理', isFollow: false },
                            { name: 'PyTorch', isFollow: false },
                            { name: 'Python', isFollow: false },
                            { name: 'TensorFlow', isFollow: false },
                            { name: '图像处理', isFollow: false },
                            { name: 'NLP', isFollow: false }
                        ]
                    },
                    {
                        name: '硬件开发',
                        tags: [
                            { name: 'FPGA开发', isFollow: false },
                            { name: 'Arm开发', isFollow: false },
                            { name: '驱动开发', isFollow: false },
                            { name: '单片机', isFollow: false },
                            { name: '精益工程', isFollow: false },
                            { name: '嵌入式硬件', isFollow: false },
                            { name: '材料工程', isFollow: false },
                            { name: 'dsp开发', isFollow: false },
                            { name: '硬件工程', isFollow: false },
                            { name: '基带工程', isFollow: false },
                            { name: '射频工程', isFollow: false },
                            { name: 'PCB工艺', isFollow: false },
                            { name: '硬件架构', isFollow: false }
                        ]
                    },
                    {
                        name: '数据库管理',
                        tags: [
                            { name: 'ETL工程师', isFollow: false },
                            { name: '数据仓库', isFollow: false },
                            { name: 'DBA', isFollow: false },
                            { name: '数据库结构', isFollow: false },
                            { name: '数据库开发', isFollow: false }
                        ]
                    }
                ]
            }
        },
        methods: {

        }
    }
</script>

<style scoped>
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
