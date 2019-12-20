<template>
    <div id="L115HistoricalRecord">
        <Table class="small-table1" size="small" :columns="columns1" :data="data1">
        </Table>
        <div style="margin-top: 0.1rem">
            <Row justify="start" align="middle">
                <Col span="22"  v-show="data1.length>=12">
                    <p style="float: right" @click="queryBettRecordList">查看更多&gt&gt</p>
                </Col>
            </Row>
            <Row justify="start" align="middle" style="margin-top: 0.1rem">
                <Col span="24" style="text-align: center">
                    <Button shape="circle" style="width: 50%;background-color: #CCCCCC;color: #FFF;" @click="showClosed">关闭</Button>
                </Col>
            </Row>
        </div>
    </div>
</template>

<script>
    import {Table,Row,Col,Button} from "iview";
    import K3DataGameBall from "@/components/game/L1x5/L1x5.js";
    export default {
        name: "L115HistoricalRecord",
        props:{
            dataList:{
                type:Object,
                default:{}
            },
        },
        data () {
            return {
                wn_number:'',
                wm_number1:[],
                page:1,
                columns1: [],
                data1: [],
                gameNuber:'',
            }
        },
        methods:{
            init(gameNuber){
                this.gameNuber = gameNuber;
                this.columns1=[];
                if(K3DataGameBall[this.gameNuber]){
                    let columns= K3DataGameBall[this.gameNuber];
                    console.log("id:"+this.gameNuber)
                    if(columns.listTable && columns.listTable.title){
                        let columns1=columns.listTable.title;
                        for(let i=0; i<columns1.length; i++){
                            this.columns1.push({'title':columns1[i],'key':i,className:'table-info-column'})
                        }
                    }
                }
            },
            queryBettingList(e){
                this.page=1;
                this.queryBettingRecordList(e);

            },
            //查询开奖记录
            async queryBettingRecordList(e){
                let vm = this;
                vm.data1=[];
                if(e === true) {
                    let pream = {
                        "page": vm.page,
                        "lottery_id": vm.dataList.gameId
                    }
                    let res = await this.$api.getIssueListForRefresh(pream);
                    let data = res.data;
                    let wn_number = data.issueHistory.issues;
                    this.wn_number = wn_number;
                    debugger
                    for (let i = 0; i < this.wn_number.length; i++) {
                            let wm_number1 = '';
                            let wn_number2='';
                            if(this.wn_number[i].wn_number){
                                wm_number1 = this.wn_number[i].wn_number.split(" ");
                            }
                            if(this.wn_number[i].issue){
                                wn_number2 = this.wn_number[i].issue.substr(wn_number[i].issue.length - 4);
                            }
                            vm.data1.push({
                                cellClassName: {1:this.getColor('red'),2:this.getColor('red'),3: this.getColor('red'), 4:this.getColor('red'), 5:this.getColor('red')},
                                0: wn_number2,
                                1: wm_number1[0],
                                2: wm_number1[1],
                                3: wm_number1[2],
                                4: wm_number1[3],
                                5: wm_number1[4]
                            })
                    }
                }
            },
            getColor(value){
                let vm = this;
                let color='';
                if('01' == value || '1' == value){
                    color = "demo-table-info-cell-1";
                }else if('02' == value || '2' == value){
                    color = "demo-table-info-cell-2";
                }else if('03' == value || '3' == value){
                    color = "demo-table-info-cell-3";
                }else if('04' == value || '4' == value){
                    color = "demo-table-info-cell-4";
                }else if('05' == value || '5' == value){
                    color = "demo-table-info-cell-5";
                }else if('06' == value || '6' == value){
                    color = "demo-table-info-cell-6";
                }else if('07' == value || '7' == value){
                    color = "demo-table-info-cell-7";
                }else if('08' == value || '8' == value){
                    color = "demo-table-info-cell-8";
                }else if('09' == value || '9' == value){
                    color = "demo-table-info-cell-9";
                }else if('10' == value){
                    color = "demo-table-info-cell-10";
                }else if('大' == value){
                    color = 'demo-table-info-cell-0';
                }else if('小' == value){
                    color = 'demo-table-info-cell-01';
                }else if('单' == value){
                    color = 'demo-table-info-cell-0'
                }
                else if('双' == value){
                    color = 'demo-table-info-cell-01'
                }
                else if('red' == value){
                    color = 'demo-table-info-cell-red'
                }else if('red1' == value){
                    color = 'demo-table-info-cell-red1'
                }else if('龙' == value){
                    color = 'demo-table-info-cell-long'
                }else if('虎' == value){
                    color = 'demo-table-info-cell-hu'
                }else if('和' == value){
                    color = 'demo-table-info-cell-he'
                }
                return color;
            },
            //查看更多
            queryBettRecordList(){
                const msg = this.$Message.loading('正在加载中...', 0);
                setTimeout(msg, 3000);
            },
            //关闭列表
            showClosed(){
                this.page=1;
                this.$emit("showClosed",false);
            }
        },
        components:{
            Table,Row,Col,Button
        },
    }
