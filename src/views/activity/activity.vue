<template>
  <div class="activity">
      <titleBar title="优惠活动" />
    <div class="main">
        <div class="box" v-for="(item,index) in data" :key="index">
            <img src="../../assets/userCenter/activity.png" />
            <div class="con">
                <h3>{{item.title}}</h3>
                <div class="p">{{item.explain}}</div>
            </div>
            <div class="more">
                <span>查看详情</span>
                <div class="ico">
                    <Icon type="ios-arrow-forward" />
                </div>
                <div class="clear"></div>
            </div>
        </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.activity{
    .main{
        padding: 0 0.15rem;
        .box{
            margin-top: 0.15rem;
            background-color: #FFF;
            border-radius: 5px;
            img{
                width: 100%;
            }
            .con{
                padding: 0.1rem 0.15rem;
                border-bottom: 1px solid #F2F3F9;
                h3{
                    color: #333;
                    font-size: 0.12rem;
                    line-height: 0.24rem;
                    font-weight: 500;
                    text-align: left;
                }
                .p{
                    color: #999;
                    font-size: 0.12rem;
                    text-overflow:ellipsis;/* 超出部分显示省略号 */
                    white-space: nowrap;/*规定段落中的文本不进行换行 */
                    overflow: hidden;/*超出部分隐藏*/
                }
            }
            .more{
                padding: 0.1rem 0.15rem;
                span{
                    float: left;
                    color: #333;
                }
                .ico{
                    float: right;
                    color: #666666;
                }
            }
        }
    }
}
</style>


<script>
import { Icon } from "iview"
import titleBar from "@/components/public/Title-bar.vue"
import minxins from '@/js/minxins.js';
export default {
  name:"noice",
  mixins:[minxins],
  components:{
      titleBar,
      Icon
  },
  data(){
    return{
        data:[
            {
            title:"升级有惊喜 晋级奖励",
            explain:'升级有惊喜 晋级奖励 升级有惊喜 晋级奖励升级有惊喜 ...',
            imgsrc:''
            },
            {
            title:"升级有惊喜 晋级奖励",
            explain:'升级有惊喜 晋级奖励 升级有惊喜 晋级奖励升级有惊喜 ...',
            imgsrc:null
            },
        ]
    }
  },
  methods:{

  },
  created(){

  },
  mounted(){
    this.bgColor("#F2F3F9");
  }
}
</script>

