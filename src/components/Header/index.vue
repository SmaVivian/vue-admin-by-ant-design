<template>
  <div class="cmp-header">
    <img class="logo" src="" alt="">
    <a-menu
      v-model="activeMenu"
      theme="dark"
      class="menu-top"
      mode="horizontal"
      @click="handleClick"
      background-color="#001529"
      text-color="#fff"
      active-text-color="#6ea8dc">
      <a-menu-item key="/home">首页</a-menu-item>
      <a-menu-item key="/project">项目</a-menu-item>
      <a-menu-item key="/collect">藏品</a-menu-item>
      <a-menu-item key="/digital">数字资产</a-menu-item>
    </a-menu>
    <div class="operate">
      <a-icon type="search" style="font-size: 20px;"/>
      <a-icon type="bell" style="font-size: 20px;"/>
      <label class="person">
        <img src="" alt="">
        <span>Jane</span>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    
    return {
      activeMenu: [this.$route.meta.menuPath || this.$route.path]
    }
  },
  methods: {
    handleClick(item) {
      if(this.$route.path !== item.key) {
        this.$router.push(item.key)
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.cmp-header {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 60px;
  background-color: #001529;
  .logo {
    width: 280px;
  }
  .menu-top {
    width: 540px;
  }
  .operate {
    width: 200px;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: #fff;
    .person {
      img {
        display: inline-block;
        width: 50px;
        height: 50px;
        vertical-align: middle;
        border-radius: 100%;
      }
    }
  }
}
</style>


