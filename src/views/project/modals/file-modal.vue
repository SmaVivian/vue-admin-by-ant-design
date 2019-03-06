<template>
  <a-modal
    class="modal-file"
    :centered="true"
    :width="800"
    title="移动至"
    v-model="visible"
    @ok="handleOk">
    <div>
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
      visible: false
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


