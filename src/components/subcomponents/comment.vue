<template>
  <div class="cmt-container">
    <h3>发表评论</h3>
    <hr />
    <textarea placeholder="请输入要评论的内容（最多120字）" maxlength="120"></textarea>

    <mt-button type="primary" size="large">发表评论</mt-button>

    <div class="cmt-list">
      <div class="cmt-item" v-for="(comment, index) in comments" :key="comment.id">
        <div
          class="cmt-title"
        >第{{ index + 1 }}楼&nbsp;&nbsp;用户：{{ comment.user_name }}&nbsp;&nbsp;发表时间：{{ comment.add_time | dateFormat }}</div>
        <div class="cmt-body">{{ comment.content }}</div>
      </div>
    </div>

    <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
  </div>
</template>

<script>
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      comments: [],
      pageIndex: 1
    };
  },
  props: ["id"],
  created() {
    this.getComments();
  },
  methods: {
    getComments() {
      // /api/getcomments/:artid?pageindex=1
      this.$http
        .get("api/getComments/" + this.id + "?pageindex=" + this.pageIndex)
        .then(result => {
          if (result.body.status === 0) {
            this.comments.concat(result.body.message);
          } else {
            Toast("获取评论失败！");
          }
        });
    },
    getMore() {
      this.pageIndex++;
      this.getComments();
    }
  }
};
</script>

<style lang="scss" scoped>
.cmt-container {
  h3 {
    font-size: 18px;
  }
  textarea {
    font-size: 14px;
    height: 85px;
    margin: 0px;
  }
  .cmt-list {
    margin: 5px 0;
    .cmt-item {
      font-size: 13px;
      .cmt-title {
        line-height: 30px;
        background-color: #ccc;
      }
      .cmt-body {
        line-height: 35px;
        text-indent: 2em;
      }
    }
  }
}
</style>