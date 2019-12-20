<template>
  <Scroll :on-reach-bottom="handleReachBottom">
  <div class="bettingRecord">
    <div class="scroll" :style="{width:tableWidth+'px'}">
        <!--div  v-for="(item, index) in list" :key="index" class="cordLi">
          <Row type="flex" justify="start" align="top">
            <Col span="11" class="asd1" >
                <p>{{item.lottery}}</p>
                <p>投注金额：{{item.coefficient}}</p>
            </Col>
            <Col span="10" class="bsd1" style="">
                <p style="color:#999999;">{{item.bet_number}}</p>
                <p :class="item.prize.charAt(0)==='-'?'green':'red'">{{item.prize.charAt(0)==='-'?item.status:"已中"+item.prize+"元"}}</p>
            </Col>
            <Col span="3" class="csd1">
                <Icon type="ios-arrow-forward" />
            </Col>
          </Row>
        </div-->
        <div v-for="(col,i) in list" :key="i" class="cordLi"  >
            <div class="iRow" >
                <div class="iCol" v-for="(item,index) in columnsItem" :key="index" :style="{width:item.width+'px'}" v-if="!item.render" >{{col[item.key]}}</div>
            </div>
        </div>
    </div>
  </div>
  </Scroll>
</template>
<style lang="less">
.bettingRecord{

  .scroll{
    .ivu-card-bordered{
      border-top:none;
      border-color:#F2F3F9;
    }
    .cordLi{
      padding: 5px 16px 2px 16px;
      border-bottom: 1px solid #F2F3F9;
    }
  }
}
</style>

<style lang="less" scoped>
.bettingRecord{
  .scroll{
    margin-top: 0.1rem;
    width: 100%;
    background-color: #FFF;
    z-index:5;

  }
}
</style>


<script>
import { Scroll,Card,Row,Col,DatePicker,Icon,Select,Option,Input } from "iview"

import minxins from '@/js/minxins.js';

export default {
  name:"bettingRecord",
  mixins: [ minxins ],
  components:{
    Scroll,Card,Row,Col,DatePicker,Icon,Select,Option,Input
  },
  computed: {
        tableWidth(){
            let width = 0;
            for(let i=0;i<this.columnsItem.length;i++){
                width += this.columnsItem[i].width;
            }
            return width;
        },
    },
  data(){
    return{
        columnsItem: [
                {
                    title: '操作',
                    key: 'action',
                    width: 80,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('a', {
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.row.user_id)
                                        }
                                    }
                                }, '查看下级'),
                            ]);
                    }
                },
                {
                    title: '用户名',
                    key: 'username',
                    width: 100,
                },
                {
                    title: '用户类型',
                    key: 'usertype',
                    width: 100
                },
                {
                    title: '奖金组',
                    key: 'prize',
                    width: 100
                },
                {
                    title: '下级人数',
                    key: 'lowerNum',
                    width: 100
                }
                
            ],
      list: [],

      ifNav:false,
    }
  },
  methods:{
 
    async getList(){
        let res = await this.$api.getbettingRecordList();
        if(this.list.length<1){
          this.list=res.data.list;
        }else{
          this.list=this.list.concat(res.data.list);
        }
    },
    async getData(){//ajax
        let res = await this.$api.getlowlist();
        if(this.list.length<1){
            this.list=res.data;
        }else{
            this.list=this.list.concat(res.data);
        }
    },
    handleReachBottom () {
        return new Promise(resolve => {
            setTimeout(() => {
                this.getData();
                resolve();
            }, 2000);
        });
    }
  },
  created(){
    //console.log(localStorage.getItem('clientHeight'));
    
  },
  mounted(){
    //let oDiv = document.getElementById("div1");
    this.bgColor("#F2F3F9");
    this.getData();
    let _this = this;
    /*setTimeout(function(){
      _this.getList();
    },100);*/
    $(function(){
      //console.log($(window).height());
      let wH = $(window).height()
      let soll = '';
      $(document).scroll(function () {
          var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        soll = $(document).height() - wH - scrollTop-_this.tableWidth;
        console.log(soll);
        
        if($(document).scrollTop()>200){
          _this.ifNav = true;

        }else{
          _this.ifNav = false;
        }
        if(soll<5){
            //_this.getList();
        }
         
      })
      
    })
  }
}
</script>

