<template>
  <div class="rechargeRecord">
    <div class="fixed">
      <titleBar title="充值记录" />
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
          <Col span="11">
            <Select v-model="seachData.account"  placeholder="帐变类型">
                <Option v-for="item in accountList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </Col>
          <Col span="11" offset="1">
            <Select v-model="seachData.account"  placeholder="帐变类型">
                <Option v-for="item in accountList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </Col>
        </Row>
        <Row type="flex" justify="start" align="middle">
          <Col span="24">
             <Button type="error" long style="border-radius: 0.16rem;">搜索</Button>
          </Col>
        </Row>
      </div>
    </div>
    <div class="scroll">
        <div class="cordLi"  @click="item.isDown = !item.isDown"  v-for="(item, index) in list" :key="index">
          <Row type="flex" justify="start" align="top">
            <Col span="11" class="asd1" >
                <p>账变类型：{{item.type}}</p>
                <p>余额：{{item.balance}}</p>
                <p :style="{display:item.isDown?'block':'none'}" class="num">编号：<span>{{item.num}}</span></p>
            </Col>
            <Col span="10" class="bsd1">
                <p style="color:#999999;">{{item.time}}</p>
                <p :class="item.acc.charAt(0)==='+'?'red':'green'">{{item.acc}}</p>
                
            </Col>
            <Col span="3" class="csd1">
                <Icon type="ios-arrow-down" class="select-arrow" :class="item.isDown?'rdeg':''" />
            </Col>
          </Row>
        </div>
    </div>
  </div>
</template>
<style lang="less">
.rechargeRecord{
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
  }
}
</style>

