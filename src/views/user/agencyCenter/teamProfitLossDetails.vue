<template>
<Scroll :on-reach-bottom="handleReachBottom" :height="wh">
  <div class="teamProfitLossDetails">
    <div class="fixed">
      <titleBar title="团队盈亏明细" />
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
            <div @click="ischeckUser = true">
                <Input v-model="seachData.userName"  placeholder="搜索用户名" style="width: 100%;" readonly>
                    <img src="../../../assets/userCenter/seach_user.png"   slot="suffix" style="width:14px;padding-top:9px;" />
                </Input>
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
            <Col span="12">
                <div class="item on">
                按日期显示
                </div>
            </Col>
            <Col span="12">
                <div class="item">
                按汇总显示
                </div>
            </Col>
        </Row>
        <div class="Breadcrumb">
            test123>test77
        </div>
    </div>
    <div class="scroll">
        <myTable :columns="columnsItem" :data="data"></myTable>
    </div>
    <backTop />
    <checkUser v-model="ischeckUser" @checkVal="getCheckVal" />
  </div>
</Scroll>
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
    .ivu-card-bordered{
      border-top:none;
      border-color:#F2F3F9;
    }
    .cordLi{
      padding: 5px 16px 2px 16px;
      border-bottom: 1px solid #F2F3F9;
    }
    .ivu-table-border {
      td,th{
        border-right: none;
        height: 0.35rem;
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
import checkUser from "@/components/public/checkUser.vue"
import myTable from '@/components/public/table/table.vue';
import titleBar from "@/components/public/Title-bar.vue"
import backTop from "@/components/public/BackTop.vue"
import minxins from '@/js/minxins.js';
import { setTimeout } from 'timers';
export default {
  name:"teamProfitLossDetails",
  mixins: [ minxins ],
  components:{
    Scroll,Card,titleBar,Row,Col,DatePicker,Icon,Select,Option,Input,checkUser,backTop,myTable
  },
  data(){
    return{
      isFiltrate:false,
      seachData:{//搜索条件
        startData:'',
        endData:'',
        userName:'',
      },
      wh:localStorage.getItem('widowHeight'),
      list: [],
      ifNav:false,
      ischeckUser:false,
      columnsItem: [
          {
              title: '操作',
              key: 'action',
              width: 100,
              align: 'center',
              render: (h, params) => {
                  if(params.row.username===this.mySelf.username){

                  }else{
                      return h('div', [
                      h('a', {
                              style: {
                                  marginRight: '5px'
                              },
                              on: {
                                  click: () => {
                                      this.show(params.row.user_id)
                                  }
                              }
                          }, '查看下级'),
                      ]);
                  }
              }
          },
          {
              title: '用户名',
              key: 'username',
              width: 150,
          },
          {
              title: '日期',
              key: 'date',
              width: 150
          },
          {
              title: '彩种',
              key: 'lottery',
              width: 150
          },
          {
              title: '销售总额',
              key: 'turnover',
              width: 100
          },
          {
              title: '返点总额',
              key: 'commission',
              width: 200
          },
          {
              title: '中奖总额',
              key: 'prize',
              width: 150
          },
          {
              title: '促销总额',
              key: 'lose_commission',
              width: 100
          },
          {
              title: '总盈亏',
              key: 'profit',
              width: 150
          },
          
      ],
      data: [
      ],
      mySelf:{},//当前用户
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
    
    async getTeamLotteryProfitsDate(){//ajax
        let res = await this.$api.getTeamLotteryProfitsDate();

       if(this.data.length<1){
          this.data = res.data.list;
       }else{
         this.data=this.data.concat(res.data.list);
       }
        let aForeFathers = res.data.aForeFathers;
        this.mySelf = aForeFathers[aForeFathers.length-1];
        this.$forceUpdate();


    },
    handleReachBottom () {
        return new Promise(resolve => {
            setTimeout(() => {
                //this.getData();
                this.getTeamLotteryProfitsDate();
                resolve();
            }, 2000);
        });
    },
    show (index) {
        //console.log(this.data[index]);
        console.log(index);
        /*this.$Modal.info({
            title: 'User Info',
            content: `Name：${this.data[index].name}<br>Age：${this.data[index].age}<br>Address：${this.data[index].address}`
        })*/
    },
    //选择下级用户
    getCheckVal(userName){
        this.seachData.userName = userName;
        console.log(userName);
    }
  },
  created(){
    //console.log(localStorage.getItem('clientHeight'));
    this.getTeamLotteryProfitsDate();
  },
  mounted(){
    this.bgColor("#F2F3F9");
    let _this = this;
    $(function(){
      $(".ivu-scroll-container").scroll(function () {
        //console.log("aefrsf")
        if($(this).scrollTop()>200){
          _this.ifNav = true;
        }else{
          _this.ifNav = false;
        }
         
      })
      
    })
  }
}
</script>

