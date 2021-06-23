export interface AlertState {
  type: string | null;
  message: string | null;
}

const state: AlertState = {
  type: null,
  message: null
}

export const alertModule = {
  namespaced: true,
  state,
  mutations: {
    SUCCESS (state: AlertState, message: string) {
      state.type = 'alert-success'
      state.message = message
    },
    ERROR (state: AlertState, message: string) {
      state.type = 'alert-danger'
      state.message = message
    },
    CLEAR (state: AlertState) {
      state.type = null
      state.message = null
    }
  },
  actions: {
    success ({ commit }: {commit: Function}, message: string) {
      commit('SUCCESS', message)
    },
    error ({ commit }: {commit: Function}, message: string) {
      commit('ERROR', message)
    },
    clear ({ commit }: {commit: Function}) {
      commit('CLEAR')
    }
  }
}
