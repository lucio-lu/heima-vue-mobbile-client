<template>
  <div class="goodsinfo-container">
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
            <numbox></numbox>
          </p>
          <p>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small">加入购物车</mt-button>
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
        <mt-button type="primary" size="large" plain>图文介绍</mt-button>
        <mt-button type="danger" size="large" plain>商品评论</mt-button>
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
      goodsinfo: []
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
    }, // end getLunbotu
    getInfo() {
      this.$http.get("api/goods/getinfo/" + this.id).then(result => {
        if (result.body.status == 0) {
          this.goodsinfo = result.body.message;
        } else {
          Toast("获取商品信息失败");
        }
      });
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
}
</style>