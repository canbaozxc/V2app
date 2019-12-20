<template>
    <div id="bankCardTransfer">
        <div>
            <titleBar title="银行转账" />
        </div>
        <div>
            <Row type="flex" justify="start" align="top" class="rowtest1">
                <Col span="8" style="text-align: right">
                    <p>订单编号</p>
                </Col>
                <Col span="12" style="text-align: center">
                    <p>{{bankCardTransferList.orderNumber}}</p>
                </Col>
                <Col span="4">
                </Col>
            </Row>
        </div>
        <div style="background-color: #FFF;padding: 0rem 0.15rem;">
            <div>
                <Row type="flex" justify="start" align="top" class="rowtest" style="padding-top: 0.1rem">
                    <Col span="24" class="rctest">
                        <p>以下是您的预转账的银行账户资料</p>
                    </Col>
                </Row>
                <Row type="flex" justify="start" align="top" class="rowtest">
                    <Col span="8" class="rctest">
                        <p>收款银行</p>
                    </Col>
                    <Col span="12" class="rctest1">
                        <p>{{bankCardTransferList.beneficiaryBank}}</p>
                    </Col>
                    <Col span="4">
                        <u style="color: #F13131" @click="copy(bankCardTransferList.beneficiaryBank)">复制</u>
                    </Col>
                </Row>
                <Row type="flex" justify="start" align="top" class="rowtest">
                    <Col span="8" class="rctest">
                        <p>开户支行</p>
                    </Col>
                    <Col span="12" class="rctest1">
                        <p>{{bankCardTransferList.accountOpeningBranch}}</p>
                    </Col>
                    <Col span="4">
                        <u style="color: #F13131" @click="copy(bankCardTransferList.accountOpeningBranch)">复制</u>
                    </Col>
                </Row>
                <Row type="flex" justify="start" align="top" class="rowtest">
                    <Col span="8" class="rctest">
                        <p>收款户名</p>
                    </Col>
                    <Col span="12" class="rctest1">
                        <p>{{bankCardTransferList.collectionName}}</p>
                    </Col>
                    <Col span="4">
                        <u  style="color: #F13131" @click="copy(bankCardTransferList.collectionName)">复制</u>
                    </Col>
                </Row>
                <Row type="flex" justify="start" align="top" class="rowtest">
                    <Col span="8" class="rctest">
                        <p>收款账号</p>
                    </Col>
                    <Col span="12" class="rctest1">
                        <p>{{bankCardTransferList.collectionUser}}</p>
                    </Col>
                    <Col span="4">
                        <u style="color: #F13131" @click="copy(bankCardTransferList.collectionUser)">复制</u>
                    </Col>
                </Row>
                <Row type="flex" justify="start" align="top" class="rowtest">
                    <Col span="24" class="rctest">
                    </Col>
                </Row>
                <Row type="flex" justify="start" align="top" class="rowtest">
                    <Col span="12" class="rctest">
                        <p>充值金额与存款人信息</p>
                    </Col>
                </Row>
                <Row type="flex" justify="start" align="top" class="rowtest">
                    <Col span="8" class="rctest">
                        <p>充值金额</p>
                    </Col>
                    <Col span="12" class="rctest1">
                        <p>{{bankCardTransferList.rechargeAmount}}</p>
                    </Col>
                    <Col span="4">
                    </Col>
                </Row>
                <Row type="flex" justify="start" align="top" class="rowtest">
                    <Col span="8" class="rctest">
                        <p>真实姓名</p>
                    </Col>
                    <Col span="12" class="rctest1">
                        <Input v-model="bankCardTransferList.name" style="height: 0.3rem" placeholder="请输入存款人"/>
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
                    <Button type="error" shape="circle" size="large" long @click="getRecharge">已完成付款,提交订单</Button>
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
        name: "bankCardTransfer",
        mixins:[minxins],
        data () {
            return {
                bankCardTransferList:{
                    orderNumber:2019072315290120448,//订单编号
                    collectionName:'王五',//收款户名
                    collectionUser:13888888888,//收款账号
                    rechargeAmount:'300.00元',//充值金额
                    beneficiaryBank:'招商银行',//收款银行
                    accountOpeningBranch:'XXXXX银行',//开户支行
                    name:'',
                }
            }
        },
        methods:{
            getRecharge(){
                this.$router.push('/')
            }
        },
        components:{
            titleBar,Row,Col,Input,Button
        }
    }
</script>

<style lang="less" scoped>
    #bankCardTransfer{
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