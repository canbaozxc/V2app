<template>
    <div class="topTop" @click="backTop">
        <img src="../../assets/backTop.png" />
    </div>
</template>
<style lang="less" scoped>
.topTop{
    width: 0.3rem;
    height: 0.3rem;
    position: fixed;
    bottom:0.5rem;
    right: 0.2rem;
    z-index: 12;
    display: none;
    img{
        width: 0.3rem;
        height: 0.3rem;
    }
}
</style>
<script>
import { Icon} from "iview"
export default {
    components:{
        Icon
    },
    methods:{
        //返回顶部
        backTop() {
            $(".ivu-scroll-container").scrollTop(0)
        },
    },
    mounted(){
        let _this = this;
        $(function(){
        let wH = $(window).height()
        let soll = '';
        $(".ivu-scroll-container").scroll(function () {
            soll = $(".ivu-scroll-container").height() - wH - $(".ivu-scroll-container").scrollTop();
            if($(".ivu-scroll-container").scrollTop()>200){
                $(".topTop").css("display","block");
            }else{
                $(".topTop").css("display","none");
            }
            
        })
        
        })
    }
}
</script>


