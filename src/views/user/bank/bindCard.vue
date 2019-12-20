<template>
  <div class="bind-card">
    <titleBar title="银行卡绑定" />
    
    <div class="main">
        <div class="no-bind">
            <img src="../../../assets/userCenter/bank/no.png" />
            <h2>还没有绑定任何卡</h2>
            <p>快绑定一张银行卡吧，充提更方便！</p>
        </div>
        <div class="bind">
            <ul>
                <li :class="'card'+index%3" v-for="(tes,index) in list" :key="index">
                    <Row  type="flex" justify="start" align="middle">
                        <Col span="20" class="col txt-left card">
                            <h2>{{tes.bank}}</h2>
                            <div class="car-type">储蓄卡</div>
                            <div class="car-num">{{tes.account}}</div>
                        </Col>
                        <Col span="4" class="col">
                            <div class="btn btn-del" @click="goDeleVerify">删除</div>
                        </Col>
                    </Row>
                </li>
            </ul>
        </div>
        <div v-if="limit_num>list.length" class="btn addCard"  @click="submit"><Icon type="md-add" />添加银行卡</div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.main{
    width: 3.45rem;
    margin: 0 auto;
    .no-bind{
        padding-top: 0.38rem;
        color: #666;
        display: none;
        margin-bottom: 0.4rem;
        h2{
            font-weight: 400;
            font-size: 0.16rem;
            padding-top: 0.24rem;
        }
        p{
            font-size: 0.14rem;
            padding-top: 0.1rem;
        }
        img{
            width: 1.55rem;
        }
    }
    .bind{
        margin-bottom: 0.15rem;
        ul li{
            height: 0.95rem;
            background-size: cover;
            margin-top: 0.15rem;
            padding: 0 0.2rem 0 0.25rem;
            color:#FFF;
            
            .col{
                position: relative;
                .btn{
                    width: 0.43rem;
                    height: 0.25rem;
                    line-height: 0.25rem;
                    border:1px solid #FFF;
                    border-radius: 0.03rem;
                    top: 0.35rem;
                    font-size: 0.12rem;
                    position: absolute;
                }
            }
            .card{
                h2{
                    height:0.18rem;
                    font-size:0.18rem;
                    line-height:0.18rem;
                    position: absolute;
                    top: 0.18rem;
                }
                .car-type{
                    position: absolute;
                    top: 0.41rem;
                    height:0.12rem;
                    font-size:0.12rem;
                    line-height:0.12rem;
                }
                .car-num{
                    position: absolute;
                    top: 0.66rem;
                    height:0.15rem;
                    font-size:0.18rem;
                    line-height:0.12rem;
                }
            }
        }
        .card0{
            background: url("../../../assets/userCenter/bank/1.png");
            background-size: cover;
        }
        .card1{
            background: url("../../../assets/userCenter/bank/2.png");
            background-size: cover;
        }
        .card2{
            background: url("../../../assets/userCenter/bank/3.png");
            background-size: cover;
        }
        .card-freeze{
            background: url("../../../assets/userCenter/bank/freeze.png");
            background-size: cover;
        }
    }
    .addCard{
        background-color: #FFF;
        color: #F13131;
        font-size: 0.14rem;
        height: 0.38rem;
        line-height: 0.38rem;
        border-radius:0.05rem;
        
    }
}
</style>


<script>
import { Icon,Row,Col } from "iview"
import titleBar from "@/components/public/Title-bar.vue"
import minxins from '@/js/minxins.js';
export default {
  name:"bind-card",
  components:{
      titleBar,Icon,Row,Col
  },
  mixins: [ minxins ],
  data(){
    return{
        is_locked:0,//当前多少张
        limit_num:4,//上限多少张
        list:[],//银行卡列表

    }
  },
  methods:{
      async getBankCardList(){
          let res = await this.$api.getBankCardList();
          if(res.errno===0){
              this.is_locked = res.data.is_locked;
              this.limit_num = res.data.limit_num;
              this.list = res.data.list;
          }else{

          }
          console.log(res);
      },
      goDeleVerify(){
          this.rouLink('/user/deleBankVerify');
      },
      submit(){
          if(this.list.length>0){//有一张银行卡，跳验证
              this.rouLink('/user/verifyCard');
          }else{//一张都没有跳添加银行卡
              this.rouLink('/user/addBankCard');
          }
      }
  },
  created(){
      this.getBankCardList();
  },
  mounted(){
    //let oDiv = document.getElementById("div1");
     this.bgColor("#F2F3F9");
  }
}
</script>

