<template>
  <el-row class="insurance-lists">
    <el-row class="insurance-lists__header">
      <el-col :sm="12" style="padding-top: 10px">
        <h3>Danh sách bảo hiểm gói S100  </h3>
      </el-col>
    </el-row>
    <el-row class="insurance-lists__search mb-5">
      <el-col :sm="3" class="pr-lg-2">
        <div class="search-golfer">
          <el-input v-model="listQuery.id" placeholder="Nhập mã bảo hiểm" class="w-100" />
        </div>
      </el-col>
      <el-col :sm="3" class="pr-lg-2">
        <el-select
          v-model="listQuery.agent_id"
          filterable
          remote
          class="w-100"
          placeholder="Tìm đại lý"
          :remote-method="onSearchAgent"
        >
          <el-option
            v-for="agent in agents"
            :key="agent.value"
            :label="agent.label"
            :value="agent.value"
          />
        </el-select>
      </el-col>
      <el-col :sm="4" class="pr-lg-2">
        <el-select
          v-model="listQuery.facility_id"
          filterable
          remote
          class="w-100"
          placeholder="Tìm theo sân"
          :remote-method="onGetListFacilities"
        >
          <el-option
            v-for="facility in facilities"
            :key="facility.value"
            :label="facility.label"
            :value="facility.value"
          />
        </el-select>
      </el-col>
      <el-col :sm="6">
        <el-date-picker
          v-model="dateRange"
          class="date-rang-history"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="đến"
          start-placeholder="Ngày bắt đầu"
          end-placeholder="Ngày kết thúc"
          :picker-options="pickerOptions"
        />
      </el-col>
      <el-col :sm="5" class="pr-lg-2" style="padding-left: 10px ">
        <el-switch
          v-model="isDatePlayed"
          :active-text="titleIsDatePlayed"
        />
      </el-col>
    </el-row>
    <el-row class="form-search">
      <el-col :sm="2" class="pr-lg-2">
        <div class="search-golfer">
          <el-input v-model="listQuery.user_id" placeholder="Nhập mã vID" class="w-100" />
        </div>
      </el-col>
      <el-col :sm="4" class="pr-lg-2">
        <el-select
          v-model="listQuery.is_pay"
          class="w-100"
          placeholder="TT thanh toán"
        >
          <el-option
            v-for="item in arrayIsPay"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-col>
      <el-col :sm="4" class="pr-lg-2">
        <el-select
          v-model="listQuery.status"
          class="w-100"
          placeholder="TT phản hồi từ PVI"
        >
          <el-option
            v-for="status in arrayStatus"
            :key="status.value"
            :label="status.label"
            :value="status.value"
          />
        </el-select>
      </el-col>

      <el-col :sm="6">
        <div class="text-right">
          <!--          <el-button-->
          <!--            type="primary"-->
          <!--            icon="el-icon-download"-->
          <!--            :loading="loadingExportExcel"-->
          <!--            @click="onExportInsurance"-->
          <!--          >Xuất excel-->
          <!--          </el-button>-->
          <el-button icon="el-icon-refresh" style="margin-right: 20px" @click="onResetQuery"> Làm mới</el-button>
          <el-button type="primary" icon="el-icon-search" @click.prevent="onGetListInsurances(1)"> Tìm kiếm
          </el-button>
        </div>
      </el-col>
    </el-row>
    <el-row class="table-history">
      <el-col>
        <el-table
          v-loading="loading"
          :data="tableData"
          border
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="index"
            :index="handleIndexMethod"
            label="STT"
            width="50"
          />
          <el-table-column
            label="Mã BH"
          >
            <template slot-scope="scope">
              {{ `BH${scope.row.id}` }}
            </template>
          </el-table-column>
          <el-table-column prop="" label="Nguồn tạo" />

          <el-table-column prop="facility.sub_title" label="Tên Sân" />
          <el-table-column prop="hole_select" label="Tên hố" />

          <el-table-column label="Mã vID/Passport">
            <template slot-scope="scope">
              <p> {{ `vID${scope.row.user_id}` }}</p>
            </template>
          </el-table-column>
          <el-table-column label="Gói BH">
            <!--            <template slot-scope="scope">-->
            <!--              <template v-if="scope.row.money.reward_value === 100000000 ">-->
            <!--                <p>D100</p>-->
            <!--              </template>-->
            <!--            </template>-->
          </el-table-column>
          <el-table-column label="Giá mua">
            <template slot-scope="scope">
              {{ (scope.row.money) ? `${formatNumber(scope.row.total_pay)} VNĐ` : '' }}
            </template>
          </el-table-column>
          <el-table-column label="Số người chơi">
            <template slot-scope="scope">
              {{ (scope.row.total_member) ? scope.row.total_member : '' }}
            </template>
          </el-table-column>
          <el-table-column label="Giờ chơi">
            <template slot-scope="{row}">
              {{ convertDateTime(row.date_played) }}
            </template>
          </el-table-column>
          <el-table-column label="Ngày Tạo">
            <template slot-scope="{row}">
              {{ convertDateTime(row.created_at) }}
            </template>
          </el-table-column>
          <el-table-column label="Trạng thái gửi PVI">
            <template slot-scope="{row}">
              {{ row.time_pay ? convertDateTime(row.time_pay) : '' }}
            </template>
          </el-table-column>
          <el-table-column label="Trạng thái đơn">
            <template slot-scope="{row}">
              {{ row.time_pay ? convertDateTime(row.time_pay) : '' }}
            </template>
          </el-table-column>
          <el-table-column label="Trạng thái khách thanh toán">
            <template slot-scope="scope">
              <el-col class="mb-5">
                <div v-if="scope.row.is_customer_pay === 0">
                  <el-tag type="danger">Chưa thanh toán</el-tag>
                  <p>{{ (scope.row) ? `${formatNumber(scope.row.total_pay)} VNĐ` : '' }}</p>
                </div>
                <div v-if="scope.row.is_customer_pay === 1">
                  <el-tag type="success">Đã thanh toán</el-tag>
                  <el-tag type="success">
                    {{ `Ngày TT: ${convertDateTime(scope.row.updated_at)}` }}
                  </el-tag>
                </div>
              </el-col>
            </template>
          </el-table-column>
          <el-table-column label="Hành động">
            <template slot-scope="{row}">
              <el-col v-if="row.is_pay === 1">
                <el-link :href="`/#/certificate-item/${row.id}`" target="_blank"><el-button :title="`Xem giấy chứng nhận`">GCN </el-button></el-link>
              </el-col>
            </template>
          </el-table-column>
        </el-table>
        <pagination
          v-show="total > listQuery.limit"
          :total="total"
          :limit.sync="listQuery.limit"
          :page.sync="listQuery.page"
          @pagination="onGetListInsurances"
        />
      </el-col>
    </el-row>
  </el-row>
