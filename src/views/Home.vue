<template>
  <div class="home">
    <img src="../assets/img/index/bg@3x.jpg" class="bgImg" alt="" />
    <img src="../assets/img/index/logo@3x.png" class="loginImg" alt="" />
    <div class="goButton">
      <button @click="$router.push('/download')">我要下载</button>
      <button @click="$router.push('/login')">我要上传</button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'home',
  methods: {
    getToken() {
      this.$server({
        url: '/user/get-token'
      }).then(res=>{
        this.$cookies.set('token',res.token)
      }).catch(err=>{
        console.log(err)
      })
    }
  },
  mounted() {
    this.getToken()
  }
}
</script>
<style lang="less" scoped>
  .home {
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
    left: 0;
    top: 0;
    button {
      width: 64%;
      border-radius: 20px;
      border: 0;
      height: 42px;
      position: absolute;
      font-size: 14px;
      left: 18%;
      outline-style: none;
    }
    button:first-child {
      top: 66%;
      background: rgb(74, 144, 226);
      border: 1px solid rgb(74, 144, 226);
      color: #fff;
    }
    button:last-child {
      top: 76%;
      background: #fff;
      border: 1px solid rgb(74, 144, 226);
      color: rgb(74, 144, 226);
    }
  }
</style>