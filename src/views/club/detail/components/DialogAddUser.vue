<template>
  <el-dialog
    :title="dialog.titleName"
    :visible.sync="showDialog"
    :before-close="handleClose"
    fullscreen
  >
    <el-form ref="notifyForm" v-loading="dialogLoading" :rules="rules" :model="objectData" class="demo-notifyForm">
      <el-row>
        <el-col>
          <el-row :sm="12">
            <el-col :xs="24" :md="{span:12,offset:1}">
              <el-row>
                <el-select
                  v-model="golferModel"
                  class="w-100"
                  filterable
                  remote
                  clearable
                  reserve-keyword
                  placeholder="Tìm kiếm mã vID"
                  :remote-method="onSearchGolfer"
                  :loading="loadingSearchUser"
                >
                  <el-option v-for="user in users" :key="user.value" :label="`vID${user.value} - ${user.label}`" :value="user" />
                </el-select>
              </el-row>
            </el-col>
            <el-col
              :xs="12"
              :sm="4"
              style="text-align: right;margin-right: 10px;"
            >
              <el-button size="mini" type="primary" @click="downloadTemplate">Tải file mẫu<i
                class="el-icon-download el-icon-right"
              /></el-button>
            </el-col>

            <el-col :xs="12" :sm="4">
              <el-upload ref="upload_golfer_receiver" action="uploadURL" :on-change="onChangeFileExcel" :auto-upload="false" :limit="1">
                <el-button size="mini" type="primary">Import Golfer <i
                  class="el-icon-download el-icon-right"
                /></el-button>
              </el-upload>
            </el-col>
          </el-row>
          <el-row v-if="listGolfers.length > 0" class="data-table-content table-responsive mt-10">
            <el-col>
              <span class="mb-20"><b>Danh sách Golfer thêm: </b></span>
              <table
                class="table table-bordered"
                style="vertical-align: center ;
                display: block;
                overflow-y: scroll;"
              >
                <thead>
                  <tr>
                    <th class="text-center vertical-middle" style="min-width: 150px">Tên</th>
                    <th class="text-center vertical-middle" style="min-width: 150px">Ngày sinh</th>
                    <th class="text-center vertical-middle" style="min-width: 150px">GIới tính</th>
                    <th class="text-center vertical-middle" style="min-width: 150px">Số điện thoại</th>
                    <th class="text-center vertical-middle" style="min-width: 150px">Địa chỉ</th>
                    <th class="text-center vertical-middle" style="min-width: 150px">CCCD</th>
                    <th class="text-center vertical-middle" style="min-width: 150px">Size áo</th>
                    <th class="text-center vertical-middle" style="min-width: 150px">Size quần</th>
                    <th class="text-center vertical-middle" style="min-width: 150px">Size mũ</th>
                    <th class="text-center vertical-middle" style="min-width: 150px">Size găng tay</th>
                    <th class="text-center vertical-middle" style="min-width: 150px">Size giày</th>
                    <th class="text-center vertical-middle" style="min-width: 150px">Chức vụ</th>
                    <th scope="col" class="text-center" style="max-width:100px">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(golfer, key) in listGolfers" :key="key">
                    <th style="text-align: left" class="col-1">
                      {{ `vID${golfer.id} - ` + golfer.fullname }}
                    </th>
                    <th style="text-align: left" class="col-1">
                      <el-input
                        v-model="golfer.birthday"
                        clearable
                        placeholder="Ngày sinh"
                      />
                    </th>
                    <th style="text-align: left" class="col-1">
                      <el-input
                        v-model="golfer.sexy"
                        clearable
                        placeholder="Giới tính"
                      />
                    </th>
                    <th style="text-align: left" class="col-1">
                      <el-input
                        v-model="golfer.phone"
                        clearable
                        placeholder="Số điện thoại"
                      />
                    </th>
                    <th style="text-align: left" class="col-1">
                      <el-input
                        v-model="golfer.address"
                        clearable
                        placeholder="Địa chỉ"
                      />
                    </th>
                    <th style="text-align: left" class="col-1">
                      <el-input
                        v-model="golfer.passport"
                        clearable
                        placeholder="CCCD"
                      />
                    </th>
                    <th style="text-align: left" class="col-1">
                      <el-input
                        v-model="golfer.size_shirt"
                        clearable
                        placeholder="Size áo"
                      />
                    </th>
                    <th style="text-align: left" class="col-1">
                      <el-input
                        v-model="golfer.size_pant"
                        clearable
                        placeholder="Size quần"
                      />
                    </th>
                    <th style="text-align: left" class="col-1">
                      <el-input
                        v-model="golfer.size_hat"
                        clearable
                        placeholder="Size mũ"
                      />
                    </th>
                    <th style="text-align: left" class="col-1">
                      <el-input
                        v-model="golfer.size_glove"
                        clearable
                        placeholder="Size găng tay"
                      />
                    </th>
                    <th style="text-align: left" class="col-1">
                      <el-input
                        v-model="golfer.size_shoe"
                        clearable
                        placeholder="Size giày"
                      />
                    </th>
                    <th style="text-align: left" class="col-1">
                      <el-select
                        v-model="golfer.position"
                        class="w-100"
                        filterable
                        multiple
                        remote
                        clearable
                        placeholder="Chọn chức vụ"
                      >
                        <el-option
                          v-for="positions in positionList"
                          :key="positions.value"
                          :label="positions.label"
                          :value="positions.value"
                        />
                      </el-select>
                    </th>
                    <td style="text-align: center; max-width:100px" class="vertical-middle">
                      <el-button type="danger" size="mini" @click="handleCloseTag(golfer)">Xóa</el-button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer" style="display: flex; align-items: center; justify-content: center;">
      <el-button @click="handleClose">Hủy</el-button>
      <el-button type="primary" :loading="loadingSubmit" @click="onSubmitForm('notifyForm')">{{
        dialog.buttonName
      }}</el-button>
    </span>
  </el-dialog>
