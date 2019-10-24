<template>
  <div class="goodsdesc-container">
    <h3>{{ info.title }}</h3>
    <hr />
    <div class="content" v-html="info.content"></div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      id: this.$route.params.id,
      info: {}
    };
  },
  created() {
    this.getGoodsDesc();
  },
  methods: {
    getGoodsDesc() {
      this.$http.get("api/goods/getdesc/" + this.id).then(result => {
        if (result.body.status === 0) {
          this.info = result.body.message[0];
          console.log("---------");
          console.log(this.info);
        } else {
          Toast("获取商品图文详情失败");
        }
      });
    }
  }
};
</script>

<style lang="scss" >
/* scoped 如果想要让图片的width生效，必须要把scoped去掉，不知道为什么 */
.goodsdesc-container {
  padding: 4px;
  h3 {
    font-size: 16px;
    color: #226aff;
    text-align: center;
    margin: 15px;
  }
  .content {
    img {
      width: 100%;
    }
  }
}
</style>