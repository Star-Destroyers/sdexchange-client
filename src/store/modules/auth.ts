import { authService } from '@/api/auth'
import { ActionParams } from '@/store/index'

export interface AuthState {
  loggedIn: boolean;
  loggingIn: boolean;
  username: string | null;
}

const state: AuthState = {
  loggedIn: false,
  loggingIn: false,
  username: null
}

export const authModule = {
  namespaced: true,
  state,
  mutations: {
    LOGIN_REQUEST (state: AuthState, username: string) {
      state.loggingIn = true
      state.username = username
    },
    LOGIN_SUCCESS (state: AuthState, username: string) {
      state.loggingIn = false
      state.loggedIn = true
      state.username = username
    },
    LOGIN_FAILED (state: AuthState) {
      state.loggedIn = false
      state.loggingIn = false
      state.username = null
    },
    LOGOUT (state: AuthState) {
      state.loggedIn = false
      state.loggingIn = false
      state.username = null
    }
  },
  actions: {

    async login (
      { dispatch, commit }: ActionParams,
      { username, password }: { username: string; password: string }
    ) {
      commit('LOGIN_REQUEST', { username })
      try {
        await authService.login(username, password)
        commit('LOGIN_SUCCESS', username)
        dispatch('alert/success', 'Logged in', { root: true })
      } catch (e) {
        commit('LOGIN_FAILED')
        dispatch('alert/error', e.message, { root: true })
      }
    },

    logout ({ commit }: ActionParams) {
      authService.logout()
      location.reload(true)
      commit('LOGOUT')
    },

    async initialize ({ commit }: ActionParams) {
      if (localStorage.getItem('user')) {
        const user = await authService.me()
        commit('LOGIN_SUCCESS', user.username)
      } else {
        commit('LOGOUT')
      }
    }
  }
}
