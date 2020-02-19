<template>
    <div class="login-container" v-if="!this.$route.query.isReload">
        <Header :status="headerStatus"></Header>
        <div class="login-section">
            <div class="login-content">
                <el-form
                        ref="loginForm"
                        :model="loginForm"
                        :rules="loginRules"
                        class="login-form"
                        autocomplete="on"
                        label-position="left"
                >
                    <div class="title-container">
                        <h3 class="title">
                            账号登陆
                        </h3>
                    </div>

                    <el-form-item prop="username">
            <span class="svg-container">
              <svg-icon name="user"/>
            </span>
                        <el-input
                                class="login-input"
                                ref="username"
                                v-model="loginForm.username"
                                placeholder="登陆账户"
                                name="username"
                                type="text"
                                autocomplete="on"
                        />
                    </el-form-item>

                    <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon name="password"/>
        </span>
                        <el-input
                                class="login-input"
                                :key="passwordType"
                                ref="password"
                                v-model="loginForm.password"
                                :type="passwordType"
                                placeholder="密码"
                                name="password"
                                autocomplete="on"
                                @keyup.enter.native="handleLogin"
                        />
                        <span
                                class="show-pwd"
                                @click="showPwd"
                        >
          <svg-icon :name="passwordType === 'password' ? 'eye-off' : 'eye-on'"/>
        </span>
                    </el-form-item>

                    <el-button
                            class="login-button"
                            :loading="loading"
                            type="primary"
                            @click.native.prevent="handleLogin"
                    >
                        登陆
                    </el-button>
                </el-form>
            </div>

        </div>
        <Footer></Footer>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'
    import {Form as ElForm, Input} from 'element-ui'
    import Header from '@/components/Header/index.vue'
    import Footer from '@/components/Footer/index.vue'

    @Component({
        name: 'Login',
        components: {
            Header,
            Footer
        }
    })

    export default class Login extends Vue {
        $refs: any = {
            codeImg: HTMLImageElement,
        }

        created() {
            console.log(this.$refs.codeImg)
        }

        validatePassword = (rule: any, value: string, callback: Function) => {
            if (value.length < 1) {
                callback(new Error('密码长度不少于5位数'))
            } else {
                callback()
            }
        }

        private loginBg = require('@/assets/login/login-bg.png')
        private headerStatus: string = 'Login'

        private loginForm: any = {
            username: '',
            password: '',
            validCode: '',
            deviceId: '',
        }

        private loginRules = {
            username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
            password: [{validator: this.validatePassword, trigger: 'blur'}]
        }
        private passwordType = 'password'
        private loading = false
        private showDialog = false
        private redirect?: string

        mounted() {
            if (this.loginForm.username === '') {
                (this.$refs.username as Input).focus()
            } else if (this.loginForm.password === '') {
                (this.$refs.password as Input).focus()
            }
        }

        private showPwd() {
            if (this.passwordType === 'password') {
                this.passwordType = ''
            } else {
                this.passwordType = 'password'
            }
            this.$nextTick(() => {
                (this.$refs.password as Input).focus();
            });
        }

        private handleLogin() {

        }
    }
</script>

<style lang="scss" scoped>

    .login-container {
        .el-input {
            display: inline-block;
            height: 47px;
            width: 85%;

            .el-input__inner {
                height: 47px;
                background: transparent;
                border: 0px !important;
                border-radius: 0px;
                padding: 12px 5px 12px 15px;
                -webkit-appearance: none;

                &:-webkit-autofill {
                    -webkit-text-fill-color: #fff !important;
                }
            }
        }

        .el-form-item {
            border-bottom: 1px solid #EEEEEE;
            color: #454545;
        }
    }
</style>

<style lang="scss" scoped>
    .login-container {
        height: 100%;
        width: 100%;
        overflow: hidden;

        .login-section {
            background: url("../assets/login/login-bg.png");
            background-repeat: no-repeat;
            background-size: cover;
            width: 100%;
            height: 640px;
            .login-content {
                width: 1360px;
                height: 640px;
                margin: 0 auto;
                position: relative;
            }
            .login-form {
                position: absolute;
                width: 420px;
                height: 360px;
                right: 0px;
                top: 50%;
                margin-top: -180px;
                background-color: #FFF;
                border-radius: 5px;
                box-shadow: 0 2px 12px 0 #2b2f3a;
                padding: 10px 50px;
                .login-button {
                    width: 100%;
                    margin-bottom: 30px;
                    background-color: #03A9F4;
                    border-color: #03A9F4;
                    border-radius: 0;
                }
            }
        }

        .tips {
            font-size: 14px;
            color: #fff;
            margin-bottom: 10px;

            span {
                &:first-of-type {
                    margin-right: 16px;
                }
            }
        }

        .svg-container {
            padding: 6px 5px 6px 15px;
            vertical-align: middle;
            width: 30px;
            display: inline-block;
        }

        .title-container {
            position: relative;

            .title {
                font-size: 26px;
                color: #4A4A4A;
                margin: 0px auto 10px auto;
                text-align: center;
                font-weight: 400;
            }

            .set-language {
                color: #fff;
                position: absolute;
                top: 3px;
                font-size: 18px;
                right: 0px;
                cursor: pointer;
            }
        }

        .show-pwd {
            position: absolute;
            right: 10px;
            top: 7px;
            font-size: 16px;
            cursor: pointer;
            user-select: none;
        }

        .thirdparty-button {
            position: absolute;
            right: 0;
            bottom: 6px;
        }

        @media only screen and (max-width: 470px) {
            .thirdparty-button {
                display: none;
            }
        }
    }
</style>
