<template>
    <div class="passChange" id="passChange">
        <titleBar :title="$route.params.passId=='1'?'修改登录密码':'修改资金密码'" />
        <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
            <div class="view-main">
                <div class="item">
                    <span class="left">登录账号</span>
                    <p class="left">{{username}}</p>
                </div>
                <div class="item">
                    <span class="left">原始密码</span>
                    <FormItem  class="left">
                        <Input type="password" v-model="formInline.oldpassword"  placeholder="密码由6-16位字母和数字组成"></Input>
                    </FormItem>
                </div>
                <div class="item">
                    <span class="left">新密码</span>
                    <FormItem prop="password"  class="left" >
                        <Input type="password"  v-model="formInline.password"  placeholder="新密码由6-16位字母和数字组成"></Input>
                    </FormItem>
                    <Icon  v-show="ifRuleIn.password!==''" class="right" :class="ifRuleIn.password?'txt-green':'txt-red'" :type="ifRuleIn.password?'md-checkmark-circle':'md-close-circle'" />
                </div>
                <div class="item">
                    <span class="left">确认密码</span>
                    <FormItem prop="confirmPassword"  class="left">
                        <Input type="password"  v-model="formInline.confirmPassword" placeholder="请再次确认新密码">
                        </Input>
                    </FormItem>
                    <Icon  v-show="ifRuleIn.confirmPassword!==''" class="right" :class="ifRuleIn.confirmPassword?'txt-green':'txt-red'" :type="ifRuleIn.confirmPassword?'md-checkmark-circle':'md-close-circle'" />
                </div>
            </div>
            <div class="submit">
                <Button type="error" long @click="handleSubmit('formInline')">修改</Button>
            </div>
        </Form>
        
    </div>
    
</template>
<style lang="less">
#passChange{
    
    .ivu-input:focus{
      box-shadow: none;
    }
    .view-main{
        .item{
            position: relative;
            overflow: hidden;
            .ivu-form-item-content{
                width: 2.1rem;
                .ivu-form-item-error-tip{
                    display: none;
                }
            }
            .ivu-icon{
                position: absolute;
                right: 0;
                top: 0;
                font-size: 0.18rem;
                line-height: 0.4rem;
            }
            
            .ivu-input{
                outline: none;
                border: none;
                color: #333;
                text-align: left;
                margin: 0;
                padding: 0;
                height: 0.4rem;
                line-height: 0.4rem;
                font-size: 0.14rem;
            }
        }
    }
}
</style>

<style lang="less" scoped>
    .view-main{
        margin-top: 0.15rem;
        margin-bottom: 0.25rem;
        background-color: #FFF;
        padding: 0 0.15rem;
        font-size: 0.14rem;
        .item{
            height: 0.45rem;
            line-height: 0.40rem;
            border-bottom: 1px solid #F2F3F9;
            padding-right: 0.22rem;
            position: relative;
            
            span{
                color: #333;
                padding-right: 0.2rem;
                width: 0.92rem;
                text-align: right;
            }
        }
    }
    .submit{
        margin: 0 0.4rem;

        button{
            height: 0.45rem;
            font-size: 0.16rem;
            border-radius: 0.225rem;
        }
    }
</style>
<script>
import { Icon,Form,FormItem,Input,Row,Col } from "iview"
import titleBar from "@/components/public/Title-bar.vue"
import minxins from '@/js/minxins.js';
export default {
    name:"passChange",
    mixins: [ minxins ],
    data(){
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
        return{
            username:'',
            //数据
            formInline: {
                username: '',
                oldpassword: '',
                password: '',
                confirmPassword:''
            },
            //是否验证通过
            ifRuleIn:{
                username: '',
                oldpassword: '',
                password: '',
                confirmPassword:''
            },
            //验证规则
            ruleInline: {
                oldpassword: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ],
                password: [
                    { validator: validatepass, trigger: 'blur' },
                ],
                confirmPassword: [
                    { validator: validatePassCheck, trigger: 'blur' },
                ]
            },
            passId:''
        }
    },
    components:{
        titleBar,Icon,Form,FormItem,Input,Row,Col
    },
    methods:{
        //修改登录密码
        async changePwd(){
            let pream ={
                current_password:this.formInline.oldpassword,
                new_password:this.formInline.password
            }
            if(this.$route.params.passId=='1'){
                //修改登录密码
                let res = await this.$api.changeLoginPwd(pream)
            }else{
                //修改资金密码
                let res = await this.$api.changeFundPwd(pream)
            }
            
            if(res.errno===0){
                this.$Message.success('修改成功!');
            }
        },
        handleSubmit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$Message.info('正在修改...');
                    //修改密码
                    this.changePwd();
                } else {
                    this.$Message.error('修改失败!');
                }
            })
        },
        bgColor(color){
            document.querySelector('body').setAttribute('style', 'background-color:'+color);
        },
        
    },
    created(){
        this.username = this.getUserItem('username');

        //console.log(this.getUserItem('username'));
    },
    mounted(){
        this.bgColor("#F2F3F9");
    }
}
</script>

