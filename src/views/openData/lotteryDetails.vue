<template>
    <div class="lotteryDetails">
        <component v-bind:is="'titleBar'" title="开奖详情"></component>
        <div class="lotteryDetailsContent">
            <div>
                <ul>
                    <li style="padding:0rem 0.1rem 0rem 0.1rem;background: #f3f3f3;border-bottom: 1px solid #eee;">
                        <Row type="flex" justify="start" align="top">
                            <Col span="5">
                                <div class="lotteryDetailsimg">
                                    <img src="https://m.fyu6.com/upload/default/20181219/6a669641281792dad1292198e557127e.png"/>
                                </div>

                            </Col>
                            <Col span="9" style="padding-top: 0.1rem">
                                <span style="font-size: 16px;text-align: left;white-space:nowrap;color: red;">{{lotterDetailsList.name}}<a style="color: red;margin-left: 0.1rem;font-size: 14px;border: 1px solid #2d8cf0;background: #e6eff8;">官方开奖</a></span>
                                <p style="font-size: 14px;color: #868484;text-align: left">{{lotterDetailsList.currentNumber}}</p>
                            </Col>
                            <Col span="9" class="lotteryDetailsIcon">
                                <p style="text-align:right;padding-top: 0.2rem;font-size: 16px;color: red">即将开奖</p>
                            </Col>
                            <Col span="1">
                            </Col>
                        </Row>
                    </li>
                </ul>
                <ul>
                    <li style="border-bottom: 1px solid #eee;" v-for="(item,index) in data" :key="index">
                        <Row type="flex" justify="start">
                            <Col span="1">
                            </Col>
                            <Col span="11" style="text-align: left">
                                <p style="font-size: 16px;">{{item.issue}}</p>

                            </Col>
                            <Col span="11" class="openDataIcon">
                                <p style="color: #868484">{{item.time}}</p>
                            </Col>
                            <Col span="1">
                            </Col>
                        </Row>
                        <Row type="flex" justify="start">
                            <Col span="1"></Col>
                            <Col span="23">
                                <div>
                                    <ul class="ulLi">
                                        <li v-for="(value,i) in item.number" :key="i"><strong>{{value}}</strong></li>
                                    </ul>

                                </div>
                            </Col>
                        </Row>
                    </li>
                </ul>
                <div class="clear"></div>
            </div>
        </div>
        <bottomNavbar/>
    </div>
</template>
<style lang="less" scoped>
    .lotteryDetails {
        .lotteryDetailsContent {
            ul {
                .clear{
                    clear: both;
                }
                li {
                    background: #fff;
                    padding-top: 0.1rem;
                    padding-bottom: 0.1rem;
                    .lotteryDetailsimg {
                        padding: 0.1rem 0.1rem 0.1rem 0;
                        img {
                            width: 0.5rem;
                        }
                    }
                    .ulLi{
                        li{
                            float: left;
                            display: inline-block;
                            width: 0.3rem;
                            height: 0.3rem;
                            margin-right: 0.02rem;
                            line-height: 0.1rem;
                            background: #d11606;
                            color: #fff;
                            text-align: center;
                            border-radius: 50%;
                        }
                    }
                    .openDataIcon {
                        text-align: right;
                    }
                }
            }
        }
        padding-bottom: 0.5rem;
    }
</style>

<script>
    // @ is an alias to /src
    import minxins from '@/js/minxins.js';
    import {Row, Col, Icon} from "iview"
    import bottomNavbar from '@/components/public/Navbar.vue'

    export default {
        name: 'lotteryDetails',
        mixins: [ minxins ],
        data() {
            return {
                data:[
                ],
                lotterDetailsList: '',
            }
        },
        components: {
            titleBar: () => import("@/components/public/Title-bar.vue"),
            bottomNavbar,
            Row,
            Col,
            Icon
        },
        methods: {
            init() {
                this.getlotterDetailsList();
            },
            async getIssueListForRefresh(val){
                let pream={
                    'page':1,
                    'lottery_id':val,
                };
                let res = await this.$api.getIssueListForRefresh(pream);
                if(res && res.data && res.data.issueHistory && res.data.issueHistory.issues){
                    this.data = res.data.issueHistory.issues;
                    for(let i=0; i<this.data.length;i++){
                        if(this.data[i].wn_number){
                            this.data[i].number = "";
                            this.data[i].time = this.dateFormatter(this.data[i].offical_time);
                            if(val == 1 || val == 13 || val == 15 || val == 17){
                                this.data[i].number =this.data[i].wn_number.split("");
                            }else{
                                this.data[i].number =this.data[i].wn_number.split(" ");
                            }

                        }
                    }
                }

                console.log(this.data)
            },
            getlotterDetailsList(){
                let data = JSON.parse(this.$route.query.res);
                this.lotterDetailsList = Object.assign({}, data);
                this.getIssueListForRefresh(this.lotterDetailsList.id);
            },
        },
        created() {
            this.init()
        },
        mounted() {
            /*this.$store.commit('add');
            console.log(this.$store.getters.inconr);*/
        }
    }
</script>
