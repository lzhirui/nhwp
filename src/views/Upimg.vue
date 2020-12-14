<template>
  <div id="upimg">
    <Top titlename="上传图片"></Top>
    <div>
      <div @click="$router.push('/map')" class="condition">
        <div class="label_item">位置选择：</div>
        <div class="content_item">
          <input
            type="text"
            readonly
            autocomplete="off"
            v-model="map.ski_park_name"
            style="width: 75px;text-align: right"
          />
          <img src="../assets/img/you.svg" />
        </div>
      </div>
      <div class="condition group_item">
        <div class="label_item">日期选择：</div>
        <div class="content_item" onfocus="this.blur();" @click="birthdayClick">
          <input
            type="text"
            readonly
            autocomplete="off"
            v-model="birthday"
            placeholder="请选择日期"
            style="width: 75px"
          />
          <img src="../assets/img/you.svg" />
        </div>
      </div>
      <div class="condition">
        <div class="label_item">价格：</div>
        <div class="content_item">
          <input
            type="number"
            v-model="buy_price"
            placeholder=""
            step="0.01"
            @change="inputOnlyOnePoint"
            style="width: 75px;text-align: center;outline: none"
          />
          <img src="../assets/img/you.svg" />
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
      <div class="bgcolor"></div>
      <div class="img">
        <div
          v-for="(item, index) in imgList"
          :key="index"
          class="imgContent"
          @click="showImg(index)"
        >
          <img class="previewer-demo-img" :src="item.src" alt="" />
        </div>
        <div class="imgButton">
          <img src="../assets/img/upimg/iconChoose@3x.png" />
          <p>添加图片</p>
          <input
            @change="fileChange()"
            type="file"
            ref="file"
            accept="image/png, image/jpeg"
            multiple
          />
        </div>
      </div>
      <div class="upImg" @click="upImgAll()">我要上传</div>
    </div>
    <div :class="dataHave ? 'optye100' : 'optye0'">
      <img
        v-for="(item, index) in imgList"
        :key="index"
        :src="item.src"
        alt=""
      />
      <previewer
        v-show="dataHave"
        ref="previewerDiv"
        :list="imgList"
        :options="options"
        @on-close="closeImg()"
        @on-index-change="getCurrentIndex"
      >
      </previewer>
    </div>
    <div v-if="dataHave" class="delete" @click="deleteImg">
      <img src="../assets/img/upimg/iconDelete@3x.png" alt="" />
      <span>删除</span>
    </div>
  </div>
