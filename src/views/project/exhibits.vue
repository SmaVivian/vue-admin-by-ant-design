<template>
  <div class="page-exhibits">
    <div class="btns-warap clearfix">
      <div class="left fl">
        <a-button class="g-btns-mr" type="primary" @click="addCollect">添加藏品</a-button>
        <a-button class="g-btns-mr" type="primary">添加藏品</a-button>
        <a-button class="g-btns-mr" type="primary">添加藏品</a-button>
        <a-button class="g-btns-mr" type="primary">添加藏品</a-button>
      </div>
      <a-button class="fr" type="primary">查看管内藏品</a-button>
    </div>

    <a-table 

      :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
      :columns="columns"
      :dataSource="list"
      rowKey="id"
      :pagination="ipagination"
      :loading="loading"
      @change="handleTableChange">
      <template slot="status" slot-scope="status">
        {{status | statusFilter}}
      </template>
      <!-- <a slot="name" slot-scope="text" href="javascript:;">{{text}}</a> -->
    </a-table>
    <span>TODO delete {{hasSelected}}</span>

    <exhibits-modals ref="modal"></exhibits-modals>
  </div>
</template>

<script>
import exhibitsModals from './modals/exhibits-modals'
export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        '2': 'success',
        '1': 'gray',
        '0': 'danger'
      }
      return statusMap[status]
    }
  },
  components: {
    exhibitsModals
  },
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
        }
        // {
        //   title: '操作',
        //   dataIndex: 'action',
        //   align:"center",
        //   scopedSlots: { customRender: 'action' },
        // }
      ],
      selectedRowKeys: [],
      // 分页参数
      ipagination:{
        current: 1,
        pageSize: 10,
        hideOnSinglePage: true,
        pageSizeOptions: ['10', '20', '30'],
        showTotal: (total, range) => {
          return "共" + total + "条"
          // return range[0] + "-" + range[1] + " 共" + total + "条"
        },
        showQuickJumper: true,
        showSizeChanger: true,
        total: 0
      },
      list: [],
      loading: true
    }
  },
  computed: {
    // todo
    hasSelected() {
      console.log(22222, this.selectedRowKeys.length)
      return this.selectedRowKeys.length > 0
    }
  },
  methods: {
    addCollect() {
      this.$refs.modal.init()
    },
    getDataList() {
      this.loading = true
      this.$http.get('/list', {
        currentPage: this.ipagination.current,
        size: this.ipagination.pageSize
      }).then(response => {
        this.list = response.data.list
        console.log(this.list)
        this.ipagination.total = response.data.page.allRow
        this.loading = false
      })
    },
    handleTableChange(pagination, filters, sorter){
      console.log(pagination)
      this.ipagination = pagination
      this.getDataList()
    },
    onSelectChange (selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
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
  padding: 20px;
  background-color: #fff;
  .btns-warap {
    margin-bottom: 20px;
  }
}
</style>


