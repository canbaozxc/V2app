<template>
    <div class="hallAll">
        <titleBar title="全部彩种" />
        <div class="main">
            <div class="box" v-for="(items,key,index) in data" :key="index" v-show="items.count>0">
                <div class="title">
                    {{items.name}}
                </div>
                <!--彩种模块-->
                <div class="lottory-list">
                    <Row type="flex" justify="start" align="middle">
                        <Col span="8" class="center-item hav-bod" v-for="(item,k,all) in items.lotteries" :key="all">
                            <div>
                                <router-link :to="'/game/'+item.identifier">
                                    <img src="https://m.fyu6.com/upload/default/20181219/6a669641281792dad1292198e557127e.png" />
                                    <p>{{item.name}}</p>
                                </router-link>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="less" scoped>
.hallAll{
    .main{
        .box{
            .title{
                overflow: hidden;
                height: 0.4rem;
                line-height: 0.46rem;
                background-color:#F2F3F9;
                color: #333;
                font-size: 0.14rem;
                text-align: left;
                padding-left: 0.15rem;
            }
            .lottory-list{
                background: #FFF;
                .center-item{
                    height: 1.03rem;
                    padding-top: 0.15rem;
                    a{
                        color: #333;
                    }
                    img{
                        width: 0.5rem;
                    }
                }
                .hav-bod{
                    border-bottom: 1px solid #F2F3F9;
                    border-right: 1px solid #F2F3F9;
                }
            }
        }
    }
}
</style>
<script>
import {Row,Col} from "iview"
import titleBar from "@/components/public/Title-bar.vue"
import minxins from '@/js/minxins.js';
export default {
    name:"hallAll",
    mixins:[minxins],
    components: {
        titleBar,
        Row,Col
    },
    data(){
        return {
            data:{}
        }
    },
    methods:{
        async getGameMenu(){
            let res = await this.$api.getGameMenu();
            this.data = res.data;
            console.log(this.data);
        },
    },
    created(){
        this.getGameMenu();
    }
}
</script>

