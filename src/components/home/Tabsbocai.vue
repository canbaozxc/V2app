<template>
    <div id="Tabsbocai">
        <div class="swiper-container" id="swiper-container2">
            <swiper class="swiper-wrapper" id="swiper-wrapper2" :options="mySwiper2Option"  ref="mySwiper2">
                <swiper-slide class="swiper-slide li1" style="width: 130px;"  v-for="(item,key) in data" :key="key"  @click="checkClass(key)" >
                    {{item.name}}</swiper-slide>
            </swiper>
        </div>
        <div class="swiper-container" id="swiper-container3">
            <swiper class="swiper-wrapper dsad"  label="111" name="name1" :options="mySwiper3Option"  ref="mySwiper3">
                <swiper-slide type="flex" justify="start" align="middle" class="swiper-slide code-row-bg" v-for="(items,key,index) in data" :key="key">
                    <input type="hidden" name="itemKey" v-model="key"/>
                    <div v-if="lottory_list === undefined" style="text-align: center;width: 100%">没有了...</div>
                    <Col span="12" class="item l-bod" v-for="(item,key) in lottory_list" :key="key">
                        <router-link :to="'/game/'+item.identifier" class="info-box">
                            <Row>
                                <Col span="8" class="cai_ico"><img src="https://m.fyu6.com/upload/default/20181219/6a669641281792dad1292198e557127e.png" /></Col>
                                <Col span="16" class="cai_txt txt-left" >
                                    <h4>{{item.name}}</h4>
                                    <p>全天{{item.daily_issue_count}}期</p>
                                </Col>
                            </Row>
                        </router-link>
                    </Col>
                </swiper-slide>
            </swiper>
        </div>
    </div>
</template>
<style lang="less">
#Tabsbocai{
    .li1{
        height: 0.3rem;
        line-height: 0.3rem;
        background: #FFF;
        border-bottom: 1px solid #FFF;
        font-size: 0.12rem;
        font-weight: 500;
        color: #333;
    }
    #swiper-container2{
        border-bottom: 1px solid #dcdee2;
        .on{
            color: red;
        }
    }
    background-color: #FFF;
    .ivu-tabs{
        margin-bottom: 0.1rem;
    }
    .ivu-tabs-nav .ivu-tabs-tab {
        display: inline-block;
        height: 100%;
        padding: 0.08rem 0.06rem;
        font-size: 0.12rem;
        margin-right: 0px;
        font-weight: 400;
        box-sizing: border-box;
        cursor: pointer;
        text-decoration: none;
        position: relative;
        transition: color .3s ease-in-out;
        color:#666;
    }
    .ivu-tabs-ink-bar{
        background: none;
    }
    .ivu-tabs-nav .ivu-tabs-tab-active {
        color: #F13131;
        font-weight: bold;
    }
    .ivu-tabs-bar {
        height: 0.4rem;
        line-height: 0.4rem;
        margin-bottom:0;
    }

    .item{
        height: 0.85rem;
        padding-top: 0.17rem;
        padding-left: 0.2rem;
        float: left;
    }
    .l-bod{
        border-bottom: 1px solid #eee;
        border-right: 1px solid #eee;
    }
    .r-bod{
        border-bottom: 1px solid #eee;
    }
    .info-box{
        
        img {
            width: 0.5rem;
            height: 0.5rem;
            margin-right: 0.08rem;

        }
        .cai_ico{

        }
        .cai_txt{
            padding-top: 0.06rem;
            h4{
                margin-bottom: 0.04rem;
                color: #333 ;
                font-weight: 400;
                font-size: 0.12rem;
            }
            p{
                color: #666;
                font-size: 0.10rem;
            }
        }
    }
} 
</style>
<style lang="less" scoped>

</style>

<script>


import {Tabs,TabPane,Row,Col} from "iview"

