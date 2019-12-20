<template>
    <div class="confirmMessage" id="confirmMessage">
        <titleBar title="银行卡绑定" />
        <StepBar current="2"/>
        <div class="view-main">
            <div class="item">
                <Row  type="flex" justify="center" align="middle">
                    <Col span="6">
                        <span class="left">开户银行</span>
                    </Col>
                    <Col span="16">
                        <p>{{fromData.confirmBank}}</p>
                    </Col>
                </Row>
            </div>
            <div class="item">
                <Row  type="flex" justify="center" align="middle">
                    <Col span="6">
                        <span class="left">开户行区域</span>
                    </Col>
                    <Col span="16">
                        <p>{{fromData.confirmProvince}}/{{fromData.confirmCity}}</p>
                    </Col>
                </Row>
            </div>
            <div class="item">
                <Row  type="flex" justify="center" align="middle">
                    <Col span="6">
                        <span class="left">支行名称</span>
                    </Col>
                    <Col span="16">
                        <p>{{fromData.branch}}</p>
                    </Col>
                </Row>
            </div>
            <div class="item">
                <Row  type="flex" justify="center" align="middle">
                    <Col span="6">
                        <span class="left">开户人姓名</span>
                    </Col>
                    <Col span="16">
                        <p>{{fromData.account_name}}</p>
                    </Col>
                </Row>
            </div>
            <div class="item">
                <Row  type="flex" justify="center" align="middle">
                    <Col span="6">
                        <span class="left">银行账号</span>
                    </Col>
                    <Col span="16">
                        <p>{{fromData.account}}</p>
                    </Col>
                </Row>
            </div>
            
        </div>
        <div class="submit">
            <Row type="flex" justify="center" align="middle">
                <Col span=12>
                    <Button class="return" @click="rouLink('/user/addBankCard')">返回上一步</Button>
                </Col>
                <Col span=12>
                    <Button type="error" @click="bindBankCard">确认提交</Button>
                </Col>
            </Row>
            
            
        </div>
        
    </div>
    
</template>
<style lang="less">
#confirmMessage{
    
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
                color: #999999;
                text-align: left;
            }
            p{
                font-size: 0.12rem;
                text-align: left;
                color: #333;
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
    .submit{
        
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

        button{
            height: 0.45rem;
            font-size: 0.16rem;
            border-radius: 0.225rem;
            width: 1.55rem;
        }
        .return{
            background-color: #CCCCCC;
            color: #FFF;
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
    name:"confirmMessage",
    mixins: [ minxins ],
    components:{
        titleBar,Icon,Form,FormItem,Input,Row,Col,MyInput,Select,Option,BaseCity,StepBar
    },
    computed: {
        fromData () {
            return this.$store.getters.getbankBindData
        }
    },
    data(){
        return{
        }
    },
    
    methods:{
        clear(){
            //清空绑定银行卡数据
            this.$store.commit("setbankBindData",{});
            //清空银行卡验证token
            this.$store.commit("setbankToken",'');
        },
        async bindBankCard(){
            let pream = this.fromData;
            let res = await this.$api.bindBankCard(this.fromData);
            if(res.errno===0){
                this.$Modal.success({
                    title: "添加成功",
                    content: "添加银行卡成功",
                    okText: '确认',
                    onOk: () => {
                        router.push('/user/bindCard');
                    },
                });
            }
        },
        
    },
    created(){
    },
    mounted(){
        this.bgColor("#F2F3F9");
        console.log(this.fromData);
        //this.setNum("6228481101100634315");
    }
}
</script>

