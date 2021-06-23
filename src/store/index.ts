import { createStore, useStore as baseUseStore, Store } from 'vuex'
import { InjectionKey } from 'vue'
import { TargetState, targetModule } from '@/store/modules/targets'
import { AlertState, alertModule } from '@/store/modules/alerts'
import { AuthState, authModule } from '@/store/modules/auth'

export interface State {
  targets: TargetState;
  alert: AlertState;
  auth: AuthState;
}
export const key: InjectionKey<Store<State>> = Symbol('Typed store for typescript')

export const store = createStore<State>({
  mutations: {
  },
  actions: {
  },
  modules: {
    targets: targetModule,
    alert: alertModule,
    auth: authModule
  }
})

export function useStore () {
  return baseUseStore(key)
}

export interface ActionParams {
  commit: Function;
  dispatch: Function;
}
