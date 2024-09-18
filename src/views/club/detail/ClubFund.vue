<template>
  <el-row style="margin:0 20px; font-family:Sans-serif">
    <el-row>
      <el-col :sm="24">
        <h3 class="title">Quỹ CLB</h3>
        <h5 style="color: red; text-align: center;">TỔNG QUỸ: 200.000.000 VNĐ</h5>
      </el-col>
    </el-row>
    <div class="filter-container">
      <el-row>
        <el-col class="mb-10">
          <el-button style="float:right; margin-left: 10px;" type="success" icon="el-icon-eleme" @click="handleShowHistory">
            Lịch sử giao dịch
          </el-button>
          <el-button style="float:right;" type="primary" icon="el-icon-plus" @click="handleAdd">
            Thêm mới
          </el-button>
        </el-col>
      </el-row>
      <el-row class="row-search-money">
        <el-col class="search-money mt-10" :sm="6" :md="3">
          <div class="grid-content bg-purple-light">
            <el-input
              v-model="query.name"
              placeholder="Nhập tên"
              @keyup.enter.native="handleFilter"
            />
          </div>
        </el-col>
        <el-col :sm="12" :md="8" class="mr-10 mt-10">
          <el-button icon="el-icon-refresh" round @click="onReset">Reset</el-button>
          <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
            Tìm kiếm
          </el-button>
        </el-col>
      </el-row>
    </div>

    <el-row>
      <el-table v-loading="loadingTable" :data="tableData" border style="width: 100%">
        <el-table-column label="STT" width="100" align="center" type="index" :index="handleIndexMethod" />
        <el-table-column prop="name" label="Tên quỹ" align="center" />
        <el-table-column label="Số dư" align="center">
          <template slot-scope="{row}">
            {{ row.money ? formatNumber(row.money) : '' }}
          </template>
        </el-table-column>
        <el-table-column label="Hành động" width="150" align="center">
          <template slot-scope="scope">
            <el-button
              class="mb-10"
              size="small"
              :title="`Sửa`"
              type="primary"
              icon="el-icon-edit"
              circle
              @click="handleEdit(scope.row)"
            />
            <el-button
              class="mb-10"
              size="small"
              :title="`Xóa`"
              type="danger"
              icon="el-icon-delete"
              circle
              @click="handleDelete(scope.row)"
            />
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
        <history-transaction-club-fund
          :show-dialog="showDialogHistory"
          :object-data="objectDataHistory"
          @onCloseDialog="handleClose"
        />
        <dialog-history-transaction-fund />
      </el-row>
    </el-row>
  </el-row>
</template>

<script>
import Pagination from '@/components/Pagination/index'
import { formatDate, formatNumber } from '@/utils/convert'
// import AdminClubResource from '@/api/club/admin-club'
import HistoryTransactionClubFund from '@/views/club/detail/components/HistoryTransactionClubFund.vue'
import DialogHistoryTransactionFund from '@/views/club/detail/components/historyTransactionComponent/DialogHistoryTransactionFund.vue'

// const adminClubResource = new AdminClubResource()

export default {
  name: 'ClubFund',
  components: {
    Pagination,
    HistoryTransactionClubFund,
    DialogHistoryTransactionFund
  },

  data() {
    return {
      loadingTable: false,
      tableData: [
        { id: 1, name: 'Quỹ Outing', money: 100000000 },
        { id: 2, name: 'Quỹ CLB', money: 200000000 },
        { id: 3, name: 'Quỹ T11', money: 100000000 },
        { id: 4, name: 'Quỹ từ thiện', money: 100000000 }
      ],
      query: {
        limit: 10,
        page: 1
      },
      total: 0,
      isAdd: true,
      organizations: [],
      showDialog: false,
      objectData: {},
      showDialogHistory: false,
      objectDataHistory: {}
    }
  },
  computed: {
  },
  watch: {
  },
  created() {
    this.valueId = this.$route.params.id
    this.onGetList()
  },
  methods: {
    async onGetList() {
      // this.loadingTable = true
      // adminClubResource.list_member(this.query, this.valueId).then(res => {
      //   const { error_code, data, error_msg } = res
      //   if (error_code === 0) {
      //     this.tableData = data.data
      //     this.total = data.total
      //   } else {
      //     this.$message.error(error_msg)
      //   }
      // }).catch(_ => {
      // }).finally(() => {
      //   this.loadingTable = false
      // })
    },

    handleFilter() {
      this.query.page = 1
      this.loadingTable = true
      this.onGetList()
    },
    onReset() {
      this.query = Object.assign({}, { page: 1, limit: 10 })
      this.dateRange = ''
      this.onGetList()
    },
    handleIndexMethod(index) {
      return this.query.page === 1
        ? this.query.page + index
        : (this.query.page - 1) * this.query.limit + index + 1
    },
    handleEdit(row) {
      this.$router.push({
        name: 'DetailClub',
        params: row.id
      })
    },
    handleClose() {
      this.showDialog = false
      this.showDialogHistory = false
      this.onGetList()
    },
    handleAdd() {
      this.showDialog = true
      this.objectData = {}
    },
    handleShowHistory() {
      this.showDialogHistory = true
      this.objectDataHistory = {}
    },
    handleDelete(row) {

    },
    formatNumber,
    formatDate
  }
}
</script>
<style scoped>
  .mr-10 {
    margin-right: 10px;
  }
  .mb-10 {
    margin-bottom: 10px;
  }

  .mt-10 {
    margin-top: 10px;
  }

  .filter-search {
    float: right;
    display: flex;
    justify-content: flex-end;
    margin-right: 0;
  }
  .filter-container .filter-item{
    margin-bottom: 0;
  }
  .search-money{
    padding-right: 10px;
  }
  .search-money:last-child{
    padding-right: 0;
  }
  .row-search-money{
    margin-bottom: 10px;
  }
  .cell .el-tag{
    margin: 5px;
  }
  .clearfix-10 {
    height: 10px;
    clear: both;
  }
  .clearfix-20 {
    height: 20px;
    clear: both;
  }
  .mt-10 {
    margin-top: 10px;
  }
  .title {
    margin: 0;
    text-align: center;
    width: 100%;
    margin: 10px 0 20px 0;
    font-weight: 700px;
    text-transform: uppercase;
  }
</style>

