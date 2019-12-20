<template>
    <div id="withdraw">
        <div>
            <titleBar title="提现" />
        </div>
        <div style="background-color: #FFF;padding: 0.15rem 0.15rem;">
            <div>
                <Row type="flex" justify="start" align="top" class="rowtest">
                    <Col span="24" class="rctest">
                        <nobr>您目前可用提现余额：<nobr style="color: #F13131;font-size: 18px">{{withdrawList.balance}}</nobr>元</nobr>
                        <div>今日已经提现次数：{{withdrawList.frequency}}/{{withdrawList.maxFrequency}}次</div>
                    </Col>
                </Row>
                    <Row type="flex" justify="start" align="top" class="rowtest">
                        <Col span="5" class="rctest">
                            <p>提现金额</p>
                        </Col>
                        <Col span="15" class="rctest1">
                            <input id="amount" type="number" @keydown="handleInput2" @blur="getFocus(withdrawList.amount)" oninput="if(this.value.length>20)this.value=this.value.slice(0,20)"  v-model="withdrawList.amount"/>
                            <!--<Input type="number" v-model="withdrawList.amount"/>-->
                        </Col>
                        <Col span="4">
                            <p>元</p>
                        </Col>
                    </Row>
                <Row type="flex" justify="start" align="top" class="rowtest">
                    <Col span="5" class="rctest">
                        <p>收款银行卡</p>
                    </Col>
                    <Col span="15" class="rctest1">
                        <Select id="bankCard" v-model="withdrawList.bankCard" style="height: 0.3rem">
                            <Option v-for="(item,index) in cityList" :key="index" :value="item.id">{{ item.bank }}</Option>
                        </Select>
                    </Col>
                </Row>
                <Row type="flex" justify="start" align="top" class="rowtest">
                    <Col span="22"><p style="font-size: 12px;text-align: left;">温馨提示：提取余额到银行卡每天02:00AM~08:00AM累计提现不能超过150000元；单日提现次数最多为5次</p></Col>
                </Row>
            </div>
        </div>
        <div style="margin: 0.2rem 0.2rem 0rem 0.2rem">
            <Row type="flex" justify="start" align="top" class="rowtest">
                <Col span="24">
                    <Button type="error" shape="circle" size="large" long @click="getWithdrawConfirm()">下一步</Button>
                </Col>
            </Row>
        </div>
    </div>
</template>

<script>
    import titleBar from "@/components/public/Title-bar.vue";
    import {Row,Col,Input,Button,Select,Option} from "iview";
    import minxins from '@/js/minxins.js';
    export default {
        name: "withdraw",
        mixins: [minxins],
        data () {
            return {
                inputMaxL:10,
                cityList:[],
                withdrawList:{
                    nickname:'',//用户名
                    frequency:0,//可提现次数
                    maxFrequency:0,//最大可提现次数
                    balance:'',//余额
                    amount:'',//提现金额
                    bankCard:'',//收款银行卡Id
                    maxAmount:0,//单次最高提款额度
                    bankCardName:'',//收款银行卡名称
                    branch_address:'',//开户地址
                    account_name:'',//开户人
                    account:'',//卡号
                    username:'',//用户名称
                }
            }
        },
        methods:{
            getFocus(e){
                e = (e.match(/^\d*(\.?\d{0,2})/g)[0]) || null;
                e = Number(e);
                this.withdrawList.amount = e;
                this.withdrawList.min_amount = Number(this.withdrawList.min_amount);
                this.withdrawList.balance = Number(this.withdrawList.balance);
                if(e<this.withdrawList.min_amount){
                    this.withdrawList.amount = this.withdrawList.min_amount;
                }else if(e>this.withdrawList.balance){
                    this.withdrawList.amount = this.withdrawList.balance;
                }
            },
            handleInput2(e) {
                // 通过正则过滤小数点后两位
                e.target.value = (e.target.value.match(/^\d*(\.?\d{0,1})/g)[0]) || null

            },
            getWithdrawConfirm(){
                if(!this.withdrawList.amount){
                    this.$Message.error("提现金额不能为空");
                    $('#amount').focus();
                    return
                }
                if(!this.withdrawList.bankCard){
                    this.$Message.error("请选择银行卡");
                    return
                }
                if(this.withdrawList.frequency >= this.withdrawList.maxFrequency){
                    this.$Message.info("超出每天提现次数，每天最多只能提现"+this.withdrawList.maxFrequency+"次");
                    return
                }
                if(this.withdrawList.bankCard){
                    for(let i=0;i<this.cityList.length;i++){
                        if(this.withdrawList.bankCard == this.cityList[i].id){
                            this.withdrawList.bankCardName= this.cityList[i].bank;
                            this.withdrawList.branch_address = this.cityList[i].branch_address;
                            this.withdrawList.account_name = this.cityList[i].account_name;
                            this.withdrawList.account = this.cityList[i].account;

                        }
                    }
                    let data = JSON.stringify(this.withdrawList) // result传递的query参数。我们转为string
                    this.$router.push({path: '/user/withdrawConfirm/', query: {res: data}})
                }
            },
            async getWithdrawalRules(){
                let res = await this.$api.getWithdrawalRules();
                console.log(res.data);
                if(res.data){
                    this.withdrawList.frequency = res.data.withdraw_times;
                    this.withdrawList.maxFrequency = res.data.withdraw_limit_times;
                    this.withdrawList.maxAmount = res.data.max_amount;
                }
            },
            async getBankCardList(){
                let res = await this.$api.getBankCardList();
                this.cityList = res.data.list;
            },
            //获取用户信息
            async getCurrentUserInfo(){
                let res = await this.$api.getCurrentUserInfo();
                if(res && res.data){
                    this.withdrawList.username = res.data.username || '';
                    this.withdrawList.nickname = res.data.nickname || '';
                    this.withdrawList.balance = res.data.abalance || '';
                    this.withdrawList.balance = this.myToFixed(this.withdrawList.balance,2);
                    this.withdrawList.min_amount =  res.data.min_amount;
                }
            }
        },
        created(){
            this.getCurrentUserInfo();
            this.getWithdrawalRules();
            this.getBankCardList();
        },
        components:{
            titleBar,Row,Col,Input,Button,Select,Option
        }
    }
</script>

<style lang="less" scoped>
    #withdraw{
        .ivu-select {
            color: #999999;
        }
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
        .rowtest{
            font-size: 14px;
            line-height: 0.3rem;
            padding-bottom: 0.1rem;
            .rctest{
                text-align: left;
            }
            .rctest1{
                text-align: left;
            }
        }

    }
</style>