</template>
<script>
import Top from "../components/top";
import { format } from "date-fns";
import * as qiniu from "qiniu-js";
import dateTools from "../components/data";
export default {
  name: "upimg",
  data() {
    return {
      imgList: [],
      bigImgTyle: false,
      listIndex: 0,
      bugImgData: [],
      selectTime: "",
      mySwiper: "",
      birthday: format(new Date(), "yyyy-MM-dd"),
      map: {},
      dataHave: false,
      buy_price: 0.01,
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
      },
      imgIndex: 0,
      trainDateFullList: ["20180201", "20120228"],
      trainDateList2: [12, 17, 30],
      show: false,
      selectTyle: 1,
      dateShowType: false,
      myselectdate: "选择日期"
    };
  },
  components: {
    Top,
    dateTools
  },
  mounted() {
    if (!this.$cookies.get("signIn")) this.$router.push("/");
    if (this.$cookies.get("xuechang")) this.map = this.$cookies.get("xuechang");
  },
  methods: {
    inputOnlyOnePoint() {
      var inputVal;
      inputVal = Number(
              this.buy_price.toString().match(/^\d+(?:\.\d{0,2})?/)
      )
      this.buy_price = inputVal;
    },
    getCurrentIndex(changeData) {
      this.imgIndex = changeData.currentIndex;
    },
    closeDownload() {
      this.show = false;
    },
    closeImg() {
      this.dataHave = false;
    },
    topDateFun2() {},
    changeDay(data) {
      let y = data.slice(0, 4);
      let m = data.slice(4, 6);
      let d = data.slice(6, 8);
      this.birthday = y + "-" + m + "-" + d;
    },
    closeDate() {
      this.dateShowType = false;
    },
    showImg(index) {
      // 显示特定index的图片，使用ref
      this.dataHave = true;
      this.$refs.previewerDiv.show(index);
    },
    birthdayClick() {
      if (/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) {
        //移动端
        this.$picker.show({
          type: "datePicker",
          date: format(new Date(), "yyyy-MM-dd"),
          endTime: "2033-01-01", //截至时间
          startTime: "2020-01-01", //开始时间
          onOk: date => {
            this.birthday = date; // birthday就是所需字段，在data 里定义下
          }
        });
      } else {
        this.dateShowType = true;
      }
    },
    deleteImg() {
      this.imgList.splice(this.imgIndex, 1);
      if (this.imgList.length == 0) this.dataHave = false;
    },
    fileChange() {
      // let myfile = this.$refs.file
      this.getToken();
      // for(let i = 0 ; i < myfile.files.length ; i++) {
      //     this.imgListDataFunc(myfile.files[i])
      // }
      // console.log(this.imgList)
    },
    getToken() {
      this.$server({
        url: "/album/upload-token",
        headers: {
          Authorization: "Bearer " + this.$cookies.get("signIn")
        }
      }).then(data => {
        this.uploadFile(data.uptoken);
      });
    },
    uploadFile(token) {
      //后端获取token
      var uptoken = token;
      var file = this.$refs.file.files[0]; //Blob 对象，上传的文件
      var key = `snow_${+new Date()}_${file.name}`; // 上传后文件资源名以设置的 key 为主，如果 key 为 null 或者 undefined，则文件资源名会以 hash 值作为资源名。

      let config = {
        useCdnDomain: true //表示是否使用 cdn 加速域名，为布尔值，true 表示使用，默认为 false。
      };

      let putExtra = {
        fname: "", //文件原文件名
        params: {}, //用来放置自定义变量
        mimeType: ["image/png", "image/jpeg", "image/gif"] //用来限制上传文件类型，为 null 时表示不对文件类型限制；限制类型放到数组里： ["image/png", "image/jpeg", "image/gif"]
      };
      var observable = qiniu.upload(file, key, uptoken, putExtra, config);
      observable.subscribe({
        next: () => {
          // 主要用来展示进度
        },
        error: () => {
          // 失败报错信息
        },
        complete: result => {
          // 接收成功后返回的信息
          this.imgList.push({
            src: "http://whnp.fewsecond.cn/" + result.key
          });
        }
      });
    },
    upImgAll() {
      let arr = [];
      if (!this.map.id) {
        this.$toast.error("请选择雪场");
        return;
      }
      if (!this.birthday) {
        this.$toast.error("请选择时间");
        return;
      }
      if (this.imgList.length == 0) {
        this.$toast.error("请选择图片");
        return;
      }
      for (let i = 0; i < this.imgList.length; i++) {
        arr.push(this.imgList[i].src);
      }
      this.$server({
        url: "/album/upload-photos",
        method: "post",
        data: {
          ski_park_id: this.map.id,
          albums: arr,
          shooting_time: this.birthday,
          buy_price: Number(
            this.buy_price.toString().match(/^\d+(?:\.\d{0,2})?/)
          )
        },
        headers: {
          Authorization: "Bearer " + this.$cookies.get("signIn")
        }
      }).then(() => {
        this.map = {};
        this.birthday = format(new Date(), "yyyy-MM-dd");
        this.imgList = [];
        this.$toast.success("上传成功");
      });
    },
    imgListDataFunc(file) {
      let _this = this;
      let reader = new FileReader();
      reader.readAsDataURL(file); // 这里是最关键的一步，转换就在这里
      reader.onloadend = function() {
        _this.imgList.push({ src: this.result });
      };
    },
    closeBigImg() {
      this.bigImgTyle = false;
      this.bugImgData = [];
      this.listIndex = 0;
    },
    showBigImg(index) {
      this.bugImgData = this.imgList;
      this.listIndex = index;
      this.bigImgTyle = true;
    }
  }
};
</script>
<style lang="less" scoped>
.optye0 {
  opacity: 0;
  position: absolute;
  top: -1000%;
}
.optye100 {
  opacity: 1;
  position: absolute;
  top: -1000%;
}
input {
  border: 0;
}
.content_item {
  width: 40%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
#upimg {
  position: absolute;
  width: 100%;
  height: 100%;
  max-width: 500px;
}
.condition {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 0, 0, 0.25);
  padding: 12px 15px;
  img {
    width: 15px;
  }
}
.bgcolor {
  background: #fafafa;
  width: 100%;
  height: 20px;
}
.img {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: calc(100% - 30px);
  margin-left: 15px;
  flex-wrap: wrap;
  padding-top: 1%;
  padding-bottom: 60px;
  div {
    margin: 2% 1%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    overflow: hidden;
    width: 31%;
  }
  .imgContent {
    width: 31%;
    height: 130px;
    background: rgb(227, 227, 227);
    padding-bottom: 3%;
    display: block;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .imgButton {
    width: 31%;
    height: 130px;
    background: rgb(227, 227, 227);
    padding-bottom: 3%;
    display: block;
    position: relative;
    img {
      width: 60%;
      margin: 5% 20% 0 20%;
    }
    p {
      text-align: center;
      color: rgb(155, 155, 155);
      font-size: 13px;
    }
    input {
      opacity: 0;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
}
.upImg {
  max-width: 470px;
  width: calc(100% - 30px);
  margin-left: 15px;
  background: rgb(74, 144, 226);
  color: #fff;
  height: 35px;
  border-radius: 20px;
  position: fixed;
  bottom: 20px;
  border: 0;
  text-align: center;
  line-height: 35px;
}
.delete {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  position: absolute;
  top: 10px;
  z-index: 99999;
  left: 10px;
  img {
    width: 20px;
  }
  span {
    margin-left: 10px;
    font-size: 16px;
  }
}
.date {
  position: absolute;
  top: 145px;
  background: transparent;
  width: 100%;
  height: 100%;
  z-index: 2222;
}
</style>
