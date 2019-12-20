<template>
    <div class="openData">
        <component v-bind:is="'titleBar'" title="开奖公告"></component>
        <div class="openDataContent">
            <div>
                <ul>
                    <li v-for="(item,k,i) in data" :key="i" @click="getlotterDetails(k,item)">
                        <Row type="flex" justify="start" align="top">
                            <Col span="5">
                                <div class="openDataimg">
                                    <img src="https://m.fyu6.com/upload/default/20181219/6a669641281792dad1292198e557127e.png"/>
                                </div>

                            </Col>
                            <Col span="9">
                                <p style="font-size: 16px">{{item.name}}</p>
                                <p style="font-size: 14px;color: #868484">第209080917期</p>
                                <p>9886411111111111111111111111111111</p>
                            </Col>
                            <Col span="9" class="openDataIcon">
                                <p>2019-08-09 16:25:01</p>
                                <Icon type="ios-arrow-forward"/>
                            </Col>
                            <Col span="1">
                            </Col>
                        </Row>
                    </li>
                </ul>
                <div class="clear"></div>
            </div>
        </div>
        <bottomNavbar/>
    </div>
</template>
<style lang="less" scoped>
    .openData {
        .openDataContent {
            ul {
                .clear{
                    clear: both;
                }
                li {
                    border-bottom: 0.1rem solid #eee;
                    background: #fff;
                    padding-top: 0.1rem;
                    .openDataimg {
                        padding: 0.1rem 0.1rem 0.1rem 0;
                        img {
                            width: 0.5rem;
                        }
                    }
                    .openDataIcon {
                        text-align: right;
                    }
                }
            }
        }
        padding-bottom: 0.5rem;
    }
</style>

<script>
    // @ is an alias to /src

    import {Row, Col, Icon} from "iview"
    import bottomNavbar from '@/components/public/Navbar.vue'

    export default {
        name: 'openData',
        data() {
            return {
                data: [],
            }
        },
        components: {
            titleBar: () => import("@/components/public/Title-bar.vue"),
            bottomNavbar,
            Row,
            Col,
            Icon
        },
        methods: {
            getlotterDetails(val,data){
                data.id = val;
                let dataList = JSON.stringify(data);
                this.$router.push({path:'/lotteryDetails', query: {res: dataList}});
            },
            init() {
                this.getGameList();
            },
            async getGameList() {
                let res = await this.$api.getGameList();
                this.data = res.data.all;
                console.log(this.data);
            },
        },
        created() {
            this.init()
        },
        mounted() {
            /*this.$store.commit('add');
            console.log(this.$store.getters.inconr);*/
        }
    }
</script>
