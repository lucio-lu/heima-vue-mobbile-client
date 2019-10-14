<template>
  <div class="newsinfo-container">
    <h3 class="title">{{ newsinfo.title }}</h3>
    <p>
      <span class="subtitle">发表时间：{{ newsinfo.add_time | dateFormat }}</span>
      <span>点击：{{ newsinfo.click }}次</span>
    </p>

    <hr />

    <div class="content" v-html="newsinfo.content"></div>

    <comment-box></comment-box>
  </div>
</template>
<script>
import { Toast } from "mint-ui";

// https://cn.vuejs.org/v2/guide/components.html
import comment from "../subcomponents/comment.vue";

export default {
  data() {
    return {
      id: this.$route.params.id,
      newsinfo: {}
    };
  },
  created() {
    this.getNewsInfo();
  },
  methods: {
    getNewsInfo() {
      this.$http.get("api/getNewsInfo/" + this.id).then(result => {
        console.log(result.body);
        if (result.body.status === 0) {
          this.newsinfo = result.body.message[0];
        } else {
          Toast("获取新闻失败");
        }
      });
    }
  },
  components: {
    "comment-box": comment
  }
};
</script>
<style lang="scss" >
/* 这里要把 scoped 去掉，至于原因，解释不了 P152 */
.newsinfo-container {
  padding: 0 4px;
  .title {
    font-size: 16px;
    text-align: ceter;
    margin: 15px 0;
    color: red;
  }
  .subtitle {
    font-size: 13px;
    color: #226aff;
    display: flex;
    justify-content: space-between;
  }
  .content {
    img {
      width: 100%;
    }
  }
}
</style>