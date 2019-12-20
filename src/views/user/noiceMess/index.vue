<template>
    <div class="noice">
        <titleBar title="公告消息" />
        <div class="main">
            <div class="notice_box" v-for="(item,index) in dataList" :key="index" @click="changdown(index)">
                <div class="title">
                    <div class="left">
                        <span class="span yellow">公告</span>
                        <div class="bar">系统公告</div>
                    </div>
                    <div class="ico">
                        <Icon type="ios-arrow-down" class="select-arrow" :class="item.isDown?'rdeg':''"/>
                    </div>
                    <div class="time">{{item.created_at}}</div>
                </div>
                <div class="body">
                    <h3 class="h_txt">{{item.title}}</h3>
                    <div class="p_txt" :class="item.isDown?'':'showEllipsis'">{{item.content}}</div>
                </div>
                <div class="bottom"></div>
            </div>
        </div>
    </div>
</template>
<style lang="less" scoped>
    .showEllipsis{
        text-overflow:ellipsis;/* 超出部分显示省略号 */
        white-space: nowrap;/*规定段落中的文本不进行换行 */
        overflow: hidden;/*超出部分隐藏*/
    }
    .rdeg{
        transform:rotate(-180deg) !important;
    }
    .noice{
        .yellow{
            background-color: #FE901F;
        }
        .main{
            padding: 0 0.15rem;
            .notice_box{
                background: #FFF;
                border-radius: 5px;
                margin-top:0.1rem;
                .title{
                    padding:0 0.15rem;
                    height: 0.3rem;
                    line-height: 0.3rem;
                    border-bottom: 1px solid #F2F3F9;
                    .span{
                        margin-top: 0.06rem;
                        height: 0.18rem;
                        line-height: 0.18rem;
                        font-size: 0.12rem;
                        padding:1px 0.06rem;
                        color:#FFF;
                        float: left;
                        border-radius: 3px;
                    }
                    .bar{
                        float: left;
                        padding-left:0.05rem;
                        font-size: 0.14rem;
                        font-weight: 600;
                    }
                    .ico{
                        float: right;
                        position: relative;
                        width: 0.14rem;
                        height: 0.3rem;
                        padding-top: 0.07rem;
                        .select-arrow {
                            position: absolute;
                            right: 0;
                            line-height: 1;
                            transform:rotate(0deg);
                            font-size: 14px;
                            color: #808695;
                            transition: all .2s ease-in-out;
                        }
                    }
                    .time{
                        float:right;
                        color: #999;
                        font-size: 12px;
                        padding-right: 0.13rem;
                    }
                }
                .body{
                    text-align: left;
                    padding: 0 0.15rem;
                    line-height: 0.24rem;
                    .h_txt{
                        color: #333;
                        font-size: 0.12rem;
                        font-weight: 600;

                    }
                    .p_txt{
                        color: #333;
                        font-size: 0.12rem;
                        word-wrap:break-word;
                    }
                }
                .bottom{
                    height: 0.15rem;
                }
            }
        }
    }
</style>


<script>
    import { Icon } from "iview"
    import titleBar from "@/components/public/Title-bar.vue"
    import minxins from '@/js/minxins.js';
    export default {
        name:"noice",
        mixins:[minxins],
        components:{
            titleBar,
            Icon
        },
        data(){
            return{
                isDown:false,
                dataList:[
                    {
                        id:'',
                        title:'',
                        content:'',
                        isDown:'',
                    }
                ]
            }
        },
        methods:{
            changdown(index){
                this.dataList[index].isDown = !this.dataList[index].isDown;
                console.log(this.dataList[index]);
                this.$forceUpdate();
            },
            decode(text){
                var div = document.createElement("div");
                div.innerHTML = text;
                text = div.innerText || div.textContent;
                div = null;
                return text;
            },
            //初始化
            init(){
                this.getNoticeList();
            },
            //获取公告列表
            async getNoticeList(){
                let res = await this.$api.getNoticeList();
                if(res && res.data && res.data.length>0){
                    let dataList = res.data.sort(function(a,b){
                        return b.created_at > a.created_at ? 1 : -1
                    });
                    this.dataList=dataList;
                    for (let i = 0; i < this.dataList.length; i++) {
                        this.getNoticeDetail(this.dataList[i].id)
                    }
                    this.dataList.concat(this.dataList)
                }
            },
            //获取公告详情
            async getNoticeDetail(id){
                let params = {
                    id : id
                }
                let res = await this.$api.getNoticeDetail(params);
                if(res && res.data){
                    for (let k = 0; k < this.dataList.length; k++) {
                        if(this.dataList[k].id == id){
                            this.dataList[k].content = this.decode(res.data.content);
                            this.dataList[k].isDown = false;
                            this.$forceUpdate();
                            console.log(this.dataList[k])
                        }
                    }
                }
            },

        },
        created(){
            this.init();
        },
        mounted(){
            //let oDiv = document.getElementById("div1");
            this.bgColor("#F2F3F9");
        },
        watch:{
            dataList(val){
                console.log(val)
            },
        },
    }
</script>

