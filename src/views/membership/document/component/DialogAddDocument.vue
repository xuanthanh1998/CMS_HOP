<template>
  <el-dialog :title="dialog.titleName" :visible.sync="showDialog" width="60%" :before-close="handleClose">
    <el-form ref="ruleForm" v-loading="dialogLoading" :model="objectData" class="demo-ruleForm">
      <el-row>
        <el-col>
          <el-form-item label="Tên văn bản:" required>
            <el-input
              v-model="formRequest.name"
              prop="name"
              placeholder="Tên văn bản"
              @keyup.enter.native="onSubmitForm('ruleForm')"
            />
          </el-form-item>
          <el-row>
            <el-col :md="6" class="mr-10">
              <el-form-item label="Ngày áp dụng:" required>
                <el-date-picker
                  v-model="formRequest.time_start"
                  style="width: 100%;"
                  type="date"
                  format="dd-MM-yyyy"
                  value-format="yyyy-MM-dd"
                  placeholder="Ngày áp dụng"
                  @keyup.enter.native="onSubmitForm('ruleForm')"
                />
              </el-form-item>
            </el-col>
            <el-col :md="6">
              <el-form-item label="Ngày hết hạn:" required>
                <el-date-picker
                  v-model="formRequest.time_end"
                  style="width: 100%;"
                  type="date"
                  format="dd-MM-yyyy"
                  value-format="yyyy-MM-dd"
                  placeholder="Ngày hết hạn"
                  @keyup.enter.native="onSubmitForm('ruleForm')"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="File tài liệu:">
            <el-upload
              ref="ruleForm"
              :file-list="listImage"
              class="upload-demo"
              action="uploadURL"
              list-type="picture-thumb"
              multiple
              :on-change="onPickImage"
              :on-remove="removeFile"
              :auto-upload="false"
              :limit="1"
              :on-exceed="(file, fileList) => handleExceed(files, fileList, 1)"
            >
              <el-button type="primary"> Upload file</el-button>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">Hủy</el-button>
      <el-button type="primary" :loading="loadingSubmit" @click="onSubmitForm('ruleForm')">{{
        dialog.buttonName
      }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getAcountInfo } from '@/utils/auth'
// import moment from 'moment'
import { formatNumber } from '@/utils/convert'
import GolferResource from '@/api/golfer/golfer'
import ListGolferResource from '@/api/membership/golfer'
import { Message } from 'element-ui'
import { v4 as uuidv4 } from 'uuid'
import Axios from 'axios'
import { isEmpty } from '@/utils/validate'
import moment from 'moment'
const golferResource = new GolferResource()
const listGolferResources = new ListGolferResource()

