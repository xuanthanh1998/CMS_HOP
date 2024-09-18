<template>
  <!-- <el-row style="margin:20px; font-family:Sans-serif"> -->
  <div class="container">
    <div class="mt-30">
      <div style="margin-bottom: 30px;">
        <h5>Danh sách cấm đăng bài <span
          style="padding: 0 10px; background: #263BFE; border-radius: 50%; margin-left: 5px;font-weight:600; color:#fff; "
        >{{ list_post.length }}</span></h5>
        <p style="font-size: 14px;">Toàn bộ những người trong Black list sẽ không thể đăng bài lên trang tin câu lạc bộ.</p>
      </div>
      <div v-for="(item,i) in list_post" :key="i" v-loading="loadingSearchTeeTime" style="margin-bottom: 50px; margin: 0;">
        <div
          style="display: flex;
    align-items: center;
    justify-content: space-between; "
        >
          <div
            style="display: flex; align-items: center;
    justify-content: space-between; "
          >
            <el-avatar :size="50" :src="item.avatar" style="margin-right: 30px;" />
            <p style="margin: 0; font-weight: 600;">{{ item.name }}</p>
          </div>
          <el-button style="border-color: #263BFE;" @click="handleUnBlock(item)"><span style="color: #263BFE;">Bỏ chặn</span></el-button>
        </div>
        <div class="line">
          <hr>
        </div>
      </div>
      <infinite-loading
        ref="infiniteLoading"
        :identifier="infiniteId"
        @infinite="infiniteHandler"
      >
        <div slot="no-more">Hết bài đăng</div>
        <div slot="no-results">Hết bài đăng</div>
      </infinite-loading>
    </div>
  </div>

  <!-- </el-row> -->
</template>

<script>
import iconPicture from '@/assets/svg/picture.svg'
// import DialogPost from '@/views/club/detail/components/DialogPost'
// import PostItem from '@/views/club/detail/components/PostItem'

