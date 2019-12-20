<template>
  <div class="invitationCodeInfo">
    <div class="fixed">
      <titleBar title="投注记录" />
      <div class="seach-box">
        <Row type="flex" justify="start" align="middle">
          <Col span="11">
            <DatePicker type="date" v-model="seachData.startData" @on-change="handleChange" placeholder="起始时间" style="width:100%;"></DatePicker>
          </Col>
          <Col span="1">
            <span>-</span>
          </Col>
          <Col span="11">
            <DatePicker type="date" v-model="seachData.endData" placeholder="结束时间" style="width:100%;"></DatePicker>
          </Col>

        </Row>
        <Row type="flex" justify="start" align="middle">
          <Col span="24">
            <div  @click="iflottery = !iflottery" >
            <Input v-model="iflotteryText" icon="ios-arrow-down" placeholder="全部游戏" style="width: 100%" readonly />
            </div>
          </Col>

        </Row>
        <Row type="flex" justify="start" align="middle">
          <Col span="24">
             <Button type="error" long style="border-radius: 0.16rem;">搜索</Button>
          </Col>
        </Row>
        
      </div>
      <Row type="flex" justify="start" align="middle" class="choice " :class="ifNav?'huihfjskhgu':''" >
          <Col span="6">
            <div class="item on">
              全部
            </div>
          </Col>
          <Col span="6">
            <div class="item">
              已中奖
            </div>
          </Col>
          <Col span="6">
            <div class="item">
              未中奖
            </div>
          </Col>
          <Col span="6">
            <div class="item">
              未开奖
            </div>
          </Col>
        </Row>
    </div>
    <div class="scroll">
        <div @click="openBettingDetails(item.id)"  v-for="(item, index) in list" :key="index" class="cordLi">
          <Row type="flex" justify="start" align="top">
            <Col span="11" class="asd1" >
                <p>{{item.lottery}}</p>
                <p>投注金额：{{item.coefficient}}</p>
            </Col>
            <Col span="10" class="bsd1" style="">
                <p style="color:#999999;">{{item.bet_number}}</p>
                <p :class="item.prize.charAt(0)==='-'?'green':'red'">{{item.prize.charAt(0)==='-'?item.status:"已中"+item.prize+"元"}}</p>
            </Col>
            <Col span="3" class="csd1">
                <Icon type="ios-arrow-forward" />
            </Col>
          </Row>
        </div>
    </div>
    <lotteryClass  @lotteryData="getLottData" v-show="iflottery"/>
    <BettingDetails @goBack="closeBettingDetails" v-if="ifBettingDatail" :bettingId="bettingId"/>
    <AfterNoDetails @goBack="getNegation('ifAfterNoDatail')" v-if="ifAfterNoDatail" :bettingId="bettingId" />
    <backTop />
  </div>
