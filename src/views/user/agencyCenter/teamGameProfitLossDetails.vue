<template>
<Scroll :on-reach-bottom="handleReachBottom" :height="wh">
  <div class="teamProfitLossDetails">
    <div class="fixed">
      <titleBar title="团队游戏盈亏明细" />
      <div class="seach-box">
        <Row type="flex" justify="start" align="middle">
          <Col span="11">
            <DatePicker type="date" v-model="seachData.created_at_from" placeholder="起始时间" style="width:100%;"></DatePicker>
          </Col>
          <Col span="1">
            <span>-</span>
          </Col>
          <Col span="11">
            <DatePicker type="date" v-model="seachData.created_at_to" placeholder="结束时间" style="width:100%;"></DatePicker>
          </Col>

        </Row>
        <Row type="flex" justify="start" align="middle">
          
            <Col span="11">
                <div @click="ischeckUser = true">
                    <Input v-model="seachData.username"  placeholder="搜索用户名" style="width: 100%;" readonly>
                        <img src="../../../assets/userCenter/seach_user.png"   slot="suffix" style="width:14px;padding-top:9px;" />
                    </Input>
                </div>
            </Col>
            <Col span="1">
                <span></span>
            </Col>
            <Col span="11">
                <div  @click="iflottery = !iflottery" >
                    <Input v-model="iflotteryText" icon="ios-arrow-down" placeholder="全部游戏" style="width: 100%" readonly />
                </div>
            </Col>
        </Row>
        <Row type="flex" justify="start" align="middle">
          <Col span="24">
             <Button type="error" long style="border-radius: 0.16rem;" @click="submit">搜索</Button>
          </Col>
        </Row>
        
      </div>
        <Row type="flex" justify="start" align="middle" class="choice " :class="ifNav?'huihfjskhgu':''" >
            <Col span="12">
                <div class="item" :class="seachData.sum_type=='1'?'on':''" @click="changeStatus('1')">
                按日期显示
                </div>
            </Col>
            <Col span="12">
                <div class="item" :class="seachData.sum_type=='2'?'on':''" @click="changeStatus('2')">
                按汇总显示
                </div>
            </Col>
        </Row>
        <div class="Breadcrumb">
            {{aForeFathersTxt}}
        </div>
    </div>
    <div class="scroll">
        <myTable :columns="columnsItem" :data="data"></myTable>
    </div>
    <backTop />
    <checkUser v-model="ischeckUser" @checkVal="getCheckVal" />
    <lotteryClass  @lotteryData="getLottData" v-show="iflottery"/>
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
import lotteryClass from "@/components/public/lotteryClass.vue"
import titleBar from "@/components/public/Title-bar.vue"
import backTop from "@/components/public/BackTop.vue"
import minxins from '@/js/minxins.js';
import { setTimeout } from 'timers';
export default {
  name:"teamProfitLossDetails",
  mixins: [ minxins ],
  components:{
    Scroll,Card,titleBar,Row,Col,DatePicker,Icon,Select,Option,Input,checkUser,backTop,myTable,lotteryClass
  },
  data(){
    return{
      isFiltrate:false,
      seachData:{//搜索条件
        created_at_from:'',
        created_at_to:'',
        lottery_id:'',
        username:'',
        sum_type:'1',
        game_type:'number',
        parent_user_id:this.getUserItem('id'),
        page:'1'
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
                                      this.changeUsername(params.row.username);
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
      ischeckUser:false,//下级用户搜索控件是否显示
      iflottery:false,//是否显示彩种选择
      iflotteryData:{},//彩种选择数据
      iflotteryText:'',//彩种选择拼接字符
      aForeFathersTxt:'',//下级面包屑
    }
  },
  methods:{
    //状态搜索0:
    changeStatus(value){
      this.seachData.sum_type = value;
      this.submit();
    },
    //1.设定默认时间
    creatTime(){
      let date = new Date();
      this.seachData.created_at_from=this.getFormatDate(date,'start');
      this.seachData.created_at_to=this.getFormatDate(date);
    },
    //选择下级用户
    getCheckVal(username){
        this.seachData.username = username;
        console.log(username);
    },
    handleReachBottom () {
        return new Promise(resolve => {
            setTimeout(() => {
                this.getData();
                resolve();
            }, 2000);
        });
    },
    //选择下级用户
    getCheckVal(username){
        this.seachData.username = username;
        console.log(username);
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
    //从vuex获取
    formVuexRecover(){
        if(this.jsonIsNoll(this.$store.getters.getteamGameProfitLossSeach)){//如果为空,启动当前页面查询条件
          this.creatTime();
          this.$store.commit('setteamGameProfitLossSeach',this.seachData);
        }else{//如果不为空，同步远程数据
          this.seachData = this.$store.getters.getteamGameProfitLossSeach
        }
         //vuex是否有彩种
       if(!this.$store.getters.getiflotteryText){//如果为空
          this.$store.commit('setiflotteryText',this.iflotteryText);
        }else{//如果不为空，同步远程数据
          this.iflotteryText = this.$store.getters.getiflotteryText;
        }

        this.seachData.created_at_from=this.getFormatDate(this.seachData.created_at_from,'start');
        this.seachData.created_at_to=this.getFormatDate(this.seachData.created_at_to);
    },
    //获取代码
    async getData(){
        this.formVuexRecover();
        let res = await this.$api.getTeamLotteryProfits(this.seachData);
        let list= res.data.list;
        if(this.data.length<1){
          this.data=list;
        }else{
          this.data=this.data.concat(list);
        }
        this.count = res.data.count;
        //增加页码
        this.seachData.page++;
        //拿到下级面包屑
        this.getaForeFathersTxt(res.data.aForeFathers);
        this.mySelf = res.data.aForeFathers[res.data.aForeFathers.length - 1];
    },
    //拿到下级面包屑
    getaForeFathersTxt(obj){
        let aFore = obj;
        let str = '';
        for(let i=0;i<aFore.length;i++){
          //console.log(aFore[i]);
          if(i!=0){
            str+='>'+aFore[i].username;
          }else{
            str+=aFore[i].username;
          }
          
        }
        this.aForeFathersTxt = str;
    },
    //5.提交
    submit(){
      //初始化搜索条件
      this.seachData.created_at_from=this.getFormatDate(this.seachData.created_at_from,'start');
      this.seachData.created_at_to=this.getFormatDate(this.seachData.created_at_to);
      this.seachData.lottery_id=this.iflotteryData.lotteryKey?this.iflotteryData.lotteryKey:'';
      this.seachData.page=1;
      this.data = [];//初始化列表
      this.getData();
    },
    //查看下级
    changeUsername(name){
      this.seachData.username = name;
      this.rouLink('/user/teamGameProfitLoss');
    }
  },
  created(){
    
    this.submit();
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

