<template>
    <Row class="notice">
        <Col span="4" class="mg_ico">
            <img src="../../assets/notice.png">公告
        </Col>
        <Col span="18">
                <marquee id="marqueeWrap" loop="infinite" behavior="scroll" direction="left">
                    {{value}}
                </marquee>
        </Col>
        
        <Col span="2" class="lg_ico"><img src="../../assets/more.png"></Col>
    </Row>
</template>
<style lang="less"  scoped>
.notice{
    height: 0.35rem;
    background-color: #FFF;
    line-height: 0.35rem;
    overflow: hidden;
    a{
        color: #333;
    }
    .mg_ico{
        color: #FF8700;
        font-size: 0.12rem;
        img{
            width: 0.14rem;
            vertical-align:middle;
            margin-top: -0.03rem;
        }
    }
    .lg_ico{
        font-size: 0.14rem;
        img{
            height: 0.1rem;
            vertical-align:middle;
            margin-top: -0.03rem;
        }
    }
}

</style>
<script>
import {Row,Col,Icon} from "iview"
export default {
    name: "Notice",
    props:{
        value:{
            type:String,
            default:"尊敬的会员您好,欢迎光临-易发彩票官方网址018381.com彩票奢华之旅等您开启在这里您将感受到与众不同，前所未有的游戏体验，我们的信誉保证，品牌卓越，是您最明智的网投选择！！！"
        },
    },
    components:{
        Row,Col,Icon
    },
    watch:{
        value:{  
            handler:function(val,oldval){ 
                if(val!=oldval){
                    this.$nextTick(()=>{
                        //this.init(val);
                        //console.log(val);
                    })
                }
            },  
            immediate:true,//关键
            deep:true
        },
    }
}

</script>

