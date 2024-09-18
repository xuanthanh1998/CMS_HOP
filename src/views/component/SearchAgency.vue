<template>
  <section>
    <el-select
      v-model="agencyModel"
      class="w-100"
      clearable
      :size="size"
      filterable
      remote
      reserve-keyword
      placeholder="Tìm kiếm đại lý"
      @change="handleSelectionChange"
    >
      <el-option v-for="agency in agencies" :key="agency.value" :label="agency.label" :value="agency" />
    </el-select>
  </section>
</template>

<script>
import AgencyResource from '@/api/agency/agency'

const agencyResource = new AgencyResource()

export default {
  name: 'SearchAgency',
  props: {
    clearData: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'medium'
    }
  },
  data() {
    return {
      agencyModel: null,
      agencies: [],
      loadingSearchAgency: false
    }
  },
  created() {
    this.onSearchAgency()
  },
  methods: {
    onSearchAgency() {
      agencyResource.searchAgency().then(res => {
        if (res.error_code === 0) {
          const result = res.data
          if (result.length > 0) {
            this.agencies = result.map(value => {
              return { value: value.id, label: value.name }
            })

            this.agencies.unshift({ value: -1, label: 'Khách lẻ' })
          } else {
            this.agencies = []
          }
        } else {
          this.$message.error(res.error_msg)
        }
      })
    },
    handleSelectionChange(val) {
      this.$emit('selection-changed-agency', this.agencyModel)
    }
  }
}

</script>
