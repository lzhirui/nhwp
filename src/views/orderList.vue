<template>
  <div class="bgColor">
    <Top titlename="订单列表"></Top>
    <div v-if="showpage">
      <div class="myHandout">
        <ul>
          <li v-for="(item, index) in handoutList" :key="index">
            <div class="img">
              <img :src="item.thumb_image_url" alt="" />
            </div>
            <div class="text">
              <h3>{{ item.ski_park_name }}</h3>
              <p>{{ item.create_time }}</p>
              <p>¥{{ item.total_fee }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div v-else class="noData">
      暂无订单
    </div>
  </div>
</template>
<script>
import format from "date-fns/format";
import Top from "../components/top";
export default {
  data() {
    return {
      handoutList: [
        {
          lessonTitle: "图片标题",
          lectureName: "作者",
          startDate: "2019-02-02 19:10:20",
          timeClassifyName: "546576",
          timePeriod: "5467"
        },
        {
          lessonTitle: "图片标题",
          lectureName: "作者",
          startDate: "2019-02-02 19:10:20",
          timeClassifyName: "546576",
          timePeriod: "5467"
        },
        {
          lessonTitle: "图片标题",
          lectureName: "作者",
          startDate: "2019-02-02 19:10:20",
          timeClassifyName: "546576",
          timePeriod: "5467"
        },
        {
          lessonTitle: "图片标题",
          lectureName: "作者",
          startDate: "2019-02-02 19:10:20",
          timeClassifyName: "546576",
          timePeriod: "5467"
        },
        {
          lessonTitle: "图片标题",
          lectureName: "作者",
          startDate: "2019-02-02 19:10:20",
          timeClassifyName: "546576",
          timePeriod: "5467"
        }
      ],
      showpage: false,
      pageIndex: 1,
      total: 0
    };
  },
  components: {
    Top
  },
  filters: {
    dateTime(val) {
      if (val) {
        val = val.replace(/-/g, "/");
        let time = new Date(val);
        return format(time, "yyyy-MM-dd");
      }
    }
  },
  methods: {
    scrollFunc(e) {
      let that = this;
      //文档内容实际高度（包括超出视窗的溢出部分）
      var scrollHeight = e.target.scrollHeight;
      //滚动条滚动距离
      var scrollTop = e.target.scrollTop;
      //窗口可视范围高度
      var clientHeight =
        window.innerHeight ||
        Math.min(
          document.documentElement.clientHeight,
          document.body.clientHeight
        );
      if (
        that.total > that.handoutList.length &&
        clientHeight + scrollTop == scrollHeight
      ) {
        that.getData();
      }
    },
    getData() {
      this.$server({
        url: "/album/seller-orders",
        params: {
          page: 1
        },
        headers: {
          Authorization: "Bearer " + this.$cookies.get("signIn")
        }
      }).then(res => {
        this.handoutList = res.data;
        this.showpage = true;
      });
    }
  },
  mounted() {
    //初始化进来要记录切换状态用在information 页面问题
    // window.addEventListener('scroll', this.scrollFunc, true)
    if (!this.$cookies.get("signIn")) this.$router.push("/");
    this.getData();
  }
};
</script>
<style lang="less" scoped>
.bgColor {
  background: #fafafa;
  position: relative;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}
.notes {
  font-family: PingFangSC-Regular;
  font-size: 0.75rem;
  color: #333333;
  text-align: center;
  padding: 1.93rem 0 0.7rem 0;
}
.noData {
  position: relative;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.myHandout {
  ul {
    width: 92%;
    margin-left: 4%;
    li {
      list-style: none;
      border-radius: 10px;
      margin-top: 0.7rem;
      background: #fff;
      padding: 0.63rem;
      display: flex;
      align-items: center;
      position: relative;
      .img {
        width: 45%;
        img {
          width: 100%;
        }
      }
      .text {
        margin-left: 5%;
        line-height: 23px;
      }
      .submit {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 10px;
        position: absolute;
        right: 3%;
        bottom: 10%;
        div.colorBlue {
          font-family: PingFangSC-Regular;
          font-size: 0.75rem;
          color: #26a4f2;
          background: #d4edfc;
          border-radius: 2px;
          padding: 0 2px;
        }
        div.detail {
          border: 1px solid #26a4f2;
          border-radius: 100px;
          width: 90px;
          height: 30px;
          font-family: PingFangSC-Regular;
          font-size: 0.9rem;
          color: #26a4f2;
          text-align: center;
          line-height: 30px;
          cursor: pointer;
        }
        div.colorRed {
          font-family: PingFangSC-Regular;
          font-size: 0.75rem;
          color: #ff7539;
          background: #ffeae1;
          border-radius: 2px;
          padding: 0 2px;
        }
        div.detailred {
          border: 1px solid #ff7539;
          border-radius: 100px;
          width: 90px;
          height: 30px;
          font-family: PingFangSC-Regular;
          font-size: 0.9rem;
          color: #ff7539;
          text-align: center;
          line-height: 30px;
          cursor: pointer;
        }
      }
      h3 {
        font-size: 1rem;
        width: 95%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      p {
        font-family: PingFangSC-Regular;
        font-size: 0.75rem;
        color: #666666;
        span {
          margin-right: 22px;
        }
      }
    }
  }
}
</style>
