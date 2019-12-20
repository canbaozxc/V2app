<template>
  <div class="reg">
    <!--首页头部-->
    <div class="header">
      <div class="left txt-left">
          <Icon type="ios-arrow-back" @click="backHistory()" />
      </div>
    </div>
    <div class="regster">
      <div class="logo">
        <router-link to="/">
        <img src="../assets/logo.png" />
        </router-link>
      </div>
      <div class="regf">
        <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
          <div class="line">
            <Row type="flex" justify="start" align="middle" class="code-row-bg">
                <Col  span="24">
                    <FormItem prop="username">
                        <Input ref="username" type="text" v-model="formInline.username" placeholder="请输入账号">
                            <img src="../assets/username.png" slot="prepend" />
                        </Input>
                        <div class="pipop-pip myuser" v-if="userMessShow">
                          账号包含6-16个英文、数字
                        </div>
                    </FormItem>
                </Col>
                <Col span="3" class="abosss">
                  <Icon class="right" v-show="ifRuleIn.username!==''" :class="ifRuleIn.username?'txt-green':'txt-red'" :type="ifRuleIn.username?'md-checkmark-circle':'md-close-circle'" />
                </Col>
            </Row>
            
          </div>
          <div class="line">
            <Row type="flex" justify="start" align="middle" class="code-row-bg">
                <Col  span="22">
                    <FormItem prop="password">
                        <Input ref="password" :type="pshow?'password':'text'" v-model="formInline.password" placeholder="请输入密码">
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
            <Row type="flex" justify="start" align="middle">
                <Col offset = "16" span="8" class="rember">
                    <Icon :type='isremeber?"ios-checkbox":"ios-checkbox-outline"'  @click="changeIsremember()"/> 记住密码
                </Col>
            </Row>
            <Row type="flex" justify="start" align="middle" class="submit-btn">
              <FormItem class="ssssssdd" >
                <Col span="24">
                    <Button  type="error" long @click="handleSubmit('formInline')">登录</Button>
                </Col>
                </FormItem>
            </Row>
            
        </Form>
        <div class="rout_lin">
          <router-link  to="/reg">注册账号</router-link>|<router-link  to="/forgetpwdsite">忘记密码</router-link>
        </div>
        <router-link class="messKf"  to="/kefu">
          联系客服
        </router-link>
      </div>
    </div>
  </div>
</template>
<style lang="less">

/*更改控件样式*/
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
</style>

