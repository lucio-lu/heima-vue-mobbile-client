import VueRouter from 'vue-router'
// 为什么这里import main里头也import，导入的不是同一个对象也可以？

import HomeContainer from './components/tabbar/HomeContainer.vue'
import ShopcarContainer from './components/tabbar/ShopcarContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'

import NewList from './components/news/NewsList.vue'
import NewsInfo from './components/news/NewsInfo.vue'
import PhotoList from './components/photos/PhotoList.vue'
import PhotoInfo from './components/photos/PhotoInfo.vue'
import GoodsList from './components/goods/GoodsList.vue'
import GoodsInfo from './components/goods/GoodsInfo.vue'
import GoodsDesc from './components/goods/GoodsDesc.vue'
import GoodsComment from './components/goods/GoodsComment.vue'

import MemberLogin from './components/member/Login.vue'

const routes = [
    { path: '/', redirect: '/home' },
    { path: '/home', component: HomeContainer },
    { path: '/shopcar', component: ShopcarContainer },
    { path: '/search', component: SearchContainer },
    { path: '/member', component: MemberContainer },
    { path: '/home/newlist', component: NewList },
    { path: '/home/getnewsinfo/:id', component: NewsInfo },
    { path: '/home/photolist', component: PhotoList },
    { path: '/home/photoinfo/:id', component: PhotoInfo },
    { path: '/home/goodslist', component: GoodsList },
    { path: '/home/goodsinfo/:id', component: GoodsInfo, name: 'goodsinfo' },
    { path: '/home/GoodsDesc/:id', component: GoodsDesc, name: 'goodsdesc' },
    { path: '/home/GoodsComment/:id', component: GoodsComment, name: 'goodscomment' },
    { path: '/member/login', component: MemberLogin }
]

const router = new VueRouter({
    routes,
    linkActiveClass: 'mui-active'  // default: [router-link-exact-active] router-link-active
})

export default router