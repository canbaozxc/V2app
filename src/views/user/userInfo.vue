<template>
    <div class="userInfo">
        <Modal  v-model="updateNikeName"  :mask-closable="false" style="width: 3rem">
            <p slot="header" style="color:#f60;text-align:center">
            </p>
            <div style="font-size:0.14rem">
                <Row type="flex" justify="start" align="middle" class="code-row-bg">
                    <Col  span="24">
                                <span style="font-size:0.14rem">旧昵称:{{nickname}}</span>
                    </Col>
                </Row>
            </div>
                <div style="font-size:0.14rem;margin-top: 0.1rem">
                    <Row type="flex" justify="start" align="middle" class="code-row-bg">
                        <Col  span="24">
                                    新昵称：<input type="text" style="width: 70%" v-model="formNickName.upNickName" placeholder="请输入新的昵称">
                        </Col>
                    </Row>
                </div>
            <div slot="footer">
                <Button type="error" size="large"   shape="circle" @click="submitNickName">确定</Button>
                <Button type="primary" size="large"   shape="circle" @click="getEsx">取消</Button>
            </div>
        </Modal>
        <titleBar title="个人信息" />
        <div class="view-main">
            <div class="item">
                <span class="left">登录账号</span>
                <p class="right">{{username}}</p>
            </div>
            <div class="item">
                <span class="left">你的昵称</span>
                <Icon class="icon"  type="ios-arrow-forward" @click="showUpdateNikeName"/>
                <p class="right" style="color: #f20707">{{formNickName.upNickName}}</p><p class="right" style="color: #e6070759"  v-show="formNickName.upNickName">&rarr;</p><p class="right">{{nickname}}</p>
                
            </div>
            <div class="item">
                <span class="left">真实姓名</span>
                <Icon class="icon" type="ios-arrow-forward" />
                <input class="right" type="text" value="李四" />

            </div>
        </div>
        <div class="submit">
            <Button type="error" long @click="submitAll" :disabled="isdisabled">修改</Button>
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
    .submit{
        margin: 0 0.4rem;

        button{
            height: 0.45rem;
            font-size: 0.16rem;
            border-radius: 0.225rem;
        }
    }
</style>
<style lang="less">
    .ivu-modal-body {
        border-top-right-radius: 8px;
        padding: 16px;
        font-size: 12px;
        line-height: 1.5;
        background-color: #fff;
        border-top-left-radius: 8px;
    }
    .ivu-modal-footer {
        border-bottom-right-radius: 8px;
        background-color: #fff;
        text-align: right;
        border-bottom-left-radius: 8px;
    }
    .ivu-modal-close {
        border-radius: 20px;
        border: 1px solid #f8f8f9;
        z-index: 1;
        font-size: 10px;
        position: absolute;
        right: 3px;
        top: 15px;
        overflow: hidden;
        cursor: pointer;
    }
    .ivu-modal-close .ivu-icon-ios-close {
        font-size: 20px;
        color: #f8f8f9;
        transition: color .2s ease;
        position: relative;
        top: 0px;
    }
    .ivu-modal-content {
        position: relative;
        background-color:transparent!important;
        border: 0;
        border-radius: 6px;
        background-clip: padding-box;
        box-shadow: 0 4px 12px rgba(0,0,0,0);
    }
    .ivu-modal-close {
        border-radius: 20px;
        border: 1px solid #f8f8f9;
        z-index: 1;
        font-size: 10px;
        position: absolute;
        right: 3px;
        top: 16px;
        overflow: hidden;
        cursor: pointer;
    }
    .ivu-modal-footer {
        border-top: 0px solid #e8eaec !important;
        padding: 0px 30px 26px 30px!important;
        text-align: right;
    }
    .ivu-btn-error:hover {
        color: #fff;
        background-color: #f13131;
        border-color: #f13131;
    }
    .ivu-modal {
        width: auto!important;
        margin: 60px !important;
    }
    .ivu-modal-header {
        border-bottom: 0px solid #e8eaec00 !important;
        padding: 14px 16px;
        line-height: 1;
    }
    .ivu-modal-footer {
        border-top: 0px solid #e8eaec !important;
        padding: 12px 18px 12px 18px;
        text-align: right;
    }

</style>
<script>
import { Icon,Modal,Button,Row,Col } from "iview"
import titleBar from "@/components/public/Title-bar.vue"
import minxins from '@/js/minxins.js';
export default {
    name:"userinfo",
    data(){
        return{
            isdisabled:true,
            formNickName:{
                upNickName:'',
            },
            updateNikeName:false,
            username:'',//登录账号
            nickname:'',//昵称
        }
    },
    components:{
        titleBar,Icon,Modal,Button,Row,Col
    },
    mixins: [ minxins ],
    methods:{
    },
    mounted(){
        this.bgColor("#F2F3F9");
    },
    methods:{
        //提交修改
        async submitAll(){
            let pream={
                    nickname:this.formNickName.upNickName
            };
            let res = await this.$api.setUserInfo(pream);
            if(!res.error){
                this.$Message.success("昵称修改成功！")
                this.$router.go(-1);
            }else{
                this.$Message.error(res.error);
            }
        },
        //显示修改名称弹框
        showUpdateNikeName(){
            this.updateNikeName = true;
            this.formNickName.upNickName = "";
            this.isdisabled = true;
        },
        //校验昵称并回填
        submitNickName (){
            if(this.formNickName.upNickName){
                if(this.formNickName.upNickName.length<2 || this.formNickName.upNickName.length>10){
                    this.$Message.error('新的昵称长度不能小于1，大于10!');
                }else{
                    this.updateNikeName = false;
                    this.isdisabled = false;
                }
            }else{
                this.$Message.error('新的昵称不能为空!');
            }
        },
        //关闭弹框
        getEsx(){
            this.updateNikeName = false;
            this.formNickName.upNickName = "";
            this.isdisabled = true;
        },
        //初始化数据
        init (){
            //获取用户信息
            this.getCurrentUserInfo();
        },
        //获取用户信息
        async getCurrentUserInfo(){
            let res = await this.$api.getCurrentUserInfo();
            if(res && res.data){
                console.log(res)
                this.username = res.data.username || '';
                this.nickname = res.data.nickname || '';
            }
        }
    },
    created(){
      this.init();
    }
}
</script>