export default {
  name: 'BlackList',
  components: {
    // DialogPost
    // PostItem
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
      icons: {
        iconPicture
      },
      list_post: [
        {
          name: 'Nguyễn Đức Dũng',
          time: '2023-11-06 11:27:07',
          text: 'Booking mãi đỉnh !!! <br /> Booking mãi đỉnh !!! <br /> Booking mãi đỉnh !!!',
          avatar: 'https://cdn.vcallid.com/d513b532-d70e-46e4-be8b-95ad25a55cd5.png',
          image: 'https://api-v2.vcallid.com/data/28-10-2023/1698475800240.jpeg',
          msg: '<p><b>Nguyen Kelly 12345, Duy Hyunkem 12334 & 11 người khác</b> đã báo bài viết vi phạm hoặc nội dung không phù hợp.</p>'
        },
        {
          name: 'Trương Thúy Giang',
          time: '2023-11-06 11:27:07',
          text: 'Booking mãi đỉnh !!!',
          avatar: 'https://cdn.vcallid.com/d513b532-d70e-46e4-be8b-95ad25a55cd5.png',
          image: 'https://api-v2.vcallid.com/data/23-10-2023/1698032041512.jpeg',
          msg: '<p><b>Nguyen Kelly 12345, Duy Hyunkem 12334 & 11 người khác</b> đã báo bài viết vi phạm hoặc nội dung không phù hợp.</p>'
        },
        {
          name: 'Nguyễn Đức Dũng',
          time: '2023-11-06 11:27:07',
          text: 'Booking mãi đỉnh !!! <br /> Booking mãi đỉnh !!! <br /> Booking mãi đỉnh !!!',
          avatar: 'https://cdn.vcallid.com/d513b532-d70e-46e4-be8b-95ad25a55cd5.png',
          image: 'https://api-v2.vcallid.com/data/24-10-2023/1698133997415.jpeg',
          msg: '<p><b>Nguyen Kelly 12345, Duy Hyunkem 12334 & 11 người khác</b> đã báo bài viết vi phạm hoặc nội dung không phù hợp.</p>'
        },
        {
          name: 'Lê Phạm',
          time: '2023-11-06 11:27:07',
          text: 'Booking mãi đỉnh !!!',
          avatar: 'https://cdn.vcallid.com/d513b532-d70e-46e4-be8b-95ad25a55cd5.png',
          image: 'https://api-v2.vcallid.com/data/28-10-2023/1698475800240.jpeg',
          msg: '<p><b>Nguyen Kelly 12345, Duy Hyunkem 12334 & 11 người khác</b> đã báo bài viết vi phạm hoặc nội dung không phù hợp.</p>'
        },
        {
          name: 'Trương Thúy Giang',
          time: '2023-11-06 11:27:07',
          text: 'Booking mãi đỉnh !!!',
          avatar: 'https://cdn.vcallid.com/d513b532-d70e-46e4-be8b-95ad25a55cd5.png',
          image: 'https://api-v2.vcallid.com/data/23-10-2023/1698032041512.jpeg',
          msg: '<p><b>Nguyen Kelly 12345, Duy Hyunkem 12334 & 11 người khác</b> đã báo bài viết vi phạm hoặc nội dung không phù hợp.</p>'
        },
        {
          name: 'Nguyễn Đức Dũng',
          time: '2023-11-06 11:27:07',
          text: 'Booking mãi đỉnh !!! <br /> Booking mãi đỉnh !!! <br /> Booking mãi đỉnh !!!',
          avatar: 'https://cdn.vcallid.com/d513b532-d70e-46e4-be8b-95ad25a55cd5.png',
          image: 'https://api-v2.vcallid.com/data/24-10-2023/1698133997415.jpeg',
          msg: '<p><b>Nguyen Kelly 12345, Duy Hyunkem 12334 & 11 người khác</b> đã báo bài viết vi phạm hoặc nội dung không phù hợp.</p>'
        },
        {
          name: 'Trương Thúy Giang',
          time: '2023-11-06 11:27:07',
          text: 'Booking mãi đỉnh !!!',
          avatar: 'https://cdn.vcallid.com/d513b532-d70e-46e4-be8b-95ad25a55cd5.png',
          image: 'https://api-v2.vcallid.com/data/23-10-2023/1698032041512.jpeg',
          msg: '<p><b>Nguyen Kelly 12345, Duy Hyunkem 12334 & 11 người khác</b> đã báo bài viết vi phạm hoặc nội dung không phù hợp.</p>'
        }
      ],
      loadingSearchTeeTime: false,
      infiniteId: +new Date(),
      showDialogDialogPost: false,
      objectDataDialogPost: {}
    }
  },
  created() {
    this.infiniteId += 1
  },
  methods: {
    async infiniteHandler($state) {
      // if (!this.teeTimeLoading) {
      // this.queryParams.page += 1
      // this.teeTimeLoading = true
      // const { error_code, data } = await ListTeeTime.getListTeeTime(
      //   this.queryParams,
      //   this.queryBody
      // )
      // this.teeTimeLoading = false

      // if (error_code === 0) {
      this.list_post = [...this.list_post, {
        name: 'Le Hi',
        time: '2023-11-06 11:27:07',
        text: 'Booking mãi đỉnh !!!',
        avatar: 'https://cdn.vcallid.com/d513b532-d70e-46e4-be8b-95ad25a55cd5.png',
        image: 'https://api-v2.vcallid.com/data/28-10-2023/1698475800240.jpeg',
        msg: '<p><b>Nguyen Kelly 12345, Duy Hyunkem 12334 & 11 người khác</b> đã báo bài viết vi phạm hoặc nội dung không phù hợp.</p>'
      }]
      // }
      // if (data.length >= this.queryParams.number) {
      $state.loaded()
      // } else {
      //   $state.complete()
      // }
      // }
    },
    async onGetListTeeTime() {
      // this.loadingSearchTeeTime = true
      // this.infiniteId += 1

      // const { error_code, data } = await ListTeeTime.getListTeeTime(
      //   this.queryParams,
      //   this.queryBody
      // )
      // if (error_code === 0) this.listTeeTime = data
      // this.loadingSearchTeeTime = false
    },
    handleUnBlock(item) {
      this.$confirm(`Bạn có chắc chắn muốn thực hiện thao tác này`).then(async(_) => {
        // partnerServiceResource.lock_voucher(body).then(res => {
        //   if (res.error_code === 0) {
        //     this.onGetList()
        //     this.$message.success(res.data)
        //   } else {
        //     this.$message.error(res.error_msg)
        //   }
        // })
      })
    }
  }
}
</script>

  <style lang="scss" scoped>
  .container {
    background-color: rgb(239 236 233 / 30%);
    max-width: 800px;
    // min-height: 100vh;
    // height: 100%;
  }
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
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.15);
    padding: 10px;
    border-radius: 10px;
  }
  .el-button1 {
    box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.15);
    // width: 50%;
    border-radius: 50px;
    display: flex;
    align-items: center;
    padding: 10px;
    &:hover {
      background-color: beige;
    }
  }

  .el-button1 .avatar {
    margin-right: 10px;
    width: 35px;
    height: 35px;
    border-radius: 50%;
  }

  .el-button1 .icon {
    margin-left: 10px;
    width: 35px;
    height: 35px;
    border-radius: 50%;
  }

  .el-button1 textarea {
    flex: 1;
    border: none;
    resize: none;
  }

  .el-button1 textarea::placeholder {
    color: #999;
  }
  .line hr {
    border-top: 1px solid #C3C3C3;
  }

  .line {
    margin: 10px 2px;
    width: 100%;
  }
  </style>

