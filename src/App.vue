<template>
  <div id="app">
    <div class="g-container" 
      :class="{'header-no': !$store.getters.headerShow, 'bg-none': $store.getters.bodyBg === 'bgNone'}">
      <cmp-header v-if="$store.getters.headerShow"></cmp-header>
      <keep-alive>
        <router-view/>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import cmpHeader from '@cmp/Header'
export default {
  name: 'App',
  components: {
    cmpHeader
  },
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


