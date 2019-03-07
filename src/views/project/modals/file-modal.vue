<template>
  <a-modal
    class="modal-file"
    :centered="true"
    :width="800"
    title="移动至"
    v-model="visible"
    @ok="handleOk">
    <div>
      <div></div>
      <p>名称1</p>
      <p>名称1</p>
      <p>名称1</p>
      <p>名称1</p>
      <p>名称1</p>
    </div>
  </a-modal>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      dataList: [
        {
          name: '烈火展项目',
          children: [
            {
              name: '招标文件夹',
              children: [
                {
                  name: '招标文件夹1',
                },
                {
                  name: '招标文件夹2',
                },
              ]
            },
            {
              name: '设计文件夹'
            },
          ]
        },
        {
          name: '东北抗联展项目',
          children: [
            {
              name: '东北招标文件夹',
            },
            {
              name: '东北设计文件夹',
              children: [
                {
                  name: '招标文件夹1',
                },
                {
                  name: '招标文件夹2',
                },
              ]
            },
          ]
        }
      ]
    }
  },
  methods: {
    init() {
      this.visible = true
    },
    handleOk() {

    }
  }
}
</script>

<style lang="scss" scoped>

</style>


