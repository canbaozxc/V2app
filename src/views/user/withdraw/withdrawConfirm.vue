<template>
    <div id="withdrawConfirm">
        <div>
            <titleBar title="提现确认"/>
        </div>
        <div style="background-color: #FFF;padding: 0.15rem 0.15rem;">
            <div>
                <Row type="flex" justify="start" align="top" class="rowtest">
                    <Col span="12" class="rctest">
                        <p>请认真核对以下信息：</p>
                    </Col>
                </Row>
                <Row type="flex" justify="start" align="top" class="rowtest">
                    <Col span="8" class="rctest">
                        <p>用户名</p>
                    </Col>
                    <Col span="12" class="rctest1">
                        <p>{{withdrawConfirmList.userName}}</p>
                    </Col>
                </Row>
                <Row type="flex" justify="start" align="top" class="rowtest">
                    <Col span="8" class="rctest">
                        <p>可提现金额</p>
                    </Col>
                    <Col span="12" class="rctest1">
                        <p>{{withdrawConfirmList.cashWithdrawalAmount}}元</p>
                    </Col>
                </Row>
                <Row type="flex" justify="start" align="top" class="rowtest">
                    <Col span="8" class="rctest">
                        <p>本次提现金额</p>
                    </Col>
                    <Col span="12" class="rctest1">
                        <p>{{withdrawConfirmList.thisWithdrawalAmount}}元</p>
                    </Col>
                </Row>
                <Row type="flex" justify="start" align="top" class="rowtest">
                    <Col span="8" class="rctest">
                        <p>开户银行</p>
                    </Col>
                    <Col span="12" class="rctest1">
                        <p>{{withdrawConfirmList.bankAccount}}</p>
                    </Col>
                </Row>
                <Row type="flex" justify="start" align="top" class="rowtest">
                    <Col span="8" class="rctest">
                        <p>开户地址</p>
                    </Col>
                    <Col span="12" class="rctest1">
                        <p>{{withdrawConfirmList.accountAddress}}</p>
                    </Col>
                </Row>
                <Row type="flex" justify="start" align="top" class="rowtest">
                    <Col span="8" class="rctest">
                        <p>开户人</p>
                    </Col>
                    <Col span="12" class="rctest1">
                        <p>{{withdrawConfirmList.accountName}}</p>
                    </Col>
                </Row>
                <Row type="flex" justify="start" align="top" class="rowtest">
                    <Col span="8" class="rctest">
                        <p>提现银行卡号</p>
                    </Col>
                    <Col span="12" class="rctest1">
                        <p>{{withdrawConfirmList.cashWithdrawalBank}}</p>
                    </Col>
                </Row>
                <Row type="flex" justify="start" align="top" class="rowtest">
                    <Col span="24" class="rctest">
                        <p style="color: #F13131">为确保您的资金安全，请输入资金密码以确认您的身份!</p>
                    </Col>
                </Row>
                <Row type="flex" justify="start" align="top" class="rowtest">
                    <Col span="8" class="rctest">
                        <p>验证资金密码</p>
                    </Col>
                    <Col span="12" class="rctest1">
                        <input type="password" id="fundPassword" v-model="withdrawConfirmList.fundPassword" style="height: 0.3rem" maxleng="15"/>
                    </Col>
                    <Col span="4">
                    </Col>
                </Row>
            </div>
        </div>
        <div style="margin: 0.2rem 0.2rem 0rem 0.2rem">
            <Row type="flex" justify="start" align="top" class="rowtest">
                <Col span="24">
                    <Button type="error" shape="circle" size="large" long @click="subWithdrawList">确认无误</Button>
                </Col>
            </Row>
        </div>
    </div>
</template>

<script>
    import titleBar from "@/components/public/Title-bar.vue";
    import {Row,Col,Input,Button} from "iview";
    import minxins from '@/js/minxins.js';
    export default {
        name: "withdrawConfirm",
        mixins:[minxins],
        data () {
            return {
                result:'',
                withdrawConfirmList:{
                    userName:'',//用户名
                    cashWithdrawalAmount:'',//可提现金额
                    thisWithdrawalAmount:'',//本次提现金额
                    bankAccount:'',//开户银行
                    accountAddress:'',//开户地址
                    accountName:'',//开户人
                    cashWithdrawalBank:'',//提现银行卡号
                    fundPassword:'',//验证资金密码
                }
            }
        },
        methods:{
            subWithdrawList(){
                if(!this.withdrawConfirmList.fundPassword){
                   this.$Message.error("验证资金密码不能为空");
                    $('#fundPassword').focus();
                    return
                }
                let pream={
                    action:'withdraw',
                    bankcard_id:this.withdrawConfirmList.bankCardId,//用户银行卡Id
                    amount:this.withdrawConfirmList.thisWithdrawalAmount,//提现金额
                    fund_password:this.withdrawConfirmList.fundPassword,//资金密码
                }
                this.submitWotjdraw(pream);
            },
            async submitWotjdraw(pream){
                let res = await this.$api.withdraw(pream);
                if(res.errno == 0){
                    this.$Message.success("提现成功!");
                    this.$router.push({path: '/user/withdraw/'});
                }else{
                    this.$router.push({path: '/user/withdraw/'});
                }

            },
            getWithdrawList(){
                let data = JSON.parse(this.$route.query.res)
                this.result = Object.assign({}, data)
                console.log(this.result)
                if(this.result){
                    this.withdrawConfirmList.userName = this.result.nickname;
                    this.withdrawConfirmList.thisWithdrawalAmount = this.result.amount;
                    this.withdrawConfirmList.cashWithdrawalBank = this.result.account;
                    this.withdrawConfirmList.bankAccount = this.result.bankCardName;
                    this.withdrawConfirmList.accountAddress = this.result.branch_address;
                    this.withdrawConfirmList.accountName = this.result.account_name;
                    this.withdrawConfirmList.cashWithdrawalAmount = this.result.balance;
                    this.withdrawConfirmList.bankCardId = this.result.bankCard;
                }
            },
        },
        created(){
            this.getWithdrawList();
        },
        components:{
            titleBar,Row,Col,Input,Button
        }
    }
</script>

<style lang="less" scoped>
    #withdrawConfirm{
        input{
            display: inline-block;
            width: 100%;
            height: 32px;
            line-height: 1.5;
            padding: 4px 7px;
            font-size: 12px;
            border: 1px solid #dcdee2;
            border-radius: 4px;
            color: #515a6e;
            background-color: #fff;
            background-image: none;
            position: relative;
            cursor: text;
            transition: border .2s ease-in-out,background .2s ease-in-out,box-shadow .2s ease-in-out;
        }
        .rowtest1{
            font-size: 14px;
            line-height: 0.4rem;
        }
        .rowtest{
            font-size: 14px;
            line-height: 0.3rem;
            padding-bottom: 0.1rem;
            .rctest{
                text-align: left;
                p{
                    color:#999999
                }
            }
            .rctest1{
                text-align: left;
            }
        }

    }
</style>