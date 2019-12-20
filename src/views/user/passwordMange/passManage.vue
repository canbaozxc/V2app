<template>
    <div class="passManage">
        <titleBar title="密码管理" />
        <div class="view-main">
            <div class="item" @click="rouLink('/user/passChange/1')">
                <span class="left">登录密码</span>
                <Icon class="icon"  type="ios-arrow-forward" />
            </div>
            <div class="item" @click="rouLink('/user/passChange/2')">
                <span class="left">资金密码</span>
                <Icon class="icon"  type="ios-arrow-forward" />
            </div>
        </div>
        
    </div>
    
</template>

<style lang="less" scoped>
    .view-main{
        margin-top: 0.15rem;
        margin-bottom: 0.25rem;
        background-color: #FFF;
        padding: 0 0.15rem;
        font-size: 0.14rem;
        .item{
            height: 0.45rem;
            line-height: 0.40rem;
            border-bottom: 1px solid #F2F3F9;
            padding-right: 0.22rem;
            position: relative;
            span{
                color: #333;
            }
            input{
                outline: none;
                border: 0;
                color: #999;
                text-align: right;
            }
            .icon{
                position: absolute;
                right: 0;
                font-size: 0.16rem;
                padding-top: 0.13rem;
            }
        }
    }
</style>
<script>
import { Icon } from "iview"
import titleBar from "@/components/public/Title-bar.vue"
import minxins from '@/js/minxins.js';
export default {
    name:"passManage",
    mixins: [ minxins ],
    data(){
        return{
        }
    },
    components:{
        titleBar,Icon
    },
    methods:{
        rouLink(url) {//页面跳转
            if(this.isLogin){
                this.$router.push(url);
            }else{
                //this.messLogin = true;
                /*this.$Modal.confirm({
                    title: '请先登录',
                    content: '您尚未登录，请先登录！点击立即登录，跳转到登录页面；点击取消，返回当前页面。',
                    okText: '立即登录',
                    cancelText: '取消'
                });*/
            }
        },
        bgColor(color){
            document.querySelector('body').setAttribute('style', 'background-color:'+color);
        }
    },
    mounted(){
        this.bgColor("#F2F3F9");
    }
}
</script>