export default {
    name:"Tabsbocai",
    data(){
        return{
            count: [],//总条数
            data:[],
            lottory_list:{},
            checkGanmeNum:'all',
            mySwiper2Option:{
                noSwiping: true,
                spaceBetween:12,
                slideToClickedSlide: true,
                observer:true,//修改swiper自己或子元素时，自动初始化swiper
                observeParents:true,//修改swiper的父元素时，自动初始化swiper
                watchSlidesProgress : true,
                watchSlidesVisibility : true,
                slidesPerView : 6,
                initialSlide:1,
                on:{
                    tap: (event) => {
                        console.log(this)
                        this.mySwiper3.slideTo(this.mySwiper2.clickedIndex);
                    }
                }
            },
            mySwiper3Option:{
                observer:true,//修改swiper自己或子元素时，自动初始化swiper
                observeParents:true,//修改swiper的父元素时，自动初始化swiper
                on:{
                    slidePrevTransitionEnd:() =>{
                        this.slideNext = true;
                        this.updateTabsbocai();
                    },
                    slideNextTransitionEnd:() =>{
                        this.slideNext = false;
                        this.updateTabsbocai();
                    },
                }
            }
        }
    },
    computed: {
      mySwiper2() {
        return this.$refs.mySwiper2.swiper
      },
      mySwiper3() {
        return this.$refs.mySwiper3.swiper
      },
    },
    components:{
        Tabs,TabPane,Row,Col
    },
    methods:{
        tapfdsfd(key){
            console.log(key);
        },
        checkClass(key){
            let vm = this;
            this.checkGanmeNum = key;
            if(key==='all'){
                this.lottory_list = this.data[key];
            }else{
                this.lottory_list = this.data[key].lotteries;
            }
            this.$forceUpdate();
            $('#swiper-container2 .swiper-slide-active').removeClass('on');
            var activeNav = $('#swiper-container2 .swiper-slide').eq(this.mySwiper3.activeIndex).addClass('on');
            var thumbsPerNav = Math.floor(this.mySwiper2.width/activeNav.width()+1)-6
            this.mySwiper2.slideTo(activeNav.index()-thumbsPerNav)
        },
        updateTabsbocai(){
            let itemKey = $('#swiper-container3 .swiper-slide').eq(this.mySwiper3.activeIndex).find("input[name=\"itemKey\"]")[0].value;
            this.checkClass(itemKey)
            $('#swiper-container2 .on').removeClass('on')
            var activeNav = $('#swiper-container2 .swiper-slide').eq(this.mySwiper3.activeIndex).addClass('on');
            if (!activeNav.hasClass('swiper-slide-visible')) {
                console.log(1);
                if (activeNav.index()>this.mySwiper2.activeIndex) {
                    console.log(2);
                    var thumbsPerNav = Math.floor(this.mySwiper2.width/activeNav.width()+1)-6
                    this.mySwiper2.slideTo(activeNav.index()-thumbsPerNav)
                }
                else {
                    console.log(3);
                    this.mySwiper2.slideTo(activeNav.index())
                }
            }
        },
        //遍历分析数据data级别遍历
        traverseData(data,fun){
            for(let k in data){
                if(k==='all'){
                    //处理全部彩种的方式
                    if(fun){
                        data[k] = fun(data[k]);
                    }

                }else{
                    //处理其他类型的方式
                    if(fun&&data[k].lotteries){
                        //console.log(data[k].lotteries);
                        data[k].lotteries = fun(data[k].lotteries);
                    }
                }
            }
            this.data = data;
            this.$forceUpdate();
        },
        async getGameList() {
            let vm = this;
            let res = await this.$api.getGameList();
            let data = res.data;
            if (res.errno === 0) {
                let data = res.data;
                let all = {name:'全部彩种'};
                data.all = Object.assign(data.all,all);
                this.data = data;
                console.log(this.data)
            }
            let _this = this;
            //循环便利出所有数据
            this.traverseData(data, this.initDifftime);
            //初始化数据lottory_list数据
            this.lottory_list = this.data[this.checkGanmeNum];
            //倒计时定时器
            clearInterval(this.timer);
            this.timer = setInterval(function () {
                _this.traverseData(data, _this.formatcurrentTime);
            }, 1000)
            setTimeout(()=>{
                //document.getElementById("swiper-wrapper2").style.transform="translate3d(0px, 0px, 0px)"
                vm.mySwiper2.slideTo(0);
                $('#swiper-container2 .swiper-slide').eq(0).addClass('on')
            },50)
        },

    },
    created(){
        this.getGameList();
    },
    mounted(){
        let vm = this;
        // this.mySwiper2 = new Swiper('#swiper-container2',{
        //     noSwiping: true,
        //     spaceBetween:12,
        //     slideToClickedSlide: true,
        //     observer:true,//修改swiper自己或子元素时，自动初始化swiper
        //     observeParents:true,//修改swiper的父元素时，自动初始化swiper
        //     watchSlidesProgress : true,
        //     watchSlidesVisibility : true,
        //     slidesPerView : 6,
        //     initialSlide:1,
        //     on:{
        //         tap: function(event){
        //             vm.mySwiper3.slideTo(vm.mySwiper2.clickedIndex);
        //         }
        //     }
        // })
        // this.mySwiper3 = new Swiper('#swiper-container3',{
        //     observer:true,//修改swiper自己或子元素时，自动初始化swiper
        //     observeParents:true,//修改swiper的父元素时，自动初始化swiper
        //     on:{
        //         slidePrevTransitionEnd:function(){
        //             vm.slideNext = true;
        //             vm.updateTabsbocai();
        //         },
        //         slideNextTransitionEnd:function(){
        //             vm.slideNext = false;
        //             vm.updateTabsbocai();
        //         },
        //     }
        // })

         },
    //请同事注意：离开前清理页面定时器
    destroyed() {
        clearInterval(this.timer);
    }
}
</script>

