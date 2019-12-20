<!--转账金额选择rechangeMoney-->
<template>
    <div class="rechangeMoney">
        <component  v-bind:is="'titleBar'"  title="支付宝转账" > </component>
        <div class="h3">充值通道：</div>
        <!--选择金额-->
        <div class="chioose">
            <RadioGroup >
                    <Radio class="item" label="通道1（10~300元）"></Radio>
                    <Radio class="item" label="通道1（10~300元）"></Radio>
                    <Radio class="item" label="通道1（10~300元）"></Radio>
                    <Radio class="item" label="通道1（10~300元）"></Radio>
                    <Radio class="item" label="通道1（10~300元）"></Radio>
                    <Radio class="item" label="通道1（10~300元）"></Radio>
            </RadioGroup>
        </div>
        <div class="h3">充值金额：</div>
        <div class="chioose">
            <div class="box">
                <Input >
                    <span slot="append">元</span>
                </Input>
            </div>
            <div class="btnGroup">
                <div class="btnCh on">
                    10元
                </div>
                <div class="btnCh">
                    20元
                </div>
                <div class="btnCh">
                    50元
                </div>
                <div class="btnCh">
                    100元
                </div>
                <div class="btnCh">
                    500元
                </div>
                <div class="btnCh">
                    1000元
                </div>
                <div class="btnCh">
                    2000元
                </div>
                <div class="btnCh">
                   3000元
                </div>
            </div>
            <div class="clear"></div>

            
        </div>
        <Button type="error" long class="submit" @click="submit">确认</Button>
    </div>
</template>
<style lang="less">
.rechangeMoney{
    .chioose{
        
        
        .ivu-radio-checked:hover .ivu-radio-inner {
            border-color: #F13333;
            box-shadow: none;
        }
        .ivu-radio-inner:after {
            background-color:#F13333;
        }
        .ivu-radio-checked .ivu-radio-inner{
            border-color: #F13333;
        }
        .ivu-radio-checked .ivu-radio-focus{
            box-shadow: none;
        }
        .ivu-radio-checked:hover .ivu-radio-inner{
            border-color: #F13333;
        }
    }
}

</style>

<style lang="less" scoped>
.rechangeMoney{
    font-family:"MicrosoftYaHei";
    .chioose{
        background-color: #FFF;
        padding: 0.15rem 0 0.15rem 0.15rem ;
        .item{
            display: block;
            width: 50%;
            float: left;
            flex: 0 0 auto;
            margin: 0;
            height: 0.3rem;
            line-height: 0.3rem;
            font-size: 0.12rem;
            vertical-align: middle;
            position: relative;
            white-space: nowrap;
            cursor: pointer;
            text-align: left;
            color: #333333;
        }
        .box{
            padding-right: 0.15rem;
            margin-bottom: 0.15rem;
        }
        .btnGroup{
            .btnCh{
                width: 0.75rem;
                height: 0.4rem;
                line-height: 0.4rem;
                border:1px solid #C3C3C3;
                border-radius: 5px;
                color: #333;
                font-size: 0.12rem;
                margin: 0 0.15rem 0.1rem 0;
                float: left;
            }
            .on{
                border:1px solid #F13131;
                background: #F13131;
                color: #FFF;
            }
        }
        
    }
    .h3{
        height: 0.45rem;
        line-height: 0.45rem;
        font-size:0.14rem;
        font-weight:400;
        color:#333;
        line-height:0.46rem;
        text-align: left;
        padding-left: 0.15rem ;
    }
    .submit{
        height: 0.45rem;
        border-radius: 0.23rem;
        width: 3rem;
        font-size: 0.16rem;
        margin-top: 0.15rem;
    }
}
</style>
<script>
import minxins from '@/js/minxins.js';
import { RadioGroup,Radio,Input } from "iview"
export default {
    name:"rechangeMoney",
    mixins:[minxins],
    components:{
        RadioGroup,Radio,Input,
        titleBar:() => import("@/components/public/Title-bar.vue"),
    },
    data(){
        return{
            
        }
    },
    methods:{
        submit(){
            this.$router.push('/user/rechangeMoneyTwo')
        },
    },
    mounted(){
        this.bgColor("#F2F3F9");
    }
}
</script>

