import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import './registerServiceWorker'
import './plugins/iview.js'
import fly from "./dll/fly.js";
import api from "./dll/api.js";
import lottoryApi from "./dll/lottory_algorithm.js";
import { Notice } from 'iview';
import 'swiper/dist/css/swiper.min.css';
import 'swiper/dist/js/swiper.min.js';
import $ from 'jquery';
import VueAwesomeSwiper from 'vue-awesome-swiper'
// require styles
import 'swiper/dist/css/swiper.css'
import { Circle } from 'vant';
Vue.component('i-circle', Circle)
Vue.use(VueAwesomeSwiper, /* { default global options } */)
Vue.prototype.$http = fly; //ajax框架
Vue.prototype.$api = api;
Vue.prototype.$lottoryApi = lottoryApi;
Vue.config.productionTip = false;
Vue.prototype.$Notice = Notice;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