<style lang="less" scoped>
.rechargeRecord{
  .fixed{
    width: 100%;
    
    z-index: 10;
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
    margin-top: 0.15rem;
    width: 100%;
    background-color: #FFF;
    z-index:5;
    .cordLi{
      padding: 5px 16px 2px 16px;
      border-bottom: 1px solid #F2F3F9;
    }
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
import { Scroll,Card,Row,Col,DatePicker,Icon,Select,Option } from "iview"
import titleBar from "@/components/public/Title-bar.vue"
import minxins from '@/js/minxins.js';
export default {
  name:"rechargeRecord",
  mixins: [ minxins ],
  components:{
    Scroll,Card,titleBar,Row,Col,DatePicker,Icon,Select,Option
  },
  data(){
    return{
      isFiltrate:false,
      seachData:{//搜索条件
        startData:'',
        endData:'',
        account:'',
        
      },
      list: [
            {
            type:"佣金",
            game:"苹果分分彩",
            time:"2016-07-11 20:28:03",
            acc:"+118.098000",
            playType:"五星直选复式",
            balance:"156748.123",
            num:"1234",
            isDown:false
          },
          {
            type:"佣金",
            game:"苹果分分彩",
            time:"2016-07-11 20:28:03",
            acc:"-118.098000",
            playType:"五星直选复式",
            balance:"156748.123",
            num:"1234",
            isDown:false
          },
          {
            type:"佣金",
            game:"苹果分分彩",
            time:"2016-07-11 20:28:03",
            acc:"-118.098000",
            playType:"五星直选复式",
            balance:"156748.123",
            num:"1234",
            isDown:false
          },
          {
            type:"佣金",
            game:"苹果分分彩",
            time:"2016-07-11 20:28:03",
            acc:"-118.098000",
            playType:"五星直选复式",
            balance:"156748.123",
            num:"1234",
            isDown:false
          },
          {
            type:"佣金",
            game:"苹果分分彩",
            time:"2016-07-11 20:28:03",
            acc:"-118.098000",
            playType:"五星直选复式",
            balance:"156748.123",
            num:"1234",
            isDown:false
          },
          {
            type:"佣金",
            game:"苹果分分彩",
            time:"2016-07-11 20:28:03",
            acc:"-118.098000",
            playType:"五星直选复式",
            balance:"156748.123",
            num:"1234",
            isDown:false
          },
          {
            type:"佣金",
            game:"苹果分分彩",
            time:"2016-07-11 20:28:03",
            acc:"-118.098000",
            playType:"五星直选复式",
            balance:"156748.123",
            num:"1234",
            isDown:false
          },
          {
            type:"佣金",
            game:"苹果分分彩",
            time:"2016-07-11 20:28:03",
            acc:"-118.098000",
            playType:"五星直选复式",
            balance:"156748.123",
            num:"1234",
            isDown:false
          },
          {
            type:"佣金",
            game:"苹果分分彩",
            time:"2016-07-11 20:28:03",
            acc:"-118.098000",
            playType:"五星直选复式",
            balance:"156748.123",
            num:"1234",
            isDown:false
          },
          {
            type:"佣金",
            game:"苹果分分彩",
            time:"2016-07-11 20:28:03",
            acc:"-118.098000",
            playType:"五星直选复式",
            balance:"156748.123",
            num:"1234",
            isDown:false
          },
          {
            type:"佣金",
            game:"苹果分分彩",
            time:"2016-07-11 20:28:03",
            acc:"-118.098000",
            playType:"五星直选复式",
            balance:"156748.123",
            num:"1234",
            isDown:false
          },
          {
            type:"佣金",
            game:"苹果分分彩",
            time:"2016-07-11 20:28:03",
            acc:"-118.098000",
            playType:"五星直选复式",
            balance:"156748.123",
            num:"1234",
            isDown:false
          },
          {
            type:"佣金",
            game:"苹果分分彩",
            time:"2016-07-11 20:28:03",
            acc:"-118.098000",
            playType:"五星直选复式",
            balance:"156748.123",
            num:"1234",
            isDown:false
          },
          {
            type:"佣金",
            game:"苹果分分彩",
            time:"2016-07-11 20:28:03",
            acc:"-118.098000",
            playType:"五星直选复式",
            balance:"156748.123",
            num:"1234",
            isDown:false
          },
          {
            type:"佣金",
            game:"苹果分分彩",
            time:"2016-07-11 20:28:03",
            acc:"-118.098000",
            playType:"五星直选复式",
            balance:"156748.123",
            num:"1234",
            isDown:false
          },
          {
            type:"佣金",
            game:"苹果分分彩",
            time:"2016-07-11 20:28:03",
            acc:"-118.098000",
            playType:"五星直选复式",
            balance:"156748.123",
            num:"1234",
            isDown:false
          },
          {
            type:"佣金",
            game:"苹果分分彩",
            time:"2016-07-11 20:28:03",
            acc:"-118.098000",
            playType:"五星直选复式",
            balance:"156748.123",
            num:"1234",
            isDown:false
          },
          {
            type:"佣金",
            game:"苹果分分彩",
            time:"2016-07-11 20:28:03",
            acc:"-118.098000",
            playType:"五星直选复式",
            balance:"156748.123",
            num:"1234",
            isDown:false
          },
          {
            type:"佣金",
            game:"苹果分分彩",
            time:"2016-07-11 20:28:03",
            acc:"-118.098000",
            playType:"五星直选复式",
            balance:"156748.123",
            num:"1234",
            isDown:false
          },
          {
            type:"佣金",
            game:"苹果分分彩",
            time:"2016-07-11 20:28:03",
            acc:"-118.098000",
            playType:"五星直选复式",
            balance:"156748.123",
            num:"1234",
            isDown:false
          },
          {
            type:"佣金",
            game:"苹果分分彩",
            time:"2016-07-11 20:28:03",
            acc:"-118.098000",
            playType:"五星直选复式",
            balance:"156748.123",
            num:"1234",
            isDown:false
          },
          {
            type:"佣金",
            game:"苹果分分彩",
            time:"2016-07-11 20:28:03",
            acc:"-118.098000",
            playType:"五星直选复式",
            balance:"156748.123",
            num:"1234",
            isDown:false
          },
          {
            type:"佣金",
            game:"苹果分分彩",
            time:"2016-07-11 20:28:03",
            acc:"-118.098000",
            playType:"五星直选复式",
            balance:"156748.123",
            num:"1234",
            isDown:false
          },
          {
            type:"佣金",
            game:"苹果分分彩",
            time:"2016-07-11 20:28:03",
            acc:"-118.098000",
            playType:"五星直选复式",
            balance:"156748.123",
            num:"1234",
            isDown:false
          },
          {
            type:"佣金",
            game:"苹果分分彩",
            time:"2016-07-11 20:28:03",
            acc:"-118.098000",
            playType:"五星直选复式",
            balance:"156748.123",
            num:"1234",
            isDown:false
          },
          {
            type:"佣金",
            game:"苹果分分彩",
            time:"2016-07-11 20:28:03",
            acc:"-118.098000",
            playType:"五星直选复式",
            balance:"156748.123",
            num:"1234",
            isDown:false
          },
          {
            type:"佣金",
            game:"苹果分分彩",
            time:"2016-07-11 20:28:03",
            acc:"-118.098000",
            playType:"五星直选复式",
            balance:"156748.123",
            num:"1234",
            isDown:false
          },
          {
            type:"佣金",
            game:"苹果分分彩",
            time:"2016-07-11 20:28:03",
            acc:"-118.098000",
            playType:"五星直选复式",
            balance:"156748.123",
            num:"1234",
            isDown:false
          },
          {
            type:"佣金",
            game:"苹果分分彩",
            time:"2016-07-11 20:28:03",
            acc:"-118.098000",
            playType:"五星直选复式",
            balance:"156748.123",
            num:"1234",
            isDown:false
          },
          {
            type:"佣金",
            game:"苹果分分彩",
            time:"2016-07-11 20:28:03",
            acc:"-118.098000",
            playType:"五星直选复式",
            balance:"156748.123",
            num:"1234",
            isDown:false
          },
          {
            type:"佣金",
            game:"苹果分分彩",
            time:"2016-07-11 20:28:03",
            acc:"-118.098000",
            playType:"五星直选复式",
            balance:"156748.123",
            num:"1234",
            isDown:false
          },
          {
            type:"佣金",
            game:"苹果分分彩",
            time:"2016-07-11 20:28:03",
            acc:"-118.098000",
            playType:"五星直选复式",
            balance:"156748.123",
            num:"1234",
            isDown:false
          },
          {
            type:"佣金",
            game:"苹果分分彩",
            time:"2016-07-11 20:28:03",
            acc:"-118.098000",
            playType:"五星直选复式",
            balance:"156748.123",
            num:"1234",
            isDown:false
          },
          {
            type:"佣金",
            game:"苹果分分彩",
            time:"2016-07-11 20:28:03",
            acc:"-118.098000",
            playType:"五星直选复式",
            balance:"156748.123",
            num:"1234",
            isDown:false
          },
          {
            type:"佣金",
            game:"苹果分分彩",
            time:"2016-07-11 20:28:03",
            acc:"-118.098000",
            playType:"五星直选复式",
            balance:"156748.123",
            num:"1234",
            isDown:false
          }
      ],
      accountList:[
                {
                    label:"帐变类型",
                    value:"zgyh"
                },
                {
                    label:"在线充值",
                    value:"zsyh"
                },
                {
                    label:"提取现金",
                    value:"nyyh"
                },
            ]
    }
  },
  methods:{
    //取反
    getNegation(name){
      this[name] = !this[name];
      console.log(this[name]);
    },
    handleChange(data){
      console.log(this.seachData.startData);
    },
    checkFan(index){
      console.log(this.list[index]);
    },
    handleReachEdge (dir) {
        return new Promise(resolve => {
            setTimeout(() => {
                if (dir > 0) {
                    const first = this.list[0];
                    for (let i = 1; i < 11; i++) {
                        this.list.unshift(first - i);
                    }
                } else {
                    const last = this.list[this.list.length - 1];
                    for (let i = 1; i < 11; i++) {
                        this.list.push(last + i);
                    }
                }
                resolve();
            }, 2000);
        });
    },
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
    }
  },
  created(){
    
    //console.log(localStorage.getItem('clientHeight'));
  },
  mounted(){
    //let oDiv = document.getElementById("div1");
    this.bgColor("#F2F3F9");
  }
}
</script>

