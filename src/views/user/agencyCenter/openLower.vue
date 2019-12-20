<template>
    <div class="openLower" id="openLower">
        <titleBar title="下级开户" />
 
        <div class="message_tit">
            设置用户账号信息
        </div>
        <div class="body">
            <Row type="flex" justify="start" align="middle" class="choice " >
                <Col span="12">
                    <div class="col" :class="is_agent === '1'?'on':''" @click="setValue('is_agent','1')">
                    代理账号
                    </div>
                </Col>
                <Col span="12">
                    <div class="col" :class="is_agent === '0'?'on':''"  @click="setValue('is_agent','0')">
                    玩家账号
                    </div>
                </Col>
            </Row>
            <div class="item">
                <Row  type="flex" justify="center" align="middle">
                    <Col span="6">
                        <span class="left">有效期</span>
                    </Col>
                    <Col span="16">
                            <!--Input type="text" v-model="formInline.bank_id"  placeholder="请选择开户银行"></Input-->
                            <Select v-model="seachData.valid_days"  placeholder="请选择">
                                <Option v-for="item in indateList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                            </Select>
                    </Col>
                </Row>
            </div>
            <div class="item">
                <Row  type="flex" justify="center" align="middle">
                    <Col span="6">
                        <span class="left">推广渠道</span>
                    </Col>
                    <Col span="16">
                            <!--Input type="text" v-model="formInline.bank_id"  placeholder="请选择开户银行"></Input-->
                            <Select v-model="qudao"  placeholder="请选择">
                                <Option v-for="item in placeList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                            </Select>
                    </Col>
                </Row>
            </div>
            <div class="item" v-if="qudao==='自定义'" >
                <Row  type="flex" justify="center" align="middle">
                    <Col span="6">
                    </Col>
                    <Col span="16">
                            <Input type="text" v-model="userDefined"  placeholder="请输入自定义渠道"></Input>
                    </Col>
                </Row>
            </div>
            <div class="item" v-for="(item,index) in qqList" :key="index">
                <Row  type="flex" justify="center" align="middle">
                    <Col span="6">
                        <span class="left">推广QQ</span>
                    </Col>
                    <Col span="16">
                            <Input type="text" v-model="item.qq"  placeholder="请输入推广QQ">
                                <Icon type="ios-add" v-if="index===(qqList.length-1)"   slot="suffix"  @click="addQQ" />
                            </Input>
                    </Col>
                </Row>
            </div>
        </div>
        <div class="message_tit">
            数字彩奖金组
        </div>
        <div class="body">
            <div class="box">
                <div class="bonusPer">{{rebates}}</div>
                <Row type="flex" justify="start" align="top">
                    <Col span="4">
                        <img class="icon" src="../../../assets/lose.png" @click="lose()" />
                        <p>统一设置</p>
                    </Col>
                    <Col span="16">
                        <Slider v-model="bonusGroup" :step='step' show-tip='never'></Slider>
                    </Col>
                    <Col span="4">
                        <img class="icon" src="../../../assets/add.png" @click="add()"  />
                        <p class="value">{{getPrizeGrroup()}}</p>
                    </Col>
                </Row>
                
            </div>
        </div>
        <Row type="flex" justify="start" align="middle">
            <Col span="24">
                <Button  long style="width:3rem;border-radius: 1.5rem; background-color:#F13131; margin-top:0.25rem;height:0.45rem;color:#FFF;box-shadow:none; border:none; font-size:0.16rem;" @click="submit">生成邀请码</Button>
            </Col>
        </Row>
        <Modal
            id="openLowerModal"
            v-model="modal1"
            title="信息确认"
            @on-ok="CreateRegisterLink"
            okText="确认"
            cancelText="返回修改">
            <Row type="flex" justify="start" align="middle">
                <Col span="12">
                账号类型：
                </Col>
                <Col span="12">
                {{seachData.is_agent=='1'?'代理账号':'玩家账号'}}
                </Col>
                <Col span="12">
                链接有效期：
                </Col>
                <Col span="12">
                {{seachData.valid_days===''||seachData.valid_days==='0'?'永久':seachData.valid_days+'天'}}
                </Col>
                <Col span="12">
                推广渠道：
                </Col>
                <Col span="12">
                {{seachData.channel}}
                </Col>
                <Col span="12">
                推广qq：
                </Col>
                <Col span="12">
                    <span v-for="(item,index) in seachData.agent_qqs" :key="index">{{item}}</span>
                </Col>
            </Row>
        </Modal>
    </div>
