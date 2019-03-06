<template>
  <div class="page-exhibits">
    <div class="btns clearfix">
      <h2 class="fl">文件夹</h2>
      <div class="right fr">
        <a-button class="g-btns-mr" @click="addFolder">创建文件夹</a-button>
        <a-button>上传</a-button>
      </div>
    </div>

    <a-table 
      :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
      :columns="columns"
      :dataSource="list"
      rowKey="id"
      :pagination="false"
      :loading="loading"
      @change="handleTableChange">
      <span slot="action" slot-scope="text, record">
        <a class="g-btns-mr" @click="move(record)">移动</a>
        <a class="g-btns-mr">添加</a>
        <a>添加2</a>
      </span>
    </a-table>

    <!-- 新建文件夹弹框 -->
    <a-modal
      class="modal-folder"
      title="新建文件夹"
      :centered="true"
      :width="300"
      okText="创建"
      v-model="visibleFolder"
      @ok="handleOk">
      <a-form :form="form">
        <a-form-item>
        <!-- label="Note"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 12 }" -->
          <a-input
            v-decorator="[
              'note',
              {rules: [{ required: true, message: '输入文件夹名称' }]}
            ]"/>
        </a-form-item>
      </a-form>
    </a-modal>

    <file-modal ref="modal"></file-modal>
  </div>
</template>

<script>
import fileModal from './modals/file-modal'
export default {
  components: { fileModal },
  data() {
    return {
      // 表头
      columns: [
        {
          title: '#',
          dataIndex: '',
          key:'rowIndex',
          width:60,
          align:"center",
          customRender:function (t,r,index) {
            return parseInt(index)+1;
          }
        },
        {
          title: '标题',
          align:"center",
          dataIndex: 'title'
        },
        {
          title: '姓名',
          align:"center",
          dataIndex: 'name'
        },
        {
          title: '数量',
          align:"center",
          dataIndex: 'count'
        },
        {
          title: '状态',
          align:"center",
          dataIndex: 'status',
          scopedSlots: { customRender: 'status'}
          // customRender:function (t,r,index) {
          //   console.log(111, t)
          //   console.log(111, r)
          //   console.log(111, index)
          //   return r.status + 'aaa';
          // }
        },
        {
          title: '更新时间',
          dataIndex: 'createTime',
          align:"center",
          sorter: true
        },
        {
          title: '操作',
          dataIndex: 'action',
          align:"center",
          scopedSlots: { customRender: 'action' },
        }
      ],
      selectedRowKeys: [],
      // 分页参数
      ipagination:{
        current: 1,
        pageSize: 10
      },
      list: [],
      loading: true,

      visibleFolder: false,
      form: this.$form.createForm(this),
    }
  },
  methods: {
    addFolder() {
      this.visibleFolder = true
    },
    handleOk() {
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
        }
      })
      // this.visibleFolder = false
    },
    move(item) {
      this.$refs.modal.init()
      console.log(item)
    },
    getDataList() {
      this.loading = true
      this.$http.get('/list', {
        currentPage: this.ipagination.current,
        size: this.ipagination.pageSize
      }).then(response => {
        this.list = response.data.list
        console.log(this.list)
        this.loading = false
      })
    },
    handleTableChange(pagination, filters, sorter){
      console.log(sorter);
      this.getDataList();
    },
    onSelectChange (selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys
    }
  },
  created() {
    this.getDataList()
  }
}
</script>

<style lang="scss" scoped>
.page-exhibits {
  background-color: #fff;
  .btns {
    padding: 12px;
    background-color: #fff;
    border: 1px solid #ebeef5;
  }
}
</style>

<style lang="scss">
.modal-folder {
  .ant-btn-default {
    display: none;
  }
  .ant-btn-primary {
    width: 100%;
  }
}
</style>