const arrayStatus = [
  { value: 1, label: 'Hiển thị' },
  { value: 0, label: 'Không hiển thị' }
]
export default {
  name: 'DialogAddDocument',
  props: {
    objectData: {
      type: Object,
      default() {
        return {}
      }
    },
    organizationData: {
      type: Array,
      default() {
        return []
      }
    },
    showDialog: {
      type: Boolean,
      default: false
    },
    isAdd: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      arrayStatus: [...arrayStatus],
      loadingSubmit: false,
      dialogLoading: false,
      formRequest: {
        admin_id: getAcountInfo().id,
        name: null,
        time_start: '',
        time_end: '',
        file: ''
      },
      listImage: [],
      request: {},
      query: {
        limit: 10,
        page: 1
      },
      users: [],
      files: null,
      dialog: { titleName: 'Thêm mới văn bản', buttonName: 'Thêm mới' }
    }
  },
  computed: {

  },
  watch: {
    async objectData(value) {
      console.log('value1211111111111', value)
      if (!this.isAdd) {
        this.formRequest = {
          ...this.formRequest,
          ...value
        }
        // this.listImage = value.file
        this.listImage = value.file ? [{ url: value.file, name: value?.file }] : []
      } else {
        if (value) {
          this.formRequest = {
            ...this.formRequest,
            ...value
          }
          console.log('this.formRequest.....................', this.formRequest)
        }
      }
    },
    isAdd(value) {
      console.log('isAdd', value)
      if (value) {
        this.dialog = Object.assign({}, { titleName: 'Thêm mới văn bản', buttonName: 'Thêm mới' })
      } else {
        this.dialog = Object.assign({}, { titleName: 'Cập nhật văn bản', buttonName: 'Cập nhật' })
      }
    }
  },

  methods: {
    async onPickImage(value, array) {
      console.log('value___________', value)
      if (value.size > 60000000) {
        Message({
          message: `Kích thước ảnh tối đa là 60.000 mb, bạn đang chọn ảnh ${value.name} với kích thước ${formatNumber(value.size)} kb`,
          type: 'warning',
          duration: 5 * 1000
        })
        array.pop()
        this.listImage = array
      } else {
        this.files = value.raw
      }
    },
    removeFile(value) {
      delete this.formRequest.file
      this.file = null
    },
    handleExceed(filess, fileList, length) {
      Message({
        message: `Tối đa là ${length} file, bạn đang chọn ${filess.length + fileList.length} file`,
        type: 'warning',
        duration: 5 * 1000
      })
    },
    async uploadFileToServe(file) {
      const myNewFile = new File([file], `${uuidv4().toString()}.png`, { type: file.type })
      const url = 'https://api-v2.vcallid.com/api/utils/upload/data'
      const formData = new FormData()
      formData.append('image', myNewFile)
      const res = await Axios.post(url, formData, {
        headers: {
          'content-type': 'multipart/form-data'
        }
      })
      return res
    },

    onSearchGolfer(keyword) {
      golferResource.searchGolfer({ keyword: keyword }).then(res => {
        const result = res.data
        if (res.error_code === 0) {
          if (result.length > 0) {
            this.users = result.map(value => {
              const label = `vID${value.id} - ${value.fullname}`
              return { value: value.id, label: label, phone: value.phone }
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
    onSubmitForm(formName) {
      this.$refs[formName].validate(async(validate) => {
        if (validate) {
          this.loadingSubmit = true
          const formBody = await this.appendForm()
          console.log('ffffffffffffff', formBody)
          if (this.isAdd) await this.handleSubmitAdd(formBody)
          else await this.handleSubmitUpdate(formBody)
        }
      })
    },
    async handleSubmitAdd(formBody) {
      listGolferResources.storeDocument(formBody).then(async res => {
        if (res.error_code === 0) {
          this.$message.success(res.error_msg)
          await this.resetFormRequest()

          this.$emit('onCloseDialog', { dialog: false, reload: true })
        } else {
          this.$message.error(res.error_msg)
        }
      }).finally(() => {
        this.loadingSubmit = false
      })
    },
    async handleSubmitUpdate(formBody) {
      listGolferResources.updateDocument(formBody, formBody.id).then(res => {
        if (res.error_code === 0) {
          this.$message.success(res.error_msg)
          this.resetFormRequest()

          this.$emit('onCloseDialog', { dialog: false, reload: true })
        } else {
          this.$message.error(res.error_msg)
        }
      }).finally(() => {
        this.loadingSubmit = false
      })
    },

    async resetFormRequest() {
      (
        this.formRequest = {
          admin_id: getAcountInfo().id,
          name: null,
          time_start: '',
          time_end: '',
          file: ''
        },
        this.listImage = [],
        this.files = null
      )
    },
    handleClose() {
      this.$emit('onCloseDialog', { dialog: false, reload: false })
      this.resetformRequest()
    },
    async appendForm() {
      const formData = this.formRequest
      console.log('áđấâsđâsđá', formData)
      if (moment(formData.time_end).isBefore(moment().format('YYYY-MM-DD')) === false) {
        formData.status = 1
      } else {
        formData.status = 0
      }

      if (this.files != null && isEmpty(formData.file)) {
        const fileUpload = await this.uploadFileToServe(this.files)
        if (fileUpload) { formData.file = fileUpload.data.name }
      }
      return formData
    },

    formatNumber
  }
}
</script>

<style scoped>
.w-100 {
  width: 100%;
}
.mr-10 {
  margin-right: 10px;
}
.color-red {
  color: red;
}
</style>
