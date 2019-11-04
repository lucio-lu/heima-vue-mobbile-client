<template>
  <div>
    <!-- https://mint-ui.github.io/docs/#/zh-cn2/swipe -->
    <mt-swipe :auto="3000">
      <!-- 在组件中使用v-for，一定要使用 key -->
      <mt-swipe-item v-for="item in lunbotuList" :key="item.url">
        <a :href="item.url" target="_blank">
          <img
            v-if="item.src.lastIndexOf('.jpg') === item.src.length - 4"
            :src="item.src"
            :class="{full:isfull}"
          />
          <video
            v-if="item.src.lastIndexOf('.mp4') === item.src.length - 4"
            :src="item.src"
            style="height:100%"
            controls="controls"
          ></video>
        </a>
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
export default {
  props: ["lunbotuList", "isfull"]
};
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
}
</style>