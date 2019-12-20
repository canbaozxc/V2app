<template>
  <div class="teamProfitLossDetails">
    <div class="fixed">
      <titleBar title="团队游戏盈亏" />
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
        
        <div class="Breadcrumb">
            {{aForeFathersTxt}}
        </div>
    </div>
    <div class="scroll">
        <Row type="flex" justify="start" align="middle">
            <Col span="8" class="itemsPream">
                <p>销售总额</p>
                <span>{{agentSumInfo.total_turnover}}</span>
            </Col>
            <Col span="8" class="itemsPream">
                <p>中奖总额</p>
                <span>{{agentSumInfo.total_prize}}</span>
            </Col>
            <Col span="8" class="itemsPream">
                <p>返点总额</p>
                <span>{{agentSumInfo.total_commission}}</span>
            </Col>
            <Col span="8" class="itemsPream">
                <p>促销奖金</p>
                <span>{{agentSumInfo.total_bonus}}</span>
            </Col>
            <Col span="8" class="itemsPream">
                <p>数字彩总盈亏</p>
                <span>{{agentSumInfo.total_profit}}</span>
            </Col>
            
        </Row>
    </div>
    <Row type="flex" justify="start" align="middle">
        <Col span="24">
            <Button  long style="width:3rem;border-radius: 1.5rem; background-color:#CCCCCC; margin-top:0.25rem;height:0.45rem;color:#FFF;box-shadow:none; border:none;" @click="rouLink('/user/teamGameProfitLossDetails')">查看明细</Button>
        </Col>
    </Row>
    <backTop />
    <checkUser v-model="ischeckUser" @checkVal="getCheckVal" />
    <lotteryClass  @lotteryData="getLottData" v-show="iflottery"/>
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
import checkUser from "@/components/public/checkUser.vue"
import titleBar from "@/components/public/Title-bar.vue"
import lotteryClass from "@/components/public/lotteryClass.vue"
import backTop from "@/components/public/BackTop.vue"
import minxins from '@/js/minxins.js';
import { setTimeout } from 'timers';
export default {
  name:"teamProfitLossDetails",
  mixins: [ minxins ],
  components:{
    Scroll,Card,titleBar,Row,Col,DatePicker,Icon,Select,Option,Input,checkUser,lotteryClass,backTop
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
        parent_user_id:this.getUserItem('id')
      },
      list: [],
      ifNav:false,
      ischeckUser:false,//下级用户搜索控件是否显示
      iflottery:false,//是否显示彩种选择
      iflotteryData:{},//彩种选择数据
      iflotteryText:'',//彩种选择拼接字符
      agentSumInfo:{},//团队游戏盈亏详情
      aForeFathersTxt:'',//下级面包屑
    }
  },
  methods:{
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
    //获取代码
    async getData(){

        if(this.jsonIsNoll(this.$store.getters.getteamGameProfitLossSeach)){//如果为空,启动当前页面查询条件
          this.creatTime();
          this.$store.commit('setteamGameProfitLossSeach',this.seachData);
          
        }else{//如果不为空，同步远程数据
          this.seachData = this.$store.getters.getteamGameProfitLossSeach;
          
        }
        //vuex是否有彩种
       if(!this.$store.getters.getiflotteryText){//如果为空
          this.$store.commit('setiflotteryText',this.iflotteryText);
        }else{//如果不为空，同步远程数据
          this.iflotteryText = this.$store.getters.getiflotteryText;
        }
        console.log("当前彩种"+this.iflotteryText);
        let res = await this.$api.getTeamLotteryProfits(this.$store.getters.getteamGameProfitLossSeach);
        this.agentSumInfo = res.data['agent-sum-info'];
        //拿到下级面包屑
        this.getaForeFathersTxt(res.data.aForeFathers);
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
      this.list = [];//初始化列表
      
      this.getData();
    },
    
  },
  created(){
    
    this.submit();
  },
  mounted(){
    this.bgColor("#F2F3F9");
    
  }
}
</script>

