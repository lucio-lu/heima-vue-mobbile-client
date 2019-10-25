<template>
  <div class="mui-numbox">
    <button class="mui-btn mui-btn-numbox-minus" type="button" @click="subtract">-</button>
    <input id="test" class="mui-input-numbox" type="number" :value="nvalue" @change="countChanged" />
    <button class="mui-btn mui-btn-numbox-plus" type="button" @click="addition">+</button>
  </div>
</template>

<script>
/* import mui from "../../lib/mui/js/mui.min.js";

export default {
  mounted() {
    mui(".mui-numbox").numbox();
  }
}; */
/* 

上面的代码会导致浏览器报错：
[Intervention] Unable to preventDefault inside passive event listener due to target being treated as passive. See https://www.chromestatus.com/features/5093566007214080
关于这个bug的解决：
https://www.chromestatus.com/features/5093566007214080
https://stackoverflow.com/questions/55548261/unable-to-preventdefault-inside-passive-event-listener-due-to-target-being-treat
https://segmentfault.com/a/1190000007621605
https://zhuanlan.zhihu.com/p/24385322
https://github.com/lucio-lu/heima-vue-mobbile-client/commit/960c098a9ca3111e79894ee8a3076aea5f923da6#diff-9364989eb561244e6c01b9bbd0eec7d2
home下面的菜单都报错，这里使用的是router-link，最后会被转化成<a>标签，原始的html标签都报错，我也是郁闷了
这个bug以我现在的水平我并看不懂，
错误的代码段是mui内部，我的项目是点击router-link转化的<a>，这里路由是一个a标签，使用了href属性的#的特性实现的，本身是纯html，并没有绑定dom事件
所以这里出错应该是mui造成的，并不是我的代码。
再做“图片分享”功能的“头部列表”的时候，也出现了这个问题，当时也是mui造成的，解决方案是去掉了一些mui的样式，而在哪里我并没有跟着老师做。所以到了这里又粗错了。
所以这里不使用初始化mui，自己写js部分
*/
export default {
  data() {
    return {
      nvalue: 1
    };
  }, // data
  props: ["max"],
  /* watch: {
    max: function(newVal, oldVal) {
      this.max = newVal;
      mui('.mu1-numbox).numbox().setOption('max',5)
    }
  }, 
教学视频中，老师初始化mui是放在mounted里头的，所以才会父组件已经得到数据之后，子组件仍旧一直是undefined
我因为用mui，所以没这个问题
  */ methods: {
    subtract() {
      if (this.nvalue > 0) {
        this.nvalue--;
      }
    }, //
    addition() {
      if (this.nvalue < this.max) {
        this.nvalue++;
      }
    }, //
    countChanged() {
      this.$emit("getCount", parseInt(this.nvalue)); // @@@其实这里自己实现v-model更好
    }
  }
};
</script>

<style lang="scss" scoped>
</style>