<template>
    <div class="agencyCenter">
        <titleBar title="代理中心" />
        <div class="banner">
            <img src="../../../assets/userCenter/agencybg.png"  />
        </div>
        <div class="view-main">
            <div class="item" @click="rouLink('/user/teamGameProfitLoss')">
                <span class="left bg1">团队游戏盈亏</span>
                <Icon class="icon"  type="ios-arrow-forward" />
            </div>
            <div class="item" @click="rouLink('/user/teamProfitLoss')">
                <span class="left bg2">团队盈亏</span>
                <Icon class="icon"  type="ios-arrow-forward" />
            </div>
        </div>

        <div class="view-main">
            <div class="item" @click="rouLink('/user/lowerList')">
                <span class="left bg3">用户列表</span>
                <Icon class="icon"  type="ios-arrow-forward" />
            </div>
            <div class="item" @click="rouLink('/user/openLower')">
                <span class="left bg4">下级开户</span>
                <Icon class="icon"  type="ios-arrow-forward" />
            </div>
            <div class="item" @click="rouLink('/user/invitationCodeMessage')">
                <span class="left bg5">邀请码管理</span>
                <Icon class="icon"  type="ios-arrow-forward" />
            </div>
            <div class="item" @click="rouLink('/user/rechargeLower')">
                <span class="left bg6">下级入款</span>
                <Icon class="icon"  type="ios-arrow-forward" />
            </div>
            <div class="item" @click="rouLink('/user/depositLower')">
                <span class="left bg7">下级出款</span>
                <Icon class="icon"  type="ios-arrow-forward" />
            </div>
        </div>
        <checkUser v-model="ischeckUser" @checkVal="getCheckVal" />
    </div>
    
</template>

<style lang="less" scoped>
.agencyCenter{
    .banner{
        width: 100%;
        img{
            border: none;
            width: 100%;
        }
    }
    .view-main{
        margin-top: 0.15rem;
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
                background: url("../../../assets/userCenter/agency1.png") no-repeat left center;
                background-size: 0.16rem;
            }
            .bg2{
                background: url("../../../assets/userCenter/agency2.png") no-repeat left center;
                background-size: 0.16rem;
            }
            .bg3{
                background: url("../../../assets/userCenter/agency3.png") no-repeat left center;
                background-size: 0.16rem;
            }
            .bg4{
                background: url("../../../assets/userCenter/agency4.png") no-repeat left center;
                background-size: 0.16rem;
            }
            .bg5{
                background: url("../../../assets/userCenter/agency5.png") no-repeat left center;
                background-size: 0.16rem;
            }
            .bg6{
                background: url("../../../assets/userCenter/agency6.png") no-repeat left center;
                background-size: 0.16rem;
            }
            .bg7{
                background: url("../../../assets/userCenter/agency7.png") no-repeat left center;
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
}
    
</style>
<script>
import { Icon } from "iview"
import titleBar from "@/components/public/Title-bar.vue"
import checkUser from "@/components/public/checkUser.vue"
import minxins from '@/js/minxins.js';
export default {
    name:"agencyCenter",
    mixins: [ minxins ],
    data(){
        return{
            ischeckUser:false,
        }
    },
    components:{
        titleBar,Icon,checkUser
    },
    methods:{
        //选择下级用户
        getCheckVal(userName){
            console.log(userName);
        }
    },
    mounted(){
        this.bgColor("#F2F3F9");
        this.setLocal("clientHeight",document.documentElement.clientHeight);
        this.setLocal("remSize",document.getElementsByTagName('html')[0].style.fontSize)

    }
}
</script>

