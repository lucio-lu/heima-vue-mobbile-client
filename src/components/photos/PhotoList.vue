<template>
  <div>
    <div class="mui-slider">
      <a
        :class="['mui-control-item',item.id==0?'mui-active':'']"
        v-for="item in cates"
        :key="item.id"
        @click="getPhotoListByCateId(item.id)"
      >{{item.title}}</a>
    </div>
    <!-- @@@ @click是一段执行程序，那如果没有参数，是不是可以不用括号？ -->
    <!-- 图片列表 懒加载 -->
    <!-- http://mint-ui.github.io/docs/#/zh-cn2/lazyload -->
    <ul class="photo-list">
      <router-link v-for="item in list" :key="item.id" :to="'/home/photoinfo/'+item.id" tag="li">
        <!-- 加个冒号代表后面是表达式 -->
        <img v-lazy="item.img_url" />
        <div class="info">
          <h1 class="info-title">{{ item.title }}</h1>
          <div class="info-body">{{ item.zhaiyao }}</div>
        </div>
      </router-link>
    </ul>
  </div>
</template>
<script>
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      cates: [],
      list: []
    };
  },
  created() {
    this.getImgCategory();
    this.getPhotoListByCateId(0);
  },
  methods: {
    getImgCategory() {
      this.$http.get("api/getimgcategory").then(result => {
        if (result.body.status === 0) {
          result.body.message.unshift({ title: "全部", id: 0 });
          this.cates = result.body.message;
        } else {
          Toast("获取图片类别失败!");
        }
      });
    },
    getPhotoListByCateId(cateId) {
      this.$http.get("api/getimages/" + cateId).then(result => {
        if (result.body.status === 0) {
          this.list = result.body.message;
        } else {
          Toast("获取图片失败!");
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
/* 这是不使用老师给的空间，自己花的表格需要的css */
.mui-slider {
  display: table;
  width: 100%;
}
.mui-control-item {
  display: table-cell;
  text-align: center;
}

.photo-list {
  list-style: none;
  margin: 0;
  padding: 10px;
  padding-bottom: 0;
  li {
    margin-bottom: 10px;
    background-color: #ccc;
    text-align: center;
    box-shadow: 0 0 9px #999;
    position: relative;
    img {
      width: 100%;
      vertical-align: middle;
    }
    img[lazy="loading"] {
      width: 40px;
      height: 300px;
      margin: auto;
    }

    .info {
      color: white;
      text-align: left;
      position: absolute;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.4);
      max-height: 84px;
      .info-title {
        font-size: 14px;
      }
      .info-body {
        font-size: 13px;
      }
    }
  }
}
</style>

