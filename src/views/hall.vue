<template>
    <div class="hall">
        <titleBar title="购彩大厅"><router-link to="/hallAll">全部彩种</router-link></titleBar >
        <div class="scollTop" id="scollTop" >
            <div id="fixAll">
                <div  class="fixAll on"  @click="checkClass('all')">
                    全部彩种
                </div>
            </div>
            <div class="swiper-container con" id="swiper-container1">
                <swiper class="swiper-wrapper"  :options="mySwiper2Option"  ref="mySwiper1">
                    <swiper-slide  class="swiper-slide" v-show=false></swiper-slide>
                    <swiper-slide  class="swiper-slide li1" :class="checkGanmeNum===key?'on':''" v-for="(item,key,index) in data" :key="key" v-if="key!=='all'" :title="key"  @click="checkClass(key)">{{item.name}}</swiper-slide>
                </swiper>
            </div>
        </div>
        <div class="swiper-container main" id="swiper-container3">
            <swiper class="lottory_list swiper-wrapper" :options="mySwiper3Option"  ref="mySwiper3">
                <swiper-slide class="swiper-slide" style="margin-right: 0px !important;">
                    <div class="li" v-for="(item,key) in lottory_list" :key="key">
                        <router-link :to="'/game/'+item.identifier">
                            <div class="img-ico">
                                <img src="https://m.fyu6.com/upload/default/20181219/6a669641281792dad1292198e557127e.png" />
                            </div>
                            <div class="txt">
                                <h3>{{item.name}}</h3>
                                <p>全天{{item.daily_issue_count}}期</p>
                                <div class="time">
                                    <span class="h">{{item.hh}}</span>:
                                    <span class="m">{{item.mm}}</span>:
                                    <span class="s">{{item.ss}}</span>
                                </div>
                            </div>
                        </router-link>
                    </div>
                </swiper-slide>
                <swiper-slide class="swiper-slide" v-for="(items,key,index) in data" :key="key" style="margin-right: 0px !important;">
                    <input type="hidden" name="itemKey" v-model="key"/>
                    <div v-if="lottory_list === undefined" style="text-align: center;width: 100%">没有了...</div>
                    <div class="li" v-for="(item,key) in lottory_list" :key="key">
                        <a @click="rouLink('/game/'+item.identifier)">
                            <div class="img-ico">
                                <img src="https://m.fyu6.com/upload/default/20181219/6a669641281792dad1292198e557127e.png" />
                            </div>
                            <div class="txt">
                                <h3>{{item.name}}</h3>
                                <p>全天{{item.daily_issue_count}}期</p>
                                <div class="time">
                                    <span class="h">{{item.hh}}</span>:
                                    <span class="m">{{item.mm}}</span>:
                                    <span class="s">{{item.ss}}</span>
                                </div>
                            </div>
                        </a>
                    </div>
                </swiper-slide>
                <!--liTem v-for="(item,key) in lottory_list" :key="key" :id="key" :item="item" /-->
            </swiper>
            <div class="clear"></div>
        </div>
        <!-- 如果需要导航按钮 -->
        <bottomNavbar />
    </div>
