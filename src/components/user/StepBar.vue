<template>
    <div data-v-585811b2="" id="StepBar" class="StepBar" >
        <div class="ivu-steps ivu-steps-horizontal ivu-steps-small">
            <div class="ivu-steps-item" :class="currentValue>0?'ivu-steps-status-finish':'ivu-steps-status-process'" style="width: 33.3333%;">
                <div class="ivu-steps-tail"><i></i></div>
                <div class="ivu-steps-head">
                    <div class="ivu-steps-head-inner">
                        <span class="">1</span>
                    </div>
                </div>
                <div class="ivu-steps-main">
                    <div class="ivu-steps-title">验证银行卡</div>
                    <!---->
                </div>
            </div>
            <div class="ivu-steps-item" :class="currentValue>1?'ivu-steps-status-finish':currentValue==1?'ivu-steps-status-process':'ivu-steps-status-wait'" style="width: 33.3333%;">
                <div class="ivu-steps-tail"><i></i></div>
                <div class="ivu-steps-head">
                    <div class="ivu-steps-head-inner">
                        <span>2</span>
                    </div>
                </div>
                <div class="ivu-steps-main">
                    <div class="ivu-steps-title">添加银行卡</div><!---->
                </div>
            </div>
            <div class="ivu-steps-item" :class="currentValue>2?'ivu-steps-status-finish':currentValue==2?'ivu-steps-status-process':'ivu-steps-status-wait'" style="width: 33.3333%;">
                <div class="ivu-steps-tail"><i></i></div>
                <div class="ivu-steps-head">
                    <div class="ivu-steps-head-inner">
                        <span>3</span>
                    </div>
                </div>
                <div class="ivu-steps-main">
                    <div class="ivu-steps-title">确认信息</div><!---->
                </div>
            </div>
        </div>
    </div>
    
</template>

<style lang="less">
#StepBar{
    height: 0.5rem;
    padding-top:0.25rem;
    background-color: #F2F3F9;
    .ivu-steps{
        .ivu-steps-title{
            background-color: #F2F3F9;
        }
        .ivu-steps-tail>i{
            background-color: none;
        }
        .ivu-steps-head{
            background-color: #F2F3F9;
        }
        //已完成
        .ivu-steps-item.ivu-steps-status-finish{ 
            .ivu-steps-title{
                color: #999;
            }
            .ivu-steps-head-inner{
                background-color: #F2F3F9;
                border-color: #F13131;
                span::before{
                    display: none;
                    color: #F13131;
                }
                span{
                    color: #F13131;
                    width: 18px;
                    height: 18px;
                    line-height: 16px;
                    text-align: center;
                    border-radius: 50%;
                    font-size: 12px;
                }
                position: relative;
            }
        }
        .ivu-steps-item.ivu-steps-status-finish .ivu-steps-tail>i:after{
            background-color: #DCDCDC;
            height: 2px;
        }
        //正在进行
        .ivu-steps-item.ivu-steps-status-process .ivu-steps-head-inner {
            border-color: #F13131;
            background-color: #F13131;
        }
        //还未开始
        .ivu-steps-item.ivu-steps-status-wait{
            .ivu-steps-title{
                color: #999;
            }
        }

        
    } 
}
</style>

<script>
import { Steps,Step } from "iview"
import { log } from 'util';
export default {
  name:"StepBar",
  components:{
    Steps,Step
  },
  props: {
        current: {
            type: String,
            default: '1'
        },
    },
  data(){
    return{
      currentValue: Number(this.current),
    }
  },
  watch: {
        current (val) {
            this.currentValue = val;
        }
    },
  methods:{

  },
  created(){

  },
  mounted(){
    //let oDiv = document.getElementById("div1");
    /*$(this.$refs.stepBar.$el).find(".ivu-steps-item .ivu-steps-head .ivu-steps-head-inner .ivu-steps-icon").click(function(){
        console.log($(this).html());
    })*/
    //console.log($(this.$refs.stepBar.$el).find(".ivu-steps-head-inner"));
  }
}
</script>

