<template>
    <div id="recharge">
        <div>
            <titleBar title="支付宝转账" />
        </div>
        <div style="background-color: #FFF;padding: 0.15rem 0.15rem;">
            <div style="font-size: 14px">
                <Row type="flex" justify="start" align="top" class="rowtest">
                    <Col span="8" class="rctest">
                        <p>订单编号</p>
                    </Col>
                    <Col span="12" class="rctest1">
                        <p>{{renchangeMoneyTwoList.orderNumber}}</p>
                    </Col>
                    <Col span="4">
                    </Col>
                </Row>
                <Row type="flex" justify="start" align="top" class="rowtest">
                    <Col span="8" class="rctest">
                        <p>收款户名</p>
                    </Col>
                    <Col span="12" class="rctest1">
                        <p style="color: #F13131">{{renchangeMoneyTwoList.collectionName}}</p>
                    </Col>
                    <Col span="4">
                        <u style="color: #F13131" @click="copy(renchangeMoneyTwoList.collectionName)">复制</u>
                    </Col>
                </Row>
                <Row type="flex" justify="start" align="top" class="rowtest">
                    <Col span="8" class="rctest">
                        <p>收款账号</p>
                    </Col>
                    <Col span="12" class="rctest1">
                        <p style="color: #F13131">{{renchangeMoneyTwoList.collectionUser}}</p>
                    </Col>
                    <Col span="4">
                        <u style="color: #F13131" @click="copy(renchangeMoneyTwoList.collectionUser)">复制</u>
                    </Col>
                </Row>
                <Row type="flex" justify="start" align="top" class="rowtest">
                    <Col span="8" class="rctest">
                        <p>充值金额</p>
                    </Col>
                    <Col span="12" class="rctest1">
                        <p>{{renchangeMoneyTwoList.rechargeAmount}}</p>
                    </Col>
                    <Col span="4">
                    </Col>
                </Row>
                <Row type="flex" justify="start" align="top" class="rowtest">
                    <Col span="8" class="rctest">
                        <p>存款人</p>
                    </Col>
                    <Col span="12" class="rctest1">
                        <Input v-model="renchangeMoneyTwoList.Depositor" style="height: 0.3rem" placeholder="请输入存款人"/>
                    </Col>
                    <Col span="4">
                    </Col>
                </Row>
                <Row type="flex" justify="start" align="top" class="rowtest">
                    <Col span="8" class="rctest">
                        <p>扫码支付</p>
                        <p style="font-size: 12px">(长按保存)</p>
                    </Col>
                    <Col span="12" class="rctest1">
                        <div style="width:1.25rem;height:1.23rem;background-color: red">

                        </div>
                    </Col>
                    <Col span="4">
                    </Col>
                </Row>
                <Row type="flex" justify="start" align="top" class="rowtest">
                    <Col span="22"><p style="font-size: 12px;text-align: left;">温馨提示：以上账号仅限本次使用，账号不定期更换！请您根据本页面所提供的收款账号进行支付，若存款至过期账号，本公司恕不负责！</p></Col>
                </Row>
            </div>
        </div>
        <div style="margin: 0.2rem 0.2rem 0rem 0.2rem">
            <Row type="flex" justify="start" align="top" class="rowtest">
                <Col span="24">
                    <Button type="error" shape="circle" size="large" long @click="getBankCardTransfer()">确认并提交订单</Button>
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
        name: "recharge.vue",
        mixins:[minxins],
        data () {
            return {
                renchangeMoneyTwoList:{
                    orderNumber:2019072315290120448,//订单编号
                    collectionName:'王五',//收款户名
                    collectionUser:13888888888,//收款账号
                    rechargeAmount:'300.00元',//充值金额
                    Depositor:'',//存款人
                }
            }
        },
        methods:{
            getBankCardTransfer(){
                console.log("1111")
                this.$router.push('/')
            }
        },
        components:{
            titleBar,Row,Col,Input,Button
        }
    }
</script>

<style lang="less" scoped>
    #recharge{
        .rowtest{
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