<template>
  <div class="downlist">
    <div
      v-for="(item, index) in snowList"
      @click="$router.push('/downloadimg?id=' + item.id)"
      :key="index"
      class="list"
    >
      <div>
        <img :src="item.backgroup_image_url" alt="" />
        <p>{{ item.ski_park_area }}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      snowList: []
    };
  },
  methods: {
    getSnowList() {
      this.$server({
        url: "/album/ski-park-area",
        params: {
          "per-page": 100
        }
      }).then(data => {
        this.snowList = data.data;
      });
    }
  },
  mounted() {
    this.getSnowList();
  }
};
</script>
<style lang="less" scoped>
.downlist {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  margin: 4% 5%;
  .list {
    width: 48.5%;
    div {
      width: 100%;
      height: 0;
      padding-bottom: 100%;
      position: relative;
    }
    img {
      width: 100%;
      height: 100%;
      position: absolute;
    }
    p {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
