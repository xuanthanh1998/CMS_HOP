<template>
  <div>
    <el-dialog :visible.sync="showDialog" width="40%" :before-close="handleClose" :close-on-click-modal="false" style="text-align: center;">
      <span slot="title" class="fw-500 text-upper">{{
        dialog.titleName
      }}</span>
      <el-form ref="ruleForm" v-loading="dialogLoading" :rules="rules" :model="objectData" class="demo-ruleForm">
        <el-row class="mb-10 d-flex">
          <template v-for="(item, i) of list_source">
            <el-button
              :key="i"
              style="
            border-radius: 10px;
            padding: 10px;
            font-weight: 550;"
              size="mini"
              :type="item.active ? 'primary' : ''"
              :disabled="item.disable"
              @click="handleCLickSource(i)"
            >{{ `${item.value == 2 && item.active ? '('+ item?.list_event?.length +') ' + item.label : item.label}` }}</el-button>
          </template>
        </el-row>
        <el-row>
          <el-col :sm="24" :md="24">
            <el-form-item label="">
              <el-form-item prop="name">
                <el-input
                  v-model="formRequest.content"
                  class="content"
                  :rows="10"
                  style="background-color: red;"
                  type="textarea"
                  placeholder="Bạn đang nghĩ gì ?"
                  @keyup.enter.native="onSubmitForm('ruleForm')"
                />
              </el-form-item>
            </el-form-item>
            <el-form-item label="ViD hiển thị App" prop="uid">
              <el-select v-model="formRequest.uid" placeholder="Chọn vid" filterable>
                <el-option
                  v-for="(item, index) in list_member"
                  :key="index"
                  :label="'vID' + item.user_id + '-' + item?.user?.fullname"
                  :value="item.user_id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="Màu nền">
              <el-form-item prop="name">
                <el-select v-model="formRequest.type_color" placeholder="Chọn màu">
                  <el-option
                    v-for="(color, index) in colorOptions"
                    :key="index"
                    :label="color.label"
                    :value="color.value"
                  >
                    <span :style="{ background: color.value, width: '20px', height: '20px', display: 'inline-block', marginRight: '5px' }" />
                    {{ color.label }}
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form-item>
            <el-form-item label="Màu text">
              <el-select v-model="formRequest.text_color" placeholder="Chọn màu">
                <el-option
                  v-for="(color, index) in colorTextOptions"
                  :key="index"
                  :label="color.label"
                  :value="color.value"
                >
                  <span :style="{ backgroundColor: color.value, width: '20px', height: '20px', display: 'inline-block', marginRight: '5px' }" />
                  {{ color.label }}
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="">
              <el-form-item prop="logo" style="text-align: center;">
                <div class="clearfix" />
                <el-upload
                  ref="uploadLogo"
                  style="text-align: left !important;"
                  class="upload-demo"
                  name="image"
                  action="https://api-v2.vcallid.com/api/utils/upload/data"
                  :on-error="onError"
                  :on-success="onSuccess"
                  :auto-upload="false"
                  :on-remove="onPickImageLogo"
                  :on-change="onPickImageLogo"
                  :before-upload="beforeUpload"
                  multiple
                  :file-list="keyImage"
                  :limit="20"
                  :on-exceed="(file, fileList) => handleExceed(file, fileList, 20)"
                  list-type="picture-card"
                >
                  <el-button style="border: none; border-color: transparent; background-color: transparent;"> Ảnh/Video</el-button>
                </el-upload>
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
    <el-dialog :visible.sync="showDialogEvent" width="40%" :before-close="handleCloseSelectEvent" style="text-align: center;">
      <el-row :loading="loadingSearchEventCLub">
        <!-- <el-checkbox
              v-model="checkAll"
              :indeterminate="isIndeterminate"
              @change="handleCheckAllChange"
            >
              Check all
            </el-checkbox> -->
        <el-checkbox-group
          v-model="list_source[1].list_event"
          :min="1"
          :max="1"
          style="display: flex;flex-wrap: wrap; align-items: start; justify-content: start;"
          class="w-100"
        >
          <template
            v-for="item in event_list"
          >
            <el-checkbox
              :key="item.id"
              :label="item.id"
              style="display: flex; align-items: center; width: 40%;"
            >
              <!-- :disabled="item.is_payment === 1 && item.is_check_service_unpaid != 0" -->
              <div style="display: flex; flex-direction: row; align-items: center;">
                <img style="width: 40px; height: 40px; object-fit: cover; margin-right: 10px;" :src="item.img_background">
                <span>
                  {{ item.name }}
                </span>
                <!-- <template v-if="item.provider == 'booking_new'">
                  <template v-for="(val, i) in item.list_hio">
                    <span :key="i" style="font-size: 12px;">
                      {{ `${val?.product_name} - BH${val.hio_id} ${+val.is_cancel === 1 ? ' (Đã hủy)' : +val.is_customer_pay === 1 ? '(Đã thanh toán)' : '(Chưa thanh toán)'}` }}
                    </span>
                  </template>
                </template> -->
              </div>
            </el-checkbox>
          </template>
        </el-checkbox-group>

        <el-button
          type="primary"
          @click="handleCloseSelectEvent"
        >
          Xác nhận
        </el-button>
        <el-button @click="handleCloseSelectEvent">Huỷ bỏ</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { validateText } from '@/utils/validate'

