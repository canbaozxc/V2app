<template>
    <div class="invitationCodeMessage">
        <titleBar title="邀请码管理" />
        <div class="message_tit">
            注：点击邀请码快速复制邀请码和注册链接
        </div>
        <div class="scroll">
            <div  class="cordLi" v-for="(item,index) in data" :key="index"  @click="openDetails(item.id)" >
                <Row type="flex" justify="start" align="top">
                    <Col span="11" class="asd1" >
                        <p>1</p>
                        <p>2</p>
                    </Col>
                    <Col span="10" class="bsd1" style="">
                        <p>{{item.channel}}</p>
                        <p>已注册{{item.created_count}}人</p>
                    </Col>
                    <Col span="3" class="csd1">
                        <Icon type="ios-arrow-forward" />
                    </Col>
                </Row>
            </div>
            <div v-if="ifEnd">没有数据了...</div>
        </div>
        <invitationCodeDetails @goBack="backinvitationCodeDetails" :link_id ="infoId" v-if="ifAfterNoDatail" />
    </div>
</template>
<style lang="less" scoped>
.invitationCodeMessage{
    .message_tit{
        height: 0.45rem;
        line-height: 0.45rem;
        text-align: left;
        font-size: 0.12rem;
        padding-left: 0.15rem;
    }

    .scroll{
        
        width: 100%;
        background-color: #FFF;
        z-index:5;
        
        .cordLi{
            padding: 5px 16px 2px 16px;
            border-bottom: 1px solid #F2F3F9;
        }
        .asd1{
        text-align: left;
        font-size: 0.12rem;
        line-height: 0.30rem;
        .num{
            span{
            color:#387AFF;
            }
        }
        }
        .bsd1{
        text-align: right;
        font-size: 0.12rem;
        line-height: 0.30rem;
        overflow: hidden;
        .red{
            color:#F13131;
        }
        .green{
            color:#65BE69;
        }
        }
        .csd1{
        .ivu-icon{
            position: absolute;
            top: 0.2rem;
        }
        .select-arrow {
            position: absolute;
            right: 8px;
            line-height: 1;
            transform:rotate(0deg);
            font-size: 14px;
            color: #808695;
            transition: all .2s ease-in-out;
        }
        .rdeg{
            transform:rotate(-180deg);
        }
        }
    }
}
    
</style>
<script>
import { Row,Col,Icon } from "iview"
import titleBar from "@/components/public/Title-bar.vue"
import invitationCodeDetails from '@/components/user/invitationCodeDetails.vue'
import minxins from '@/js/minxins.js';
export default {
    name:'invitationCodeMessage',
    mixins:[minxins],
    components:{
        titleBar,Row,Col,Icon,invitationCodeDetails
    },
    data(){
        return{
           data:[], 
           datacount:'',
           ifEnd:false,
           infoId:'',
           ifAfterNoDatail:false,
        }
    },
    methods:{
        async getData(){//ajax
            let res = await this.$api.getRegisterLinks();
            //1.列表内容
            if(this.data.length<1){
                this.data=res.data.list;
            }else{
                this.data=this.data.concat(res.data.list);
            }

            //2.如果有数据条数，存上
            if(res.data.count){
                this.datacount = res.data.count;
                //如果当前数据，小于总数据条数，那么可以请求,没有结束
                if(this.data.length<this.datacount){
                    //未结束
                    this.ifEnd = false;
                }else{
                    this.ifEnd = true;
                }
            }
        },
        submit(){
            this.data = [];
            this.getData();
        },
        openDetails(id){
            //需要打开的详情id
            this.infoId = id;
            //打开详情
            this.ifAfterNoDatail = true;
        },
        backinvitationCodeDetails(){
            this.ifAfterNoDatail = !this.ifAfterNoDatail;
            this.submit();
        }
    },
    mounted(){
        this.bgColor("#F2F3F9");
        this.getData();

    }
}
</script>


