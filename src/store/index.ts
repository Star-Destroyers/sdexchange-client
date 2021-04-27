import { createStore, useStore as baseUseStore, Store } from 'vuex'
import { InjectionKey } from 'vue'
import { TargetState, targetModule } from '@/store/modules/targets'

export interface State {
  targets: TargetState;
}
export const key: InjectionKey<Store<State>> = Symbol('Typed store for typescript')

export const store = createStore<State>({
  mutations: {
  },
  actions: {
  },
  modules: {
    targets: targetModule
  }
})

export function useStore () {
  return baseUseStore(key)
}
