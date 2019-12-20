import Vue from 'vue'
import { Button ,Message,LoadingBar,Modal} from 'iview'
//注册到vue原型上

Vue.component('Button', Button)
Vue.prototype.$Message = Message; //全局信息提示框
Vue.prototype.$Loading = LoadingBar;
Vue.prototype.$Modal = Modal; //全局模态框
import 'iview/dist/styles/iview.css'
