<template>
  <div class="page-exhibits">
    <a-card class="header-card">
      <a-row>
        <a-col :span="3" v-for="o in 8" :key="o">
          <div class="header-carg-item">22 <span>个</span></div>
          <p>全部任务</p>
        </a-col>
      </a-row>
    </a-card>

    <a-row :gutter="20" class="content">
      <a-col :span="12">
        <a-card class="content-item">
          <h2>总体任务完成情况</h2>
          <div class="graph">
            <chart ref="chart1" :options="orgOptions1" :auto-resize="true"></chart>
          </div>
        </a-card>
      </a-col>

      <a-col :span="12">
        <a-card class="content-item">
          <h2>总体任务完成情况</h2>
          <div class="graph">
            <chart ref="chart2" :options="orgOptions2" :auto-resize="true"></chart>
          </div>
        </a-card>
      </a-col>

      <a-col :span="12">
        <a-card class="content-item">
          <h2>总体任务完成情况</h2>
          <div class="graph">
            <chart ref="chart2" :options="orgOptions3" :auto-resize="true"></chart>
          </div>
        </a-card>
      </a-col>

      <a-col :span="12">
        <a-card class="content-item">
          <h2>总体任务完成情况</h2>
          <div class="graph">
            <chart ref="chart2" :options="orgOptions4" :auto-resize="true"></chart>
          </div>
        </a-card>
      </a-col>
    </a-row>
    
  </div>
</template>

<script>
import chart from 'vue-echarts/components/ECharts'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/title' //引入标题组件
import 'echarts/lib/component/legend' //引入图例组件
import 'echarts/lib/component/tooltip' //引入图例组件
import 'echarts/lib/chart/bar'
export default {
  components: {
    chart
  },
  data() {
    return {
      orgOptions1: {},
      orgOptions2: {},
      orgOptions3: {},
      orgOptions4: {},
    }
  },
  mounted() {
    this.orgOptions1 = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        // smooth: true
      }]
    }
    this.orgOptions2 = {
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      legend: {
          orient: 'vertical',
          x: 'left',
          data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
      },
      series: [
        {
          name:'访问来源',
          type:'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
              normal: {
                  show: false,
                  position: 'center'
              },
              emphasis: {
                  show: true,
                  textStyle: {
                      fontSize: '30',
                      fontWeight: 'bold'
                  }
              }
          },
          labelLine: {
              normal: {
                  show: false
              }
          },
          data:[
              {value:335, name:'直接访问'},
              {value:310, name:'邮件营销'},
              {value:234, name:'联盟广告'},
              {value:135, name:'视频广告'},
              {value:1548, name:'搜索引擎'}
          ]
        },
      ]
    }
    this.orgOptions3 = {
      title: {
          text: '堆叠区域图'
      },
      tooltip : {
          trigger: 'axis',
          axisPointer: {
              type: 'cross',
              label: {
                  backgroundColor: '#6a7985'
              }
          }
      },
      legend: {
          data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
      },
      toolbox: {
          feature: {
              saveAsImage: {}
          }
      },
      grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
      },
      xAxis : [
          {
              type : 'category',
              boundaryGap : false,
              data : ['周一','周二','周三','周四','周五','周六','周日']
          }
      ],
      yAxis : [
          {
              type : 'value'
          }
      ],
      series : [
          {
              name:'邮件营销',
              type:'line',
              stack: '总量',
              areaStyle: {},
              data:[120, 132, 101, 134, 90, 230, 210]
          },
          {
              name:'联盟广告',
              type:'line',
              stack: '总量',
              areaStyle: {},
              data:[220, 182, 191, 234, 290, 330, 310]
          },
          {
              name:'视频广告',
              type:'line',
              stack: '总量',
              areaStyle: {},
              data:[150, 232, 201, 154, 190, 330, 410]
          },
          {
              name:'直接访问',
              type:'line',
              stack: '总量',
              areaStyle: {normal: {}},
              data:[320, 332, 301, 334, 390, 330, 320]
          },
          {
              name:'搜索引擎',
              type:'line',
              stack: '总量',
              label: {
                  normal: {
                      show: true,
                      position: 'top'
                  }
              },
              areaStyle: {normal: {}},
              data:[820, 932, 901, 934, 1290, 1330, 1320]
          }
      ]
    }
    this.orgOptions4 = {
      tooltip : {
          trigger: 'axis',
          axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
      },
      legend: {
          data:['邮件营销','联盟广告','视频广告']
      },
      grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
      },
      xAxis : [
          {
              type : 'category',
              data : ['周一','周二','周三','周四','周五','周六','周日']
          }
      ],
      yAxis : [
          {
              type : 'value'
          }
      ],
      series : [
          {
              name:'邮件营销',
              type:'bar',
              stack: '广告',
              data:[120, 132, 101, 134, 90, 230, 210]
          },
          {
              name:'联盟广告',
              type:'bar',
              stack: '广告',
              data:[220, 182, 191, 234, 290, 330, 310]
          },
          {
              name:'视频广告',
              type:'bar',
              stack: '广告',
              data:[150, 232, 201, 154, 190, 330, 410]
          }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.page-exhibits {
  .header-card {
    margin: 20px 0;
    text-align: center;
  }
  .content {
    .content-item {
      margin-bottom: 20px;
      .graph {
        height: 300px;
        .echarts {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>



