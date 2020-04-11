<template>
  <div id="map">
    <Top titlename="选择地址"></Top>
    <div v-if="snowListTyle" class="downlist">
      <div v-for="(item,index) in snowList"  @click="getMap(item.id)" :key="index" class="list">
        <div>
          <img :src="item.backgroup_image_url" alt="" />
          <p>{{item.ski_park_area}}</p>
        </div>
      </div>
    </div>
    <div v-else>
      <div v-for="(item,index) in mapList" :key="index" class="condition" @click="changeMap(index, item)">
        <p>{{item.ski_park_name}}</p>
        <img
          v-if="selectIndex === index"
          src="../assets/img/map/iconChooseActive@3x.png"
        />
        <img v-else src="../assets/img/map/iconChooseDefault@3x.png" />
      </div>
    </div>
  </div>
</template>
<script>
import Top from "../components/top";
export default {
  name: "map",
  components: {
    Top
  },
  data() {
    return {
      selectIndex: '',
      snowList: [],
      mapList: [],
      snowListTyle: true
    };
  },
  methods: {
    changeMap(index, item) {
      this.selectIndex = index;
      this.$cookies.set('xuechang', item)
      setTimeout(()=>{
        this.$router.go(-1)
      },500)
    },
    getMap(id) {
      this.$server({
        url: '/album/ski-parks',
        params: {
          area_id: id,
          page: 100
        }
      }).then(data=>{
        this.snowListTyle = false
        this.mapList = data.data
      })
    },
    getSnowList() {
      this.$server({
        url:'/album/ski-park-area',
        params: {
          'per-page': 100
        }
      }).then(data=>{
        this.snowList = data.data
      })
    }
  },
  mounted() {
    if(!this.$cookies.get("signIn")) this.$router.push('/home')
    this.getSnowList()
  }
};
</script>
<style lang="less" scoped>
  .downlist {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    margin:4% 5%;
    .list {
      width: 48.5%;
      div {
        width:100%;
        height:0;
        padding-bottom:100%;
        position:relative;
      }
      img {
        width:100%;
        height:100%;
        position:absolute;
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
</style>
