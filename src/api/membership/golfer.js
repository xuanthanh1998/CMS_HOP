import Resource from '@/api/resource'
import request from '@/utils/request'

// const api = 'http://localhost:9999'

class ListGolferResource extends Resource {
  constructor() {
    super('list-golfer')
  }

  list(data, params) {
    return request({
      url: `${this.uri}/list-golfer`,
      method: 'get',
      data,
      params
    })
  }

  listCreateCodePayment(data, params) {
    return request({
      url: `${this.uri}/list-create-payment-upgrade`,
      method: 'post',
      data,
      params
    })
  }
  detailGolfer(data, params) {
    return request({
      url: `${this.uri}/detail-golfer`,
      method: 'get',
      data,
      params
    })
  }

  searchGolfer(query, data) {
    return request({
      url: `${this.uri}/search-golfer`,
      method: 'POST',
      data,
      params: query
    })
  }

  updateGolfer(data, params) {
    return request({
      url: `${this.uri}/update-golfer`,
      method: 'POST',
      data,
      params
    })
  }

  getOptionUpgradeAccount(query) {
    return request({
      url: `${this.uri}/get-option-upgrade-account`,
      method: 'get',
      params: query
    })
  }

  upgradeGolferSpecial(data) {
    return request({
      url: `${this.uri}/upgrade-golfer-special`,
      method: 'post',
      data
    })
  }
  listUpgradeGolferSpecial(data, params) {
    return request({
      url: `${this.uri}/history-upgrade-golfer-special`,
      method: 'post',
      data,
      params
    })
  }
  listUpgradeTypeAccount(query) {
    return request({
      url: `${this.uri}/list-upgrade-type-account`,
      method: 'get',
      params: query
    })
  }
  addUpgradeTypeAccount(data) {
    return request({
      url: `${this.uri}/add-upgrade-type-account`,
      method: 'post',
      data: data
    })
  }

  createNote(data) {
    return request({
      url: `${this.uri}/create-note`,
      method: 'post',
      data: data
    })
  }

  listNoteUser(query) {
    return request({
      url: `${this.uri}/list-note-by-user`,
      method: 'get',
      params: query
    })
  }

  historyTransactionUser(query) {
    return request({
      url: `${this.uri}/history-transaction-by-user`,
      method: 'get',
      params: query
    })
  }
  historyTransactionInDateUser(query) {
    return request({
      url: `${this.uri}/history-transaction-in-date-by-user`,
      method: 'get',
      params: query
    })
  }
  listDocument(query) {
    return request({
      url: `${this.uri}/list-document`,
      method: 'get',
      params: query
    })
  }

  storeDocument(data) {
    return request({
      url: `${this.uri}/store-document`,
      method: 'post',
      data: data
    })
  }

  updateDocument(data, id) {
    return request({
      url: `${this.uri}/update-document/${id}`,
      method: 'post',
      data: data
    })
  }
  removeDocument(id) {
    return request({
      url: `${this.uri}/delete-document/${id}`,
      method: 'get'
    })
  }
  listDirectCustomer(query) {
    return request({
      url: `${this.uri}/list-direct-customer`,
      method: 'get',
      params: query
    })
  }

  storeDirectCustomer(data) {
    return request({
      url: `${this.uri}/store-direct-customer`,
      method: 'post',
      data: data
    })
  }
  updateDirectCustomer(data, id) {
    return request({
      url: `${this.uri}/update-direct-customer/${id}`,
      method: 'post',
      data: data
    })
  }
  storeMediaCustomer(data) {
    return request({
      url: `${this.uri}/store-media-customer`,
      method: 'post',
      data: data
    })
  }
  updateMediaCustomer(data, id) {
    return request({
      url: `${this.uri}/update-media-customer/${id}`,
      method: 'post',
      data: data
    })
  }
  removeDirectCustomer(id) {
    return request({
      url: `${this.uri}/delete-direct-customer/${id}`,
      method: 'get'
    })
  }

  listMediaCustomer(query) {
    return request({
      url: `${this.uri}/list-media-customer`,
      method: 'get',
      params: query
    })
  }

  listInfoCustomer(query) {
    return request({
      url: `${this.uri}/list-info-customer`,
      method: 'get',
      params: query
    })
  }
  listBackPointUser(query) {
    return request({
      url: `${this.uri}/list-back-point-user`,
      method: 'get',
      params: query
    })
  }

  listFeedbackCustomer(query) {
    return request({
      url: `${this.uri}/list-feedback-customer`,
      method: 'get',
      params: query
    })
  }

  exportFeedbackCustomer(query) {
    return request({
      url: `${this.uri}/export-feedback-customer`,
      method: 'get',
      params: query
    })
  }

  exportInsurance(query) {
    return request({
      url: `${this.uri}/export-insurance`,
      method: 'get',
      params: query
    })
  }

  percentFeedbackCustomer(query) {
    return request({
      url: `${this.uri}/percent-feedback-customer`,
      method: 'get',
      params: query
    })
  }

  infoUserField(query) {
    return request({
      url: `${this.uri}/info-user-field`,
      method: 'get',
      params: query
    })
  }

  listEquipName(query) {
    return request({
      url: `${this.uri}/list-equip-name`,
      method: 'get',
      params: query
    })
  }

  updateUserField(data) {
    return request({
      url: `${this.uri}/update-user-field`,
      method: 'post',
      data: data
    })
  }

  searchNameDocument(data) {
    return request({
      url: `${this.uri}/search-name-document`,
      method: 'post',
      data: data
    })
  }
  importExcel(data) {
    return request({
      url: `${this.uri}/import-exel`,
      method: 'post',
      data: data
    })
  }

  exportStatisticCustomer(query) {
    return request({
      url: `${this.uri}/export-statistic-customer`,
      method: 'get',
      params: query
    })
  }
  listQR(query) {
    return request({
      url: `${this.uri}/list-qr`,
      method: 'get',
      params: query
    })
  }

  listHolePar3(query) {
    return request({
      url: `${this.uri}/list-hole-par-3`,
      method: 'get',
      params: query
    })
  }
  createQR(data) {
    return request({
      url: `${this.uri}/create-qr`,
      method: 'post',
      data: data
    })
  }
  updateStatusQr(data, id) {
    return request({
      url: `${this.uri}/update-status-qr/${id}`,
      method: 'post',
      data: data
    })
  }

  listInsuranceS(query) {
    return request({
      url: `${this.uri}/list-insurance-s`,
      method: 'get',
      params: query
    })
  }

  removeQR(id) {
    return request({
      url: `${this.uri}/remove-qr/${id}`,
      method: 'get'
    })
  }

  searchAgentNew(query) {
    return request({
      url: `${this.uri}/search-agent-new`,
      method: 'get',
      params: query
    })
  }

  exportHole(query) {
    return request({
      url: `${this.uri}/export-hole`,
      method: 'get',
      params: query
    })
  }

  updateFacilityUser(data, id) {
    return request({
      url: `${this.uri}/update-facility-user/${id}`,
      method: 'post',
      data: data
    })
  }
}

export { ListGolferResource as default }
