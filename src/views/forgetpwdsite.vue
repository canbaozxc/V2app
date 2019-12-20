<template>
  <div class="reg">
    <titleBar title="忘记密码" />
    <div class="regster">
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
                    <FormItem prop="fundsPassword">
                        <Input :type="pshow?'password':'text'" v-model="formInline.fundsPassword" placeholder="请输入资金密码">
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
                        <Input ref="password"  :type="pshow?'password':'text'" v-model="formInline.password" placeholder="新密码由6-16位字母和数字组成">
                            <img src="../assets/password.png" slot="prepend" />
                        </Input>
                        <div class="pipop-pip mypass" v-if="passMessShow">
                          新密码由6-16位字母和数字组成
                        </div>
                    </FormItem>
                </Col>
                <Col span="3" class="abosss">
                  <Icon  v-show="ifRuleIn.password!==''" class="right" :class="ifRuleIn.password?'txt-green':'txt-red'" :type="ifRuleIn.password?'md-checkmark-circle':'md-close-circle'" />
                </Col>
            </Row>
            
          </div>
          <div class="line">
            <Row type="flex" justify="start" align="middle" class="code-row-bg">
                <Col  span="22">
                    <FormItem prop="confirmPassword">
                        <Input :type="pshow?'password':'text'" v-model="formInline.confirmPassword" placeholder="请再次确认新密码">
                            <img src="../assets/password.png" slot="prepend" />
                        </Input>
                    </FormItem>
                </Col>
                <Col span="3" class="abosss">
                  <Icon  v-show="ifRuleIn.confirmPassword!==''" class="right" :class="ifRuleIn.confirmPassword?'txt-green':'txt-red'" :type="ifRuleIn.confirmPassword?'md-checkmark-circle':'md-close-circle'" />
                </Col>
            </Row>
            
          </div>
            <Row type="flex" justify="start" align="middle" class="submit-btn">
              <FormItem class="ssssssdd" >
                <Col span="24">
                    <Button  type="error" long @click="handleSubmit('formInline')">提交</Button>
                </Col>
                </FormItem>
            </Row>
            
        </Form>
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
        min-width: 2rem;
        min-height: 0.34rem;
        padding: 0.08rem 0.12rem;
        color: #fff;
        text-decoration: none;
        background-color: rgba(0,0,0,.7);
        border-radius: 0.04rem;
        box-shadow: 0 0.01rem 0.06rem rgba(0,0,0,.2);
        white-space: nowrap;
        z-index: 500;
        top: -120%;
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

.regster {
    width: 2.95rem;
    margin: 0 auto;
    font-size: 0.18rem;
    font-style: normal;
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


    .pipop-pip{
    position: absolute;
    font-size: 0.14rem;
    margin-left: 0.225rem;
    text-align: center;
    width: 2.5rem;
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
import titleBar from "@/components/public/Title-bar.vue"
export default {
  name:"forgetpwdsite",
  components:{
    Icon,Form,FormItem,Input,Row,Col,titleBar
  },
  data(){
    //账号验证规则
    /*const validateuser = (rule, value, callback) => {
        if(value!==""){//1.不全等于空
            let re = /^[a-zA-Z0-9]{5,15}$/;
            if(!re.test(value)){//2.包含5-15个英文、数字
              this.ifRuleIn.username = false;
              this.msg = '账号包含5-15个英文、数字';
              callback(new Error('账号包含5-15个英文、数字'));
            }else {
                this.ifRuleIn.username = true;
                this.msg = "";
                callback();
            }
        }else{
          this.ifRuleIn.username = false;
          this.msg = '请输入账号';
          callback(new Error('请输入账号'));
        }
    };*/
    //密码验证规则
   /* const validatepass = (rule, value, callback) => {
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
    //账号验证规则
    const validateuser = async (rule, value, callback) => {
        if(value!==""){//1.不全等于空
            let re = /^.*(?=.{6,16})(?=.*\d)(?=.*[a-z]{1}).*$/;
            if(!re.test(value)){//2.账号包含6-16个英文、数字
              callback(new Error('账号包含6-16个英文、数字'));
            }else {
                callback();
            }
        }else{
          callback(new Error('请输入账号'));
        }
        //console.log(res.data.boolean);

        /**/
    };
    //新密码验证规则
    const validatepass = (rule, value, callback) => {
        this.onPassValid=true;
        if(value!==""){//1.不全等于空
            let re = /^.*(?=.{6,16})(?=.*\d)(?=.*[a-z]{1}).*$/;
            if(re.test(value)){ //2.密码长度至少6位
                callback();
                if (this.formInline.confirmPassword !== '') {
                    // 对第二个密码框单独验证
                    this.$refs.formInline.validateField('confirmPassword');
                }
                this.ifRuleIn.password = true;
                callback();
            }else{
                this.ifRuleIn.password = false;
                callback(new Error('新密码由6-16位字母和数字组成'));
            }
        }else{
          this.ifRuleIn.password = false;
          callback(new Error('请输入密码'));
        }
    };
    //重复密码
    const validatePassCheck = (rule, value, callback) => {
        if (value === '') {
            this.ifRuleIn.confirmPassword = false;
            callback(new Error('请输入密码'));
        } else if (value !== this.formInline.password) {
            this.ifRuleIn.confirmPassword = false;
            callback(new Error('两个输入密码不匹配!'));
        } else {
            this.ifRuleIn.confirmPassword = true;
            callback();
        }
    };
    return {
      pshow:true,
      msg:"",
      onPassValid:false,
      passMessShow:false,
      //数据
      formInline: {
          username: '',
          fundsPassword: '',
          password:'',
          confirmPassword:''
      },
      //是否验证通过
      ifRuleIn:{
          username: '',
          fundsPassword: '',
          password:'',
          confirmPassword:''
      },
      //验证规则
      ruleInline: {
          username:[
              { validator: validateuser, trigger: 'blur' },
          ],
          fundsPassword: [
             { required: true, message: '请输入资金密码', trigger: 'blur' },
             { type: 'string', min: 6, message: '资金密码长度不能少于6位', trigger: 'blur' }
          ],
          password: [
              { validator: validatepass, trigger: 'blur' },
          ],
          confirmPassword: [
              { validator: validatePassCheck, trigger: 'blur' },
          ]
      }
    }
  },
  methods:{
    setValue(name,value){
      this[name] = value;

    },
    handleSubmit (name) {
        this.$refs[name].validate((valid) => {
            if (valid) {
                this.$Message.info('正在修改...');
            } else {
                this.$Message.error('修改失败!');
            }
        })
    },
    backHistory(){
      this.$router.go(-1);//返回上一层
    },
    passMess(){
        let _this = this;
        let passInp = $(this.$refs.password.$el).find("input");
        passInp.focus(function(){
          if(!_this.onPassValid){//当没有校验时可以执行
            _this.setValue('passMessShow',true);
          }
        }).blur(function(){
          _this.setValue('passMessShow',false);
        });
    },
  },
  created(){
    //
  },
  mounted(){
    this.passMess();
  }
}
</script>

