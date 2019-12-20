<template>
    <!--下注组件-->
    <div class="options " :class="noteList.num!=0?'winMonyon':''">
            <div class="switch">
                <label>当前选号：</label>
                <div class="num" id="af">{{noteList.ball?noteList.viewBalls:"暂无"}}</div>
                <i id="Tx">》</i>
                <div class="clears" @click="clear">清除</div>
            </div>
            <div class="bet">
                <label class="lb">投注倍数:</label>
                <div class="step">
                    <Stepper v-model="noteList.multiple" />
                </div>
                <div class="yuanjiaofen">
                    <RadioGroup v-model="noteList.moneyunit" type="button">
                        <Radio :label="key" v-for="(value,key,index) in availableCoefficients" :key="index" :class="noteList.moneyunit=='key'?'on':''">{{value}}</Radio>
                    </RadioGroup>
                </div>
            </div>
            <div class="beishu">
                <label class="lb">预计可赢:</label>
                <div class="step">
                    <div class="winCoin"><span>{{winMony}}</span>元</div>
                </div>
                <label class="lb">返点:</label>
                <div @click="setValue('show',true)">{{Itemgroup.prize_group}}</div>
                <!-- <select v-model="Itemgroup" @change="setItemgroup()">
                    <option v-for="(item,index) in data.optionalPrizes" :key="index" :value="item" v-show="groupData.maxGroup>=item.prize_group"  >{{item.prize_group}}</option>
                </select> -->
            </div>
            <div class="tool">
                <div class="cart left">
                    <Badge :count="1">
                    <Icon type="ios-cart-outline" />
                    </Badge>
                </div>
                
                <div class="total">
                    <p>
                        共{{noteList.num}}注<span  class="red">{{lottoryMony}}</span>元
                    </p>
                    <p>
                        可用余额<span class="red">{{accountInfo.balance|fixed}}</span>元
                    </p>
                </div>
                <div class="tz right" @click="submit">投注</div>
            </div>
            <popup
            v-model="show"
            closeable
            position="bottom"
            :style="{ height: '20%' }"
            >
                <picker :columns="GroupPicker" @change="onChange" />
            </popup>
        </div>
</template>

<script>

