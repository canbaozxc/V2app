<template>
  <div class="home">
    <!--首页头部-->
    <div class="header">
      <div class="left txt-left" v-if="!isLogin">
        <router-link to="/login">登录</router-link>
      </div>
      <div class="title">
        <img src="https://m.fyu6.com/themes/simpleboot3/wap/assets/img/h5-logo.png?v0.1" class="logo">
      </div>
      <div class="right txt-right" v-if="!isLogin">
        <router-link to="/reg">注册</router-link>
      </div>
    </div>
    <!--首页轮播-->
    <Banner />
    <!--公告通知-->
    <Notice />
    <!--导航菜单-->
    <Navbar/>
    <!--彩种列表-->
    <Tabsbocai/>
    <!--最新中奖公告-->
    <Winnot />
    <bottomNavbar />
  </div>
</template>
<style scoped>
.home{
  background-color: #f5f5f5;
}
/*首页头部*/
.header {
    height: 0.5rem;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    padding: 0 0.1rem;
    background: #f13131;
    color: #fff;
}
.header a {
    color: #fff;
    font-size: 0.16rem;
}
.header .left, .header .right {
    min-width: 0.5rem;
    font-size: 0.15rem;
}
.header .title {
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    text-align: center;
}
.header .title .logo {
    display: inline-block;
    width: 1.38rem;
    height: 0.4rem;
}
/*首页轮播*/
</style>

<script>
// @ is an alias to /src
import SockJS from 'sockjs-client';
import Banner from '@/components/home/Banner.vue'
import Notice from '@/components/home/Notice.vue'
import Navbar from '@/components/home/Navbar.vue'
import Tabsbocai from '@/components/home/Tabsbocai.vue'
import Winnot from '@/components/home/Winnot.vue'
import bottomNavbar from '@/components/public/Navbar.vue'
import minxins from '@/js/minxins.js';
import { Icon  } from "iview"
export default {
  name: 'home',
  mixins:[minxins],
  components: {
    Notice,
    Banner,
    Navbar,
    Tabsbocai,
    Winnot,
    bottomNavbar,
    Icon 
  },
  data(){
    return {
        
    }
  },
  mounted(){
    /*this.$store.commit('add');
    console.log(this.$store.getters.inconr);*/
  }
}
</script>
