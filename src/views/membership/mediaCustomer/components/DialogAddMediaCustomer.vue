<template>
  <el-dialog :title="dialog.titleName" :visible.sync="showDialog" width="50%" :before-close="handleClose">
    <el-form ref="ruleForm" v-loading="dialogLoading" :model="objectData" class="demo-ruleForm">
      <el-row>
        <el-col>
          <el-form-item
            v-if="isAdd === true"
            label="Mã vID:"
            required
          >
            <el-select
              v-model="formRequest.user_id"
              multiple
              class="w-100"
              filterable
              remote
              clearable
              reserve-keyword
              placeholder="Nhập mã vID"
              :remote-method="onSearchGolfer"
              :loading="loadingSearchUser"
              @keyup.enter.native="onSubmitForm('ruleForm')"
            >
              <el-option v-for="user in users" :key="user.value" :label="user.label" :value="user.value" />
            </el-select>
          </el-form-item>
          <el-form-item
            v-if="isAdd === false"
            label="Mã vID:"
            required
          >
            <el-select
              v-model="formRequest.user_id"
              class="w-100"
              filterable
              remote
              clearable
              reserve-keyword
              placeholder="Nhập mã vID"
              :remote-method="onSearchGolfer"
              :loading="loadingSearchUser"
              @keyup.enter.native="onSubmitForm('ruleForm')"
            >
              <el-option v-for="user in users" :key="user.value" :label="user.label" :value="user.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="Ngày đăng bài:" required>
            <el-form-item prop="time_meet">
              <el-date-picker
                v-model="formRequest.time_meet"
                style="width: 100%;"
                type="date"
                format="dd-MM-yyyy"
                value-format="yyyy-MM-dd"
                placeholder="Thời gian đăng bài"
              />
            </el-form-item>
          </el-form-item>
          <el-form-item label="Link truyền thông:" required>
            <el-input
              v-model="formRequest.link"
              type="url"
              prop="about"
              remote
              clearable
              placeholder="Nhập link truyền thông"
              @keyup.enter.native="onSubmitForm('ruleForm')"
              @blur="validateLink"
            />
            <p v-if="!isValidLink" style="color: red;">Liên kết không hợp lệ</p>
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
import GolferResource from '@/api/golfer/golfer'
import ListGolferResource from '@/api/membership/golfer'
const golferResource = new GolferResource()
const listGolferResources = new ListGolferResource()

const arrayStatus = [
  { value: 1, label: 'Hiển thị' },
  { value: 0, label: 'Không hiển thị' }
]
export default {
  name: 'DialogAddMediaCustomer',
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
      isValidLink: true,
      arrayStatus: [...arrayStatus],
      loadingSubmit: false,
      dialogLoading: false,
      loadingSearchUser: false,
      formRequest: {
        admin_id: getAcountInfo().id,
        user_id: [],
        time_meet: null,
        description: '',
        type: 1,
        link: ''
      },
      request: {},
      query: {
        limit: 10,
        page: 1
      },
      users: [],
      dialog: { titleName: 'Thêm mới truyền thông khách hàng', buttonName: 'Thêm mới' }
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
        this.dialog = Object.assign({}, { titleName: 'Thêm mới truyền thông KH', buttonName: 'Thêm mới' })
      } else {
        this.dialog = Object.assign({}, { titleName: 'Cập nhật truyền thông KH', buttonName: 'Cập nhật' })
      }
    }
  },

  methods: {
    validateLink() {
      // Sử dụng một URL Object của JavaScript để kiểm tra tính hợp lệ của liên kết
      try {
        new URL(this.formRequest.link)
        // Nếu liên kết hợp lệ, cập nhật trạng thái isValidLink
        this.isValidLink = true
      } catch (error) {
        // Nếu có lỗi xảy ra khi tạo URL Object, đánh dấu là liên kết không hợp lệ
        this.isValidLink = false
        this.formRequest.link = ''
      }
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
    async appendForm() {
      const formData = this.formRequest
      return formData
    },
    async handleSubmitAdd(formBody) {
      listGolferResources.storeMediaCustomer(formBody).then(async res => {
        if (res.error_code === 0) {
          this.$message.success(res.error_msg)
          this.$emit('onCloseDialog', { dialog: false, reload: true })
          await this.resetformRequest()
        } else {
          this.$message.error(res.error_msg)
        }
      }).finally(() => {
        this.loadingSubmit = false
      })
    },
    async handleSubmitUpdate(formBody) {
      listGolferResources.updateMediaCustomer(formBody, formBody.id).then(res => {
        if (res.error_code === 0) {
          this.$message.success(res.error_msg)
          this.$emit('onCloseDialog', { dialog: false, reload: true })
          this.resetformRequest()
        } else {
          this.$message.error(res.error_msg)
        }
      }).finally(() => {
        this.loadingSubmit = false
      })
    },

    async resetformRequest() {
      (
        this.formRequest = {
          admin_id: getAcountInfo().id,
          user_id: [],
          time_meet: null,
          description: '',
          type: 1
        }
      )
    },
    handleClose() {
      this.$emit('onCloseDialog', { dialog: false, reload: false })
      this.resetformRequest()
    }
  }
}
</script>

<style scoped>
.w-100 {
  width: 100%;
}
</style>