import {ButtonGroup,Badge,Icon,RadioGroup,Radio} from "iview";
import { Stepper,Picker,Popup } from 'vant';
import minxins from '@/js/minxins.js';
export default {
    name:"Bets_bar",
    mixins:[minxins],
    components:{
        ButtonGroup,Badge,Icon,Stepper,RadioGroup,Radio,Popup,Picker
    },
    props:{
        data:{
            type:Object,
            default:{}
        },
        ballData:{
            type:Object,
            default:{}
        },
        tpl:{
            type:Object,
            default:{}
        },
        dataWay:{
            type:Object,
            default:{}
        },
        issueData:{
            type:Object,
            default:{}
        }
    },
    data(){
        return{
            accountInfo:{//金额
                username:'获取中',
                balance:'000.00',
                frozen:'000.00'
            },
            showBallName:'',//当前选号的显示名称
            availableCoefficients:"",//元角分模式
            groupData:{//奖金组信息
                userGroup:this.getUserItem("prize_group"),//用户奖金组
                maxGroup:'',//系统允许最高奖金组
            },
            Itemgroup:{//当前奖金组以及返点 对象
                prize_group:'',
                rate:'0'
            },
            /*奖金组 */
            userGroup:'',//用户奖金组
            maxGroup:"",//系统允许最高奖金组
            totalBet:[],//去重总下注组合
            is_enable_extra:false,//是否使用分赔率false:总赔率  true:分赔率
            prize:'',//总赔率:与分赔率互斥
            extra_prize_child:'',//分赔率：与总赔率互斥
            /**
             * 投注基本数据
             */
            betData:{
                amount: "",    //所有注单总金额
                balls: [],   // 投注的号码集合
                gameId: 0,    //游戏Id
                isTrace: 0,    //是否追号
                orders:'',//期号
                traceWinStop: 1,    //中奖是否停止追号
                gameNameCn: ""
            },
            noteList:{// 投注的号码集合
                ball: "",    //投注选球的内容,不同position的投注投注内容使用 | 分割
                position: "",//每个号码对应的下标位置
                extra: {},    //扩展信息
                moneyunit: "1.000",    //元角模式
                multiple: 1,    //倍数
                num: 1,        //注数
                onePrice: 2,    //单价
                prizeGroup: "",    //投注奖金组
                type: "",    //玩法 
                typeCN: "",
                viewBalls: "",    //显示的投注内容
                wayId: "",    //玩法Id
                jsId: 0,        //id ,从1自增
                totalMoney: "",    //金额
                rebate: "",    //反点
                moneyUnitData: "2元"    //圆角
            },
            GroupPicker:[],//奖金组选择组件数据
            show:false,//是否显示弹层
        }
    },
    filters: {
        fixed: function (value) {
            if (!value) return '';
            value = Number(value);
            return value.toFixed(2);
        },
    },
    computed:{
        lottoryMony(){
            let lottoryMony = Number(this.noteList.onePrice*this.noteList.moneyunit*10)*this.noteList.num*this.noteList.multiple/10;
            return lottoryMony;
        },
        winMony(){
            let winMony = 0;
            if(!this.is_enable_extra){
                for(let i=0;i<this.noteList.num;i++){
                    winMony+=this.setOdds(this.prize)*this.noteList.onePrice*this.noteList.moneyunit*this.noteList.multiple;
                }
            }else{
                for(let i=0;i<this.noteList.num;i++){
                    winMony+=this.setOdds(this.extra_prize_child[this.totalBet[i]])*this.noteList.onePrice*this.noteList.moneyunit*this.noteList.multiple;   
                }
            }
            return isNaN(winMony)?"0.000":winMony.toFixed(3);
        }
    },
    methods:{
        async bet(pream){
            let res = await this.$api.bet(pream);
            if(res.errno===0){
                this.$Modal.success({
                    title: '投注成功',
                    content: res.data,
                    okText: '投注成功'
                });
                this.clear();
                this.getAccount();
            }
        },
        //获取账户信息
        async getAccount(){
            let res = await this.$api.getAccount();
            if(res.errno===0){
                this.accountInfo = res.data;
            }
            
        },
        submit(){
            this.noteList.jsId++;
            this.noteList.moneyUnitData=this.availableCoefficients[this.noteList.moneyunit];
            this.noteList.onePrice=2;//parseInt(this.availableCoefficients[this.noteList.moneyunit])
            this.noteList.totalMoney =this.lottoryMony; //this.noteList.onePrice*this.noteList.moneyunit*this.noteList.num*this.noteList.multiple;
            this.betData.balls = [];
            this.betData.amount = this.noteList.totalMoney;
            this.betData.balls.push(this.noteList);
            let pream = {
                betdata:JSON.stringify(this.betData)
            }
            if(this.noteList.num!=0){
                this.bet(pream);
            }else{
                this.$Modal.info({
                    title: '请选择一注',
                    content: '请选择一注。',
                    okText: '回到投注'
                });
            }
            
            
        },
        /**
         * 初始化组件数据
         */
        //初始化奖金组
        initGetGroup(){
            this.maxGroup = data.maxGroup;
            this.userGroup = data.userGroup;
        },
        //初始化赔率
        initPrize(data){
            //是否有分赔率
            this.is_enable_extra = data.prizeSet.is_enable_extra;
            if(!data.prizeSet.is_enable_extra){
                //如果没有，设置总赔率
                this.extra_prize_child = '';
                this.prize = data.prizeSet.prize/2;
            }else{
                //如果有，设置分赔率,并把总赔率设置为''
                let extra_prize_child = data.prizeSet.extra_prize;
                for(let key in extra_prize_child){
                    extra_prize_child[key] = extra_prize_child[key]/2;
                }
                this.prize = '';
                this.extra_prize_child = extra_prize_child;
            }
        },
        //初始化玩法数据
        initdataWay(wayData){
            this.noteList.wayId = wayData.wayId;
            this.noteList.typeCN = wayData.typeCN.split(".").join(",");
            this.noteList.type=wayData.Tpl.split("_")[1];
            
        },
        initissueData(issueData){
            this.betData.orders={};
            this.betData.orders[issueData.currentNumber]=1;
        },
        //1.初始化推送的投注数据
        initBall(balls){
            this.noteList.position = balls.position;
            this.noteList.ball = balls.ball;
            this.noteList.viewBalls = balls.viewBallsStr;
            this.noteList.num = balls.num;
            this.totalBet = balls.totalBet;
        },
        //1.初始化推送过来的彩种游戏数据
        initGameData(data){
            this.betData.orders={};
            this.betData.orders[data.currentNumber]=1;
            //元角分模式
            this.betData.gameId = data.gameId;
            this.betData.gameNameCn = data.gameNameCn;
            this.availableCoefficients = data.availableCoefficients;
            this.groupData.maxGroup = data.maxPrizeGroup;
            //初始化当前奖金组
            this.Itemgroup = this.getJiangjinzu(this.groupData.maxGroup)
            console.log(this.Itemgroup);
            this.setItemgroup();
        },
        //2.获取返回奖金组
        getJiangjinzu(group){
            let obj = {};
            let optionalPrizes = this.data.optionalPrizes;
            for(let i=optionalPrizes.length;i--;){
                if(group==optionalPrizes[i].prize_group){
                    obj = optionalPrizes[i];
                }
            }
            return obj;
        },
        /**
         * 交互事件
         */
        //实际赔率计算
        setOdds(prize){
            let OddPrize = 0;
            if(Number(this.groupData.userGroup)>Number(this.groupData.maxGroup)){
                return((prize*2)*Number(this.Itemgroup.prize_group)/Number(this.groupData.userGroup)/2).toFixed(5);
            }else{
                return((prize*2)*(1-this.Itemgroup.rate)/2).toFixed(5);
            }
        },
        //清空当前投注
        clear(){
            this.$emit("clear");
        },
        //设置奖金组
        setItemgroup(picker, value, index){
            this.noteList.prizeGroup = this.Itemgroup.prize_group;
            this.noteList.rebate = this.Itemgroup.rate;
            this.$emit("depathItemgroup",this.Itemgroup);
        },
        //设置奖金组选择组件数据
        setPickerArr(){
            console.log("this.data");
            let optionalPrizes = this.data.optionalPrizes;
            let arr = [];
            let length = optionalPrizes.length-1;
            for(let i = optionalPrizes.length;i--;){
                arr.push(optionalPrizes[length-i].prize_group);
            }
            this.GroupPicker = arr;
            //return arr
        },
         onChange(picker, value, index) {
             this.Itemgroup = this.data.optionalPrizes[index];
             this.setItemgroup();
           //console.log(`当前值：${value}, 当前索引：${index}`);
        }
    },
    created(){
        //console.log(this.gameData.gameNameCn);
        this.setPickerArr();
        this.getAccount();
    },
    mounted(){
        
        $(function(){
            $("#Tx").click(function(){
                let left = $("#af").scrollLeft()+10;
                $("#af").scrollLeft(left);
            })
        })
    },
    watch:{
        //彩种切换数据
        data:{  
            handler:function(val,oldval){ 
                if(val!=oldval){
                    this.$nextTick(()=>{
                        this.initGameData(val);
                        //console.log(val);
                    })
                }
            },  
            immediate:true,//关键
            deep:true
        },
        //玩法切换数据
        dataWay:{  
            handler:function(val,oldval){ 
                if(val!=oldval){
                    this.$nextTick(()=>{
                        this.initdataWay(val);
                        //zconsole.log(val);
                    })
                }
            },  
            immediate:true,//关键
            deep:true
        },
        //投注信息数据更新
        ballData:{  
            handler:function(val,oldval){ 
                if(val!=oldval){
                    this.$nextTick(()=>{
                        this.initBall(val);
                        
                    })
                }
            },  
            immediate:true,//关键
            deep:true
        },
        //模板更新
        tpl:{  
            handler:function(val,oldval){ 
                if(val!=oldval){
                    this.$nextTick(()=>{
                        this.initPrize(val);
                    })
                }
            },  
            immediate:true,//关键
            deep:true
        },
        //初始化更新期号
        issueData:{
            handler:function(val,oldval){ 
                if(val!=oldval){
                    this.$nextTick(()=>{
                        if(val.currentNumber){
                            this.initissueData(val);
                        }
                    })
                }
            },  
            immediate:true,//关键
            deep:true
        },
        
    }
}
</script>
<style lang="less">
.options{
    
    .ivu-radio-group-button{
        .ivu-radio-focus:after{
        box-shadow:none;
            opacity: 0;
        }
        .ivu-radio-wrapper-checked:hover {
            color: #f13131;
            border-color: #f13131;
            box-shadow:none;
        }
        .ivu-radio-wrapper-checked {
            color: #f13131;
            border-color: #f13131;
            box-shadow:none;
        }
        .ivu-radio-wrapper-checked:before{
                background: #f13131;
                box-shadow:none;
                opacity: 1;
        }
        .ivu-radio-wrapper-checked:after{
                background: #f13131;
                box-shadow:none;
                opacity: 0;
        }
    }
    
    .bet{
        .step{
                
            .van-stepper{
                button{
                    background: #FFF;
                }
                .van-stepper__input{
                    background: #FFF;
                    border:1px solid #DDD;
                    color: #ffae4c;
                    width: 0.5rem;
                }
            }
        }
    }
    .tool{
        .cart{
            .ivu-icon{
                display: block;
            }
            .ivu-badge-count{
                width: 0.15rem;
                height: 0.15rem;
                line-height: 0.12rem;
                top: -5px;
                padding: 0;
            }
        }
    }
}

