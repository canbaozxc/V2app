<template>
  <div class="user-center" id="user-center">
    <!--首页头部-->
    <div class="header">
      <div class="no-login" v-if="!isLogin">
          <div class="welcome">Hello,您好</div>
          <div class="r-link">
                <router-link class="login left" to="/login">登录</router-link>
                <router-link class="reg right" to="/reg">注册</router-link>
                <div class="clear"></div>
          </div>
      </div>
      <div class="yes-login" v-else>
          <div class="getout" @click="logout()">退出</div>
          <div class="avatar">
            <img src="https://m.fyu6.com/avatar/rw10.png" />
            <p>{{accountInfo.username}}</p>
          </div>
      </div>
      <div class="money">
          <!--div class="qian balance left">

          </div>
          <div class="qian blocked right"></div>
          <div class="hline"></div-->
            <Row type="flex" justify="start" align="middle">
                <Col span="11">
                    <div class="qian balance ">
                        <div class="sum" v-if="!isLogin"><span>----</span></div>
                        <div class="sum" v-else><span>{{accountInfo.balance|fixed}}</span><img class="refcous" @click="getAccount" :class="loding?'showin':''" src="../../assets/refcous.png"></div>
                        <div class="explain">余额(元)</div>
                    </div>
                </Col>
                <Col span="2"><div class="hline"></div></Col>
                <Col span="11">
                    <div class="qian blocked ">
                        <div class="sum" v-if="!isLogin"><span>----</span></div>
                        <div class="sum" v-else>
                          <span>{{accountInfo.frozen|fixed}}</span>
                          <img src="../../assets/tip.png" /></div>
                        <div class="explain">冻结金额(元)</div>
                    </div>
                </Col>
            </Row>
      </div>
    </div>
    
    <!--金额操作-->
    <div class="amount">
        <Row type="flex" justify="start" align="middle">
            <Col span="8">
              <div @click="rouLink('/user/rechangeManger')">
                <img src="../../assets/userCenter/recharge.png" />充值
              </div>
            </Col>
            <Col span="8">
              <div @click="rouLink('/user/withdraw')">
                <img src="../../assets/userCenter/deposit.png" />提现
              </div>
            </Col>
            <Col span="8">
                <div @click="shenjizhong">
              <!--<div @click="rouLink('/')">-->
                <img src="../../assets/userCenter/transfer.png" />转账
              </div>
            </Col>
        </Row>
    </div>

    <!--用户中心模块-->
    <div class="mycenter-list">
        <Row type="flex" justify="start" align="middle">
            <Col span="8" class="center-item hav-bod">
              <div @click="rouLink('/user/personalOverview')">
                  <img src="../../assets/userCenter/user-outline.png" />
                  <p>个人总览</p>
              </div>
            </Col>
            <Col span="8" class="center-item  hav-bod">
              <div @click="rouLink('/user/userInfo')">
                  <img src="../../assets/userCenter/userinfo.png" />
                  <p>个人信息</p>
              </div>
            </Col>
            <Col span="8" class="center-item hav-bod">
              <div @click="rouLink('/user/financialDetails')">
                  <img src="../../assets/userCenter/change-record.png" />
                  <p>资金明细</p>
              </div>
            </Col>
            <Col span="8" class="center-item  hav-bod">
              <div @click="rouLink('/user/bindCard')">
                  <img src="../../assets/userCenter/bank-card.png" />
                  <p>银行卡</p>
              </div>
            </Col>
            <Col span="8" class="center-item  hav-bod">
              <div @click="rouLink('/user/bettingRecord')">
                  <img src="../../assets/userCenter/betting-record.png" />
                  <p>投注记录</p>
              </div>
            </Col>
            <Col span="8" class="center-item  hav-bod">
              <div @click="rouLink('/user/afterNoRecord')">
                  <img src="../../assets/userCenter/record-number.png" />
                  <p>追号记录</p>
              </div>
            </Col>
            
            <Col span="8" class="center-item  hav-bod" v-if="is_agent==1">
              <div @click="rouLink('/user/agencyCenter')">
                  <img src="../../assets/userCenter/agent.png" />
                  <p>代理中心</p>
              </div>
            </Col>
            <Col span="8" class="center-item  hav-bod">
              <div @click="rouLink('/user/noice')">
                  <img src="../../assets/userCenter/mess-notice.png" />
                  <p>信息公告</p>
              </div>
            </Col>
            <Col span="8" class="center-item  hav-bod">
              <div @click="rouLink('/user/passManage')">
                  <img src="../../assets/userCenter/pass-change.png" />
                  <p>密码修改</p>
              </div>
            </Col>
        </Row>
    </div>
    <Modal
        v-model="messLogin"
        title="请登录"
        ok-text="立即登录"
        @on-ok="$router.push('/login');">
        <p>您尚未登录，请先登录！点击立即登录，跳转到登录页面；点击取消，返回当前页面。</p>
    </Modal>
    <bottomNavbar />
  </div>
</template>
<style lang="less">


</style>

