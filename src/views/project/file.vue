<template>
  <div class="page-exhibits">
    <div class="btns clearfix">
      <h2 class="fl">文件夹</h2>
      <div class="right fr">
        <a-button class="g-btns-mr">创建文件夹</a-button>
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
    </a-table>
  </div>
</template>

<script>
export default {
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
        pageSize: 10
      },
      list: [],
      loading: true,
    }
  },
  methods: {
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


