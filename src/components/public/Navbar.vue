<template>
<div>
  <div class="navbar">
      <Row>
        <Col span="4" v-bind:class="{active: $route.name=='home'}">
            <div>
                <router-link to="/">
                    <div class="nav-ico nav-ico-home"></div>
                    <p>首页</p>
                </router-link>
            </div>
        </Col>
        <Col span="4" offset="1" v-bind:class="{active: $route.name=='hall'}">
        <div>
            <router-link to="/hall">
                <div class="nav-ico nav-ico-hall"></div>
                <p>购彩</p>
            </router-link>
            </div>
        </Col>
        <Col span="4" offset="1" v-bind:class="{active: $route.name=='openData'}">
        <div>
            <router-link to="/openData">
                <div class="nav-ico nav-ico-pay"></div>
                <p>开奖</p>
            </router-link>
            </div>
        </Col>
        <Col span="4" offset="1" v-bind:class="{active: $route.name=='trend'}">
        <div>
            <router-link to="/trend">
                <div class="nav-ico nav-ico-trend"></div>
                <p>走势</p>
            </router-link>
            </div>
        </Col>
        <Col span="4" offset="1" v-bind:class="{active: $route.name=='userindex' || $route.path.includes('user')}">
        <div >
            <router-link to="/user/userindex">
                <div class="nav-ico nav-ico-me"></div>
                <p>我的</p>
            </router-link>
            </div>
        </Col>
    </Row>
  </div>
</div>
</template>
<style lang="less" scoped>
.navbar{
    width: 100%;
    height: 0.49rem;
    box-shadow: 0px 0 0.05rem #666;
    background-color: #FFF;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 99;
    .active{
        a{
            color: #F13131;
        }
        a .nav-ico{
            background-position-x: -0.28rem;
        }
    }
    a{
        color: #333;
        font-size: 0.12rem;
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        display: flex;
        flex-direction: column;
        -webkit-box-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        align-items: center;
        text-align: center;
        height: 100%;
    }
    a:hover{
        color: #F13131;
    }
    a:hover .nav-ico{
        background-position-x: -0.28rem;
    }
}
.nav-ico-home{
    height: 0.2rem;
    width: 0.2rem;
    margin: 0 auto;
    margin-top: 0.08rem;
    background-image:url("../../assets/index-navbar.png");
    background-size: 0.47rem 1.36rem;  
}
.nav-ico-hall{
    height: 0.2rem;
    width: 0.2rem;
    margin: 0 auto;
    margin-top: 0.08rem;
    background-image:url("../../assets/index-navbar.png");
    background-position: 0 -0.29rem;
    background-size: 0.47rem 1.36rem;  
}
.nav-ico-pay{
    height: 0.2rem;
    width: 0.2rem;
    margin: 0 auto;
    margin-top: 0.08rem;
    background-image:url("../../assets/index-navbar.png");
    background-position: 0 -0.58rem;
    background-size: 0.47rem 1.36rem;  
}
.nav-ico-trend{
    height: 0.2rem;
    width: 0.2rem;
    margin: 0 auto;
    margin-top: 0.08rem;
    background-image:url("../../assets/index-navbar.png");
    background-position: 0 -0.87rem;
    background-size: 0.47rem 1.36rem;  
}
.nav-ico-me{
    height: 0.2rem;
    width: 0.2rem;
    margin: 0 auto;
    margin-top: 0.08rem;
    background-image:url("../../assets/index-navbar.png");
    background-position: 0 -1.16rem;
    background-size: 0.47rem 1.36rem;  
}
</style>

<script>
import {Row,Col} from "iview"
export default {
  name:"Navbar",
  data(){
      return{
         actives: [true, false, false, false, false],
         isShow:true
      }
      
  },
  components:{
      Row,Col
  },
  methods:{
      didClickedItem(tag){
          //let path = this.$route.path;
          //console.log(tag);
        if (tag === 0) {
            this.actives = this.actives.map(function () {
                return false;
            });
            this.actives[0] = true;
        } else if (tag === 1) {
            this.actives = this.actives.map(function () {
                return false;
            });
            this.actives[1] = true;
        } else if (tag === 2) {
            this.actives = this.actives.map(function () {
                return false;
            });
            this.actives[2] = true;
        } else if (tag === 3) {
            this.actives = this.actives.map(function () {
                return false;
            });
            this.actives[3] = true;
        } else if (tag === 4) {
            this.actives = this.actives.map(function () {
                return false;
            });
            this.actives[4] = true;
        }
        console.log(this.$route.name);
        this.$forceUpdate();
        
      }
  },
  created(){
      
  },
  mounted(){
  }
}
</script>

