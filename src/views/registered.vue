<template>
    <div class="registered">
        <div class="header">
            <div class="left txt-left">
                <Icon type="ios-arrow-back" @click="backHistory()" />
            </div>
        </div>
        <div class="regster">
            <Modal v-model="modal2" style="width: 3rem">
                <p slot="header" style="color:#f60;text-align:center">
                </p>
                <div style="text-align:center">
                    <img style="width: 1.5rem;" src="../assets/registerSuccess.png">
                    <div style="margin-top: 0.2rem;font-size: 15px;color: red;font-family:sans-serif;"><h2>恭喜您,注册成功！</h2></div>
                </div>

                <div slot="footer">
                    <Button type="error" size="large" long  shape="circle" @click="getLogin">确定</Button>
                </div>
            </Modal>
            <div class="logo">
                <router-link to="/">
                    <img src="../assets/logo.png" />
                </router-link>
            </div>
            <div class="regf">
                <Form ref="formReg" :model="formReg" :rules="ruleInline" inline>
                    <div class="line">
                        <Row type="flex" justify="start" align="middle" class="code-row-bg">
                            <Col  span="20">
                                <FormItem prop="prize">
                                    <Input type="text"  v-model="formReg.prize" placeholder="请输入推荐码">
                                    <img src="../assets/Invitation_code.png" slot="prepend" />
                                    </Input>
                                </FormItem>
                            </Col>
                        </Row>

                    </div>
                    <div class="line">
                        <Row type="flex" justify="start" align="middle" class="code-row-bg">
                            <Col  span="24">
                                <FormItem prop="username">
                                    <Input ref="username" type="text" v-model="formReg.username" placeholder="请输入账号">
                                    <img src="../assets/username.png" slot="prepend" />
                                    </Input>
                                    <div class="pipop-pip myuser" v-if="userMessShow">
                                        账号包含6-16个英文、数字
                                    </div>
                                </FormItem>
                            </Col>
                            <Col span="3" class="abosss">
                                <Icon class="right" v-show="formReg.username!==''" :class="ifRuleIn.username?'txt-green':'txt-red'" :type="ifRuleIn.username?'md-checkmark-circle':'md-close-circle'" />
                            </Col>
                        </Row>

                    </div>
                    <div class="line">
                        <Row type="flex" justify="start" align="middle" class="code-row-bg">
                            <Col  span="22">
                                <FormItem prop="password">
                                    <Input ref="password" :type="pshow?'password':'text'" v-model="formReg.password" placeholder="请输入密码">
                                    <img src="../assets/password.png" slot="prepend" />
                                    </Input>
                                    <div class="pipop-pip mypass" v-if="passMessShow">
                                        密码由6-16位字母和数字组成
                                    </div>
                                </FormItem>
                            </Col>
                            <Col span="3" class="abosss">
                                <Icon  v-show="ifRuleIn.password!==''" class="right" :class="ifRuleIn.password?'txt-green':'txt-red'" :type="ifRuleIn.password?'md-checkmark-circle':'md-close-circle'" />
                                <Icon  class="left txt-ccc" :type="!pshow?'md-eye':'md-eye-off'" @click="pshow = !pshow"/>
                            </Col>
                        </Row>
                    </div>
                    <div class="line">
                        <Row type="flex" justify="start" align="middle" class="code-row-bg">
                            <Col  span="22">
                                <FormItem prop="passwordConfirmation">
                                    <Input ref="passwordConfirmation" :type="pcshow?'password':'text'" v-model="formReg.passwordConfirmation" placeholder="请确认密码">
                                    <img src="../assets/password.png" slot="prepend" />
                                    </Input>
                                    <div class="pipop-pip mypass" v-if="passMessShow">
                                        密码由6-16位字母和数字组成
                                    </div>
                                </FormItem>
                            </Col>
                            <Col span="3" class="abosss">
                                <Icon  v-show="ifRuleIn.passwordConfirmation!==''" class="right" :class="ifRuleIn.passwordConfirmation?'txt-green':'txt-red'" :type="ifRuleIn.passwordConfirmation?'md-checkmark-circle':'md-close-circle'" />
                                <Icon  class="left txt-ccc" :type="!pcshow?'md-eye':'md-eye-off'" @click="pcshow = !pcshow"/>
                            </Col>
                        </Row>
                    </div>
                    <div class="line">
                        <Row type="flex" justify="start" align="middle" class="code-row-bg">
                            <Col  span="14" class="captcha1">
                                <FormItem prop="captcha">
                                    <Input ref="captcha" class="inputCaptcha" type="text" maxlenth="10" v-model="formReg.captcha" placeholder="请输入验证码">
                                    <img src="../assets/captcha.png" slot="prepend" />
                                    </Input>
                                </FormItem>
                            </Col>
                            <Col span="10" class="captcha">
                                <img :src="captchaImg" class="imgCaptcha" @click="getAccount">
                            </Col>
                        </Row>
                    </div>
                    <Row type="flex" justify="start" align="middle" class="submit-btn">
                        <FormItem class="ssssssdd" >
                            <Col span="24">
                                <Button  type="error" long @click="handleSubmit('formReg')">注册</Button>
                            </Col>
                        </FormItem>
                    </Row>
                </Form>
                <div class="msg">
                    <router-link to="login">
                        已有账号
                    </router-link>
                </div>
                <router-link class="messKf"  to="/kefu">
                    联系客服
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import { Icon,Form,FormItem,Input,Row,Col,Modal,Button } from "iview"
    import md5 from 'js-md5';
    export default {
        name: "registered",
        data(){
            //密码验证规则
            const validatepass = (rule, value, callback) => {
                this.onPassValid=true;
                if(value!==""){//1.不全等于空
                    let re = /^.*(?=.{6,16})(?=.*\d)(?=.*[a-z]{1}).*$/;
                    if(re.test(value)){ //2.密码长度至少6位
                        this.ifRuleIn.password = true;
                        this.msg = '';
                        callback();
                    }else{
                        this.ifRuleIn.password = false;
                        this.msg = '密码由6-16位字母和数字组成';
                        callback(new Error('密码由6-16位字母和数字组成'));
                    }
                }else{
                    this.ifRuleIn.password = false;
                    this.msg = '请输入密码';
                    callback(new Error('请输入密码'));
                }
            };
            //密码验证规则
            const validatepasswordConfirmation = (rule, value, callback) => {
                this.onPassValid=true;
                if(value!==""){//1.不全等于空
                    let re = /^.*(?=.{6,16})(?=.*\d)(?=.*[a-z]{1}).*$/;
                    if(re.test(value)){ //2.密码长度至少6位
                        this.ifRuleIn.passwordConfirmation = true;
                        this.msg = '';
                        callback();
                    }else{
                        this.ifRuleIn.passwordConfirmation = false;
                        this.msg = '密码由6-16位字母和数字组成';
                        callback(new Error('密码由6-16位字母和数字组成'));
                    }
                }else{
                    this.ifRuleIn.passwordConfirmation = false;
                    this.msg = '请输入密码';
                    callback(new Error('请输入密码'));
                }
            };
            //账号验证规则
            const validateuser = async (rule, value, callback) => {
                this.onUserValid = true;
                if(value!==""){//1.不全等于空
                    let re = /^.*(?=.{6,16})(?=.*\d)(?=.*[a-z]{1}).*$/;
                    if(!re.test(value)){//2.包含6-16个英文、数字
                        this.ifRuleIn.username = false;
                        this.msg = '账号包含6-16个英文、数字';
                        callback(new Error('账号包含6-16个英文、数字'));
                    }else {
                        this.ifRuleIn.username = true;
                        this.msg = "";
                        callback();
                        let res = await this.$api.getuserhave();
                        if(!res.data.boolean){////3.账号是否已经存在
                          this.ifRuleIn.username = false;
                          callback(new Error('账号已存在'));
                          this.msg = "账号已存在";
                        }else{
                          this.ifRuleIn.username = true;
                          this.msg = "";
                          callback();
                        }
                    }
                }else{
                    this.ifRuleIn.username = false;
                    this.msg = '请输入账号';
                    callback(new Error('请输入账号'));
                }


                /**/
            };
            return{
                modal2:false,
                loding:false,
                passMessShow:false,
                pshow:true,
                pcshow:true,
                captchaImg:'',
                //是否验证通过
                ifRuleIn:{
                    username: '',
                    password: '',
                    prize:'',
                    captcha:'',
                    passwordConfirmation:''
                },
                userMessShow:false,
                //验证规则
                ruleInline: {
                    captcha:[
                        { required: true, message: '验证码是必填的', trigger: 'blur' },
                        { type: 'string', min: 5, max:7, message: '验证码长度不能少于5位大于7', trigger: 'blur' }
                    ],
                    prize:[
                        { required: true, message: '推荐码是必填的', trigger: 'blur' },
                    ],
                    username: [
                        { validator: validateuser, trigger: 'blur' },
                    ],
                    password: [
                        { validator: validatepass, trigger: 'blur' },
                        /*{ required: true, message: '请输入密码', trigger: 'blur' },
                        { type: 'string', min: 6, message: '密码长度不能少于6位', trigger: 'blur' }*/
                    ],
                    passwordConfirmation: [
                        { validatepasswordConfirmation: validatepass, trigger: 'blur' },
                        /*{ required: true, message: '请输入密码', trigger: 'blur' },
                        { type: 'string', min: 6, message: '密码长度不能少于6位', trigger: 'blur' }*/
                    ],
                },
                formReg:{
                    username:'',
                    password:'',
                    prize:'',
                    captcha:'',
                    passwordConfirmation:'',
                },
            }
        },
        methods : {
            backHistory(){
                this.$router.go(-1);//返回上一层
            },
            getLogin (){
                let pream = {
                    username:this.formReg.username,
                    password:md5(md5(md5(this.formReg.username+this.formReg.password))),
                }
                this.goLogin(pream)
            },
            async goLogin(pream){
                let res = await this.$api.login(pream);
                if(!res.data.error){
                    this.$Message.success('登陆成功');
                    //登录成功获取token
                    let token = res.data.token;
                    localStorage.setItem('token',token);
                    localStorage.setItem('userData',JSON.stringify(res.data));
                    localStorage.setItem('isLogin',true);
                    this.$router.push("/")
                }else{
                    this.$Message.error(res.data.error);
                    localStorage.setItem('isLogin',false);
                }
            },
            handleSubmit(ruleInline){
                console.log(ruleInline)
                this.$refs[ruleInline].validate((valid) => {
                    if (valid) {
                        if(this.formReg.password == this.formReg.passwordConfirmation){
                            let pream = {
                                captcha:this.formReg.captcha,
                                prize:this.formReg.prize,
                                username:this.formReg.username,
                                password:this.formReg.password,
                                password_confirmation:this.formReg.passwordConfirmation,
                            }
                            this.goReg(pream);
                        }else{
                            this.$Message.error('密码与确认密码不一致!');
                        }
                    } else {
                        this.$Message.error('注册失败!');
                    }
                })
            },
            getPrize(name){
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                var r = window.location.search.substr(1).match(reg); //获取url中"?"符后的字符串并正则匹配
                var context = "";
                if (r != null)
                    context = r[2];
                reg = null;
                r = null;
                return context == null || context == "" || context == "undefined" ? "" : context;
            },
            getAccount(){
                this.getCaptcha();
            },
            async goReg(pream){
                let res = await this.$api.regstered(pream);
                if(!res.error){
                    this.modal2 = true;
                }else{
                    this.$Message.error(res.error);
                }
            },
            async getCaptcha (){
                this.loding = true;
                let res = await this.$api.getVerification();
                if(res.errno===0){
                    this.captchaImg = res.data.src;
                    let _this = this;
                    setTimeout(()=>{
                        _this.loding = false;
                    },300);
                }

            },
            init (){
               this.getCaptcha();

            }
        },
        created(){
          this.init();
          this.formReg.prize = this.getPrize("prize")
        },
        components:{
            Icon,Form,FormItem,Input,Row,Col,Modal,Button
        }
    }
