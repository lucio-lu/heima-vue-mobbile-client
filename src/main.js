import Vue from 'vue'

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Vuex from 'vuex'
Vue.use(Vuex)

let car = JSON.parse(localStorage.getItem('car') || '[]')

const store = new Vuex.Store({
    state: { // this.$store.state.***
        car: car // 保存购物车中的商品 {id:,count:,price:,selected:,}
    },
    mutations: { // this.$store.commit('func-name', params)
        addToCar(state, goodsinfo) {
            let flag = false

            state.car.some(item => {
                if (item.id == goodsinfo.id) {
                    console.log(goodsinfo)
                    item.count += parseInt(goodsinfo.count)
                    flag = true
                    return true
                }
            })

            if (flag === false) {
                state.car.push(goodsinfo)
            }

            // 把购物车存储到 localStorage
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        updateGoodsInfo(state, goodsinfo) {
            state.car.some(element => {
                if (element.id == goodsinfo.id) {
                    element.count = parseInt(goodsinfo.count)
                    return true
                }
            })
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        removeFromCar(state, id) {
            state.car.some((item, i) => {
                if (item.id == id) {
                    state.car.splice(i, 1)
                    return true
                }
            })

            localStorage.setItem('car', JSON.stringify(state.car))
        },
        updateGoodsSelected(state, info) {
            state.car.some(item => {
                if (item.id == info.id) {
                    item.selected = info.selected
                }
            })
            localStorage.setItem('car', JSON.stringify(state.car))
        }
    },
    getters: { // this.$store.getters.***
        // 相当于 计算属性，也相当于 filters
        getAllCount(state) {
            var c = 0
            state.car.forEach(item => {
                c += item.count
            })
            return c
        },
        // return car.reduce((prive ,cur) => prev + cur)
        getGoodsCount(state) {
            var o = {}
            state.car.forEach(element => {
                o[element.id] = element.count
            })
            return o
        },
        getGoodsSelected(state) {
            let o = {}
            state.car.forEach(element => {
                o[element.id] = element.selected
            })
            return o
        },
        getGoodsCountAndAmout(state) {
            let o = {
                count: 0,
                amount: 0
            }
            state.car.forEach(element => {
                if (element.selected === true) {
                    o.count += element.count
                    o.amount += element.price * element.count
                }
            })
            return o
        }
    }
})

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

//     vue-preview
import VuePreview from 'vue-preview'

// defalut install
Vue.use(VuePreview)


//       end vue-preview

let vm = new Vue({
    el: "#app",
    render: c => c(app),
    router, //@@@
    store //@@@
})