</template>
<style lang="less">
.invitationCodeInfo{
  .seach-box{
    .ivu-select-single .ivu-select-selection .ivu-select-placeholder,.ivu-select-item{
      text-align: left;
    }
    .ivu-select-visible .ivu-select-selection{
      box-shadow: none;
    }
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
  .scroll{
    .ivu-card-bordered{
      border-top:none;
      border-color:#F2F3F9;
    }
    .cordLi{
      padding: 5px 16px 2px 16px;
      border-bottom: 1px solid #F2F3F9;
    }
  }
}
</style>

<style lang="less" scoped>
.invitationCodeInfo{

  .fixed{
    width: 100%;
    .seach-box{
      font-size: 0.12rem;
      line-height: 0.45rem;
      width: 100%;
      background-color: #FFF;
      padding:0 0.15rem;
      span{
        padding: 0 0.05rem;
      }

      .filtrate{
        width: 0.75rem;
        height: 0.3rem;
        border: 1px solid #DCDCDC;
        border-radius:15px;
        line-height: 0.3rem;
        font-size: 0.12rem;
      }
      .button{
        width: 0.75rem;
        height: 0.3rem;
        border-radius:15px;
        line-height: 0.3rem;
        font-size: 0.12rem;
        background-color: #F13131;
        color:#FFF;
      }
      
    }
    .huihfjskhgu{
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      background-color: #FFF;
      z-index: 12;
    }
    .choice{
      font-size: 0.12rem;
      line-height: 0.45rem;
      background-color: #FFF;
        .item{
          border-bottom: 2px solid #FFF;
        }
        .on{
          border-bottom: 2px solid #F13131;
        }
      }
    .filtrate-box{
      width: 100%;
      height: 0.6rem;
      position: absolute;
      top:0.95rem;
      background-color: #FFF;
      border:1px solid #F2F3F9;
    }
    
  }
  .scroll{
    
    margin-top: 0.1rem;
    width: 100%;
    background-color: #FFF;
    z-index:5;
    .asd1{
      text-align: left;
      font-size: 0.12rem;
      line-height: 0.30rem;
      .num{
        span{
          color:#387AFF;
        }
      }
    }
    .bsd1{
      text-align: right;
      font-size: 0.12rem;
      line-height: 0.30rem;
      overflow: hidden;
      .red{
        color:#F13131;
      }
      .green{
        color:#65BE69;
      }
    }
    .csd1{
      .ivu-icon{
        position: absolute;
        top: 0.2rem;
      }
      .select-arrow {
        position: absolute;
        right: 8px;
        line-height: 1;
        transform:rotate(0deg);
        font-size: 14px;
        color: #808695;
        transition: all .2s ease-in-out;
      }
      .rdeg{
          transform:rotate(-180deg);
      }
    }
  }
}
</style>


<script>
import { Scroll,Card,Row,Col,DatePicker,Icon,Select,Option,Input } from "iview"
import BettingDetails from '@/components/user/BettingDetails.vue'
import AfterNoDetails from '@/components/user/AfterNoDetails.vue'
import titleBar from "@/components/public/Title-bar.vue"
import lotteryClass from "@/components/public/lotteryClass.vue"
import backTop from "@/components/public/BackTop.vue"
import minxins from '@/js/minxins.js';
import { setTimeout } from 'timers';
export default {
  name:"invitationCodeInfo",
  mixins: [ minxins ],
  components:{
    Scroll,Card,titleBar,Row,Col,DatePicker,Icon,Select,Option,lotteryClass,Input,BettingDetails,AfterNoDetails,backTop
  },
  data(){
    return{
      isFiltrate:false,
      seachData:{//搜索条件
        startData:'',
        endData:'',
        account:'',
        
      },
      list: [],
      iflottery:false,//是否显示彩种选择
      ifBettingDatail:false,//是否显示投注详情
      ifAfterNoDatail:false,//是否显示追号详情
      iflotteryData:{},//彩种选择数据
      iflotteryText:'',//彩种选择拼接字符
      bettingId:"4567",//投注详情参数id
      ifNav:false,
    }
  },
  methods:{
 
    //取反
    getNegation(name){
      this[name] = !this[name];
    },
    handleChange(data){
      console.log(this.seachData.startData);
    },
    //无限下拉
    handleReachBottom () {
        return new Promise(resolve => {
            setTimeout(() => {
                const last = this.list[this.list.length - 1];
                for (let i = 1; i < 11; i++) {
                    this.list.push(last + i);
                }
                resolve();
            }, 200);
        });
    },
    async getList(){
        let res = await this.$api.getbettingRecordList();
        if(this.list.length<1){
          this.list=res.data.list;
        }else{
          this.list=this.list.concat(res.data.list);
        }
    },
    /**
     *  彩种选择方法
     * */
    //拿到彩种数据
    getLottData(data){
      this.iflottery = false;
      this.iflotteryData = data;
      this.setiflotteryText();
    },
    //彩种分类和彩种字符拼接
    setiflotteryText(){
      let data = this.iflotteryData;
      if(data.className&&data.lotteryName){
        this.iflotteryText = data.className+'/'+data.lotteryName;
      }else if(data.className){
          this.iflotteryText = data.className;
      }
    },
    //开启投注详情
    openBettingDetails(id){
      this.ifBettingDatail = true;
      this.bettingId = id;
    },
    //关闭投注详情
    closeBettingDetails(data){
      this.ifBettingDatail = false;//关闭投注详情
      //如果data为true就打开”追号详情“
      if(data===true){
        this.ifAfterNoDatail = true;//开启追号详情
      }
      
    }
  },
  created(){
    //console.log(localStorage.getItem('clientHeight'));
    
  },
  mounted(){
    //let oDiv = document.getElementById("div1");
    this.bgColor("#F2F3F9");
    this.getList();
    let _this = this;
    /*setTimeout(function(){
      _this.getList();
    },100);*/
    $(function(){
      //console.log($(window).height());
      let wH = $(window).height()
      let soll = '';
      $(document).scroll(function () {
        soll = $(document).height() - wH - $(document).scrollTop();
        console.log();
        
        if($(document).scrollTop()>200){
          _this.ifNav = true;

        }else{
          _this.ifNav = false;
        }
        if(soll<5){
            _this.getList();
        }
         
      })
      
    })
  }
}
</script>

