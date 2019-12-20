<template>
  <div class="depositApplication">
    <div class="fixed">
      <titleBar title="提现申请" />
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
          <Col span="24">
             <Button type="error" long style="border-radius: 0.16rem;" @click="submit">搜索</Button>
          </Col>
        </Row>
      </div>
    </div>
    <div class="scroll">
        <div class="cordLi"   @click="item.isDown = !item.isDown"  v-for="(item, index) in list" :key="index">
          <Row type="flex" justify="start" align="top">
            <Col span="11" class="asd1" >
                <p>账户：{{item.userName}}</p>
                <p>状态：{{item.status}}</p>
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
.depositApplication{
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
.depositApplication{
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
  name:"depositApplication",
  mixins: [ minxins ],
  components:{
    Scroll,Card,titleBar,Row,Col,DatePicker,Icon,Select,Option
  },
  data(){
    return{
      isFiltrate:false,
      seachData:{//搜索条件
        created_at_from:'',
        created_at_to:'',
        page:"1",
        type:'withdraw',
        is_successed:'0'
      },
      list: [{
            userName:"test123",
            time:"2016-07-11 20:28:03",
            acc:"+118.098000",
            status:"已审核",
            balance:"156748.123",
            num:"1234",
            isDown:false
          },
          {
            userName:"test123",
            time:"2016-07-11 20:28:03",
            acc:"-118.098000",
            status:"已审核",
            balance:"156748.123",
            num:"1234",
            isDown:false
          },
          {
            userName:"test123",
            time:"2016-07-11 20:28:03",
            acc:"-118.098000",
            status:"已审核",
            balance:"156748.123",
            num:"1234",
            isDown:false
          },
          {
            userName:"test123",
            time:"2016-07-11 20:28:03",
            acc:"-118.098000",
            status:"已审核",
            balance:"156748.123",
            num:"1234",
            isDown:false
          },
          {
            userName:"test123",
            time:"2016-07-11 20:28:03",
            acc:"-118.098000",
            status:"已审核",
            balance:"156748.123",
            num:"1234",
            isDown:false
          },
          {
            userName:"test123",
            time:"2016-07-11 20:28:03",
            acc:"-118.098000",
            status:"已审核",
            balance:"156748.123",
            num:"1234",
            isDown:false
          },
          {
            userName:"test123",
            time:"2016-07-11 20:28:03",
            acc:"-118.098000",
            status:"已审核",
            balance:"156748.123",
            num:"1234",
            isDown:false
          },
          {
            userName:"test123",
            time:"2016-07-11 20:28:03",
            acc:"-118.098000",
            status:"已审核",
            balance:"156748.123",
            num:"1234",
            isDown:false
          },
          {
            userName:"test123",
            time:"2016-07-11 20:28:03",
            acc:"-118.098000",
            status:"已审核",
            balance:"156748.123",
            num:"1234",
            isDown:false
          },
          {
            userName:"test123",
            time:"2016-07-11 20:28:03",
            acc:"-118.098000",
            status:"已审核",
            balance:"156748.123",
            num:"1234",
            isDown:false
          },
          {
            userName:"test123",
            time:"2016-07-11 20:28:03",
            acc:"-118.098000",
            status:"已审核",
            balance:"156748.123",
            num:"1234",
            isDown:false
          }
      ],
    }
  },
  methods:{
    async getList(){
      let res =  await this.$api.getWithdrawalList(this.seachData);

    },
    //5.提交
    submit(){
      //初始化搜索条件
      this.seachData.created_at_from=this.getFormatDate(this.seachData.created_at_from,'start');
      this.seachData.created_at_to=this.getFormatDate(this.seachData.created_at_to);
      this.seachData.page=1;
      //this.list = [];//初始化列表
      //this.getList();
    },
  },
  created(){
    this.getList();
    //console.log(localStorage.getItem('clientHeight'));
  },
  mounted(){
    //let oDiv = document.getElementById("div1");
    this.bgColor("#F2F3F9");
  }
}
</script>

