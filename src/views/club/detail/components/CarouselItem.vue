<template>
  <el-dialog class="dialogCarousel" top="2vh" :show-close="false" :visible.sync="showDialog" width="60%" :before-close="handleClose" style="text-align: center;">
    <div style="background-color: #333;">
      <carousel ref="myCarousel" :per-page="1" :autoplay="false" :navigation-enabled="true" :pagination-enabled="false">
        <slide
          v-for="(item, index) in list_media"
          :key="index"
          style="display: flex; justify-content: center; align-items: center;"
        >
          <div
            v-if="isVideo(item)"
          >
            <video :src="item" class="carousel-image" controls />
            <!-- autoplay -->
          </div>
          <div v-else>
            <img :src="item" class="carousel-image" alt="image">
          </div>
        </slide>
      </carousel>
    </div>
  </el-dialog>
</template>

<script>
// import Carousel from 'vue-carousel'

export default {
  name: 'CarouselItem',
  // components: { Carousel },
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
    }
  },

  data() {
    return {
      list_media: []
    }
  },
  watch: {
    objectData(value) {
      console.log('val..............', value)
      if (value) {
        this.list_media = value?.list_media
      }
    }
  },
  methods: {
    handleClose() {
      this.list_media = []
      this.$emit('onCloseDialog', { dialog: false, reload: false })
    },
    isVideo(url) {
      return url.endsWith('.mp4')
    }
  }
}
</script>
<style>
  .dialogCarousel {
    .el-dialog__header {
      display: none;
    }
    .el-dialog__body {
      background-color: #333 !important;
    }
    .VueCarousel-navigation > button {
      color: #fff !important;
    }
  }
  </style>
  <style lang="scss" scoped>
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
  .carousel-image {
  /* width: 80%; */
  min-height: 400px;
  max-width: 90%;
  max-height: 80vh;
  object-fit: contain;
  height: auto;
  display: block;
  margin: 0 auto;
}
  </style>

