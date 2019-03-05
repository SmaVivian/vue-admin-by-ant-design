<template>
  <div class="cmp-header-sub">
    <a-tabs class="tabs" size="large" :defaultActiveKey="activeName" @change="handleChange">
      <a-tab-pane
        v-for="(item, index) in tabList"
        :key="item.path"
        :tab="item.name">
        <!-- {{item.content}} -->
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
export default {
  name: 'HeaderSub',
  props: {
    tabList: {
      type: Array,
      default() {
        return []
      }
    },
    activeTab: {
      type: String,
      default: ''
    }
  },
  watch: {
    // active() {
    //   this.activeName = this.active
    //   debugger
    // }
  },
  data() {
    return {
      activeName: this.activeTab
    }
  },
  methods: {
    handleChange(key) {
      this.$emit('projectEventTab', key);
    },
  }
}
</script>

<style lang="scss">
.cmp-header-sub {
  .tabs {

  }
  .ant-tabs-bar {
    margin: 0;
  }
}
</style>

