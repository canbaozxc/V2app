<template>
    <Row type="flex" justify="center" align="middle" class="code-row-bg">
        <Col span="6">
            <router-link to="/user/rechangeManger">
                <img class="nav-ico" src="https://m.fyu6.com/themes/simpleboot3/wap/assets/img/index_new/menu1.png" />
                <p class="text">充值存款</p>
            </router-link>
        </Col>
        <Col span="6">
            <div @click="shenjizhong">
            <!--<router-link to="/notice">-->
                <img class="nav-ico" src="https://m.fyu6.com/themes/simpleboot3/wap/assets/img/index_new/menu2.png" />
                <p class="text">聊天室</p>
            <!--</router-link>-->
            </div>
        </Col>
        <Col span="6">
            <router-link to="/promotions">
                <img class="nav-ico" src="https://m.fyu6.com/themes/simpleboot3/wap/assets/img/index_new/menu3.png" />
                <p class="text">优惠活动</p>
            </router-link>
        </Col>
        <Col span="6">
            <div @click="shenjizhong">
            <!--<router-link to="/notice">-->
                <img class="nav-ico" src="https://m.fyu6.com/themes/simpleboot3/wap/assets/img/index_new/menu4.png" />
                <p class="text">在线客服</p>
            <!--</router-link>-->
            </div>
        </Col>
    </Row>
</template>
<style lang="less"  scoped>
.code-row-bg{
    height: 1.15rem;
    background-color: #FFF;
    margin-bottom: 10px;
    overflow: hidden;
    .nav-ico{
        width: 0.52rem;
        height: 0.52rem;
    }
    p.text{
        color: #333;
        font-size: 0.14rem;
    }
}
</style>
<script>
import {Row,Col,Icon} from "iview"
import minxins from '@/js/minxins.js';
export default {
    name: "Notice",
    mixins: [ minxins ],
    components:{
        Row,Col,Icon
    }
}

</script>

