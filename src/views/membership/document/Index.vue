<template>
  <el-row style="margin:20px;">
    <el-row class="list-account__header">
      <el-col :sm="24" style="display:flex;">
        <h1 style="margin: 0; width: 100%; padding: 10px; text-align: center;">Quản lý văn bản</h1>
      </el-col>
    </el-row>
    <div class="clearfix-20" />
    <div class="filter-container">
      <el-row>
        <el-col :sm="4" class="mr-10">
          <label>Tìm kiếm theo tên văn bản:</label>
          <el-select
            v-model="query.name"
            class="w-100"
            filterable
            remote
            clearable
            reserve-keyword
            placeholder="Nhập tên văn bản"
            :remote-method="onSearchDocument"
            :loading="loadingSearchDocument"
          >
            <el-option v-for="document in documents" :key="document.value" :label="document.label" :value="document.label" />
          </el-select>
        </el-col>
        <el-col class="search-money mr-10" :sm="6" :md="4">
          <div class="grid-content bg-purple">
            <label> Tìm kiếm theo trạng thái: </label>
            <el-select v-model="query.status" class="select-status w-100" placeholder="Trạng thái">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </el-col>
        <el-col :sm="6" class="mr-10" style="padding-top: 30px">
          <el-button class="filter-item" icon="el-icon-refresh" round @click="onReset">Reset</el-button>
          <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
            Tìm kiếm
          </el-button>
          <el-button class="filter-item" type="primary" icon="el-icon-plus" @click="handleAddDocument">Thêm mới
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
          width="100"
          align="center"
          type="index"
          :index="handleIndexMethod"
        />
        <el-table-column
          prop="name"
          label="Tên văn bản"
          align="center"
        />
        <el-table-column
          label="Ngày áp dụng"
          align="center"
        >
          <template slot-scope="{row}">
            {{ row.time_start ? convertDate(row.time_start) : '' }}
          </template>
        </el-table-column>
        <el-table-column
          label="Ngày hết hạn"
          align="center"
        >
          <template slot-scope="{row}">
            {{ row.time_start ? convertDate(row.time_end) : '' }}
          </template>
        </el-table-column>
        <el-table-column
          label="Trạng thái"
          align="center"
        >
          <template slot-scope="{row}">
            <el-tag v-if="row.status === 1" type="success">Còn hạn</el-tag>
            <el-tag v-else type="info">Hết hạn</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="File văn bản"
          align="center"
        >
          <template slot-scope="scope">
            <el-link
              v-if="scope.row.file"
              type="primary"
              :href="scope.row.file"
              target="_blank"
            > <el-button>Xem </el-button></el-link>

          </template>
        </el-table-column>
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
              @click="handleEditDocument(scope.row)"
            >
              Sửa
            </el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              round
              @click="handleDeleteDocument(scope.row.id)"
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
        <dialog-add-document
          :show-dialog="showDialogAddDocument"
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
import DialogAddDocument from '@/views/membership/document/component/DialogAddDocument.vue'

const optionStatus = [
  { value: 0, label: 'Hết hạn' },
  { value: 1, label: 'Còn hạn' }
]
export default {
  name: 'LogHistory',
  components: {
    DialogAddDocument,
    Pagination
  },
  data() {
    return {
      objectData: {},
      isAdd: true,
      options: [...optionStatus],
      loadingTable: false,
      tableData: [],
      adminData: [],
      loadingSearchAdmin: false,
      showDialogAddDocument: false,
      onShowDialog: false,
      objectDetail: {},
      query: {
        limit: 10,
        page: 1
      },
      total: 0,
      admins: [],
      dateRange: [],
      loadingSearchDocument: false,
      documents: []

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
    onSearchDocument(keyword) {
      listGolferResources.searchNameDocument({ keyword_document: keyword }).then(res => {
        const result = res.data
        if (res.error_code === 0) {
          if (result.length > 0) {
            this.documents = result.map(value => {
              const label = value.name
              return { value: value.id, label: label }
            })
            console.log('qưeqưeqưe', this.documents)
          } else {
            this.documents = []
          }
          this.loadingSearchDocument = false
        } else {
          this.$message.error(res.error_msg)
        }
      })
    },
    convertDate,
    handleClose(value) {
      this.showDialogAddDocument = value.dialog
      if (value.reload) {
        this.query = Object.assign({}, { limit: 10, page: 1 })
        this.onGetList()
      }
    },
    handleDeleteDocument(id) {
      this.$confirm(`Bạn có chắc chắn xóa văn bản này không ?`).then((_) => {
        listGolferResources.removeDocument(id).then(res => {
          if (res.error_code === 0) {
            this.onGetList()
            this.$message.success(res.error_msg)
          } else {
            this.$message.error(res.error_msg)
          }
        })
      })
    },
    handleAddDocument() {
      this.isAdd = true
      this.showDialogAddDocument = true
      this.objectData = {}
    },
    handleEditDocument(row) {
      this.isAdd = false
      this.showDialogAddDocument = true
      this.objectData = Object.assign({}, row)
    },
    convertDateTimeSecond,
    onGetList() {
      this.loadingTable = true
      listGolferResources.listDocument(this.query).then(response => {
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