</script>
<style lang="less">
    .ivu-modal-body {
        border-top-right-radius: 8px;
        padding: 16px;
        font-size: 12px;
        line-height: 1.5;
        background-color: #fff;
        border-top-left-radius: 8px;
    }
    .ivu-modal-footer {
        border-bottom-right-radius: 8px;
        background-color: #fff;
        text-align: right;
        border-bottom-left-radius: 8px;
    }
    .ivu-modal-close {
        border-radius: 20px;
        border: 1px solid #f8f8f9;
        z-index: 1;
        font-size: 10px;
        position: absolute;
        right: 3px;
        top: 15px;
        overflow: hidden;
        cursor: pointer;
    }
    .ivu-modal-close .ivu-icon-ios-close {
        font-size: 20px;
        color: #f8f8f9;
        transition: color .2s ease;
        position: relative;
        top: 0px;
    }
    .ivu-modal-content {
        position: relative;
        background-color:transparent!important;
        border: 0;
        border-radius: 6px;
        background-clip: padding-box;
        box-shadow: 0 4px 12px rgba(0,0,0,0);
    }
    .ivu-modal-close {
        border-radius: 20px;
        border: 1px solid #f8f8f9;
        z-index: 1;
        font-size: 10px;
        position: absolute;
        right: 3px;
        top: 16px;
        overflow: hidden;
        cursor: pointer;
    }
    .ivu-modal-footer {
        border-top: 0px solid #e8eaec !important;
        padding: 0px 30px 26px 30px!important;
        text-align: right;
    }
    .ivu-btn-error:hover {
        color: #fff;
        background-color: #f13131;
        border-color: #f13131;
    }
    .ivu-modal {
        width: auto!important;
        margin: 60px !important;
    }
    .ivu-modal-header {
        border-bottom: 0px solid #e8eaec00 !important;
        padding: 14px 16px;
        line-height: 1;
    }
    .ivu-modal-footer {
        border-top: 0px solid #e8eaec !important;
        padding: 12px 18px 12px 18px;
        text-align: right;
    }

