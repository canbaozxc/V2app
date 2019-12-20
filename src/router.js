import Vue from 'vue'
import Router from 'vue-router'
import home from './views/home.vue'
import store from './store/index.js'
Vue.use(Router)
const router = new Router({
  //mode: 'history',
  //base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/login',
      name: 'login',
      component:(resolve) => {
        return require.ensure([], () => {
            resolve(require('./views/login.vue'))
        })
      }
    },
    {
      path: '/render',
      name: 'render',
      component:(resolve) => {
        return require.ensure([], () => {
            resolve(require('./views/user/agencyCenter/render.vue'))
        })
      }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/about.vue')
    },
    {
      path: '/forgetpwdsite',
      name: 'forgetpwdsite',
      component: () => import('./views/forgetpwdsite.vue')
    },
    {
      path: '/forget',
      name: 'forget',
      component: () => import('./views/forget.vue')
    },
    {
      path: '/hall',
      name: 'hall',
      component: () => import('./views/hall.vue')
    },
    {
      path: '/hallAll',
      name: 'hallAll',
      component: () => import('./views/hallAll.vue')
    },
    /**
     * 优惠活动
     */
    {//优惠活动activityDetails
      path:"/activity",
      name: 'activity',
      component:() => import('./views/activity/activity.vue')
    },
    {//优惠活动activityDetails
      path:"/activityDetails",
      name: 'activityDetails',
      component:() => import('./views/activity/activityDetails.vue')
    },
      {//开奖详情
          path:'/lotteryDetails',
          name: 'lotteryDetails',
          component:()=>import('./views/openData/lotteryDetails.vue')
      },
    {//开奖公告
      path:'/openData',
      name:'openData',
      component:()=>import('./views/openData/index.vue'),
    },
    {
      path:'/trend',
      name:'trend',
      component:()=>import('./views/trend/index.vue')
    },
    {
      path:'/game/:gameType',
      name:'gameIndex',
      component: () => import('./views/game/index.vue'),
      children:[
        /*{
            
          path: 'k3',
          name:'k3',
          component:() => import('./views/game/k3/index.vue')
        },*/
      ]
    },
      /**
       * 优惠活动 */
      {
          path:'/promotions',
          name:'promotions',
          component: () => import('./views/promotions.vue'),
      },
    {
      path:'/game1/:gameType',
      name:'gameIndex2',
      component: () => import('./views/game/index1.vue'),
      children:[
      ]
    },
    {
      path: '/user',
      name: 'usercenter',
      component: () => import('./views/usercenter.vue'),
      children: [
          {
              
            path: 'userindex',
            component:() => import('./views/user/userindex.vue')
            /*(resolve) => {
                return require.ensure([], () => {
                    resolve(require('./views/user/userindex.vue'))
                })
            }*/
            // () => import('./views/user/userInfo.vue')
          },
          {
            
            path: 'userInfo',
            component:() => import('./views/user/userInfo.vue')
            // () => import('./views/user/userInfo.vue')
          },
          /**
           * 充值方式选择 */
          {
            
            path: 'rechangeManger',
            component:() => import('./views/user/rechangeCash/rechangeManger.vue')
          },
         /* 银行卡转账*/
          {

              path: 'bankCardTransfer',
              component:() => import('./views/user/rechangeCash/bankCardTransfer.vue')
          },
          /*支付宝转账2*/
          {

              path: 'rechangeMoneyTwo',
              component:() => import('./views/user/rechangeCash/rechangeMoneyTwo.vue')
          },
                    /**
           * 充值金额选择 */
          {
            
            path: 'rechangeMoney',
            component:() => import('./views/user/rechangeCash/rechangeMoney.vue')
          },
          /*提现*/
          {
              path: 'withdraw',
              name:'withdraw',
              component:() => import('./views/user/withdraw/withdraw.vue')
          },
          /*提现*/
          {
              path: 'withdrawConfirm',
              component:() => import('./views/user/withdraw/withdrawConfirm.vue')
          },
          /**
           * 密码管理 */
          {
            
            path: 'passManage',//选择修改啥密码
            component:() => import('./views/user/passwordMange/passManage.vue')
          },
          {
            path: 'passChange/:passId',//修改密码
            component:() => import('./views/user/passwordMange/passChange.vue')
          },
          {
            
            path: 'city',
            component:() => import('./views/user/bank/city.vue')
          },
          /**
           *绑定银行卡  */
          {
            path: 'bindCard',
            component:() => import('./views/user/bank/bindCard.vue')
          },
          {
            path: 'verifyCard',//第一步验证银行卡
            component:() => import('./views/user/bank/verifyCard.vue')
          },
          {
            
            path: 'addBankCard',//第二步添加银行卡
            component:() => import('./views/user/bank/addBankCard.vue')
          },
          {
            path: 'confirmMessage',//第三步确认银行卡信息
            component:() => import('./views/user/bank/confirmMessage.vue')
          },
          //验证删除页面
          {
            path: 'deleBankVerify',
            component:() => import('./views/user/bank/deleBankVerify.vue')
          },
          /**
           * 资金明细
           */
          {
            path:'financialDetails',//路由页面
            component:() => import('./views/user/details/financialDetails.vue')
          },
          {
            path:'transferRecord',//转账记录
            component:() => import('./views/user/details/transferRecord.vue')
          },
          {
            path:'accountChangeRecord',//帐变记录
            component:() => import('./views/user/details/accountChangeRecord.vue')
          },
          {
            path:'rechargeRecord',//充值记录
            component:() => import('./views/user/details/rechargeRecord.vue')
          },
          {
            path:'depositRecord',//提现记录
            component:() => import('./views/user/details/depositRecord.vue')
          },
          {
            path:'rechargApplication',//充值申请
            component:() => import('./views/user/details/rechargApplication.vue')
          },
          /**
           * 投注记录
           */
          {
            path:'bettingRecord',//投注记录
            component:() => import('./views/user/bettingRecord/bettingRecord.vue')
          },
          /**
           * 追号记录
           */
          {
            path:"afterNoRecord",
            component:() => import('./views/user/afterNoRecord/afterNoRecord.vue')
          },
          /**
           * 代理中心
           */
          {
            path:"agencyCenter",
            component:() => import('./views/user/agencyCenter/index.vue')
          },
          {//团队盈亏
            path:"teamProfitLoss",
            component:() => import('./views/user/agencyCenter/teamProfitLoss.vue')
          },
          {
            path:"teamProfitLossDetails",
            component:() => import('./views/user/agencyCenter/teamProfitLossDetails.vue')
          },
          {//团队游戏盈亏
            path:"teamGameProfitLoss",
            component:() => import('./views/user/agencyCenter/teamGameProfitLoss.vue')
          },
          {//团队游戏盈亏明细
            path:"teamGameProfitLossDetails",
            component:() => import('./views/user/agencyCenter/teamGameProfitLossDetails.vue')
          },
          {//下级出款
            path:"depositLower",
            component:() => import('./views/user/agencyCenter/depositLower.vue')
          },
          {//下级入款
            path:"rechargeLower",
            component:() => import('./views/user/agencyCenter/rechargeLower.vue')
          },
          {//用户列表
            path:"lowerList",
            component:() => import('./views/user/agencyCenter/lowerList.vue')
          },
          {//邀请码管理
            path:"invitationCodeMessage",
            component:() => import('./views/user/agencyCenter/invitationCodeMessage.vue')
          },
          {
            path:"table",
            component:() => import('./views/user/agencyCenter/table.vue')
          },
          {//下级开户
            path:"openLower",
            component:() => import('./views/user/agencyCenter/openLower.vue')
          },
          {//个人总览
              path:"personalOverview",
              component:() => import('./views/user/personalOverview/personalOverview.vue')
          },
          /**
           * 公告信息
           */
          {//公告信息
            path:"noice",
            component:() => import('./views/user/noiceMess/index.vue')
          },
          /**
           * 个人总览
           */
          {
            path:"userForms",
            component:() => import('./views/user/userForms.vue')
          }
      ]
    },
      {
          path: '/demo',
          name: 'demo',
          component:(resolve) => {
              return require.ensure([], () => {
                  resolve(require('./views/demo.vue'))
              })
          }
      },
      {
          path: '/reg',
          name: 'registered',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "about" */ './views/registered.vue')
      },
  ]
})


router.beforeEach((to, from, next) => {
  if (store.state.isloading) {
      store.commit('setisloading', false);
  } else {
    store.commit('setisloading', true)
  }
  console.log(store.state.isloading);
  next();
})
router.afterEach((to)=> {
  //DELAY ms后清除全局loading
  setTimeout(() => {
      store.commit('setisloading', false)
      console.log(store.state.isloading);
  }, 500)
})
export default router