</template>
<script>
import Pagination from '@/components/Pagination'
import { pickerOptions } from '@/utils/dateRangOptions'
import { formatNumber, convertDateTime } from '@/utils/convert'

import InsuranceApi from '@/api/HIO/insurance'
import { getAcountInfo } from '@/utils/auth'
const insuranceApi = new InsuranceApi()
import BookingPaxResource from '@/api/BookingPax'
const bookingPaxResource = new BookingPaxResource()

const defaultQuery = {
  page: 1,
  name: '',
  limit: 10
}
const arrayisPay = [
  { value: 0, label: 'Chưa thanh toán' },
  { value: 1, label: 'Đã thanh toán' }
]
const arrayStatus = [
  { value: 1, label: 'Đã nhận phản hồi PVI' },
  { value: 2, label: 'Đang chờ phản hồi' }
]
const arrayInsuranceDebt = [
  { value: 1, label: 'Đã trả ' },
  { value: 2, label: 'Ghi nợ' },
  { value: 3, label: 'Công nợ' }
]
const arraySource = [
  { value: 1, label: 'App ' },
  { value: 2, label: 'Sport' },
  { value: 3, label: 'Booking' },
  { value: 4, label: 'Agent' }
  // { value: 6, label: 'Zalo' },
  // { value: 5, label: 'Auto add' }
]
export default {
  name: 'ListInsurances',
  components: {
    // DialogViewInsurance,
    Pagination
  },
  data() {
    return {
      value: [],
      listQuery: Object.assign({}, defaultQuery),
      dateRange: [],
      pickerOptions: {
        shortcuts: pickerOptions
      },
      tableData: [],
      agents: [],
      loading: false,
      loadingUpdateVerify: false,
      total: 0,
      from: 0,
      showDialogDetail: false,
      showDialogCreate: false,
      objectInsurance: {},
      objectCodeData: {},

      arrayIsPay: [...arrayisPay],
      arrayStatus: [...arrayStatus],
      arrayInsuranceDebt: [...arrayInsuranceDebt],
      arraySource: [...arraySource],
      timer: null,
      loadingExportExcel: false,
      isFacility18Hole: true,
      isDatePlayed: false,
      titleIsDatePlayed: 'Tìm kiếm theo ngày khởi tạo',
      nameAgent: '',
      listQueryRefund: Object.assign({}),
      objectRefund: [],
      userPermission: [],
      roleUser: this.$store.getters.roles,
      isShowLogCodePay: false,
      isCreateLogCodePay: false,
      facilities: [],
      valuePublic: [],
      changeStatus: []
      // countInsuranceDebit: 0,
      // countInsuranceNotPay: 0,
    }
  },
  watch: {
    dateRange(value) {
      if (value !== null) {
        this.listQuery.date_start = this.convertDate(value[0], 'YYYY-MM-DD')
        this.listQuery.date_end = this.convertDate(value[1], 'YYYY-MM-DD')
      } else {
        this.listQuery.date_star = null
        this.listQuery.date_end = null
      }
    },
    isDatePlayed(value) {
      if (value) {
        this.listQuery.is_date_played = 1
        this.titleIsDatePlayed = 'Tìm kiếm theo ngày chơi'
      } else {
        this.listQuery.is_date_played = 0
        this.titleIsDatePlayed = 'Tìm kiếm theo ngày khởi tạo'
      }
    }
  },
  created() {
    this.onGetListInsurances()
    // this.timer = setInterval(this.onGetListInsurances, 30000)
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    onClickRemoveHold() {
      this.$confirm('Bạn có chắc chắn muốn thực hiện thao tác này').then(_ => {
        const array = []
        if (this.multipleSelection.length > 0) {
          this.multipleSelection.map(item => {
            array.push(item.id)
          })
          insuranceApi.changeStatusCustomerPayAll({ ids: array, admin_id: getAcountInfo().id }).then(response => {
            if (response.error_code === 0) {
              this.$message.success(response.message)
              this.onGetListInsurances()
            } else {
              this.$message.error(response.message)
            }
          })
        } else {
          this.$message.warning('Vui lòng chọn bảo hiểm để gạch nợ')
        }
      }).catch(_ => {})
    },
    onGetListInsurances(e) {
      if (e === 1) {
        this.listQuery.page = 1
      }
      const data = {
        cms_id: getAcountInfo().id
      }
      this.loading = true
      insuranceApi.listInsuranceS({ ...data, ...this.listQuery }).then(response => {
        console.log('aaaaaaaaaaaaaaaaaaa', response)
        if (response.error_code === 0) {
          this.loading = false
          const result = response.data
          this.tableData = [...result.data]
          this.total = result.total
          const array = []
          result.data.map((value, key) => {
            if (value.is_customer_pay === 1) {
              array[key] = true
            } else {
              array[key] = false
            }
          })
          this.changeStatus = [...array]
        }
      })
    },
    changeStatusCustomerPay(index, id, status) {
      this.$confirm(`Bạn có chắc chắn xác nhận thanh toán BH`).then(_ => {
        const params = { id: id, is_customer_pay: status }
        insuranceApi.changeStatusCustomerPay(params, { id: id }).then(response => {
          if (response.error_code === 0) {
            this.$message.success(response.message)
          } else {
            this.$message.warning(response.message)
            this.$set(this.changeStatus, index, !this.changeStatus[index])
          }
        })
      }).catch((error) => {
        console.log('error_catch', error)
        this.$set(this.changeStatus, index, !this.changeStatus[index])
      })
    },

    handleCloseDialogViewDetail(value) {
      if (value.dialog) {
        this.showDialogDetail = false
      }
      if (value.load) {
        this.onGetListInsurances()
      }
    },
    onResetQuery() {
      this.listQuery = Object.assign({}, defaultQuery)
      this.isDatePlayed = false
      this.dateRange = null
      this.onGetListInsurances()
    },
    async onSearchAgent(keyword) {
      const params = { keyword: keyword }
      this.loadingSearchAgent = true
      const { data } = await bookingPaxResource.searchAgentNew(params)
      const array = []
      if (data.length > 0) {
        this.loadingSearchAgent = false
        data.map(value => {
          const item = { label: `${value.name} - ${value.code_agent}`, value: value.id }
          array.push(item)
        })
        this.agents = [...array]
        console.log(this.agentInsurance)
      } else {
        this.agents = []
      }
    },

    handleIndexMethod(index) {
      return this.listQuery.page === 1 ? this.listQuery.page + index : (this.listQuery.page - 1) * this.listQuery.limit + index + 1
    },
    onGetListFacilities(keyword) {
      const params = { title: keyword }
      this.loadingSearchFacility = true
      bookingPaxResource.getFacilityCanBuyInsurance(params).then(response => {
        console.log('sssssssssss', response)
        this.loadingSearchFacility = false
        const results = response.data.data
        if (results.length > 0) {
          const array = []
          results.map(result => {
            const item = { label: result.sub_title, value: result.id, paths: result.paths }
            array.push(item)
          })
          this.facilities = [...array]
        } else {
          this.facilities = []
        }
      })
    },
    formatNumber,
    convertDateTime
  }
}
</script>

