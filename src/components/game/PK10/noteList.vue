<!--pk10注单-->
<template>
    <div class="PK10_common mtBttom">
        <div class="lottery-list">
            <div class="single">
                <div class="text_area">
                    <textarea placeholder="请输入选号，每注内容号码以空格隔开，每一注之间请用一
个逗号隔开（输入的号码会自动排序并去除不合格号码）。
不足2位数的号码要在前面补0，如号码为5，则输入时应为
05。例如：01 05,03 04，表示投注冠军01、亚军05和冠军
03、亚军04两注。" rows="6" class="mint-field-core" ref="textarea" @input="textarea" ></textarea>
                </div>
            </div>
            
            <p>{{text}}</p>
            <div class="bonus_note">
                注： 每一注号码之间请用一个逗号隔开（输入的号码会自动排序并去除不合格号码）。
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:"noteList",
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
            text:"",
            xing:3,
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
            ballarr:[],//注单数组
        }
    },
    methods:{
        /**
         * 交互操作
         */
        //1.编写注单，下注操作
        textarea(e){
            let oText = this.$refs.textarea;
            //把数组，空格，小写逗号，大写逗号之外的所有字符替换成空字符串
            oText.value = oText.value.replace(/[^\d\s,，]/g,'');
            let str = oText.value+",";
            //把多个连续空格替换成一个
            str = str.replace(/\s+/g,' ');
            //把大写逗号都替换成小写逗号
            str = str.replace(/，/g,',');
            let arr = str.split(',');
            //清除空数组
            arr = this.$lottoryApi.clearStringkongArr(arr);
            //去掉不符合的内容
            if(this.xing===3){
                arr = this.$lottoryApi.danshisanxing(arr);
            }else{
                arr = this.$lottoryApi.danshierxing(arr);
            }
            
            this.ballarr = arr;
            this.changeEmitUp();
        },
        //实时更新投注信息
        changeEmitUp(){
            let ball = this.setball(this.ballarr);
            let position = this.setposition()
            //处理ball
            this.getshowBallName(position,ball);
        },
        /**ball处理
         * 
         */
        //2.投注显示名称
        getshowBallName(position,ball){
            //单式投注 start
            let ballarr = ball.split("|");
            let viewBallsStr = ball;
            let totalBet = this.getTotalBet(ballarr);
            let pream = {
                ball,
                position,
                totalBet,
                num:totalBet.length,
                viewBallsStr,
                ballarr
            }
            this.$emit("depathBall",pream);
            
            //单式投注 end
        },
        //清除所有的选中状态
        clearlmTpmisable(){
            this.ballarr = [];
            let oText = this.$refs.textarea;
            oText.value = '';
            this.changeEmitUp();
        },
        getTotalBet(arr){
            //单式投注 start
            let arr1 = [];
            arr = this.$lottoryApi.clearStringkongArr(arr);
            for(let i=0;i<arr.length;i++){
                arr1.push(arr[i].split(" "));
            }
            return arr1
            //单式投注 end
        },
        //PK10获取投注项
        setball(data){
            for(let i=0;i<data.length;i++){
                for(let j =0;j<data[i].length;j++){
                    data[i][j] = parseInt(data[i][j]);
                }
                data[i] = data[i].join(' ');
            }
            let ball = data.join('|');
            return ball;
        },
        //所有注单都是空数组
        setposition(){
            return [];
        },
        /**
         * prop相关
         */
        //1.初始化投注页面数据解析
        init(data){
            this.labels = [""];
            if(data.the_way ==="danshi"){
                this.xing = data.ball.xing;
            }
            //2.计算所有的赔率
            this.lmTpm = [];
            this.setPrize(data);
            this.clearlmTpmisable()
        },
        //初始化item数据
        setItemgroup(data){
            this.prize_group = data.prize_group;
            this.rate = data.rate;
            //console.log(data);
        },
        //初始化奖金组
        initGetGroup(data){
            this.maxGroup = data.maxGroup;
            this.userGroup = data.userGroup;
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
        
    },
    created(){
        
    },
    mounted(){
        //注单校验
        //this.danshiInputCheck();
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

<style lang="less" scoped>
.PK10_common{
    .single{
        padding: 0.1rem;
        .text_area{
            height: 1.27rem;
            border: 1px solid #C3C3C3;
            border-radius: 5px;
            background-color: #FFF;
            padding: 0.1rem;
            .mint-field-core{
                word-break: break-all;
                word-wrap: break-word;
                appearance: none;
                border-radius: 0;
                border: 0;
                flex: 1;
                outline: 0;
                line-height: 1.6;
                font-size: inherit;
                width: 100%;
                overflow: hidden;
                resize: none;
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
