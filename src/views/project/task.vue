<template>
  <div class="page-project-task">
    <div class="content">
      <a-row :gutter="20">
        <a-col :span="4" v-for="(item, index) in list" :key="index">
          <drag-list :list="item.arrList" :title="item.title"/>
        </a-col>
        <a-col :span="4">
          <a-button plain>新建任务看板</a-button>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import DragList from '@/components/DragList'
export default {
  components: {
    DragList
  },
  data() {
    return {
      list: [
        {
          title: '标题1',
          arrList: [
            { name: "1列表", id: 1 },
            { name: "12列表", id: 2 },
            { name: "13列表", id: 3 },
            { name: "14列表", id: 4 }
          ],
        },
        {
          title: '标题2',
          arrList: [
            { name: "21列表", id: 5 },
            { name: "22列表", id: 6 },
            { name: "23列表", id: 7 }
          ],
        },
        {
          title: '标题3',
          arrList: [
            { name: "31列表", id: 8 },
            { name: "32列表", id: 9 },
            { name: "33列表", id: 10 }
          ],
        },
      ]
    }
  },
  created() {
    this.$store.dispatch('changeBodyBg', 'bgNone')
  },
  destroyed() {
    this.$store.dispatch('changeBodyBg', '')
  }
}
</script>

<style lang="scss" scoped>
.page-project-task {
  background-color: #fff;
  .top {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #f2f2f2;
  }
  .content {
    padding: 20px;
  }
}
</style>