<style lang="scss">
.insurance-lists {
  margin: 0 10px;

  .form-search {
    margin-bottom: 10px;
  }

  .hidden {
    display: none;
  }

  .mb-1 {
    margin-bottom: 5px;
  }

  .text-right {
    text-align: right;
  }

  .date-rang-history {
    width: 100%;
  }

  .w-100 {
    width: 100%;
  }

  .el-button + {
    .el-button {
      margin-left: 0;
    }
  }
}
</style>

<!--<template>-->
<!--  <div>-->
<!--    <div class="col">-->
<!--      <div id="reader" style="width:500px;" />-->
<!--    </div>    <div v-if="scannedResult" class="scanned-result">-->
<!--      <h4>Scanned Result:</h4>-->
<!--      <p>{{ scannedResult }}</p>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import { Html5QrcodeScanner } from 'html5-qrcode'-->

<!--export default {-->
<!--  data() {-->
<!--    return {-->
<!--      scannedResult: null-->
<!--    }-->
<!--  },-->
<!--  mounted() {-->
<!--    const config = {-->
<!--      fps: 10,-->
<!--      qrbox: 250-->
<!--    }-->
<!--    const html5QrCode = new Html5QrcodeScanner(-->
<!--      'reader',-->
<!--      config-->
<!--    )-->

<!--    html5QrCode.render(this.onScanSuccess.bind(this))-->
<!--  },-->
<!--  methods: {-->
<!--    onScanSuccess(qrCodeMessage) {-->
<!--      this.scannedResult = qrCodeMessage-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->
<!--.scanned-result {-->
<!--  margin-top: 20px;-->
<!--}-->
<!--</style>-->
