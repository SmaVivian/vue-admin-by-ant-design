<template>
  <div class="page-project-sub-container">
    <div class="page-project-sub">
      <div class="top">
        <a-breadcrumb>
          <a-breadcrumb-item>
            <router-link tag="a" :to="{ path: '/' }">首页</router-link>
          </a-breadcrumb-item>
          <a-breadcrumb-item>活动管理</a-breadcrumb-item>
        </a-breadcrumb>

        <cmp-header-sub :tabList="tabs" :activeTab="currentTab" @projectEventTab="changeTab"></cmp-header-sub>
        <div class="menu-sub-right">
          <span>看板视图</span>
          <span>2</span>
          <span>菜单</span>
        </div>
      </div>

      <div class="sub-content">
        <div class="sub-content-wrap">
          <component :is="currentTabCmp"></component>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cmpHeaderSub from '@cmp/HeaderSub'
import taskProject from './task'
import exhibitsProject from './exhibits'
import fileProject from './file'
import discussProject from './discuss'
import statisticProject from './statistic'
export default {
  components: {
    cmpHeaderSub,
    taskProject,
    exhibitsProject,
    fileProject,
    discussProject,
    statisticProject,
  },
  data() {
    return {
      tabs: [
        {
          name: '任务',
          path: 'task'
        },
        {
          name: '展品',
          path: 'exhibits'
        },
        {
          name: '文件',
          path: 'file'
        },
        {
          name: '讨论',
          path: 'discuss'
        },
        {
          name: '统计',
          path: 'statistic'
        },
      ]
    }
  },
  computed: {
    currentTab() {
      return this.$route.query.type
    },
    currentTabCmp() {
      return this.currentTab + 'Project'
    }
  },
  methods: {
    changeTab(path) {
      this.$router.replace({path: '/project/sub', query: {type: path}})
    }
  }
}
</script>

<style lang="scss" scoped>
.page-project-sub {
  .top {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #f2f2f2;
    box-shadow: 0 2px 0 gray;  
  }
  .sub-content {
    position: relative;
    top: 2px;
    min-height: calc(100vh - 116px);
    box-sizing: border-box;
  }
  .sub-content-wrap {
    width: 1200px;
    margin: 20px auto;
  }
}
</style>




