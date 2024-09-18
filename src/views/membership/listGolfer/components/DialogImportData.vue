<template>
  <el-dialog title="Import Excel" :visible.sync="dialogVisible" :before-close="handleClose" width="80%">
    <el-upload
      ref="upload"
      class="upload-demo"
      :action="url"
      :on-change="onChangeFileExcel"
      accept=".xlsx"
      :auto-upload="false"
      :on-success="handleSuccess"
      name="image"
      style="padding-bottom: 10px"
    >
      <el-button slot="trigger" size="small" type="primary">select file</el-button>
      <el-button
        style="margin-left: 10px;"
        size="small"
        :loading="loading"
        type="success"
        @click="submitUpload"
      >upload to server</el-button>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="handleRemove">clear</el-button>

    </el-upload>
    <table
      class="table table-bordered"
      style="vertical-align: center ;
                display: block;
                max-height: 500px;
                overflow-y: scroll;"
    >
      <thead>
        <tr>
          <th class="text-center col-3 vertical-middle" style="min-width: 500px">vID khách hàng</th>
          <th scope="col" class="text-center" style="max-width:100px">Hạng nâng</th>
          <th scope="col" class="text-center" style="max-width:100px">Thời gian hết hạn</th>
          <th scope="col" class="text-center" style="max-width:100px">Sân</th>
          <th scope="col" class="text-center" style="max-width:100px">Hành động</th>

        </tr>
      </thead>
      <tbody>
        <tr v-for="(golfer, key) in listGolfers" :key="key">
          <th style="text-align: left" class="col-3">
            {{ `vID${golfer.user_id}` }}
          </th>

          <td style="text-align: center; max-width:100px" class="vertical-middle">
            <span v-if="golfer.allow_using_scorecard_image === 0">Non member</span>
            <span v-if="golfer.allow_using_scorecard_image === 1">Member</span>
            <span v-if="golfer.allow_using_scorecard_image === 2">Member vip</span>
            <span v-if="golfer.allow_using_scorecard_image === 3">Member luxury</span>
            <span v-if="golfer.allow_using_scorecard_image === 13">Cộng tác viên</span>
          </td>
          <td style="text-align: center; max-width:100px" class="vertical-middle">
            {{ golfer.expried_time }}
          </td>
          <td style="text-align: center; max-width:100px" class="vertical-middle">
            {{ golfer.facility_id }}
          </td>
          <td style="text-align: center; max-width:100px" class="vertical-middle">
            <el-button type="danger" size="mini" @click="handleCloseTag(golfer)">Xóa</el-button>
          </td>
        </tr>
      </tbody>
    </table>

  </el-dialog>
</template>

<script>
import XLSX from 'xlsx'
// const urlBaseApi = process.env.VUE_APP_BASE_API
import ListGolferResource from '@/api/membership/golfer'
import { Message } from 'element-ui'
import moment from 'moment'
// const golferResource = new GolferResource()
// import GolferResource from '@/api/golfer/golfer'

const listGolferResources = new ListGolferResource()
export default {
  name: 'DialogImportData',
  // components: { UploadExcel },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tableData: [],
      tableHeader: [],
      file_excel: '',
      url: `https://api-v2.vcallid.com/api/utils/upload/data`,
      showUpload: true,
      listGolfers: [],
      loading: false
    }
  },
  methods: {
    handleCloseTag(golfer) {
      this.listGolfers.splice(this.listGolfers.indexOf(golfer), 1)
    },
    async onChangeFileExcel(value, array) {
      if (value?.name.includes('%') || value?.name.includes('#') || value?.name.includes('/')) {
        Message({
          message: `Tên file khồng được chứa ký tự %, # và /`,
          type: 'warning',
          duration: 5 * 1000
        })
        array.pop()
      } else if (value?.raw?.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' && value.status !== 'success') {
        Message({
          message: `Yêu cầu định dạng file là XLSX`,
          type: 'warning',
          duration: 5 * 1000
        })
        array.pop()
      } else {
        console.log(value.raw)
        this.fileExcel = value.raw
        const reader = new FileReader()
        reader.onload = (e) => {
          var data = e.target.result
          var workbook = XLSX.read(data, { type: 'binary' })
          const sheetName = workbook.SheetNames[0]
          const worksheet = workbook.Sheets[sheetName]
          const rowObject = XLSX.utils.sheet_to_json(worksheet)
          console.log('jngọdfxọcxvo', rowObject)
          if (rowObject.length > 0) {
            console.log('qưeqưeqư', rowObject)
            const data = rowObject.map(item => {
              console.log('hjkcvxk', item.expried_time)
              const date = moment('1899-12-30').add(item.expried_time, 'days').format('YYYY-MM-DD')
              item.expried_time = date
              return item
            })
            this.listGolfers = data
            console.log('ưqewqewqeqưe', this.listGolfers)
          } else {
            this.$message.warning('Không có bản ghi.')
            return
          }
        }
        reader.readAsBinaryString(value.raw)
        array.pop()
        // this.$refs.upload.clearFiles()
      }
    },

    submitUpload() {
      this.loading = true
      listGolferResources.importExcel(this.listGolfers).then(res => {
        const { error_code, error_msg } = res
        if (error_code === 0) {
          this.$message.success(res.error_msg)
          this.loading = false
          this.$emit('onClickButtonImport', { dialog: false, reload: true })
          setTimeout(() => {
            this.handleRemove()
          }, 2000)
        } else {
          this.$message.error(error_msg)
        }
      })
    },
    handleRemove(file) {
      this.listGolfers = []
      this.$refs.upload.clearFiles()
    },
    handleClose() {
      this.handleRemove()
      this.$emit('onClickButtonImport', { dialog: false, reload: false })
    },
    handleSuccess(value) {
      this.importExcelCustom(value)
    }
  }
}
</script>

<style scoped>

</style>
