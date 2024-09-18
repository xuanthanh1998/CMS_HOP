<template>
  <!-- <el-row style="margin:20px; font-family:Sans-serif"> -->
  <div class="container">
    <div class="mt-30">
      <div v-for="(item,i) in list_post" :key="i" v-loading="loadingSearchPost" class="mt-30" style="margin-bottom: 50px;">
        <PostItem
          :post="item"
          :is-action-button="false"
          @onApprovalPost="onApprovalPost"
        />
      </div>
      <div ref="end-location" />
      <infinite-loading
        ref="infiniteLoading"
        :identifier="infiniteId"
        @infinite="infiniteHandler"
      >
        <div slot="no-more">Hết bài đăng</div>
        <div slot="no-results">Hết bài đăng</div>
      </infinite-loading>
    </div>
    <!-- <dialog-post
      :show-dialog="showDialogDialogPost"
      :object-data="objectDataDialogPost"
      @onCloseDialog="handleClose"
    /> -->
  </div>

  <!-- </el-row> -->
</template>

<script>
// import iconAction from '@/assets/svg/action.svg'
import iconPicture from '@/assets/svg/picture.svg'
// import DialogPost from '@/views/club/detail/components/DialogPost'
import PostItem from '@/views/club/detail/components/PostItem'
import EventResource from '@/api/event'

const eventResource = new EventResource()
export default {
  name: 'Post',
  components: {
    // DialogPost,
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
      loading: false
    }
  },
  created() {
    this.onGetListPost()
  },
  methods: {
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
      this.queryParams.is_confirm = 0
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
    async onApprovalPost() {
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

