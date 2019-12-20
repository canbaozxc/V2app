<!--游戏首页所有游戏的初始页面-->
<template>
    <div id="gameIndex">
        <!--1.加载彩种，玩法信息，确认彩种，玩法-->
        <component v-bind:is="'titleBar'" :gameType="gameType" @depathLottory="getLottoryData" @depathGameData="getGameData" @depathTpl="getTplTemp" ></component>
        <!--2.将玩法信息，时间，等传入头部-->
        <component v-bind:is="headTempName" :data="gameData" v-if="gameData!=''" @depathissueData="getissueData"></component>
        
        <div v-show="true">
            <div style="margin-bottom:2rem;">
                <component v-bind:is="way_name" ref="mychild" v-model="PrizeData" :dataWay="dataWay" :Item="Itemgroup" :groupData="groupData" v-if="PrizeData!=''" @depathBall="getBall" @depathTpl="getTpl" ></component>
            </div>
            <Betsbar  @clear="clear" @depathItemgroup="setItemgroup" :groupData="groupData" :dataWay="dataWay" :ballData="ballData" :tpl="tpl" :issueData="issueData"   :data="gameData" v-if="gameData!=''&&tpl!='' &&ballData!=''&&dataWay!=''&&issueData!=''"></Betsbar>
        </div>
    </div>
</template>


<style lang="less" scoped>
#gameIndex{}
</style>

<script>
import {Row,Col,Icon,ButtonGroup,Badge } from "iview"
import minxins from '@/js/minxins.js';
import { setTimeout,setInterval,clearInterval } from 'timers';
import { log } from 'util';
export default {
    name:'gameIndex',
    components:{
        Badge,
        ButtonGroup,
        titleBar:() => import("@/components/game/Title-bar.vue"),
        Row,Col,
        Icon,
        K3head:() => import("@/components/game/K3_head.vue"),
        k3way:() => import("@/components/game/K3/K3.vue"),
        Betsbar:()=>import("@/components/game/Bets_bar.vue"),
    },
    mixins:[minxins],
    data(){
        return{
            gameData:'',
            gameType:'',//彩种
            headTempName:"",//调用头部组件名称
            way_id:'',//当前玩法id
            PrizeData:'',//当前玩法数据
            groupData:{//奖金组信息
                userGroup:this.getUserItem("prize_group"),//用户奖金组
                maxGroup:'',//系统允许最高奖金组
            },
            Itemgroup:{//当前奖金组以及返点 对象
                prize_group:'',
                rate:''
            },
            ballData:'',//投注内容数据
            ball:'',//当前选号
            tpl:'',//当前
            availableCoefficients:{},//元角分模式
            dataWay:"",//玩法数据
            issueData:{},//期号更新
            way_name:'k3way',//玩法组件
        }
    },
    methods:{
        //2.获取彩系列表
        async getGameSeries(){
            let res = await this.$api.getGameSeries();
            localStorage.setItem('getGameSeries',JSON.stringify(res.data));
        },
        async getPrizeSet(){
            let pream = {
                way_id:this.way_id,
                prize_group:this.getUserItem("prize_group")
            }
            let res = await this.$api.getPrizeSet(pream);
            if(res.errno===0){
                let data = res.data;
                this.PrizeData = data;
            }else{
                this.getPrizeSet();
            }
        },
        /**
         * 初始化
         */
        //更新期号
        getissueData(data){
            this.issueData = data;
        },
        getLottoryData(data){
            //console.log(data);
            switch (data.caixi) {
                case "k3":
                    this.way_name = 'k3way';
                    break;
            
                default:
                    break;
            }
        },
        //1.Title组件回传数据，初始化调用数据(注意只允许页面加载运行，不允许在其他函数中调用)
        getGameData(data){
            //console.log(data);
            //元角分模式
            this.availableCoefficients = data.availableCoefficients;
            this.gameData = data;
            this.groupData.maxGroup = this.gameData.maxPrizeGroup;
        },
        //1.当前玩法模板
        getTpl(tpl){
            this.tpl = tpl;
        },
        //3.Title组件回传数据，每次切换玩法获得。获取彩种+玩法模板名称
        getTplTemp(dataWay){
            //console.log(dataWay);
            this.dataWay = dataWay;
            this.way_id = dataWay.wayId;
            this.getPrizeSet();
            let lotteryName = dataWay.Tpl.split("_")[0];
            switch (lotteryName) {
                case 'K3':
                    this.headTempName = "K3head";
                    break;
                case 'PK10':
                    this.headTempName = "PK10head";
                    break;
                default:
                    break;
            }
        },
        /**
         * 交互
         */
        //1.设置奖金组
        setItemgroup(Itemgroup){
            this.Itemgroup = Itemgroup;
        },
        //2..投注数据回传*********************************************************************************************************待完成匹配投注结果
        getBall(balls){
            this.ballData = balls;
            //console.log(position);
        },
        //清空当前投注项方法
        clear(){
            this.$refs.mychild.clear();
        }
        /**
         * 轮播
         * 
         */
    },
    created(){
        this.bgColor("#FFF");
        this.gameType = this.$route.params.gameType;
        this.getGameSeries();
    },
    mounted(){
        
        
    },
}
</script>
