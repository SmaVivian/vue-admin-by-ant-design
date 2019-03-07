<template>
  <a-modal
    class="modal-file"
    :centered="true"
    :width="800"
    title="移动至"
    v-model="visible"
    @ok="handleOk">
    <a-row>
      <!-- <a-col :span="8" class="picker">
        <ul>
          <li v-for="(item, index) in dataList" :key="index" @click="clickPicker(item, $event)">{{item.name}}</li>
        </ul>
      </a-col> -->
      <a-col :span="24" class="file-picker-wrap">
        <div class="file-picker-view">
          <ul class="file-picker">
            <li v-for="(item, index) in viewList">
              <p v-for="(v, i) in item.arr" @click="clickPicker(v, index, $event)">{{v.name}}</p>
            </li>

            <!-- <li>
              <p>文件夹</p>
              <p>文件夹</p>
              <p>文件夹</p>
            </li> -->
          </ul>
        </div>
      </a-col>
    </a-row>
  </a-modal>
</template>

<script>
export default {
  data() {
    return {
      visible: true,
      dataList: [
        {
          name: '烈火展项目',
          id: '1',
          children: [
            {
              name: '招标文件夹',
              id: '2',
              children: [
                {
                  name: '招标文件夹1',
                  id: '3',
                },
                {
                  name: '招标文件夹2',
                  id: '4',
                },
              ]
            },
            {
              name: '设计文件夹',
              id: '5',
            },
          ]
        },
        {
          name: '东北抗联展项目',
          id: '6',
          children: [
            {
              name: '东北招标文件夹',
              id: '7',
            },
            {
              name: '东北设计文件夹',
              id: '8',
              children: [
                {
                  name: '招标文件夹1',
                  id: '9',
                },
                {
                  name: '招标文件夹2',
                  id: '10',
                },
              ]
            },
          ]
        },
        {
          name: '项目3',
          id: '11',
        }
      ],
      viewList: [],
      moveId: ''
    }
  },
  methods: {
    init() {
      this.visible = true
    },
    handleOk() {

    },
    clickPicker(item, index, e) {
      this.moveId = item.id
      console.log(this.moveId)
      // if(e.target.parentNode.nextSibling) {
      if(this.viewList[index+1] && this.viewList[index+1].arr) {
        // 父元素下一个元素不为空
        this.viewList[index+1].arr = item.children || []

        // 重置下下级之后的数据
        if(this.viewList[index+2]) {
          for(let i = index+2; i < this.viewList.length ; i++) {
            this.viewList[i].arr = []
          }
        }
      } else {
        if(!item.children) return
        this.viewList.push({
          arr: item.children
        })
      }
    }
  },
  created() {
    this.viewList.push({
      arr: this.dataList
    })
  }
}
</script>

<style lang="scss" scoped>
.modal-file {
  .picker {
    li {
      cursor: pointer;
    }
  }
  .file-picker-wrap {
    .file-picker-view {
      display: flex;
      // flex: 1;
      .file-picker {
        display: flex;
        li {
          width: 200px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>