<style lang="less" scoped>
.reg{
  background-image: url("../assets/login-bg.png");
  background-repeat: no-repeat;
  background-size:100%;
}
.regster {
    width: 2.95rem;
    margin: 0 auto;
    font-size: 0.18rem;
    font-style: normal;
  .logo {
    width: 50%;
    margin: 0 auto 1rem;
    padding-top: 0.17rem;;
    img{
      width: 100%;
    }
  }
  .regf{
    .line{
      width: 100%;
      height: 0.74rem;
      padding-top: 0.39rem;
      position: relative;
      border-bottom: 1px solid #DBDBDB;
      .abosss{
        position: absolute;
        right: -0.17rem;
        top: 0.5rem;
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
      width:1.1rem;
      height:0.35rem;
      background:rgba(255,255,255,1);
      border:0.01rem solid rgba(241,49,49,1);
      border-radius:0.05rem;
      font-size:0.14rem;
      font-weight:normal;
      color:rgba(247,69,70,1);
      line-height:0.33rem;
      margin: 0.8rem auto 01rem auto;
    }
    .ssssssdd{
      width: 100%;
      margin: 0;
      
    }
  }
}
/*首页头部*/
  .header {
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
  .pipop-pip{
    position: absolute;
    font-size: 0.14rem;
    margin-left: 0.475rem;
    text-align: center;
    width: 2rem;
    min-height: 0.34rem;
    color: #fff;
    text-decoration: none;
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 0.04rem;
    -webkit-box-shadow: 0 0.01rem 0.06rem rgba(0, 0, 0, 0.2);
    box-shadow: 0 0.01rem 0.06rem rgba(0, 0, 0, 0.2);
    white-space: nowrap;
    z-index: 500;
    top: -137%;
  }
  .pipop-pip:before{
        content: "";
        position: absolute;
        width: 0;
        height: 0;
        border-color: transparent;
        border-style: solid;
        bottom: -0.05rem;
        border-width: 0.05rem 0.05rem 0;
        border-top-color: rgba(0, 0, 0, 0.7);
        left: 50%;
        margin-left: -0.05rem;
  }
</style>
<script>
import { Icon,Form,FormItem,Input,Row,Col } from "iview"
import minxins from '@/js/minxins.js';
import md5 from 'js-md5';
export default {
  name:"login",
  components:{
    Icon,Form,FormItem,Input,Row,Col
  },
  mixins:[minxins],
  data(){
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
              /*let res = await this.$api.getuserhave();
              if(!res.data.boolean){////3.账号是否已经存在
                this.ifRuleIn.username = false;
                callback(new Error('账号已存在'));
                this.msg = "账号已存在";
              }else{
                this.ifRuleIn.username = true;
                this.msg = "";
                callback();
              }*/
            }
        }else{
          this.ifRuleIn.username = false;
          this.msg = '请输入账号';
          callback(new Error('请输入账号'));
        }


        /**/
    };
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
    return {
      isremeber:true,
      pshow:true,
      passMessShow:false,
      userMessShow:false,
      msg:"",
      onPassValid:false,
      onUserValid:false,
      //数据
      formInline: {
          username: '',
          password: '',
          captcha:''
      },
      //是否验证通过
      ifRuleIn:{
          username: '',
          password: ''
      },
      //验证规则
      ruleInline: {
          username: [
             //{ validator: validateuser, trigger: 'blur' },
          ],
          password: [
              { validator: validatepass, trigger: 'blur' },
              /*{ required: true, message: '请输入密码', trigger: 'blur' },
              { type: 'string', min: 6, message: '密码长度不能少于6位', trigger: 'blur' }*/
          ]
      }
    }
  },
  methods:{
    setValue(name,value){
      this[name] = value;

    },
    async goLogin(pream){
        console.log('通过校验，请求登陆');
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
    handleSubmit (name) {//提交验证
        console.log(name)
        this.$refs[name].validate((valid) => {
            if (valid) {
                this.$Message.info('正在登陆...');
                let pream = {
                  username:this.formInline.username,
                  password:md5(md5(md5(this.formInline.username+this.formInline.password)))
                }
                this.goLogin(pream);
                if(this.isremeber){
                  this.rememeber();//记住密码
                }
                
            } else {
                this.$Message.error('登陆失败!');
            }
        })
    },
    actionRule(){//动态验证
      this.$refs['formInline'].validate((valid) => {
        })
    },
    rememeber(){//记住密码
        localStorage.setItem("username", this.formInline.username);
        localStorage.setItem("password", this.formInline.password);
    },
    getRememeber(){//获取密码
      this.formInline = {
        username:localStorage.getItem("username"),
        password:localStorage.getItem("password"),
      }
    },
    changeIsremember(){//更改是否保存密码
      this.isremeber = !this.isremeber;
      localStorage.setItem("isremeber", this.isremeber);
    },
    getIsremember(){//获取是否保存密码
      this.isremeber = eval(localStorage.getItem("isremeber"));

    },
    backHistory(){
      this.$router.go(-1);//返回上一层
    },
    passMess(){
        let _this = this;
        let passInp = $(this.$refs.password.$el).find("input");
        passInp.focus(function(){
          console.log(_this.onPassValid);
          if(!_this.onPassValid){//当没有校验时可以执行
            _this.setValue('passMessShow',true);
          }
        }).blur(function(){
          _this.setValue('passMessShow',false);
        });
    },
    userMess(){
        let _this = this;
        let userInp = $(this.$refs.username.$el).find("input");
        userInp.focus(function(){
          console.log(_this.onUserValid);
          if(!_this.onUserValid){//当没有校验时可以执行
            _this.setValue('userMessShow',true);
          }
        }).blur(function(){
          _this.setValue('userMessShow',false);
        });
    },
    bgColor(color){
      document.querySelector('body').setAttribute('style', 'background-color:'+color);
    }
      
    
  },
  created(){
    this.getIsremember();//拉取是否记住密码
    if(this.isremeber){//拉去本地存储的账号密码
        this.getRememeber();
      }
    //
    
  },
  mounted(){
    if(this.isremeber){//有记住密码才允许起始验证
    this.actionRule('formInline');
    }
    this.bgColor("#FFF");
    /*this.userMess();
    this.passMess();*/
    console.log(window.history);
  }
}
</script>

