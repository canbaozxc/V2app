<template>
    <div class="header">
      <div class="left txt-left">
        <Icon type="ios-arrow-back"  @click="backHistory()" />
      </div>
      <div class="h-tit">{{title}}</div>
      <div class="right txt-right">
        <slot></slot>
      </div>
    </div>
</template>
<style lang="less" scoped>

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
    .txt-right{
      position: absolute;
      top: 0;
      right: 0.2rem;
      font-size: 0.12rem;
    }
  }
</style>
<script>
import { Icon } from "iview"
export default {
    name:"title-bar",
    props: {
        title:{
            type: [String],
            default: '',
        }
    },
    components:{
        Icon
    },
    data(){
        return {
        }
    },
    methods:{
        backHistory(){
            this.$router.go(-1);//返回上一层
        }
    }
}
</script>
