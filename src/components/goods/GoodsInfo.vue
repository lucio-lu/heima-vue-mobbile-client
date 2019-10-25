<template>
  <div class="goodsinfo-container">
    <transition @before-enter="beforeEnter" @enter="enger" @after-enter="afterEnter">
      <div class="ball" v-show="ballFlag" ref="ball"></div>
    </transition>
    <!-- \mui-master\examples\hello-mui\examples\card.html -->

    <!-- 商品轮播图区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <swiper :lunbotuList="lunbotu"></swiper>
        </div>
      </div>
    </div>

    <!-- 商品购买区域 -->
    <div class="mui-card">
      <div class="mui-card-header">{{ goodsinfo.title }}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            市场价：
            <del>￥{{ goodsinfo.market_price }}</del>&nbsp;&nbsp;
            销售价：
            <span class="now_price">￥{{ goodsinfo.sell_price }}</span>
          </p>
          <p>
            购买数量
            <numbox @getCount="getSelectedCount" :max="goodsinfo.stock_quantity"></numbox>
          </p>
          <p>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
          </p>
        </div>
      </div>
    </div>

    <!-- 商品参数区域 -->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号：{{ goodsinfo.goods_no }}</p>
          <p>库存情况：{{ goodsinfo.stock_quantity }}件</p>
          <p>上架时间：{{ goodsinfo.add_time | dateFormat }}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
        <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import swiper from "../subcomponents/swiper.vue";
import numbox from "../subcomponents/goodsinfo_numbox.vue";

export default {
  data() {
    return {
      id: this.$route.params.id,
      lunbotu: [],
      goodsinfo: [],
      ballFlag: false, // 控制小球隐藏和显示的标识符
      selectedCount: 1 // 默认选中1个
    };
  },
  created() {
    this.getLunbotu();
    this.getInfo();
  },
  methods: {
    getLunbotu() {
      this.$http.get("api/getThumImagesGoods/" + this.id).then(result => {
        if (result.body.status == 0) {
          result.body.message.forEach(element => {
            element.img = element.src;
          });
          this.lunbotu = result.body.message;
        } else {
          Toast("获取轮播图失败");
        }
      });
    }, // getLunbotu()
    getInfo() {
      this.$http.get("api/goods/getinfo/" + this.id).then(result => {
        if (result.body.status == 0) {
          this.goodsinfo = result.body.message;
        } else {
          Toast("获取商品信息失败");
        }
      });
    }, // getInfo()
    goDesc(goodsId) {
      // 编程式导航
      this.$router.push({ name: "goodsdesc", params: { goodsId } });
    },
    goComment(goodsId) {
      this.$router.push({ name: "goodscomment", params: { goodsId } });
    },
    addToShopCar() {
      this.ballFlag = !this.ballFlag;
    },
    beforeEnter(el) {
      el.style.transform = "translate(0,0)";
    },
    enger(el, done) {
      // domObject.getBoundingClientRect() 得到元素相对于左上角的距离
      //developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect

      let ballPosition = this.$refs.ball.getBoundingClientRect();
      // vue 不提倡操作dom，但是不是数据绑定操作，为了简单，可以偶尔操作一次dom
      let badgePosition = document
        .getElementById("badge")
        .getBoundingClientRect();

      let xDist = badgePosition.left - ballPosition.left;
      let yDist = badgePosition.top - ballPosition.top;

      https: el.offsetWidth;
      el.style.transform = `translate(${xDist}px,${yDist}px)`;
      // https://cubic-bezier.com/#.4,-0.3,1,.68
      el.style.transition = "all 0.5s cubic-bezier(0,0,.25,1)";
      done();
    }, //
    afterEnter(el) {
      this.ballFlag = !this.ballFlag;
    },
    getSelectedCount(count) {
      this.selectedCount = count;
    }
  }, // methods
  components: {
    swiper,
    numbox
  }
};
</script>

<style lang="scss" scoped>
.goodsinfo-container {
  background-color: #eee;
  overflow: hidden; /* @@@取消内部div的margin */

  .now_price {
    color: red;
    font-size: 16px;
    font-weight: bold;
  }

  .mui-card-footer {
    display: block;

    button {
      margin: 15px 0;
    }
  }

  .ball {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: red;
    position: absolute;
    z-index: 99;
    top: 390px;
    left: 146px;
  }
}
</style>