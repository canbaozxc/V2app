<template>
  <div class="bettingDetails" >
    <div class="header">
      <div class="left txt-left">
        
        <Icon type="ios-arrow-back" @click="goBack" />
      </div>
      <div class="h-tit">投注详情</div>
    </div>
    <div class="box">
        <div class="box-title">投注信息</div>
        <div class="box-body">
            <Row type="flex" justify="start" align="top">
                <Col span="4" class="txt-left th">
                    <p>订单编号</p>
                </Col>
                <Col span="19" offset="1" class="txt-left td">
                    <p>{{bettingDetails.serial_number}}</p>
                </Col>
                <Col span="4" class="txt-left th">
                    <p>游戏信息</p>
                </Col>
                <Col span="19" offset="1" class="txt-left td">
                    <p>{{bettingDetails.lottery}}<strong>[{{bettingDetails.way}}]</strong></p>
                </Col>
                <Col span="4" class="txt-left th">
                    <p>奖金组</p>
                </Col>
                <Col span="19" offset="1" class="txt-left td">
                    <p>{{bettingDetails.prize_group}}</p>
                </Col>
                <Col span="4" class="txt-left th">
                    <p>奖金标准</p>
                </Col>
                <Col span="19" offset="1" class="txt-left td">
                    <p>{{bettingDetails.prize_set_formatted}}</p>
                </Col>
                <Col span="4" class="txt-left th">
                    <p>投注金额</p>
                </Col>
                <Col span="19" offset="1" class="txt-left td">
                    <p>{{bettingDetails.amount}}元</p>
                </Col>
                <Col span="4" class="txt-left th">
                    <p>倍数</p>
                </Col>
                <Col span="19" offset="1" class="txt-left td">
                    <p>{{bettingDetails.multiple}}倍</p>
                </Col>
                <Col span="4" class="txt-left th">
                    <p>注数</p>
                </Col>
                <Col span="19" offset="1" class="txt-left td">
                    <p>{{bettingDetails.bet_count}}注</p>
                </Col>
                <Col span="4" class="txt-left th">
                    <p>货币模式</p>
                </Col>
                <Col span="19" offset="1" class="txt-left td">
                    <p>{{bettingDetails.formatted_coefficient}}</p>
                </Col>
                <Col span="4" class="txt-left th">
                    <p>投注时间</p>
                </Col>
                <Col span="19" offset="1" class="txt-left td">
                    <p>{{bettingDetails.bought_at}}</p>
                </Col>
                <Col span="4" class="txt-left th">
                    <p>投注号码</p>
                </Col>
                <Col span="19" offset="1" class="txt-left td">
                    <p>{{bettingDetails.bet_number}}</p>
                </Col>
                <Col span="4" class="txt-left th">
                    <p>投注期号</p>
                </Col>
                <Col span="19" offset="1" class="txt-left td">
                    <p>{{bettingDetails.issue}}</p>
                </Col>
            </Row>
        </div>
        <div class="box-bottom"></div>
    </div>

    <div class="box">
        <div class="box-title">开奖信息</div>
        <div class="box-body">
            <Row type="flex" justify="start" align="top">
                <Col span="4" class="txt-left th">
                    <p>开奖号码</p>
                    <p>状态</p>
                    <p>中奖金额</p>
                </Col>
                <Col span="19" offset="1" class="txt-left td">
                    <p>{{bettingDetails.winning_number}}</p>
                    <p :class="bettingDetails.formatted_status==='已中奖'?'green':'red'">{{bettingDetails.formatted_status}}</p>
                    <p>{{bettingDetails.amount_formatted}}元</p>
                </Col>
            </Row>
        </div>
        <div class="box-bottom"></div>
    </div>

    <div class="box">
        <div class="box-title">追号管理</div>
        <div class="box-body">
            <Row type="flex" justify="start" align="top">
                <Col span="4" class="txt-left th">
                    <p>是否追号</p>
                    <p v-if='!bettingDetails.trace_id=="--"'>追号设置</p>
                </Col>
                <Col span="19" offset="1" class="txt-left td">
                    <p  :class="bettingDetails.trace_id=='--'?'red':'green'">{{bettingDetails.trace_id=="--"?'否':'是'}}</p>
                    <p v-if='!bettingDetails.trace_id=="--"'>{{bettingDetails.stop_on_win=='0'?'中奖继续追号':'中奖即停'}}</p>
                </Col>
            </Row>
        </div>
        <div class="box-bottom"></div>
    </div>
    <Button v-if="bettingDetails.trace_id!=='--'" type="error" long class="lookAfterNo" @click="openAfterNoDetails(bettingDetails.trace_id)">查看追号详情</Button>
  </div>
</template>
<style lang="less" scoped>
.bettingDetails{
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #F2F3F9;
  z-index: 500;
  overflow: auto;
    .lookAfterNo{
      width: 3rem;
      height: 0.45rem;
      margin: 0 auto;
      padding: 0;
      font-size: 0.16rem;
      border-radius: 0.22rem;
      margin-top: 0.15rem;
    }
    .header{
      position: relative;
      z-index: 500;
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
        font-size: 16px;
      }
      .txt-left{
        position: absolute;
        top: 0;
        left: 0;
      }
    }
    .box{
        width: 100%;
        background-color: #FFF;
        .box-title,.box-body,.box-bottom{
          padding: 0 0.15rem;
          
        }
        .box-title{
            height: 0.31rem;
            line-height: 0.31rem;
            border-bottom: 1px solid #F2F3F9;
            color: #333333;
            font-size: 0.12rem;
            text-align: left;
        }
        .box-body{
          .txt-left{
            text-align: left;
            line-height: 0.26rem;
          }
          .th{
            color: #999999;
          }
          .td{
              strong{
                  font-weight: 400;
                  color: #999999;
              }
              .red{
                color:#F13131;
              }
              .green{
                color:#65BE69;
              }
            
          }
          .txt-right{
            text-align: right;
          }
        }
        .box-bottom{
          padding-bottom: 0.1rem;
          margin-bottom: 0.1rem;
        }
    }
}
</style>


<script>
import { Icon,Form,FormItem,Input,Row,Col,Select,Option } from "iview"
import titleBar from "@/components/public/Title-bar.vue"
import minxins from '@/js/minxins.js';
export default {
  name:"bettingDetails",
  
  components:{
    Icon,Form,FormItem,Input,Row,Col,Select,Option,titleBar
  },
  props: {
      bettingId:""
  },
  data(){
    return{
      bettingDetails:{},
      ifAfterNoDatail:false,
    }
  },
  methods:{
    async getDetail(){//ajax
        console.log(this.bettingId);
        let pream = {
          id:this.bettingId
        }
        let res = await this.$api.getProjectDetail(pream);
        
        this.bettingDetails = res.data;
        console.log(this.bettingDetails.trace_id);
    },
    //关闭当前组件
    goBack(){
      this.$emit("goBack");
    },
    //打开追号详情
    openAfterNoDetails(id){
      let pream = {
        "ifAfterNoDatail":true,
        "id":id
      }
      this.$emit("goBack",pream);
    }
  },
  created(){
      console.log(this.bettingId);
      this.getDetail();
  },
  mounted(){

  }
}
</script>

