<template>
    <div id="SSCBettingRecord">
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
    import SSCDataGameBall from "@/components/game/SSC/SSC.js";
    export default {
        name: "SSCBettingRecord",
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
            //初始化方法
            init(gameNuber){
                this.gameNuber = gameNuber;
                this.columns1=[];
                if(SSCDataGameBall[this.gameNuber]){
                    console.log("id:"+this.gameNuber)
                    let columns= SSCDataGameBall[this.gameNuber];
                    console.log(columns);
                    if(columns.listTable && columns.listTable.title){
                        let columns1=columns.listTable.title;
                        for(let i=0; i<columns1.length; i++){
                            this.columns1.push({'title':columns1[i],'key':i,className:'table-info-column'})
                        }
                    }
                }
            },
            //统计一个数组中有多少个重复的数字（reduce）
            getWordCnt(arr){
                let obj={};//创建一个空对象
                for(var i=0;i<arr.length;i++){//遍历字符串
                    if(obj[arr[i]]){//判断该字符在对象中是否存在，若存在未true
                        obj[arr[i]]++;//若存在则+1
                    }else{//若不存在，则添加，并赋值为1
                        obj[arr[i]]=1;
                    }
                }
                return obj;
            },
            //查询frequency次数
            get2Frequency(arr,frequency){
                let num = 0;
                for(let key in arr) //遍历这个对象
                {
                    if(arr[key] === frequency){
                        num++;
                    }
                }
                return num;
            },
            //判断是否有重复
            ischeck(arr){
                let b = arr.join(',');
                for(let i=0; i<arr.length;i++){
                    if(b.replace(arr[i],'').indexOf(arr[i]) > -1){
                        return true
                    }
                }
                return false;
            },
            //判断是不是顺子 是返回true,不是返回false,接受一个字符串的数字
            whetherStraight(val){
                let reg=/^(0(?=1)|1(?=2)|2(?=3)|3(?=4)|4(?=5)|5(?=6)|6(?=7)|7(?=8)|8(?=9)){2}\d$/;
                return reg.test(val);
            },
            //删除数组最后一位并返回新的数组
            deletelast(arr){
                return arr.slice(0,arr.length-1);
            },
            //删除数组最后2位并返回新的数组
            deletelast2(arr){
                return arr.slice(0,arr.length-2);
            },
            //删除数组最后3位并返回新的数组
            deletelast3(arr){
                return arr.slice(0,arr.length-3);
            },
            //删除数组前2位并返回新的数组
            deleteFirst2(arr){
                return arr.slice(2,arr.length);
            },
            //删除数组前3位并返回新的数组
            deleteFirst3(arr){
                return arr.slice(3,arr.length);
            },
            //删除数组第一位并返回新的数组
            deleteFirst(arr){
                return arr.slice(1,arr.length);
            },
            //进来的方法
            queryBettingList(e){
                this.page=1;
                this.queryBettingRecordList(e);

            },
            //求三个数的最大值最小值的跨度
            getMaxMinSpan(x,y,c){
                var max = x > y ? (x > c ? x : c)  : (y > c ? y : c);
                var min = x < y ? (x < c ? x : c)  : (y < c ? y : c);
                return max-min
            },
            //数组求和
            sum(arr) {
                return eval(arr.join("+"));
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
                    let wn_nuber3 = '';
                    //前二
                    if(this.gameNuber === 66 || this.gameNuber === 20 || this.gameNuber === 84 || this.gameNuber === 5 || this.gameNuber === 4){
                        for (let i = 0; i < this.wn_number.length; i++) {
                            let wm_number1 = this.wn_number[i].wn_number.split('');
                            let wn_number2 = this.wn_number[i].issue.substr(this.wn_number[i].issue.length - 4);

                            vm.data1.push({
                                cellClassName: {1:this.getColor('red'),2:this.getColor('red'),3: this.getColor(wm_number1[2]), 4:this.getColor(wm_number1[3]), 5:this.getColor(wm_number1[4])},
                                0: wn_number2,
                                1: wm_number1[0],
                                2: wm_number1[1],
                                3: wm_number1[2],
                                4: wm_number1[3],
                                5: wm_number1[4],
                            })
                        }
                    }
                    //后二
                    if(this.gameNuber === 70 || this.gameNuber === 59 || this.gameNuber === 85 || this.gameNuber === 11 || this.gameNuber === 12){
                        for (let i = 0; i < this.wn_number.length; i++) {
                            let wm_number1 = this.wn_number[i].wn_number.split('');
                            let wn_number2 = this.wn_number[i].issue.substr(this.wn_number[i].issue.length - 4);

                            vm.data1.push({
                                cellClassName: {1:vm.getColor(wm_number1[0]),2:vm.getColor(wm_number1[1]),3: this.getColor(wm_number1[2]), 4: this.getColor('red'), 5: this.getColor('red')},
                                0: wn_number2,
                                1: wm_number1[0],
                                2: wm_number1[1],
                                3: wm_number1[2],
                                4: wm_number1[3],
                                5: wm_number1[4],
                            })
                        }
                    }
                    //后三
                    if(this.gameNuber === 8 || this.gameNuber === 69 || this.gameNuber === 51 || this.gameNuber === 52 || this.gameNuber === 53 || this.gameNuber === 83 || this.gameNuber === 55 || this.gameNuber === 56){
                        for (let i = 0; i < this.wn_number.length; i++) {
                            let wm_number1 =this.wn_number[i].wn_number.split('');
                            let wn_number2 =this.wn_number[i].issue.substr(this.wn_number[i].issue.length - 4);
                            vm.data1.push({
                                cellClassName: {1:vm.getColor(wm_number1[0]),2:vm.getColor(wm_number1[1]),3: this.getColor('red'), 4: this.getColor('red'), 5: this.getColor('red')},
                                0: wn_number2,
                                1: wm_number1[0],
                                2: wm_number1[1],
                                3: wm_number1[2],
                                4: wm_number1[3],
                                5: wm_number1[4],
                            })
                        }
                    }
                    //中三
                    if(this.gameNuber === 150 || this.gameNuber === 142 || this.gameNuber === 153){
                        for (let i = 0; i < this.wn_number.length; i++) {
                            let wm_number1 =this.wn_number[i].wn_number.split('');
                            let wn_number2 =this.wn_number[i].issue.substr(this.wn_number[i].issue.length - 4);
                            vm.data1.push({
                                cellClassName: {
                                    1: vm.getColor(wm_number1[0]),
                                    2: vm.getColor('red'),
                                    3: this.getColor('red'),
                                    4: this.getColor('red'),
                                    5: this.getColor(wm_number1[4])
                                },
                                0: wn_number2,
                                1: wm_number1[0],
                                2: wm_number1[1],
                                3: wm_number1[2],
                                4: wm_number1[3],
                                5: wm_number1[4],
                            })
                        }
                    }
                    //前三
                    if(this.gameNuber === 1 ||this.gameNuber === 65 || this.gameNuber === 64 || this.gameNuber === 18 || this.gameNuber === 21 || this.gameNuber === 22 || this.gameNuber === 40 || this.gameNuber === 43){
                        for (let i = 0; i < this.wn_number.length; i++) {
                            let wm_number1 =this.wn_number[i].wn_number.split('');
                            let wn_number2 =this.wn_number[i].issue.substr(this.wn_number[i].issue.length - 4);

                            vm.data1.push({
                                cellClassName: {1:vm.getColor('red'),2:vm.getColor('red'),3: this.getColor('red'), 4: this.getColor(wm_number1[3]), 5: this.getColor(wm_number1[4])},
                                0: wn_number2,
                                1: wm_number1[0],
                                2: wm_number1[1],
                                3: wm_number1[2],
                                4: wm_number1[3],
                                5: wm_number1[4],
                            })
                        }
                    }
                    //前四
                    if(this.gameNuber === 295){
                        for (let i = 0; i < this.wn_number.length; i++) {
                            let wm_number1 =this.wn_number[i].wn_number.split('');
                            let wn_number2 =this.wn_number[i].issue.substr(this.wn_number[i].issue.length - 4);
                            vm.data1.push({
                                cellClassName: {1:vm.getColor('red'),2:vm.getColor('red'),3: this.getColor('red'), 4: this.getColor('red'), 5: this.getColor(wm_number1[4])},
                                0: wn_number2,
                                1: wm_number1[0],
                                2: wm_number1[1],
                                3: wm_number1[2],
                                4: wm_number1[3],
                                5: wm_number1[4],
                            })
                        }
                    }
                    //后四
                    if(this.gameNuber === 67 || this.gameNuber === 34 || this.gameNuber === 35 || this.gameNuber === 39 || this.gameNuber === 42){
                        for (let i = 0; i < this.wn_number.length; i++) {
                            let wm_number1 =this.wn_number[i].wn_number.split('');
                            let wn_number2 =this.wn_number[i].issue.substr(this.wn_number[i].issue.length - 4);
                            vm.data1.push({
                                cellClassName: {1:vm.getColor(wm_number1[0]),2:vm.getColor('red'),3: this.getColor('red'), 4: this.getColor('red'), 5: this.getColor('red')},
                                0: wn_number2,
                                1: wm_number1[0],
                                2: wm_number1[1],
                                3: wm_number1[2],
                                4: wm_number1[3],
                                5: wm_number1[4],
                            })
                        }
                    }
                    //五星
                    if(this.gameNuber === 41 || this.gameNuber === 38 || this.gameNuber === 68 || this.gameNuber === 37 || this.gameNuber === 36 || this.gameNuber === 362 || this.gameNuber === 363 || this.gameNuber === 364 || this.gameNuber === 365 || this.gameNuber === 366 || this.gameNuber === 44 || this.gameNuber === 45 || this.gameNuber === 46 || this.gameNuber === 47 || this.gameNuber === 78){
                        for (let i = 0; i < this.wn_number.length; i++) {
                            let wm_number1 =this.wn_number[i].wn_number.split('');
                            let wn_number2 =this.wn_number[i].issue.substr(this.wn_number[i].issue.length - 4);

                            vm.data1.push({
                                cellClassName: {1:vm.getColor('red'),2:vm.getColor('red'),3: this.getColor('red'), 4: this.getColor('red'), 5: this.getColor('red')},
                                0: wn_number2,
                                1: wm_number1[0],
                                2: wm_number1[1],
                                3: wm_number1[2],
                                4: wm_number1[3],
                                5: wm_number1[4],
                            })
                        }
                    }
                    //五星 组选120
                    if(this.gameNuber === 32){
                        for (let i = 0; i < this.wn_number.length; i++) {
                            let wm_number1 =this.wn_number[i].wn_number.split('');
                            let wn_number2 =this.wn_number[i].issue.substr(this.wn_number[i].issue.length - 4);
                            let wordCnt = vm.getWordCnt(wm_number1);
                            wn_nuber3 = vm.get2Frequency(wordCnt,2) === 1 ? '-': 120;
                            vm.data1.push({
                                cellClassName: {1:vm.getColor('red'),2:vm.getColor('red'),3: this.getColor('red'), 4: this.getColor('red'), 5: this.getColor('red'),6:wn_nuber3==120?this.getColor('red1'):''},
                                0: wn_number2,
                                1: wm_number1[0],
                                2: wm_number1[1],
                                3: wm_number1[2],
                                4: wm_number1[3],
                                5: wm_number1[4],
                                6:wn_nuber3,
                            })
                        }
                    }
                    //五星 组选60
                    if(this.gameNuber === 31){
                        for (let i = 0; i < this.wn_number.length; i++) {
                            let wm_number1 =this.wn_number[i].wn_number.split('');
                            let wn_number2 =this.wn_number[i].issue.substr(this.wn_number[i].issue.length - 4);
                            let wordCnt = vm.getWordCnt(wm_number1);
                            wn_nuber3 = vm.get2Frequency(wordCnt,2) === 1 ? 60 : '-';
                            vm.data1.push({
                                cellClassName: {1:vm.getColor('red'),2:vm.getColor('red'),3: this.getColor('red'), 4: this.getColor('red'), 5: this.getColor('red'),6:wn_nuber3==60?this.getColor('red1'):''},
                                0: wn_number2,
                                1: wm_number1[0],
                                2: wm_number1[1],
                                3: wm_number1[2],
                                4: wm_number1[3],
                                5: wm_number1[4],
                                6:wn_nuber3,
                            })
                        }
                    }
                    //五星 组选30
                    if(this.gameNuber === 30){
                        for (let i = 0; i < this.wn_number.length; i++) {
                            let wm_number1 =this.wn_number[i].wn_number.split('');
                            let wn_number2 =this.wn_number[i].issue.substr(this.wn_number[i].issue.length - 4);
                            let wordCnt = vm.getWordCnt(wm_number1);
                            wn_nuber3 = vm.get2Frequency(wordCnt,2) === 2 ? 30 : '-';
                            vm.data1.push({
                                cellClassName: {1:vm.getColor('red'),2:vm.getColor('red'),3: this.getColor('red'), 4: this.getColor('red'), 5: this.getColor('red'),6:wn_nuber3==30?this.getColor('red1'):''},
                                0: wn_number2,
                                1: wm_number1[0],
                                2: wm_number1[1],
                                3: wm_number1[2],
                                4: wm_number1[3],
                                5: wm_number1[4],
                                6:wn_nuber3,
                            })
                        }
                    }
                    //五星 组选20
                    if(this.gameNuber === 29){
                        for (let i = 0; i < this.wn_number.length; i++) {
                            let wm_number1 =this.wn_number[i].wn_number.split('');
                            let wn_number2 =this.wn_number[i].issue.substr(this.wn_number[i].issue.length - 4);
                            let wordCnt = vm.getWordCnt(wm_number1);
                            wn_nuber3 = vm.get2Frequency(wordCnt,3) === 1 ? 20 : '-';
                            vm.data1.push({
                                cellClassName: {1:vm.getColor('red'),2:vm.getColor('red'),3: this.getColor('red'), 4: this.getColor('red'), 5: this.getColor('red'),6:wn_nuber3==20?this.getColor('red1'):''},
                                0: wn_number2,
                                1: wm_number1[0],
                                2: wm_number1[1],
                                3: wm_number1[2],
                                4: wm_number1[3],
                                5: wm_number1[4],
                                6:wn_nuber3,
                            })
                        }
                    }
                    //五星 组选10
                    if(this.gameNuber === 28){
                        debugger
                        for (let i = 0; i < this.wn_number.length; i++) {
                            let wm_number1 =this.wn_number[i].wn_number.split('');
                            let wn_number2 =this.wn_number[i].issue.substr(this.wn_number[i].issue.length - 4);
                            let wordCnt = vm.getWordCnt(wm_number1);
                            wn_nuber3 = vm.get2Frequency(wordCnt,3) === 1 && vm.get2Frequency(wordCnt,2) === 1? 10 : '-';
                            vm.data1.push({
                                cellClassName: {1:vm.getColor('red'),2:vm.getColor('red'),3: this.getColor('red'), 4: this.getColor('red'), 5: this.getColor('red'),6:wn_nuber3==10?this.getColor('red1'):''},
                                0: wn_number2,
                                1: wm_number1[0],
                                2: wm_number1[1],
                                3: wm_number1[2],
                                4: wm_number1[3],
                                5: wm_number1[4],
                                6:wn_nuber3,
                            })
                        }
                    }
                    //五星 组选5
                    if(this.gameNuber === 27){
                        for (let i = 0; i < this.wn_number.length; i++) {
                            let wm_number1 =this.wn_number[i].wn_number.split('');
                            let wn_number2 =this.wn_number[i].issue.substr(this.wn_number[i].issue.length - 4);
                            let wordCnt = vm.getWordCnt(wm_number1);
                            wn_nuber3 = vm.get2Frequency(wordCnt,4) === 1? 5 : '-';
                            vm.data1.push({
                                cellClassName: {1:vm.getColor('red'),2:vm.getColor('red'),3: this.getColor('red'), 4: this.getColor('red'), 5: this.getColor('red'),6:wn_nuber3==5?this.getColor('red1'):''},
                                0: wn_number2,
                                1: wm_number1[0],
                                2: wm_number1[1],
                                3: wm_number1[2],
                                4: wm_number1[3],
                                5: wm_number1[4],
                                6:wn_nuber3,
                            })
                        }
                    }
                    //前四 组选24
                    if(this.gameNuber === 242){
                        for (let i = 0; i < this.wn_number.length; i++) {
                            let wm_number1 =this.wn_number[i].wn_number.split('');
                            let wm =vm.deletelast(wm_number1);
                            let wn_number2 =this.wn_number[i].issue.substr(this.wn_number[i].issue.length - 4);
                            wn_nuber3 = vm.ischeck(wm)?'-':24;
                            vm.data1.push({
                                cellClassName: {1:vm.getColor('red'),2:vm.getColor('red'),3: this.getColor('red'), 4: this.getColor('red'),6:wn_nuber3==24?this.getColor('red'):''},
                                0: wn_number2,
                                1: wm_number1[0],
                                2: wm_number1[1],
                                3: wm_number1[2],
                                4: wm_number1[3],
                                5: wm_number1[4],
                                6:wn_nuber3,
                            })
                        }
                    }
                    //前四 组选12
                    if(this.gameNuber === 329){
                        for (let i = 0; i < this.wn_number.length; i++) {
                            let wm_number1 =this.wn_number[i].wn_number.split('');
                            let wm =vm.deletelast(wm_number1);
                            let wn_number2 =this.wn_number[i].issue.substr(this.wn_number[i].issue.length - 4);
                            let wordCnt = vm.getWordCnt(wm);
                            wn_nuber3 = vm.get2Frequency(wordCnt,2) === 1 ? 12 : '-';
                            vm.data1.push({
                                cellClassName: {1:vm.getColor('red'),2:vm.getColor('red'),3: this.getColor('red'), 4: this.getColor('red'),6:wn_nuber3==12?this.getColor('red'):''},
                                0: wn_number2,
                                1: wm_number1[0],
                                2: wm_number1[1],
                                3: wm_number1[2],
                                4: wm_number1[3],
                                5: wm_number1[4],
                                6:wn_nuber3,
                            })
                        }
                    }
                    //前四 组选6
                    if(this.gameNuber === 243){
                        for (let i = 0; i < this.wn_number.length; i++) {
                            let wm_number1 =this.wn_number[i].wn_number.split('');
                            let wm =vm.deletelast(wm_number1);
                            let wn_number2 =this.wn_number[i].issue.substr(this.wn_number[i].issue.length - 4);
                            let wordCnt = vm.getWordCnt(wm);
                            wn_nuber3 = vm.get2Frequency(wordCnt,2) === 2 ? 6 : '-';
                            vm.data1.push({
                                cellClassName: {1:vm.getColor('red'),2:vm.getColor('red'),3: this.getColor('red'), 4: this.getColor('red'),6:wn_nuber3==6?this.getColor('red'):''},
                                0: wn_number2,
                                1: wm_number1[0],
                                2: wm_number1[1],
                                3: wm_number1[2],
                                4: wm_number1[3],
                                5: wm_number1[4],
                                6:wn_nuber3,
                            })
                        }
                    }
                    //前四 组选4
                    if(this.gameNuber === 330){
                        for (let i = 0; i < this.wn_number.length; i++) {
                            let wm_number1 =this.wn_number[i].wn_number.split('');
                            let wm =vm.deletelast(wm_number1);
                            let wn_number2 =this.wn_number[i].issue.substr(this.wn_number[i].issue.length - 4);
                            let wordCnt = vm.getWordCnt(wm);
                            wn_nuber3 = vm.get2Frequency(wordCnt,3) === 1 ? 4 : '-';
                            vm.data1.push({
                                cellClassName: {1:vm.getColor('red'),2:vm.getColor('red'),3: this.getColor('red'), 4: this.getColor('red'),6:wn_nuber3==4?this.getColor('red'):''},
                                0: wn_number2,
                                1: wm_number1[0],
                                2: wm_number1[1],
                                3: wm_number1[2],
                                4: wm_number1[3],
                                5: wm_number1[4],
                                6:wn_nuber3,
                            })
                        }
                    }
                    //二星 后二 组选、直选和值
                    if(this.gameNuber === 74 || this.gameNuber === 77){
                        for (let i = 0; i < this.wn_number.length; i++) {
                            let wm_number1 =this.wn_number[i].wn_number.split('');
                            let wm =vm.deleteFirst3(wm_number1);
                            wn_nuber3 = this.sum(wm);
                            let wn_number2 =this.wn_number[i].issue.substr(this.wn_number[i].issue.length - 4);
                            vm.data1.push({
                                cellClassName: {4: this.getColor('red'),5:vm.getColor('red')},
                                0: wn_number2,
                                1: wm_number1[0],
                                2: wm_number1[1],
                                3: wm_number1[2],
                                4: wm_number1[3],
                                5: wm_number1[4],
                                6:wn_nuber3,
                            })
                        }
                    }
                    //二星 后二 大小单双
                    if(this.gameNuber === 58){
                        for (let i = 0; i < this.wn_number.length; i++) {
                            let wm_number1 =this.wn_number[i].wn_number.split('');
                            let wm =vm.deleteFirst3(wm_number1);
                            let dx1 = '';
                            let dx2 = '';
                            let ds1 = '';
                            let ds2 = '';
                            let wn_nuber4 = '';
                            if(wm_number1[3] >= 5){
                                dx1 = '大'
                            }else{
                                dx1 = '小'
                            }
                            if(wm_number1[4] >= 5){
                                dx2 = '大'
                            }else{
                                dx2 = '小'
                            }
                            wn_nuber3 = dx1+dx2;
                            if(wm_number1[3] % 2 == 0){
                                ds1 = '双'
                            }else{
                                ds1 = '单'
                            }
                            if(wm_number1[4] % 2 == 0){
                                ds2 = '双'
                            }else{
                                ds2 = '单'
                            }
                            wn_nuber4 = ds1+ds2;
                            let wn_number2 =this.wn_number[i].issue.substr(this.wn_number[i].issue.length - 4);
                            vm.data1.push({
                                cellClassName: {4: this.getColor('red'),5:vm.getColor('red')},
                                0: wn_number2,
                                1: wm_number1[0],
                                2: wm_number1[1],
                                3: wm_number1[2],
                                4: wm_number1[3],
                                5: wm_number1[4],
                                6:wn_nuber3,
                                7:wn_nuber4,
                            })
                        }
                    }
                    //二星 前二 大小单双
                    if(this.gameNuber === 19){
                        for (let i = 0; i < this.wn_number.length; i++) {
                            let wm_number1 =this.wn_number[i].wn_number.split('');
                            let wm =vm.deletelast3(wm_number1);
                            let dx1 = '';
                            let dx2 = '';
                            let ds1 = '';
                            let ds2 = '';
                            let wn_nuber4 = '';
                            if(wm_number1[0] >= 5){
                                dx1 = '大'
                            }else{
                                dx1 = '小'
                            }
                            if(wm_number1[1] >= 5){
                                dx2 = '大'
                            }else{
                                dx2 = '小'
                            }
                            wn_nuber3 = dx1+dx2;
                            if(wm_number1[0] % 2 == 0){
                                ds1 = '双'
                            }else{
                                ds1 = '单'
                            }
                            if(wm_number1[1] % 2 == 0){
                                ds2 = '双'
                            }else{
                                ds2 = '单'
                            }
                            wn_nuber4 = ds1+ds2;
                            let wn_number2 =this.wn_number[i].issue.substr(this.wn_number[i].issue.length - 4);
                            vm.data1.push({
                                cellClassName: {1: this.getColor('red'),2:vm.getColor('red')},
                                0: wn_number2,
                                1: wm_number1[0],
                                2: wm_number1[1],
                                3: wm_number1[2],
                                4: wm_number1[3],
                                5: wm_number1[4],
                                6:wn_nuber3,
                                7:wn_nuber4,
                            })
                        }
                    }
                    //二星 前二 组选、直选和值
                    if(this.gameNuber === 72 || this.gameNuber === 76){
                        for (let i = 0; i < this.wn_number.length; i++) {
                            let wm_number1 =this.wn_number[i].wn_number.split('');
                            let wm =vm.deletelast3(wm_number1);
                            wn_nuber3 = this.sum(wm);
                            let wn_number2 =this.wn_number[i].issue.substr(this.wn_number[i].issue.length - 4);
                            vm.data1.push({
                                cellClassName: {1: this.getColor('red'),2:vm.getColor('red')},
                                0: wn_number2,
                                1: wm_number1[0],
                                2: wm_number1[1],
                                3: wm_number1[2],
                                4: wm_number1[3],
                                5: wm_number1[4],
                                6:wn_nuber3,
                            })
                        }
                    }
                    //二星 前二 跨度
                    if(this.gameNuber === 61){
                        for (let i = 0; i < this.wn_number.length; i++) {
                            let wm_number1 =this.wn_number[i].wn_number.split('');
                            if(wm_number1[0] > wm_number1[1]){
                                wn_nuber3 = wm_number1[0] - wm_number1[1];
                            }else{
                                wn_nuber3 = wm_number1[1] - wm_number1[0];
                            }
                            let wn_number2 =this.wn_number[i].issue.substr(this.wn_number[i].issue.length - 4);
                            vm.data1.push({
                                cellClassName: {1: this.getColor('red'),2:vm.getColor('red'),6:vm.getColor('和')},
                                0: wn_number2,
                                1: wm_number1[0],
                                2: wm_number1[1],
                                3: wm_number1[2],
                                4: wm_number1[3],
                                5: wm_number1[4],
                                6:wn_nuber3,
                            })
                        }
                    }
                    //二星 后二 跨度
                    if(this.gameNuber === 63){
                        for (let i = 0; i < this.wn_number.length; i++) {
                            let wm_number1 =this.wn_number[i].wn_number.split('');
                            if(wm_number1[3] > wm_number1[4]){
                                wn_nuber3 = wm_number1[3] - wm_number1[4];
                            }else{
                                wn_nuber3 = wm_number1[4] - wm_number1[3];
                            }
                            let wn_number2 =this.wn_number[i].issue.substr(this.wn_number[i].issue.length - 4);
                            vm.data1.push({
                                cellClassName: {4: this.getColor('red'),5:vm.getColor('red'),6:vm.getColor('和')},
                                0: wn_number2,
                                1: wm_number1[0],
                                2: wm_number1[1],
                                3: wm_number1[2],
                                4: wm_number1[3],
                                5: wm_number1[4],
                                6:wn_nuber3,
                            })
                        }
                    }
                    //前三 组选和值
                    if(this.gameNuber === 75 || this.gameNuber === 71){
                        for (let i = 0; i < this.wn_number.length; i++) {
                            let wm_number1 =this.wn_number[i].wn_number.split('');
                            let wm =vm.deletelast2(wm_number1);
                            wn_nuber3 = this.sum(wm);
                            let wn_number2 =this.wn_number[i].issue.substr(this.wn_number[i].issue.length - 4);
                            vm.data1.push({
                                cellClassName: {1:vm.getColor('red'),2:vm.getColor('red'),3: this.getColor('red')},
                                0: wn_number2,
                                1: wm_number1[0],
                                2: wm_number1[1],
                                3: wm_number1[2],
                                4: wm_number1[3],
                                5: wm_number1[4],
                                6:wn_nuber3,
                            })
                        }
                    }
                    //前三 直选跨度
                    if(this.gameNuber === 60){
                        for (let i = 0; i < this.wn_number.length; i++) {
                            let wm_number1 =this.wn_number[i].wn_number.split('');
                            let wm =vm.deletelast2(wm_number1);
                            wn_nuber3 = this.getMaxMinSpan(wm_number1[0],wm_number1[1],wm_number1[2]);
                            let wn_number2 =this.wn_number[i].issue.substr(this.wn_number[i].issue.length - 4);
                            vm.data1.push({
                                cellClassName: {1:vm.getColor('red'),2:vm.getColor('red'),3: this.getColor('red'),6:this.getColor(wn_nuber3)},
                                0: wn_number2,
                                1: wm_number1[0],
                                2: wm_number1[1],
                                3: wm_number1[2],
                                4: wm_number1[3],
                                5: wm_number1[4],
                                6:wn_nuber3,
                            })
                        }
                    }
                    //前三 特殊号码 对子 顺子 豹子
                    if(this.gameNuber === 48 || this.gameNuber === 385 || this.gameNuber === 387 || this.gameNuber === 388){
                        for (let i = 0; i < this.wn_number.length; i++) {
                            let wm_number1 =this.wn_number[i].wn_number.split('');
                            let dz =0;
                            let wm = String(wm_number1[0])+String(wm_number1[1])+String(wm_number1[2]);
                            let ws = this.whetherStraight(wm);
                            if(wm_number1[0] == wm_number1[1]){
                                dz++;
                            }
                            if(wm_number1[0]== wm_number1[2]){
                                dz++;
                            }
                            if(wm_number1[1] == wm_number1[2]){
                                dz++;
                            }
                            if(ws){
                                wn_nuber3 = '顺子'
                            }else if(wm_number1[0] ==wm_number1[1] &&wm_number1[0] ==wm_number1[2]&& wm_number1[1] ==wm_number1[2]){
                                wn_nuber3 = '豹子'
                            }else if(dz == 1){
                                wn_nuber3 = '对子'
                            }else{
                                wn_nuber3 = '-'
                            }
                            let wn_number2 =this.wn_number[i].issue.substr(this.wn_number[i].issue.length - 4);
                            vm.data1.push({
                                cellClassName: {1:vm.getColor('red'),2:vm.getColor('red'),3: this.getColor('red')},
                                0: wn_number2,
                                1: wm_number1[0],
                                2: wm_number1[1],
                                3: wm_number1[2],
                                4: wm_number1[3],
                                5: wm_number1[4],
                                6:wn_nuber3,
                            })
                        }
                    }
                    //中三 特殊号码 对子 顺子 豹子
                    if(this.gameNuber === 155 || this.gameNuber === 391 || this.gameNuber === 392 || this.gameNuber === 393){
                        for (let i = 0; i < this.wn_number.length; i++) {
                            let wm_number1 =this.wn_number[i].wn_number.split('');
                            let dz =0;
                            let wm = String(wm_number1[2])+String(wm_number1[3])+String(wm_number1[4]);
                            let ws = this.whetherStraight(wm);
                            if(wm_number1[1] == wm_number1[2]){
                                dz++;
                            }
                            if(wm_number1[1]== wm_number1[3]){
                                dz++;
                            }
                            if(wm_number1[2] == wm_number1[3]){
                                dz++;
                            }
                            if(ws){
                                wn_nuber3 = '顺子'
                            }else if(wm_number1[1] ==wm_number1[2] &&wm_number1[1] ==wm_number1[3]&& wm_number1[2] ==wm_number1[3]){
                                wn_nuber3 = '豹子'
                            }else if(dz == 1){
                                wn_nuber3 = '对子'
                            }else{
                                wn_nuber3 = '-'
                            }
                            let wn_number2 =this.wn_number[i].issue.substr(this.wn_number[i].issue.length - 4);
                            vm.data1.push({
                                cellClassName: {2:vm.getColor('red'),3: this.getColor('red'),4:vm.getColor('red')},
                                0: wn_number2,
                                1: wm_number1[0],
                                2: wm_number1[1],
                                3: wm_number1[2],
                                4: wm_number1[3],
                                5: wm_number1[4],
                                6:wn_nuber3,
                            })
                        }
                    }
                    //后三 特殊号码 对子 顺子 豹子
                    if(this.gameNuber === 57 || this.gameNuber === 390 || this.gameNuber === 389 || this.gameNuber === 386){
                        for (let i = 0; i < this.wn_number.length; i++) {
                            let wm_number1 =this.wn_number[i].wn_number.split('');
                            let dz =0;
                            let wm = String(wm_number1[2])+String(wm_number1[3])+String(wm_number1[4]);
                            let ws = this.whetherStraight(wm);
                            if(wm_number1[2] == wm_number1[3]){
                                dz++;
                            }
                            if(wm_number1[2]== wm_number1[4]){
                                dz++;
                            }
                            if(wm_number1[3] == wm_number1[4]){
                                dz++;
                            }
                            if(ws){
                                wn_nuber3 = '顺子'
                            }else if(wm_number1[2] ==wm_number1[3] &&wm_number1[2] ==wm_number1[4]&& wm_number1[3] ==wm_number1[4]){
                                wn_nuber3 = '豹子'
                            }else if(dz == 1){
                                wn_nuber3 = '对子'
                            }else{
                                wn_nuber3 = '-'
                            }
                            let wn_number2 =this.wn_number[i].issue.substr(this.wn_number[i].issue.length - 4);
                            vm.data1.push({
                                cellClassName: {3:vm.getColor('red'),4: this.getColor('red'),5:vm.getColor('red')},
                                0: wn_number2,
                                1: wm_number1[0],
                                2: wm_number1[1],
                                3: wm_number1[2],
                                4: wm_number1[3],
                                5: wm_number1[4],
                                6:wn_nuber3,
                            })
                        }
                    }
                    //中三 组选和值
                    if(this.gameNuber === 154 || this.gameNuber === 151){
                        for (let i = 0; i < this.wn_number.length; i++) {
                            let wm_number1 =this.wn_number[i].wn_number.split('');
                            let wm =vm.deletelast(wm_number1);
                            wm =vm.deleteFirst(wm);
                            wn_nuber3 = this.sum(wm);
                            let wn_number2 =this.wn_number[i].issue.substr(this.wn_number[i].issue.length - 4);
                            vm.data1.push({
                                cellClassName: {2:vm.getColor('red'),3: this.getColor('red'),4:vm.getColor('red')},
                                0: wn_number2,
                                1: wm_number1[0],
                                2: wm_number1[1],
                                3: wm_number1[2],
                                4: wm_number1[3],
                                5: wm_number1[4],
                                6:wn_nuber3,
                            })
                        }
                    }
                    //中三 直选跨度
                    if(this.gameNuber === 149){
                        for (let i = 0; i < this.wn_number.length; i++) {
                            let wm_number1 =this.wn_number[i].wn_number.split('');
                            let wm =vm.deletelast(wm_number1);
                            wm =vm.deleteFirst(wm);
                            wn_nuber3 = this.getMaxMinSpan(wm_number1[1],wm_number1[2],wm_number1[3]);
                            let wn_number2 =this.wn_number[i].issue.substr(this.wn_number[i].issue.length - 4);
                            vm.data1.push({
                                cellClassName: {2:vm.getColor('red'),3: this.getColor('red'),4:vm.getColor('red'),6:vm.getColor(wn_nuber3)},
                                0: wn_number2,
                                1: wm_number1[0],
                                2: wm_number1[1],
                                3: wm_number1[2],
                                4: wm_number1[3],
                                5: wm_number1[4],
                                6:wn_nuber3,
                            })
                        }
                    }
                    //中三 和值尾数
                    if(this.gameNuber === 156){
                        for (let i = 0; i < this.wn_number.length; i++) {
                            let wm_number1 =this.wn_number[i].wn_number.split('');
                            let wm =vm.deletelast(wm_number1);
                            wm =vm.deleteFirst(wm);
                            wn_nuber3 = String(this.sum(wm));//求和
                            wn_nuber3 = wn_nuber3.substr(wn_nuber3.length-1,1);//返回最后一个字符
                            let wn_number2 =this.wn_number[i].issue.substr(this.wn_number[i].issue.length - 4);
                            vm.data1.push({
                                cellClassName: {2:vm.getColor('red'),3: this.getColor('red'),4:vm.getColor('red'),6:vm.getColor(wn_nuber3)},
                                0: wn_number2,
                                1: wm_number1[0],
                                2: wm_number1[1],
                                3: wm_number1[2],
                                4: wm_number1[3],
                                5: wm_number1[4],
                                6:wn_nuber3,
                            })
                        }
                    }
                    //前三 和值尾数
                    if(this.gameNuber === 33){
                        for (let i = 0; i < this.wn_number.length; i++) {
                            let wm_number1 =this.wn_number[i].wn_number.split('');
                            let wm =vm.deletelast2(wm_number1);
                            wn_nuber3 = String(this.sum(wm));//求和
                            wn_nuber3 = wn_nuber3.substr(wn_nuber3.length-1,1);//返回最后一个字符
                            let wn_number2 =this.wn_number[i].issue.substr(this.wn_number[i].issue.length - 4);
                            vm.data1.push({
                                cellClassName: {1:vm.getColor('red'),2:vm.getColor('red'),3: this.getColor('red')},
                                0: wn_number2,
                                1: wm_number1[0],
                                2: wm_number1[1],
                                3: wm_number1[2],
                                4: wm_number1[3],
                                5: wm_number1[4],
                                6:wn_nuber3,
                            })
                        }
                    }
                    //后三 组选和值
                    if(this.gameNuber === 80 || this.gameNuber === 73){
                        for (let i = 0; i < this.wn_number.length; i++) {
                            let wm_number1 =this.wn_number[i].wn_number.split('');
                            let wm =vm.deleteFirst2(wm_number1);
                            wn_nuber3 = this.sum(wm);
                            let wn_number2 =this.wn_number[i].issue.substr(this.wn_number[i].issue.length - 4);
                            vm.data1.push({
                                cellClassName: {3: this.getColor('red'),4:vm.getColor('red'),5:vm.getColor('red')},
                                0: wn_number2,
                                1: wm_number1[0],
                                2: wm_number1[1],
                                3: wm_number1[2],
                                4: wm_number1[3],
                                5: wm_number1[4],
                                6:wn_nuber3,
                            })
                        }
                    }
                    //后三 直选跨度
                    if(this.gameNuber === 62){
                        for (let i = 0; i < this.wn_number.length; i++) {

                            let wm_number1 =this.wn_number[i].wn_number.split('');
                            let wm =vm.deleteFirst2(wm_number1);
                            wn_nuber3 = this.getMaxMinSpan(wm_number1[2],wm_number1[3],wm_number1[4]);
                            let wn_number2 =this.wn_number[i].issue.substr(this.wn_number[i].issue.length - 4);
                            vm.data1.push({
                                cellClassName: {3: this.getColor('red'),4:vm.getColor('red'),5:vm.getColor('red'),6:vm.getColor(wn_nuber3)},
                                0: wn_number2,
                                1: wm_number1[0],
                                2: wm_number1[1],
                                3: wm_number1[2],
                                4: wm_number1[3],
                                5: wm_number1[4],
                                6:wn_nuber3,
                            })
                        }
                    }
                    //后三 和值尾数
                    if(this.gameNuber === 54){
                        for (let i = 0; i < this.wn_number.length; i++) {
                            let wm_number1 =this.wn_number[i].wn_number.split('');
                            let wm =vm.deleteFirst2(wm_number1);
                            wn_nuber3 = String(this.sum(wm));//求和
                            wn_nuber3 = wn_nuber3.substr(wn_nuber3.length-1,1);//返回最后一个字符
                            let wn_number2 =this.wn_number[i].issue.substr(this.wn_number[i].issue.length - 4);
                            vm.data1.push({
                                cellClassName: {3: this.getColor('red'),4:vm.getColor('red'),5:vm.getColor('red')},
                                0: wn_number2,
                                1: wm_number1[0],
                                2: wm_number1[1],
                                3: wm_number1[2],
                                4: wm_number1[3],
                                5: wm_number1[4],
                                6:wn_nuber3,
                            })
                        }
                    }
                    //前三 组三
                    if(this.gameNuber === 16 || this.gameNuber === 2){
                        for (let i = 0; i < this.wn_number.length; i++) {
                            let wm_number1 =this.wn_number[i].wn_number.split('');
                            let wm =vm.deletelast2(wm_number1);
                            let wn_number2 =this.wn_number[i].issue.substr(this.wn_number[i].issue.length - 4);
                            wn_nuber3 = vm.ischeck(wm)?'组六':'组三';
                            vm.data1.push({
                                cellClassName: {1:vm.getColor('red'),2:vm.getColor('red'),3: this.getColor('red'),6:wn_nuber3=='组三'?this.getColor('red1'):''},
                                0: wn_number2,
                                1: wm_number1[0],
                                2: wm_number1[1],
                                3: wm_number1[2],
                                4: wm_number1[3],
                                5: wm_number1[4],
                                6:wn_nuber3,
                            })
                        }
                    }
                    //前三 组六
                    if(this.gameNuber === 17 || this.gameNuber === 3){
                        for (let i = 0; i < this.wn_number.length; i++) {
                            let wm_number1 =this.wn_number[i].wn_number.split('');
                            let wm =vm.deletelast2(wm_number1);
                            let wn_number2 =this.wn_number[i].issue.substr(this.wn_number[i].issue.length - 4);
                            wn_nuber3 = vm.ischeck(wm)?'组六':'组三';
                            vm.data1.push({
                                cellClassName: {1:vm.getColor('red'),2:vm.getColor('red'),3: this.getColor('red'),6:wn_nuber3=='组六'?this.getColor('red1'):''},
                                0: wn_number2,
                                1: wm_number1[0],
                                2: wm_number1[1],
                                3: wm_number1[2],
                                4: wm_number1[3],
                                5: wm_number1[4],
                                6:wn_nuber3,
                            })
                        }
                    }
                    //前三 混合
                    if(this.gameNuber === 13){
                        for (let i = 0; i < this.wn_number.length; i++) {
                            let wm_number1 =this.wn_number[i].wn_number.split('');
                            let wm =vm.deletelast2(wm_number1);
                            let wn_number2 =this.wn_number[i].issue.substr(this.wn_number[i].issue.length - 4);
                            wn_nuber3 = vm.ischeck(wm)?'组六':'组三';
                            vm.data1.push({
                                cellClassName: {1:vm.getColor('red'),2:vm.getColor('red'),3: this.getColor('red')},
                                0: wn_number2,
                                1: wm_number1[0],
                                2: wm_number1[1],
                                3: wm_number1[2],
                                4: wm_number1[3],
                                5: wm_number1[4],
                                6:wn_nuber3,
                            })
                        }
                    }
                    //中三 组三
                    if(this.gameNuber === 145 || this.gameNuber === 143){
                        for (let i = 0; i < this.wn_number.length; i++) {
                            let wm_number1 =this.wn_number[i].wn_number.split('');
                            let wm =vm.deletelast(wm_number1);
                             wm =vm.deleteFirst(wm);
                            let wn_number2 =this.wn_number[i].issue.substr(this.wn_number[i].issue.length - 4);
                            wn_nuber3 = vm.ischeck(wm)?'组三':'组六';
                            vm.data1.push({
                                cellClassName: {2:vm.getColor('red'),3: this.getColor('red'),4:vm.getColor('red'),6:wn_nuber3=='组三'?this.getColor('red1'):''},
                                0: wn_number2,
                                1: wm_number1[0],
                                2: wm_number1[1],
                                3: wm_number1[2],
                                4: wm_number1[3],
                                5: wm_number1[4],
                                6:wn_nuber3,
                            })
                        }
                    }
                    //中三 组六
                    if(this.gameNuber === 146 || this.gameNuber === 144){
                        for (let i = 0; i < this.wn_number.length; i++) {
                            let wm_number1 =this.wn_number[i].wn_number.split('');
                            let wm =vm.deletelast(wm_number1);
                            wm =vm.deleteFirst(wm);
                            let wn_number2 =this.wn_number[i].issue.substr(this.wn_number[i].issue.length - 4);
                            wn_nuber3 = vm.ischeck(wm)?'组三':'组六';
                            vm.data1.push({
                                cellClassName: {2:vm.getColor('red'),3: this.getColor('red'),4:vm.getColor('red'),6:wn_nuber3=='组六'?this.getColor('red1'):''},
                                0: wn_number2,
                                1: wm_number1[0],
                                2: wm_number1[1],
                                3: wm_number1[2],
                                4: wm_number1[3],
                                5: wm_number1[4],
                                6:wn_nuber3,
                            })
                        }
                    }
                    //中三 混合
                    if(this.gameNuber === 152){
                        for (let i = 0; i < this.wn_number.length; i++) {
                            let wm_number1 =this.wn_number[i].wn_number.split('');
                            let wm =vm.deletelast(wm_number1);
                            wm =vm.deleteFirst(wm);
                            let wn_number2 =this.wn_number[i].issue.substr(this.wn_number[i].issue.length - 4);
                            wn_nuber3 = vm.ischeck(wm)?'组三':'组六';
                            vm.data1.push({
                                cellClassName: {2:vm.getColor('red'),3: this.getColor('red'),4:vm.getColor('red')},
                                0: wn_number2,
                                1: wm_number1[0],
                                2: wm_number1[1],
                                3: wm_number1[2],
                                4: wm_number1[3],
                                5: wm_number1[4],
                                6:wn_nuber3,
                            })
                        }
                    }
                    //后三 组三
                    if(this.gameNuber === 49 || this.gameNuber === 9){
                        for (let i = 0; i < this.wn_number.length; i++) {
                            let wm_number1 =this.wn_number[i].wn_number.split('');
                            let wm =vm.deleteFirst2(wm_number1);
                            let wn_number2 =this.wn_number[i].issue.substr(this.wn_number[i].issue.length - 4);
                            wn_nuber3 = vm.ischeck(wm)?'组三':'组六';
                            vm.data1.push({
                                cellClassName: {3: this.getColor('red'),4:vm.getColor('red'),5:vm.getColor('red'),6:wn_nuber3=='组三'?this.getColor('red1'):''},
                                0: wn_number2,
                                1: wm_number1[0],
                                2: wm_number1[1],
                                3: wm_number1[2],
                                4: wm_number1[3],
                                5: wm_number1[4],
                                6:wn_nuber3,
                            })
                        }
                    }
                    //后三 组六
                    if(this.gameNuber === 50 || this.gameNuber === 10){
                        for (let i = 0; i < this.wn_number.length; i++) {
                            let wm_number1 = this.wn_number[i].wn_number.split('');
                            let wm =vm.deleteFirst2(wm_number1);
                            let wn_number2 = this.wn_number[i].issue.substr(this.wn_number[i].issue.length - 4);
                            wn_nuber3 = vm.ischeck(wm)?'组三':'组六';
                            vm.data1.push({
                                cellClassName: {3: this.getColor('red'),4:vm.getColor('red'),5:vm.getColor('red'),6:wn_nuber3=='组六'?this.getColor('red1'):''},
                                0: wn_number2,
                                1: wm_number1[0],
                                2: wm_number1[1],
                                3: wm_number1[2],
                                4: wm_number1[3],
                                5: wm_number1[4],
                                6:wn_nuber3,
                            })
                        }
                    }
                    //后三 混合
                    if(this.gameNuber === 81){
                        for (let i = 0; i < this.wn_number.length; i++) {
                            let wm_number1 = this.wn_number[i].wn_number.split('');
                            let wm =vm.deleteFirst2(wm_number1);
                            let wn_number2 = this.wn_number[i].issue.substr(this.wn_number[i].issue.length - 4);
                            wn_nuber3 = vm.ischeck(wm)?'组三':'组六';
                            vm.data1.push({
                                cellClassName: {3: this.getColor('red'),4:vm.getColor('red'),5:vm.getColor('red')},
                                0: wn_number2,
                                1: wm_number1[0],
                                2: wm_number1[1],
                                3: wm_number1[2],
                                4: wm_number1[3],
                                5: wm_number1[4],
                                6:wn_nuber3,
                            })
                        }
                    }
                    //后四 组选24
                    if(this.gameNuber === 26){
                        for (let i = 0; i < this.wn_number.length; i++) {
                            let wm_number1 = this.wn_number[i].wn_number.split('');
                            let wm =vm.deleteFirst(wm_number1);
                            let wn_number2 = this.wn_number[i].issue.substr(this.wn_number[i].issue.length - 4);
                            let wordCnt = vm.getWordCnt(wm);
                            wn_nuber3 = vm.get2Frequency(wordCnt,2) === 1 ? '-' : 24;
                            vm.data1.push({
                                cellClassName: {2:vm.getColor('red'),3: this.getColor('red'), 4: this.getColor('red'),5: this.getColor('red'),6:wn_nuber3==24?this.getColor('red'):''},
                                0: wn_number2,
                                1: wm_number1[0],
                                2: wm_number1[1],
                                3: wm_number1[2],
                                4: wm_number1[3],
                                5: wm_number1[4],
                                6:wn_nuber3,
                            })
                        }
                    }
                    //后四 组选12
                    if(this.gameNuber === 25){
                        for (let i = 0; i < this.wn_number.length; i++) {
                            let wm_number1 = this.wn_number[i].wn_number.split('');
                            let wm =vm.deleteFirst(wm_number1);
                            let wn_number2 = this.wn_number[i].issue.substr(this.wn_number[i].issue.length - 4);
                            let wordCnt = vm.getWordCnt(wm);
                            wn_nuber3 = vm.get2Frequency(wordCnt,2) === 1 ? 12 : '-';
                            vm.data1.push({
                                cellClassName: {2:vm.getColor('red'),3: this.getColor('red'), 4: this.getColor('red'),5: this.getColor('red'),6:wn_nuber3==12?this.getColor('red'):''},
                                0: wn_number2,
                                1: wm_number1[0],
                                2: wm_number1[1],
                                3: wm_number1[2],
                                4: wm_number1[3],
                                5: wm_number1[4],
                                6:wn_nuber3,
                            })
                        }
                    }
                    //后四 组选6
                    if(this.gameNuber === 24){
                        for (let i = 0; i < this.wn_number.length; i++) {
                            let wm_number1 = this.wn_number[i].wn_number.split('');
                            let wm =vm.deleteFirst(wm_number1);
                            let wn_number2 = this.wn_number[i].issue.substr(this.wn_number[i].issue.length - 4);
                            let wordCnt = vm.getWordCnt(wm);
                            wn_nuber3 = vm.get2Frequency(wordCnt,2) === 2 ? 6 : '-';
                            vm.data1.push({
                                cellClassName: {2:vm.getColor('red'),3: this.getColor('red'), 4: this.getColor('red'),5: this.getColor('red'),6:wn_nuber3==6?this.getColor('red'):''},
                                0: wn_number2,
                                1: wm_number1[0],
                                2: wm_number1[1],
                                3: wm_number1[2],
                                4: wm_number1[3],
                                5: wm_number1[4],
                                6:wn_nuber3,
                            })
                        }
                    }
                    //后四 组选4
                    if(this.gameNuber === 23){
                        for (let i = 0; i < this.wn_number.length; i++) {
                            let wm_number1 = this.wn_number[i].wn_number.split('');
                            let wm =vm.deleteFirst(wm_number1);
                            let wn_number2 = this.wn_number[i].issue.substr(this.wn_number[i].issue.length - 4);
                            let wordCnt = vm.getWordCnt(wm);
                            wn_nuber3 = vm.get2Frequency(wordCnt,3) === 1 ? 4 : '-';
                            vm.data1.push({
                                cellClassName: {2:vm.getColor('red'),3: this.getColor('red'), 4: this.getColor('red'),5: this.getColor('red'),6:wn_nuber3==4?this.getColor('red'):''},
                                0: wn_number2,
                                1: wm_number1[0],
                                2: wm_number1[1],
                                3: wm_number1[2],
                                4: wm_number1[3],
                                5: wm_number1[4],
                                6:wn_nuber3,
                            })
                        }
                    }
                    //龙虎和 万千
                    if(this.gameNuber === 352){
                        for (let i = 0; i < this.wn_number.length; i++) {
                            let wm_number1 = this.wn_number[i].wn_number.split('');
                            let wn_number2 = this.wn_number[i].issue.substr(this.wn_number[i].issue.length - 4);
                            if(wm_number1[0] > wm_number1[1]){
                                wn_nuber3 = '龙'
                            }else if(wm_number1[0] < wm_number1[1]){
                                wn_nuber3 = '虎'
                            }else{
                                wn_nuber3 = '和'
                            }
                            vm.data1.push({
                                cellClassName: {1:vm.getColor('red'),2: this.getColor('red'),6:this.getColor(wn_nuber3)},
                                0: wn_number2,
                                1: wm_number1[0],
                                2: wm_number1[1],
                                3: wm_number1[2],
                                4: wm_number1[3],
                                5: wm_number1[4],
                                6:wn_nuber3,
                            })
                        }
                    }
                    //龙虎和 万百
                    if(this.gameNuber === 353){
                        for (let i = 0; i < this.wn_number.length; i++) {
                            let wm_number1 = this.wn_number[i].wn_number.split('');
                            let wn_number2 = this.wn_number[i].issue.substr(this.wn_number[i].issue.length - 4);;
                            if(wm_number1[0] > wm_number1[2]){
                                wn_nuber3 = '龙'
                            }else if(wm_number1[0] < wm_number1[2]){
                                wn_nuber3 = '虎'
                            }else{
                                wn_nuber3 = '和'
                            }
                            vm.data1.push({
                                cellClassName: {1:vm.getColor('red'),3: this.getColor('red'),6:this.getColor(wn_nuber3)},
                                0: wn_number2,
                                1: wm_number1[0],
                                2: wm_number1[1],
                                3: wm_number1[2],
                                4: wm_number1[3],
                                5: wm_number1[4],
                                6:wn_nuber3,
                            })
                        }
                    }
                    //龙虎和 万十
                    if(this.gameNuber === 354){
                        for (let i = 0; i < this.wn_number.length; i++) {
                            let wm_number1 = this.wn_number[i].wn_number.split('');
                            let wn_number2 = this.wn_number[i].issue.substr(this.wn_number[i].issue.length - 4);
                            if(wm_number1[0] > wm_number1[3]){
                                wn_nuber3 = '龙'
                            }else if(wm_number1[0] < wm_number1[3]){
                                wn_nuber3 = '虎'
                            }else{
                                wn_nuber3 = '和'
                            }
                            vm.data1.push({
                                cellClassName: {1:vm.getColor('red'),4: this.getColor('red'),6:this.getColor(wn_nuber3)},
                                0: wn_number2,
                                1: wm_number1[0],
                                2: wm_number1[1],
                                3: wm_number1[2],
                                4: wm_number1[3],
                                5: wm_number1[4],
                                6:wn_nuber3,
                            })
                        }
                    }
                    //龙虎和 万个
                    if(this.gameNuber === 355){
                        for (let i = 0; i < this.wn_number.length; i++) {
                            let wm_number1 = this.wn_number[i].wn_number.split('');
                            let wn_number2 = this.wn_number[i].issue.substr(this.wn_number[i].issue.length - 4);
                            if(wm_number1[0] > wm_number1[4]){
                                wn_nuber3 = '龙'
                            }else if(wm_number1[0] < wm_number1[4]){
                                wn_nuber3 = '虎'
                            }else{
                                wn_nuber3 = '和'
                            }
                            vm.data1.push({
                                cellClassName: {1:vm.getColor('red'),5: this.getColor('red'),6:this.getColor(wn_nuber3)},
                                0: wn_number2,
                                1: wm_number1[0],
                                2: wm_number1[1],
                                3: wm_number1[2],
                                4: wm_number1[3],
                                5: wm_number1[4],
                                6:wn_nuber3,
                            })
                        }
                    }
                    //龙虎和 千百
                    if(this.gameNuber === 356){
                        for (let i = 0; i < this.wn_number.length; i++) {
                            let wm_number1 = this.wn_number[i].wn_number.split('');
                            let wn_number2 = this.wn_number[i].issue.substr(this.wn_number[i].issue.length - 4);
                            if(wm_number1[1] > wm_number1[2]){
                                wn_nuber3 = '龙'
                            }else if(wm_number1[1] < wm_number1[2]){
                                wn_nuber3 = '虎'
                            }else{
                                wn_nuber3 = '和'
                            }
                            vm.data1.push({
                                cellClassName: {2:vm.getColor('red'),3: this.getColor('red'),6:this.getColor(wn_nuber3)},
                                0: wn_number2,
                                1: wm_number1[0],
                                2: wm_number1[1],
                                3: wm_number1[2],
                                4: wm_number1[3],
                                5: wm_number1[4],
                                6:wn_nuber3,
                            })
                        }
                    }
                    //龙虎和 千十
                    if(this.gameNuber === 357){
                        for (let i = 0; i < this.wn_number.length; i++) {
                            let wm_number1 = this.wn_number[i].wn_number.split('');
                            let wn_number2 = this.wn_number[i].issue.substr(this.wn_number[i].issue.length - 4);
                            if(wm_number1[1] > wm_number1[3]){
                                wn_nuber3 = '龙'
                            }else if(wm_number1[1] < wm_number1[3]){
                                wn_nuber3 = '虎'
                            }else{
                                wn_nuber3 = '和'
                            }
                            vm.data1.push({
                                cellClassName: {2:vm.getColor('red'),4: this.getColor('red'),6:this.getColor(wn_nuber3)},
                                0: wn_number2,
                                1: wm_number1[0],
                                2: wm_number1[1],
                                3: wm_number1[2],
                                4: wm_number1[3],
                                5: wm_number1[4],
                                6:wn_nuber3,
                            })
                        }
                    }
                    //龙虎和 千个
                    if(this.gameNuber === 358){
                        for (let i = 0; i < this.wn_number.length; i++) {
                            let wm_number1 = this.wn_number[i].wn_number.split('');
                            let wn_number2 = this.wn_number[i].issue.substr(this.wn_number[i].issue.length - 4);
                            if(wm_number1[1] > wm_number1[4]){
                                wn_nuber3 = '龙'
                            }else if(wm_number1[1] < wm_number1[4]){
                                wn_nuber3 = '虎'
                            }else{
                                wn_nuber3 = '和'
                            }
                            vm.data1.push({
                                cellClassName: {2:vm.getColor('red'),5: this.getColor('red'),6:this.getColor(wn_nuber3)},
                                0: wn_number2,
                                1: wm_number1[0],
                                2: wm_number1[1],
                                3: wm_number1[2],
                                4: wm_number1[3],
                                5: wm_number1[4],
                                6:wn_nuber3,
                            })
                        }
                    }
                    //龙虎和 百十
                    if(this.gameNuber === 359){
                        for (let i = 0; i < this.wn_number.length; i++) {
                            let wm_number1 = this.wn_number[i].wn_number.split('');
                            let wn_number2 = this.wn_number[i].issue.substr(this.wn_number[i].issue.length - 4);
                            if(wm_number1[2] > wm_number1[3]){
                                wn_nuber3 = '龙'
                            }else if(wm_number1[2] < wm_number1[3]){
                                wn_nuber3 = '虎'
                            }else{
                                wn_nuber3 = '和'
                            }
                            vm.data1.push({
                                cellClassName: {3:vm.getColor('red'),4: this.getColor('red'),6:this.getColor(wn_nuber3)},
                                0: wn_number2,
                                1: wm_number1[0],
                                2: wm_number1[1],
                                3: wm_number1[2],
                                4: wm_number1[3],
                                5: wm_number1[4],
                                6:wn_nuber3,
                            })
                        }
                    }
                    //龙虎和 百个
                    if(this.gameNuber === 360){
                        for (let i = 0; i < this.wn_number.length; i++) {
                            let wm_number1 = this.wn_number[i].wn_number.split('');
                            let wn_number2 = this.wn_number[i].issue.substr(this.wn_number[i].issue.length - 4);
                            if(wm_number1[2] > wm_number1[4]){
                                wn_nuber3 = '龙'
                            }else if(wm_number1[2] < wm_number1[4]){
                                wn_nuber3 = '虎'
                            }else{
                                wn_nuber3 = '和'
                            }
                            vm.data1.push({
                                cellClassName: {3:vm.getColor('red'),5: this.getColor('red'),6:this.getColor(wn_nuber3)},
                                0: wn_number2,
                                1: wm_number1[0],
                                2: wm_number1[1],
                                3: wm_number1[2],
                                4: wm_number1[3],
                                5: wm_number1[4],
                                6:wn_nuber3,
                            })
                        }
                    }
                    //龙虎和 十个
                    if(this.gameNuber === 361){
                        for (let i = 0; i < this.wn_number.length; i++) {
                            let wm_number1 = this.wn_number[i].wn_number.split('');
                            let wn_number2 = this.wn_number[i].issue.substr(this.wn_number[i].issue.length - 4);
                            if(wm_number1[3] > wm_number1[4]){
                                wn_nuber3 = '龙'
                            }else if(wm_number1[3] < wm_number1[4]){
                                wn_nuber3 = '虎'
                            }else{
                                wn_nuber3 = '和'
                            }
                            vm.data1.push({
                                cellClassName: {4:vm.getColor('red'),5: this.getColor('red'),6:this.getColor(wn_nuber3)},
                                0: wn_number2,
                                1: wm_number1[0],
                                2: wm_number1[1],
                                3: wm_number1[2],
                                4: wm_number1[3],
                                5: wm_number1[4],
                                6:wn_nuber3,
                            })
                        }
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
    #SSCBettingRecord{
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