</script>

<style  lang="less">
    #L115HistoricalRecord{
        .ivu-table .demo-table-info-cell-he{
            color:rgb(210, 42, 42);
        }
        .ivu-table .demo-table-info-cell-long{
            span{
                display: inline-block;
                width: 0.18rem;
                height: 0.18rem;
                border-radius: 50%;
                color: rgb(255, 255, 255);
                background: rgb(14, 202, 37);
                vertical-align: middle;
            }
        }
        .ivu-table .demo-table-info-cell-hu{
            span{
                display: inline-block;
                width: 0.18rem;
                height: 0.18rem;
                border-radius: 50%;
                vertical-align: middle;
                color: rgb(255, 255, 255);
                background: rgb(255, 154, 2)
            }
        }
        .ivu-table .demo-table-info-cell-red{
            span{
                display: inline-block;
                width: 0.18rem;
                height: 0.18rem;
                border-radius: 50%;
                background-color: #f11717;
                color: #FFF;
                vertical-align: middle;
            }
        }
        .ivu-table .demo-table-info-cell-red1{
            span{
                display: inline-block;
                width: 0.3rem;
                height: 0.18rem;
                border-radius: 50%;
                background-color: #f11717;
                color: #FFF;
                vertical-align: middle;
            }
        }
        .ivu-table .demo-table-info-cell-1{
            color: #FFBA00;
        }
        .ivu-table .demo-table-info-cell-2{
            color: #008CFF;
        }
        .ivu-table .demo-table-info-cell-3{
            color: #333333;
        }
        .ivu-table .demo-table-info-cell-4{
            color: #FF7800;
        }
        .ivu-table .demo-table-info-cell-5{
            color: #00CAFD;
        }
        .ivu-table .demo-table-info-cell-6{
            color: #693BFF;
        }
        .ivu-table .demo-table-info-cell-7{
            color: #888888;
        }
        .ivu-table .demo-table-info-cell-8{
            color: #F13131;
        }
        .ivu-table .demo-table-info-cell-9{
            color: #6F521A;
        }
        .ivu-table .demo-table-info-cell-10{
            color: #56BC75;
        }
        .ivu-table .demo-table-info-cell-0{
            color: #7582FF;
        }
        .ivu-table .demo-table-info-cell-01{
            color: #FF8700;
        }
        .table-info-column{
            text-align: center !important;
        }
        .ivu-table .table-info-row{
            text-align: center;
        }
        .ivu-table-cell{
            padding-left: 5px;
            padding-right: 0px;
        }
        .small-table1 {
            position: relative;
            border: 0px solid #dcdee2;
            border-bottom: 0;
            border-right: 0;
            overflow: hidden;
        }
    }
</style>