<template>
    <div class="container">
        <Header></Header>
        <div class="container">
            <el-row>
                <el-col class="aside" :span="4">
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
                </el-col>
                <el-col class="main" :span="20">
                    <router-view></router-view>
                </el-col>

            </el-row>
        </div>
    </div>
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
    .container {
        height: 100%;
        overflow: hidden;
        .el-row, .el-col, .el-menu{
            height: 100%;
        }
        .is-active {
            background-color: #333!important;
        }
    }
</style>