</template>
<style lang="less" scoped>
    #swiper-container3{
        .swiper-slide{
            /*margin-right: 0px!important;*/
            /*width: 3.6rem !important;*/
           // background-color: #e8eaec85;
        }
        .swiper-slide{min-height:8rem;} /* 随意指定一个height值即可 */
        .swiper-slide-active { height:auto;}
    }
    #swiper-container1{
        width: 100%;
        .swiper-slide{
           // width: 0.96rem !important;
        }
    }
    .hall{
        .scollTop{
            .on{
                border-bottom:1px solid #F13131;
                color: #F13131;
            }
            padding-left:25%;
            height: 0.46rem;
            position: relative;
            .fixAll{
                position: absolute;
                left: 0;
                top: 0;
                background: #FFF;
                font-size: 0.14rem;
                color: #333;
                width: 25%;
                height: 0.46rem;
                line-height: 0.46rem;
                box-shadow:2px 2px 2px #F2F3F9;
                z-index: 10;
                font-weight: 500;
            }
            .con{
                height: 0.46rem;
                overflow: hidden;
                position: relative;

                /*.ul{*/
                /*position: absolute;*/
                /*left: 0;*/
                /*top: 0;*/
                //transition: all 0.1s;
                //transform: translateX(0px);
                .li1{
                    height: 0.46rem;
                    line-height: 0.46rem;
                    background: #FFF;
                    border-bottom:1px solid #FFF;
                    font-size: 0.14rem;
                    font-weight: 500;
                    color: #333;
                }
                .on{
                    border-bottom:1px solid #F13131;
                    color: #F13131;
                }
                /*}*/
            }
        }
        .main{
            margin-top:0.15rem;
            //padding: 0 0.22rem;
           // background: #FFF;
            .lottory_list{
                width:100%;
                .li{
                    width: 50%;
                    height: 0.86rem;
                    float: left;
                    background-color: #FFF;
                    border-right: 1px solid #F2F3F9;
                    border-bottom: 1px solid #F2F3F9;
                    padding-left: 0.15rem;
                    padding-top: 0.18rem;
                    display: flex;
                    a{
                        display: flex;
                        color: #333;
                        width: 100%;
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


                }
                .li:nth-child(2n){}
                .li:nth-child(2n+1){ border-right: 1px solid #F2F3F9;}
            }
        }
    }
</style>



<script>

   
    import bottomNavbar from '@/components/public/Navbar.vue'
    import titleBar from "@/components/public/Title-bar.vue"
    import minxins from '@/js/minxins.js';
    import { setTimeout, setInterval,clearInterval } from 'timers';
    export default {
        name:"hall",
        mixins: [ minxins ],
        components: {
            bottomNavbar,
            titleBar,
            
        },
        data(){
            return{
                slideNext:false,
                keyList:false,
                data:{},
                checkGanmeNum:'all',
                hallData:{},//购彩大厅全部数据
                lottory_list:{},
                timer:'',//定时器
                mySwiper2Option:{
                    slideToClickedSlide: true,
                    width:93,
                    observer:true,//修改swiper自己或子元素时，自动初始化swiper
                    observeParents:true,//修改swiper的父元素时，自动初始化swiper
                    watchSlidesProgress : true,
                    watchSlidesVisibility : true,
                    slidesPerView :1,
                    loop:false,
                    touchRatio:0.5,
                    on:{
                        tap: (event) => {
                            console.log(event.target.title);
                            this.checkClass(event.target.title);
                            if(this.mySwiper1.clickedIndex <=2){
                                this.mySwiper1.slideTo(0);
                            }
                            if(this.mySwiper1.clickedIndex > 2 && this.mySwiper1.clickedIndex < 9){
                                this.mySwiper1.slideTo(this.mySwiper1.activeIndex-2);
                            }
                            if(this.mySwiper1.clickedIndex > 9){
                                this.mySwiper1.slideTo(this.mySwiper1.activeIndex);
                            }
                            if(this.mySwiper1.activeIndex  == 8){
                                this.mySwiper1.slideTo(this.mySwiper1.activeIndex - 1);
                            }
                            if(this.mySwiper1.activeIndex  == 9){
                                this.mySwiper1.slideTo(this.mySwiper1.activeIndex - 2);
                            }
                            this.mySwiper3.slideTo(this.mySwiper1.clickedIndex);
                            // if(this.mySwiper1.clickedIndex>0){
                            //     this.mySwiper1.slideTo(this.mySwiper1.clickedIndex)
                            // }

                        },
                        touchMove:(swiper) =>{
                            if(this.mySwiper1.activeIndex >= 7){
                                this.mySwiper1.allowSlideNext = false;
                            }else{
                                this.mySwiper1.allowSlideNext = true;
                            }
                            if(this.mySwiper3.activeIndex === 10){
                                this.mySwiper3.allowSlideNext = false;
                            }else{
                                this.mySwiper3.allowSlideNext = true;
                            }

                        },
                    },
                },
                mySwiper3Option:{
                    speed:100,
                    noSwiping : true,
                    on: {
                        touchMove:(swiper) => {
                            if(this.mySwiper3.activeIndex === 10){
                                this.mySwiper3.allowSlideNext = false;
                            }else{
                                this.mySwiper3.allowSlideNext = true;
                            }
                            if(this.mySwiper1.activeIndex >= 7){
                                this.mySwiper1.allowSlideNext = false;
                            }else{
                                this.mySwiper1.allowSlideNext = true;
                            }
                        },
                        slidePrevTransitionEnd:() => {
                            this.slideNext = true;
                            this.updateNavPosition();
                        },
                        slideNextTransitionEnd:() => {
                            this.slideNext = false;
                            this.updateNavPosition();
                        },

                    },
                    slidesPerView :1,
                    spaceBetween:11,
                    observer: true, //修改swiper自己或子元素时，自动初始化swiper
                    observeParents: true //修改swiper的父元素时，自动初始化swiper
                }
            }
        },
        computed: {
            mySwiper1() {
                return this.$refs.mySwiper1.swiper
            },
            mySwiper3() {
                return this.$refs.mySwiper3.swiper
            },
        },
        methods : {
            updateNavPosition(){
                let vm = this;
                let itemKey = '';
                if(this.mySwiper3.activeIndex === 0){
                    itemKey = 'all';
                }else{
                    itemKey = $('#swiper-container3 .swiper-slide').eq(this.mySwiper3.activeIndex).find("input[name=\"itemKey\"]")[0].value;
                }
                this.checkClass(itemKey)
                if(this.mySwiper3.activeIndex === 1){
                    $('#fixAll .on').removeClass('on');
                }
                if(this.mySwiper3.activeIndex === 0){
                    $('#fixAll .fixAll').addClass('on');
                }
                $('#swiper-container1 .on').removeClass('on');
                var activeNav = $('#swiper-container1 .swiper-slide').eq(this.mySwiper3.activeIndex).addClass('on');
                if (!activeNav.hasClass('swiper-slide-visible')) {
                    if (activeNav.index()>=this.mySwiper1.activeIndex) {
                        var thumbsPerNav = Math.floor(this.mySwiper1.width/activeNav.width()+1)
                        this.mySwiper1.slideTo(activeNav.index()-thumbsPerNav)
                    }
                    else {
                        if(vm.slideNext === true){
                            this.mySwiper1.slideTo(activeNav.index()-1)
                        }else{
                            this.mySwiper1.slideTo(activeNav.index())
                        }

                    }
                }
            },
            checkClass(key){
                console.log(key);
                this.checkGanmeNum = key;
                if(key==='all'){
                    $('#fixAll .fixAll').addClass('on');
                    this.lottory_list = this.data[key];
                }else{
                    $('#fixAll .on').removeClass('on');
                    this.lottory_list = this.data[key].lotteries;
                }
                let vm = this;
                if(this.mySwiper1.activeIndex >= 7){
                    this.mySwiper1.allowSlideNext = false;
                }else{
                    this.mySwiper1.allowSlideNext = true;
                }
            },
            //获取单项游戏倒计时
            async getIssueListForRefresh(id,data){
                let pream = {
                    'lottery_id':id
                }
                let res = await this.$api.getIssueListForRefresh(pream);
                //let itemData = res.data
                //初始化单项倒计时
                return res;
            },
            //单项倒计时刷新
            UpDataItemRefresh(id,data){
                let res = this.getIssueListForRefresh(id,data);
                let _this = this;
                res.then(function(value){
                    data.currentNumber = value.data.currentNumber;
                    data.diffTime = _this.initIssueRefrech(value.data);
                })
                return data;
            },
            //初始化单项倒计时
            initIssueRefrech(itemData){
                let endTime,startTime = '';
                endTime = new Date(itemData.currentNumberTime*1000).getTime();
                startTime = new Date(itemData.currentTime*1000).getTime();
                itemData.diffTime = endTime-startTime;
                return itemData.diffTime;
            },
            //请求所有购彩大厅数据
            async getGameList(){
                let res = await this.$api.getGameList();
                let data = res.data;
                if(res.errno ===0){
                    this.data = res.data;
                }
                let _this = this;
                //循环便利出所有数据
                this.traverseData(data,this.initDifftime);
                //初始化数据lottory_list数据
                this.lottory_list = this.data[this.checkGanmeNum];
                //倒计时定时器
                clearInterval(this.timer);
                this.timer = setInterval(function(){
                    _this.traverseData(data,_this.formatcurrentTime);
                },1000)
                setTimeout(function(){
                    //_this.hallCheckLottoryCLassforJs();
                },30)
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
            //初始化倒计时间lottory_list级别遍历
            initDifftime(data){
                let endTime,startTime = '';
                for(let i in data){
                    endTime = new Date(data[i].currentNumberTime*1000).getTime();
                    startTime = new Date(data[i].currentTime*1000).getTime();
                    data[i].diffTime = endTime - startTime;
                    if(data[i].diffTime<=0||!data[i].diffTime){
                        data[i].hh = '开';
                        data[i].mm = '奖';
                        data[i].ss = '中';
                    }else{
                        data[i].hh = this.addZero(Math.floor((data[i].diffTime / 1000 / 60 / 60) % 24));
                        data[i].mm = this.addZero(Math.floor((data[i].diffTime / 1000 / 60) % 60));
                        data[i].ss = this.addZero(Math.floor((data[i].diffTime / 1000) % 60));
                    }
                }
                return data;
            },
            //格式化lottory_list级别遍历
            formatcurrentTime(data){
                for(let i in data){
                    data[i].diffTime -=1000;
                    if(data[i].diffTime<=0||!data[i].diffTime){
                        data[i].hh = '开';
                        data[i].mm = '奖';
                        data[i].ss = '中';
                        //console.log(i);
                        data[i] = this.UpDataItemRefresh(i,data[i]);

                    }else{
                        data[i].hh = this.addZero(Math.floor((data[i].diffTime / 1000 / 60 / 60) % 24));
                        data[i].mm = this.addZero(Math.floor((data[i].diffTime / 1000 / 60) % 60));
                        data[i].ss = this.addZero(Math.floor((data[i].diffTime / 1000) % 60));
                    }
                }
                return data;
            },
            //补0函数
            addZero(num) {
                return num < 10 ? '0' + num : '' + num;
            },
            //购彩大厅菜系选择
            hallCheckLottoryCLassforJs(){
                let _this = this;
                let oMain = document.getElementById('scollTop');
                let oUl = this.getByClass(oMain,'ul')[0];
                let aLi = this.getByClass(oUl,'li');
                let oCon = this.getByClass(scollTop,'con')[0];
                //1.设置每一个li项的宽度
                let liW = Math.floor($(document).width()/4);
                for(let i=0;i<aLi.length;i++){
                    aLi[i].style.width = liW+'px';
                }
                //2.根据li项设置ul的宽度
                let ulW = aLi.length*liW;
                let bodR = ulW- oCon.offsetWidth;
                oUl.style.width = ulW+'px';
                //console.log(oCon);
                //3.让oUl可以横向拖拽
                oUl.ontouchstart = function(e){
                    let startX = parseInt(e.targetTouches[0].clientX);
                    let disX = startX - this.offsetLeft;
                    let tisX = startX - parseInt(_this.getStyle(this,'transform').replace(/[^0-9\-,]/g,'').split(',')[4]);
                    oUl.style.transition = 'none';
                    document.ontouchmove = function(e){
                        let l = parseInt(e.targetTouches[0].clientX) - tisX;
                        //设定边界
                        if(l>=0){
                            l = 0;
                        }
                        if(l<=-bodR){
                            l = -bodR;
                        }
                        //oUl.css('transform','translateX('+l+'px)');
                        oUl.style.transform = 'translateX('+l+'px)';
                    }
                    document.ontouchend = function(){
                        document.ontouchmove = null;
                        document.ontouchend = null;
                    }
                }
                //4.增加自动偏移事件
                for(let i = 0;i<aLi.length;i++){
                    aLi[i].index = i;
                    aLi[i].onclick = function(){
                        let i = this.index-1;
                        let l = -i*liW;
                        if(l>=0){
                            l = 0;
                        }
                        if(l<=-bodR){
                            l = -bodR;
                        }
                        oUl.style.transition = 'all 0.1s';
                        oUl.style.transform = 'translateX('+l+'px)';
                    }
                }
            }
        },
        created(){
            this.getGameList();
        },
        mounted:function () {
            console.log("111111111111");
            let vm = this;
            // this.mySwiper1 = new Swiper('#swiper-container1',{
            //     slideToClickedSlide: true,
            //     width:93,
            //     observer:true,//修改swiper自己或子元素时，自动初始化swiper
            //     observeParents:true,//修改swiper的父元素时，自动初始化swiper
            //     watchSlidesProgress : true,
            //     watchSlidesVisibility : true,
            //     slidesPerView :1,
            //     loop:false,
            //     touchRatio:0.5,
            //     on:{
            //         tap: function(event){
            //             console.log("3333333333");
            //             if(this.mySwiper1.clickedIndex <=2){
            //                 this.mySwiper1.slideTo(0);
            //             }
            //             if(this.mySwiper1.clickedIndex > 2 && this.mySwiper1.clickedIndex < 9){
            //                 this.mySwiper1.slideTo(this.mySwiper1.activeIndex-2);
            //             }
            //             if(this.mySwiper1.clickedIndex > 9){
            //                 this.mySwiper1.slideTo(this.mySwiper1.activeIndex);
            //             }
            //             if(this.mySwiper1.activeIndex  == 8){
            //                 this.mySwiper1.slideTo(this.mySwiper1.activeIndex - 1);
            //             }
            //             if(this.mySwiper1.activeIndex  == 9){
            //                 this.mySwiper1.slideTo(this.mySwiper1.activeIndex - 2);
            //             }
            //             this.mySwiper3.slideTo(this.mySwiper1.clickedIndex);
            //             // if(this.mySwiper1.clickedIndex>0){
            //             //     this.mySwiper1.slideTo(this.mySwiper1.clickedIndex)
            //             // }

            //         },
            //         touchMove:function(swiper){
            //             console.log("2222222222222");
            //             if(this.mySwiper1.activeIndex >= 7){
            //                 this.mySwiper1.allowSlideNext = false;
            //             }else{
            //                 this.mySwiper1.allowSlideNext = true;
            //             }
            //             if(this.mySwiper3.activeIndex === 10){
            //                 this.mySwiper3.allowSlideNext = false;
            //             }else{
            //                 this.mySwiper3.allowSlideNext = true;
            //             }

            //         },
            //     },
            //     //initialSlide:0,
            // })
            // this.mySwiper3 = new Swiper('#swiper-container3',{
            //     speed:100,
            //     noSwiping : true,
            //     on: {
            //         touchMove:function(swiper){
            //             console.log("4444444444444");
            //             if(this.mySwiper3.activeIndex === 10){
            //                 this.mySwiper3.allowSlideNext = false;
            //             }else{
            //                 this.mySwiper3.allowSlideNext = true;
            //             }
            //             if(this.mySwiper1.activeIndex >= 7){
            //                 this.mySwiper1.allowSlideNext = false;
            //             }else{
            //                 this.mySwiper1.allowSlideNext = true;
            //             }
            //         },
            //         slidePrevTransitionEnd:function(){
            //             console.log("555555555555555555");
            //             vm.slideNext = true;
            //             vm.updateNavPosition();
            //         },
            //         slideNextTransitionEnd:function(){
            //             console.log("666666666666666");
            //             vm.slideNext = false;
            //             vm.updateNavPosition();
            //         },

            //     },
            //     slidesPerView :1,
            //     spaceBetween:11,
            //     observer: true, //修改swiper自己或子元素时，自动初始化swiper
            //     observeParents: true //修改swiper的父元素时，自动初始化swiper
            // })
            this.bgColor("#F2F3F9");
        },
        //请同事注意：离开前清理页面定时器
        destroyed() {
            clearInterval(this.timer);
        }
    }
</script>

