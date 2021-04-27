import api from '@/api/targets'

interface Target {
  id: number | null;
  name: string;
  ra: number;
  dec: number;
  utc: string;
  latest_r_mag: number | null;
  latest_g_mag: number | null;
  max_r_mag: number | null;
  max_g_mag: number | null;
}

export interface TargetState {
  targets: Array<Target>;
}

const state: TargetState = {
  targets: []
}

export const targetModule = {
  state,
  mutations: {
    ADD_TARGETS (state: TargetState, targets: Array<Target>) {
      state.targets.push(...targets)
    }
  },
  actions: {
    async fetchTargets ({ commit }: {commit: Function}) {
      const targets = await api.getTargets(100, 0)
      commit('ADD_TARGETS', targets)
    }
  },
  modules: {

  }
}
