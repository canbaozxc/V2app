<template>
    <Scroll :on-reach-bottom="handleReachBottom" :height="wh">
        <div class="afterNoRecord">
            <div class="fixed">
                <titleBar title="追号记录"/>
                <div class="seach-box">
                    <Row type="flex" justify="start" align="middle">
                        <Col span="11">
                            <DatePicker type="date" v-model="seachData.created_at_from" placeholder="起始时间"
                                        style="width:100%;"></DatePicker>
                        </Col>
                        <Col span="1">
                            <span>-</span>
                        </Col>
                        <Col span="11">
                            <DatePicker type="date" v-model="seachData.created_at_to" placeholder="结束时间"
                                        style="width:100%;"></DatePicker>
                        </Col>

                    </Row>
                    <Row type="flex" justify="start" align="middle">
                        <Col span="24">
                            <div @click="iflottery = !iflottery">
                                <Input v-model="iflotteryText" icon="ios-arrow-down" placeholder="全部游戏"
                                       style="width: 100%" readonly/>
                            </div>
                        </Col>

                    </Row>
                    <Row type="flex" justify="start" align="middle">
                        <Col span="24">
                            <Button type="error" long style="border-radius: 0.16rem;" @click="submit">搜索</Button>
                        </Col>
                    </Row>

                </div>
                <Row type="flex" justify="start" align="middle" class="choice " :class="ifNav?'huihfjskhgu':''">
                    <Col span="6">
                        <div class="item" :class="isOn=='0'?'on':''" @click="changeStatus('')">
                            全部
                        </div>
                    </Col>
                    <Col span="6">
                        <div class="item" :class="isOn=='1'?'on':''" @click="changeStatus('3')">
                            已中奖
                        </div>
                    </Col>
                    <Col span="6">
                        <div class="item" :class="isOn=='2'?'on':''" @click="changeStatus('2')">
                            未中奖
                        </div>
                    </Col>
                    <Col span="6">
                        <div class="item" :class="isOn=='3'?'on':''" @click="changeStatus('0')">
                            未开奖
                        </div>
                    </Col>
                </Row>
            </div>
            <div class="swiper-container" id="afterNoRecordSwiper">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="(items,index) in list3" :key="index">
                        <div class="scroll">
                            <div @click="openAfterNoDetails(item.id)" v-for="(item, index) in list" :key="index"
                                 class="cordLi">
                                <Row type="flex" justify="start" align="top">
                                    <Col span="11" class="asd1">
                                        <p>{{item.lottery}}</p>
                                        <p>投注金额：{{item.coefficient}}</p>
                                    </Col>
                                    <Col span="10" class="bsd1" style="">
                                        <p style="color:#999999;">{{item.bet_number}}</p>
                                        <p :class="item.prize.charAt(0)==='-'?'green':'red'">
                                            {{item.prize.charAt(0)==='-'?item.status:"已中"+item.prize+"元"}}</p>
                                    </Col>
                                    <Col span="3" class="csd1">
                                        <Icon type="ios-arrow-forward"/>
                                    </Col>
                                </Row>
                            </div>
                            <div v-if="list.length>=count">没有了...</div>
                        </div>
                    </div>
                </div>
            </div>
            <lotteryClass @lotteryData="getLottData" v-show="iflottery"/>
            <BettingDetails @goBack="closeBettingDetails" v-if="ifBettingDatail" :bettingId="bettingId"/>
            <AfterNoDetails @goBack="getNegation('ifAfterNoDatail')" @openBettingDetails="openBettingDetails"
                            v-if="ifAfterNoDatail" :id="trace_id"/>

            <backTop/>
        </div>
    </Scroll>
</template>
<style lang="less">
    .afterNoRecord {
        .seach-box {
            .ivu-select-single .ivu-select-selection .ivu-select-placeholder, .ivu-select-item {
                text-align: left;
            }
            .ivu-select-visible .ivu-select-selection {
                box-shadow: none;
            }
            .ivu-col-span-11 {
                width: 47.83333333%;
            }
            .ivu-input-with-suffix {
                padding-right: 24px;
            }
            .ivu-input:focus {
                box-shadow: none;

            }

        }
        .scroll {
            .ivu-card-bordered {
                border-top: none;
                border-color: #F2F3F9;
            }
            .cordLi {
                padding: 5px 16px 2px 16px;
                border-bottom: 1px solid #F2F3F9;
            }
        }
    }
