<template>
  <div class="reg">
    <!--首页头部-->
    <div class="header">
      <div class="left txt-left">
        <Icon type="ios-arrow-back"  @click="backHistory()" />
      </div>
    </div>
    <div class="regster">
      <div class="logo">
        <img src="https://m.fyu6.com/themes/simpleboot3/wap/assets/img/logo.81d5fae.png" />
      </div>
      <div class="regf">
        <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
          
          <div class="line">
            <Row type="flex" justify="start" align="middle" class="code-row-bg">
                <Col  span="24">
                    <FormItem prop="username">
                        <Input type="text" v-model="formInline.username" placeholder="请输入账号">
                            <img src="../assets/username.png" slot="prepend" />
                        </Input>
                    </FormItem>
                </Col>
            </Row>
            
          </div>
          <div class="line">
            <Row type="flex" justify="start" align="middle" class="code-row-bg">
                <Col  span="22">
                    <FormItem prop="password">
                        <Input :type="pshow?'password':'text'" v-model="formInline.password" placeholder="请输入密码">
                            <img src="../assets/password.png" slot="prepend" />
                        </Input>
                    </FormItem>
                </Col>
            </Row>
            
          </div>
          <div class="line">
            <Row type="flex" justify="start" align="middle" class="code-row-bg">
                <Col  span="22">
                    <FormItem prop="password">
                        <Input :type="pshow?'password':'text'" v-model="formInline.password" placeholder="请输入密码">
                            <img src="../assets/password.png" slot="prepend" />
                        </Input>
                    </FormItem>
                </Col>
            </Row>
            
          </div>
          <div class="line">
            <Row type="flex" justify="start" align="middle" class="code-row-bg">
                <Col  span="22">
                    <FormItem prop="password">
                        <Input :type="pshow?'password':'text'" v-model="formInline.passwordCheck" placeholder="请再次输入密码">
                            <img src="../assets/password.png" slot="prepend" />
                        </Input>
                    </FormItem>
                </Col>
            </Row>
            
          </div>
            <Row type="flex" justify="start" align="middle" class="submit-btn">
              <FormItem class="ssssssdd" >
                <Col span="24">
                    <Button  type="error" long @click="handleSubmit('formInline')">注册</Button>
                </Col>
                </FormItem>
            </Row>
            
        </Form>
        <div class="msg">
            <router-link to="longin">
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
        top: -100%;
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
      margin: 1.25rem auto 01rem auto;
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
</style>
<script>
import { Icon,Form,FormItem,Input,Row,Col } from "iview"
export default {
  name:"regster",
  components:{
    Icon,Form,FormItem,Input,Row,Col
  },
  data(){
    
    //密码验证规则
    /*const validatepass = (rule, value, callback) => {
        if(value!==""){//1.不全等于空
            if(value.length>=6){ //2.密码长度至少6位
                this.ifRuleIn.password = true;
                this.msg = '';
                callback();
            }else{
                this.ifRuleIn.password = false;
                this.msg = '密码长度不能少于6位';
                callback(new Error('密码长度不能少于6位'));
            }
        }else{
          this.ifRuleIn.password = false;
          this.msg = '请输入密码';
          callback(new Error('请输入密码'));
        }
    };*/
    //密码验证规则
    const validatepass = (rule, value, callback) => {
        if(value!==""){//1.不全等于空
            let re = /^.*(?=.{6,16})(?=.*\d)(?=.*[a-z]{1}).*$/;
            if(re.test(value)){ //2.密码长度至少6位
                if (this.formInline.passwordCheck !== '') {
                    // 对第二个密码框单独验证
                    this.$refs.formInline.validateField('passwordCheck');
                }
                callback();
            }else{
                callback(new Error('密码由6-16位字母和数字组成'));
            }
        }else{
          callback(new Error('请输入密码'));
        }
    };
    const validatePassCheck = (rule, value, callback) => {
        if (value === '') {
            callback(new Error('请再次输入密码'));
        } else if (value !== this.formInline.password) {
            callback(new Error('两个输入密码不匹配!'));
        } else {
            callback();
        }
    };
    return {
      pshow:true,
      msg:"",
      //数据
      formInline: {
          Invitation_code:'',
          username: '',
          password: ''
      },
      //是否验证通过
      ifRuleIn:{
          username: '',
          password: ''
      },
      //验证规则
      ruleInline: {
        username: [
            { required: true, message: '账号是必填的', trigger: 'blur' },
        ],
        password: [
            { validator: validatePass, trigger: 'blur' }
        ],
        passwordCheck: [
            { validator: validatePassCheck, trigger: 'blur' }
        ]
      }
    }
  },
  methods:{
    handleSubmit (name) {
        this.$refs[name].validate((valid) => {
            if (valid) {
                this.$Message.info('正在注册...');
            } else {
                this.$Message.error('注册失败!');
            }
        })
    },
    backHistory(){
      this.$router.go(-1);//返回上一层
    },
  },
  created(){
    //
  },
  mounted(){
  }
}
</script>

