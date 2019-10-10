import VueRouter from 'vue-router'
// 为什么这里import main里头也import，导入的不是同一个对象也可以？

import HomeContainer from './components/tabbar/HomeContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import ShopcarContainer from './components/tabbar/ShopcarContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'

const routes = [
    { path: '/', redirect: '/home' },
    { path: '/home', component: HomeContainer },
    { path: '/member', component: MemberContainer },
    { path: '/shopcar', component: ShopcarContainer },
    { path: '/search', component: SearchContainer },
]

const router = new VueRouter({
    routes,
    linkActiveClass: 'mui-active'  // default: [router-link-exact-active] router-link-active
})

export default router