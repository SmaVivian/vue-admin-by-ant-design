<template>
  <div id="app">
    <div class="g-container" 
      :class="{'header-no': !$store.getters.headerShow, 'bg-none': $store.getters.bodyBg === 'bgNone'}">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  created() {
    console.log(this.$store.getters)
  },
}
</script>

<style lang="scss">
  @import './assets/css/reset.css';
  // @import 'ant-design-vue/dist/antd.css';
  @import '~@/assets/css/theme.scss';
  // @import '~@/assets/css/resetCmp.scss';
</style>


