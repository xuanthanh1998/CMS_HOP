<template>
  <el-dialog
    :visible.sync="$store.getters.isShowDialogHistoryTransactionFund"
    width="80%"
    :before-close="handleClose"
  >
    <span slot="title" class="fw-500 text-upper" style="text-align: center; text-transform: uppercase;">{{ $store.getters.objectHistoryTransactionFund.isAdd ? 'Thêm giao dịch' : 'Sửa giao dịch' }}</span>
    <el-form ref="ruleForm" v-loading="dialogLoading" :rules="rules" :model="objectData" class="demo-ruleForm">
      <el-form-item label="Tổng tiền: " required>
        <el-row>
          <span :style="{ color: +total_money > 0 ? 'blue' : +total_money < 0 ? 'red' : '', fontSize: '18px', fontWeight: '550' }">
            {{ `${total_money} VNĐ` }}
          </span>
        </el-row>
        <el-row class="data-table-content table-responsive">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th scope="col" class="text-center" style="min-width: 180px">Loại giao dịch</th>
                <th scope="col" class="text-center" style="min-width: 180px">Loại quỹ</th>
                <th scope="col" class="text-center" style="min-width: 180px">Số tiền</th>
                <th scope="col" class="text-center" style="min-width: 180px">Mô tả</th>
                <th scope="col" class="text-center" style="min-width: 180px">Xóa</th>
              </tr>
            </thead>
            <tbody>
              <template>
                <template v-for="(item, index) in formRequest.transactionList">
                  <tr :key="index">
                    <td class="text-center">
                      <el-select
                        v-model="formRequest.transactionList[index].type"
                        class="w-100"
                        filterable
                        remote
                        clearable
                        placeholder="Chọn loại giao dịch"
                      >
                        <el-option
                          v-for="val in typeList"
                          :key="val.value"
                          :label="val.label"
                          :value="val.value"
                        />
                      </el-select>
                    </td>
                    <td class="text-center">
                      <el-select
                        v-model="formRequest.transactionList[index].fund_id"
                        class="w-100"
                        filterable
                        remote
                        clearable
                        placeholder="Chọn loại quỹ"
                      >
                        <el-option
                          v-for="fund in fundList"
                          :key="fund.value"
                          :label="fund.label"
                          :value="fund.value"
                        />
                      </el-select>
                    </td>
                    <td class="text-center">
                      <el-input-number
                        v-model="formRequest.transactionList[index].amount"
                        :min="1"
                        placeholder="Số tiền"
                      />
                    </td>
                    <td class="text-center">
                      <el-input
                        v-model="formRequest.transactionList[index].desc"
                        placeholder="Mô tả"
                      />
                    </td>
                    <td class="text-center">
                      <el-button
                        style="margin-right: 10px"
                        size="small"
                        :title="`Xóa`"
                        type="danger"
                        icon="el-icon-delete"
                        circle
                        @click="deleteTransactionFund(index)"
                      />
                    </td>
                  </tr>
                </template>
              </template>
            </tbody>
          </table>
          <el-row class="text-center">
            <el-button class="text-center" @click="addTransactionFund">Thêm thành tích</el-button>
          </el-row>
        </el-row>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">Hủy</el-button>
      <el-button type="primary" :loading="loadingSubmit" @click="onSubmitForm('ruleForm')">Xác nhận</el-button>
    </span>
  </el-dialog>
</template>
<script>

// import { validateText, validateImage, validateTextArea } from '@/utils/validate'
import { formatNumber } from '@/utils/convert'
import EventResource from '@/api/event'
import { trim_string_object } from '@/utils/trim-string-object'
import GolferResource from '@/api/golfer/golfer'
import AdminClubResource from '@/api/club/admin-club'

const golferResource = new GolferResource()
const eventResource = new EventResource()
const adminClubResource = new AdminClubResource()

