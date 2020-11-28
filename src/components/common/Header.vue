<template>
    <div>
        <header>
                <h3>图书管理系统</h3>
                <el-button size="small" v-if="isShow" @click="loginOut">退出</el-button>
        </header>
    </div>
</template>

<script>
    export default {
        name: "Header",
        data() {
            return {
                isShow: ''
            }
        },
        created() {
            this.isShow = window.sessionStorage.getItem('token')

        },
        methods: {
            loginOut() {
                window.sessionStorage.removeItem('token')
                this.$router.push('/login')
            }
        }
    }
</script>

<style scoped lang="less">
    @import '../../assets/common.less';
    header {
        position: relative;
        .wh(100%,60px);
        background-color: #7952B3;
        text-align: center;
        line-height: 60px;
        .cf(#000,24px);
        .el-button {
            position: absolute;
            right: 20px;
            top: 50%;
            margin-top: -20px;
        }
    }
</style>