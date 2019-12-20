<template>
  <div class="lotteryClass">
    <div class="main">
        <div class="title">
            <div class="left" style="color:#F13131;">全部游戏</div>
            <div class="right"><Icon type="ios-arrow-up" /></div>
        </div>
        <div class="body">
            <div class="row">
                <div class="classCol">
                    <ul class="classList">
                        <li v-for="(item,index) in list" :key="index" :class="checkclassindex===index?'on':''" @click="checkClass(index)">{{item.name}}</li>
                    </ul>
                </div>
                <div span="12" class="lotteryCol" style="color:#FAFAFA;">
                    <ul class="lotteryList">
                        <li v-for="(item,index) in lotteryList" :class="checklotteryindex===index?'on':''" @click="checklottery(index,item.name)" :key="index">{{item.name}}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.lotteryClass{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background:rgba(0,0,0,0.5); 
    z-index: 999;
    .main{
        height: 3.58rem;
        background: #FFF;
        .title{
            height: 0.37rem;
            line-height: 0.37rem;
            border-bottom: #F2F3F9 1px solid;
            padding: 0 0.28rem;
            text-align: left;
            .ivu-icon{
                font-size: 0.16rem;
            }
        }
        .body{
            height: 3.2rem;
            .row{
                align-items: top;
                justify-content: flex-start;
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                .classCol{
                    max-height: 3.2rem;
                    overflow: auto;
                    cursor: pointer;
                    display: block;
                    width: 50%;
                    .classList{
                        margin: 0 0.13rem 0 0.28rem;
                        text-align: left;
                        li{
                            height: 0.38rem;
                            line-height: 0.38rem;
                            border-bottom: 1px solid #F2F3F9;
                        }
                        .on{
                            color: #F13131;
                        }
                    }
                }
                .lotteryCol{
                    max-height: 3.2rem;
                    overflow: auto;
                    cursor: pointer;
                    display: block;
                    width: 50%;
                    background: #FAFAFA;
                    .lotteryList{
                        margin-left: 0.14rem;
                        margin-right:0.26rem;
                        text-align: left;
                        li{
                            height: 0.38rem;
                            line-height: 0.38rem;
                            border-bottom: 1px solid #F2F3F9;
                            color: #2c3e50;
                        }
                        .on{
                            color: #F13131;
                        }
                    }
                }
            }
            
        }
    }
}
</style>


<script>
import { Icon,Form,FormItem,Input,Row,Col,Select,Option } from "iview"
export default {
  name:"lotteryClass",
  components:{
    Icon,Form,FormItem,Input,Row,Col,Select,Option
  },
  data(){
    return{
      list:{},//所有数据
      lotteryList:{},//选中种类的彩种列表
      checkclassindex:'',//选中的种类
      checklotteryindex:'',//选中的彩种
      lotteryClassObj:{}
    }
  },
  methods:{
    async getList(){
        let res = await this.$api.getGameMenu();
        this.list = res.data;
    },
    checkClass(key){
        this.checkclassindex = key;
        this.lotteryList= this.list[key].lotteries;
        //对外输出对象设置
        this.lotteryClassObj.classKey = key;
        this.lotteryClassObj.className = this.list[key].name;
    },
    checklottery(key,name){
        this.checklotteryindex =key;
        this.lotteryClassObj.lotteryKey = key;
        this.lotteryClassObj.lotteryName = name;
        this.$emit('lotteryData',this.lotteryClassObj);
    }
  },
  created(){
      this.getList();
  },
  mounted(){
    //let oDiv = document.getElementById("div1");
    
  }
}
</script>

