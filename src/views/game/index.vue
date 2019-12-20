<!--游戏首页所有游戏的初始页面-->
<template>
    <div id="gameIndex">
        <!--1.加载彩种，玩法信息，确认彩种，玩法-->
        <component v-bind:is="'titleBar'" :gameType="gameType" @depathLottory="getLottoryData"
                   @depathGameData="getGameData" @depathTpl="getTplTemp"></component>
        <!--2.将玩法信息，时间，等传入头部-->
        <component v-bind:is="headTempName" :data="gameData" v-if="gameData!=''" @depathissueData="getissueData"
                   @showProjectList="showProjectList"></component>
        <!--3.查询开奖记录-->
        <component v-bind:is="bettingRecord"  ref="queryProjects" :dataList="gameData" v-show="showBettingRecord" @showClosed="closedBetRecord"></component>
        <!--<component v-bind:is="headTempName" v-show=""></component>-->
        <div v-show="!showBettingRecord">
            <div style="margin-top: 0.05rem">
                <div class="pager">
                    <div class="pagerOne" :class="isOneTwo==='one'?'red':''"></div>
                    <div class="pagerTwo" :class="isOneTwo==='two'?'red':''"></div>
                </div>
                <div class="swiper-container" id="componentSwiper">
                    <div ref="swiper" class="swiper-wrapper">
                        <div class="swiper-slide">
                            <div>
                                <div style="margin-bottom:2rem;">
                                    <component v-bind:is="way_name" ref="mychild" v-model="PrizeData" :dataWay="dataWay"
                                               :Item="Itemgroup" :groupData="groupData" v-if="PrizeData!=''"
                                               @depathBall="getBall" @depathTpl="getTpl"></component>
                                </div>
                            </div>
                        </div>
                        <div class="swiper-slide">
                            <!--投注记录-->
                            <div class="scroll">
                                <div v-for="(item, index) in list" :key="index"
                                     class="cordLi">
                                    <Row type="flex" justify="start" align="top">
                                        <Col span="12" class="asd1">
                                            <p style="font-weight:bold">{{item.issue}}期</p>
                                            <p><strong>{{item.bet_count}}注x{{item.formatted_coefficient}}x{{item.multiple}}倍={{item.amount}}元</strong>
                                            </p>
                                        </Col>
                                        <Col span="12" class="bsd1" style="">
                                            <p v-bind:title="item.bet_number"
                                               style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">
                                                {{item.way}}:{{item.bet_number}}</p>
                                            <p :class="item.prize.charAt(0)==='-'?'green':'red'"
                                               v-if="item.status !='待开奖'">
                                                {{item.prize.charAt(0)==='-'?item.status:"已中"+item.prize+"元"}}</p>
                                            <Button size="small" type="primary" v-else @click="getDropProject(item.id)">
                                                撤单
                                            </Button>
                                        </Col>
                                    </Row>
                                </div>
                                <div v-show="list.length===0">没有了...</div>
                            </div>
                            <!--<component v-bind:is="bettingRecords" :bettingRecordList="bettingRecordList"></component>-->
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                    v-model="modal1"
                    title="撤单确认"
                    @on-ok="ok"
                    @on-cancel="cancel">
                <p>确定要撤销次单?</p>
            </Modal>
            <Betsbar v-show="isOneTwo == 'one'" @clear="clear" @depathItemgroup="setItemgroup" :groupData="groupData"
                     :dataWay="dataWay" :ballData="ballData" :tpl="tpl" :issueData="issueData" :data="gameData"
                     v-if="gameData!=''&&tpl!='' &&ballData!=''&&dataWay!=''&&issueData!=''"></Betsbar>
        </div>
        <div class='maskLayer' v-show="disble">
            <div class="point">
                <div class="pop">
                    <div style="padding: 0.1rem;font-size: 15px">
                        <p>当前正在进入,第</p>
                        <p style="color: red">{{currentNumber}}</p>
                        <p>期,请留意期号变化({{content}})</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="less">
    #gameIndex {
        .swiper-wrapper {
        }
    }
    .mtBttom {
        margin-bottom: 2rem;
    }
</style>


