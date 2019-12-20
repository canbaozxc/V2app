<template>
  <div class="afterNoDetails" >
    <div class="header">
      <div class="left txt-left">
        
        <Icon type="ios-arrow-back" @click="goBack" />
      </div>
      <div class="h-tit">追号详情</div>
    </div>
    <div class="box">
        <div class="box-title">追号信息</div>
        <div class="box-body">
            <Row type="flex" justify="start" align="top">
                <Col span="4" class="txt-left th">
                    <p>订单编号</p>
                </Col>
                <Col span="19" offset="1" class="txt-left td">
                    <p>{{afterNoDetails.serial_number}}</p>
                </Col>
                <Col span="4" class="txt-left th">
                    <p>追号金额</p>
                </Col>
                <Col span="19" offset="1" class="txt-left td">
                    <p>￥{{afterNoDetails.amount_formatted}}</p>
                </Col>
                <Col span="4" class="txt-left th">
                    <p>完成金额</p>
                </Col>
                <Col span="19" offset="1" class="txt-left td">
                    <p>￥{{afterNoDetails.finished_amount_formatted}}</p>
                </Col>
                <Col span="4" class="txt-left th">
                    <p>取消金额</p>
                </Col>
                <Col span="19" offset="1" class="txt-left td">
                    <p>￥{{afterNoDetails.canceled_amount_formatted}}</p>
                </Col>
                <Col span="4" class="txt-left th">
                    <p>货币模式</p>
                </Col>
                <Col span="19" offset="1" class="txt-left td">
                    <p>{{afterNoDetails.formatted_coefficient}}</p>
                </Col>
                <Col span="4" class="txt-left th">
                    <p>开始期号</p>
                </Col>
                <Col span="19" offset="1" class="txt-left td">
                    <p>{{afterNoDetails.start_issue}}</p>
                </Col>
                <Col span="4" class="txt-left th">
                    <p>追号期数</p>
                </Col>
                <Col span="19" offset="1" class="txt-left td">
                    <p>{{afterNoDetails.total_issues}}期</p>
                </Col>
                <Col span="4" class="txt-left th">
                    <p>完成期数</p>
                </Col>
                <Col span="19" offset="1" class="txt-left td">
                    <p>{{afterNoDetails.finished_issues}}期</p>
                </Col>
                <Col span="4" class="txt-left th">
                    <p>取消期数</p>
                </Col>
                <Col span="19" offset="1" class="txt-left td">
                    <p>{{afterNoDetails.canceled_issues}}期</p>
                </Col>
                <Col span="4" class="txt-left th">
                    <p>追号状态</p>
                </Col>
                <Col span="19" offset="1" class="txt-left td">
                    <p>{{afterNoDetails.formatted_status}}</p>
                </Col>
            </Row>
        </div>
        <div class="box-bottom"></div>
    </div>

    

    <div class="box">
        <div class="box-title">追号管理</div>
        <div class="box-body">
            <Row type="flex" justify="start" align="top">
                <Col span="7" class="txt-left th">
                    <p>中奖后终止任务</p>
                    <p>是否追号</p>
                </Col>
                <Col span="16" offset="1" class="txt-left td">
                    <p>{{afterNoDetails.stop_on_won=='1'?'是':'否'}}<Button v-if="afterNoDetails.formatted_status==='进行中'" type="error" class="stopBtn" @click="stopTrace(afterNoDetails.id)">停止追号</Button></p>
                    <p>是</p>
                </Col>
            </Row>
        </div>
        <div class="box-bottom"></div>
    </div>
    <div class="box">
        <div class="box-title">追号清单</div>
        <div class="box-body noPadding">
            <Row type="flex" class="zhuihaoTit" justify="start" align="top">
                <Col span="6">
                    奖期
                </Col>
                <Col span="6">
                    倍数
                </Col>
                <Col span="6">
                    状态
                </Col>
                <Col span="6">
                    注单详情
                </Col>
            </Row>
            <Row type="flex" v-for="(item,index) in TraceProjectDetailList" :key="index" justify="start" align="top" style="line-height:0.26rem;">
                <Col span="6">
                    {{item.issue}}
                </Col>
                <Col span="6">
                    {{item.multiple}}倍
                </Col>
                <Col span="6">
                    {{item.display_status}}
                </Col>
                <Col span="6">
                    <!--render组件-->
                    <div v-if="item.display_status==='等待中'" @click="CancelTraceReserve(item)"><a>取消本期追号</a></div>
                    <div v-else-if="item.display_status==='已投注'" @click="openBettingDetails(item.project_id)"><a>查看详情</a></div>
                    <div v-else></div>
                </Col>
            </Row>
        </div>
        <div class="box-bottom"></div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.afterNoDetails{
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
            .stopBtn{
                border-radius: 0.15rem;
                margin-left: 0.2rem;
            }
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
          .zhuihaoTit{
              line-height: 0.3rem;
              height: 0.3rem;
              border-bottom: 1px solid #F2F3F9;
          }
        }
        .noPadding{
            padding: 0;
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
import Expand from '@/components/public/table/Expand.js';
import minxins from '@/js/minxins.js';
export default {
  name:"afterNoDetails",
  
  components:{
    Icon,Form,FormItem,Input,Row,Col,Select,Option,titleBar,Expand
  },
  props: {
      id:""
  },
  data(){
    return{
      afterNoDetails:{},
      page:1,
      TraceProjectDetailList:[],
    }
  },
  methods:{
     //开启投注详情
    openBettingDetails(id){
        console.log("开启投注详情");
        let pream ={
            "ifBettingDatail":true,
            "id":id
        }
        this.$emit("openBettingDetails",pream);
        this.$emit("goBack");
    },
      //取消本期追号
    async CancelTraceReserve(item){//ajax
        let pream = {
            id:item.trace_id,
            ids:'['+item.id+']',
        }
        let res = await this.$api.CancelTraceReserve(pream);
        if(res.errno===0){
            this.init();
        }
    },
    //停止追号
    async stopTrace(id){//ajax
        let pream = {
            id:id,
        }
        let res = await this.$api.stopTrace(pream);
        if(res.errno===0){
            this.init();
        }
    },
    async getDetail(){//ajax
        let pream = {
            id:this.id
        }
        let res = await this.$api.getTraceDetai(pream);
        
        this.afterNoDetails = res.data;

    },
    async getTraceProjectDetail(){//追号清单
        let pream = {
            trace_id:this.id,
            page:this.page,
            pagesize:'20'
        }
        let res = await this.$api.getTraceProjectDetail(pream);
        this.TraceProjectDetailList = res.data.list;

    },
    //关闭当前组件
    goBack(){
      this.$emit("goBack");
    },
    //初始化
    init(){
        this.getDetail();
        this.getTraceProjectDetail();
    }
  },
  created(){
      this.init();
  },
  mounted(){

  }
}
</script>

