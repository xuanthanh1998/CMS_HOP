<template>
  <section>
    <el-select
      v-model="golferModel"
      class="w-100"
      filterable
      remote
      :size="size"
      clearable
      reserve-keyword
      placeholder="Tìm kiếm mã vID"
      :remote-method="onSearchGolfer"
      :loading="loadingSearchUser"
      @change="handleSelectionChange"
    >
      <el-option v-for="user in users" :key="user.value" :label="user.label" :value="user" />
    </el-select>
  </section>
</template>

<script>
import GolferResource from '@/api/golfer/golfer'
import { isEmpty } from '@/utils/validate'

const golferResource = new GolferResource()

export default {
  name: 'SearchUser',
  props: {
    clearData: {
      type: Boolean,
      default: false
    },
    object: {
      type: Object,
      default: () => {
        return {}
      }
    },
    size: {
      type: String,
      default: 'medium'
    },
    dataModel: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      golferModel: {},
      users: [],
      loadingSearchUser: false
    }
  },
  watch: {
    clearData(val) {
      console.log('val.....................clear                vào đây', val)
      if (val) {
        this.golferModel = {}
        this.users = []
      }
    },
    dataModel(val) {
      console.log('val.....................dataModel', isEmpty(val), val)
      if (!isEmpty(val)) {
        console.log('tại sao lại vào đây..............................', !isEmpty(val))
        this.golferModel = {
          value: val._id,
          label: `vID${val._id} - ${val.fullname}`
        }
        this.users = [this.golferModel]
        console.log('this.golferModel', this.golferModel)
      } else {
        this.golferModel = {}
        this.users = []
      }
    }
  },
  methods: {
    onSearchGolfer(keyword) {
      golferResource.searchGolfer({ keyword: keyword }).then(res => {
        const result = res.data
        if (res.error_code === 0) {
          if (result.length > 0) {
            this.users = result.map(value => {
              const label = `vID${value.id} - ${value.fullname}`
              return { value: value.id, label: label }
            })
          } else {
            this.users = []
          }
          this.loadingSearchUser = false
        } else {
          this.$message.error(res.error_msg)
        }
      })
    },
    handleSelectionChange(val) {
      console.log(this.golferModel)
      this.$emit('selection-changed-user', this.golferModel)
    }
  }
}

</script>
