<template>
  <el-row style="margin:20px;">
    <el-row class="list-account__header">
      <el-col :sm="24" style="display:flex;">
        <h1 style="margin: 0; width: 100%; padding: 10px; text-align: center;">Đánh giá khách hàng</h1>
      </el-col>
    </el-row>
    <div class="clearfix-20" />
    <div class="filter-container" style="padding-top: 20px">
      <el-row>
        <el-col :sm="6" class="mr-10">
          <label>Tìm kiếm theo ngày:</label>

          <el-date-picker
            v-model="dateRange"
            class="date-rang-history"
            type="daterange"
            start-placeholder="Ngày bắt đầu"
            end-placeholder="Ngày kết thúc"
          />
        </el-col>
        <el-col :sm="6" class="mr-10" style="padding-top: 30px">
          <el-button class="filter-item" icon="el-icon-refresh" round @click="onReset">Reset</el-button>
          <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
            Tìm kiếm
          </el-button>
          <el-button class="mr-10 filter-item" type="primary" icon="el-icon-download" :loading="loadingExportExcel" @click="handleExportExcel">
            Xuất Excel
          </el-button>
        </el-col>
      </el-row>
    </div>
    <div style="padding-top: 20px">
      <div class="row">
        <div class="col-6" style="display: block">
          <h3 style="justify-content: center; display: flex">Chính sách ưu đãi</h3>
          <Pie
            style="padding-top: 20px;display: flex; justify-content: center"
            :chart-options="chartOptions"
            :chart-data="chartData1"
            :chart-id="chartId"
            :dataset-id-key="datasetIdKey"
            :plugins="plugins"
            :css-classes="cssClasses"
            :styles="styles"
            :width="width"
            :height="height"
          />
        </div>
        <div class="col-6">
          <h3 style="justify-content: center; display: flex">Thư ký</h3>
          <Pie
            style="padding-top: 20px;display: flex; justify-content: center"
            :chart-options="chartOptions"
            :chart-data="chartData2"
            :chart-id="chartId"
            :dataset-id-key="datasetIdKey"
            :plugins="plugins"
            :css-classes="cssClasses"
            :styles="styles"
            :width="width"
            :height="height"
          />
        </div>
      </div>
    </div>

  </el-row>
</template>

<script>
// import Pagination from '@/components/Pagination'
import { convertDateTimeSecond, formatDate, formatNumber } from '@/utils/convert'
import ListGolferResource from '@/api/membership/golfer'

const listGolferResources = new ListGolferResource()
import moment from 'moment'
// import DialogHistoryTransaction from '@/views/membership/listGolfer/components/DialogHistoryTransaction.vue'
import { FEEDBACK_TYPE } from '@/utils/constant'
import { baseURL } from '@/constant/config'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
ChartJS.register(ArcElement, Tooltip, Legend)

import { Pie } from 'vue-chartjs/legacy'

export default {
  name: 'InfoCustomer',
  components: {
    Pie
  },
  props: {
    chartId: {
      type: String,
      default: 'pie-chart'
    },
    datasetIdKey: {
      type: String,
      default: 'label'
    },
    width: {
      type: Number,
      default: 600
    },
    height: {
      type: Number,
      default: 600
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object,
      default: () => {}
    },
    plugins: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      users: [],
      objDetail: {},
      onShowDialog: false,
      objectDetail: {},
      query: {
        limit: 10,
        page: 1
      },
      percent1: {},
      total: 0,
      admins: [],
      dateRange: [],
      feedbackType: FEEDBACK_TYPE,
      loadingExportExcel: false,
      chartData1: {},
      chartData2: {},
      tableData: [],
      chartOptions: {
        responsive: false,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    }
  },
  computed: {},
  watch: {
    dateRange(value) {
      if (value) {
        this.query.date_start = moment(value[0]).format('YYYY-MM-DD HH:mm:ss')
        this.query.date_end = moment(value[1]).format('YYYY-MM-DD HH:mm:ss')
      }
    }
  },
  created() {
    this.onGetList()
  },
  methods: {
    formatNumber,
    convertDateTimeSecond,
    onGetList() {
      this.loadingTable = true
      listGolferResources.percentFeedbackCustomer(this.query).then(response => {
        console.log(response)
        if (response.error_code === 0) {
          this.tableData1 = response.data[0].countIncentives
          this.tableData2 = response.data[1].countSecretary
          this.tableData1.map(value1 => {
            this.percent1 = { percent: (value1.count / response.data[0].total1) * 100 }
            Object.assign(value1, this.percent1)
          })
          this.tableData2.map(value2 => {
            this.percent2 = { percent: (value2.count / response.data[1].total2) * 100 }
            Object.assign(value2, this.percent2)
          })

          this.handleChart1()
          this.handleChart2()
        } else {
          this.$message.error('Lỗi hệ thống, vui lòng liên hệ bộ phận kỹ thuật')
        }
      }).finally(() => {
        this.loadingTable = false
      })
    },
    handleChart1() {
      const listName = []
      const revenues = []
      this.tableData1.map(data => {
        listName.push(this.feedbackType[data.incentives_feedback])
        revenues.push(data.percent)
      })
      this.chartData1 = {
        labels: listName,
        datasets: [{
          backgroundColor: ['#FE6383', '#FF9F40', '#FFCC56', '#4AC0C0', '#36A2EB'],
          data: revenues
        }]
      }
    },
    handleChart2() {
      const listName = []
      const revenues = []
      this.tableData2.map(data => {
        listName.push(this.feedbackType[data.secretary_feedback])
        revenues.push(data.percent)
      })
      this.chartData2 = {
        labels: listName,
        datasets: [{
          backgroundColor: ['#FE6383', '#FF9F40', '#FFCC56', '#4AC0C0', '#36A2EB'],
          data: revenues
        }]
      }
    },
    handleExportExcel() {
      this.loadingExportExcel = true
      listGolferResources.exportStatisticCustomer(this.query).then(response => {
        var fileLink = document.createElement('a')
        const params = new URLSearchParams(this.query).toString()
        fileLink.href = `${baseURL}list-golfer/export-statistic-customer?${params}`
        console.log('áđá..........', `${baseURL}list-golfer/export-statistic-customer?${params}`)
        // fileLink.setAttribute('download', 'listFeedbackCustomer.xlsx')
        document.body.appendChild(fileLink)
        fileLink.click()
        this.$message({
          message: 'Export thành công',
          type: 'success',
          duration: 5 * 1000
        })
      })
        .finally(() => {
          this.loadingExportExcel = false
        })
    },
    handleFilter() {
      this.query.page = 1
      this.loadingTable = true
      this.onGetList()
    },
    handleIndexMethod(index) {
      return this.query.page === 1 ? this.query.page + index : (this.query.page - 1) * this.query.limit + index + 1
    },
    onReset() {
      this.query = Object.assign({}, { limit: 10, page: 1 })
      this.dateRange = ''
      this.onGetList()
    },

    formatDate

  }
}
</script>

<style scoped>
.mr-10 {
  margin-right: 10px;
}
</style>
