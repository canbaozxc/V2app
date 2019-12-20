<template>
  <div class="invitationCodeDetails" >
    <div class="header">
      <div class="left txt-left">
        
        <Icon type="ios-arrow-back" @click="goBack" />
      </div>
      <div class="h-tit">邀请码详情</div>
    </div>
    <div class="box">
        <div class="box-title">48645348</div>
        <div class="box-body">
            <Row type="flex" justify="start" align="top">
                <Col span="4" class="txt-left th">
                    <p>账户类型</p>
                </Col>
                <Col span="19" offset="1" class="txt-left td">
                    <p>{{invitationCodeDetails.is_agent}}</p>
                </Col>
                <Col span="4" class="txt-left th">
                    <p>推广渠道</p>
                </Col>
                <Col span="19" offset="1" class="txt-left td">
                    <p>{{invitationCodeDetails.channel}}</p>
                </Col>
                <Col span="4" class="txt-left th">
                    <p>注册人数</p>
                </Col>
                <Col span="19" offset="1" class="txt-left td">
                    <p>{{invitationCodeDetails.created_count}}</p>
                </Col>
                <Col span="4" class="txt-left th">
                    <p>QQ号码</p>
                </Col>
                <Col span="19" offset="1" class="txt-left td">
                    <p>{{invitationCodeDetails.agent_qqs}}</p>
                </Col>
                <Col span="4" class="txt-left th">
                    <p>奖金组</p>
                </Col>
                <Col span="19" offset="1" class="txt-left td">
                    <p>{{invitationCodeDetails.prize_group}}</p>
                </Col>
                <Col span="4" class="txt-left th">
                    <p>状态</p>
                </Col>
                <Col span="19" offset="1" class="txt-left td">
                    <p>{{invitationCodeDetails.status}}</p>
                </Col>
                <Col span="4" class="txt-left th">
                    <p>注册链接</p>
                </Col>
                <Col span="19" offset="1" class="txt-left td cobyOrderSn" >
                    <p>{{invitationCodeDetails.url}}</p>
                </Col>
                <Col span="4" class="txt-left th">
                    <p>创建日期</p>
                </Col>
                <Col span="19" offset="1" class="txt-left td">
                    <p>{{invitationCodeDetails.created_at}}</p>
                </Col>
                <Col span="4" class="txt-left th">
                    <p>到期日期</p>
                </Col>
                <Col span="19" offset="1" class="txt-left td">
                    <p>{{invitationCodeDetails.expired_at}}</p>
                </Col>
            </Row>
        </div>
        <div class="box-bottom"></div>
    </div>
      <Row type="flex" justify="start" align="top" style="margin:0 0.15rem;">
        <Col span="11">
            <Button type="error" long class="codeBtn" @click="copy(invitationCodeDetails.url)">复制</Button>
        </Col>
        <Col span="11" offset="2" >
            <Button type="error" long class="codeBtn dele" @click="deleteRegisterLink" >删除</Button>
        </Col>
      </Row>
      <div style="margin-top:0.15rem;">注：点击复制按钮可以直接复制邀请码和注册链接</div>
  </div>
</template>
<style lang="less" scoped>
.invitationCodeDetails{
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #F2F3F9;
  z-index: 500;
  overflow: auto;
    .codeBtn{
      width: 1.55remrem;
      height: 0.45rem;
      margin: 0 auto;
      padding: 0;
      font-size: 0.16rem;
      border-radius: 0.22rem;
      margin-top: 0.15rem;
      box-shadow: none;
    }
    .dele{
      background-color: #CCC;
      border-color:#CCC;
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
            height: 0.64rem;
            line-height: 0.64rem;
            color: #333333;
            font-weight: 500;
            font-size: 0.18rem;
            text-align: center;
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
  name:"invitationCodeDetails",
  mixins:[minxins],
  components:{
    Icon,Form,FormItem,Input,Row,Col,Select,Option,titleBar
  },
  props: {
      link_id:{
            type: Number,
            default: ''
        }
  },
  data(){
    return{
      invitationCodeDetails:{},
      ifAfterNoDatail:false,
    }
  },
  methods:{
    async getRegisterLinkDetail(){//开户链接详情
        let pream = {
          link_id:this.link_id
        }
        let res = await this.$api.getRegisterLinkDetail(pream);
        this.invitationCodeDetails = res.data;

    },
    
    async deleteRegisterLink(){
      let pream = {
          link_id:this.link_id
      }
      let res = await this.$api.deleteRegisterLink(pream);
      this.$emit("goBack");
    },
    //关闭当前组件
    goBack(){
      this.$emit("goBack");
    },
    

  },
  created(){
      console.log(this.link_id);
      this.getRegisterLinkDetail();
  },
  mounted(){

  }
}
</script>

