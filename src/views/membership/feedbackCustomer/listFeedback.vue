<template>
  <el-row style="margin:20px;">
    <el-row class="list-account__header">
      <el-col :sm="24" style="display:flex;">
        <h1 style="margin: 0; width: 100%; padding: 10px; text-align: center;">Đánh giá khách hàng</h1>
      </el-col>
    </el-row>
    <div class="clearfix-20" />
    <div class="filter-container">
      <el-row>
        <el-col :sm="6" class="mr-10">
          <label>Tìm kiếm theo ngày:</label>
          <el-date-picker
            v-model="dateRange"
            class="date-rang-history"
            type="daterange"
            start-placeholder="Ngày bắt đầu"
            end-placeholder="Ngày kết thúc"
            style="width:400px"
          />
        </el-col>
        <el-col :sm="6" class="mr-10 mt-10" style="padding-top: 20px">
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
    <div class="clearfix-10" />
    <el-row style="margin-top: 40px;">
      <el-table
        v-loading="loadingTable"
        :data="tableData"
        border
        style="width: 100%"
      >
        <el-table-column
          label="STT"
          width="50"
          align="center"
          type="index"
          :index="handleIndexMethod"
        />
        <el-table-column
          prop="name"
          label="Mã vID gốc"
          align="center"
          width="100"
        >
          <template slot-scope="{row}">
            {{ row.user_id ? `vID${row.user_id}` : '' }}
          </template>
        </el-table-column>
        <el-table-column
          label="Mã vID hiển thị"
          align="center"
          width="100"
        >
          <template slot-scope="{row}">
            {{ row.golfer ? `vID${row.golfer.id_display}` : '' }}
          </template>
        </el-table-column>
        <el-table-column
          label="Tên khách hàng"
          align="center"
        >
          <template slot-scope="{row}">
            {{ row.golfer ? row.golfer.fullname : '' }}
          </template>
        </el-table-column>
        <el-table-column
          label="Đánh giá"
          align="center"
        >
          <el-table-column
            label="Chính sách ưu đãi"
            align="center"
          >
            <template slot-scope="{row}">
              {{ row.incentives_feedback ? feedbackType[row.incentives_feedback] : '' }}
            </template>
          </el-table-column>
          <el-table-column
            label="Thư ký"
            align="center"
          >
            <template slot-scope="{row}">
              {{ row.secretary_feedback ? feedbackType[row.secretary_feedback] : '' }}
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column
          prop="description"
          label="Nội dung đánh giá"
          align="center"
          class="wap-text"
        />
        <el-table-column
          label="Ngày đánh giá"
          align="center"
        >
          <template slot-scope="{row}">
            {{ row.time_feedback ? convertDate(row.time_feedback) : '' }}
          </template>
        </el-table-column>
      </el-table>
      <el-row class="list-device__footer">
        <pagination
          v-show="total > query.limit"
          :total="total"
          :limit.sync="query.limit"
          :page.sync="query.page"
          @pagination="onGetList"
        />
      </el-row>
    </el-row>
  </el-row>
</template>

<script>
import Pagination from '@/components/Pagination'
import { convertDate, convertDateTimeSecond, formatDate, formatNumber } from '@/utils/convert'
import ListGolferResource from '@/api/membership/golfer'

const listGolferResources = new ListGolferResource()
import moment from 'moment'
import GolferResource from '@/api/golfer/golfer'
// import DialogHistoryTransaction from '@/views/membership/listGolfer/components/DialogHistoryTransaction.vue'
const golferResource = new GolferResource()
import { FEEDBACK_TYPE } from '@/utils/constant'
import { baseURL } from '@/constant/config'
const optionStatus = [
  { value: 0, label: 'Hết hạn' },
  { value: 1, label: 'Còn hạn' }
]
export default {
  name: 'InfoCustomer',
  components: {
    Pagination
  },
  data() {
    return {
      users: [],
      objDetail: {},
      loadingSearchUser: false,
      isAdd: true,
      options: [...optionStatus],
      loadingTable: false,
      tableData: [],
      adminData: [],
      loadingSearchAdmin: false,
      showDialogAddDocument: false,
      showHistoryBackPoint: false,
      showDialogDetailGolfer: false,
      onShowDialog: false,
      objectDetail: {},
      query: {
        limit: 10,
        page: 1
      },
      total: 0,
      admins: [],
      dateRange: [],
      feedbackType: FEEDBACK_TYPE,
      loadingExportExcel: false

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
    convertDate,
    onSearchGolfer(keyword) {
      golferResource.searchGolfer({ keyword: keyword }).then(res => {
        const result = res.data
        if (res.error_code === 0) {
          if (result.length > 0) {
            this.users = result.map(value => {
              const label = `vID${value.id} - ${value.fullname}`
              return { value: value.id, label: label }
            })
          } else {
            this.users = []
          }
          this.loadingSearchUser = false
        } else {
          this.$message.error(res.error_msg)
        }
      })
    },
    formatNumber,
    convertDateTimeSecond,
    onGetList() {
      this.loadingTable = true
      listGolferResources.listFeedbackCustomer(this.query).then(response => {
        console.log(response)
        if (response.error_code === 0) {
          const result = response.data
          this.tableData = result.data
          this.total = result.total
        } else {
          this.$message.error('Lỗi hệ thống, vui lòng liên hệ bộ phận kỹ thuật')
        }
      }).finally(() => {
        this.loadingTable = false
      })
    },
    handleExportExcel() {
      this.loadingExportExcel = true
      listGolferResources.exportHole(this.query).then(response => {
        var fileLink = document.createElement('a')
        const params = new URLSearchParams(this.query).toString()
        fileLink.href = `${baseURL}list-golfer/export-hole?${params}`
        fileLink.setAttribute('download', 'proposed_file_name')

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
    handleClickButtonDialog(value) {
      this.onShowDialog = value
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
