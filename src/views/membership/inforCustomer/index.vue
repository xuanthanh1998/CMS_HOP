<template>
  <el-row style="margin:20px;">
    <el-row class="list-account__header">
      <el-col :sm="24" style="display:flex;">
        <h1 style="margin: 0; width: 100%; padding: 10px; text-align: center;">Thông tin khách hàng thân thiết</h1>
      </el-col>
    </el-row>
    <div class="clearfix-20" />
    <div class="filter-container">
      <el-row>
        <el-col :sm="4" class="mr-10">
          <label>Tìm kiếm theo vID:</label>
          <el-select
            v-model="query.user_id"
            class="w-100"
            filterable
            remote
            clearable
            reserve-keyword
            placeholder="Nhập mã vID"
            :remote-method="onSearchGolfer"
            :loading="loadingSearchUser"
          >
            <el-option v-for="user in users" :key="user.value" :label="user.label" :value="user.value" />
          </el-select>
        </el-col>
        <el-col class="search-money mr-10" :sm="6" :md="4">
          <div class="grid-content bg-purple">
            <label> Lịch sử hạng kỳ gần nhất: </label>
            <el-select
              v-model="query.status"
              class="select-status w-100"
              placeholder="Trạng thái"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </el-col>
        <el-col :sm="6" class="mr-10 mt-10" style="padding-top: 20px">
          <el-button class="filter-item" icon="el-icon-refresh" round @click="onReset">Reset</el-button>
          <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
            Tìm kiếm
          </el-button>
          <el-button
            class="filter-item"
            type="primary"
            icon="el-icon-download"
            :loading="loadingExportExcel"
            @click="handleDownload"
          >
            Export excel
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
          label="Mã vID gốc"
          align="center"
          width="100"
        >
          <template slot-scope="{row}">
            {{ row.id ? `vID${row.id}` : '' }}
          </template>
        </el-table-column>
        <el-table-column
          label="Mã vID hiển thị"
          align="center"
          width="100"
        >
          <template slot-scope="{row}">
            {{ row.id_display ? `vID${row.id_display}` : '' }}
          </template>
        </el-table-column>
        <el-table-column
          prop="fullname"
          label="Tên khách hàng"
          align="center"
        />
        <el-table-column
          label="Tổng point được hoàn"
          align="center"
        >
          <template slot-scope="{row}">
            <el-link
              size="mini"
              style="color: #20a0ff"
              @click="onGetHistoryBackPoint(row)"
            >
              {{ row.point_back ? formatNumber(row.point_back) : '' }}
            </el-link>
          </template>
        </el-table-column>
        <el-table-column
          label="Lịch sử xét hạng"
          align="center"
        >
          <el-table-column
            label="08/2023"
            align="center"
          />
          <el-table-column
            label="09/2023"
            align="center"
          />
          <el-table-column
            label="10/2023"
            align="center"
          />
          <el-table-column
            label="11/2023"
            align="center"
          />
          <el-table-column
            label="12/2023"
            align="center"
          />
          <el-table-column
            label="1/2024"
            align="center"
          />
        </el-table-column>
        <el-table-column label="Hành động" align="center">
          <template slot-scope="scope">
            <span class="pr-1">
              <el-button
                :title="`Chi tiết Golfer ${scope.row.fullname}`"
                type="warning"
                icon="el-icon-view"
                circle
                @click="onShowDialogDetailGolfer(scope.row)"
              />
              <el-button
                type="success"
                icon="el-icon-plus"
                circle
                @click="onShowDialogAddUserField(scope.row)"
              />
            </span>
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
        <dialog-add-user-field
          :show-dialog="showDialogAddUserField"
          :obj-detail="objDetail"
          @clickButton="handleClickCloseDialogAddUserFiled"
        />
        <dialog-history-back-point
          :show-dialog="showHistoryBackPoint"
          :obj-detail="objDetail"
          @clickButton="handleClickCloseDialogHistoryBackPoint"
        />
        <dialog-detail-golfer
          :show-dialog="showDialogDetailGolfer"
          :obj-detail="objDetail"
          @clickButton="handleClickCloseDialogDetailGolfer"
        />
      </el-row>
    </el-row>
  </el-row>
</template>

<script>
import Pagination from '@/components/Pagination'
import { convertDateTimeSecond, formatDate, formatNumber } from '@/utils/convert'
import ListGolferResource from '@/api/membership/golfer'
import moment from 'moment'
import DialogHistoryBackPoint from '@/views/membership/inforCustomer/components/DialogHistoryBackPoint.vue'
import DialogDetailGolfer from '@/views/membership/listGolfer/components/DialogDetailGolfer.vue'
import GolferResource from '@/api/golfer/golfer'
import DialogAddUserField from '@/views/membership/inforCustomer/components/DialogAddUserField.vue'
// import { convertIsProPlayer, convertMembership, convertTypeAccount } from '@/utils/convertNumberToString'