import { v4 as uuidv4 } from 'uuid'
import { formatNumber } from '@/utils/convert'
import { getAcountInfo } from '@/utils/auth'
// import AdminClubResource from '@/api/club/admin-club'
import EventResource from '@/api/event'
import AdminClubResource from '@/api/club/admin-club'

const adminClubResource = new AdminClubResource()
const eventResource = new EventResource()
// const adminClubResource = new AdminClubResource()

export default {
  name: 'DialogPost',
  props: {
    objectData: {
      type: Object,
      default() {
        return {}
      }
    },
    organizations: {
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
      rules: {
        uid: [{ validator: (rule, _, callback) => validateText(rule, this.formRequest.uid, callback, 'ViD hiển thị App'), trigger: 'change' }]
      },
      loadingSubmit: false,
      dialogLoading: false,
      formRequest: {
        logo_url_path: [],
        type_color: '#ffffff',
        text_color: 'black'
      },
      dialog: { titleName: 'Tạo bài viết', buttonName: 'Thêm mới' },
      keyImage: [],
      isUploadImage: false,
      list_source: [
        { value: 1, label: 'Câu lạc bộ', active: true, disable: false },
        { value: 2, label: 'Sự kiện', active: false, disable: false, list_event: [] }
      ],
      showDialogEvent: false,
      event_list: [],
      loadingSearchEventCLub: false,
      btnLoading: false,
      thumbnailUrl: null,
      colorOptions: [
        { label: 'TRANG', value: '#ffffff', id: 1 },
        { label: 'CAM', value: '#ff7f50', id: 2 },
        { label: 'XANH', value: '#00ff00', id: 3 },
        { label: 'CAM NHAT', value: '#ffa07a', id: 4 },
        { label: 'XANH DAM', value: '#00008b', id: 5 }
      ],
      colorTextOptions: [
        { label: 'DEN', value: 'black', id: 1 },
        { label: 'TRANG', value: '#ffffff', id: 2 },
        { label: 'CAM', value: '#ff7f50', id: 3 },
        { label: 'XANH', value: '#00ff00', id: 4 },
        { label: 'CAM NHAT', value: '#ffa07a', id: 5 },
        { label: 'XANH DAM', value: '#00008b', id: 6 }
      ],
      list_member: [],
      fileLength: 0
    }
  },
  watch: {
    objectData(value) {
      if (!this.isAdd) {
        console.log('val..............', value)
        this.formRequest = { ...value }
        if (value.logo_url_path) {
          this.isUploadImage = false
          this.keyImage.push(value.logo_url_path.map(item => ({ url: item })))
        }
      }
    },
    isAdd(value) {
      if (value) {
        this.dialog = Object.assign({}, { titleName: 'Tạo bài viết', buttonName: 'Thêm mới' })
      } else {
        this.dialog = Object.assign({}, { titleName: 'Sửa bài viết', buttonName: 'Cập nhật' })
      }
    }
  },
  created() {
    this.onGetListMember()
  },
  methods: {
    async onGetListMember() {
      adminClubResource.list_member({ limit: 10000, page: 1 }, this.$route.params.id).then(res => {
        const { error_code, data, error_msg } = res
        if (error_code === 0) {
          this.list_member = data.data
        } else {
          this.$message.error(error_msg)
        }
      }).catch(_ => {
      }).finally(() => {
      })
    },
    async handleCLickSource(index) {
      if (+index !== 0) {
        this.list_source[index].active = !this.list_source[index].active
        console.log('index...', index)
        if (this.list_source?.[index] && this.list_source?.[index].active) {
          this.list_source[index].active = true
          this.showDialogEvent = true
          this.loadingSearchEventCLub = true

          const { error_code, data } = await eventResource.listEventClub({ club_id: this.$route.params.id })
          if (error_code === 0) {
            this.event_list = data.data
          }
          this.loadingSearchEventCLub = false
        } else {
          this.list_source[index].active = false
          this.list_source[index].list_event = []
        }
      }
    },
    handleSelect(val) {

    },
    onSubmitForm(formName) {
      this.$refs[formName].validate(async(validate) => {
        if (validate) {
          if (this.isAdd) {
            this.handleSubmitAdd()
          } else {
            this.handleSubmitUpdate()
          }
        }
      })
    },

    async handleSubmitAdd() {
      // this.loadingSubmit = true
      const query = {
        uid: this.formRequest.uid,
        type_post: 2,
        relation_type: 2,
        type_relation: 2
      }
      if (this.isUploadImage) {
        this.$refs.uploadLogo.submit()
      } else {
        this.formRequest.admin_cms_id = getAcountInfo()?.id
        let arr_img_path = []
        for (let i = 0; i < this.formRequest.logo_url_path.length; i++) {
          const file = this.formRequest.logo_url_path[i]
          if (/\.mp4$/.test(file)) {
            arr_img_path = [...arr_img_path, { type_upload: 2, path: file }]
          } else {
            arr_img_path = [...arr_img_path, { type_upload: 1, path: file }]
          }
        }

        let flight_id = null
        if (this.list_source[1].active) {
          if (this.list_source[1].list_event.length > 0) {
            flight_id = this.list_source[1].list_event[0]
          }
        }
        console.log('formRequest.........', this.formRequest)
        const type_color = this.colorOptions.find(item => item.value === this.formRequest.type_color).id
        const text_color = this.colorTextOptions.find(item => item.value === this.formRequest.text_color).id
        const body = {
          ...this.formRequest,
          type_color: type_color,
          text_color: text_color,
          id_album_share: null,
          list_club_id: [this.$route.params.id],
          arr_img_path: arr_img_path,
          magazine_id: null,
          flight_id: flight_id,
          // relation_type: null,
          // type_relation: null,
          ...query
        }
        console.log('body.........', body)
        if (this.list_source[1].active && this.list_source[1].list_event.length === 0) {
          this.$message.error('Bạn đang chọn gắn sự kiện nhưng chưa chọn event nào !!!')
          this.loadingSubmit = false
          return
        }
        await eventResource.createPost(query, body).then(res => {
          if (res.error_code === 0) {
            this.$message.success(res.data)
            this.handleClose()
          } else {
            this.$message.error(res.error_msg)
          }
        }).finally(() => {
          this.loadingSubmit = false
        })
      }
    },
    async handleSubmitUpdate() {
      // this.loadingSubmit = true
      if (this.isUploadImage) {
        this.$refs.uploadLogo.submit()
      } else {
        this.formRequest.admin_cms_id = getAcountInfo()?.id
        console.log('formRequest..........', this.formRequest.id)
        // await adminClubResource.update(this.formRequest, this.formRequest.id).then(res => {
        //   if (res.error_code === 0) {
        //     this.$message.success(res.data)
        //     this.handleClose()
        //   } else {
        //     this.$message.error(res.error_msg)
        //   }
        // }).finally(() => {
        //   this.loadingSubmit = false
        // })
        this.loadingSubmit = false
      }
    },
    async resetformRequest() {
      await Promise.resolve(
        (this.formRequest = {
          logo_url_path: [],
          type_color: '#ffffff',
          text_color: 'black'
        }),
        this.keyImage = [],
        this.isUploadImage = false,
        this.list_source = [
          { value: 1, label: 'Câu lạc bộ', active: true, disable: false },
          { value: 2, label: 'Sự kiện', active: false, disable: false, list_event: [] }
        ]
      )
      this.$refs['ruleForm'].clearValidate()
    },

    async onPickImageLogo(value, array) {
      if (value?.raw?.type !== 'image/png' && value?.raw?.type !== 'image/jpg' && value?.raw?.type !== 'image/jpeg' && value?.raw?.type !== 'video/mp4' && value.status !== 'success') {
        this.$message.warning(`Yêu cầu định dạng ảnh là JPG, JPEG, PNG, video MP4`)
        array.pop()
        this.keyImage = array
      } else if (value.size > 100000000) {
        this.$message.warning(`Kích thước ảnh tối đa là 100 mb, bạn đang chọn ảnh ${value.name} với kích thước ${formatNumber(value.size)} kb`)
        array.pop()
        this.keyImage = array
      } else {
        if (value.status !== 'success') {
          if (array[0] && array[0]?.raw) {
            this.keyImage = array
            this.isUploadImage = true
            this.$refs['ruleForm'].clearValidate('logo')
          } else {
            this.formRequest.logo_url_path = []
          }
        }
      }
      this.fileLength = array.length
    },
    handleExceed(files, fileList, length) {
      this.$message.warning(`Tối đa là ${length} hình ảnh, bạn đang chọn ${files.length + fileList.length} hình ảnh`)
    },

    beforeUpload(file) {
      if (file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.onloadend = () => {
            const newFile = new File([file], `${uuidv4().toString()}.png`, { type: file?.type ?? 'image/png' })
            resolve(newFile)
          }
          reader.readAsArrayBuffer(file)
        })
      } else {
        return false
      }
    },

    onSuccess(res) {
      console.log('res................', res)
      this.isUploadImage = false
      this.formRequest.logo_url_path = [...this.formRequest.logo_url_path, res.name]
      if (+this.formRequest.logo_url_path.length === +this.fileLength) {
        this.onSubmitForm('ruleForm')
      }
    },
    onError(err) {
      console.log('err................', err)
      this.$message.error('Upload file thất bại')
    },

    handleClose() {
      this.$emit('onCloseDialog', { dialog: false, reload: false })
      this.resetformRequest()
    },
    handleCloseSelectEvent() {
      this.showDialogEvent = false
    },
    formatNumber
  }
}
</script>

<style>
  .w-100 {
    width: 100%;
  }
  .mr-10 {
    margin-right: 10px;
  }
  .fw-500 {
    font-weight: 500;
  }
  .text-upper {
    text-transform: uppercase;
  }

  .content .el-textarea__inner {
    background: v-bind("formRequest.type_color") !important;
    color: v-bind("formRequest.text_color") !important;
  }
  /* } */
</style>