</style>

<style lang="less" scoped>
.red{
        color: #ec0022;
}
.options{
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 0.5rem;
    background-color: #fff;
    border-radius: 5px 5px 0 0;
    -webkit-box-shadow: 0 -4px 8px 0 rgba(61,61,61,.14);
    box-shadow: 0 -4px 8px 0 rgba(61,61,61,.14);
    z-index: 298;
    opacity: .97;
    overflow: hidden;
    .switch{
        width: 100%;
        padding-left: 0.13rem;
        padding-right: 0.8rem;
        padding-top: 0.10rem;
        overflow: hidden;
        border-bottom: 1px solid #f5f5f5;
        text-align: left;
        font-size: 0.14rem;
        line-height: 0.3rem;
        position: relative;
        display: flex;
        .num{
            color: red;
            width: 2rem;
            overflow-y: auto;
        }
        i{
            font-style: normal;
            transform:scaleX(3);
            position: absolute;
            top:0.1rem;
            right:0.6rem;
            color: red;
            font-size: 0.12rem;
            text-align: center;
            width: 0.1rem;
        }
        .clears{
            position: absolute;
            top:0.1rem;
            right:0;
            width: 0.6rem;
            text-align: center;
            background: #fff;
        }
    }
    .bet,.beishu{
        height: 0.5rem;
        line-height: 0.5rem;
        display: flex;
        padding: 0.1rem 0.13rem 0 0.13rem;
        font-size: 0.14rem;
        display: flex;
        .yuanjiaofen{
            float: right;
        }
        .step{
            flex: 1;
            text-align: left;
            .winCoin{
                span{
                    color: #ffae4c;
                }
                
            }
        }
    }
    .tool{
        position: fixed;
        width: 100%;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #2a2d32;
        height: 0.5rem;
        color: #fff;
        display: flex;
        
        .cart{
            background-color: #404247;
            display: flex;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            -webkit-box-pack: center;
            -ms-flex-pack: center;
            justify-content: center;
            width: 0.8rem;
            text-align: center;
            height: 100%;
            line-height: 0.5rem;
            font-size: 0.26rem;
            vertical-align: middle;
            position: relative;
        }
        .total{
            flex: 1;
            text-align: center;
            p{
                font-size: 0.14rem;
                line-height: 0.25rem;
            }
        }
        .tz{
            text-align: center;
            height: 0.5rem;
            line-height: 0.5rem;
            width:0.8rem;
            background-color: #d82e2f;
        }
    }
}
.winMonyon{
    height: 2rem;
}
</style>