</style>

<style lang="less" scoped>
    .afterNoRecord {

        .fixed {
            width: 100%;
            .seach-box {
                font-size: 0.12rem;
                line-height: 0.45rem;
                width: 100%;
                background-color: #FFF;
                padding: 0 0.15rem;
                span {
                    padding: 0 0.05rem;
                }

                .filtrate {
                    width: 0.75rem;
                    height: 0.3rem;
                    border: 1px solid #DCDCDC;
                    border-radius: 15px;
                    line-height: 0.3rem;
                    font-size: 0.12rem;
                }
                .button {
                    width: 0.75rem;
                    height: 0.3rem;
                    border-radius: 15px;
                    line-height: 0.3rem;
                    font-size: 0.12rem;
                    background-color: #F13131;
                    color: #FFF;
                }

            }
            .huihfjskhgu {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                background-color: #FFF;
                z-index: 12;
            }
            .choice {
                font-size: 0.12rem;
                line-height: 0.45rem;
                background-color: #FFF;
                .item {
                    border-bottom: 2px solid #FFF;
                }
                .on {
                    border-bottom: 2px solid #F13131;
                }
            }
            .filtrate-box {
                width: 100%;
                height: 0.6rem;
                position: absolute;
                top: 0.95rem;
                background-color: #FFF;
                border: 1px solid #F2F3F9;
            }

        }
        .scroll {
            margin-top: 0.1rem;
            width: 100%;
            background-color: #FFF;
            z-index: 5;
            .asd1 {
                text-align: left;
                font-size: 0.12rem;
                line-height: 0.30rem;
                .num {
                    span {
                        color: #387AFF;
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
    }
</style>


<script>
    import {Scroll, Card, Row, Col, DatePicker, Icon, Select, Option, Input} from "iview"
    import BettingDetails from '@/components/user/BettingDetails.vue'
    import AfterNoDetails from '@/components/user/AfterNoDetails.vue'
    import titleBar from "@/components/public/Title-bar.vue"
    import lotteryClass from "@/components/public/lotteryClass.vue"
    import backTop from "@/components/public/BackTop.vue"
    import Swiper from 'swiper'
    import 'swiper/dist/css/swiper.css';

    import minxins from '@/js/minxins.js';
    import {setTimeout} from 'timers';

    export default {
        name: "afterNoRecord",
        mixins: [minxins],
        components: {
            Scroll,
            Card,
            titleBar,
            Row,
            Col,
            DatePicker,
            Icon,
            Select,
            Option,
            lotteryClass,
            Input,
            AfterNoDetails,
            backTop,
            BettingDetails
        },
        data() {
            return {
                isOn:0,
                afterNoRecordSwiper: '',//滑动组件
                list3: [0, 1, 2, 3],//定义四个滑动模块
                isFiltrate: false,
                seachData: {//搜索条件
                    created_at_from: '',
                    created_at_to: '',
                    lottery_id: '',
                    status: '',
                    page: "1",
                },
                list: [],
                count: 0,//总条数
                iflottery: false,//是否显示彩种选择
                ifBettingDatail: false,//是否显示投注详情
                ifAfterNoDatail: false,//是否显示追号详情
                iflotteryData: {},//彩种选择数据
                iflotteryText: '',//彩种选择拼接字符
                trace_id: "",//追号详情参数id
                bettingId: '',//投注详情参数id
                ifNav: false,
                wh: localStorage.getItem('widowHeight'),
            }
        },
        methods: {
            //开启投注详情
            openBettingDetails(obj) {
                this.ifBettingDatail = obj.ifBettingDatail;
                this.bettingId = obj.id;
            },
            //关闭投注详情
            closeBettingDetails(data) {
                console.log(data);
                this.ifBettingDatail = false;//关闭投注详情
                //如果data为true就打开”追号详情“
                if (data.ifAfterNoDatail === true) {
                    this.ifAfterNoDatail = true;//开启追号详情
                }

            },
            handleReachBottom() {
                return new Promise(resolve => {
                    setTimeout(() => {
                        this.getList();

                        resolve();
                    }, 2000);
                });
            },
            //无限下拉
            handleReachBottom() {
                return new Promise(resolve => {
                    setTimeout(() => {
                        const last = this.list[this.list.length - 1];
                        for (let i = 1; i < 11; i++) {
                            this.list.push(last + i);
                        }
                        resolve();
                    }, 200);
                });
            },
            submit() {
                //初始化搜索条件
                this.seachData.created_at_from = this.getFormatDate(this.seachData.created_at_from, 'start');
                this.seachData.created_at_to = this.getFormatDate(this.seachData.created_at_to);
                this.seachData.lottery_id = this.iflotteryData.lotteryKey ? this.iflotteryData.lotteryKey : '';
                this.seachData.page = 1;
                this.list = [];//初始化列表
                this.getList();
            },
            //滑动触发方法
            afterSlidingQuery() {
                console.log("activeIndex:" + this.afterNoRecordSwiper.activeIndex);
                if (this.afterNoRecordSwiper.activeIndex === 0) {
                    this.changeStatus('');
                } else if (this.afterNoRecordSwiper.activeIndex === 1) {
                    this.changeStatus(3);
                } else if (this.afterNoRecordSwiper.activeIndex === 2) {
                    this.changeStatus(2);
                } else if (this.afterNoRecordSwiper.activeIndex === 3) {
                    this.changeStatus(0);
                }

            },
            //状态搜索0:
            changeStatus(value) {
                if (value === '') {
                    this.isOn = 0;
                } else if (value == '3') {
                    this.isOn = 1;
                } else if (value == '2') {
                    this.isOn = 2;
                } else if (value == '0') {
                    this.isOn = 3;
                }
                this.seachData.status = value;
                this.submit();
            },
            //1.设定默认时间
            creatTime() {
                let date = new Date();
                this.seachData.created_at_from = this.getFormatDate(date, 'start');
                this.seachData.created_at_to = this.getFormatDate(date);
            },
            async getList() {
                let res = await this.$api.getTraceList(this.seachData);
                if (this.list.length < 1) {
                    this.list = res.data.list;
                } else {
                    this.list = this.list.concat(res.data.list);
                }
                this.count = res.data.count;
                //增加页码
                this.seachData.page++;
            },
            /**
             *  彩种选择方法
             * */
            //拿到彩种数据
            getLottData(data) {
                this.iflottery = false;
                this.iflotteryData = data;
                this.setiflotteryText();
            },
            //彩种分类和彩种字符拼接
            setiflotteryText() {
                let data = this.iflotteryData;
                if (data.className && data.lotteryName) {
                    this.iflotteryText = data.className + '/' + data.lotteryName;
                } else if (data.className) {
                    this.iflotteryText = data.className;
                }
            },
            //开启追号详情
            openAfterNoDetails(id) {
                this.ifAfterNoDatail = true;
                this.trace_id = id;
            },
            //日期转字符串
            getFormatDate(dateTime, type) {
                var date = new Date(dateTime);
                var seperator = "-";
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                var nowDate = date.getDate();
                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                if (nowDate >= 0 && nowDate <= 9) {
                    nowDate = "0" + nowDate;
                }
                var newDate = year + seperator + month + seperator + nowDate;
                if (type === "start") {
                    newDate += " 00:00:00";
                } else {
                    newDate += " 23:59:59";
                }
                return newDate;
            }
        },
        created() {
            //console.log(localStorage.getItem('clientHeight'));
            this.creatTime();
        },
        mounted() {
            let vm = this;
            //滑动组件初始化
            this.afterNoRecordSwiper = new Swiper('#afterNoRecordSwiper', {
                noSwiping: true,
                slidesPerView: 1,
                spaceBetween: 1,
                observer: true, //修改swiper自己或子元素时，自动初始化swiper
                observeParents: true, //修改swiper的父元素时，自动初始化swiper
                on: {
                    //滑动组件左右滑动事件
                    slidePrevTransitionEnd: function () {
                        vm.afterSlidingQuery();
                    },
                    slideNextTransitionEnd: function () {
                        vm.afterSlidingQuery();
                    },
                },
            })
            //let oDiv = document.getElementById("div1");
            this.bgColor("#F2F3F9");
            this.getList();

        }

    }
</script>

