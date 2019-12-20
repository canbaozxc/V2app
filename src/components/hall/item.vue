<template>
    <div class="li">
        <div class="img-ico">
            <img src="https://m.fyu6.com/upload/default/20181219/6a669641281792dad1292198e557127e.png" />
        </div>
        <div class="txt">
            <h3>{{lottory.name}}</h3>
            <p>全天{{lottory.daily_issue_count}}期</p>
            <div class="time">
            <span class="h">{{lottory.hh}}</span>:
            <span class="m">{{lottory.mm}}</span>:
            <span class="s">{{lottory.ss}}</span>
            </div>
        </div>
    </div>
</template>
<style lang="less" scoped>
.li{
    width: 50%;
    height: 0.86rem;
    float: left;
    border-bottom: 1px solid #F2F3F9;
    padding-left: 0.15rem;
    padding-top: 0.18rem;
    display: flex;
    .img-ico{
    width: 36%;
    img{
        width: 0.5rem;
        height: 0.5rem;
        margin-right: 0.08rem;
    }
    }
    .txt{
    width: 64%;
    text-align: left;
    h3{
        width: 100%;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
    /*倒计时*/
    .time{
        color:#F13131;
        span{
        padding: 0px 2px;
        color: #FFF;
        background: #F13131;
        border-radius: 3px;
        margin-right: 3px;
        }
    }
    }
    
}
.li:nth-child(2n){}
.li:nth-child(2n+1){ border-right: 1px solid #F2F3F9;}
</style>

<script>
import { setInterval, clearInterval } from 'timers';
export default {
    props:{
        item: {
            type: Object,
            default: {}
        },
        id:{
            type:String,
            default:'0'
        }
    },
    data(){
        return{
            lottory:this.item,
            time:'',//定时器
        }
    },
    methods:{
        //初始化倒计时间
        initDeffTime(lottory){
            let endTime = new Date(lottory.currentNumberTime*1000).getTime();
            let startTime = new Date(lottory.currentTime*1000).getTime();
            let diffTime = endTime - startTime;
            this.lottory.diffTime = diffTime;
        },
        //开始倒计时
        startDiff(){
            let _this = this;
            this.formatcurrentTime(this.lottory);
            clearInterval(this.time);
            this.time = setInterval(function(){
                _this.formatcurrentTime(_this.lottory);
                _this.lottory.diffTime-=1000;
                if(_this.lottory.diffTime<-1000){//当间隔时间小于0停止当前定时器，重新请求 
                    console.log(_this.lottory.diffTime);
                    clearInterval(_this.time);
                    //请求当前彩种的资料和时间计算
                    _this.updataItem()
                }
            },1000);
        },
        //格式化倒计时
        formatcurrentTime(lottory){
            let diffTime = lottory.diffTime;
            let hh,mm,ss = '';
            if(diffTime<=0){
                hh = '开',mm = '奖',ss = '中';
            }else{
                hh = this.addZero(Math.floor((diffTime / 1000 / 60 / 60) % 24));
                mm = this.addZero(Math.floor((diffTime / 1000 / 60) % 60));
                ss = this.addZero(Math.floor((diffTime / 1000) % 60));
            }
            
            this.lottory.hh = hh;
            this.lottory.mm = mm;
            this.lottory.ss = ss;
            this.$forceUpdate();
        },
        //更新当前资料
        updataItem(){
            console.log('暂无更新接口,当前id为：'+this.id); 
        },
        //补0函数
        addZero(num) {
            return num < 10 ? '0' + num : '' + num;
        },
    },
    created(){
        this.initDeffTime(this.lottory);
        this.startDiff();
    },
    //请同事注意：离开前清理页面定时器
    destroyed() {
        clearInterval(this.time)
    }

}
</script>
