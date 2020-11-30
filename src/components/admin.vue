<template>
    <el-container class="bookContent">
        <el-header>
            <Header></Header>
        </el-header>
        <div class="content">
            <el-container class="container">
                <el-aside width="200px">
                    <el-menu
                            background-color="#253D55"
                            text-color="#fff"
                            :collapse-transition="false"
                            :default-active="activePath"
                            :router="true"
                    >
                        <el-menu-item
                                v-for="(item,index) in list"
                                :key="item.id"
                                :index="item.path"
                                @click="clickPath(item.path)"
                        >
                            <i :class="icons[index]"></i>
                            <span>{{item.aside_name}}</span>
                        </el-menu-item>

                    </el-menu>

                </el-aside>
                <el-main class="main" :span="20">
                    <router-view></router-view>
                </el-main>
            </el-container>
        </div>
    </el-container>
</template>

<script>
    import Header from './common/Header'
    import {getAside} from "../servers/getData";

    export default {
        name: "",
        data() {
            return {
                list: [],
                icons:['el-icon-reading','el-icon-user-solid'],
                activePath: ''
            }
        },
        components: {
            Header
        },
        async created() {
           // 获取侧边栏
            const res = await getAside('/aside')
            console.log(res)
            this.list = res
        },
        methods: {
            clickPath(path) {
                this.activePath = path
            }
        }
    }
</script>

<style scoped lang="less">
    .el-container {
            height: 100%;
        .el-header {
            padding: 0;
        }
        .content {
            position: absolute;
            width: 100%;
            left: 0;
            top: 60px;
            bottom: 0;
        }
        .el-aside {
            background-color: #253D55;
            overflow: hidden;
            .el-menu {
                width: 201px;
            }

        }
        .is-active {
            background-color: #333!important;
        }
    }
</style>