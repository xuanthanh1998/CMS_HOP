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
              class="w-100"
              filterable
              remote
              clearable
              reserve-keyword
              multiple
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
          <el-form-item label="Ngày gặp khách hàng:" required>
            <el-form-item prop="time_meet">
              <el-date-picker
                v-model="formRequest.time_meet"
                style="width: 100%;"
                type="date"
                format="dd-MM-yyyy"
                value-format="yyyy-MM-dd"
                placeholder="Chọn ngày gặp khách hàng"
              />
            </el-form-item>
          </el-form-item>
          <el-form-item label="Nội dung CSKH :" required>
            <el-form-item prop="description">
              <el-input
                v-model="formRequest.description"
                type="textarea"
                prop="about"
                placeholder="Nhập nội dung CSKH"
                @keyup.enter.native="onSubmitForm('ruleForm')"
              />
            </el-form-item>
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
  name: 'DialogAddDirectCustomer',
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
      loadingSearchUser: false,
      formRequest: {
        admin_id: getAcountInfo().id,
        user_id: '',
        time_meet: null,
        description: '',
        type: 0
      },
      request: {},
      query: {
        limit: 10,
        page: 1
      },
      users: [],
      dialog: { titleName: 'Thêm mới CSKH trực tiếp', buttonName: 'Thêm mới' }
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
        this.dialog = Object.assign({}, { titleName: 'Thêm mới CSKH trực tiếp', buttonName: 'Thêm mới' })
      } else {
        this.dialog = Object.assign({}, { titleName: 'Cập nhật CSKH trực tiếp', buttonName: 'Cập nhật' })
      }
    }
  },

  methods: {
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
      listGolferResources.storeDirectCustomer(formBody).then(async res => {
        if (res.error_code === 0) {
          this.$message.success(res.error_msg)
          this.$emit('onCloseDialog', { dialog: false, reload: true })
          await this.resetFormRequest()
        } else {
          this.$message.error(res.error_msg)
        }
      }).finally(() => {
        this.loadingSubmit = false
      })
    },
    async handleSubmitUpdate(formBody) {
      listGolferResources.updateDirectCustomer(formBody, formBody.id).then(res => {
        if (res.error_code === 0) {
          this.$message.success(res.error_msg)
          this.$emit('onCloseDialog', { dialog: false, reload: true })
          this.resetFormRequest()
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
          user_id: '',
          time_meet: null,
          description: '',
          type: 0
        }
      )
    },
    handleClose() {
      this.$emit('onCloseDialog', { dialog: false, reload: false })
      this.resetFormRequest()
    }
  }
}
</script>

<style scoped>
.w-100 {
  width: 100%;
}
</style>
