<template>
  <el-dialog
    :visible.sync="showDialog"
    :before-close="handleClose"
    :close-on-click-modal="false"
    center
    fullscreen
  >
    <span slot="title" class="fw-500 text-upper" style="text-align: center; text-transform: uppercase;">Lịch sử giao dịch</span>
    <div class="filter-container">
      <el-row>
        <el-col class="mb-10">
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
    <el-row style="margin:20px; font-family:Sans-serif">
      <div class="filter-container" />
      <el-row style="width: 100%;">
        <el-table v-loading="loadingTable" :data="tableData" border style="width: 100%;">
          <el-table-column label="STT" width="100" align="center" type="index" :index="handleIndexMethod" />
          <el-table-column label="Loại giao dịch" align="center">
            <template slot-scope="{row}">
              <el-tag v-if="row.type == 1" type="success">Thu</el-tag>
              <el-tag v-else type="danger">Chi</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="Tên giao dịch" align="center" />
          <el-table-column
            label="Loại quỹ"
            align="center"
          >
            <template slot-scope="{row}">
              {{ row.fund ? row.fund.name : '' }}
            </template>
          </el-table-column>
          <el-table-column label="Số tiền" align="center">
            <template slot-scope="{row}">
              {{ row.money ? formatNumber(row.money) : '' }}
            </template>
          </el-table-column>
          <el-table-column prop="desc" label="Mô tả" align="center" />
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
            v-show="total >= query.limit"
            style="padding: 0"
            :total="total"
            :limit.sync="query.limit"
            :page.sync="query.page"
            @pagination="onGetList"
          />
        </el-row>
      </el-row>
    </el-row>
  </el-dialog>
</template>
<script>

// import PartnerServiceResource from '@/api/partner-service/partner-service'
import Pagination from '@/components/Pagination/index'
import { formatDate, formatNumber } from '@/utils/convert'
// const partnerServiceResource = new PartnerServiceResource()

export default {
  name: 'HistoryTransactionClubFund',
  components: {
    Pagination
  },
  props: {
    objectData: {
      type: Object,
      default() {
        return {}
      }
    },
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loadingTable: false,
      query: { page: 1, limit: 10 },
      total: 10,
      tableData: [
        { id: 1, type: 1, name: 'Chi tháng 10', fund_id: 1, fund: { id: 1, name: 'Quỹ Outing' }, money: 5000000, desc: '' },
        { id: 2, type: 2, name: 'Thắng giải', fund_id: 2, fund: { id: 2, name: 'Quỹ CLB' }, money: 5000000, desc: '' },
        { id: 3, type: 2, name: 'Đóng góp', fund_id: 1, fund: { id: 1, name: 'Quỹ Outing' }, money: 5000000, desc: '' }
      ],
      isAdd: true,
      objectDataDialog: {}
    }
  },
  watch: {
    objectData(value) {
      console.log('...................', value)
      if (value) {
        this.query = { ...this.query, ...value }
        this.onGetList()
      }
    }
  },
  created() {
    // this.onGetList()
  },
  methods: {
    async onGetList() {
    //   this.loadingTable = true
    //   partnerServiceResource.get_user_own_voucher(this.query).then(res => {
    //     const { error_code, data } = res
    //     if (error_code === 0) {
    //       this.tableData = data.data
    //       this.total = data.total
    //     } else {
    //       this.$message.error(res.message)
    //     }
    //   }).catch(_ => {
    //   }).finally(() => {
    //     this.loadingTable = false
    //   })
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
    handleAdd() {
      console.log('this.$store.getters.isShowDialogHistoryTransactionFund...', this.$store.getters.isShowDialogHistoryTransactionFund)
      this.$store.dispatch('showDialogHistoryTransactionFund', { isAdd: true })
    },
    handleEdit(row) {
      console.log('this.$store.getters.isShowDialogHistoryTransactionFund...', this.$store.getters.isShowDialogHistoryTransactionFund)
      this.$store.dispatch('showDialogHistoryTransactionFund', Object.assign({}, { ...row, isAdd: false }))
    },
    handleDelete() {},
    handleClose() {
      this.$emit('onCloseDialog', { dialog: true, reload: false })
      this.resetquery()
    },

    async resetquery() {
      await Promise.resolve(
        this.query = { page: 1, limit: 10 },
        this.total = 10
        // this.tableData = []
      )
    },
    formatDate, formatNumber
  }
}
</script>
<style>
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

