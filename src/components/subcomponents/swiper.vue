<template>
  <div>
    <!-- https://mint-ui.github.io/docs/#/zh-cn2/swipe -->
    <mt-swipe :auto="0">
      <!-- 在组件中使用v-for，一定要使用 key -->
      <mt-swipe-item v-for="item in imgList" :key="item.url">
        <a :href="item.url" target="_blank">
          <img :src="item.src" :class="{full:isfull}" />
        </a>
      </mt-swipe-item>
      <mt-swipe-item v-for="item in videoList" :key="item.url">
        <video :src="item.src" style="height:100%" controls="controls" @play="onplay"></video>
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["lunbotuList", "isfull"],
  computed: {
    imgList() {
      return this.lunbotuList.filter(el => {
        return el.src.lastIndexOf(".jpg") === el.src.length - 4;
      });
    },
    videoList() {
      return this.lunbotuList.filter(el => {
        return el.src.lastIndexOf(".mp4") === el.src.length - 4;
      });
    }
  },
  methods: {
    onplay() {
      //
      /* let mintDoms = document.querySelectorAll(".mint-swipe-item.is-active")[0];
      let siblings = mintDoms.parentNode.childNodes;
      siblings.forEach(dom => {
        if (dom != mintDoms && dom.nodeType === 1) {
          dom.classList.add("noshow");
        }
      }); */
    }
  }
};
// 尝试过点击播放暂停轮播图，但是设置auto属性不起效果，尝试过点击播放视频div全屏，效果也非常不好，所以最简单的办法就是暂停自动轮播
</script>

<style lang="scss" scoped>
.mint-swipe {
  height: 200px;

  .mint-swipe-item {
    text-align: center;
    img {
      /* width: 100%; */
      height: 100%;
    }

    .full {
      width: 100%;
    }
  }

  .noshow {
    display: none;
  }
}
</style>