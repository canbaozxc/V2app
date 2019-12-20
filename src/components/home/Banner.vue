<template>
    <section class="homeBanner">
        <Swiper :autoPlay='true' :showIndicator='true' interval="4000" duration="500">
            <Slide>
                <router-link to="/promotions">
                    <img
                        src="https://m.fyu6.com/upload/default/20190418/7c721933f0dd8b81adcabbf6032c86b6.jpg"
                        class="sliderImg">
                </router-link>
            </Slide>
            <Slide>
                <router-link to="/promotions">
                    <img
                        src="https://m.fyu6.com/upload/default/20190418/ba86e1e99a550e95c385f98c2f9d141f.jpg"
                        class="sliderImg">
                </router-link>
            </Slide>
            <Slide>
                <router-link to="/promotions">
                    <img
                        src="https://m.fyu6.com/upload/default/20190418/7c721933f0dd8b81adcabbf6032c86b6.jpg"
                        class="sliderImg">
                </router-link>
            </Slide>
            <Slide>
                <router-link to="/promotions">
                    <img
                        src="https://m.fyu6.com/upload/default/20190418/ba86e1e99a550e95c385f98c2f9d141f.jpg"
                        class="sliderImg">
                </router-link>
            </Slide>
        </Swiper>
    </section>
</template>

<script>
    import {Swiper, Slide} from 'vue-swiper-component';


    export default {
        name: "Banner",
        components: {
            Swiper,
            Slide,
        }
    }
</script>

<style lang="less" scoped>
    .homeBanner {
        position: relative;
        width: 100%;
        margin-bottom: 0.2rem;
        .sliderImg {
            display: block;
            width: 100%;
        }
    }
</style>
