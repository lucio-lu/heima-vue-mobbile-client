import Vue from 'vue'

import VueRouter from 'vue-router'
Vue.use(VueRouter)
import router from './router.js'

import app from './app.vue'

import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

import moment from 'moment'

Vue.filter('dateFormat', function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
    return moment(dataStr).format(pattern)
})

import VueResource from 'vue-resource'
Vue.use(VueResource)
// 全局设置请求的根路径
Vue.http.options.root = "http://localhost:3001/"
// 全局设置 post 时候表单数据格式组织形式
Vue.http.options.emulateJSON = true;

// mint-ui
import 'mint-ui/lib/style.css'

//https://mint-ui.github.io/docs/#/en2/header
// https://mint-ui.github.io/docs/#/zh-cn2/swipe
// 图片懒加载 Lazyload http://mint-ui.github.io/docs/#/zh-cn2/lazyload
/* import { Header, Swipe, SwipeItem, Button,Lazyload } from 'mint-ui';
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button)
Vue.use(Lazyload); // 用按需导入，懒加载会出问题，所以改成全部导入 */
import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'


let vm = new Vue({
    el: "#app",
    render: c => c(app),
    router
})

// 不知道为什么，在没有安装vue的时候，就已经有了vue
console.log(Vue)