<template>
  <div>
    <!-- https://mint-ui.github.io/docs/#/zh-cn2/swipe -->
    <mt-swipe :auto="3000">
      <!-- 在组件中使用v-for，一定要使用 key -->
      <mt-swipe-item v-for="item in lunbotuList" :key="item.url">
        <a :href="item.url" target="_blank">
          <img :src="item.img" />
        </a>
      </mt-swipe-item>
    </mt-swipe>

    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newlist">
          <!-- <span class="mui-icon mui-icon-home"></span> -->
          <img src="../../image/menu1.png" />
          <div class="mui-media-body">新闻资讯</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/photolist">
          <!-- <span class="mui-icon mui-icon-email">
            <span class="mui-badge">5</span>
          </span>-->
          <img src="../../image/menu2.png" />
          <div class="mui-media-body">图片分享</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <!-- <span class="mui-icon mui-icon-chatbubble"></span> -->
          <img src="../../image/menu3.png" />
          <div class="mui-media-body">商品购买</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <!-- <span class="mui-icon mui-icon-location"></span> -->
          <img src="../../image/menu4.png" />
          <div class="mui-media-body">留言反馈</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <!-- <span class="mui-icon mui-icon-search"></span> -->
          <img src="../../image/menu5.png" />
          <div class="mui-media-body">视频专区</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <!-- <span class="mui-icon mui-icon-phone"></span> -->
          <img src="../../image/menu6.png" />
          <div class="mui-media-body">联系我们</div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
////// 为什么<template>和<script>是分开的。
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      lunbotuList: []
    };
  },
  created() {
    this.getLunbotu();
  },
  methods: {
    getLunbotu() {
      let url = "api/getlunbotu";
      this.$http.get(url).then(result => {
        if (result.body.status === 0) {
          this.lunbotuList = result.body.message;
        } else {
          Toast("加载轮播图失败");
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.mint-swipe {
  height: 200px;

  .mint-swipe-item {
    &:nth-child(1) {
      background-color: red;
    }
    &:nth-child(2) {
      background-color: blue;
    }
    &:nth-child(3) {
      background-color: cyan;
    }

    img {
      width: 100%;
      height: 100%;
    }
  }
}

.mui-grid-view.mui-grid-9 {
  background-color: #fff;
  border: none;
  img {
    width: 60px;
    height: 60px;
  }

  .mui-media-body {
    font-size: 13px;
  }
}

.mui-grid-view.mui-grid-9 .mui-table-view-cell {
  border: 0;
}
</style>