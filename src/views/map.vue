<template>
  <div id="map">
    <Top titlename="选择地址"></Top>
    <div>
      <div class="condition" @click="changeMap(1)">
        <p>矿泉水</p>
        <img
          v-if="selectIndex == 1"
          src="../assets/img/map/iconChooseActive@3x.png"
        />
        <img v-else src="../assets/img/map/iconChooseDefault@3x.png" />
      </div>
      <div class="condition" @click="changeMap(2)">
        <p>九龙山</p>
        <img
          v-if="selectIndex == 2"
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
      selectIndex: 1
    };
  },
  methods: {
    changeMap(index) {
      this.selectIndex = index;
    },
    getMap() {
      this.$server({
        url: ''
      })
    }
  }
};
</script>
<style lang="less" scoped>
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
