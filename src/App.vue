<template>
  <div id="app">
    <router-view/>
    <globalLoading v-model="$store.state.isloading"></globalLoading>
  </div>
</template>

<script>
import Navbar from '@/components/public/Navbar.vue'
import globalLoading from '@/components/public/globalLoading.vue'
export default {
  name: 'app',
  data(){
    return{
      show:true
    }
    
  },
  components: {
    Navbar,globalLoading
  },
  methods:{
    //点击返回按键
  onBackKeyDown() {
       this.$toast('再点击一次退出应用');
       document.removeEventListener("backbutton", this.onBackKeyDown, false); // 注销返回键
       document.addEventListener("backbutton", this.exitApp, false);//绑定退出事件
       setInterval(() => {
             document.addEventListener("backbutton", this.onBackKeyDown, false);
             document.removeEventListener("backbutton", this.exitApp, false);
           }, 3000)
        },
//关闭APP
 exitApp() {
         navigator.app.exitApp();
        },

    /**
     * 全局缓存变量终端状态码
     * 字段：terminal_id
     * 状态 1：PC   2：安卓   3：IOS
     *  */
    setTerminal_id(){
        let u = navigator.userAgent;
        let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        let isPC =!(navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i));//PC端
        let terminal_id = '1';
        if(isPC){
          terminal_id = "1";
        }else if(isAndroid){
          terminal_id = "2";
        }else{
          terminal_id = "3";
        }
        localStorage.setItem("terminal_id", terminal_id);
        //alert(terminal_id);
    },
     /**
     * 禁止选中
     */
    disSelectStart() {
        document.body.onselectstart = document.body.ondrag = function () {
            return false;
        }
    },
    /**
     * 禁止调试
     */
    disClearKeyDown() {
        document.onkeydown = function () {
            var e = window.event || arguments[0];
            //console.log(e.keyCode)
            if (e.keyCode == 123) {
                return false;
            } else if ((e.ctrlKey) && (e.shiftKey) && (e.keyCode == 73)) {
                return false;
            } else if ((e.ctrlKey) && (e.keyCode == 65)) {
                return false;
            }
        };
        document.oncontextmenu = function () {
            return false;
        };
    },
    
    init() {
        //this.disSelectStart();
        //this.disClearKeyDown();
        this.setTerminal_id();
    },
  },
  created(){
    document.addEventListener("backbutton", this.onBackKeyDown, false);
    /*this.refreshTask();
    this.refreshNotice();*/

  },
  beforeDestroy() {
      document.removeEventListener("backbutton", this.onBackKeyDown, false); // 注销返回键
      document.removeEventListener("backbutton", this.exitApp, false);
  },

  mounted(){
    this.init();
    localStorage.setItem("widowHeight", $(window).height());
    document.addEventListener("backbutton", onBackKeyDown, false);
    function onBackKeyDown(e) {
      e.preventDefault();
      alert('禁用了手机返回!');
    }
  }
}
</script>
<style lang="less">
  .ivu-modal-content {
    position: relative;
    background-color: #333 !important;
    border: 0;
    border-radius: 6px;
    background-clip: padding-box;
    box-shadow: 0 4px 12px rgba(0,0,0,.15);
    .ivu-modal-header p, .ivu-modal-header-inner {
      display: inline-block;
      width: 100%;
      height: 20px;
      line-height: 20px;
      font-size: 14px;
      color: #f7f7f7;
      font-weight: 700;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .ivu-btn-text {
      color: #333;
      border-color: transparent;
      background-color: #f7f7f7;
    }
    .ivu-modal-body {
      background-color: #333;
      color: #FFF;
      padding: 16px;
      font-size: 12px;
      line-height: 1.5;
    }
    .ivu-modal-confirm-head-title {
      display: inline-block;
      vertical-align: middle;
      margin-left: 12px;
      font-size: 16px;
      color: #f13131;
      font-weight: 700;
    }
    .ivu-modal-body {
      background-color: #333;
      padding: 16px;
      font-size: 12px;
      line-height: 1.5;
    }
    .ivu-modal-confirm-body {
      padding-left: 42px;
      font-size: 14px;
      color: #fff;
      position: relative;
    }
    .ivu-btn-primary {
      color: #333;;
      background-color: #f2f3f9;
      border-color: #f7f7f7;
    }
  }

</style>
<style>
ul,li{
  margin: 0;
  padding: 0;
  list-style: none;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: relative;
  font-family: "微软雅黑";
}
.txt-left{
  text-align: left;
}
.txt-right{
  text-align: right;
}
.txt-center{
  text-align: center;
}
.left{
  float: left;
}
.right{
  float:right;
}
.clear{
  clear: both;
}
.txt-green{
  color:#19be6b;
}
.txt-red{
  color:#ed4014;
}
.box{
  box-sizing: border-box;
}
.ivu-select-single .ivu-select-selection .ivu-select-selected-value {
    text-align: left;
}
.ivu-scroll-loader:first-child{
  display: none;
}
</style>
