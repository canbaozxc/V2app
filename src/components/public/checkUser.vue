<template>
  <div class="checkUser"  v-show="visible">
      <div class="box">
          <h2>选择下级用户</h2>
          <Input prefix="ios-search" placeholder="通过账号搜索下级用户" style="width: 2.7rem" @on-change="setKeyWord($event)" />
          <div class="list">
                <RadioGroup v-model="puisne"  @on-change="getPuisne">
                    <Radio class="item"  v-for="(item,i) in screenData" :key="i" :label="item.value"></Radio>
                </RadioGroup>
          </div>
          <span class="close" @click="setClose">
             <img src="../../assets/userCenter/close.png" />
          </span>
      </div>
  </div>
</template>
<style lang="less">
.checkUser{
    .ivu-input{
        border-color: #DCDCDC;
    }
    .ivu-input:focus{
        box-shadow: none;
    }
    .ivu-radio-group{
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: center;
        .item{
            display: block;
            width: 33.33333333%;
            float: left;
            flex: 0 0 auto;
            position: relative;
            padding: 0;
            margin: 0;
        }
        .ivu-radio-checked:hover .ivu-radio-inner {
            border-color: #F13333;
            box-shadow: none;
        }
        .ivu-radio-inner:after {
            background-color:#F13333;
        }
        .ivu-radio-checked .ivu-radio-inner{
            border-color: #F13333;
        }
        .ivu-radio-checked .ivu-radio-focus{
            box-shadow: none;
        }
        .ivu-radio-checked:hover .ivu-radio-inner{
            border-color: #F13333;
        }
    }
}

</style>

<style lang="less" scoped>
.checkUser{
    width: 100%;
    height: 100%;
    position: fixed;
    top:0;
    left: 0;
    background-color: rgba(0,0,0,0.6);
    z-index: 500;
    
    .box{
        width: 3rem;
        height: 3.12rem;
        background-color: #FFF;
        margin: auto;
        position: fixed;
        top:0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 0.05rem;
        box-shadow: 0.03rem;
        .close{
            img{
                width: 0.23rem;
                height: 0.23rem;
            }
            width: 0.23rem;
            height: 0.23rem;
            position: absolute;
            top:-0.35rem;
            right: 0rem;
        }
        h2{
            height: 0.52rem;
            line-height: 0.52rem;
            font-size: 16px;
            color: #333;
            font-weight: 600;
        }
        .list{
            margin: 0 0.15rem;
            /*单选*/
            label{
                display: block;
                height: 0.3rem;
                line-height: 0.3rem;
                font-size: 0.12rem;
                vertical-align: middle;
                position: relative;
                white-space: nowrap;
                cursor: pointer;
                text-align: left;
            }
        }
    }
}
</style>


<script>

import { Icon,Form,FormItem,Input,Row,Col,Select,Option,RadioGroup,Radio } from "iview"
export default {
  name:"checkUser",
  components:{
    Icon,Form,FormItem,Input,Row,Col,Select,Option,RadioGroup,Radio
  },
  props:{
      value: {
            type: Boolean,
            default: false
        },
  },
  data(){
    return{
      puisne:"",
      data:[],
      visible: this.value,
      screenData:[]
    }
  },
  
  methods:{
      //获取选中的值
      getPuisne(){
          this.$emit("checkVal",this.puisne);
      },
      //输入框change方法
      setKeyWord(e){
          let data = this.data;
          let screenData = [];
          for(let i = 0;i<data.length;i++){
              let status = data[i].value.indexOf(e.target.value);
              
              if(status>-1){
                  screenData.push(data[i]);
              }
          }
          this.screenData = screenData;

      },
      async getChildren(){
          let res = await this.$api.getChildren();
          let list = res.data;
          let data = []
          for(let key in list){
              data.push({
                  "key":key,
                  "value":list[key]
              })
          }
          //请求过来的原数组
          this.data = data;
          //可用于筛选的引用数组
          this.screenData = this.data;
      },
      //关闭
      setClose(){
          this.visible = false;
          this.$emit('input', false);
          this.$emit("checkVal",this.puisne)
      }
  },
  created(){
      this.getChildren();
  },
  mounted(){
    //let oDiv = document.getElementById("div1");
    
  },
  watch:{
      value (val) {
            this.visible = val;
        },
  }
}
</script>

