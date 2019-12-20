<template>
    <div class="lottery-info">
        <Row justify="start" align="middle">
            <Col span="12">
                <div @click="showProjectList">
                    <p class="lotteryNum">第<span class="prewNum">{{SSC_issue.current_num}}</span>期<Icon type="md-arrow-dropdown" /></p>
                    <p v-if="SSC_issue.SSCResult[0]===''">正在开奖中</p>
                    <ul v-else>
                        <li v-for="(item,index) in SSC_issue.SSCResult" :key="index"><span class="dice" >{{item}}</span></li>
                    </ul>
                </div>
            </Col>
            <Col span="12">
                <div class="period-down-time">
                    <p class="nexNum">距{{SSC_issue.next_num}}期截止</p>
                    <div class="countDown">{{strTime}}</div>
                </div>
            </Col>
        </Row>
    </div>
</template>
<script>
import {Row,Col,Icon} from "iview"
export default {
    name:"SSCHead",
    components:{
        Row,Col,
        Icon
    },
    props:{
        data:{
            type:Object,
            default:{}
        },
        issueTime:{
            type:Number,
            default:5000
        }
    },
    data(){
        return {
            istufa:true,
            strTime:"",//倒计时
            gameType:'',//彩种
            timer:'',//定时器
            gameId:'',//游戏id
            diffTime:'',//
            //当前数据这期开奖数据
            SSC_issue:{
                next_num:'',
                current_num:'',
                current_data:{},
                SSCResult:['','','','','','','','','',''],
            },
            connectCount:0,//单期开奖结果，请求次数
            ifgetKaiJiang:false,//是否在开奖循环中
        }
    },
    methods:{
        //显示隐藏开奖记录列表
        showProjectList(){
            this.istufa = false;
            this.$emit('showProjectList',this.istufa)
        },
        //单期时间，开奖请求
        async getIssueListForRefresh(){
            this.ifgetKaiJiang = true;
            let _this = this;
            let pream = {
                "lottery_id":this.gameId
            }
            let res = await this.$api.getIssueListForRefresh(pream);
            let data = res.data;
            let wn_number = data.issueHistory.issues[0].wn_number;
            if(wn_number){//请求到了开奖结果
                this.connectCount = 0;
                this.ifgetKaiJiang = false;
            }else{//没有请求到开奖结果
                //重新请求
                this.connectCount++;
                setTimeout(function(){
                    _this.getIssueListForRefresh();
                },this.issueTime)
            }
            this.$emit('depathissueData',data)
            //如果请求到了当期开奖结果，计算倒计时
            this.formatDataIssue(data);
            
        },
        //1.Title组件回传数据，初始化调用数据(注意只允许页面加载运行，不允许在其他函数中调用)
        getGameData(data){
            this.gameId = data.gameId;
            //2.格式化当前这期的数据
            this.initformatDataIssue(data);
        },
        //2.title组件初始化，选择彩种，玩法都会调用，格式化当前这期的数据（SSC格式化）
        initformatDataIssue(data){
            
            let wn_number = data.issueHistory.issues[0].wn_number;
            //3.获取当前期数，结果，起止时间等
            this.SSC_issue = {
                next_num:data.issueHistory.current_issue,
                current_num:data.issueHistory.issues[0].issue,
                current_data:data.issueHistory.issues[0],
                SSCResult:['','','','','','','','','',''],
            };
            //倒计时对象
            let countDownObj = {
                'currentTime':data.currentTime,
                'currentNumberTime':data.currentNumberTime,
                'diffTime':''
            };
            //4.如果请求到了当期开奖结果
            if(wn_number){
                //获取开奖数据
                this.SSC_issue.SSCResult=wn_number.split(" ");
            }else{//4.否则开奖数据为空且重新请求
                this.SSC_issue.SSCResult = ['','','','',''];
                //请求调用新的时间,和获奖结果
                this.getIssueListForRefresh();
            }
            
            //启用倒计时
            this.getSetintelTime(countDownObj);
        },
        //2.每一次倒计时初始化，选择彩种，玩法都会调用，格式化当前这期的数据（SSC格式化）
        formatDataIssue(data){
            let wn_number = data.issueHistory.issues[0].wn_number;
            console.log(wn_number);
            //头部格式化
            this.SSC_issue = {
                next_num:data.issueHistory.current_issue,
                current_num:data.issueHistory.issues[0].issue,
                current_data:data.issueHistory.issues[0],
                SSCResult:['','','','','','','','','',''],
            };
            //倒计时对象
            let countDownObj = {
                'currentTime':data.currentTime,
                'currentNumberTime':data.currentNumberTime,
                'diffTime':''
            };
            //如果请求到了当期开奖结果，计算倒计时
            if(wn_number){
                //当前数据这期开奖数据
                this.SSC_issue.SSCResult=wn_number.split(" ");
            }else{//否则不计算倒计时
                this.SSC_issue.SSCResult = ['','','','',''];
            }
            this.getSetintelTime(countDownObj);
        },
        
        //2.启用定时器获取倒计时对象
        getSetintelTime(countDownObj){
            //3.获取倒计时差
            this.diffTime = this.initIssueRefrech(countDownObj);
            //4.格式化时间
            let _this = this;
            this.strTime = this.formattingTime(this.diffTime);
            clearInterval(this.timer);
            //5.开始倒计时
            this.timer = setInterval(function(){
                _this.diffTime -=1000;
                _this.strTime = _this.formattingTime(_this.diffTime);
            },1000)
        },
        /**
         * 工具方法，应用所有
         */
        //格式化时间
        formattingTime(diffTime){
            let hh,mm,ss,strTime = '';
            if(diffTime<=0||!diffTime){
                strTime = '开奖中';
                clearInterval(this.timer);
                //设定一个模拟时间
                this.diffTime = 600000;
                if(!this.ifgetKaiJiang){//如果正在请求，不执行新的请求
                    //请求调用新的时间
                    this.getIssueListForRefresh();
                }
                
            }else{
                hh = this.addZero(Math.floor((diffTime / 1000 / 60 / 60) % 24));
                mm = this.addZero(Math.floor((diffTime / 1000 / 60) % 60));
                ss = this.addZero(Math.floor((diffTime / 1000) % 60));
                strTime = hh+':'+mm+':'+ss;
            }
            return strTime;
        },
        /*倒计时模块 */
        //初始化单项倒计时
        initIssueRefrech(itemData){
            let endTime,startTime = '';
            endTime = new Date(itemData.currentNumberTime*1000).getTime();
            startTime = new Date(itemData.currentTime*1000).getTime();
            
            itemData.diffTime = endTime-startTime;
            //console.log(startTime);
            return itemData.diffTime;
        },
        //补0函数
        addZero(num) {
            return num < 10 ? '0' + num : '' + num;
        },
    },
    created(){
        //1.初始化开奖数据
        //this.getGameData(this.data);
    },
    mounted(){
        let _this = this;
        var hiddenProperty = 'hidden' in document ? 'hidden' :
            'webkitHidden' in document ? 'webkitHidden' :
                'mozHidden' in document ? 'mozHidden' :
                    null;
        // 不同浏览器的事件名
        var visibilityChangeEvent = hiddenProperty.replace(/hidden/i, 'visibilitychange');
        var i = 0
        var onVisibilityChange = function () {
            if (!document[hiddenProperty]) {
                //console.log("浏览器唤醒调用getIssueListForRefresh");
                _this.getIssueListForRefresh();
            }
        }
        document.addEventListener(visibilityChangeEvent, onVisibilityChange);
    },
    watch:{
        data:{  
            handler:function(val,oldval){ 
                if(val!=oldval){
                    this.$nextTick(()=>{
                        this.getGameData(val);
                        //console.log(val);
                    })
                }
            },  
            immediate:true,//关键
            deep:true
        },
    },
    //请同事注意：离开前清理页面定时器
    destroyed() {
        clearInterval(this.timer);
    }
}
</script>
<style lang="less" scoped>
//头部
    .lottery-info{
        background-color: #F2F3F9;
        height: 0.7rem;
        //background: #F2F3F9;
        .lotteryNum{
            padding-top: 0.1rem;
            font-size: 0.14rem;
            line-height: 0.25rem;
            color: #333;
            .prewNum{
                color: #f11717;
            }
        }
        ul{

            display: block;
            margin-top: -0.08rem;
            li{
                display: block;
                width: 20%;
                float: left;
                .dice{
                    display: inline-block;
                    width: 0.18rem;
                    height: 0.18rem;
                    border-radius: 50%;
                    background-color: #f11717;
                    color: #FFF;
                    vertical-align: middle;
                }
            }
        }
        
        .period-down-time{
            padding-top: 0.1rem;
            font-size: 0.14rem;
            line-height: 0.25rem;
            .countDown{
                font-size: 0.16rem;
                font-weight: 500;
                color: #f11717;
            }
        }
    }
</style>