export default {
  name: 'DialogHistoryTransactionFund',
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
    },
    isAdd: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      rules: {},
      loadingSubmit: false,
      dialogLoading: false,
      formRequest: {
        transactionList: []
      },
      request: {},
      achievementList: [],
      users: [],
      clubs: [],
      objectAchievement: {},
      typeList: [{ value: 1, label: 'Thu' }, { value: 2, label: 'Chi' }],
      fundList: [{ value: 1, label: 'Quỹ Outing' }, { value: 2, label: 'Quỹ CLB' }]
    }
  },
  computed: {
    total_money() {
      return this.formRequest.transactionList.reduce((sum, item) => sum + +(item.type === 1 ? item.amount : (0 - +item.amount)), 0)
    }
  },
  watch: {
    '$store.getters.objectHistoryTransactionFund'(value) {
      //
    }
  },
  created() {
    this.onGetList()
  },
  methods: {
    onGetList() {
      this.loadingTable = true
      eventResource.list_option_achievement({ get_all: 1 }).then(res => {
        if (res.error_code === 0) {
          this.achievementList = res?.data?.data || []
          if (this.achievementList.length > 0) {
            this.objectAchievement = this.achievementList.reduce((a, v) => ({ ...a, [v.id]: v }), {})
            console.log('this.achievementList...........', this.achievementList)
            console.log('this.objectAchievement...........', this.objectAchievement)
          }
          console.log('this.tableData___________', this.tableData)
        } else {
          this.$message.error(res.error_msg)
        }
      }).finally(() => {
        this.loadingTable = false
      })
    },
    onSubmitForm(formName) {
      this.$refs[formName].validate((validate) => {
        if (validate) {
          if (!this.formRequest.transactionList.length > 0 || (+this.$store.getters.event_object.is_global === 1 && this.formRequest.transactionList.find(item => +item.type === 1 && !item.club_id))) {
            this.$message.error('Bạn chưa nhập đủ thông tin !!!')
            return
          } else {
            this.handleSubmit()
          }
        }
      })
    },
    async handleSubmit() {
      await this.trim_string_object(this.formRequest)
      const list = this.formRequest.transactionList
        .filter(item => item.achievement_type)
        .map((item) => (
          {
            achievement_type: item.achievement_type,
            achievement_name: item?.achievement_name ? item?.achievement_name : this.objectAchievement?.[item.achievement_type]?.achievement_name,
            user_id: item.user_id,
            club_id: item.club_id,
            type: item.type
          }
        ))
      const body = { event_id: this.$store.getters.event_id, transactionList: list }
      console.log('body....................', body)
      eventResource.store_achievement(body).then(res => {
        this.loadingSubmit = false
        const { error_code, error_msg } = res
        console.log('res.................................', res)
        if (error_code === 0) {
          this.$message.success('Thêm mới thành công')
          this.resetformRequest()
          this.handleClose()
        } else {
          this.$message.error(error_msg)
        }
      }).catch(_ => {
        this.loadingSubmit = false
      })
    },

    async resetformRequest() {
      await Promise.resolve(
        this.keyImage = [],
        this.formRequest = {
          transactionList: []
        }
      )
      this.$refs['ruleForm'].clearValidate()
    },

    handleClose() {
      this.$store.dispatch('hideDialogHistoryTransactionFund', {})
      this.resetformRequest()
    },
    onSearchGolfer(keyword) {
      const params = { keyword: keyword }
      this.loadingSearchUser = true
      golferResource.searchGolfer(params).then(res => {
        const result = res.data
        if (res.error_code === 0) {
          if (result.length > 0) {
            this.users = result.map(value => {
              return { value: value.id, label: value.fullname, phone: value.phone || '' }
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
    onSearchClub(keyword) {
      this.loadingSearchClub = true
      adminClubResource.search({ keyword: keyword }).then(res => {
        const result = res.data
        if (res.error_code === 0) {
          if (result.length > 0) {
            this.clubs = result
          } else {
            this.clubs = []
          }
        } else {
          this.$message.error(res.error_msg)
        }
      }).finally(() => {
        this.loadingSearchClub = false
      })
    },
    addTransactionFund() {
      this.formRequest.transactionList.push({ fund_id: '', achievement_name: '', amount: '', type: 2, user_id: '' })
    },
    deleteTransactionFund(index) {
      console.log('index', index)
      this.formRequest.transactionList.splice(index, 1)
    },

    formatNumber,
    trim_string_object
  }
}
</script>

<style scoped>
  .mb-10 {
    margin-bottom: 10px;
  }
</style>

