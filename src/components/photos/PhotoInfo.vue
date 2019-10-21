<template>
  <div class="photoinfo-container">
    <h3>标题</h3>
    <p class="subtitle">
      <span>发表时间：{{ photoinfo.add_time | dateFormat }}</span>
      <span>点击：{{ photoinfo.click }}次</span>
    </p>

    <hr />

    <!-- 略缩图区域 使用 vue-preview -->
    <!-- https://github.com/ls1231/vue-preview -->
    <!-- 注意，新的vue-preview使用方式和老师那会儿完全步一样了，具体看官网 -->
    <!-- <vue-preview :slides="list" @close="handleClose"></vue-preview> -->

    <!-- 图片内容区域 -->
    <div class="content" v-html="photoinfo.content"></div>

    <!-- 评论子组件 -->
    <cmt-box :id="id"></cmt-box>
  </div>
</template>
<script>
import comment from "../subcomponents/comment.vue";
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      id: this.$route.params.id,
      photoinfo: {},
      list: []
    };
  },
  created() {
    this.getPhotoInfo();
    this.getThumbs();
  },
  methods: {
    getPhotoInfo() {
      // /api/getimageinfo/:imgid
      this.$http.get("api/getimageinfo/" + this.id).then(result => {
        if (result.body.status === 0) {
          this.photoinfo = result.body.message[0];
        } else {
          Toast("获取图片信息失败");
        }
      });
    },
    getThumbs() {
      this.$http.get("api/gethumimages/" + this.id).then(result => {
        if (result.body.status === 0) {
          result.body.message.forEach(item => {
            // vue-preview 官方例子就要求有这个2个属性
            item.msrc = item.src;
            item.alt = "picture1";
            item.title = "Image Caption 1";
            item.w = 600;
            item.h = 400;
          });
          this.list = result.body.message;
        } else {
          Toast("获取图片略缩图失败");
        }
      });
    },
    handleClose() {
      console.log("close event");
    }
  },
  components: {
    "cmt-box": comment
  }
};
</script>
<style lang="scss" scoped>
.photoinfo-container {
  padding: 3px;
  h3 {
    color: #26a2ff;
    font-size: 15px;
    text-align: center;
    margin: 15px 0;
  }
  .subtitle {
    display: flax;
    justify-content: space-between;
    font-size: 13px;
  }
  .content {
    font-size: 13px;
    line-height: 30px;
  }
}
</style>

<style>
/* img {
  width: 60px;
} */
</style>