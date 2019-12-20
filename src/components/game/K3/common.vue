<!--快三通用-->
<template>
    <div class="k3_common mtBttom">
        <div class="lottery-list">
            <div class="way_Box" v-for="(lab,num) in labels" :key="num">
                <span>{{lab}}</span>
                <ul class="list">
                    <li v-for="(item,index) in lmTpm[num]"  :key="index" @click="chaecked(num,index)" :class="item.isable?'on':''" >
                        <p class="button" >{{item.name}}</p>
                        <p class="odd">赔{{is_enable_extra?setOdds(extra_prize[item.value]):setOdds(prize)}}</p>
                    </li>
                </ul>
            </div>
            <div class="bonus_note">
                <slot name="bonus_note"></slot>
            </div>
        </div>
    </div>
</template>
<script>
import Notice from '@/components/home/Notice.vue'
export default {
    name:'k3_common',
    components:{
        Notice
    },
    props: {
        dataTpl: {
            type: Object,
            default: null
        },
        Item:{
            type:Object,
            default:{}
        },
        groupData:{
            type:Object,
            default:{}
        },
        dataWay:{
            type:Object,
            default:{}
        }
    },
    data(){
        return {
            prize:'',//总赔率:与分赔率互斥
            extra_prize:'',//分赔率：与总赔率互斥
            lmTpm:[],
            position:[],//选择的下注下标
            labels:[""],
            is_enable_extra:false,//是否使用分赔率false:总赔率  true:分赔率
            prize_group:'',//当前选择奖金组
            rate:'',//选择的奖金组的返点
            userGroup:'',//用户奖金组
            maxGroup:"",//系统允许最高奖金组
        }
    },
    methods:{
        //2.取得赔率
        setPrize(data){
            //是否有分赔率
            this.is_enable_extra = data.prizeSet.is_enable_extra;
            if(!data.prizeSet.is_enable_extra){
                //如果没有，设置总赔率
                this.extra_prize = '';
                this.prize = data.prizeSet.prize/2;
            }else{
                //如果有，设置分赔率,并把总赔率设置为''
                let extra_prize = data.prizeSet.extra_prize;
                for(let key in extra_prize){
                    extra_prize[key] = extra_prize[key]/2;
                }
                this.prize = '';
                this.extra_prize = extra_prize;
            }
        },
        //3.获取模板
        setlmTpm(data){
            //没有下级
            if(data.control===false){
                //console.log(data.balls);
                //如果是数组，说明有对应数据
                if(data.balls.length){
                    this.lmTpm = [];
                    this.lmTpm.push(data.balls);
                }else{//数据需要自己生成
                    this.lmTpm = [];
                    let Tpm = [];
                    let item = '';
                    for(let i=0;i<this.labels.length;i++){
                        Tpm = [];
                        for(let i=data.balls.start;i<data.balls.end;i++){
                            item= {
                                value:i,
                                name:i,
                                isable:false
                            }
                            Tpm.push(item);
                        }
                        this.lmTpm.push(Tpm);
                    }
                }
                //console.log(this.lmTpm);
            }else{//有下级
                //console.log(data.balls);
                let balls = data.balls
                let Tmp = [];
                let item = '';
                this.lmTpm = [];
                for(let i=0;i<balls.length;i++){
                    //判断是否自定义
                    Tmp = [];
                    if(balls[i].case.length){
                        
                        Tmp = balls[i].case;
                         this.lmTpm.push(Tmp);
                    }else{
                        //console.log(balls[i].case.end,balls[i].case.start);
                        Tmp = [];
                        for(let j=balls[i].case.start;j<balls[i].case.end;j++){
                            item= {
                                value:j,
                                name:j,
                                isable:false
                            }
                            Tmp.push(item);
                        }
                         this.lmTpm.push(Tmp);
                    }
                   
                }
            }
        },
        //4选择下注
        chaecked(num,index){
            this.lmTpm[num][index].isable = !this.lmTpm[num][index].isable;
            
            //this.$emit("depathBall",pream);
            this.changeEmitUp();
        },
        //清除所有的选中状态
        clearlmTpmisable(){
            let lmTpm = this.lmTpm;
            if(lmTpm.length>1){
                for(let i=0;i<lmTpm.length;i++){
                    for(let j=0;j<lmTpm[i].length;j++){
                        lmTpm[i][j].isable=false;
                    }
                }
            }else{
                for(let i = 0;i<lmTpm[0].length;i++){
                    lmTpm[0][i].isable=false;
                };
            }
            this.lmTpm = lmTpm;
            this.changeEmitUp();
        },
        changeEmitUp(){
            let ball = this.setball();
            let position = this.setposition()
            
            //处理ball
            this.getshowBallName(position,ball);
        },
        /**ball处理
         * 
         */
        
        //2.投注显示名称
        getshowBallName(position,ball){
            let ballarr = ball.split("|");
            //console.log(this.dataTpl);
            let sArr = [];
            
            let arrBall = this.dataTpl.ball.balls;
            let effectiveNum = this.dataTpl.ball.effectiveNum?this.dataTpl.ball.effectiveNum:1;
            let viewBallsStr = '';
            let num = 0;
            let totalBet=[];
            let lottoryArr = [];
            if(position.length>1){
                let att,arr = [];
                let array = [];
                for(let i=0;i<ballarr.length;i++){
                    
                    att = ballarr[i].split("");
                    arr.push(att);
                    
                }
                //console.log(arr);
                array = [].concat(arr);
                for(let i = 0;i<arrBall.length;i++){
                    if(arrBall[i].case.length){
                        for(let j=0;j<arr[i].length;j++){
                            for(let k=0;k<arrBall[i].case.length;k++){
                                if(arrBall[i].case[k].value ==arr[i][j]){
                                    sArr.push(arrBall[i].case[k].name);
                                }
                            }
                        }
                        array[i]=sArr;
                        //console.log(sArr);
                    }
                }
                //console.log(array);
                
                let str = "";
                //计算去重注数
                //console.log(arr);
                lottoryArr = arr;
                
                for(let i=0;i<array.length;i++){
                    array[i] = array[i].join(",")
                }
                str = array.join("|");
                //this.noteList.viewBalls = str;
                viewBallsStr =str;
            }else{
                let arr = [];
                if(arrBall.length){
                    for(let i=0;i<ballarr.length;i++){
                        for(let j=0;j<arrBall.length;j++){
                            if(ballarr[i]==arrBall[j].value){
                                arr.push(arrBall[j].name);
                            }
                        }
                    }
                }else{
                    arr = ballarr.length===1&&ballarr[0]===""?[]:ballarr;
                }
                //计算去重注数
                
                lottoryArr = [arr];
                let str = arr.join("|");
                viewBallsStr =str;
            }
            //计算投注信息
            switch (effectiveNum) {
                case 1:
                    totalBet= this.duplicateRemovalCalculationBetting(lottoryArr);
                    break;
                case 2:
                    totalBet= this.$lottoryApi.extract(lottoryArr[0],2);
                    //console.log(ball);
                    ball = ballarr.join("");
                    break;
                case 3:
                    totalBet= this.$lottoryApi.extract(lottoryArr[0],3);
                    ball = ballarr.join("");
                    break;
                default:
                    break;
            }

            let pream = {
                ball,
                position,
                totalBet,
                num:totalBet.length,
                viewBallsStr,
                ballarr
            }
            if(this.dataTpl.fun){
                let boolean = this.dataTpl.fun(pream);
                if(boolean){
                    this.$emit("depathBall",pream);
                }
            }else{
                this.$emit("depathBall",pream);
            }
        },
        //去重投注计算
        duplicateRemovalCalculationBetting(betArr){
            //console.log(betArr);
            let arr1,arr2,arr3=[];
            let total = [];
            switch (betArr.length) {
                case 1://不需要去重
                    total = [];
                    arr1 = betArr[0];
                    for(var i=arr1.length;i--;){
                        total.push(arr1[i]);
                    }
                    //this.totalBet = total;
                    //console.log(total);
                    return total;
                    break;
                case 2://二层去重
                    arr1 = betArr[0];
                    arr2 = betArr[1];
                    total = [];
                    for(var i=arr1.length;i--;){
                        for(var j=arr2.length;j--;){
                            if(arr1[i]!=arr2[j]){
                                total.push(arr1[i]+arr2[j]);
                            }
                            
                        }
                    }
                    return total;
                    break;
                case 3://三层去重
                    arr1 = betArr[0];
                    arr2 = betArr[1];
                    arr3 = betArr[2];
                    total = [];
                    for(var i=arr1.length;i--;){
                        for(var j=arr2.length;j--;){
                            for(var k=arr3.length;k--;){
                                if(arr1[i]!=arr2[j]&&arr1[i]!=arr2[k]&&arr1[k]!=arr2[j]){
                                    //console.log(arr1[i]+arr2[j]+arr2[j]);
                                    total.push(arr1[i]+arr2[j]+arr2[j]);
                                }
                            }
                            
                        }
                    }
                    return total;
                    break;
                default:
                    break;
                
            }
            //console.log(this.totalBet);
            //this.getWinTotal(this.totalBet)
        },



        //快三获取投注项
        setball(){
            let lmTpm = this.lmTpm;
            let ball = [];
            if(lmTpm.length>1){
                
                for(let i=0;i<lmTpm.length;i++){
                    let item = [];
                    for(let j=0;j<lmTpm[i].length;j++){
                        if(lmTpm[i][j].isable){
                            item.push(lmTpm[i][j].value);
                            
                        }
                    }
                    item = item.join("");
                    ball.push(item);
                }
                ball =  ball.join("|");
            }else{
                //只有一行投注时
                for(let i = 0;i<lmTpm[0].length;i++){
                    if(lmTpm[0][i].isable){
                        ball.push(lmTpm[0][i].value);
                    }
                }
                ball =  ball.join("|");
            }
            return ball;
        },
        //快三获取投注下标
        setposition(){
            let lmTpm = this.lmTpm;
            let rtu = [];
            
            if(lmTpm.length>1){
                for(let i=0;i<lmTpm.length;i++){
                    let item = [];
                    for(let j=0;j<lmTpm[i].length;j++){
                        if(lmTpm[i][j].isable){
                            item.push(String(j));
                            //console.log(j);
                        }
                    }
                    rtu.push(item);
                }
            }else{
                let arr = []
                for(let i = 0;i<lmTpm[0].length;i++){
                    if(lmTpm[0][i].isable){
                        arr.push(String(i));
                    }
                }
                rtu.push(arr);
            }
            return rtu;
        },
        //1.初始化投注页面数据解析
        init(data){
            this.labels = [""];
            this.labels = data.ball.labels;
            //2.计算所有的赔率
            this.lmTpm = [];
            this.setPrize(data);
            this.setlmTpm(data.ball);
            this.clearlmTpmisable();
        },
        setItemgroup(data){
            this.prize_group = data.prize_group;
            this.rate = data.rate;
            //console.log(data);
        },
        //实际赔率计算
        setOdds(prize){
            if(this.userGroup>this.maxGroup){
                return((prize*2)*this.prize_group/this.userGroup/2).toFixed(5);
            }else{
                return((prize*2)*(1-this.rate)/2).toFixed(5);
            }
        },
        initGetGroup(data){
            this.maxGroup = data.maxGroup;
            this.userGroup = data.userGroup;
        },
        
    },
    watch:{
            dataTpl:{  
                handler:function(val,oldval){ 
                    if(val!=oldval){
                        this.$nextTick(()=>{
                            this.init(val);
                            //console.log(val);
                        })
                    }
                },  
                immediate:true,//关键
                deep:true
            },
            Item:{  
                handler:function(val,oldval){ 
                    if(val!=oldval){
                        this.$nextTick(()=>{
                            this.setItemgroup(val);
                            //console.log(val);
                        })
                    }
                },  
                immediate:true,//关键
                deep:true
            },
            groupData:{
                handler:function(val,oldval){ 
                    if(val!=oldval){
                        this.$nextTick(()=>{
                            this.initGetGroup(val);
                        })
                    }
                },  
                immediate:true,//关键
                deep:true
            },
            dataWay:{
                handler:function(val,oldval){ 
                    if(val!=oldval){
                        this.$nextTick(()=>{
                            //console.log(val);
                        })
                    }
                },  
                immediate:true,//关键
                deep:true
            }
        }
}
</script>

<style lang="less" scoped>
.k3_common{margin-bottom: 2rem;}
.lottery-list{
    .list{
        padding: 0.15rem 0.15rem 0.15rem  0;
        display: flex;
        justify-content: flex-start;
        flex-direction: row;
        flex-wrap: wrap;
        li{
            width: 22%;
            height: 0.68rem;
            padding: 0.1rem 0;
            margin: 0 0 3% 3%; 
            box-shadow: 0 0 6px rgba(0,0,0,.11);
            border-radius: 3px;
            .button{
                font-size: 0.2rem;
            }
            .odd{
                font-size: 0.12rem;
                color: red;
            }
        }
        .on{
            background: #E51C23;
            color: #FFF;
            .odd{
                color: #FFF;
            }
        }
    }
    .bonus_note{
        margin: 0 0.15rem;
        line-height: 0.2rem;
        text-align: left;
        font-size: 0.12rem;
    }
}
</style>

