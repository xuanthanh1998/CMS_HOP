<template>
  <el-row style="margin:0 20px; font-family:Sans-serif">
    <el-row>
      <el-col :sm="24">
        <h3 class="title">Phòng truyền thống</h3>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-tabs v-model="activeName" class="demo-tabs tab_image">
        <el-tab-pane label="Tất cả " name="first">
          <el-col
            v-for="(data, i) in list_image"
            :key="data.id"
            :xs="6"
            :sm="4"
            :md="3"
            :lg="3"
          >
            <img class="full-width" style="margin-right: 10px; margin-bottom: 10px; text-align: center;" :src="data.src" @click="handleShowCarousel(i)">
          </el-col>
        </el-tab-pane>
        <el-tab-pane label="Album" name="second">
          <el-col
            v-for="(data, i) in list_image.slice(1, 7)"
            :key="data.id"
            :xs="6"
            :sm="4"
            :md="3"
            :lg="3"
          >
            <img class="full-width" style="margin-right: 10px; margin-bottom: 10px; text-align: center;" :src="data.src" @click="handleShowCarousel(i)">
          </el-col>
        </el-tab-pane>
        <el-tab-pane label="Ảnh" name="third">
          <el-col
            v-for="(data, i) in list_image.slice(0, 5)"
            :key="data.id"
            :xs="6"
            :sm="4"
            :md="3"
            :lg="3"
          >
            <img class="full-width" style="margin-right: 10px; margin-bottom: 10px; text-align: center;" :src="data.src" @click="handleShowCarousel(i)">
          </el-col>
        </el-tab-pane>
        <el-tab-pane label="Video" name="fourth">
          <el-col
            v-for="(data, i) in list_image.slice(0, 5)"
            :key="data.id"
            :xs="6"
            :sm="4"
            :md="3"
            :lg="3"
          >
            <img class="full-width" style="margin-right: 10px; margin-bottom: 10px; text-align: center;" :src="data.src" @click="handleShowCarousel(i)">
          </el-col>
        </el-tab-pane>
      </el-tabs>
      <el-tabs v-model="filterModel" class="demo-tabs" style="display: flex; justify-content: center;">
        <el-tab-pane label="Năm" name="first" />
        <el-tab-pane label="Tháng" name="second" />
        <el-tab-pane label="Ngày" name="third" />
      </el-tabs>
    </el-row>
    <CarouselItem
      :object-data="objectDataShowCarousel"
      :show-dialog="showDialogShowCarousel"
      @onCloseDialog="handleClose"
    />
  </el-row>
</template>

<script>
// import Pagination from '@/components/Pagination/index'
// import { formatDate, formatNumber } from '@/utils/convert'
// import AdminClubResource from '@/api/club/admin-club'
import CarouselItem from '@/views/club/detail/components/CarouselItem'

// const adminClubResource = new AdminClubResource()

export default {
  name: 'ListImage',
  components: {
    CarouselItem
  },

  data() {
    return {
      list_image: [
        { id: 1, src: 'https://api-v2.vcallid.com/data/28-10-2023/1698475800240.jpeg' },
        { id: 2, src: 'https://cdn.vcallid.com/d513b532-d70e-46e4-be8b-95ad25a55cd5.png' },
        { id: 3, src: 'https://api-v2.vcallid.com/data/28-10-2023/1698475800240.jpeg' },
        { id: 4, src: 'https://api-v2.vcallid.com/data/28-10-2023/1698475800240.jpeg' },
        { id: 5, src: 'https://api-v2.vcallid.com/data/24-11-2023/1700800204412.jpeg' },
        { id: 6, src: 'https://api-v2.vcallid.com/data/28-10-2023/1698475800240.jpeg' },
        { id: 7, src: 'https://api-v2.vcallid.com/data/24-11-2023/1700800204412.jpeg' },
        { id: 8, src: 'https://api-v2.vcallid.com/data/28-10-2023/1698475800240.jpeg' },
        { id: 9, src: 'https://api-v2.vcallid.com/data/28-10-2023/1698475800240.jpeg' },
        { id: 10, src: 'https://api-v2.vcallid.com/data/28-10-2023/1698475800240.jpeg' },
        { id: 11, src: 'https://api-v2.vcallid.com/data/28-10-2023/1698475800240.jpeg' },
        { id: 12, src: 'https://api-v2.vcallid.com/data/28-10-2023/1698475800240.jpeg' },
        { id: 13, src: 'https://api-v2.vcallid.com/data/28-10-2023/1698475800240.jpeg' },
        { id: 14, src: 'https://api-v2.vcallid.com/data/28-10-2023/1698475800240.jpeg' },
        { id: 15, src: 'https://cdn.vcallid.com/d513b532-d70e-46e4-be8b-95ad25a55cd5.png' },
        { id: 16, src: 'https://api-v2.vcallid.com/data/28-10-2023/1698475800240.jpeg' },
        { id: 17, src: 'https://api-v2.vcallid.com/data/28-10-2023/1698475800240.jpeg' },
        { id: 18, src: 'https://api-v2.vcallid.com/data/24-11-2023/1700800204412.jpeg' },
        { id: 19, src: 'https://api-v2.vcallid.com/data/28-10-2023/1698475800240.jpeg' },
        { id: 20, src: 'https://api-v2.vcallid.com/data/28-10-2023/1698475800240.jpeg' },
        { id: 21, src: 'https://cdn.vcallid.com/d513b532-d70e-46e4-be8b-95ad25a55cd5.png' }
      ],
      objectDataShowCarousel: {},
      showDialogShowCarousel: false,
      activeName: 'first',
      filterModel: 'first'
    }
  },
  computed: {
  },
  watch: {
  },
  created() {
  },
  methods: {
    handleShowCarousel(index) {
      const sort1 = this.list_image.slice(index)
      const sort2 = this.list_image.slice(0, index)
      const result_sort = [...sort1, ...sort2]
      this.objectDataShowCarousel = Object.assign({}, { list_media: result_sort.map(item => item.src) })
      this.showDialogShowCarousel = true
    },
    handleClose() {
      this.showDialogShowCarousel = false
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

.full-width {
  width: 100%;
  height: auto;
  object-fit: cover;  /* Hiển thị ảnh luôn full và không bị đè */
}

</style>