</template>
<style lang="less">
#openLowerModal{
    .ivu-btn-primary {
        color: #fff;
        background-color: #F13131;
        border-color: #F13131;
    }
    .ivu-btn-text {
        color: #515a6e;
        background-color: transparent;
        border-color: #999;
    }
}
.openLower{
    
    .ivu-select-selection{
        border: none;
        box-shadow:none;
        text-align: left;
        
    }
    .ivu-select-item{
        text-align: left;
    }
    .ivu-input:focus{
      box-shadow: none;
    }
    .ivu-input{
        outline: none;
        border: none;
        color: #333;
        text-align: left;
        margin: 0;
        padding: 0;
        height: 0.4rem;
        line-height: 0.4rem;
        font-size: 0.12rem;
        padding-left: 0.1rem;
    }
    .ivu-slider-wrap{
        margin: 8px 0;
    }
    .ivu-slider-bar{
        background: #F13131;
    }
    .ivu-slider-button{
        background: #F13131;
        border-color: #F13131;
    }
    
}
</style>

<style lang="less" scoped>
.openLower{

    .message_tit{
        height: 0.45rem;
        line-height: 0.45rem;
        text-align: left;
        font-size: 0.14rem;
        padding-left: 0.15rem;
    }
    .body{
        background: #FFF;
        .choice{
            font-size: 0.12rem;
            line-height: 0.45rem;
            background-color: #FFF;
            .col{
                border-bottom: 2px solid #FFF;
            }
            .on{
                border-bottom: 2px solid #F13131;
            }
        }
        .item{
            position: relative;
            height: 0.45rem;
            line-height: 0.45rem;
            border-bottom: 1px solid #F2F3F9;
            .ivu-form-item{
                margin-bottom: 0;
                .ivu-select-arrow{
                    top: 0.12rem;
                }
            }
            .ivu-icon{
                position: absolute;
                right: 0;
                top: 0;
                font-size: 0.18rem;
                line-height: 0.4rem;
            }
            
            .ivu-input{
                outline: none;
                border: none;
                color: #333;
                text-align: left;
                margin: 0;
                padding: 0;
                height: 0.4rem;
                line-height: 0.4rem;
                font-size: 0.12rem;
                padding-left: 0.1rem;
            }
        }
        .box{
            height: 1rem;
            padding: 0 0.15rem;
            .bonusPer{
                height: 0.3rem;
                line-height: 0.3rem;
                font-size:12px;
            }
            .icon{
                width: 0.2rem;
                font-size: 0.12rem;
                color: #333;
                
            }
            .value{
                border: 1px solid #999;
            }
        }
    }
}
</style>

