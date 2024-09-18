<template>
  <el-dialog
    :title="`Chi tiết Golfer: ${objData.fullname} (vID${objData.id})`"
    :visible.sync="dialogVisible"
    :before-close="handleClose"
    align="center"
    width="80%"
  >
    <div style="padding: 20px">
      <el-row class="row">
        <div class="col-7" style="display: block; padding:0">
          <h4>Thông tin cá nhân</h4>
          <div>
            <div class="row">
              <div class="col-4">
                <el-row class="padding-style">
                  <el-col :span="10"><b>Tên hội viên:</b></el-col>
                  <el-col :span="14">
                    <span>{{ tableData.fullname }}</span>
                  </el-col>
                </el-row>
                <el-row class="padding-style">
                  <el-col :span="10" :offset="0"><b>Ngày sinh:</b></el-col>
                  <el-col :span="14" :offset="0">
                    <span>{{ convertDate(tableData.birthday) }}</span>
                  </el-col>
                </el-row>
                <el-row class="padding-style">
                  <el-col :span="10" :offset="0"><b>Giới tính:</b></el-col>
                  <el-col :span="14" :offset="0">
                    <span v-if="tableData.gender === 0">Nam </span>
                    <span v-if="tableData.gender === 1">Nữ </span>
                  </el-col>
                </el-row>
                <el-row class="padding-style">
                  <el-col :span="10" :offset="0"><b>Số điện thoại:</b></el-col>
                  <el-col :span="14" :offset="0">
                    <span>{{ tableData.phone }}</span>
                  </el-col>
                </el-row>
                <el-row class="padding-style">
                  <el-col :span="10"><b>CCCD/Passport:</b></el-col>
                  <el-col :span="14">
                    <template v-if="tableData.passport">
                      <span>{{ tableData.passport.number_passport }}</span>
                    </template>
                  </el-col>
                </el-row>
                <el-row class="padding-style">
                  <el-col :span="10" :offset="0"><b>Ngày Cấp:</b></el-col>
                  <el-col v-if="tableData.passport" :span="14" :offset="0">
                    <span>{{ convertDate(tableData.passport.date_of_issue) }}</span>
                  </el-col>
                </el-row>
                <el-row class="padding-style">
                  <el-col :span="10" :offset="0"><b>Ngày hết hạn:</b></el-col>
                  <el-col v-if="tableData.passport" :span="14" :offset="0">
                    <span>{{ convertDate(tableData.passport.date_of_expiry) }}</span>
                  </el-col>
                </el-row>
              </div>
              <div class="col-4">
                <el-row class="padding-style">
                  <el-col :span="10" :offset="0"><b>Tay thuận:</b></el-col>
                  <el-col v-if="tableData.extraFields" :span="14" :offset="0">
                    <span v-if=" tableData.extraFields.preferred_hand === 0"> Tay Phải </span>
                    <span v-else> Tay Trái </span>
                  </el-col>
                </el-row>
                <el-row class="padding-style">
                  <el-col :span="10" :offset="0"><b>Size găng tay:</b></el-col>
                  <el-col v-if="tableData.extraFields" :span="14" :offset="0">
                    <span>{{ tableData.extraFields.size_span }}</span>
                  </el-col>
                </el-row>
                <el-row class="padding-style">
                  <el-col :span="10" :offset="0"><b>Size áo:</b></el-col>
                  <el-col v-if="tableData.extraFields" :span="14" :offset="0">
                    <span>{{ tableData.extraFields.size_coat }}</span>
                  </el-col>
                </el-row>
                <el-row class="padding-style">
                  <el-col :span="10" :offset="0"><b>Size quần:</b></el-col>
                  <el-col v-if="tableData.extraFields" :span="14" :offset="0">
                    <span>{{ tableData.extraFields.size_pants }}</span>
                  </el-col>
                </el-row>
                <el-row class="padding-style">
                  <el-col :span="10" :offset="0"><b>Size giày:</b></el-col>
                  <el-col v-if="tableData.extraFields" :span="14" :offset="0">
                    <span>{{ tableData.extraFields.size_shoes }}</span>
                  </el-col>
                </el-row>
                <el-row class="padding-style">
                  <el-col :span="10" :offset="0"><b>Size mũ:</b></el-col>
                  <el-col v-if="tableData.extraFields" :span="14" :offset="0">
                    <span>{{ tableData.extraFields.size_hat }}</span>
                  </el-col>
                </el-row>
                <el-row class="padding-style">
                  <el-col :span="10" :offset="0"><b>Size tất:</b></el-col>
                  <el-col v-if="tableData.extraFields" :span="14" :offset="0">
                    <span>{{ tableData.extraFields.size_socks }}</span>
                  </el-col>
                </el-row>
              </div>
              <div class="col-4">
                <el-row class="padding-style">
                  <el-col :span="10" :offset="0"><b>Gậy Driver:</b></el-col>
                  <el-col v-if="tableData.equipment" :span="14" :offset="0">
                    <span v-if="tableData.equipment.stick_driver">{{ tableData.equipment.stick_driver.name }} </span>
                  </el-col>
                </el-row>
                <el-row class="padding-style">
                  <el-col :span="10" :offset="0"><b>Gậy gỗ:</b></el-col>
                  <el-col v-if="tableData.equipment" :span="14" :offset="0">
                    <span v-if="tableData.equipment.wood">{{ tableData.equipment.wood.name }}</span>
                  </el-col>
                </el-row>
                <el-row class="padding-style">
                  <el-col :span="10" :offset="0"><b>Gậy kỹ thuật:</b></el-col>
                  <el-col v-if="tableData.equipment" :span="14" :offset="0">
                    <span v-if="tableData.equipment.technical">{{ tableData.equipment.technical.name }}</span>
                  </el-col>
                </el-row>
                <el-row class="padding-style">
                  <el-col :span="10" :offset="0"><b>Gậy Hybrid:</b></el-col>
                  <el-col v-if="tableData.equipment" :span="14" :offset="0">
                    <span v-if="tableData.equipment.stick_hybird">{{ tableData.equipment.stick_hybird.name }}</span>
                  </el-col>
                </el-row>
                <el-row class="padding-style">
                  <el-col :span="10" :offset="0"><b>Bộ gậy sắt:</b></el-col>
                  <el-col v-if="tableData.equipment" :span="14" :offset="0">
                    <span v-if="tableData.equipment.stick_iron">{{ tableData.equipment.stick_iron.name }}</span>
                  </el-col>
                </el-row>
                <el-row class="padding-style">
                  <el-col :span="10" :offset="0"><b>Plutter:</b></el-col>
                  <el-col v-if="tableData.equipment" :span="14" :offset="0">
                    <span v-if="tableData.equipment.stick_putter">{{ tableData.equipment.stick_putter.name }}</span>
                  </el-col>
                </el-row>
                <el-row class="padding-style">
                  <el-col :span="10" :offset="0"><b>Hãng bóng:</b></el-col>
                  <el-col v-if="tableData.equipment" :span="14" :offset="0">
                    <span v-if="tableData.equipment.ball">{{ tableData.equipment.ball.name }}</span>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
        </div>
        <div class="col-5" style="display: block; padding:0">
          <h4>Link truyền thông</h4>
          <el-table
            v-loading="loadingTable"
            :data="tableDataMedia"
            border
            style="width: 100%"
            height="290"
          >
            <el-table-column
              label="STT"
              width="50"
              align="center"
              type="index"
              :index="handleIndexMethod"
            />
            <el-table-column
              prop="name"
              align="center"
              label="Ngày đăng bài "
            >
              <template slot-scope="{row}">
                {{ row.time_meet ? convertDate(row.time_meet) : '' }}
              </template>
            </el-table-column>
            <el-table-column
              label="Link truyền thông"
              align="center"
            >
              <template slot-scope="{row}">
                <el-link :href=" row.link ? row.link : '' " target="_blank" type="success">
                  {{ row.link ? row.link : '' }}
                </el-link>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-row>
      <el-row style="padding-top: 20px">
        <h4>Thông tin CSKH</h4>
        <el-table
          v-loading="loadingTable"
          :data="tableDataDirect"
          border
          style="width: 100%"
          height="290"
        >
          <el-table-column
            label="STT"
            width="50"
            align="center"
            type="index"
            :index="handleIndexMethod"
          />
          <el-table-column
            prop="name"
            align="center"
            label="Ngày gặp "
          >
            <template slot-scope="{row}">
              {{ row.time_meet ? convertDate(row.time_meet) : '' }}
            </template>
          </el-table-column>
          <el-table-column
            label="Nội dung CSKH"
            align="center"
          >
            <template slot-scope="{row}">
              {{ row.description ? row.description : '' }}
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </div>
  </el-dialog>
