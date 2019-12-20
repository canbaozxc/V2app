<template>
<div class="trend_title">
    <div class="header">
      <div class="left txt-left">
        <Icon type="ios-arrow-back"  @click="backHistory()" />
      </div>
      <div class="h-tit"><span @click="openLottory">{{methodName}}<Icon type="md-arrow-dropdown" /></span></div>
        <div class="right txt-right" @click="openMethod">
            <Icon type="toggle"></Icon>
      </div>
    </div>
    <!--彩种组件-->
    <trendCheckLottory v-model="showTrendCheckLottory"
    :data="lotteryList" 
    :Identifier="lotteryIdentifier"
    @showStatus="changeshowTrendSetting"
    @depathLottery="setLottery" />
    <trendSetting v-model="showTrendSetting" ref="trendSetting"/>
</div>
</template>
<style lang="less" scoped>
.trend_title{
  
  .keep{
        background: rgba(3,3,3,.31);
        position: fixed;
        top: 0.5rem;
        bottom: 0;
        width: 100%;
        z-index: 50;
    }
  .header{
    position: relative;
    z-index: 500;
    width: 100%;
    height: 0.5rem;
    line-height: 0.5rem;
    color: #FFF;
    background-color: #F13131;
    a {
      color: #fff;
    }
    i{
        font-size: 0.22rem;
        padding-left: 0.1rem;
      }
    .h-tit{
      width: 3rem;
      margin: 0 auto;
      
      span{
        font-size: 16px;
        padding: 2px 5px;
        border:1px solid #FFF;
        i{
          font-size: 16px;
          padding-left: 0.05rem;
        }
      }
    }
    .txt-left{
      position: absolute;
      top: 0;
      left: 0;
    }
    .txt-right{
      position: absolute;
      top: 0;
      right: 0.2rem;
      font-size: 0.12rem;
      i{
        font-size: 0.14rem;
        padding-left: 0.05rem;
      }
    }
  }
}
  
</style>
<script>
import { Icon } from "iview"
import trendCheckLottory from "@/components/trend/trendCheckLottory.vue"
import trendSetting from "@/components/trend/trendSetting.vue"
import minxins from '@/js/minxins.js';
export default {
    name:"trendTitle",
    mixins:[minxins],
    components:{
        Icon,
        trendCheckLottory,
        trendSetting,
    },
    props:{
        gameType: {//彩种的缩写
            type: String,
            default: ''
        },
    },
    data(){
        return {
            showTrendSetting:false,//是否显示设置
          /*玩法组件 */
          methodName:'走势图',
          /*彩种组件 */
          lotteryName:'',
          showTrendCheckLottory:false,//是否显示彩种组件
          lotteryIdentifier:'',//彩种唯一标识
          lotteryList:[],//彩种列表
          issues:[],
          caixi:'',//彩系
          showKeep:false,//加载中
        }
    },
    methods:{
        //获取彩种数据
        //请求彩种列表
        async getLotteryList(){
            let res = await this.$api.getLotteryList();
            //3.拿到所有彩种列表开始载入彩种选择组件
            this.lotteryList = res.data;
            if(res.errno!=0){
                this.getLotteryList();
            }
        },
        //5.初始化彩种的所有信息
        async getGameSettingForBet(){
            this.showKeep = true;
            let pream = {
                'lottery':this.lotteryIdentifier
            }
            let res = await this.$api.getGameSettingForBet(pream);
            //请求历史开奖
            let data = res.data;
            this.$emit('depathGameData',data);
            //6.获取玩法信息，默认玩法数据
            //7.数据到位，开始载入玩法组件
            this.lotteryName = res.data.gameNameCn;
            if(res.errno!=0){
                this.getGameSettingForBet();
            }
            // 停止计时，输出时间
            this.showKeep = false;
        },
        //返回上一层
        backHistory(){
            this.$router.go(-1);
        },
        /**
         * 关闭开启彩种，玩法函数
         */
        //开启设置
        openMethod(){
            console.log(this.showTrendSetting)
          if(!this.showTrendSetting){
            this.showTrendSetting = true;
            //关闭彩种选择
            this.showTrendCheckLottory = false;
          }else{
            this.showTrendSetting = false;
          }
            this.$refs.trendSetting.closeLottory(this.showTrendSetting);
        },
        //开启彩种选择
        openLottory(){
          if(!this.showTrendCheckLottory){
            this.showTrendCheckLottory= true;
            //关闭设置
            this.showTrendSetting = false;
            this.$refs.trendSetting.closeLottory(false);
          }else{
            this.showTrendCheckLottory= false;
          }
          //console.log('openLottory'+this.showTrendSetting);
        },
        //4.默认彩种或者设置彩种，传出一个数据
        setLottery(data){
          //console.log(data);
          this.caixi = data.caixi;
          this.lotteryName = data.name;
          this.lotteryIdentifier = data.identifier;
          //5.根据彩种获取所有开奖，信息等数据
          this.getGameSettingForBet();
          this.$emit('depathLottory',data);
        },
        //8.默认彩种方法，设置彩种方法，传出一个数据
        setMethod(data){
          this.methodName = data.wayName;
          //9.结合彩种+玩法，进行组件页面的区分
          /**
           * 此处为所有玩法组件调用
           */
          let dataWay = data;
          dataWay.Tpl = this.caixi+'_'+data.wayName_en;
          let Tpl = this.caixi+'_'+data.wayName_en;
          this.$emit('depathTpl',dataWay);
        },
        changeshowTrendSetting(boolean){
          this.showTrendSetting= boolean;
        },
        changeShowMethod(boolean){
          this.trendSetting = boolean;
        }
    },
    created(){
      //1.请求所有彩种
      this.getLotteryList();
      //2.默认彩种标签名
      if(this.gameType){
        this.lotteryIdentifier=this.gameType;
      }
      //this.getGameSettingForBet();
    },
    mounted(){
      
    }
}
</script>