<style lang="less" scoped>
html,body{
    background-color: #F2F3F9;
    height: 100%;
    width: 100%;
}
.user-center{
  height: 100%;
}
@keyframes myfirst
{
0%   {transform:rotate(0deg);}
100% {transform:rotate(360deg);}
}
//头部
  .header {
      height: 2.52rem;
      color: #FFF;
      background-image: url("../../assets/userCenter/my-bg.png");
      background-repeat: no-repeat;
      background-size: 100% 75%;
      background-color: #FFF;
      margin-bottom: 0.09rem;
      .no-login{
            width: 3.03rem;
            padding-top: 0.42rem;
            margin: 0 auto;
            .welcome{
                height: 0.15rem;
                line-height: 0.15rem;
                font-size:0.14rem;
                font-weight:400;
                color:#FFF;
            }
            .r-link{
                padding-top: 0.25rem;
                padding-bottom: 0.13rem;
                a{
                    display: block;
                    color:#FFF;
                    width: 1.27rem;
                    height:0.38rem;
                    border:0.01rem solid #FFF;
                    border-radius:0.19rem;
                    font-size: 0.16rem;
                    line-height: 0.38rem;
                }

            }
      }
      .yes-login{
            .getout{
              height: 0.33rem;
              line-height: 0.16rem;
              font-size: 0.16rem;
              color: #FFF;
              text-align: right;
              padding: 0.17rem 0.17rem 0 0;
            }
            .avatar{
              padding-top: 0.04rem;
              img{
                height: 0.75rem;
                border-radius: 50%;
                border: 0.03rem solid #FFF;
                margin-bottom: 0.05rem;
                
              }
              p{
                height: 0.12rem;
                line-height: 0.12rem;
                font-size: 0.16rem;

              }
            }
      }
      .money{
          padding-top: 0.66rem;
          .hline{
              width: 1px;
              height: 0.4rem;
              margin: 0 auto;
              background: #F2F3F9;
          }
          .qian{
              height: 0.4rem;
              .sum{
                  color: #F13131;
                  font-weight: bold;
                  font-size: 0.16rem;
                  line-height: 0.16rem;
                  span{
                    padding-right: 0.07rem;
                  }
                  img{
                    height: 0.15rem;
                    vertical-align: middle;
                    margin-top: -0.03rem;
                    
                    transition:all 0.5s;
                    transform:rotate(0deg);
                  }
                  .showin{
                    animation:myfirst 500ms linear 0s infinite ;
                  }
              }
              .explain{
                  font-size: 0.16rem;
                  color: #666666;
              }
          }
          .balance{
              padding-left: 0.4rem;
          }
          .blocked{
              padding-right: 0.4rem;
          }
      }
      
  }
//金额操作
.amount{
    background-color: #FFF;
    font-size: 0.15rem;
    height: 0.51rem;
    line-height: 0.51rem;
    color: #666;
    img{
        vertical-align: middle;
        width: 0.35rem;
        padding-right: 0.1rem;
        margin-top: -0.05rem;
    }
}
//用户中心模块
.mycenter-list{
  background-color: #FFF;
  margin-top: 0.1rem;
  margin-bottom: 1rem;
  .center-item{
    height: 0.75rem;
     border-bottom:1px solid #F2F3F9;
    img{
      padding-top: 0.15rem;
      height: 0.40rem;
    }
    p{
      font-size: 0.12rem;
      color: #666;
      font-weight: 400;
    }
  }
  .hav-bod{
    border-bottom:1px solid #F2F3F9;
    border-right: 1px solid #F2F3F9;
  }
}
</style>
<script>
import { Icon,Input,Row,Col,Modal } from "iview"
import bottomNavbar from '@/components/public/Navbar.vue'
import minxins from '@/js/minxins.js';
import { setTimeout } from 'timers';
export default {
  name:"regster",
  components:{
    Icon,Input,Row,Col,bottomNavbar,Modal
  },
  mixins: [ minxins ],
  data(){
    
    return {
      messLogin:false,
      loding:false,
      accountInfo:{
        username:'获取中',
        balance:'000.00',
        frozen:'000.00'
      },
      is_agent:'',//是否代理
    }
  },
  filters: {
      fixed: function (value) {
          if (!value) return '';
          value = Number(value);
          return value.toFixed(2);
      },
  },
  methods:{
    //获取账户信息
    async getAccount(){
        this.loding = true;
        let res = await this.$api.getAccount();
        if(res.errno===0){
            this.accountInfo = res.data;
            //this.loding = false;
            let _this = this;
            setTimeout(()=>{
                _this.loding = false;
            },300);
        }
        
    },
    //退出登录
    async logout(){
        let res = await this.$api.logout();
        localStorage.setItem('isLogin',false);
        if(res.errno===0){
          this.$router.push('/login')
        }
        //this.accountInfo = res.data;
    },
    setValue(name,value){
      this[name] = value;

    },
    backHistory(){
      this.$router.go(-1);//返回上一层
    },
    bgColor(color){
      document.querySelector('body').setAttribute('style', 'background-color:'+color);
    },
    rouLink(url) {//页面跳转
      if(this.isLogin){
        this.$router.push(url);
      }else{
        this.messLogin = true;
        /*this.$Modal.confirm({
            title: '请先登录',
            content: '您尚未登录，请先登录！点击立即登录，跳转到登录页面；点击取消，返回当前页面。',
            okText: '立即登录',
            cancelText: '取消'
        });*/
      }
    },
    getOut(){
      this.isLogin = false;
    }
  },
  created(){
    //this.getAccount();
    if(this.isLogin){
      //获取账户信息
      this.getAccount();
      this.is_agent = this.getUserItem('is_agent');
    }
  },
  mounted(){
    //document.querySelector('body').setAttribute('style', 'background-color:#F2F3F9');
    this.bgColor("#F2F3F9");
    this.setLocal("clientHeight",document.documentElement.clientHeight);
    this.setLocal("remSize",document.getElementsByTagName('html')[0].style.fontSize)

  }
}
</script>

