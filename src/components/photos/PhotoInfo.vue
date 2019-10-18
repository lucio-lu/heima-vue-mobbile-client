<template>
  <div class="photoinfo-container">
    <h3>标题</h3>
    <p class="subtitle">
      <span>发表时间：{{ photoinfo.add_time | dateFormat }}</span>
      <span>点击：{{ photoinfo.click }}次</span>
    </p>

    <hr />

    <!-- 略缩图区域 -->

    <!-- 图片内容区域 -->
    <div class="content" v-html="photoinfo.content"></div>

    <!-- 评论子组件 -->
    <cmt-box :id="id"></cmt-box>
  </div>
</template>
<script>
import comment from "../subcomponents/comment.vue";

export default {
  data() {
    return {
      id: this.$route.params.id,
      photoinfo: {}
    };
  },
  created() {
    this.getPhotoInfo();
  },
  methods: {
    getPhotoInfo() {
      // /api/getimageinfo/:imgid
      this.$http.get("api/getimageinfo/" + this.id).then(result => {
        if (result.body.status === 0) {
          console.log(result);
          this.photoinfo = result.body.message[0];
        } else {
        }
      });
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