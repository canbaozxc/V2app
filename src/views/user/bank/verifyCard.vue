<template>
    <div class="verifyCard" id="verifyCard">
        <titleBar title="银行卡绑定" />
        <StepBar current="0"/>
        <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
            <div class="view-main">
                <div class="item">
                    <Row  type="flex" justify="center" align="middle">
                        <Col span="6">
                            <span class="left">选择银行卡</span>
                        </Col>
                        <Col span="16">
                            <FormItem  class="left" prop="bank_num">
                                <!--Input type="text" v-model="formInline.bank_num"  placeholder="请选择开户银行"></Input-->
                                <Select v-model="formInline.bank_num"  placeholder="请选择您要验证的银行卡">
                                    <Option v-for="item in bankList" :value="item.id.toString()" :key="item.id">{{ item.account }}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                    </Row>
                </div>
                <div class="item">
                    <Row  type="flex" justify="center" align="middle">
                        <Col span="6">
                            <span class="left">开户人姓名</span>
                        </Col>
                        <Col span="16">
                            <FormItem  class="left" prop ="name">
                                <Input type="text" v-model="formInline.name"  placeholder="请输入旧的银行卡开户人姓名"></Input>
                            </FormItem>
                        </Col>
                    </Row>
                </div>
                <div class="item">
                    <Row  type="flex" justify="center" align="middle">
                        <Col span="6">
                            <span class="left">银行账号</span>
                        </Col>
                        <Col span="16">
                            <FormItem  class="left"  prop="bankNumber" >
                                <Input type="text" @input='setNum("bankNumber",formInline.bankNumber)' v-model="formInline.bankNumber"  placeholder="银行卡卡号由16位或19位数字组成"></Input>
                            </FormItem>
                        </Col>
                    </Row>
                </div>
                <div class="item">
                    <Row  type="flex" justify="center" align="middle">
                        <Col span="6">
                            <span class="left"  >资金密码</span>
                        </Col>
                        <Col span="16">
                            <FormItem  class="left" prop="password" >
                                <Input type="password"  v-model="formInline.password"  placeholder="请输入资金密码"></Input>
                            </FormItem>
                        </Col>
                    </Row>
                </div>
            </div>
            <div class="submit">
                <Button type="error" long @click="handleSubmit('formInline')">下一步</Button>
            </div>
        </Form>
        
    </div>
    
</template>
<style lang="less">
#verifyCard{
    
    .ivu-input:focus{
      box-shadow: none;
    }
    .view-main{
        .item{
            position: relative;
            
            .ivu-form-item{
                margin-bottom: 0;
                .ivu-select-arrow{
                    top: 0.12rem;
                }
                .ivu-select-selection{
                    border: none;
                    box-shadow:none;
                    text-align: left;
                    .ivu-icon {
                        
                    }
                }
            }
            span{
                font-size: 0.12rem;
            }
            .ivu-form-item-content{
                width: 2.2rem;
                .ivu-form-item-error-tip{
                    /*display: none;*/
                    position: fixed;
                    top: 0.5rem;
                    left: 0;
                    width: 100%;
                    height: 0.38rem;
                    line-height: 0.38rem;
                    font-size: 0.12rem;
                    background-color: #f14e4f;
                    padding: 0;
                    color: #FFF;
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
                font-size: 0.12rem;
                padding-left: 0.1rem;
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
                height: 0.4rem;
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
import { Icon,Form,FormItem,Input,Row,Col,Select,Option } from "iview"
import titleBar from "@/components/public/Title-bar.vue"
import StepBar from "@/components/user/StepBar.vue"
import minxins from '@/js/minxins.js';
export default {
    name:"verifyCard",
    mixins: [ minxins ],
    components:{
        titleBar,Icon,Form,FormItem,Input,Row,Col,Select,Option,StepBar
    },
    data(){
        //银行卡卡号验证规则
        const validatebankNumber = (rule, value, callback) => {
            this.onPassValid=true;
            if(value!==""){//1.不全等于空
                let str = value.replace(/\s+/g, "");//去掉所有空格
                //console.log(str);
                let re = /^([1-9]{1})(\d{14}|\d{18})$/;
                if(re.test(str)){ //2.银行卡卡号由16位或19位数字组成
                    callback();
                    if (this.formInline.confirmBankNumber !== '') {
                        // 对第二个银行卡卡号框单独验证
                        this.$refs.formInline.validateField('confirmBankNumber');
                    }
                    this.ifRuleIn.bankNumber = true;
                    callback();
                }else{
                    this.ifRuleIn.bankNumber = false;
                    callback(new Error('银行卡卡号由16位或19位数字组成'));
                }
            }else{
            this.ifRuleIn.bankNumber = false;
            callback(new Error('请输入银行卡卡号'));
            }
        };
        
        
        return{
            //数据
            formInline: {
                bank_num: '',
                name: '',
                bankNumber: '',
                password:''
            },
            //是否验证通过
            ifRuleIn:{
                bank_num: '',
                name: '',
                bankNumber: '',
                password:''
            },
            //验证规则
            ruleInline: {
                bank_num:[
                    { required: true, message: '请选择您要验证的银行卡', trigger: 'change' }
                ],
                name: [
                    { required: true, message: '请输入旧的银行卡开户人姓名', trigger: 'blur' }
                ],
                bankNumber: [
                    { validator: validatebankNumber, trigger: 'blur' },
                ],
                password:[
                    { required: true, message: '请输入您的资金密码', trigger: 'blur' }
                ]
            },
            //
            bankList:[
            ]
        }
    },
    
    methods:{
        handleSubmit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$Message.info('正在提交...');
                    this.checkBankCard();
                } else {
                    this.$Message.error('提交失败!');
                }
            })
        },
        setNum (name,num) {
                num = num.replace(/\s/g, '').replace(/[^\d]/g, '').replace(/(\d{4})(?=\d)/g, '$1 ')
                
                this.formInline[name] = num;
                //this.$set(element, 'account', element.account)
            
        },
        async checkBankCard(){
            let pream = {
                card_id:this.formInline.bank_num,
                account_name:this.formInline.name,
                account:this.formInline.bankNumber,
                fund_pwd:this.formInline.password,
                type:1
            }
            let res = await this.$api.checkBankCard(pream);
            if(res.errno===0){
                this.$store.commit("setbankToken",res.data.checked_token);
                this.rouLink('/user/addBankCard');
            }
            
        },
        async getBankCardList(){
            let res = await this.$api.getBankCardList();
            this.bankList = res.data.list;
            
        },
    },
    mounted(){
        this.bgColor("#F2F3F9");
        this.getBankCardList();
        //this.setNum("6228481101100634315");
    }
}
</script>

