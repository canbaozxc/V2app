<template>
    <div>
        <div class="personalOverview">
            <titleBar title="个人总览" />
            <div class="fixed">
                <div class="seach-box">
                    <Row type="flex" justify="start" align="middle">
                        <Col span="11">
                            <DatePicker type="date"  placeholder="起始时间" clearable="clearable" style="width: 100%"  v-model="queryDataList.begin_date"></DatePicker>
                        </Col>
                        <Col span="1">
                            <span> - </span>
                        </Col>
                        <Col span="11">
                            <DatePicker type="date"  placeholder="结束时间" clearable="clearable" style="width: 100%"  v-model="queryDataList.end_date"></DatePicker>
                        </Col>
                    </Row>
                    <Row type="flex" justify="start" align="middle">
                        <Col span="24">
                            <Button type="error" long style="border-radius: 0.16rem;" @click="submit" :disabled="isDisable">搜索</Button>
                        </Col>
                    </Row>
                </div>
            </div>
            <div class="scroll">
               <Row type="flex" justify="start" align="middle">
                   <Col span="8" class="rcol">
                       <div class="rcdiv">余额</div>
                       <div class="rcdiv2">{{dataList.balance}}</div>
                   </Col>
                   <Col span="8" class="rcol">
                       <div class="rcdiv">充值</div>
                       <div class="rcdiv2">{{dataList.echarger}}</div>
                   </Col>
                   <Col span="8">
                       <div class="rcdiv">提现</div>
                       <div class="rcdiv2">{{dataList.withdraw}}</div>
                   </Col>
               </Row>
                <Row type="flex" justify="start" align="middle">
                    <Col span="8" class="rcol1">
                        <div class="rcdiv">投注</div>
                        <div class="rcdiv2">{{dataList.betting}}</div>
                    </Col>
                    <Col span="8" class="rcol1">
                        <div class="rcdiv">中奖</div>
                        <div class="rcdiv2">{{dataList.winning}}</div>
                    </Col>
                    <Col span="8" class="rcol2">
                        <div class="rcdiv">净盈利</div>
                        <div class="rcdiv2">{{dataList.netProfit}}</div>
                    </Col>
                </Row>
                <Row type="flex" justify="start" align="middle">
                    <Col span="8" class="rcol1">
                        <div class="rcdiv">打和返款</div>
                        <div class="rcdiv2">{{dataList.playingAndRefunding}}</div>
                    </Col>
                    <Col span="8" class="rcol1">
                        <div class="rcdiv">投注返点</div>
                        <div class="rcdiv2">{{dataList.betRebate}}</div>
                    </Col>
                    <Col span="8" class="rcol2">
                        <div class="rcdiv">活动赠送</div>
                        <div class="rcdiv2">{{dataList.eventGift}}</div>
                    </Col>
                </Row>
            </div>
            <div>
                <div class="divzi">
                    注：净盈利=中奖金额+投注返点+活动赠送-投注金额
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import titleBar from "@/components/public/Title-bar.vue"
    import {Row,Col,DatePicker} from "iview"
    export default {
        name: "personalOverview",
        data () {
            return {
                isDisable:false,
                clearable:false,
                queryDataList:{
                    begin_date:'',
                    end_date:'',
                },
                dataList:{
                    balance:0,//余额
                    echarger:0,//充值
                    withdraw:0,//提现
                    betting:0,//投注
                    winning:0,//中奖
                    netProfit:0,//净盈利
                    playingAndRefunding:0,//打和返款
                    betRebate:0,//投注返点
                    eventGift:0,//活动赠送
                }
            }
        },
        methods : {
            submit () {
                this.queryDataList.begin_date=this.getFormatDate(this.queryDataList.begin_date);
                this.queryDataList.end_date=this.getFormatDate(this.queryDataList.end_date);
                this.getList();
            },
            async getList(){
                this.isDisable = true;
                setTimeout(() => {
                    this.isDisable = false;
                }, 1000)
                let res = await this.$api.getSummary(this.queryDataList);
                if(res && res.data){
                   this.dataList.eventGift = res.data.bonus || 0;
                   this.dataList.winning = res.data.prize || 0;
                   this.dataList.betRebate = res.data.commission || 0;
                   this.dataList.playingAndRefunding = res.data.lose_commission || 0;
                   this.dataList.betting = res.data.sales || 0;
                   this.dataList.netProfit = res.data.profit || 0;
                   this.dataList.balance = res.data.balance || 0;
                   this.dataList.withdraw = res.data.withdrawal || 0;
                   this.dataList.echarger = res.data.deposit || 0;
                }

            },
            init(){
                let date = new Date();
                this.queryDataList.begin_date=this.getFormatDate(date);
                this.queryDataList.end_date=this.getFormatDate(date);
                this.getList();
            },
            //日期转字符串
            getFormatDate(dateTime) {
                var date = new Date(dateTime);
                var seperator = "-";
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                var nowDate = date.getDate();
                if(month >=1 && month <=9) {
                    month = "0" + month;
                }
                if(nowDate >=0 && nowDate <=9) {
                    nowDate = "0" + nowDate;
                }
                var newDate = year + seperator + month + seperator + nowDate;
                // if(type==="start"){
                //     newDate+=" 00:00:00";
                // }else{
                //     newDate+=" 23:59:59";
                // }
                return newDate;
            }
        },
        created () {
            this.init();
        },
        components:{
            titleBar,Row,Col,DatePicker
        }
    }
</script>

<style lang="less" scoped>
    .personalOverview{
        .fixed{
            width: 100%;
            .seach-box{
                font-size: 0.12rem;
                line-height: 0.45rem;
                width: 100%;
                background-color: #FFF;
                padding:0.15rem 0.15rem;
                span{
                    padding: 0 0.05rem;
                }
                .ivu-btn-error[disabled]{
                    color: #c5c8ce;
                    background-color: #ed4014;
                    border-color: #dcdee2;
                }
                .button{
                    margin: 10px 10px;
                    width: 0.55rem;
                    height: 0.3rem;
                    border-radius:15px;
                    line-height: 0.3rem;
                    font-size: 0.12rem;
                    background-color: #F13131;
                    color:#FFF;
                }

            }
        }
    }
</style>
<style lang="less">
    .personalOverview{
        .divzi{
            margin: 0.2rem 0.2rem;
            text-align: left;
            font-size: 0.1rem;
            color: #808695;
        }
        .seach-box{
            .ivu-col-span-11{
                width: 47.83333333%;
            }
            .ivu-input-with-suffix{
                padding-right: 24px;
            }
            .ivu-input:focus{
                box-shadow: none;

            }

        }
        .scroll {
            margin-top: 0.1rem;
            width: 100%;
            background-color: #FFF;
            z-index: 5;
            .rcol{
                border-right:2px solid #e8eaec;
            }
            .rcol1{
                border-right:2px solid #e8eaec;
                border-top:2px solid #e8eaec;
            }
            .rcol2{
                border-top:2px solid #e8eaec;
            }
            .rcdiv{
                font-size: 0.14rem;
                text-align:left;
                margin: 0.2rem 0px 0px 0.15rem;
            }
            .rcdiv2{
                font-size: 0.12rem;
                color: red;
                text-align:left;
                margin: 0.05rem 0 0.2rem 0.15rem;
            }
        }
    }
</style>