<script>
import { Row,Col,Select,Option,Input,Icon,Slider,Modal } from "iview"
import titleBar from "@/components/public/Title-bar.vue"
import minxins from '@/js/minxins.js';
export default {
    name:"openLower",
    mixins: [ minxins ],
    components:{
        titleBar,Row,Col,Select,Option,Input,Icon,Slider,Modal
    },
    data(){
        return {
            //弹出框
            modal1:false,
            seachData:{
                is_agent:'1',
                series_prize_group_json:{'1':'0'},
                prize_group_id:'',
                prize_group_type:2,
                valid_days:'',
                channel:'',
                agent_qqs:[]
            },
            qudao:'qq',//渠道
            step:0.015,//步长
            //有效期
            indateList:[
                {
                    name:'1天',
                    value:"1"
                },
                {
                    name:'3天',
                    value:"3"
                },
                {
                    name:'7天',
                    value:"7"
                },
                {
                    name:'30天',
                    value:"30"
                },
                {
                    name:'90天',
                    value:"90"
                },
                {
                    name:'永久',
                    value:"0"
                },
            ],
            //渠道
            placeList:[
                {
                    name:"qq",
                    value:"qq"
                },
                {
                    name:"微信",
                    value:"微信"
                },
                {
                    name:"微博",
                    value:"微博"
                },
                {
                    name:"论坛",
                    value:"论坛"
                },
                {
                    name:"自定义",
                    value:"自定义"
                },
            ],
            //自定义渠道
            userDefined:'',
            qqList:[
                {
                    qq:''
                }
            ],
            //数字彩奖金组
            bonusGroup:0,
            a_max_group:'',//奖金组最大值
            a_min_group:'',//奖金组最小值
            is_agent:'1',//是否开代理账户
        }
    },
    computed:{
        rebates(){
            let canshu = (Number(this.a_max_group) - Number(this.a_min_group))/100;
            let setQujian = parseInt(Number(this.a_min_group) + Number(this.bonusGroup)*canshu);
            let fadian =  (this.a_max_group- setQujian)/20;
            return fadian.toFixed(2)+'%';
        }
    },
    filters: {
    },
    methods:{
        async getPrizeGroupForCreate(){
            let res = await this.$api.getPrizeGroupForCreate();
            this.a_max_group = res.data.a_max_group;
            this.a_min_group = res.data.a_min_group;
            this.step = Number((100/458).toFixed(5));
            console.log(this.step);
        },
        //提交和查验数据
        submit(){
            this.seachData.channel = this.qudao==='自定义'?this.userDefined:this.qudao;
            this.seachData.prize_group_id = this.getPrizeGrroup();//奖金组id
            this.seachData.series_prize_group_json = JSON.stringify({'1':this.getPrizeGrroup()});//奖金组id
            this.seachData.agent_qqs = this.getagent_qqs();//qq
            this.seachData.is_agent = this.is_agent;//是否代理
            this.seachData.valid_days = this.seachData.valid_days===''?'0':this.seachData.valid_days;
            //this.CreateRegisterLink();
            this.modal1 = true;
        },
        async CreateRegisterLink(){
            let res = this.$api.CreateRegisterLink(this.seachData);
            let _this = this;
            res.then(function(val){
                if(val.errno==0){
                    _this.rouLink('/user/invitationCodeMessage');
                }
            })
        },
        getagent_qqs(){
            let qqArr = [];
            for(let i =0;i<this.qqList.length;i++){
                if(this.qqList[i].qq!==''){
                    qqArr.push(this.qqList[i].qq);
                }
            }
            if(qqArr.length===0){
                qqArr = ['']
            }
            return qqArr;
        },
        getPrizeGrroup(){//选择区间
            if(this.bonusGroup>=99.999){
                this.bonusGroup = 100;
            }

            let canshu = (Number(this.a_max_group) - Number(this.a_min_group))/100;
            let setQujian = parseInt(Number(this.a_min_group) + Number(this.bonusGroup)*canshu);
            return setQujian;
        },
        addQQ(){
            let obj = {
                    qq:''
                };
            this.qqList.push(obj);
            console.log(this.qqList);
            this.$forceUpdate();
        },
        lose(){
            if (this.bonusGroup <= 0) {
                    return false;
                }
            this.bonusGroup -=this.step;
        },
        add(){
            if (this.bonusGroup >= 100) {
                    return false;
                }
            this.bonusGroup +=this.step;
        }
    },
    created(){
        
    },
    mounted(){
        this.bgColor("#F2F3F9");
        this.getPrizeGroupForCreate();
    }
}
</script>
