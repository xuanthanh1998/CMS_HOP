<template>
  <el-dialog :title="dialog.titleName" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
    <el-form ref="ruleForm" v-loading="dialogLoading" :model="objDetail" class="demo-ruleForm">
      <el-row class="row">
        <el-col class="col-6">
          <el-form-item>
            <p style="margin-bottom: 8px"><b>Tay thuận:</b></p>
            <el-select
              v-model="formRequest.preferred_hand"
              placeholder="Tay thuận"
              style="width:300px"
            >
              <el-option
                v-for="level in arrayHand"
                :key="level.value"
                :label="level.label"
                :value="level.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-form-item>
              <p style="margin-bottom: 8px"><b>Size găng tay:</b></p>
              <el-select
                v-model="formRequest.size_span"
                placeholder="Size găng tay"
                style="width:300px"
              >
                <el-option
                  v-for="level in sizeHand"
                  :key="level.value"
                  :label="level.label"
                  :value="level.value"
                />
              </el-select>
            </el-form-item>
          </el-form-item>
          <el-form-item>
            <p style="margin-bottom: 8px"><b>Size áo:</b></p>
            <el-select
              v-model="formRequest.size_coat"
              placeholder="Size áo"
              style="width:300px"
            >
              <el-option
                v-for="level in sizeCoat"
                :key="level.value"
                :label="level.label"
                :value="level.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <p style="margin-bottom: 8px"><b>Size quần:</b></p>
            <el-select
              v-model="formRequest.size_pants"
              placeholder="Size quần"
              style="width:300px"
            >
              <el-option
                v-for="level in sizePant"
                :key="level.value"
                :label="level.label"
                :value="level.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <p style="margin-bottom: 8px"><b>Size quần:</b></p>
            <el-select
              v-model="formRequest.size_shoes"
              placeholder="Size giầy"
              style="width:300px"
            >
              <el-option
                v-for="level in sizeShoes"
                :key="level.value"
                :label="level.label"
                :value="level.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <p style="margin-bottom: 8px"><b>Size mũ:</b></p>
            <el-select
              v-model="formRequest.size_hat"
              placeholder="Size mũ"
              style="width:300px"
            >
              <el-option
                v-for="level in sizeCoat"
                :key="level.value"
                :label="level.label"
                :value="level.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <p style="margin-bottom: 8px"><b>Size tất:</b></p>
            <el-input
              v-model="formRequest.size_socks"
              placeholder="Size tất"
              style="width:300px"
            />
          </el-form-item>
        </el-col>
        <el-col class="col-6">
          <el-form-item>
            <p style="margin-bottom: 8px"><b>Gậy driver:</b></p>
            <el-select
              v-model="formRequest.driver"
              placeholder="Gậy driver"
              style="width:300px"
            >
              <el-option
                v-for="level in arrayEquip"
                :key="level.value"
                :label="level.label"
                :value="level.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <p style="margin-bottom: 8px"><b>Gậy gỗ:</b></p>
            <el-select
              v-model="formRequest.stick_wood"
              placeholder="Gậy gỗ"
              style="width:300px"
            >
              <el-option
                v-for="level in arrayEquip"
                :key="level.value"
                :label="level.label"
                :value="level.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <p style="margin-bottom: 8px"><b>Gậy kỹ thuật:</b></p>
            <el-select
              v-model="formRequest.sticks_technical"
              placeholder="Gậy kỹ thuật"
              style="width:300px"
            >
              <el-option
                v-for="level in arrayEquip"
                :key="level.value"
                :label="level.label"
                :value="level.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <p style="margin-bottom: 8px"><b>Gậy Hybrid:</b></p>
            <el-select
              v-model="formRequest.hybird"
              placeholder="Gậy Hybrid"
              style="width:300px"
            >
              <el-option
                v-for="level in arrayEquip"
                :key="level.value"
                :label="level.label"
                :value="level.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <p style="margin-bottom: 8px"><b>Bộ gậy sắt</b></p>
            <el-select
              v-model="formRequest.iron_set"
              placeholder="Bộ gậy sắt"
              style="width:300px"
            >
              <el-option
                v-for="level in arrayEquip"
                :key="level.value"
                :label="level.label"
                :value="level.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <p style="margin-bottom: 8px"><b>Plutter:</b></p>
            <el-select
              v-model="formRequest.putter"
              placeholder="Plutter"
              style="width:300px"
            >
              <el-option
                v-for="level in arrayEquip"
                :key="level.value"
                :label="level.label"
                :value="level.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <p style="margin-bottom: 8px"><b>Hãng bóng:</b></p>
            <el-select
              v-model="formRequest.ball_producer"
              placeholder="Hãng bóng"
              style="width:300px"
            >
              <el-option
                v-for="level in arrayBall"
                :key="level.value"
                :label="level.label"
                :value="level.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">Hủy</el-button>
      <el-button type="primary" :loading="loadingSubmit" @click="onSubmit">{{
        dialog.buttonName
      }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
// import moment from 'moment'
import { formatNumber } from '@/utils/convert'
import ListGolferResource from '@/api/membership/golfer'

const listGolferResources = new ListGolferResource()
const arrayHand = [
  { value: 1, label: 'Tay trái' },
  { value: 0, label: 'Tay phải' }
]

const arrayEquip = [
  { value: 1, label: 'Bridgestone' },
  { value: 2, label: 'Callaway' },
  { value: 3, label: 'Cleveland' },
  { value: 4, label: 'Cobra' },
  { value: 5, label: 'Dunlop' },
  { value: 6, label: 'Honma' },
  { value: 7, label: 'S-YARD' },
  { value: 8, label: 'Infiniti' },
  { value: 9, label: 'Ping' },
  { value: 10, label: 'Katana' },
  { value: 11, label: 'Ryoma' },
  { value: 12, label: 'Miura' },
  { value: 13, label: 'Mizuno' },
  { value: 14, label: 'Nakashima' },
  { value: 15, label: 'Nike' },
  { value: 16, label: 'Odyssey' },
  { value: 17, label: 'On-Off' },
  { value: 18, label: 'PRGR' },
  { value: 19, label: 'PXG' },
  { value: 20, label: 'Scootty Cameron' },
  { value: 21, label: 'Srixon' },
  { value: 22, label: 'Taylormade' },
  { value: 23, label: 'Titleist' },
  { value: 24, label: 'Tommy Armour' },
  { value: 25, label: 'Wilson' },
  { value: 26, label: 'XXIO' },
  { value: 27, label: 'Yonex' }
]
const arrayBall = [
  { value: 28, label: 'Titleist' },
  { value: 29, label: 'Taylormade' },
  { value: 30, label: 'Callaway' },
  { value: 31, label: 'Srixon' },
  { value: 32, label: 'Nike' },
  { value: 33, label: 'XXIO' },
  { value: 34, label: 'Volvik' }
]

const sizeHand = [
  { value: 18, label: '18' },
  { value: 19, label: '19' },
  { value: 20, label: '20' },
  { value: 21, label: '21' },
  { value: 22, label: '22' },
  { value: 23, label: '23' },
  { value: 24, label: '24' },
  { value: 25, label: '25' },
  { value: 26, label: '26' }
]
const sizePant = [
  { value: 27, label: '27' },
  { value: 28, label: '28' },
  { value: 29, label: '29' },
  { value: 30, label: '30' },
  { value: 31, label: '31' },
  { value: 32, label: '32' },
  { value: 33, label: '33' },
  { value: 34, label: '34' },
  { value: 35, label: '35' },
  { value: 36, label: '36' }
]
const sizeShoes = [
  { value: 34, label: '34' },
  { value: 35, label: '35' },
  { value: 36, label: '36' },
  { value: 37, label: '37' },
  { value: 38, label: '38' },
  { value: 39, label: '39' },
  { value: 40, label: '40' },
  { value: 41, label: '41' },
  { value: 42, label: '42' },
  { value: 43, label: '43' },
  { value: 44, label: '44' }
]
const sizeCoat = [
  { value: 'S', label: 'S' },
  { value: 'M', label: 'M' },
  { value: 'L', label: 'L' },
  { value: 'XL', label: 'XL' },
  { value: 'XXL', label: 'XXL' }
]
export default {
  name: 'DialogAddUserField',
  props: {
    objDetail: {
      type: Object,
      default: () => {
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
    }
  },

  data() {
    return {
      sizeShoes: [...sizeShoes],
      sizePant: [...sizePant],
      sizeCoat: [...sizeCoat],
      sizeHand: [...sizeHand],
      arrayHand: [...arrayHand],
      arrayEquip: [...arrayEquip],
      arrayBall: [...arrayBall],
      loadingSubmit: false,
      dialogLoading: false,
      loadingSearchFacility: false,
      loadingSearchUser: false,
      loadingSearchClub: false,
      is_global_show: false,
      isShowOrganizationChild: false,
      loadingSearchOption: false,
      organizationChild: [],
      formRequest: {},
      infoUserEquip: {},
      infoUserField: {},
      dialogVisible: false,
      dialog: { titleName: 'Cập nhật dữ liệu khách hàng', buttonName: 'Cập nhật' }
    }
  },
  watch: {
    async objDetail(value) {
      console.log('value1211111111111', value)
      if (value) {
        if (value.infoUserField) {
          this.formRequest = { ...this.formRequest, ...value.infoUserField }
        }
        if (value.infoUserEquip) {
          this.formRequest = { ...this.formRequest, ...value.infoUserEquip }
        }
      }
      console.log('ưqegqưeugqưuegqưuegq', this.formRequest)
    },
    showDialog(value) {
      this.dialogVisible = value
    }
  },

  methods: {
    onSubmit() {
      this.loadingSubmit = false
      listGolferResources.updateUserField(this.formRequest).then(response => {
        this.loadingSubmit = false
        console.log('adtasdasd...........', response)
        if (response.error_code === 0) {
          this.$message.success('Cập nhật thành công')
          this.handleClose()
        } else {
          this.$message.error('Cập nhật thất bại')
        }
      })
    },

    handleClose() {
      this.dialogVisible = false
      this.$emit('clickButton', false)
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
