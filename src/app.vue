<template>
  <div class="app-container">
    <!-- https://mint-ui.github.io/docs/#/en2/header -->
    <!-- https://mint-ui.github.io/docs/#/zh-cn2/header -->
    <mt-header fixed title="Vue手机商城项目">
      <span slot="left" @click="goBack" v-show="goBackShow">
        <mt-button icon="back">返回</mt-button>
      </span>
      <!-- <mt-button icon="more" slot="right"></mt-button> -->
    </mt-header>
    <transition>
      <router-view></router-view>
    </transition>
    <nav class="mui-bar mui-bar-tab">
      <router-link class="mui-tab-item" to="/home">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link class="mui-tab-item" to="/shopcar">
        <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
          <span class="mui-badge" id="badge">{{ $store.getters.getAllCount }}</span>
        </span>
        <span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link class="mui-tab-item" to="/search">
        <span class="mui-icon mui-icon-gear"></span>
        <span class="mui-tab-label">搜索</span>
      </router-link>
      <router-link class="mui-tab-item" to="/member">
        <span class="mui-icon mui-icon-contact"></span>
        <span class="mui-tab-label">会员</span>
      </router-link>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      goBackShow: true
    };
  },
  created() {
    if (this.$route.fullPath === "/home") {
      this.goBackShow = false;
    } else {
      this.goBackShow = true;
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  },
  watch: {
    "$route.fullPath": function(newVal) {
      if (newVal === "/home") {
        this.goBackShow = false;
      } else {
        this.goBackShow = true;
      }
    }
  }
};
</script>

<style scoped>
.mint-header {
  z-index: 99;
}

.app-container {
  padding-top: 40px;
  padding-bottom: 50px;
  overflow-x: hidden;
}

.v-enter {
  opacity: 0;
  transform: translateX(100%);
  position: absolute;
}

.v-leave-to {
  opacity: 0;
  transform: translateX(-100%);
  position: absolute;
}

.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}
</style>