<template>
<Scroll :on-reach-bottom="handleReachBottom" :height="wh">
  <div class="depositLower">
    <div class="fixed">
      <titleBar title="用户列表" />
      <div class="seach-box">
        <Row type="flex" justify="start" align="middle">
          <Col span="11">
            <div @click="ischeckUser = true">
                <Input v-model="seachData.username"  placeholder="游戏用户" style="width: 100%;" readonly>
                    <img src="../../../assets/userCenter/seach_user.png"   slot="suffix" style="width:14px;padding-top:9px;" />
                </Input>
            </div>
          </Col>
          <Col span="1">
          </Col>
          <Col span="11">
            <Select v-model="seachData.is_agent" style="width:100%" placeholder="用户类型">
                <Option v-for="item in userTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </Col>

        </Row>
        <Row type="flex" justify="start" align="middle">
          <Col span="11">
            <Input v-model="seachData.account_from"  placeholder="用户余额" style="width: 100%;"></input>
          </Col>
          <Col span="1">
            <span>-</span>
          </Col>
          <Col span="11">
            <Input v-model="seachData.account_to"  placeholder="用户余额" style="width: 100%;"></input>
          </Col>

        </Row>
        <Row type="flex" justify="start" align="middle">
          <Col span="24">
             <Button type="error" long style="border-radius: 0.16rem;" @click="submit">搜索</Button>
          </Col>
        </Row>
      </div>
    </div>
    <div class="scroll">
        <myTable :columns="columnsItem" :data="data"></myTable>
    </div>
    <checkUser v-model="ischeckUser" @checkVal="getCheckVal" />
  </div>
</Scroll>
</template>
<style lang="less">
.depositLower{
  .seach-box{
    .ivu-select-single .ivu-select-selection .ivu-select-placeholder,.ivu-select-item{
      text-align: left;
    }
    .ivu-select-visible .ivu-select-selection{
      box-shadow: none;
    }
    .ivu-col-span-11{
      width: 47.83333333%;
    }
    .ivu-input-with-suffix{
      padding-right: 24px;
    }
    .ivu-input:focus{
      box-shadow: none;
      
    }
    .ivu-select-selected-value{
        text-align: left;
    }
  }
  .scroll{
  }
}
</style>

<style lang="less" scoped>
.depositLower{
  .fixed{
    width: 100%;
    .seach-box{
      font-size: 0.12rem;
      line-height: 0.45rem;
      width: 100%;
      background-color: #FFF;
      padding:0 0.15rem;
      span{
        padding: 0 0.05rem;
      }

      .filtrate{
        width: 0.75rem;
        height: 0.3rem;
        border: 1px solid #DCDCDC;
        border-radius:15px;
        line-height: 0.3rem;
        font-size: 0.12rem;
      }
      .button{
        width: 0.75rem;
        height: 0.3rem;
        border-radius:15px;
        line-height: 0.3rem;
        font-size: 0.12rem;
        background-color: #F13131;
        color:#FFF;
      }
    }
    .filtrate-box{
      width: 100%;
      height: 0.6rem;
      position: absolute;
      top:0.95rem;
      background-color: #FFF;
      border:1px solid #F2F3F9;
    }
  }
  .scroll{
    margin-top: 0.15rem;
    width: 100%;
    background-color: #FFF;
    z-index:5;
    
  }
}
</style>


<script>
import { Row,Col,Select,Option,Input,Scroll} from "iview"
import checkUser from "@/components/public/checkUser.vue"
import titleBar from "@/components/public/Title-bar.vue"
import myTable from '@/components/public/table/table.vue';
import minxins from '@/js/minxins.js';
export default {
  name:"depositLower",
  mixins: [ minxins ],
  components:{
    titleBar,Row,Col,Select,Option,Input,checkUser,myTable,Scroll
  },
  data(){
    return{
      isFiltrate:false,
      seachData:{//搜索条件
        username:'',
        account_from:'',
        account_to:'',
        parent_id:'',
        is_agent:'',
        page:'1'

      },
      userTypeList:[
          {
              label:"玩家",
              value:"0"
          },
          {
              label:"代理",
              value:"1"
          },
      ],
      columnsItem: [
          {
              title: '操作',
              key: 'action',
              width: 80,
              align: 'center',
              render: (h, params) => {
                  if(params.row.is_agent=='1'){//如果是代理
                      return h('div', [
                      h('a', {
                              style: {
                                  marginRight: '5px'
                              },
                              on: {
                                  click: () => {//查看下级
                                      //console.log(params.row);
                                      this.getLower(params.row.username);
                                      
                                  }
                              }
                          }, '查看下级'),
                      ]);
                  }else{
                    return '';
                  }
                  
              }
              
          },
          {
              title: '用户名',
              key: 'username',
              width: 100,
          },
          {
              title: '用户类型',
              key: 'user_type',
              width: 100
          },
          {
              title: '奖金组',
              key: 'prize_group',
              width: 100
          },
          {
              title: '下级人数',
              key: 'children_num',
              width: 100
          }
          
      ],
      data:[],
      ischeckUser:false,//下级用户搜索控件是否显示
      wh:localStorage.getItem('widowHeight'),
    }
  },
  methods:{
    getLower(username){
      this.seachData.username = username;
      this.submit();
    },
    async getList(){
        let pream = this.seachData; 
        let res = await this.$api.getUsers(pream);
        this.data = res.data.list.child;
    },
    handleReachBottom () {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, 2000);
        });
    },
    //选择下级用户
    getCheckVal(username){
        this.seachData.username = username;
        console.log(username);
    },
    submit(){
      this.getList();
    }
  },
  created(){
  },
  mounted(){
    this.bgColor("#F2F3F9");
    this.getList();
  }
}
</script>