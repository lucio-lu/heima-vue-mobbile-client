<template>
  <div class="mui-numbox" style="height:25px">
    <button class="mui-btn mui-btn-numbox-minus" type="button" @click="subtract">-</button>
    <input id="test" class="mui-input-numbox" type="number" :value="nvalue" @change="countChanged" />
    <button class="mui-btn mui-btn-numbox-plus" type="button" @click="addition">+</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nvalue: 1
    };
  }, // data
  props: ["max", "initvalue", "goodsid"],
  created() {
    this.nvalue = this.initvalue;
  },
  methods: {
    subtract() {
      if (this.nvalue > 0) {
        this.nvalue--;
        this.countChanged();
      }
    }, //
    addition() {
      if (this.nvalue < this.max) {
        this.nvalue++;
        this.countChanged();
      }
    }, //
    countChanged() {
      console.log("1111111111111122222222");
      //this.$emit("getCount", parseInt(this.nvalue)); // @@@其实这里自己实现v-model更好
      this.$store.commit("updateGoodsInfo", {
        id: this.goodsid,
        count: this.nvalue
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>