<style lang="less" scoped>

    #gameIndex {
        .maskLayer{
            width: 100%;
            height: 100%;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.3);
            z-index: 9999;
            .point{position:absolute;left:50%; top:50%;}
            .pop{width: 2rem;
                height: 1rem;
                position: absolute;
                left: -1rem;
                top: -1rem;
                background-color: #fff;}
        }
        #componentSwiper {
            .swiper-wrapper {
                min-height: 4.8rem
            }
            /* 随意指定一个height值即可 */
            .swiper-wrapper {
                height: auto
            }
            .swiper-wrapper {
                margin-top: 0.15rem;
            }
        }
        //玩法两面
        .my-bullet-active {
            background: #f13131;
            opacity: 1;
        }
        .scroll {
            .cordLi {
                padding: 5px 16px 2px 16px;
                border-bottom: 1px solid #F2F3F9;
            }
            width: 100%;
            background-color: #FFF;
            z-index: 5;
            .asd1 {
                text-align: left;
                font-size: 0.12rem;
                line-height: 0.30rem;
                p {
                    strong {
                        font-size: 0.12rem;
                        color: #999;
                        font-weight: 500;
                    }
                }
            }
            .bsd1 {
                text-align: right;
                font-size: 0.12rem;
                line-height: 0.30rem;
                overflow: hidden;
                .red {
                    color: #F13131;
                }
                .green {
                    color: #65BE69;
                }
            }
            .csd1 {
                .ivu-icon {
                    position: absolute;
                    top: 0.2rem;
                }
                .select-arrow {
                    position: absolute;
                    right: 8px;
                    line-height: 1;
                    transform: rotate(0deg);
                    font-size: 14px;
                    color: #808695;
                    transition: all .2s ease-in-out;
                }
                .rdeg {
                    transform: rotate(-180deg);
                }
            }
        }
        .pager {
            width: 100%;
            position: absolute;
            text-align: center;
            .pagerOne {
                width: 10px;
                height: 10px;
                display: inline-block;
                border-radius: 100%;
                background: #515a6e;
                opacity: 0.2;
                margin: 0 4px;
            }
            .pagerTwo {
                width: 10px;
                height: 10px;
                display: inline-block;
                border-radius: 100%;
                background: #515a6e;
                opacity: 0.2;
                margin: 0 4px;
            }
            .red {
                background: #f13131;
                opacity: 1;
            }
        }
    }
</style>
<style lang="less">
    #gameIndex {
    }
