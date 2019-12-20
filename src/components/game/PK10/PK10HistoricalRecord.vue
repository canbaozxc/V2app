<template>
    <div id="PK10BettingRecord">
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
    import PK10DataGameBall from "@/components/game/PK10/PK10.js";
    export default {
        name: "PK10BettingRecord",
        props:{
            dataList:{
                type:Object,
                default:{}
            },
        },
        data () {
            return {
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
                if(PK10DataGameBall[this.gameNuber]){
                    let columns= PK10DataGameBall[this.gameNuber];
                    if(columns.listTable && columns.listTable.title){
                        let columns1=columns.listTable.title;
                        for(let i=0; i<columns1.length; i++){
                            this.columns1.push({'title':columns1[i],'key':i,className:'table-info-column'});
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
                if(e === true){
                    let pream = {
                        "page":vm.page,
                        "lottery_id":vm.dataList.gameId
                    }
                    let res = await this.$api.getIssueListForRefresh(pream);
                    let data = res.data;
                    let wn_number = data.issueHistory.issues;
                    for(let i=0; i<wn_number.length;i++){
                         this.wm_number1 = wn_number[i].wn_number.split(" ");
                        if(this.gameNuber == 175){
                            let wm_number1 = wn_number[i].wn_number.split(' ').join(',').slice(0,5);
                            let numb = wm_number1.split(',');
                            numb = parseInt(numb[0])+parseInt(numb[1]);
                            if(numb<=9){
                                numb = "0"+numb
                            }
                            vm.data1.push({0 : wn_number[i].issue,1 : wm_number1, 2 : numb})
                        }
                        if(this.gameNuber == 177){
                            let wm_number1 = wn_number[i].wn_number.split(" ");
                            let wn_number2 = wn_number[i].issue.substr( wn_number[i].issue.length-4);
                            vm.data1.push({cellClassName:{1:this.getColor(wm_number1[0]),2:this.getColor(wm_number1[1]),3:this.getColor(wm_number1[2]),4:this.getColor(wm_number1[3]),5:this.getColor(wm_number1[4]),6:this.getColor(wm_number1[5]),7:this.getColor(wm_number1[6]),8:this.getColor(wm_number1[7]),9:this.getColor(wm_number1[8]),10:this.getColor(wm_number1[9])},0 :wn_number2 ,1 : wm_number1[0], 2 : wm_number1[1],3 : wm_number1[2],4 : wm_number1[3],5 : wm_number1[4],6 : wm_number1[5],7 : wm_number1[6],8 : wm_number1[7],9 : wm_number1[8],10 : wm_number1[9]})
                        }
                        if(this.gameNuber == 176){
                            let wm_number1 = wn_number[i].wn_number.split(' ').join(',').slice(0,5);
                            let wn_number2 = wn_number[i].issue.substr( wn_number[i].issue.length-4);
                            let numb = wm_number1.split(',');
                            let dx = '';
                            let ds = '';
                            if (numb[0]) {
                                numb = parseInt(numb[0]) + parseInt(numb[1]);
                                numb = Number(numb);
                                if (numb <= 9) {
                                    dx = "小"
                                } else {
                                    dx = "大"
                                }
                                if (numb % 2 == 0) {
                                    ds = '双'
                                } else {
                                    ds = '单'
                                }
                                if (numb <= 9) {
                                    numb = "0" + numb
                                }
                            } else {
                                numb = "";
                            }
                            vm.data1.push({cellClassName:{3:this.getColor(dx),4:this.getColor(ds)},0 : wn_number2,1 : wm_number1, 2 : numb ,3: dx, 4:ds})
                        }
                        if(this.gameNuber == 178){
                            let wm_number1 = wn_number[i].wn_number.split(" ");
                            let wn_number2 = wn_number[i].issue.substr( wn_number[i].issue.length-4);
                            let lhsum1 = '';
                            let lhsum2 = '';
                            let lhsum3 = '';
                            let lhsum4 = '';
                            let lhsum5 = '';
                            if(wm_number1[0]>wm_number1[9]){
                                lhsum1 = '龙';
                            }else{
                                lhsum1 = '虎';
                            }
                            if(wm_number1[1]>wm_number1[8]){
                                lhsum2 = '龙';
                            }else{
                                lhsum2 = '虎';
                            }
                            if(wm_number1[2]>wm_number1[7]){
                                lhsum3 = '龙';
                            }else{
                                lhsum3 = '虎';
                            }
                            if(wm_number1[3]>wm_number1[6]){
                                lhsum4 = '龙';
                            }else{
                                lhsum4 = '虎';
                            }
                            if(wm_number1[4]>wm_number1[5]){
                                lhsum5 = '龙';
                            }else{
                                lhsum5 = '虎';
                            }
                            vm.data1.push({cellClassName:{1:lhsum1=='龙'?'demo-table-info-cell-0':'demo-table-info-cell-01',2:lhsum2=='龙'?'demo-table-info-cell-0':'demo-table-info-cell-01',3:lhsum3=='龙'?'demo-table-info-cell-0':'demo-table-info-cell-01',4:lhsum4=='龙'?'demo-table-info-cell-0':'demo-table-info-cell-01',5:lhsum5=='龙'?'demo-table-info-cell-0':'demo-table-info-cell-01'}, 0 : wn_number2,1 : lhsum1, 2 : lhsum2 ,3: lhsum3, 4:lhsum4, 5:lhsum5})
                        }
                        if(this.gameNuber == 487){
                            let wm_number1 = wn_number[i].wn_number.split(" ");
                            let wn_number2 = wn_number[i].issue.substr( wn_number[i].issue.length-4);
                            vm.data1.push({cellClassName:{1:this.getColor(wm_number1[0]),2:this.getColor(wm_number1[1]),3:this.getColor(wm_number1[2]),4:this.getColor(wm_number1[3]),5:this.getColor(wm_number1[4]),6:this.getColor(wm_number1[5]),7:this.getColor(wm_number1[6]),8:this.getColor(wm_number1[7]),9:this.getColor(wm_number1[8]),10:this.getColor(wm_number1[9])},0 :wn_number2 ,1 : wm_number1[0], 2 : wm_number1[1],3 : wm_number1[2],4 : wm_number1[3],5 : wm_number1[4],6 : wm_number1[5],7 : wm_number1[6],8 : wm_number1[7],9 : wm_number1[8],10 : wm_number1[9]})
                        }
                        if(this.gameNuber == 394){
                            let wm_number1 = wn_number[i].wn_number.split(" ");
                            let wn_number2 = wn_number[i].issue.substr( wn_number[i].issue.length-4);
                            vm.data1.push({cellClassName:{1:this.getColor(wm_number1[0]),2:this.getColor(wm_number1[1]),3:this.getColor(wm_number1[2]),4:this.getColor(wm_number1[3]),5:this.getColor(wm_number1[4]),6:this.getColor(wm_number1[5]),7:this.getColor(wm_number1[6]),8:this.getColor(wm_number1[7]),9:'demo-table-info-cell-red',10:'demo-table-info-cell-red'},0 :wn_number2 ,1 : wm_number1[0], 2 : wm_number1[1],3 : wm_number1[2],4 : wm_number1[3],5 : wm_number1[4],6 : wm_number1[5],7 : wm_number1[6],8 : wm_number1[7],9 : wm_number1[8],10 : wm_number1[9]})
                        }
                        if(this.gameNuber == 395){
                            let wm_number1 = wn_number[i].wn_number.split(" ");
                            let wn_number2 = wn_number[i].issue.substr( wn_number[i].issue.length-4);
                            vm.data1.push({cellClassName:{1:this.getColor(wm_number1[0]),2:this.getColor(wm_number1[1]),3:this.getColor(wm_number1[2]),4:this.getColor(wm_number1[3]),5:this.getColor(wm_number1[4]),6:this.getColor(wm_number1[5]),7:this.getColor(wm_number1[6]),8:'demo-table-info-cell-red',9:'demo-table-info-cell-red',10:'demo-table-info-cell-red'},0 :wn_number2 ,1 : wm_number1[0], 2 : wm_number1[1],3 : wm_number1[2],4 : wm_number1[3],5 : wm_number1[4],6 : wm_number1[5],7 : wm_number1[6],8 : wm_number1[7],9 : wm_number1[8],10 : wm_number1[9]})
                        }
                        if(this.gameNuber == 396){
                            let wm_number1 = wn_number[i].wn_number.split(" ");
                            let wn_number2 = wn_number[i].issue.substr( wn_number[i].issue.length-4);
                            vm.data1.push({cellClassName:{1:'demo-table-info-cell-red',2:'demo-table-info-cell-red',3:this.getColor(wm_number1[2]),4:this.getColor(wm_number1[3]),5:this.getColor(wm_number1[4]),6:this.getColor(wm_number1[5]),7:this.getColor(wm_number1[6]),8:this.getColor(wm_number1[7]),9:this.getColor(wm_number1[8]),10:this.getColor(wm_number1[9])},0 :wn_number2 ,1 : wm_number1[0], 2 : wm_number1[1],3 : wm_number1[2],4 : wm_number1[3],5 : wm_number1[4],6 : wm_number1[5],7 : wm_number1[6],8 : wm_number1[7],9 : wm_number1[8],10 : wm_number1[9]})
                        }
                        if(this.gameNuber == 397){
                            let wm_number1 = wn_number[i].wn_number.split(" ");
                            let wn_number2 = wn_number[i].issue.substr( wn_number[i].issue.length-4);
                            vm.data1.push({cellClassName:{1:'demo-table-info-cell-red',2:'demo-table-info-cell-red',3:'demo-table-info-cell-red',4:this.getColor(wm_number1[3]),5:this.getColor(wm_number1[4]),6:this.getColor(wm_number1[5]),7:this.getColor(wm_number1[6]),8:this.getColor(wm_number1[7]),9:this.getColor(wm_number1[8]),10:this.getColor(wm_number1[9])},0 :wn_number2 ,1 : wm_number1[0], 2 : wm_number1[1],3 : wm_number1[2],4 : wm_number1[3],5 : wm_number1[4],6 : wm_number1[5],7 : wm_number1[6],8 : wm_number1[7],9 : wm_number1[8],10 : wm_number1[9]})
                        }
                        if(this.gameNuber == 398){
                            let wm_number1 = wn_number[i].wn_number.split(" ");
                            let wn_number2 = wn_number[i].issue.substr( wn_number[i].issue.length-4);
                            vm.data1.push({cellClassName:{1:this.getColor(wm_number1[0]),2:this.getColor(wm_number1[1]),3:this.getColor(wm_number1[2]),4:this.getColor(wm_number1[3]),5:this.getColor(wm_number1[4]),6:this.getColor(wm_number1[5]),7:this.getColor(wm_number1[6]),8:this.getColor(wm_number1[7]),9:'demo-table-info-cell-red',10:'demo-table-info-cell-red'},0 :wn_number2 ,1 : wm_number1[0], 2 : wm_number1[1],3 : wm_number1[2],4 : wm_number1[3],5 : wm_number1[4],6 : wm_number1[5],7 : wm_number1[6],8 : wm_number1[7],9 : wm_number1[8],10 : wm_number1[9]})
                        }
                        if(this.gameNuber == 399){
                            let wm_number1 = wn_number[i].wn_number.split(" ");
                            let wn_number2 = wn_number[i].issue.substr( wn_number[i].issue.length-4);
                            vm.data1.push({cellClassName:{1:this.getColor(wm_number1[0]),2:this.getColor(wm_number1[1]),3:this.getColor(wm_number1[2]),4:this.getColor(wm_number1[3]),5:this.getColor(wm_number1[4]),6:this.getColor(wm_number1[5]),7:this.getColor(wm_number1[6]),8:'demo-table-info-cell-red',9:'demo-table-info-cell-red',10:'demo-table-info-cell-red'},0 :wn_number2 ,1 : wm_number1[0], 2 : wm_number1[1],3 : wm_number1[2],4 : wm_number1[3],5 : wm_number1[4],6 : wm_number1[5],7 : wm_number1[6],8 : wm_number1[7],9 : wm_number1[8],10 : wm_number1[9]})
                        }
                        if(this.gameNuber == 172){
                            let wm_number1 = wn_number[i].wn_number.split(" ");
                            let wn_number2 = wn_number[i].issue.substr( wn_number[i].issue.length-4);
                            vm.data1.push({cellClassName:{1:'demo-table-info-cell-red',2:'demo-table-info-cell-red',3:this.getColor(wm_number1[2]),4:this.getColor(wm_number1[3]),5:this.getColor(wm_number1[4]),6:this.getColor(wm_number1[5]),7:this.getColor(wm_number1[6]),8:this.getColor(wm_number1[7]),9:this.getColor(wm_number1[8]),10:this.getColor(wm_number1[9])},0 :wn_number2 ,1 : wm_number1[0], 2 : wm_number1[1],3 : wm_number1[2],4 : wm_number1[3],5 : wm_number1[4],6 : wm_number1[5],7 : wm_number1[6],8 : wm_number1[7],9 : wm_number1[8],10 : wm_number1[9]})
                        }
                        if(this.gameNuber == 173){
                            let wm_number1 = wn_number[i].wn_number.split(" ");
                            let wn_number2 = wn_number[i].issue.substr( wn_number[i].issue.length-4);
                            vm.data1.push({cellClassName:{1:'demo-table-info-cell-red',2:'demo-table-info-cell-red',3:'demo-table-info-cell-red',4:this.getColor(wm_number1[3]),5:this.getColor(wm_number1[4]),6:this.getColor(wm_number1[5]),7:this.getColor(wm_number1[6]),8:this.getColor(wm_number1[7]),9:this.getColor(wm_number1[8]),10:this.getColor(wm_number1[9])},0 :wn_number2 ,1 : wm_number1[0], 2 : wm_number1[1],3 : wm_number1[2],4 : wm_number1[3],5 : wm_number1[4],6 : wm_number1[5],7 : wm_number1[6],8 : wm_number1[7],9 : wm_number1[8],10 : wm_number1[9]})
                        }
                    }
                }
            },
            getColor(value){
                let vm = this;
                let color='';
                if('01' == value){
                    color = "demo-table-info-cell-1";
                }else if('02' == value){
                    color = "demo-table-info-cell-2";
                }else if('03' == value){
                    color = "demo-table-info-cell-3";
                }else if('04' == value){
                    color = "demo-table-info-cell-4";
                }else if('05' == value){
                    color = "demo-table-info-cell-5";
                }else if('06' == value){
                    color = "demo-table-info-cell-6";
                }else if('07' == value){
                    color = "demo-table-info-cell-7";
                }else if('08' == value){
                    color = "demo-table-info-cell-8";
                }else if('09' == value){
                    color = "demo-table-info-cell-9";
                }else if('10' == value){
                    color = "demo-table-info-cell-10";
                }else if('大' == value){
                    color = 'demo-table-info-cell-0';
                }else if('小' == value){
                    color = 'demo-table-info-cell-01';
                }else if('单' == value){
                    color = 'demo-table-info-cell-0'
                }else if('双' == value){
                    color = 'demo-table-info-cell-01'
                }else if('龙' == value){
                    color = 'demo-table-info-cell-0'
                }else if('虎' == value){
                    color = 'demo-table-info-cell-01'
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
    #PK10BettingRecord{
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