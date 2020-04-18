<template>
  <div>
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
      <p>共{{ total }}张</p>
    </div>
    <div class="content">
      <div v-for="(item, index) in list" class="list" :key="index">
        <div @click="showImg(index)">
          <img class="previewer-demo-img" :src="item.src" alt="" />
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
      <div :class="dataHave ? 'optye100' : 'optye0'">
        <img
          v-for="(item, index) in list"
          :key="index"
          :src="item.src"
          alt=""
        />
        <previewer
          ref="previewerDiv"
          :list="list"
          :options="options"
          @on-close="closeImg()"
          @on-index-change="getCurrentIndex"
        >
        </previewer>
      </div>
      <div v-if="dataHave" class="downloadImgButton" @click="downImg()">
        <img src="../assets/img/downlist/iconDownload@3x.png" alt="" />
        <span>下载高清图</span>
      </div>
      <div>
        <div class="qrcode" v-if="qrcodeShow" @click="closeQrCode">
          <img :src="qrcode" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import dateTools from "../components/data";
import axios from "axios";
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
      list: [],
      dataHave: false,
      imgIndex: 0,
      qrcode: "",
      qrcodeShow: false,
      token: this.$cookies.get("signIn") ? this.$cookies.get("signIn") : this.$cookies.get("token"),
      options: {
        getThumbBoundsFn(index) {
          // find thumbnail element
          let thumbnail = document.querySelectorAll(".previewer-demo-img")[
            index
          ];
          // get window scroll Y
          let pageYScroll =
            window.pageYOffset || document.documentElement.scrollTop;
          // optionally get horizontal scroll
          // get position of element relative to viewport
          let rect = thumbnail.getBoundingClientRect();
          // w = width
          return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
          // Good guide on how to get element coordinates:
          // http://javascript.info/tutorial/coordinates
        }
      }
    };
  },
  components: {
    dateTools
  },
  mounted() {
    if (!this.$cookies.get("signIn") && !this.$cookies.get("token")) this.$router.push("/");
    this.getData();
  },
  methods: {
    showImg(index) {
      // 显示特定index的图片，使用ref
      this.dataHave = true;
      this.imgIndex = index;
      this.$refs.previewerDiv.show(index);
    },
    closeImg() {
      this.dataHave = false;
    },
    bigImg() {
      this.show = true;
    },
    getCurrentIndex(changeData) {
      this.imgIndex = changeData.currentIndex;
    },
    topDateFun2() {},
    closeDownload() {
      this.show = false;
    },
    downImg() {
      this.$server({
        url: "/album/download-image",
        params: {
          photo_id: this.list[this.imgIndex].id
        },
        headers: {
          Authorization: "Bearer " + this.token
        }
      }).then(res => {
        if (res.download_url) {
          window.location.href = res.download_url + "?attname=";
        } else {
          this.zhifu();
        }
      });
    },
    zhifu() {
      axios
        .get("http://photo.fewsecond.cn/apis/album/buy-photo", {
          params: {
            photo_id: this.list[this.imgIndex].id,
            pay_method: "qr"
          },
          headers: {
            Authorization: "Bearer " + this.token
          },
          responseType: "arraybuffer"
        })
        .then(response => {
          return (
            "data:image/png;base64," +
            btoa(
              new Uint8Array(response.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ""
              )
            )
          );
        })
        .then(data => {
          this.qrcodeShow = true;
          this.qrcode = data;
          this.setIntervalFunc();
        });
    },
    setIntervalFunc() {
      this.setIntervalParameter = setInterval(() => {
        this.$server({
          url: "/album/query-pay-result",
          params: {
            photo_id: this.list[this.imgIndex].id
          },
          headers: {
            Authorization: "Bearer " + this.token
          }
        }).then(res => {
          if (res.status == 200) {
            this.qrcodeShow = false;
            clearInterval(this.setIntervalParameter);
          }
        });
      }, 1000);
    },
    closeQrCode() {
      this.qrcodeShow = false;
      clearInterval(this.setIntervalParameter);
    },
    selectButtonFunc(index) {
      this.selectTyle = index;
      if (index == 2) {
        this.dateShowType = true;
        this.myselectdate = "选择日期";
      } else {
        this.myselectdate = "选择日期";
        this.dateShowType = false;
        this.getData();
      }
    },
    changeDay(data) {
      let y = data.slice(0, 4);
      let m = data.slice(5, 6) < 10 ? "0" + data.slice(5, 6) : data.slice(5, 6);
      let d = data.slice(7, 8) < 10 ? "0" + data.slice(7, 8) : data.slice(7, 8);
      this.myselectdate = y + "-" + m + "-" + d;
      this.getData();
    },
    closeDate() {
      this.dateShowType = false;
    },
    getData() {
      this.list = [];
      this.$server({
        url: "/album/ski-park-album",
        params: {
          ski_park_id: this.$route.query.id,
          date: this.myselectdate != "选择日期" ? this.myselectdate : ""
        }
      }).then(data => {
        this.total = data.total;
        for (let i = 0; i < data.data.length; i++) {
          data.data[i].src = data.data[i].image_url;
          this.list.push(data.data[i]);
        }
      });
    }
  }
};
</script>
<style scoped lang="less">
.qrcode {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: #000;
  z-index: 9999999;
  display: flex;
  align-items: center;
  justify-content: center;
}
.optye0 {
  opacity: 0;
  position: absolute;
  top: -1000%;
}
.optye100 {
  opacity: 100%;
  position: absolute;
  top: -1000%;
}
.top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  padding: 10px 5%;
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
.content {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 4% 5%;
  .list {
    width: 48.5%;
    margin-top: 2%;
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
  }
}
.date {
  position: absolute;
  top: 56px;
  background: transparent;
  width: 100%;
  height: 100%;
}
.showBigImg {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 100%;
  }
}
.downloadImgButton {
  width: 70%;
  height: 50px;
  border-radius: 25px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 15%;
  background: rgb(74, 144, 226);
  position: relative;
  bottom: 50px;
  z-index: 99999;
}
</style>
