const state = {
  isShowDialogHistoryTransactionFund: false,
  //   isAddHistoryTransactionFund: true,
  objectHistoryTransactionFund: {
    isAdd: true
  }
}

const mutations = {
  // dialog lich su giao dich quy clb
  SHOW_DIALOG_HISTORY: (state, object) => {
    state.isShowDialogHistoryTransactionFund = true
    state.objectHistoryTransactionFund = object
  },
  HIDE_DIALOG_HISTORY: state => {
    state.isShowDialogHistoryTransactionFund = false
    state.objectHistoryTransactionFund = { isAdd: null }
  }
}

const actions = {
  showDialogHistoryTransactionFund(context, object) {
    context.commit('SHOW_DIALOG_HISTORY', object)
  },
  hideDialogHistoryTransactionFund(context) {
    context.commit('HIDE_DIALOG_HISTORY')
  }
}

export default {
  state,
  mutations,
  actions
}

