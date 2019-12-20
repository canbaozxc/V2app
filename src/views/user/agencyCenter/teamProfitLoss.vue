<template>
  <div class="teamProfitLossDetails">
    <div class="fixed">
      <titleBar title="团队盈亏" />
      <div class="seach-box">
        <Row type="flex" justify="start" align="middle">
          <Col span="11">
            <DatePicker type="date" v-model="seachData.startData" @on-change="handleChange" placeholder="起始时间" style="width:100%;"></DatePicker>
          </Col>
          <Col span="1">
            <span>-</span>
          </Col>
          <Col span="11">
            <DatePicker type="date" v-model="seachData.endData"  placeholder="结束时间" style="width:100%;"></DatePicker>
          </Col>

        </Row>
        <Row type="flex" justify="start" align="middle">
          <Col span="24">
            <div>
               <div @click="ischeckUser = true">
                    <Input v-model="seachData.userName"  placeholder="搜索用户名" style="width: 100%;" readonly>
                        <img src="../../../assets/userCenter/seach_user.png"   slot="suffix" style="width:14px;padding-top:9px;" />
                    </Input>
                </div>
            </div>
          </Col>

        </Row>
        <Row type="flex" justify="start" align="middle">
          <Col span="24">
             <Button type="error" long style="border-radius: 0.16rem;">搜索</Button>
          </Col>
        </Row>
        
      </div>
        
        <div class="Breadcrumb">
            test123>test77
        </div>
    </div>
    <div class="scroll">
        <Row type="flex" justify="start" align="middle">
            <Col span="8" class="itemsPream">
                <p>充值总额</p>
                <span>0.0000</span>
            </Col>
            <Col span="8" class="itemsPream">
                <p>返点总额</p>
                <span>0.0000</span>
            </Col>
            <Col span="8" class="itemsPream">
                <p>开户总人数</p>
                <span>0.0000</span>
            </Col>
            <Col span="8" class="itemsPream">
                <p>提款总额</p>
                <span>0.0000</span>
            </Col>
            <Col span="8" class="itemsPream">
                <p>中奖总额</p>
                <span>0.0000</span>
            </Col>
            <Col span="8" class="itemsPream">
                <p>首充总人数</p>
                <span>0.0000</span>
            </Col>
            <Col span="8" class="itemsPream">
                <p>销售总额</p>
                <span>0.0000</span>
            </Col>
            <Col span="8" class="itemsPream">
                <p>输值佣金</p>
                <span>0.0000</span>
            </Col>
            <Col span="8" class="itemsPream">
                <p>促销奖金</p>
                <span>0.0000</span>
            </Col>
            <Col span="24" class="total">
                <strong>总盈亏<span>1258.000000</span></strong>
            </Col>
        </Row>
    </div>
    <Row type="flex" justify="start" align="middle">
        <Col span="24">
            <Button  long style="width:3rem;border-radius: 1.5rem; background-color:#CCCCCC; margin-top:0.25rem;height:0.45rem;color:#FFF;box-shadow:none; border:none;" @click="rouLink('/user/teamProfitLossDetails')">查看明细</Button>
        </Col>
    </Row>
    <checkUser v-model="ischeckUser" @checkVal="getCheckVal" />
  </div>
</template>
<style lang="less">
.teamProfitLossDetails{
     
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
    .total{
        height: 0.45rem;
        line-height: 0.45rem;
        strong{
            font-size: 0.14rem;
            font-weight:400;
            span{
                color: #F13131;
                padding-left: 0.15rem;
            }
        }
    }
    .itemsPream{
        height: 0.75rem;
        border-right:1px solid #F2F3F9;
        border-bottom:1px solid #F2F3F9;
        padding: 0.2rem 0 0 0.15rem;
        text-align: left;
        p{
            font-size: 0.12rem;
            color: #333;
            font-weight:400;
        }
        span{
            font-size: 0.12rem;
            color: #F13131;
            font-weight:400;
        }
    }
  }
}
</style>

<style lang="less" scoped>
.teamProfitLossDetails{

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
  .Breadcrumb{
      height: 0.39rem;
      line-height: 0.39rem;
      text-align: left;
      padding: 0 0.16rem;
      background-color: #FFF;
      margin-top:0.13rem;
  }
  .scroll{
    
    margin-top: 0.1rem;
    width: 100%;
    background-color: #FFF;
    z-index:5;
    
  }
}
</style>


<script>
import { Scroll,Card,Row,Col,DatePicker,Icon,Select,Option,Input} from "iview"

import titleBar from "@/components/public/Title-bar.vue"
import checkUser from "@/components/public/checkUser.vue"
import minxins from '@/js/minxins.js';
import { setTimeout } from 'timers';
export default {
  name:"teamProfitLossDetails",
  mixins: [ minxins ],
  components:{
    Scroll,Card,titleBar,Row,Col,DatePicker,Icon,Select,Option,Input,checkUser
  },
  data(){
    return{
      isFiltrate:false,
      seachData:{//搜索条件
        startData:'',
        endData:'',
        userName:'',
      },
      list: [],
      ifNav:false,
      ischeckUser:false,
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
    //选择下级用户
    getCheckVal(userName){
        this.seachData.userName = userName;
        console.log(userName);
    },

    show (index) {
        //console.log(this.data[index]);
        console.log(index);
        /*this.$Modal.info({
            title: 'User Info',
            content: `Name：${this.data[index].name}<br>Age：${this.data[index].age}<br>Address：${this.data[index].address}`
        })*/
    },
    
  },
  created(){
    
  },
  mounted(){
    this.bgColor("#F2F3F9");
    
  }
}
</script>

