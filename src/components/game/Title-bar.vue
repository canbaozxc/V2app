<template>
<div class="title_bar">
    <div class="header">
      <div class="left txt-left">
        <Icon type="ios-arrow-back"  @click="backHistory()" />
      </div>
      <div class="h-tit"><span @click="openMethod">{{methodName}}<Icon type="md-arrow-dropdown" /></span></div>
      <div class="right txt-right" @click="openLottory">
        {{lotteryName}}<Icon type="ios-arrow-down" />
      </div>
    </div>
    <!--彩种组件-->
    <checkLottory v-model="showLottory" 
    v-if="lotteryList.length"
    :data="lotteryList" 
    :Identifier="lotteryIdentifier"
    @showStatus="changeShowLottory" 
    @depathLottery="setLottery" />
    
    <checkMethod v-model="showMethod"  
    v-if="wayGroups.length"
    :data ="wayGroups"
    :defaultId="wayId"
    @showStatus="changeShowMethod" 
    @depathMethod="setMethod" />
    <div class="keep" v-if="showKeep"></div>
</div>
</template>
<style lang="less" scoped>
.title_bar{
  
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
import checkLottory from "@/components/game/CheckLottory.vue"
import checkMethod from "@/components/game/CheckMethod.vue"
import minxins from '@/js/minxins.js';
export default {
    name:"title-bar",
    mixins:[minxins],
    components:{
        Icon,
        checkLottory,
        checkMethod,
    },
    props:{
        gameType: {//彩种的缩写
            type: String,
            default: ''
        },
    },
    data(){
        return {
          /*玩法组件 */
          showMethod:false,//是否显示玩法组件
          methodName:'玩法',
          wayGroups:[],//所有玩法数据
          wayId:'',//默认玩法id
          /*彩种组件 */
          lotteryName:'切换彩种',
          showLottory:false,//是否显示彩种组件
          lotteryIdentifier:'',//彩种唯一标识
          lotteryList:[],//彩种列表
          issues:[],
          caixi:'',//彩系
          showKeep:false,//加载中
        }
    },
    methods:{
        /**
         * 数据请求
         */
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
            //请求当前彩种玩法
            this.wayGroups = res.data.wayGroups;//玩法组信息
            this.wayId = ""+res.data.defaultMethodId;//默认玩法id
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
        //开启玩法选择
        openMethod(){
          if(!this.showMethod){
            this.showMethod = true;
            //关闭彩种选择
            this.showLottory = false;
          }else{
            this.showMethod = false;
          }
          
        },
        //开启彩种选择
        openLottory(){
          if(!this.showLottory){
            this.showLottory= true;
            //关闭玩法选择
            this.showMethod = false;
          }else{
            this.showLottory= false;
          }
          //console.log('openLottory'+this.showLottory);
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
        changeShowLottory(boolean){
          this.showLottory= boolean;
        },
        changeShowMethod(boolean){
          this.showMethod = boolean;
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
