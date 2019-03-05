<template>
  <a-modal
    :width="1000"
    title="添加藏品"
    v-model="visible"
    @ok="handleOk">
    <!-- 查询区域 -->
    <div class="g-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item label="常用条件">
              <a-input placeholder="请输入" v-model="queryParam.username"></a-input>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item label="选择时间">
              <a-date-picker v-model="queryParam.date" style="width: 100%" placeholder="请输入日期" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item>
              <a-date-picker v-model="queryParam.date" style="width: 100%" placeholder="请输入日期" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item>
              <a-date-picker v-model="queryParam.date" style="width: 100%" placeholder="请输入日期" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item label="藏品条件">
              <a-select v-model="queryParam.sex" placeholder="请选择性别查询">
                <a-select-option value="">请选择性别查询</a-select-option>
                <a-select-option value="1">男性</a-select-option>
                <a-select-option value="2">女性</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item>
              <a-select v-model="queryParam.sex" placeholder="请选择性别查询">
                <a-select-option value="">请选择性别查询</a-select-option>
                <a-select-option value="1">男性</a-select-option>
                <a-select-option value="2">女性</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item>
              <a-select v-model="queryParam.sex" placeholder="请选择性别查询">
                <a-select-option value="">请选择性别查询</a-select-option>
                <a-select-option value="1">男性</a-select-option>
                <a-select-option value="2">女性</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button type="primary" @click="add">批量添加</a-button>
      <!-- <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>

      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px">
          批量操作 <a-icon type="down" />
        </a-button>
      </a-dropdown> -->
    </div>

    <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
      <i class="anticon anticon-info-circle ant-alert-icon"></i>
      已选择&nbsp;<a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项&nbsp;&nbsp;
      <a style="margin-left: 24px" @click="onClearSelected">清空</a>
    </div>

    <a-table 
      ref="dialog"
      :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
      :columns="columns"
      :dataSource="list"
      rowKey="id"
      :pagination="ipagination"
      :loading="loading"
      @change="handleTableChange">
      <span slot="action" slot-scope="text, record">
        <a @click="test(record)">添加</a>
      </span>
    </a-table>
  </a-modal>
</template>

<script>
import moment from 'moment'
export default {
  data() {
    return {
      visible: false,
      queryParam: {},
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
          dataIndex: 'status'
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
        pageSize: 5,
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
  methods: {
    init() {
      this.visible = true
      this.getDataList()
    },
    onClearSelected(){
      this.selectedRowKeys = [];
      this.selectionRows = [];
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
    },
    handleOk() {
      this.queryParam.dateStr = moment(this.queryParam.date).format('YYYY-MM-DD')
      console.log('param', this.queryParam)
      console.log('同批量添加', this.selectedRowKeys)
      // this.visible = false
    },
    // 批量添加
    add() {
      if(this.selectedRowKeys.length <= 0) {
        this.$message.warning('请选择一条记录！');
        return false;
      }
      console.log(this.selectedRowKeys)
      // if(this.selectedRowKeys.length<=0){
      //   this.$message.warning('请选择一条记录！');
      //   return false;
      // }else{
      //   let ids = "";
      //   let that = this;
      //   that.selectedRowKeys.forEach(function(val) {
      //     ids+=val+",";
      //   });
      //   that.$confirm({
      //     title:"确认操作",
      //     content:"是否"+(status==1?"解冻":"冻结")+"选中账号?",
      //     onOk: function(){
      //       that.$message.success(res.message);
      //     }
      //   });
      // }
    },
    test(item) {
      console.log(item)
    }
  }
}
</script>

<style lang="scss" scoped>
.table-operator {
  margin-bottom: 10px;
}
</style>


