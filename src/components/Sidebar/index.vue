<template>
  <div class="cmp-sidebar">
    <a-menu
      :defaultSelectedKeys="[activeIndex]"
      :defaultOpenKeys="openeds"
      class="cmp-sidebar-content"
      @openChange="handleChange"
      @click="handleClick"
      mode="inline">

      <template v-for="item in menuList">
        <!-- 有子菜单 -->
        <a-menu-item :key="item.index" v-if="!item.children">
          <a-icon :type="item.icon" />
          <span>{{item.name}}</span>
        </a-menu-item>

        <!-- 无子菜单 -->
        <a-sub-menu :key="item.name" v-if="item.children">
          <span slot="title">
            <a-icon :type="item.icon" />
            <span>{{item.name}}</span>
          </span>
          <template v-for="v in item.children">
            <a-menu-item :key="v.index">{{v.name}}</a-menu-item>
          </template>
          <a-menu-item key="add" v-if="item.hasBtn" @click="addGroup">+新建分组</a-menu-item>
        </a-sub-menu>
      </template>
    </a-menu>
  </div>
</template>

<script>
export default {
  name: 'sidebar',
  props: {
    menuList: {
      type: Array,
      default: () => []
    },
    activeIndex: {
      type: String,
      default: '/project'
    },
    // 默认展开的菜单 ['一级菜单index', '一级菜单index'...]
    openeds: {
      type: Array,
      default: () => []
    }
  },
  data() {
    console.log(this.menuList)
    return {

    }
  },
  methods: {
    handleChange(key, keyPath) {
      // console.log(key, keyPath)
    },
    handleClick(key, keyPath) {
      console.log(key, keyPath)
    },
    addGroup() {
      console.log('add')
    }
  }
}
</script>

<style lang="scss" scoped>
.cmp-sidebar {
  float: left;
  width: 200px;
}
</style>

<style lang="scss">
.cmp-sidebar {
  
}
</style>