</template>

<script>

import { Message } from 'element-ui'
import * as XLSX from 'xlsx'
import GolferResource from '@/api/golfer/golfer'
import { formatNumber } from '@/utils/convert'
import AdminClubResource from '@/api/club/admin-club'
import PublicResource from '@/api/public'

const adminClubResource = new AdminClubResource()
const golferResource = new GolferResource()
const publicResource = new PublicResource()

export default {
  name: 'DialogAddUser',
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
      listGolfers: [],
      dialog: { titleName: 'Thêm mới user', buttonName: 'add' },
      loadingSubmit: false,
      dialogLoading: false,
      formRequest: {
        position: []
      },
      request: {},
      query: {
        limit: 10,
        page: 1
      },
      loadingSearchUser: false,
      users: [],
      golferModel: {},
      loadingExportExcel: false,
      positionList: [
        { value: 1, label: 'Chủ tịch' },
        { value: 2, label: 'Phó chủ tịch' },
        { value: 3, label: 'Đội trưởng' },
        { value: 4, label: 'Tổng thư ký' },
        { value: 5, label: 'Quản trị viên' }
      ]
    }
  },
  computed: {},
  watch: {
    async objectData(value) {
      this.formRequest = value
    },
    async golferModel(value) {
      if (value && Object.keys(this.golferModel).length !== 0) {
        const checkExist = this.listGolfers.filter(item => item.user_id === value.value)
        if (checkExist.length > 0) {
          this.$message.warning('vID đã được chọn.')
          return
        }
        const golfer = {
          id: value.value,
          fullname: value.label,
          position: []
        }
        this.listGolfers.push(golfer)
      }
    }
  },
  created() {
  },
  methods: {
    onSearchGolfer(keyword) {
      const params = { keyword: keyword }
      this.loadingSearchUser = true
      golferResource.searchGolfer(params).then(res => {
        const result = res.data
        if (res.error_code === 0) {
          if (result.length > 0) {
            this.users = result.map(value => {
              return { value: value.id, label: value.fullname }
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
      this.$refs[formName].validate((validate) => {
        if (validate) {
          this.handleSubmit()
        }
      })
    },
    async handleSubmit() {
      console.log('...........listGolfers.................', this.listGolfers)

      this.loadingSubmit = true
      await adminClubResource.add_user_club({ listGolfers: this.listGolfers }, this.$route.params.id).then(res => {
        if (res.error_code === 0) {
          Message.success(res.data)
          this.resetFormRequest()
          this.handleClose()
        } else {
          Message.error(res.error_msg)
        }
        console.log('res', res)
      }).catch(err => {
        console.log('err', err)
        Message.error(err)
      })
      this.loadingSubmit = false
    },
    handleClose() {
      this.$emit('onCloseDialog', { dialog: false, reload: false })
      this.resetFormRequest()
    },
    async downloadTemplate() {
      const baseUrl = process.env.VUE_APP_BASE_API
      this.loadingExportExcel = true
      const headers = ['vID', 'birthday', 'sexy', 'phone', 'address', 'passport', 'size_shirt', 'size_pant', 'size_hat', 'size_glove', 'size_shoe']
      const data = [
        ['101253', '08/01/1997', 'Nam', '0989531411', 'Hà Nội', '00100001111', 12, 12, 12, 12, 12],
        ['59870', '08/01/2002', 'Nam', '019199191', 'Hà Nội', '9999999999', 12, 12, 12, 12, 12]
      ]
      const url = `${baseUrl}/public/file-excel-example?headers=${JSON.stringify(headers)}&data=${JSON.stringify(data)}`
      console.log('url', url)
      console.log('headers..........', headers)
      publicResource.downloadFileExcelExample({ headers: JSON.stringify(headers), data: JSON.stringify(data) })
        .then((response) => {
          console.log('response..', response)
          var fileLink = document.createElement('a')

          fileLink.href = url
          document.body.appendChild(fileLink)

          fileLink.click()
          this.$message({
            message: 'Export thành công',
            type: 'success',
            duration: 5 * 1000
          })
        })
        .finally(() => {
          this.loadingExportExcel = false
        })

      this.loadingExportExcel = true
    },
    handleCloseTag(golfer) {
      this.listGolfers.splice(this.listGolfers.indexOf(golfer), 1)
      this.formRequest.users_id.splice(this.formRequest.users_id.indexOf(golfer.id), 1)
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
          console.log('XLSX.utils.sheet_to_json(worksheet', XLSX.utils.sheet_to_json(worksheet))
          const rowObject = XLSX.utils.sheet_to_json(worksheet)
          // rowObject.shift()
          if (rowObject.length > 0) {
            const arrUserId = rowObject.filter(item => item.vID).map(item => +item.vID
            )
            golferResource.getInGolfer({ users_id: arrUserId }).then(res => {
              const result = res.data
              // const map_data = rowObject.map((item) => {
              //   const matchingItem = result.find(d => +d.id === +item.vID)
              //   if (matchingItem) {
              //     item.fullname = matchingItem.fullname
              //   }
              // })
              const mergedArray = result.map(item1 => { const matchingItem = rowObject.find(item2 => item2.vID === String(item1.id)); return { ...item1, ...matchingItem } })
              console.log('result...', result)
              const existingUserIds = result.map(user => user.id)
              const nonExistingUserIds = arrUserId.filter(id => !existingUserIds.includes(id))
              if (nonExistingUserIds.length > 0) {
                Message({
                  message: `không tồn tại mã vID ${nonExistingUserIds}`,
                  type: 'warning',
                  duration: 8 * 1000
                })
                return
              } else {
                this.listGolfers = [...this.listGolfers, ...mergedArray].filter((obj, index, self) =>
                  index === self.findIndex((o) => (
                    o.id === obj.id
                  ))
                )
                console.log(' this.listGolfers.........', this.listGolfers)
                this.formRequest.users_id = this.listGolfers.map(item => item.id)
                this.$message.success('Import thành công , Các User trùng lặp sẽ xóa.')
              }
            })
          } else {
            this.$message.warning('Không có bản ghi.')
            return
          }
        }
        reader.readAsBinaryString(value.raw)
        array.pop()
      }
    },
    async onGetInGolfer(users_id) {
      console.log(users_id)
      const res = await golferResource.getInGolfer({ users_id: users_id })
      if (res.error_code === 0) return res.data
      else return []
    },
    async resetFormRequest() {
      await Promise.resolve(
        this.formRequest = {
          position: []
        },
        this.listGolfers = [],
        this.users = [],
        this.golferModel = {}
      )
      this.$refs['notifyForm'].clearValidate()
    },
    formatNumber
  }
}
</script>

<style>
.w-100 {
  width: 100%;
}
.mt-10{
  margin-top: 10px;
}
</style>