</style>
<script>
    import Swiper from 'swiper'
    import 'swiper/dist/css/swiper.css';
    import {Button, Row, Col, Icon, ButtonGroup, Badge, Modal} from "iview"
    import minxins from '@/js/minxins.js';
    import {setTimeout, setInterval, clearInterval} from 'timers';
    import {log} from 'util';

    export default {
        name: 'gameIndex',
        components: {
            Badge,
            Button,
            ButtonGroup,
            Modal,
            titleBar: () => import("@/components/game/Title-bar.vue"),
            Row, Col,
            Icon,
            K3head: () => import("@/components/game/K3_head.vue"),
            PK10head: () => import("@/components/game/PK10_head.vue"),
            SSChead: () => import("@/components/game/SSC_head.vue"),
            L1x5head: () => import("@/components/game/L1x5_head.vue"),
            k3way: () => import("@/components/game/K3/K3.vue"),
            PK10way: () => import("@/components/game/PK10/PK10.vue"),
            SSCway:()=> import("@/components/game/SSC/SSC.vue"),
            L1x5way:()=> import("@/components/game/L1x5/L1x5.vue"),
            Betsbar: () => import("@/components/game/Bets_bar.vue"),
            bettingRecords: () => import("@/components/game/bettingRecords.vue"),
            PK10HistoricalRecord: () => import("@/components/game/PK10/PK10HistoricalRecord.vue"),
            K3HistoricalRecord:() => import("@/components/game/K3/K3HistoricalRecord.vue"),
            SSCHistoricalRecord:() => import("@/components/game/SSC/SSCHistoricalRecord.vue"),
            L115HistoricalRecord:() => import("@/components/game/L1x5/L115HistoricalRecord.vue"),
        },
        mixins: [minxins],
        data() {
            return {
                currentNumber:'',//当前奖期
                content:'',
                totalTime:3,
                disble:false,
                dateTime:'',//当前服务器时间
                showBettingRecord: false,
                bettingRecord: '',//投注记录组件
                componentSwiper: '',//滑动组件
                modal1: false,
                dropPid: '',
                seachData: {//搜索条件
                    created_at_from: '',
                    created_at_to: '',
                    lottery_id: '',
                    status: '',
                    page: "1",
                },
                list: [],
                isOneTwo: 'one',
                gameData: '',
                bettingRecordList: [],
                gameType: '',//彩种
                headTempName: "",//调用头部组件名称
                way_id: '',//当前玩法id
                PrizeData: '',//当前玩法数据
                groupData: {//奖金组信息
                    userGroup: this.getUserItem("prize_group"),//用户奖金组
                    maxGroup: '',//系统允许最高奖金组
                },
                Itemgroup: {//当前奖金组以及返点 对象
                    prize_group: '',
                    rate: ''
                },
                ballData: '',//投注内容数据
                ball: '',//当前选号
                tpl: '',//当前
                availableCoefficients: {},//元角分模式
                dataWay: "",//玩法数据
                issueData: {},//期号更新
                way_name: 'k3way',//玩法组件
            }
        },
        methods: {
            countDown () {
                this.currentNumber = this.gameData.currentNumber;
                this.disble = true;
                this.content = this.totalTime + 's'  //这里解决3秒不见了的问题
                let clock = window.setInterval(() => {
                    this.totalTime--
                    this.content = this.totalTime + 's'
                    if (this.totalTime < 0) {         //当倒计时小于0时清除定时器
                        this.disble = false;
                        window.clearInterval(clock)
                        this.content = '';
                        this.totalTime = 3;
                    }
                },1000)
            },
            newProjects(){
                this.$refs.queryProjects.init(this.PrizeData.series_way_id);
                this.$refs.queryProjects.queryBettingRecordList(this.showBettingRecord);
            },
            //关闭开奖记录
            closedBetRecord(e){
                this.showBettingRecord = e;
            },
            //展示字开奖记录
            showProjectList(data) {
                console.log("data"+data)
                this.showBettingRecord = !data;
                console.log("this.showBettingRecord1"+this.showBettingRecord);
                console.log("this.gameData:"+this.gameData)
                this.$refs.queryProjects.init(this.PrizeData.series_way_id);
                this.$refs.queryProjects.queryBettingRecordList(this.showBettingRecord);
                this.$forceUpdate();

            },
            //获取当前时间
            async getDateTime(){
                let res = await this.$api.getCurrentServerTime();
                if (res && res.data) {
                    this.dateTime = res.data.currentServerTime;
                    this.dateTime = Number(this.dateTime * 1000);
                    console.log( this.dateTime)
                    let d = new Date(this.dateTime - 10 * 60 * 60 * 1000);
                    let a = new Date(this.dateTime);
                    let dateend = this.getFormatDate(a);
                    let datetime = this.getFormatDate(d);
                    this.seachData.created_at_from = datetime;
                    this.seachData.created_at_to = dateend;
                    this.seachData.status = '';
                    this.getList();
                }
            },
            //查询第二页的开奖结果
            getTwo() {
                this.getDateTime();
            },
            //日期转字符串
            getFormatDate(dateTime) {
                let seperator = "-";
                let mah = ":"
                let kg = " "
                let year = dateTime.getFullYear();
                let month = dateTime.getMonth() + 1;
                let nowDate = dateTime.getDate();
                let hours = dateTime.getHours();
                let minutes = dateTime.getMinutes();
                console.log("minutes:" + minutes)
                let seconds = dateTime.getSeconds();
                if (minutes >= 0 && minutes <= 9) {
                    minutes = "0" + minutes;
                }
                if (seconds >= 0 && seconds <= 9) {
                    seconds = "0" + seconds;
                }
                if (hours >= 0 && hours <= 9) {
                    hours = "0" + hours;
                }
                if (month >= 0 && month <= 9) {
                    month = "0" + month;
                }
                if (nowDate >= 0 && nowDate <= 9) {
                    nowDate = "0" + nowDate;
                }
                let newDate = year + seperator + month + seperator + nowDate + kg + hours + mah + minutes + mah + seconds;
                return newDate;
            },
            ok() {
                this.getDropProjects();
                this.modal1 = false;
            },
            cancel() {
                this.$Message.info('已取消撤单');
                this.modal1 = false;
            },
            async getDropProjects() {
                let pream = {
                    id: this.dropPid
                }
                let res = await this.$api.dropProject(pream);
                if (res.errno == 0) {
                    this.$Message.info('撤单成功!');
                    this.getList();
                    this.$forceUpdate();
                }
                console.log(res)
            },
            getDropProject(id) {
                console.log(id)
                this.dropPid = id;
                this.modal1 = true;
            },
            //获取投注记录数据
            async getList() {
                let res = await this.$api.getProjectList(this.seachData);
                if (res && res.data && res.data.list) {
                    this.list = res.data.list;
                    //this.componentSwiper.slideTo(1);
                    // this.$refs.swiper.style.height="auto";
                }
                //增加页码
                //this.seachData.page++;
            },
            //开启投注详情
            openBettingDetails(id) {
                console.log("openBettingDetails:" + id);
            },
            //2.获取彩系列表
            async getGameSeries() {
                let res = await this.$api.getGameSeries();
                localStorage.setItem('getGameSeries', JSON.stringify(res.data));
            },
            async getPrizeSet() {
                let pream = {
                    way_id: this.way_id,
                    prize_group: this.getUserItem("prize_group")
                }
                let res = await this.$api.getPrizeSet(pream);
                if (res.errno === 0) {
                    let data = res.data;
                    this.PrizeData = data;
                    this.isOneTwo = 'one';
                    this.componentSwiper.slideTo(0);
                    this.$refs.swiper.style.height = "auto";
                    // this.$refs.queryProjects.init(this.PrizeData.series_way_id);
                    // this.$refs.queryProjects.queryBettingRecordList(this.showBettingRecord);
                } else {
                    this.getPrizeSet();
                }
            },
            /**
             * 初始化
             */
            //更新期号
            getissueData(data) {
                this.issueData = data;
            },
            getLottoryData(data) {
                console.log(data.caixi);
                switch (data.caixi) {
                    case "K3":
                        this.way_name = 'k3way';
                        break;
                    case "PK10":
                        this.way_name = 'PK10way';
                        break;
                    case "SSC":
                        this.way_name = 'SSCway';
                        break;
                    case "L115":
                        this.way_name = 'L1x5way';
                        break;
                    default:
                        break;
                }
            },
            //1.Title组件回传数据，初始化调用数据(注意只允许页面加载运行，不允许在其他函数中调用)
            getGameData(data) {
                //console.log(data);
                //元角分模式
                this.availableCoefficients = data.availableCoefficients;
                this.gameData = data;
                this.groupData.maxGroup = this.gameData.maxPrizeGroup;
            },
            //1.当前玩法模板
            getTpl(tpl) {
                this.tpl = tpl;
            },
            //3.Title组件回传数据，每次切换玩法获得。获取彩种+玩法模板名称
            getTplTemp(dataWay) {
                //console.log(dataWay);
                this.dataWay = dataWay;
                this.way_id = dataWay.wayId;
                this.PrizeData = "";
                this.getPrizeSet();
                let lotteryName = dataWay.Tpl.split("_")[0];

                switch (lotteryName) {
                    case 'K3':
                        this.bettingRecord = "K3HistoricalRecord"
                        this.headTempName = "K3head";
                        break;
                    case 'PK10':
                        this.bettingRecord = "PK10HistoricalRecord"
                        this.headTempName = "PK10head";
                        break;
                    case 'SSC':
                        this.headTempName = "SSChead";
                        this.bettingRecord = "SSCHistoricalRecord"
                        break;
                    case 'L115':
                        this.headTempName = "L1x5head";
                        this.bettingRecord = "L115HistoricalRecord"
                        break;
                    default:
                        break;
                }
            },
            /**
             * 交互
             */
            //1.设置奖金组
            setItemgroup(Itemgroup) {
                this.Itemgroup = Itemgroup;
            },
            //2..投注数据回传*********************************************************************************************************待完成匹配投注结果
            getBall(balls) {
                this.ballData = balls;
                this.newProjects();
                console.log(balls);
            },
            //清空当前投注项方法
            clear() {
                this.$refs.mychild.clear();
            }
        },
        created() {
            this.bgColor("#FFF");
            this.gameType = this.$route.params.gameType;
            this.getGameSeries();
            //this.getList();
        },
        mounted() {
            let vm = this;
            vm.componentSwiper = new Swiper('#componentSwiper', {
                autoHeight: true,
                on: {
                    slidePrevTransitionEnd: function () {
                        if (vm.componentSwiper.activeIndex === 0) {
                            vm.isOneTwo = 'one';
                            vm.getPrizeSet();
                        } else {
                            vm.isOneTwo = 'two';
                            vm.getTwo();
                        }
                        vm.$refs.swiper.style.height = "auto";
                    },
                    slideNextTransitionEnd: function () {
                        if (vm.componentSwiper.activeIndex === 0) {
                            vm.isOneTwo = 'one';
                            vm.getPrizeSet();
                        } else {
                            vm.isOneTwo = 'two';
                            vm.getTwo();
                        }
                        vm.$refs.swiper.style.height = "auto";
                    },
                }
            })
            // let betsbarSwiper = new Swiper('#betsbarSwiper',{
            //     controller: {
            //         control: [componentSwiper,betsbarSwiper],
            //         inverse: true,
            //         by: 'slide',
            //     },
            // })
        },
    }
</script>
