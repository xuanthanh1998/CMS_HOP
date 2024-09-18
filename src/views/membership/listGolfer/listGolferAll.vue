<template>
  <el-row class="documentation-container">
    <el-col class="ml-1">
      <div>
        <el-tabs v-model="activeName">
          <el-tab-pane label="Danh sách golfer" name="1">
            <list-golfer />
          </el-tab-pane>
          <el-tab-pane label="Lịch sử nâng cấp tài khoản đặc biệt" name="2">
            <history-upgrade-account />
          </el-tab-pane>
          <el-tab-pane label="Danh sách giao dịch nâng cấp" name="3">
            <list-history />
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import listGolfer from '@/views/membership/listGolfer/listGolfer'
import HistoryUpgradeAccount from '@/views/membership/listGolfer/historyUpgradeAccount.vue'
import ListHistory from '@/views/membership/history/listHistory.vue'
import { mapGetters } from 'vuex'
import { isEmpty } from '@/utils/validate'

export default {
  name: 'ListGolferAll',
  components: { listGolfer, HistoryUpgradeAccount, ListHistory },
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