</template>

<script>
// import Vue from 'vue'
import ListGolferResource from '@/api/membership/golfer'
import { convertDate } from '@/utils/convert'
// Vue.use(Viewer)
const listGolferResources = new ListGolferResource()
export default {
  name: 'DialogDetailGolfer',
  components: {},
  props: {
    objDetail: {
      type: Object,
      default: () => {
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
      dialogVisible: false,
      tableData: {},
      objData: {},
      tableDataMedia: [],
      tableDataDirect: [],
      total: 0,
      listQuery: {
        limit: 10,
        page: 1
      }
    }
  },
  watch: {
    objDetail(value) {
      if (value) {
        this.listQuery = { id: value.id, limit: 10,
          page: 1 }
        this.objData = Object.assign({}, value)
        this.onGetDetailGolfer()
      }
    },
    showDialog(value) {
      this.dialogVisible = value
    }
  },
  methods: {
    handleIndexMethod(index) {
      return this.listQuery.page === 1 ? this.listQuery.page + index : this.listQuery.page * 10 + index
    },
    onGetDetailGolfer() {
      listGolferResources.detailGolfer(this.listBody, this.listQuery).then(response => {
        console.log('bfiaidhra', response)
        const res = response.data
        if (response.error_code === 0) {
          this.tableData = res.detail
          this.tableDataMedia = res.MediaCustomer
          this.tableDataDirect = res.DirectCustomer
          console.log('aaaaaaa', this.tableData)
        }
      })
    },
    handleClose(done) {
      this.dialogVisible = false
      this.$emit('clickButton', false)
      done()
    },
    convertDate
  }
}
</script>

<style scoped>
.w-100 {
  width: 80%;
}

.padding-style {
  padding-bottom: 15px;
}
</style>
