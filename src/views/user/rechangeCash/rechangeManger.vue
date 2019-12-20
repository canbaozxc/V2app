<!--充值方式选择rechangeManger-->
<template>
    <div class="rechangeManger">
         <component  v-bind:is="'titleBar'"  title="选择充值方式" > </component>
         <div class="view-main">
             <ul class="rechangemangetlist">
                 <li  @click="rouLink('/user/bankCardTransfer')">
                     <div class="ico-tu">
                        <img src="../../../assets/userCenter/reange/bankReange.png" />
                     </div>
                     <div class="li_content">
                         <h3>银行卡转账</h3>
                         <p>单笔最低10元，最高10000000元</p>
                     </div>
                     <div class="icon">
                          <Icon type="ios-arrow-forward"  />
                     </div>
                 </li>
                 <li  @click="rouLink('/user/rechangeMoney')">
                     <div class="ico-tu">
                         <img src="../../../assets/userCenter/reange/zhifubao.png" />
                     </div>
                     <div class="li_content">
                         <h3>支付宝转账</h3>
                         <p>单笔最低10元，最高10000000元</p>
                     </div>
                     <div class="icon">
                         <Icon type="ios-arrow-forward"  />
                     </div>
                 </li>
                 <li  @click="rouLink('/')">
                     <div class="ico-tu">
                         <img src="../../../assets/userCenter/reange/weichar.png" />
                     </div>
                     <div class="li_content">
                         <h3>微信转账</h3>
                         <p>单笔最低10元，最高10000000元</p>
                     </div>
                     <div class="icon">
                         <Icon type="ios-arrow-forward"  />
                     </div>
                 </li>
                 <li  @click="rouLink('/')">
                     <div class="ico-tu">
                         <img src="../../../assets/userCenter/reange/QQ.png" />
                     </div>
                     <div class="li_content">
                         <h3>QQ钱包</h3>
                         <p>单笔最低10元，最高10000000元</p>
                     </div>
                     <div class="icon">
                         <Icon type="ios-arrow-forward"  />
                     </div>
                 </li>
                 <li  @click="rouLink('/')">
                     <div class="ico-tu">
                         <img src="../../../assets/userCenter/reange/quickPay.png" />
                     </div>
                     <div class="li_content">
                         <h3>快捷支付</h3>
                         <p>单笔最低10元，最高10000000元</p>
                     </div>
                     <div class="icon">
                         <Icon type="ios-arrow-forward"  />
                     </div>
                 </li>
             </ul>
         </div>
    </div>
</template>

<style lang="less" scoped>
.rechangeManger{
    .rechangemangetlist{
        li{
            background-color: #FFF;
            height: 0.6rem;
            margin-bottom: 0.1rem;
            padding: 0 0.3rem 0 0.6rem;
            position: relative;
            .ico-tu{
                padding-top: 0.16rem;
                position: absolute;
                left: 0.15rem;
                top: 0;
                img{
                    width:0.28rem;
                    height: 0.28rem;

                }
            }
            .icon{
                width: 0.15rem;
                height: 0.6rem;
                line-height: 0.6rem;
                position: absolute;
                right: 0.15rem;
                top: 0;
                .ivu-icon{
                    font-size: 0.16rem;
                }
            }
            .li_content{
                text-align: left;
                h3{
                    height: 0.3rem;
                    font-size: 0.14rem;
                    color: #333;
                    font-weight: 400;
                     line-height:0.46rem;
                }
                p{
                     height: 0.3rem;
                    font-size:0.12rem;
                    font-family:"MicrosoftYaHei";
                    font-weight:400;
                    color:#999;
                    line-height:0.3rem;
                }
            }
        }
    }
}

</style>
<script>
import { Icon } from "iview"

import minxins from '@/js/minxins.js';
export default {
    name:"rechangeManger",
    mixins:[minxins],
    data(){
        return{
            isBankCardList :'',//是否绑定了银行卡
        }
    },
    components:{
        Icon,
        titleBar:() => import("@/components/public/Title-bar.vue"),
    },
    methods:{
        init(){
            this.getBankCardList();

        },
        async getBankCardList(){
            let res = await this.$api.getBankCardList();
                if(res && res.data && res.data.list && res.data.list.length>0){
                    this.isBankCardList=1;
                }else{
                    this.isBankCardList=0;
                    console.log("您还未绑定银行卡,需绑定银行卡后才可进行充值操作")
                }
        },
    },
    data(){
        return{
            
        }
    },
    created(){
        this.init()
    },
    mounted(){
        this.bgColor("#F2F3F9");
    }
}
</script>
