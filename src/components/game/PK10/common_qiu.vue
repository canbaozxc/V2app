<!--pk10球型UI-->
<template>
    <div class="PK10_common mtBttom">
        <div class="lottery-list">
            <div class="way_Box" v-for="(lab,num) in labels" :key="num">
                
                <div class="fixed_box">
                    <div class="label">{{lab.name}}</div>
                    <ul class="list">
                        <li v-for="(item,index) in lmTpm[num]"  :key="index" @click="chaecked(num,index)" :class="item.isable?'on':''" >
                            <p class="button" >{{item.name|addZero}}</p>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="bonus_note">
                <slot name="bonus_note"></slot>
            </div>
        </div>
    </div>
</template>
<script>
import { RadioGroup,Radio,ButtonGroup } from "iview";
export default {
    name:'PK10_common',
    components:{
        RadioGroup,Radio,ButtonGroup
    },
    filters: {
        addZero: function (value) {
            let str = '';
            if(value<10){
                str = ''+value;
                str = '0'+str;
            }else{
                str = value;
            }
            return str;
        },
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
            buttonQuick:{
                'quan':'全',
                'da':"大",
                'xiao':"小",
                'ji':"奇",
                'ou':"偶",
                'qing':"清"
            },
            prize:'',//总赔率:与分赔率互斥
            extra_prize:'',//分赔率：与总赔率互斥
            lmTpm:[],
            position:[],//选择的下注下标
            labels:[],
            is_enable_extra:false,//是否使用分赔率false:总赔率  true:分赔率
            prize_group:'',//当前选择奖金组
            rate:'',//选择的奖金组的返点
            userGroup:'',//用户奖金组
            maxGroup:"",//系统允许最高奖金组
        }
    },
    methods:{
        quickCheck(value,num){
            
            switch (value) {
                case 'quan':
                    //选择全部
                    this.quickClear(num);
                    for(let i=0;i<this.lmTpm[num].length;i++){
                        this.lmTpm[num][i].isable = !this.lmTpm[num][i].isable;
                    }
                    this.labels[num].quick = value;
                    this.$forceUpdate();
                    this.changeEmitUp();
                    break;
                case 'da':
                    //选择全部
                    this.quickClear(num);
                    for(let i=0;i<this.lmTpm[num].length;i++){
                        if(i>=5){
                            this.lmTpm[num][i].isable = !this.lmTpm[num][i].isable;
                        }
                    }
                    this.labels[num].quick = value;
                    this.$forceUpdate();
                    this.changeEmitUp();
                    break;
                case 'xiao':
                    //选择全部
                    this.quickClear(num);
                    for(let i=0;i<this.lmTpm[num].length;i++){
                        if(i<5){
                            this.lmTpm[num][i].isable = !this.lmTpm[num][i].isable;
                        }
                    }
                    this.labels[num].quick = value;
                    this.$forceUpdate();
                    this.changeEmitUp();
                    break;
                case 'ji':
                    //选择奇数
                    this.quickClear(num);
                    for(let i=0;i<this.lmTpm[num].length;i++){
                        if(i%2==0){
                            this.lmTpm[num][i].isable = !this.lmTpm[num][i].isable;
                        }
                    }
                    this.labels[num].quick = value;
                    this.$forceUpdate();
                    this.changeEmitUp();
                    break;
                case 'ou':
                    //选择偶数
                    this.labels[num].quick = value;
                    this.quickClear(num);
                    for(let i=0;i<this.lmTpm[num].length;i++){
                        if(i%2==1){
                            this.lmTpm[num][i].isable = !this.lmTpm[num][i].isable;
                        }
                    }
                    this.$forceUpdate();
                    this.changeEmitUp();
                    break;
                default:
                    this.quickClear(num);
                    this.labels[num].quick = '';
                    this.$forceUpdate();
                    break;
                
                
            }
            
            
        },
        quickClear(num){
            for(let i=0;i<this.lmTpm[num].length;i++){
                this.lmTpm[num][i].isable = false;
            }
            console.log(JSON.stringify(this.labels));
            this.changeEmitUp();
        },
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
            //清空所有快捷选择
            for(let i=0;i<this.labels.length;i++){
                this.labels[i].quick = '';
            }
            this.lmTpm = lmTpm;
            this.changeEmitUp();
        },
        //实时更新投注信息
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
                    att = ballarr[i].split(" ");
                    arr.push(att);
                }
                //投注名称数组转换
                array = [].concat(arr);
                for(let i = 0;i<arrBall.length;i++){
                    if(arrBall[i].case.length){
                        sArr = [];
                        for(let j=0;j<arr[i].length;j++){
                            for(let k=0;k<arrBall[i].case.length;k++){
                                if(arrBall[i].case[k].value == arr[i][j]){
                                    sArr.push(arrBall[i].case[k].name);
                                }
                            }
                        }
                        array[i]=sArr;
                    }
                }
                
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
            //去掉空值数组如：[""]转换后会变成[]
            for(let i = lottoryArr.length;i--;){
                if(lottoryArr[i].length===1){
                    if(lottoryArr[i][0]===''){
                        lottoryArr[i] = [];
                    }
                }
            }

            totalBet = this.getTotalBet(lottoryArr);

            let pream = {
                ball,
                position,
                totalBet,
                num:totalBet.length,
                viewBallsStr,
                ballarr
            }
            

            this.$emit("depathBall",pream);
            //
        },
        getTotalBet(betArr){
            let asd = [];
            if(this.dataTpl.the_way==="sum"){//求和计算投注数,两面-按名次
                asd = this.$lottoryApi.getsummation(betArr);
            }else{
                switch (betArr.length) {
                    case 2:
                        asd = this.$lottoryApi.jingquefushi2(betArr);
                        break;
                    case 3:
                        asd = this.$lottoryApi.jingquefushi3(betArr);
                        break;
                    default:
                        break;
                }
            }
            return asd;
            
        },
        
        //PK10获取投注项
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
                    item = item.join(" ");
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
        //PK10获取投注下标
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
            this.labels = [];
            //this.labels = data.ball.labels;
            let labels = data.ball.labels;
            for(let i=0;i<labels.length;i++){
                this.labels.push({
                    name:labels[i],
                    quick:''
                });
            }
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
                            //console.log(JSON.stringify(val));
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
<style lang="less">
.checkbtn{
    .ivu-btn-group{
        
    }
    .ivu-radio-group-button{
        .ivu-radio-wrapper-checked{
            border-color: #F13333;
            color: #F13333;
            box-shadow: -1px 0 0 0 #F13333;
        }
        .ivu-radio-wrapper-checked:before{
            background: #F13333;
        }
        .ivu-radio-focus:after{
            opacity: 0;
        }
        .ivu-radio-focus:first-child{
            box-shadow:none;
        }
    }
}
</style>

<style lang="less" scoped>

.lottery-list{
    .way_Box{
        .checkbtn{
            width: 100%;
        }
        .fixed_box{    
            display: flex;
            
            .list{
                width: 79%;
                padding: 0.15rem 0.15rem 0.15rem  0;
                display: flex;
                justify-content: flex-start;
                flex-direction: row;
                flex-wrap: wrap;
                li{
                    width: 0.42rem;
                    height: 0.42rem;
                    line-height: 0.42rem;
                    border-radius: 50%;
                    margin: 0 0 3% 3%; 
                    box-shadow: 0 0 6px #C3C3C3;
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
            .label{
                width: 21%;
                font-size: 0.16rem;
                line-height: 0.8rem;
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

