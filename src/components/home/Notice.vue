<template>
    <Row class="notice">
        <Col span="4" class="mg_ico">
            <img src="../../assets/notice.png">公告
        </Col>
        <Col span="18">
            <router-link to="/user/noice">
                <marquee id="marqueeWrap" loop="infinite" behavior="scroll" direction="left">
                    尊敬的会员您好,目前我司银行入款卡工商伏启萌已经停用,请广大会员勿要私自保存账号转账到此停用账号,否则我司将无法收到您的款项,请您知悉!请每次充值至充值页面获取最新账户充值即可,给您带来不便还请谅解,谢谢您的配合!尊敬的会员您好,目前我司银行入款卡黄树民已经停用,请广大会员勿要私自保存账号转账到此停用账号,否则我司将无法收到您的款项,请您知悉!请每次充值至充值页面获取最新账户充值即可,给您带来不便还请谅解,谢谢您的配合!尊敬的会员您好,目前我司银行入款卡贺寅已经停用,请广大会员勿要私自保存账号转账到此停用账号,否则我司将无法收到您的款项,请您知悉!请每次充值至充值页面获取最新账户充值即可,给您带来不便还请谅解,谢谢您的配合!尊敬的易发彩会员您好：我司入款提交订单请您按照以下步骤正确提交哦1、充值我司银行账户----请您提交订单备注付款人姓名2、充值我司支付宝商户----请您根据页面提示备注对应的单号后6位提交订单3、充值页面偶有出现两个商户-----提交订单请您按照付款商户选择对应的进入提交订单尊敬的易发彩会员您好：为了会员账户安全，请您保管好个人账户信息，经常更换密码；若在其它公用设备登入请勿保存账号密码，离开设备请清除浏览器缓存，谢谢！欢迎光临-易发彩票官方网址018381.com彩票奢华之旅等您开启在这里您将感受到与众不同，前所未有的游戏体验，我们的信誉保证，品牌卓越，是您最明智的网投选择！！！
                </marquee>
            </router-link>
        </Col>
        
        <Col span="2" class="lg_ico"><!--Icon type="ios-arrow-forward" /--><img src="../../assets/more.png"></Col>
    </Row>
</template>
<style lang="less"  scoped>
.notice{
    height: 0.35rem;
    background-color: #FFF;
    line-height: 0.35rem;
    overflow: hidden;
    a{
        color: #333;
    }
    .mg_ico{
        color: #FF8700;
        font-size: 0.12rem;
        img{
            width: 0.14rem;
            vertical-align:middle;
            margin-top: -0.03rem;
        }
    }
    .lg_ico{
        font-size: 0.14rem;
        img{
            height: 0.1rem;
            vertical-align:middle;
            margin-top: -0.03rem;
        }
    }
}

</style>
<script>
import {Row,Col,Icon} from "iview"
export default {
    name: "Notice",
    components:{
        Row,Col,Icon
    }
}

</script>

