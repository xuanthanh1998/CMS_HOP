<template>
  <el-row style="margin:20px;">
    <el-row class="list-account__header">
      <el-col :sm="24" style="display:flex;">
        <h1 style="margin: 0; width: 100%; padding: 10px; text-align: center;">Quản lý CSKH trực tiếp</h1>
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
        <el-col :sm="19" class="mr-10" style="padding-top: 30px">
          <el-button class="filter-item" icon="el-icon-refresh" round @click="onReset">Reset</el-button>
          <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
            Tìm kiếm
          </el-button>
          <el-button style="float: right" class="filter-item" type="primary" icon="el-icon-plus" @click="handleAddDirectCustomer">Thêm mới
          </el-button>
        </el-col>
      </el-row>
    </div>
    <el-row style="margin-top: 20px;">
      <el-table
        v-loading="loadingTable"
        :data="tableData"
        border
        style="width: 100%"
      >
        <el-table-column
          label="STT"
          width="100"
          align="center"
          type="index"
          :index="handleIndexMethod"
        />
        <el-table-column
          prop="user_id"
          label="Mã vID gốc"
          align="center"
        >
          <template slot-scope="{row}">
            {{ `vID${row.user_id}` }}
          </template>
        </el-table-column>
        <el-table-column
          label="Mã vID hiển thị"
          align="center"
        >
          <template slot-scope="{row}">
            <p v-if="row.golfer && row.golfer.id_display !== null">
              {{ `vID${row.golfer.id_display}` }}
            </p>
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
          label="Ngày gặp"
          align="center"
        >
          <template slot-scope="{row}">
            {{ row.time_meet ? convertDate(row.time_meet) : '' }}
          </template>
        </el-table-column>
        <el-table-column
          prop="description"
          label="Nội dung CSKH"
          align="center"
        />
        <el-table-column
          label="Người tạo"
          align="center"
        >
          <template slot-scope="{row}">
            {{ row.admin ? row.admin.name : '' }}
          </template>
        </el-table-column>
        <el-table-column label="Hành động" align="center">
          <template slot-scope="scope">
            <el-button
              class="mb-2"
              type="warning"
              icon="el-icon-edit"
              size="mini"
              round
              @click="handleEditDirectCustomer(scope.row)"
            >
              Sửa
            </el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              round
              @click="handleDeleteDirectCustomer(scope.row.id)"
            >
              Xóa
            </el-button>
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
        <dialog-add-direct-customer
          :show-dialog="showDialogAddDirectCustomer"
          :object-data="objectData"
          :is-add="isAdd"
          @onCloseDialog="handleClose"
        />
      </el-row>
    </el-row>
  </el-row>
</template>

<script>
import Pagination from '@/components/Pagination'
import { convertDate, convertDateTimeSecond, formatDate } from '@/utils/convert'
import ListGolferResource from '@/api/membership/golfer'

const listGolferResources = new ListGolferResource()
import moment from 'moment'
import GolferResource from '@/api/golfer/golfer'
import DialogAddDirectCustomer from '@/views/membership/directCustomer/components/DialogAddDirectCustomer.vue'
const golferResource = new GolferResource()
const optionStatus = [
  { value: 0, label: 'Hết hạn' },
  { value: 1, label: 'Còn hạn' }
]
export default {
  name: 'LogHistory',
  components: {
    DialogAddDirectCustomer,
    Pagination
  },
  data() {
    return {
      users: [],
      loadingSearchUser: false,
      objectData: {},
      isAdd: true,
      options: [...optionStatus],
      loadingTable: false,
      tableData: [],
      adminData: [],
      loadingSearchAdmin: false,
      showDialogAddDirectCustomer: false,
      onShowDialog: false,
      objectDetail: {},
      query: {
        limit: 10,
        page: 1
      },
      total: 0,
      admins: [],
      dateRange: []

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
    handleClose(value) {
      this.showDialogAddDirectCustomer = value.dialog
      this.query = Object.assign({}, { limit: 10, page: 1 })
      this.onGetList()
    },
    handleDeleteDirectCustomer(id) {
      this.$confirm(`Bạn có chắc chắn xóa không ?`).then((_) => {
        listGolferResources.removeDirectCustomer(id).then(res => {
          if (res.error_code === 0) {
            this.onGetList()
            this.$message.success(res.error_msg)
          } else {
            this.$message.error(res.error_msg)
          }
        })
      })
    },
    handleAddDirectCustomer() {
      this.isAdd = true
      this.showDialogAddDirectCustomer = true
      this.objectData = {}
    },
    handleEditDirectCustomer(row) {
      this.isAdd = false
      this.showDialogAddDirectCustomer = true
      this.objectData = Object.assign({}, row)
    },
    convertDateTimeSecond,
    onGetList() {
      this.loadingTable = true
      listGolferResources.listDirectCustomer(this.query).then(response => {
        console.log(response)
        if (response.error_code === 0) {
          const result = response.data
          console.log('saaaaaaa', result)
          this.tableData = result.data
          this.total = result.total
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
    formatDate

  }
}
</script>

<style scoped>
.mr-10 {
  margin-right: 10px;
}
</style>
