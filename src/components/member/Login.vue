<template>
  <div class="login">
    <div class="header">
      <span></span>
      <h3>欢迎登陆手机商城</h3>
    </div>
    <div class="container">
      <p class="container-line">
        <input
          type="text"
          id="account"
          class="login-control"
          placeholder="请输入账户名"
          v-model="account"
        />
        <i></i>
      </p>
      <p class="container-line">
        <input
          type="text"
          id="password"
          class="login-control"
          placeholder="请输入密码"
          v-model="password"
        />
        <i></i>
        <span></span>
        <span id="forget-pwd">
          <a>忘记密码</a>
        </span>
      </p>
    </div>
    <input type="submit" class="submit" id="btn-submit" value="Login" @click="Login()" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      account: "",
      password: ""
    };
  },
  methods: {
    Login() {
      console.log(this.account);
      console.log(this.password);
    }
  }
};
</script>

<style lang="scss">
.login {
  padding: 0 2rem;
  background-image: url("../../image/login-background.png");
  background-size: 100% auto;

  /* 历史遗留问题，@@@这里的padding top很奇怪，试试0和1 */
  /* margin-top: -65px; */
  padding-top: 1px;
  padding-bottom: 300px;

  .header {
    margin-top: 30px auto;
    width: 100%;
    h3 {
      margin: 66px auto;
      text-align: center;
      color: #666;
    }
  }

  .container {
    .container-line {
      border-bottom: 1px solid #d3d3d3;
      position: relative;

      .login-control {
        border: 0;
      }

      #forget-pwd {
        position: absolute;
        right: 30px;
        top: 10px;
      }
    }
  }

  .submit {
    border-radius: 75px;
    width: 100%;
    /* background-color: #e4bb7e; */
  }
}
</style>