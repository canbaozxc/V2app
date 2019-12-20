<template>
    <div class="promotions">
        <component  v-bind:is="'titleBar'"  title="优惠活动"> </component>
        <div class="promotionsContent">
            <div>
                <ul>
                    <li>
                        <div class="img-wrapper" @click="getIscheck(2)">
                            <a class="aaa">
                                <img src="../assets/userCenter/jj.png">
                            </a>
                        </div>
                        <div class="item-detail-wrapper" v-show="ischeck2">
                            <div>晋级奖励.........</div>
                        </div>
                    </li>
                    <li>
                        <div class="img-wrapper" @click="getIscheck(1)">
                            <a class="aaa">
                                <img src="../assets/userCenter/qixiqingrenjie.jpg">
                            </a>
                        </div>
                        <div class="item-detail-wrapper" v-show="ischeck1">
                            <img src="../assets/userCenter/qixiqingrenjie2.png">
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <bottomNavbar />
    </div>
</template>

<script>
    ///assets/userCenterqixiqingrenjie.jpg
    import bottomNavbar from '@/components/public/Navbar.vue'
    export default {
        name: "promotions",
        data(){
            return{
                ischeck1:false,
                ischeck2:false,
                promotionsList:[],
                imgSrc:'',
                content:'',
            }
        },
        methods:{
            getIscheck(val){
                if(val === 1){
                    this.ischeck1 = !this.ischeck1;
                }
               if(val === 2){
                   this.ischeck2 = !this.ischeck2;
               }
            },
        },
        components:{
            titleBar:() => import("@/components/public/Title-bar.vue"),
            bottomNavbar,
        },
    }
</script>

<style lang="less" scoped>
    .promotions{
        .promotionsContent{
            ul{
                li{
                    background: #fff;
                    padding: 0.1rem;
                }
            }
            background: #fff;
            img{
                width: 100%;
            }
        }
    }
</style>