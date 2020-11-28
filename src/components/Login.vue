<template>
    <div class="container">
        <Header></Header>
        <div class="loginBox">
            <el-form
                    label-position="top"
                    :model="formData"
                    :rules="loginRules"
                    ref="loginForm"
            >
                <el-form-item label="邮箱"  prop="email">
                    <el-input  type="text" v-model="formData.email"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="formData.password"></el-input>
                </el-form-item>
                <el-button type="primary" size="large" @click="signIn">登录</el-button>
            </el-form>
        </div>
    </div>
</template>

<script>
    import Header from './common/Header'
    import { getLogin } from '../servers/getData'
    export default {
        name: "",
        data() {
            const passRule = (rule,value,callback) => {

                if(value.trim() == '') {
                    callback(new Error('输入内容不能为空'))
                }

                if(value.length < 6 || value.length > 12) {
                    callback(new Error('密码在6到12位之间'))
                }else {
                    callback()
                }
            };
            const emailRule = (rule, value , callback) => {

                if (value.trim() == '') {
                    callback(new Error('输入内容不能为空'))
                }
                let reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
                if (!reg.test(value)) {
                    callback(new Error('邮箱格式不正确'))
                } else {
                    callback()
                }
            }
          return {
              formData: {
                  email: '',
                  password: ''
              },
              loginRules: {
                  email: [
                      { validator: emailRule, trigger: 'blur'}
                  ],
                  password: [
                      { validator: passRule, trigger: 'blur'}
                  ]

              }
          }
        },
        components: {
            Header
        },
        methods: {
             signIn() {
                // console.log(this.formData)
                this.$refs.loginForm.validate( async valid => {
                    if(!valid) return
                   const res = await getLogin('/login', this.formData)
                    if(res.state == 200) {
                        sessionStorage.setItem('token',res.token)
                        this.$message.success(res.msg)
                        this.$router.push('/admin')
                    }
                })
            }

        }
    }
</script>

<style scoped lang="less">
@import '../assets/common.less';
    .container {
        position: relative;
        width: 100%;
        height: 100%;
    }
    .loginBox {
        .wh(460px, 300px);
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        border: 1px solid #e4e4e4;
        box-shadow: 2px 2px 5px rgba(0,0,0,0.6);
          Form {
              margin-top: 30px;
              padding: 0 30px;
              Input {
                  width: 100%;
                  outline: none;
              }
              Button {
                  float: right;
              }
          }

    }
</style>