</style>
<style lang="less">
    @keyframes myfirst
    {
        0%   {transform:rotate(0deg);}
        100% {transform:rotate(360deg);}
    }
    .registered{
        background-image: url("../assets/login-bg.png");
        background-repeat: no-repeat;
        background-size:100%;
        .vertical-center-modal{
            display: flex;
            align-items: center;
            justify-content: center;
            .ivu-modal{
                top: 0;
            }
        }
        .regster {
            width: 2.95rem;
            margin: 0 auto;
            font-size: 0.18rem;
            font-style: normal;
            .logo {
                width: 50%;
                margin: 0 auto 0.5rem;
                padding-top: 0.17rem;;
                img{
                    width: 100%;
                }
            }
            .regf{
                .line{
                    width: 100%;
                    height: 0.6rem;
                    padding-top: 0.26rem;
                    position: relative;
                    border-bottom: 1px solid #DBDBDB;
                    .abosss{
                        position: absolute;
                        right: -0.17rem;
                        top: 0.3rem;
                    }

                    .ivu-form-item{
                        width: 100%;
                    }
                    .yj_icon{
                        font-size: 0.2rem;
                        color: #F54545;
                    }
                    .ivu-input{
                        width: 1.8rem;
                    }
                    .txt-ccc{
                        color: #CCC;
                    }
                }
                .rember{
                    font-size: 0.14rem;
                    text-align: right;
                    color: #333;
                    margin-top: 0.18rem;
                    font-weight: 500;
                    i.ivu-icon{
                        font-size: 0.18rem;
                    }
                    i.ivu-icon-ios-checkbox{
                        color: #F13131;
                    }
                }
                .submit-btn{
                    margin-top: 0.3rem;
                    height: 0.45rem;
                    button{
                        height: 0.45rem;
                        font-size: 0.16rem;
                        border-radius: 0.225rem;
                        background-color: #F13131;
                    }
                }
                .rout_lin{
                    text-align: center;
                    font-size: 0.14rem;
                    color:rgba(241,49,49,1);
                    line-height:0.38rem;
                    a{
                        color:rgba(241,49,49,1);
                        font-size: 0.14rem;
                        padding: 0 0.19rem;
                    }
                }
                a.messKf{
                    display: block;
                    width: 1.1rem;
                    height: 0.35rem;
                    background: #ffffff;
                    border: 0.01rem solid #f13131;
                    border-radius: 0.05rem;
                    font-size: 0.14rem;
                    font-weight: normal;
                    color: #f74546;
                    line-height: 0.33rem;
                    margin: 0.2rem auto 1rem auto;
                }
                .ssssssdd{
                    width: 100%;
                    margin: 0;

                }
            }
        }
        .regf {
            .ivu-input-group{
                font-size: 0.12rem;
                .ivu-input-icon{
                    width: 0.32rem;
                    height: 0.32rem;
                    line-height: 0.32rem;
                    font-size: 0.16rem;
                }
                .ivu-input{
                    height: 0.32rem;
                    line-height: 0.32rem;
                    padding: 0.04rem 0.07rem;
                    font-size: 0.14rem;
                    border: 1px solid #dcdee2;
                    border-radius: 0.04rem;
                }
            }
            .ivu-input-group .ivu-input {
                border: none;
            }
            .ivu-input-group .ivu-input:focus{
                box-shadow: none;
            }
            .ivu-input-group-append, .ivu-input-group-prepend{
                background-color: #fff;
                border: none;
                padding-left: 0;
                img{
                    width: 0.16rem;
                    height: 0.16rem;
                    vertical-align: middle;
                }
            }
            .ivu-form-inline .ivu-form-item{
                margin-bottom: 0;
                float: left;
                .ivu-form-item-error-tip{
                    font-size: 0.14rem;
                    padding-top: 0.06rem;
                    margin-left: 0.475rem;
                    text-align: center;
                    width: 2rem;
                    min-height: 0.34rem;
                    padding: 0.08rem 0.12rem;
                    color: #fff;
                    text-decoration: none;
                    background-color: rgba(0,0,0,.7);
                    border-radius: 0.04rem;
                    box-shadow: 0 0.01rem 0.06rem rgba(0,0,0,.2);
                    white-space: nowrap;
                    z-index: 500;
                    top: -137%;
                }
                .ivu-form-item-error-tip:before{
                    content: "";
                    position: absolute;
                    width: 0;
                    height: 0;
                    border-color: transparent;
                    border-style: solid;
                    bottom: -0.05rem;
                    border-width: 0.05rem 0.05rem 0;
                    border-top-color: rgba(0,0,0,.7);
                    left: 50%;
                    margin-left: -0.05rem;
                }
            }
        }
        .msg{
            text-align: right;
            font-size:0.14rem;
            font-weight:normal;
            color:rgba(241,49,49,1);
            line-height:0.38rem;
            a{
                color:rgba(241,49,49,1);
                font-size:0.14rem;
            }
        }
        .showin{
            animation:myfirst 500ms linear 0s infinite ;
        }
        .captcha1{
            .ivu-input {
                width: 1.3rem !important;
            }
        }
        .imgCaptcha{
            vertical-align: middle;
            width: 1rem;
            float: right;
            margin-top: -0.05rem;
        }
        .refcous{
            vertical-align: middle;
            width: 0.2rem;
            margin-top: -0.05rem;
        }
        .header{
            height: 0.5rem;
            line-height: 0.5rem;
            color: #FFF;
            i{
                font-size: 0.22rem;
                padding-left: 0.1rem;
            }
        }
        .header a {
            color: #fff;
        }
    }
</style>