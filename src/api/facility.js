import Resource from '@/api/resource'
import request from '@/utils/request'
const baseURL = process.env.VUE_APP_BASE_API

class FacilityResource extends Resource {
  constructor() {
    super('facility')
  }

  search(query) {
    return request({
      url: baseURL + `/${this.uri}/search`,
      method: 'get',
      params: query
    })
  }
}

export { FacilityResource as default }
