<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import { useSettingsStore } from '@/store/settings'

const settingsStore = useSettingsStore()

const salesChartRef = ref()
const userChartRef = ref()
const visitsChartRef = ref()

let salesChart: echarts.ECharts | null = null
let userChart: echarts.ECharts | null = null
let visitsChart: echarts.ECharts | null = null

// 模拟数据
const salesData = {
  xAxis: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  sales: [150, 230, 224, 218, 135, 147, 260, 315, 400, 380, 420, 450],
  growth: [15, 20, -5, -2, -10, 8, 30, 21, 27, -5, 10, 12]
}

const userData = [
  { value: 1048, name: '华东地区', itemStyle: { color: '#91cc75' } },
  { value: 735, name: '华南地区', itemStyle: { color: '#fac858' } },
  { value: 580, name: '华北地区', itemStyle: { color: '#ee6666' } },
  { value: 484, name: '西南地区', itemStyle: { color: '#73c0de' } },
  { value: 300, name: '西北地区', itemStyle: { color: '#3ba272' } }
]

const visitsData = {
  xAxis: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
  visits: [1200, 1320, 1010, 1340, 900, 2300, 2100],
  active: [800, 950, 700, 880, 600, 1500, 1400]
}

// 初始化销售趋势图表
const initSalesChart = () => {
  if (salesChartRef.value) {
    salesChart = echarts.init(salesChartRef.value, settingsStore.theme.isDark ? 'dark' : undefined)
    salesChart.setOption({
      title: {
        text: '销售趋势',
        subtext: '月度销售额和同比增长',
        left: 'center'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#999'
          }
        }
      },
      legend: {
        data: ['销售额', '同比增长'],
        bottom: '0%'
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '10%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: salesData.xAxis,
        axisPointer: {
          type: 'shadow'
        }
      },
      yAxis: [
        {
          type: 'value',
          name: '销售额',
          min: 0,
          axisLabel: {
            formatter: '{value} 万'
          }
        },
        {
          type: 'value',
          name: '增长率',
          min: -20,
          max: 40,
          axisLabel: {
            formatter: '{value} %'
          }
        }
      ],
      series: [
        {
          name: '销售额',
          type: 'bar',
          data: salesData.sales,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#83bff6' },
              { offset: 0.5, color: '#188df0' },
              { offset: 1, color: '#188df0' }
            ])
          }
        },
        {
          name: '同比增长',
          type: 'line',
          yAxisIndex: 1,
          data: salesData.growth,
          smooth: true,
          symbolSize: 8,
          lineStyle: {
            width: 3
          },
          itemStyle: {
            color: '#91cc75'
          }
        }
      ]
    })
  }
}

// 初始化用户分布图表
const initUserChart = () => {
  if (userChartRef.value) {
    userChart = echarts.init(userChartRef.value, settingsStore.theme.isDark ? 'dark' : undefined)
    userChart.setOption({
      title: {
        text: '用户地区分布',
        left: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        top: 'middle'
      },
      series: [{
        name: '用户分布',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['60%', '50%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '20',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: userData
      }]
    })
  }
}

// 初始化访问量图表
const initVisitsChart = () => {
  if (visitsChartRef.value) {
    visitsChart = echarts.init(visitsChartRef.value, settingsStore.theme.isDark ? 'dark' : undefined)
    visitsChart.setOption({
      title: {
        text: '访问量统计',
        subtext: '每日访问量和活跃用户',
        left: 'center'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        data: ['访问量', '活跃用户'],
        bottom: '0%'
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '10%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: visitsData.xAxis
      },
      yAxis: {
        type: 'value',
        name: '人数',
        axisLabel: {
          formatter: '{value}'
        }
      },
      series: [
        {
          name: '访问量',
          type: 'bar',
          data: visitsData.visits,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#83bff6' },
              { offset: 0.5, color: '#188df0' },
              { offset: 1, color: '#188df0' }
            ])
          }
        },
        {
          name: '活跃用户',
          type: 'bar',
          data: visitsData.active,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#91cc75' },
              { offset: 0.5, color: '#67a651' },
              { offset: 1, color: '#67a651' }
            ])
          }
        }
      ]
    })
  }
}

// 监听主题变化
const handleThemeChange = () => {
  const theme = settingsStore.theme.isDark ? 'dark' : undefined
  salesChart?.dispose()
  userChart?.dispose()
  visitsChart?.dispose()
  initSalesChart()
  initUserChart()
  initVisitsChart()
}

// 监听窗口大小变化
const handleResize = () => {
  salesChart?.resize()
  userChart?.resize()
  visitsChart?.resize()
}

onMounted(() => {
  initSalesChart()
  initUserChart()
  initVisitsChart()
  window.addEventListener('resize', handleResize)
  watch(() => settingsStore.theme.isDark, handleThemeChange)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  salesChart?.dispose()
  userChart?.dispose()
  visitsChart?.dispose()
})
</script>

<template>
  <div class="dashboard-charts">
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card>
          <div ref="salesChartRef" class="chart-container"></div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="mt-4">
      <el-col :span="12">
        <el-card>
          <div ref="userChartRef" class="chart-container"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <div ref="visitsChartRef" class="chart-container"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.dashboard-charts {
  margin-top: 20px;
}

.chart-container {
  height: 350px;
  width: 100%;
}

.mt-4 {
  margin-top: 1rem;
}
</style>