<template>
  <div class="login">
    <img src="../assets/img/index/bg@3x.jpg" class="bgImg" alt="" />
    <div class="goButton">
      <img
        @click="goBack"
        class="backIndex"
        src="../assets/img/top/cc-left.png"
        alt=""
      />
      <div class="content">
        <h3>登录</h3>
        <h5>更多精彩等你来传</h5>
        <p>未注册手机号验证后即完成注册</p>
        <input
          type="tel"
          class="phone"
          v-model="phone"
          placeholder="请输入手机号"
        />
        <input type="tel" class="phone" v-model="code" placeholder="验证码" />
        <button v-if="code.length > 0" @click="postSignIn">登录</button>
        <button v-else @click="getCode">{{ getCodeText }}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      phone: "",
      code: "",
      setIntime: null,
      getCodeText: "获取验证码",
      count: 60,
      codeData: ""
    };
  },
  methods: {
    goBack() {
      this.$router.back(-1);
    },
    getCode() {
      var sMobile = this.phone;
      if (!/^1[3|4|5|6|7|8|9][0-9]\d{4,8}$/.test(sMobile)) {
        this.$toast.error("手机号格式不正确", 2000);
        return false;
      }
      this.$server({
        url: "/user/get-sms-code",
        method: "post",
        data: {
          mobile: this.phone
        }
      }).then(res => {
        this.codeData = res.code;
        this.setIntime = setInterval(() => {
          this.getCodeText = this.count + "秒";
          this.count -= 1;
          if (this.count == 0) {
            this.count = 60;
            this.getCodeText = "获取验证码";
            clearInterval(this.setIntime);
          }
        }, 1000);
      });
    },
    postSignIn() {
      let sMobile = this.phone;
      if (!/^1[3|4|5|6|7|8|9][0-9]\d{4,8}$/.test(sMobile)) {
        this.$toast.error("手机号格式不正确", 2000);
        return false;
      }
      if (this.code.length === 0) {
        this.$toast.error("验证码不能是空", 2000);
        return false;
      }
      // if(this.codeData != this.code){
      //     this.$toast.error('验证码错误', 2000)
      //     return false;
      // }
      this.$server({
        url: "/user/login",
        method: "post",
        data: {
          mobile: this.phone,
          code: this.code
        },
        headers: {
          Authorization: "Bearer " + this.$cookies.get("token")
        }
      }).then(res => {
        console.log(res);
        this.$cookies.set("signIn", res.token);
        this.$router.push("/select");
      });
    }
  }
};
</script>
<style lang="less" scoped>
.login {
  width: 100%;
  position: relative;
}
.bgImg {
  width: 100%;
}
.loginImg {
  position: absolute;
  left: 35%;
  top: 50%;
  width: 30%;
}
.goButton {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0%;
  top: 0;
  background: rgba(0, 0, 0, 0.3);
  color: #fff;
  .backIndex {
    position: absolute;
    width: 30px;
    left: 10px;
    top: 10px;
  }
  .content {
    position: relative;
    width: 80%;
    left: 10%;
    top: 15%;
  }
  h3 {
    font-weight: 400;
  }
  h5 {
    font-weight: 300;
    margin-top: 5%;
  }
  p {
    font-weight: 300;
    margin-top: 13%;
    font-size: 12px;
  }
  .phone {
    width: calc(100% - 30px);
    background: rgba(255, 255, 255, 0.2);
    border: 0;
    height: 35px;
    border-radius: 18px;
    margin-top: 8%;
    color: #fff;
    padding: 0 15px;
    outline-style: none;
  }
  .phone::-webkit-input-placeholder {
    color: #fff;
  }
  .phone::-ms-input-placeholder {
    color: #fff;
  }
  button {
    width: 100%;
    background: rgba(255, 255, 255, 0.5);
    border: 0;
    height: 35px;
    border-radius: 18px;
    margin-top: 8%;
    color: #fff;
    outline-style: none;
  }
}
</style>