const listGolferResources = new ListGolferResource()
// import DialogHistoryTransaction from '@/views/membership/listGolfer/components/DialogHistoryTransaction.vue'
const golferResource = new GolferResource()

const optionStatus = [
  { value: 0, label: 'Duy trì' },
  { value: 1, label: 'Nâng hạng' },
  { value: 2, label: 'Tụt hạng' }
]
export default {
  name: 'InfoCustomer',
  components: {
    DialogAddUserField,
    DialogDetailGolfer,
    DialogHistoryBackPoint,
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
      showDialogAddUserField: false,
      onShowDialog: false,
      objectDetail: {},
      query: {
        limit: 10,
        page: 1
      },
      total: 0,
      admins: [],
      dateRange: [],
      loadingExportExcel: false

    }
  },
  computed: {},
  watch: {
    dateRange(value) {
      if (value) {
        this.query.dateStart = moment(value[0]).format('YYYY-MM-DD HH:mm:ss')
        this.query.dateEnd = moment(value[1]).format('YYYY-MM-DD HH:mm:ss')
      }
    }
  },
  created() {
    this.onGetList()
  },
  methods: {
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
    async handleDownload() {
      let stop = false
      const query = {
        limit: 5000,
        page: 1,
        user_id: this.query.user_id
      }
      let list_all = []
      this.loadingExportExcel = true
      while (!stop) {
        try {
          const res = await listGolferResources.listInfoCustomer(query)
          console.log('res..............', res)
          console.log('this.tableData', res.data)
          if (res.data.data.length <= 0) {
            stop = true
          }
          query.page = +query.page + 1
          for (let i = 0; i < res.data.data.length; i++) {
            const item = res.data.data[i]
            const moneyInDate = res.data.pointBack.find(d => +d.user_id === +item.id)
            if (moneyInDate) {
              item.point_back = moneyInDate.sumMoney
            }
          }
          list_all = [...list_all, ...res.data.data]
        } catch (error) {
          console.error(error)
          stop = true
        }
      }
      list_all.map(item => {
        item.display_id = item?.id_display ?? item?.id ?? null
      })
      console.log('list_all', list_all)
      this.loadingExportExcel = false
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['Tên golfer', 'Mã vID gốc', 'Mã vID hiển thị', 'Số point được hoàn']
        const filterVal = ['fullname', 'id', 'id_display', 'point_back']
        let data = list_all
        data = this.formatJson(filterVal, data)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'KHTT_DSKHTT'
        })
        this.$message({
          message: 'Export thành công',
          type: 'success',
          duration: 5 * 1000
        })
      })
    },

    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'point_back') {
          return v[j]
        } else if (j === 'id_display') {
          return v[j]
        } else {
          return v[j]
        }
      }))
    },
    formatNumber,
    onShowDialogDetailGolfer(row) {
      this.showDialogDetailGolfer = true
      this.objDetail = Object.assign({}, row)
    },
    onShowDialogAddUserField(row) {
      this.showDialogAddUserField = true
      this.query.id = row.id
      listGolferResources.infoUserField(this.query).then(response => {
        console.log(response)
        if (response.error_code === 0) {
          this.objDetail = response.data
        } else {
          this.$message.error('Lỗi hệ thống, vui lòng liên hệ bộ phận kỹ thuật')
        }
      }).finally(() => {
        this.loadingTable = false
      })
    },
    handleClickCloseDialogHistoryBackPoint(value) {
      this.showHistoryBackPoint = false
      if (value) {
        this.onGetList()
      }
    },
    handleClickCloseDialogAddUserFiled(value) {
      console.log('seqưeqưewqe', value)
      this.showDialogAddUserField = false
      if (value) {
        this.onGetList()
      }
    },
    handleClickCloseDialogDetailGolfer(value) {
      this.showDialogDetailGolfer = false
      if (value) {
        this.onGetListsGolfer()
      }
    },
    onGetHistoryBackPoint(row) {
      this.showHistoryBackPoint = true
      this.objDetail = Object.assign({}, row)
    },
    convertDateTimeSecond,
    onGetList() {
      this.loadingTable = true
      listGolferResources.listInfoCustomer(this.query).then(response => {
        console.log(response)
        if (response.error_code === 0) {
          const result = response.data
          this.tableData = result.data
          this.total = result.total
          for (let i = 0; i < result.data.length; i++) {
            const item = result.data[i]
            const moneyInDate = result.pointBack.find(d => +d.user_id === +item.id)
            if (moneyInDate) {
              item.point_back = moneyInDate.sumMoney
            }
          }
        } else {
          this.$message.error('Lỗi hệ thống, vui lòng liên hệ bộ phận kỹ thuật')
        }
      }).finally(() => {
        this.loadingTable = false
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
