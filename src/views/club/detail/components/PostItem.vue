<template>
  <div style=" border: 1px solid #999;padding: 10px 20px; border-radius: 10px; margin-bottom: 20px;">
    <div
      style="display: flex; margin-bottom: 10px;"
    >
      <el-avatar :size="50" :src="post?.User?.avatar" />
      <div style="display: flex; flex-direction: column; justify-content: center; padding: 0 10px; flex: 1;">
        <p style="margin: 0; font-size: 15px; font-weight: 500;">{{ post?.User?.fullname }}</p>
        <span style="font-size: 12px; font-style: italic; color: #999;">{{ post.created_at }}</span>
      </div>

      <el-popover
        ref="popoverRef"
        placement="top"
        width="250"
        trigger="click"
      >
        <div style=" background-color: rgb(239 236 233 / 30%); border-radius: 10px; display: flex; flex-direction: column; align-items: start; justify-content: center;">
          <el-button
            icon="el-icon-info"
            style=" border: none; background-color: transparent;"
          >
            Thông tin bài viết
          </el-button>
          <el-button
            icon="el-icon-edit"
            style=" border: none; background-color: transparent;margin: 0;"
          >
            Chỉnh sửa bài viết
          </el-button>
          <el-button
            icon="el-icon-delete"
            style=" border: none; background-color: transparent; margin: 0;"
          >
            Xóa bài viết
          </el-button>
        </div>
        <el-button
          v-if="isActionButton"
          slot="reference"
          style=" border: none; color: transparent; background-color: transparent;"
        >
          <el-image
            style="height: auto;"
            :src="icons.iconAction"
          />
        </el-button>
      </el-popover>
    </div>
    <div style="font-size: 14px;">
      <p
        :class="
          isShowContent
            ? 'show-content c-body2 c-inherit-text c-bold-text mb-0 mt-20'
            : 'hide-content c-body2 c-inherit-text c-bold-text mb-0 mt-20'
        "
        v-html="post.content"
      />
      <el-button
        class="c-body2 c-link-text c-bold-text mb-0 cursor-pointer"
        style="border: none; background: transparent; padding: 0; margin: 0 !important; "
        @click="onShowContent"
      >
        <p style="font-weight: 700;">{{ more }}</p>
      </el-button>
    </div>
    <div @click="showCarousel(post)">
      <div v-if="post.list_img_display.length == 1">
        <div v-for="(item, i) in post.list_img_display.map(val => val.img_path)" :key="i">
          <template
            v-if="isVideo(item)"
          >
            <video style="width: 99%; max-width: 400px; max-height: 100%; height: 400px; object-fit: contain;" :src="item" controls />
          </template>
          <template v-else>
            <el-image
              style="width: 100%; max-width: 800px; max-height: 100%; height: 400px; object-fit: contain;"
              alt="image"
              :src="item"
            />
          </template>
        </div>
      </div>
      <div v-else-if="post.list_img_display.length == 2">
        <el-row style="display: flex;">
          <template v-for="(item, i) in post.list_img_display.map(val => val.img_path)">
            <el-col :key="i" :sm="12">
              <template
                v-if="isVideo(item)"
              >
                <video style="width: 99%; max-width: 400px; max-height: 100%; height: 400px; object-fit: contain;" :src="item" controls />
              </template>
              <template v-else>
                <el-image
                  style="width: 99%; max-width: 400px; max-height: 100%; height: 400px; object-fit: contain;"
                  alt="image"
                  :src="item"
                />
              </template>
            </el-col>
          </template>
        </el-row>
      </div>
      <div v-else-if="post.list_img_display.map(val => val.img_path).length == 3 || post.list_img_display.map(val => val.img_path).length == 4 ">
        <div style="display: flex;">
          <div style="flex: 1">
            <div v-for="(item, i) in post.list_img_display.map(val => val.img_path).slice(0,2)" :key="i">
              <template
                v-if="isVideo(item)"
              >
                <video style="width: 99%; max-width: 400px; max-height: 100%; height:  200px; object-fit: contain;" :src="item" controls />
              </template>
              <template v-else>
                <el-image
                  style="width: 99%; max-width: 400px; max-height: 100%; height:  200px; object-fit: contain;"
                  alt="image"
                  :src="item"
                />
              </template>
            </div>
          </div>
          <div style="flex: 1">
            <div v-for="(item2, i) in post.list_img_display.map(val => val.img_path).slice(2)" :key="i+ 100">
              <template
                v-if="isVideo(item2)"
              >
                <video :style="`width: ${post.list_img_display.map(val => val.img_path).length === 3 ? '100%' : '99%'}; max-width: 400px; max-height: 100%; height: ${post.list_img_display.map(val => val.img_path).length === 3 ? '400px' : '200px'}; object-fit: contain;`" :src="item2" controls />
              </template>
              <template v-else>
                <el-image
                  :style="`width: ${post.list_img_display.map(val => val.img_path).length === 3 ? '100%' : '99%'}; max-width: 400px; max-height: 100%; height: ${post.list_img_display.map(val => val.img_path).length === 3 ? '400px' : '200px'}; object-fit: contain;`"
                  alt="image"
                  :src="item2"
                />
              </template>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div style="display: flex;">
          <div>
            <div v-for="(item, i) in post.list_img_display.slice(0,2)" :key="i">
              <template
                v-if="isVideo(item)"
              >
                <video style="width: 99%; max-width: 400px; height: auto; max-height: 200px; object-fit: contain;" :src="item" controls />
              </template>
              <template v-else>
                <el-image
                  style="width: 99%; max-width: 400px; height: auto; max-height: 200px; object-fit: contain;"
                  alt="image"
                  :src="item"
                />
              </template>
            </div>
          </div>
          <div>
            <div v-for="(item2, index) in post.list_img_display.slice(2, 5)" :key="index+ 100" class="image-item">
              <!-- <el-image
                  style="width: 99%; max-width: 400px; height: auto; max-height: 130px ; object-fit: contain;"
                  :src="item2"
                /> -->
              <template
                v-if="isVideo(item2)"
              >
                <video style="width: 99%; max-width: 400px; height: auto; max-height: 130px ; object-fit: contain;" :src="item2" controls />
              </template>
              <template v-else>
                <el-image
                  style="width: 99%; max-width: 400px; height: auto; max-height: 130px ; object-fit: contain;"
                  alt="image"
                  :src="item2"
                />
              </template>
              <div v-if="index==2" class="overlay"><span style="color: #fff; font-size: 24px; font-weight: 700;">+{{ post.list_img_display.length - 5 }}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!isActionButton" class="line">
      <hr>
    </div>
    <p v-if="!isActionButton" style="font-size: 13px;" v-html="post.msg" />
    <div v-if="!isActionButton" style="text-align: center; padding-bottom: 10px;">
      <el-button
        style="border: none; border-radius: 10px; background: linear-gradient(45deg, #15B0F6, #0B60AE);"
        @click="handleApproval(post)"
      ><span style="color: #fff;">Duyệt</span></el-button>
      <!-- <el-button style="border: none; border-radius: 10px; background: linear-gradient(45deg, #F50A0A, #BF0000);" @click="handleApproval"><span style="color: #fff;">Xóa bài viết</span></el-button>
      <el-button style="border: none; border-radius: 10px; background: linear-gradient(45deg, #626262, #3A3A3A);" @click="handleApproval"><span style="color: #fff;">Chặn</span></el-button> -->
    </div>
    <CarouselItem
      :object-data="objectDataShowCarousel"
      :show-dialog="showDialogShowCarousel"
      @onCloseDialog="handleClose"
    />
  </div>
