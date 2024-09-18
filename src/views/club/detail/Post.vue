<template>
  <!-- <el-row style="margin:20px; font-family:Sans-serif"> -->
  <div class="container">
    <h4 style="text-align: center;">Quản lý bảng tin</h4>
    <div class="mt-30">
      <el-row style="display: flex;">
        <el-col style="flex: 20%;" />
        <el-col style="flex: 60%;" class="box">
          <div style="display: flex; justify-content: space-around; margin-bottom: 20px; align-items: center;">
            <h4 style=" margin: 0;">Bài viết</h4>
            <el-button
              type="primary"
              style="border:none;background: #3C58A0;
    border-radius: 10px;
    padding: 10px 25px;
    font-weight: 550;"
              @click="handleAction"
            >Duyệt</el-button>
          </div>
          <el-row style="display: flex; text-align: center; font-size: 15px; font-weight: 500;">
            <el-col style="border-right: 1px solid #666;" :sm="6">
              <div>
                <span style="display: block;">Bài viết</span>
                <span
                  style="color: #26BBFE; font-weight: 550 !important"
                >{{ statistic_data.total_post }}</span>
              </div>
            </el-col>
            <el-col style="border-right: 1px solid #666;" :sm="6">
              <div>
                <span style="display: block;">Chờ duyệt</span>
                <span style="color: #26BBFE; font-weight: 550 !important">{{ statistic_data.total_post_wait_confirm }}</span>
              </div>
            </el-col>
            <el-col style="border-right: 1px solid #666;" :sm="6">
              <div>
                <span style="display: block;">Black list</span>
                <span style="color: #26BBFE; font-weight: 550 !important">{{ statistic_data.total_user_black_list }}</span>
              </div>
            </el-col>
            <el-col :sm="6">
              <div>
                <span style="display: block;">Xóa</span>
                <span style="color: #26BBFE; font-weight: 550 !important">0</span>
              </div>
            </el-col>
          </el-row>
        </el-col>
        <el-col style="flex: 20%;" />
      </el-row>
      <br>
      <LineBorder />
      <el-row style="padding: 0 15px;">
        <h4>Bảng tin</h4>
        <!-- <el-input style="border-radius: 100px; height: 50px;" /> -->
        <div class="el-button1" style="cursor: pointer;" @click="handleAdd">
          <el-avatar :size="35" class="avatar" src="https://cdn.vcallid.com/d513b532-d70e-46e4-be8b-95ad25a55cd5.png" />
          <p
            style="flex: 1; margin: 0; text-align: left; color: #999;"
          >Viết bài đăng...</p>
          <img class="icon" :src="icons.iconPicture" alt="Icon">
        </div>
      </el-row>
      <LineBorder />
      <div v-for="(item,i) in list_post" :key="i" v-loading="loadingSearchPost" class="mt-30" style="margin-bottom: 50px;">
        <PostItem
          :post="item"
          :is-action-button="true"
        />
      </div>
      <div ref="end-location" />
      <infinite-loading
        ref="infiniteLoading"
        :identifier="infiniteId"
        @infinite="infiniteHandler"
      >
        <div slot="no-more">{{ 'Hết bài đăng' }}</div>
        <div slot="no-results">{{ 'Hết bài đăng' }}</div>
      </infinite-loading>
    </div>
    <dialog-post
      :show-dialog="showDialogDialogPost"
      :object-data="objectDataDialogPost"
      :is-add="isAdd"
      @onCloseDialog="handleClose"
    />
  </div>

  <!-- </el-row> -->
</template>

<script>
import LineBorder from '@/views/component/LineBorder.vue'
// import iconAction from '@/assets/svg/action.svg'
import iconPicture from '@/assets/svg/picture.svg'
import DialogPost from '@/views/club/detail/components/DialogPost'
import PostItem from '@/views/club/detail/components/PostItem'
import EventResource from '@/api/event'

const eventResource = new EventResource()
export default {
  name: 'Post',
  components: {
    LineBorder,
    DialogPost,
    PostItem
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
      list_post: [],
      loadingSearchPost: false,
      infiniteId: +new Date(),
      showDialogDialogPost: false,
      objectDataDialogPost: {},
      isAdd: true,
      queryParams: {
        type: 1,
        page: 1,
        number: 5
      },
      position: 0,
      loading: false,
      statistic_data: {}
    }
  },
  created() {
    this.onStatisticPost()
    this.onGetListPost()
  },
  methods: {
    onStatisticPost() {
      this.loading = true
      this.queryParams.club_id = this.$route.params.id
      this.queryParams.is_confirm = 1
      eventResource.statisticPost(this.queryParams, {}).then(res => {
        const { error_code, data, error_msg } = res
        if (error_code === 0) {
          this.statistic_data = data
        } else {
          this.$message.error(error_msg)
        }
      }).catch(_ => {
      }).finally(() => {
        this.loading = false
      })
      // const { error_code, data, error_msg } = await eventResource.listPost(
      //   this.queryParams
      // )
      // if (error_code === 0) this.list_post = data
      // else this.$message.error(error_msg)
      // this.loadingSearchPost = false
    },
    async infiniteHandler($state) {
      // console.log('......eeeeeeeeeeeee......')
      if (!this.loading) {
        this.queryParams.page += 1
        this.loadingSearchPost = true
        const { error_code, data } = await eventResource.listPost(
          this.queryParams
        )
        this.loadingSearchPost = false

        if (+error_code === 0) {
          const newPosition =
            this.$refs['end-location'].getBoundingClientRect().top +
            window.pageYOffset

          if (this.position) window.scrollTo(0, this.position)

          this.position = newPosition

          this.list_post = [...this.list_post, ...data]
          console.log('list_post......', this.list_post)
        }
        if (data.length >= this.queryParams.number) {
          $state.loaded()
        } else {
          $state.complete()
        }
      }
    },
    onGetListPost() {
      this.loading = true
      this.queryParams.club_id = this.$route.params.id
      this.queryParams.is_confirm = 1
      eventResource.listPost(this.queryParams).then(res => {
        const { error_code, data, error_msg } = res
        if (error_code === 0) {
          this.list_post = data
          this.loading = false
          this.infiniteId += 1
        } else {
          this.$message.error(error_msg)
        }
      }).catch(_ => {
      }).finally(() => {
        this.loading = false
      })
      // const { error_code, data, error_msg } = await eventResource.listPost(
      //   this.queryParams
      // )
      // if (error_code === 0) this.list_post = data
      // else this.$message.error(error_msg)
      // this.loadingSearchPost = false
    },
    handleAdd() {
      this.showDialogDialogPost = true
      this.objectDataDialogPost = {}
      this.isAdd = true
    },
    async handleClose() {
      this.showDialogDialogPost = false
      this.list_post = []
      this.infiniteId = +new Date()
      this.queryParams = {
        type: 1,
        page: 1,
        number: 5
      }
      this.onGetListPost()
    },
    handleAction() {
      this.$router.push(`/club/detail/${this.$route.params.id}/post`)
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  background-color: rgb(239 236 233 / 30%);
  max-width: 800px;
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
</style>

