<template>
  <el-row style="margin:0 20px; font-family:Sans-serif">
    <div class="container">
      <h4 style="text-align: center;">Giới thiệu và điều lệ câu lạc bộ</h4>
      <div class="mt-30">
        <el-button class="cursor" @click="handleEditIntro">
          <i style="color: #409EFF" class="el-icon-edit" />
        </el-button>
        <span style="font-weight: 500 !important;">Giới thiệu câu lạc bộ</span>
        <div class="box">
          <span style="font-size: 13px;" v-html="text" />
        </div>
      </div>
      <div class="mt-30">
        <el-button class="cursor" @click="handleEditRule">
          <i style="color: #409EFF" class="el-icon-edit" />
        </el-button>
        <span style="font-weight: 500 !important;">Điều lệ câu lạc bộ</span>
        <div class="box">
          <span style="font-size: 13px;" v-html="rule" />
        </div>
      </div>
    </div>
    <el-dialog top="10vh" :visible.sync="showDialog" width="60%" :before-close="handleClose" style="text-align: center;">
      <el-row>
        <ckeditor v-model="textEdit" :config="editorConfig" />
      </el-row>
    </el-dialog>
    <!-- <el-row>
      <el-input
        v-model="formRequest.note"
        prop="note"
        :rows="20"
        type="textarea"
        placeholder="Điều lệ"
      />
    </el-row> -->
  </el-row>
</template>

<script>
// import Pagination from '@/components/Pagination/index'
// import { formatDate, formatNumber } from '@/utils/convert'
// import AdminClubResource from '@/api/club/admin-club'

// const adminClubResource = new AdminClubResource()

export default {
  name: 'RuleClub',
  components: {
    // Pagination
  },
  props: {
    objectData: {
      type: Object,
      default() {
        return {}
      }
    }
  },

  data() {
    return {
      formRequest: {},
      editorConfig: {
        toolbarGroups: [
          { name: 'document', groups: ['mode', 'document', 'doctools'] },
          { name: 'clipboard', groups: ['clipboard', 'undo'] },
          { name: 'editing', groups: ['find', 'selection', 'spellchecker', 'editing'] },
          { name: 'forms', groups: ['forms'] },
          { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
          { name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi', 'paragraph'] },
          { name: 'links', groups: ['links'] },
          // { name: 'insert', groups: ['insert'] }
          { name: 'styles', groups: ['styles'] },
          { name: 'colors', groups: ['colors'] },
          { name: 'tools', groups: ['tools'] },
          { name: 'others', groups: ['others'] },
          { name: 'about', groups: ['about'] }
        ],
        height: 500
      },
      showDialog: false,
      isIntro: true,
      textEdit: '',
      text: `Câu lạc bộ G20 là tổ chức quần chúng tập hợp các cá nhân yêu thích bộ môn Golf và chơi Golf trên cơ sở tự nguyện để rèn luyện sức khỏe, tham gia phát triển phong trào, nâng cao trình độ môn Golf.
      <br />• Tăng cường giao lưu giữa các thành viên trong G20 với nhau.
      <br />• Giao lưu kết nối, chia sẻ kinh nghiệm.`,
      rule: `ĐIỀU LỆ CLB GOLF G20
      <br />
      <br /><b>Điều 1. TÊN GỌI, NGÀY THÀNH LẬP</b>
      <br />•	Tên gọi: Câu lạc bộ Golf G20
      <br />•	Ngày thành lập: 09/06/2017 tại 198 Trung Kính, Cầu Giấy, Hà Nội.
      <br />
      <br /><b>Điều 2. TÔN CHỈ - MỤC ĐÍCH – NGUYÊN TẮC HOẠT ĐỘNG</b>
      <br />•	G20 là tổ chức quần chúng tập hợp các cá nhân yêu thích bộ môn Golf và chơi Golf trên cơ sở tự nguyện để rèn luyện sức khỏe, tham gia phát triển phong trào, nâng cao trình độ môn Golf. 
      <br />•	Tăng cường giao lưu giữa các thành viên trong G20 với nhau.
      <br />•	Giao lưu kết nối, chia sẻ kinh nghiệm. Nguyên tắc tổ chức hoạt động:
      <br />•	Tự nguyện, tự quản.
      <br />•	Dân chủ, bình đẳng, công khai, minh bạch.
      <br />•	Tự bảo đảm kinh phí hoạt động.
      <br />•	Không vì mục đích lợi nhuận.
      <br />•	Tuân thủ Hiến pháp, pháp luật.
      <br />
      <br /><b>Điều 3. CƠ CẤU TỔ CHỨC</b>
      <br />Xây dựng G20  với tối đa 40 thành viên, trong CLB tự bầu ra Ban Điều hành với các vai trò trách nhiệm như sau:
      <br />1.	Ban chấp hành (gồm 1 Chủ tịch; 1 phó Chủ tịch; 1 Đội trưởng; 1 Tổng Thư ký kiêm Thủ quỹ)
      <br />•	Xây dựng kế hoạch phát triển phòng trào định kỳ giao lưu hàng tuần. 
      <br />•	Xây dựng hệ thống tính Handicap chuẩn cho thành viên.
      <br />•	Cập nhật luật chơi Golf cho các Thành viên G20.
      <br />•	Tổ chức các giải đấu golf giao lưu với các câu lạc bộ golf khác.
      <br />•	Huy động các nguồn lực và tài trợ ở trong và ngoài nước theo quy định của pháp luật nhằm tạo nguồn kinh phí để đẩy mạnh các hoạt động của G20.
      <br />•	Bảo vệ và nâng cao uy tín của G20. Chăm lo và bảo đảm các quyền lợi của Thành viên. Tạo điều kiện thuận lợi để thành viên luyện tập nâng cao trình độ, kiến thức chuyên môn và hoàn thiện phong cách chơi Golf.
      <br />2.	Thành viên G20
      <br />•	Những Golfer được các thành viên chính thức của G20 giới thiệu, bảo lãnh và được Ban điều hành xem xét chấp nhận - nếu tán thành `
    }
  },
  methods: {
    handleEditIntro(value) {
      this.showDialog = true
      this.isIntro = true
      this.textEdit = this.text
      console.log('11111111111111111111', this.text)
    },
    handleEditRule(value) {
      this.showDialog = true
      this.isIntro = false
      this.textEdit = this.rule
      console.log('222222222222222222', this.rule)
    },
    handleClose() {
      this.showDialog = false
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  margin: 0;
  text-align: center;
  width: 100%;
  margin: 10px 0 20px 0;
  font-weight: 700px;
  text-transform: uppercase;
}
.mb-20 {
  margin-bottom: 20px;
}
.mt-30 {
  margin-top: 30px;
}
.cursor {
  cursor: pointer;
  border: none;
}
.box {
  border: 1px solid #333;
  padding: 10px;
  border-radius: 10px;
}
</style>

