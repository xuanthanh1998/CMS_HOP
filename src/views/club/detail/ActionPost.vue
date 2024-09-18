<template>
  <div>
    <!-- <h4>Quản lý bài đăng</h4> -->
    <el-tabs type="border-card" class="demo-tabs">
      <el-tab-pane>
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><calendar /></el-icon>
            <span>Duyệt bài viết</span>
          </span>
        </template>
        <section class="tab_content">
          <ReportViolations
            :object-data="objectDetail"
          />
        </section>
      </el-tab-pane>
      <!-- <el-tab-pane>
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><calendar /></el-icon>
            <span>Black list</span>
          </span>
        </template>
        <section class="tab_content">
          <BlackList
            :object-data="objectDetail"
          />
        </section>
      </el-tab-pane>
      <el-tab-pane>
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><calendar /></el-icon>
            <span>Lịch sử</span>
          </span>
        </template>
        <section class="tab_content">
          <History
            :object-data="objectDetail"
          />
        </section>
      </el-tab-pane> -->
    </el-tabs>
  </div>
</template>
<script>
import ReportViolations from '@/views/club/detail/components/actionPost/ReportViolations'
// import BlackList from '@/views/club/detail/components/actionPost/BlackList'
// import History from '@/views/club/detail/components/actionPost/History'

import { formatNumber, convertDateTime } from '@/utils/convert'
import { trim_string_object } from '@/utils/trim-string-object'
import AdminClubResource from '@/api/club/admin-club'

const adminClubResource = new AdminClubResource()

export default {
  name: 'ActionPost',
  components: {
    ReportViolations
    // BlackList,
    // History
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
      tableData: [],
      objectDetail: {}
    }
  },
  watch: {
    objectData(value) {
      console.log('...................', value)
      if (value) {
        this.objectDetail = value
        this.onGetList()
      }
    }
  },
  created() {
    this.onGetDetail()
  },
  methods: {
    async onGetDetail() {
      this.loadingTable = true
      await this.trim_string_object(this.query)
      console.log('..........', this.query)
      adminClubResource.detail(this.$route.params.id).then(res => {
        const { error_code, data, error_msg } = res
        if (error_code === 0) {
          this.objectDetail = data
        } else {
          this.$message.error(error_msg)
        }
      }).catch(_ => {
      }).finally(() => {
        this.loadingTable = false
      })
    },
    formatNumber,
    convertDateTime,
    trim_string_object
  }
}
</script>

  <style scoped>
  .tab_content {
    height: 86vh;
    margin-bottom: 7px;
    overflow:auto;
  }
  </style>

