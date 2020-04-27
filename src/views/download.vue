<template>
  <div class="downlist">
    <div class="top">
      <div>
        <button
          :class="selectTyle == 1 ? 'select' : ''"
          @click="selectButtonFunc(1)"
        >
          所有照片
        </button>
        <button
          :class="selectTyle == 2 ? 'select' : ''"
          @click="selectButtonFunc(2)"
        >
          {{ myselectdate }}
        </button>
      </div>
    </div>
    <div v-if="dateShowType" class="date" @click="closeDate">
      <dateTools
        :dateToolsKey="2"
        :trainDateList="trainDateList2"
        :trainDateFullList="trainDateFullList"
        ref="topDateTools2"
        @topDateEvent2="topDateFun2"
        @changeDay="changeDay"
      ></dateTools>
    </div>
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
import dateTools from "../components/data";
export default {
  data() {
    return {
      trainDateFullList: ["20180201", "20120228"],
      trainDateList2: [12, 17, 30],
      show: false,
      selectTyle: 1,
      dateShowType: false,
      myselectdate: "选择日期",
      total: 0,
      snowList: []
    };
  },
  components: {
    dateTools
  },
  methods: {
    getSnowList() {
      this.$server({
        url: "/album/ski-park-area",
        params: {
          "per-page": 100,
          date: this.myselectdate != "选择日期" ? this.myselectdate : ""
        }
      }).then(data => {
        this.snowList = data.data;
      });
    },
    closeDate() {
      this.dateShowType = false;
    },
    changeDay(data) {
      let y = data.slice(0, 4);
      console.log(data.slice(4, 6));
      let m = data.slice(4, 6);
      let d = data.slice(6, 8);
      this.myselectdate = y + "-" + m + "-" + d;
      this.getSnowList();
    },
    topDateFun2() {},
    selectButtonFunc(index) {
      this.selectTyle = index;
      if (index == 2) {
        this.dateShowType = true;
        this.myselectdate = "选择日期";
      } else {
        this.myselectdate = "选择日期";
        this.dateShowType = false;
        this.getSnowList();
      }
    }
  },
  mounted() {
    this.getSnowList();
  }
};
</script>
<style lang="less" scoped>
  .date {
    position: absolute;
    top: 76px;
    background: transparent;
    width: 100%;
    height: 100%;
    z-index: 222;
    max-width: 450px;
  }
.downlist {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  margin: 4% 5%;
  .list {
    width: 48.5%;
    margin-top: 10px;
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
.top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  padding: 10px 5%;
  width: 100%;
  div {
    button {
      width: 90px;
      height: 35px;
      border: 1px solid rgb(74, 144, 226);
      border-radius: 20px;
      background: #fff;
      color: rgb(74, 144, 226);
      margin-right: 15px;
      outline: none;
    }
    button.select {
      background: rgb(74, 144, 226);
      color: #fff;
    }
  }
}
</style>
