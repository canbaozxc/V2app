<template>
    <div class="financialDetails">
        <titleBar title="资金明细" />
        <div class="view-main">
            <div class="item" @click="rouLink('/user/accountChangeRecord')">
                <span class="left bg1">帐变记录</span>
                <Icon class="icon"  type="ios-arrow-forward" />
            </div>
            <div class="item" @click="rouLink('/user/transferRecord')">
                <span class="left bg2">转账记录</span>
                <Icon class="icon"  type="ios-arrow-forward" />
            </div>
            <div class="item" @click="rouLink('/user/rechargeRecord')">
                <span class="left bg3">充值记录</span>
                <Icon class="icon"  type="ios-arrow-forward" />
            </div>
            <div class="item" @click="rouLink('/user/rechargApplication')">
                <span class="left bg4">充值申请</span>
                <Icon class="icon"  type="ios-arrow-forward" />
            </div>
            <div class="item" @click="rouLink('/user/depositRecord')">
                <span class="left bg5">提现记录</span>
                <Icon class="icon"  type="ios-arrow-forward" />
            </div>
            <div class="item" @click="rouLink('/user/depositApplication')">
                <span class="left bg6">提现申请</span>
                <Icon class="icon"  type="ios-arrow-forward" />
            </div>
        </div>
        
    </div>
    
</template>

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
                padding-left: 0.22rem;
                color: #333;
            }
            .bg1{
                background: url("../../../assets/userCenter/account-change-record.png") no-repeat left center;
                background-size: 0.16rem;
            }
            .bg2{
                background: url("../../../assets/userCenter/transfer-record.png") no-repeat left center;
                background-size: 0.16rem;
            }
            .bg3{
                background: url("../../../assets/userCenter/recharge-record.png") no-repeat left center;
                background-size: 0.16rem;
            }
            .bg4{
                background: url("../../../assets/userCenter/recharge-application.png") no-repeat left center;
                background-size: 0.16rem;
            }
            .bg5{
                background: url("../../../assets/userCenter/withdrawal-record.png") no-repeat left center;
                background-size: 0.16rem;
            }
            .bg6{
                background: url("../../../assets/userCenter/withdrawal-application.png") no-repeat left center;
                background-size: 0.16rem;
            }
            input{
                outline: none;
                border: 0;
                color: #999;
                text-align: right;
            }
            .icon{
                position: absolute;
                right: 0;
                font-size: 0.16rem;
                padding-top: 0.13rem;
            }
        }
    }
</style>
<script>
import { Icon } from "iview"
import titleBar from "@/components/public/Title-bar.vue"
import minxins from '@/js/minxins.js';
export default {
    name:"financialDetails",
    mixins: [ minxins ],
    data(){
        return{
        }
    },
    components:{
        titleBar,Icon
    },
    methods:{
        
        bgColor(color){
            document.querySelector('body').setAttribute('style', 'background-color:'+color);
        }
    },
    mounted(){
        this.bgColor("#F2F3F9");
        

    }
}
</script>

