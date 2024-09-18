<template>
  <el-row class="documentation-container">
    <el-col class="ml-1">
      <div>
        <el-tabs v-model="activeName">
          <el-tab-pane label="Thống kê đánh giá" name="1">
            <statistic-feedback />
          </el-tab-pane>
          <el-tab-pane label="Danh sách đánh giá" name="2">
            <list-feedback />
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { mapGetters } from 'vuex'
import { isEmpty } from '@/utils/validate'
import StatisticFeedback from '@/views/membership/feedbackCustomer/statisticFeedback.vue'
import ListFeedback from '@/views/membership/feedbackCustomer/listFeedback.vue'

export default {
  name: 'ListGolferAll',
  components: { ListFeedback, StatisticFeedback },
  data() {
    return {
      activeName: '1',
      nameRole: null,
      userPermissionViewVga: []
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  methods: {
    isEmpty
  }
}
</script>

<style lang="scss">
</style>