</template>
<script>
import iconAction from '@/assets/svg/action.svg'
import CarouselItem from '@/views/club/detail/components/CarouselItem'
import EventResource from '@/api/event'

const eventResource = new EventResource()
export default {
  name: 'PostItem',
  components: {
    CarouselItem
    // Carousel
  },
  props: {
    post: {
      type: Object,
      default: () => {
        return {}
      }
    },
    isActionButton: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      icons: {
        iconAction
      },
      isShowContent: false,
      more: 'Xem thêm',
      showDialog: false,
      objectData: {},
      isCarouselVisible: false,
      objectDataShowCarousel: {},
      showDialogShowCarousel: false,
      salePaxForm: {}
    }
  },

  methods: {
    onShowContent() {
      this.more = this.isShowContent ? 'Xem thêm' : 'Rút gọn'
      this.isShowContent = !this.isShowContent
    },
    handleApproval(post) {
      this.$confirm(`Bạn có chắc chắn muốn thực hiện thao tác này`).then(async(_) => {
        const query = { uid: 101253 }
        const body = { post_id: post.id }
        eventResource.approvalPost(query, body).then(res => {
          if (res.error_code === 0) {
            this.$emit('onApprovalPost', { dialog: false, reload: false })
            this.$message.success(res.data)
          } else {
            this.$message.error(res.error_msg)
          }
        })
      })
    },
    isVideo(url) {
      return url.endsWith('.mp4')
    },
    showCarousel(row) {
      this.showDialogShowCarousel = true
      this.objectDataShowCarousel = Object.assign({}, { list_media: row.list_img_display?.map(val => val.img_path) || [] })
    },
    // showCarousel() {
    //   this.showDialog = true
    //   this.objectData = this.post ?? {}
    // },
    handleClose() {
      this.showDialogShowCarousel = false
    }
  }
}
</script>

<style scoped>
 .line hr {
    border-top: 1px solid #C3C3C3;
  }

  .line {
    margin: 20px 2px;
    width: 100%;
  }

  .show-content {
  display: block;
}

.hide-content {
  line-height: 1.5rem;
  max-height: 4.5rem;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 10px;
  max-width: 800px;
}

.image-item {
  position: relative;
}

.overlay {
  position: absolute;
  display: flex;
  width: 100%;
  height: 99%;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1;
  flex-grow: 1;
  background-color: rgba(0, 0, 0, 0.4);
  justify-content: center;
  align-items: center
}
.carousel-image {
  /* width: 80%; */
  max-width: 90%;
  max-height: 80vh;
  object-fit: contain;
  height: auto;
  display: block;
  margin: 0 auto;
}
</style>
