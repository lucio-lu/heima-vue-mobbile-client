<template>
  <!-- !!! 这个mui的组件存在问题，所以放弃使用 -->
  <div>
    <h3>图片列表</h3>
    <!-- mui: \mui-master\examples\hello-mui\examples\tab-top.webview-main.html -->
    <!-- http://dev.dcloud.net.cn/mui -->
    <!-- https://dev.dcloud.net.cn/mui/ui/#scroll -->
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
        data-scroll="1"
      >
        <div
          class="mui-scroll"
          style="transform: translate3d(0px, 0px, 0px) translateZ(0px); transition-duration: 0ms;"
        >
          <a class="mui-control-item" href="#item1mobile" data-wid="tab-top-subpage-1.html">推荐</a>
          <a class="mui-control-item" href="#item2mobile" data-wid="tab-top-subpage-2.html">热点</a>
          <a class="mui-control-item" href="#item3mobile" data-wid="tab-top-subpage-3.html">北京</a>
          <a class="mui-control-item" href="#item4mobile" data-wid="tab-top-subpage-4.html">社会</a>
          <a
            class="mui-control-item mui-active"
            href="#item5mobile"
            data-wid="tab-top-subpage-5.html"
          >娱乐</a>
        </div>
      </div>
    </div>
    <!-- 这个组件存在问题，放弃使用这个组件 -->
  </div>
</template>
<script>
// 1. 导入 mui
import mui from "../../lib/mui/js/mui.min.js";

export default {
  data() {
    return {};
  },
  mounted() {
    // mounted钩子函数：组件中的dom结构渲染完成，并已经放入页面中
    // 2. 初始化
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  methods: {}
};

// 在老师的视频中，导入mui.min.js之后会报错
// Uncaught TyppeError: 'caller', 'callee' and 'arguments' properties may not be accessed on strict mode
// mui.js使用到了 'caller', 'callee' and 'arguments' ，而webpack打包好的bundle.js中，默认启用严格模式
// 解决方案： webppack 打包时候 禁用严格模式
// babel-plugin-transform-remove-strict-mode
// https://github.com/genify/babel-plugin-transform-remove-strict-mode
//
// ** 可能因为我使用的是新版的包，所以并没有这个报错，所以我没有安装这个包

// 但是我有其他报错：
// [Intervention] Unable to preventDefault inside passive event listener due to target being treated as passive. See https://www.chromestatus.com/features/5093566007214080
// 老师这里是警告，而我是直接报错，不过解决方案是一样的：touch-action: pan-y;
// https://www.cnblogs.com/pearl07/p/6589114.html
// https://developer.mozilla.org/zh-CN/docs/web/css/touch-action

// 搞定上面这个问题之后，又有新问题了：点击下面的导航栏会报错
// [Intervention] Unable to preventDefault inside passive event listener due to target being treated as passive. See https://www.chromestatus.com/features/5093566007214080
//

// 这个组件有问题，所以放弃使用，上面的关于这个组件的注释依旧保留。
// 这个组件原本就有很多问题，解决方案需要修改其他无关的页面，使用这/*  */个组件得不偿失
// 而且这个组件现在的版本使用老师的解决方案也已经行不通，
// 最主要的是这个组件原本的测试用例就是无法滑动的，所以没有必要浪费时间，如果原本测试用例是好的，那我可以参考测试用例的代码
// 我改成了固定的布局，不再可以滑动。
</script>
<style lang="scss" scoped>
* {
  touch-action: pan-y;
}

.mui-scroll {
  width: 100%;
}
</style>