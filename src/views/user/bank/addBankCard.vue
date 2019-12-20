<template>
    <div class="addBankCard" id="addBankCard">
        <titleBar title="银行卡绑定" />
        <StepBar current="1"/>
        <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
            <div class="view-main">
                <div class="item">
                    <Row  type="flex" justify="center" align="middle">
                        <Col span="6">
                            <span class="left">开户银行</span>
                        </Col>
                        <Col span="16">
                            <FormItem  class="left" prop="bank_id">
                                <!--Input type="text" v-model="formInline.bank_id"  placeholder="请选择开户银行"></Input-->
                                <Select v-model="formInline.bank_id"  placeholder="请选择开户银行" @on-change="setBank">
                                    <Option v-for="(value,key,index) in bankList" :value="key" :key="index">{{ value }}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                    </Row>
                </div>
                <div class="item">
                    <Row  type="flex" justify="center" align="middle">
                        <Col span="6">
                            <span class="left">开户行区域</span>
                        </Col>
                        <Col span="16">
                            <FormItem  class="left" prop="account_area">
                                <base-city  v-model="formInline.account_area"  @cityData="city"></base-city>
                                <!--Input type="text" v-model="formInline.account_area"  placeholder="请选择开户银行区域"></Input-->
                            </FormItem>
                        </Col>
                    </Row>
                </div>
                <div class="item">
                    <Row  type="flex" justify="center" align="middle">
                        <Col span="6">
                            <span class="left">支行名称</span>
                        </Col>
                        <Col span="16">
                            <FormItem  class="left" prop="branch">
                                <Input type="text" v-model="formInline.branch"  placeholder="请输入支行名称"></Input>
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
                            <FormItem  class="left" prop ="account_name">
                                <Input type="text" v-model="formInline.account_name"  placeholder="请输入开户人姓名"></Input>
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
                            <FormItem  class="left"  prop="account" >
                                <Input type="text" @input='setNum("account",formInline.account)' v-model="formInline.account"  placeholder="银行卡卡号由16位或19位数字组成"></Input>
                            </FormItem>
                        </Col>
                    </Row>
                </div>
                <div class="item">
                    <Row  type="flex" justify="center" align="middle">
                        <Col span="6">
                            <span class="left"  >确认银行账号</span>
                        </Col>
                        <Col span="16">
                            <FormItem  class="left" prop="confirmAccount" >
                                <Input type="text" @input='setNum("confirmAccount",formInline.confirmAccount)' v-model="formInline.confirmAccount"  placeholder="银行账号只能手动输入，不能粘贴"></Input>
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
#addBankCard{
    
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
import BaseCity from "@/components/public/BaseCity.vue"
import titleBar from "@/components/public/Title-bar.vue"
import StepBar from "@/components/user/StepBar.vue"
import MyInput from "@/components/public/MyInput.vue"
import minxins from '@/js/minxins.js';
export default {
    name:"addBankCard",
    mixins: [ minxins ],
    components:{
        titleBar,Icon,Form,FormItem,Input,Row,Col,MyInput,Select,Option,BaseCity,StepBar
    },
    computed: {
        fromData () {
            return this.$store.getters.getbankBindData;
        },
        token () {
            return this.$store.getters.getbankToken;
        }
    },
    data(){
        //银行卡卡号验证规则
        const validateaccount = (rule, value, callback) => {
            this.onPassValid=true;
            if(value!==""){//1.不全等于空
                let str = value.replace(/\s+/g, "");//去掉所有空格
                //console.log(str);
                let re = /^([1-9]{1})(\d{14}|\d{18})$/;
                if(re.test(str)){ //2.银行卡卡号由16位或19位数字组成
                    callback();
                    if (this.formInline.confirmAccount !== '') {
                        // 对第二个银行卡卡号框单独验证
                        this.$refs.formInline.validateField('confirmAccount');
                    }
                    this.ifRuleIn.account = true;
                    callback();
                }else{
                    this.ifRuleIn.account = false;
                    callback(new Error('银行卡卡号由16位或19位数字组成'));
                }
            }else{
            this.ifRuleIn.account = false;
            callback(new Error('请输入银行卡卡号'));
            }
        };
        //重复银行卡卡号
        const validateconfirmAccount = (rule, value, callback) => {
            if (value === '') {
                this.ifRuleIn.confirmAccount = false;
                callback(new Error('请输入银行卡卡号'));
            } else if (value !== this.formInline.account) {
                this.ifRuleIn.confirmAccount = false;
                callback(new Error('两个输入银行卡卡号不匹配!'));
            } else {
                this.ifRuleIn.confirmAccount = true;
                callback();
            }
        };
        
        return{
            //数据
            formInline: {
                bank_id: '',
                account_area:'',
                branch: '',
                account_name:'',
                account: '',
                confirmAccount:'',
                confirmBank:'',
                confirmProvince:'',
                province_id:'',//省id
                confirmCity:'',
                city_id:'',//市id
            },
            
            //是否验证通过
            ifRuleIn:{
                bank_id: '',
                account_area:'',
                branch: '',
                account_name:'',
                account: '',
                confirmAccount:''
            },
            //验证规则
            ruleInline: {
                bank_id:[
                    { required: true, message: '请选择开户银行', trigger: 'change' }
                ],
                account_area:[
                    { required: true, message: '请选择开户行区域', trigger: 'change' }
                ],
                branch: [
                    { required: true, message: '请输入支行名称', trigger: 'change' }
                ],
                account_name:[
                    { required: true, message: '请输入开户人姓名', trigger: 'change' }
                ],
                account: [
                    { validator: validateaccount, trigger: 'blur' },
                ],
                confirmAccount: [
                    { validator: validateconfirmAccount, trigger: 'blur' },
                ]
            },
            //
            bankList:{"1":"\u4e2d\u56fd\u5de5\u5546\u94f6\u884c","2":"\u4e2d\u56fd\u5efa\u8bbe\u94f6\u884c","3":"\u4e2d\u56fd\u519c\u4e1a\u94f6\u884c","4":"\u4e2d\u56fd\u94f6\u884c","5":"\u62db\u5546\u94f6\u884c","6":"\u4ea4\u901a\u94f6\u884c","7":"\u4e2d\u56fd\u6c11\u751f\u94f6\u884c","8":"\u4e2d\u4fe1\u94f6\u884c","9":"\u4e0a\u6d77\u6d66\u4e1c\u53d1\u5c55\u94f6\u884c","10":"\u5e7f\u4e1c\u53d1\u5c55\u94f6\u884c","11":"\u5e73\u5b89\u94f6\u884c","13":"\u5174\u4e1a\u94f6\u884c","14":"\u534e\u590f\u94f6\u884c","15":"\u4e2d\u56fd\u5149\u5927\u94f6\u884c","16":"\u4e2d\u56fd\u90ae\u653f\u50a8\u84c4\u94f6\u884c","17":"\u57ce\u5e02\u5546\u4e1a\u94f6\u884c","18":"\u519c\u6751\u5546\u4e1a\u94f6\u884c","19":"\u6052\u4e30\u94f6\u884c","20":"\u6d59\u5546\u94f6\u884c","21":"\u519c\u6751\u5408\u4f5c\u94f6\u884c","22":"\u6e24\u6d77\u94f6\u884c","23":"\u5fbd\u5546\u94f6\u884c\u80a1\u4efd\u6709\u9650\u516c\u53f8","24":"\u6751\u9547\u94f6\u884c","25":"\u4e0a\u6d77\u519c\u6751\u5546\u4e1a\u94f6\u884c","26":"\u519c\u6751\u4fe1\u7528\u5408\u4f5c\u793e","27":"\u97e9\u56fd\u5916\u6362\u94f6\u884c","28":"\u53cb\u5229\u94f6\u884c","29":"\u65b0\u97e9\u94f6\u884c","31":"\u97e9\u4e9a\u94f6\u884c"}
        }
    },
    
    methods:{
        handleSubmit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    //this.$Message.info('正在修改...');
                    this.setData();
                    
                } else {
                    this.$Message.error('修改失败!');
                }
            })
        },
        setBank(value){
            this.formInline.confirmBank=this.bankList[value];
            console.log(value);
        },
        /**
         * 添加银行卡数据总结
         */
        setData(){
            
            
            //1.Token令牌如果非首次绑定需要填写
            if(this.token){
                this.formInline.checked_token = this.token;
            }
            //2.存到vueX
            this.$store.commit('setbankBindData',this.formInline);
            //3.完成跳转
            this.rouLink('/user/confirmMessage');

        },
        city(data){
            this.formInline.account_area = data.province+'/'+data.city;
            this.formInline.confirmProvince = data.province;
            this.formInline.province_id =data.province_id;
            this.formInline.confirmCity = data.city;
            this.formInline.city_id =data.city_id;
            //this.handleSubmit('formInline');
        },
        setNum (name,num) {
                num = num.replace(/\s/g, '').replace(/[^\d]/g, '').replace(/(\d{4})(?=\d)/g, '$1 ')
                
                this.formInline[name] = num;
                //this.$set(element, 'account', element.account)
            
        },
        async getBankList(){
            let res = await this.$api.getBankList();
            if(res.errno===0){
                this.bankList = res.data
            }
            //this.bankList = res.data.list;
            
        },
        isEmptyObject( obj ) {
            var name;
            for ( name in obj ) {
                return false;
            }
            return true;
        }
    },
    created(){
        console.log(this.fromData);
        if(!this.isEmptyObject(this.fromData)){
            this.formInline = this.fromData;
        }
    },
    mounted(){
        this.bgColor("#F2F3F9");
        this.getBankList();
    }
}
</script>

