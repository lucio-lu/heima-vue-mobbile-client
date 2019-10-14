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
Vue.http.options.root = "http://localhost:3001/"

// mint-ui
import 'mint-ui/lib/style.css'

//https://mint-ui.github.io/docs/#/en2/header
import { Header } from 'mint-ui'
Vue.component(Header.name, Header)

// https://mint-ui.github.io/docs/#/zh-cn2/swipe
import { Swipe, SwipeItem } from 'mint-ui';
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

let vm = new Vue({
    el: "#app",
    render: c => c(app),
    router
})

// 不知道为什么，在没有安装vue的时候，就已经有了vue
console.log(Vue)