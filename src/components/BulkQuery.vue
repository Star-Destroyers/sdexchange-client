<template>
  <div class="main">
    <input class="mt-1" type="text" v-model="objectId" placeholder="ZTF19acvtuva">
    <button class="btn btn-blue ml-2" @click="bulkQuery" :disabled="objectId === ''">Search</button>
    <div v-if="results">
      <!-- Show which brokers have results -->
      <div class="flex flex-row">
        <div v-if="results.mars">
          <Check></Check><span class="align-bottom mr-2"> MARS</span>
        </div>
        <div v-if="results.lasair">
          <Check></Check><span class="align-bottom mr-2"> Lasair</span>
        </div>
        <div v-if="results.alerce">
          <Check></Check><span class="align-bottom mr-2"> Alerce</span>
        </div>
        <div v-if="results.antares">
          <Check></Check><span class="align-bottom mr-2"> Antares</span>
        </div>
      </div>

      <div v-if="results.failed.length > 0">
        <div v-for="(failed, idx) in results.failed" :key="idx">
          <p><Cross></Cross><span class="align-bottom mr-2">{{ failed.broker }}</span></p>
          <p>{{ failed.error }}</p>
        </div>
      </div>

      <div class="grid grid-cols-5 gap-4">
        <div class="col-span-5 lg:col-span-3">
          <div class="mt-4" v-if="results.mars">
            <MarsResult :result="results.mars"></MarsResult>
          </div>
          <div class="mt-4" v-if="results.lasair">
            <LasairResult :result="results.lasair"></LasairResult>
          </div>
          <div class="mt-4" v-if="results.alerce">
            <AlerceResult :result="results.alerce"></AlerceResult>
          </div>
          <div class="mt-4" v-if="results.antares">
            <AntaresResult :result="results.antares"></AntaresResult>
          </div>
          <div class="mt-4" v-if="results.common">
            <TNSCone :ra="results.common.ra" :dec="results.common.dec"></TNSCone>
          </div>
        </div>
        <div class="col-span-5 lg:col-span-2">
          <MarsLightCurve v-if="results.mars" :lightcurve="results.mars.data"></MarsLightCurve>
          <Aladin v-if="results.mars" :ra="results.mars.ra" :dec="results.mars.dec"></Aladin>
        </div>
      </div>

    </div>
    <div v-else>
      <Spinner v-show="loading"></Spinner>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, defineAsyncComponent, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import Spinner from '@/components/ui/icons/Spinner.vue'
import Check from '@/components/ui/icons/Check.vue'
import Cross from '@/components/ui/icons/Cross.vue'
import LasairResult from '@/components/brokers/LasairResult.vue'
import AntaresResult from '@/components/brokers/AntaresResult.vue'
import MarsResult from '@/components/brokers/MarsResult.vue'
import AlerceResult from '@/components/brokers/AlerceResult.vue'
import TNSCone from '@/components/brokers/TNSCone.vue'
import alertApi from '@/api/alerts'
const MarsLightCurve = defineAsyncComponent(() => import(
  /* webpackChunkName: "mars-light-curve" */ '@/components/brokers/MarsLightCurve.vue'
))
const Aladin = defineAsyncComponent(() => import(
  /* webpackChunkName: "aladin" */ '@/components/Aladin.vue'
))

export default defineComponent({
  components: {
    LasairResult,
    AntaresResult,
    AlerceResult,
    MarsResult,
    MarsLightCurve,
    Aladin,
    TNSCone,
    Spinner,
    Check,
    Cross
  },
  setup () {
    const objectId = ref('')
    const error = ref('')
    const results = ref(null)
    const loading = ref(false)
    const route = useRoute()
    const router = useRouter()

    const bulkQuery = async () => {
      error.value = ''
      results.value = null
      loading.value = true
      try {
        results.value = await alertApi.objectInfo(objectId.value)
        router.push({ query: { object: objectId.value } })
      } catch (e) {
        error.value = e
      }
      loading.value = false
    }

    if (route.query.object) {
      objectId.value = route.query.object as string
    }

    onMounted(() => {
      if (objectId.value !== '') {
        bulkQuery()
      }
    })

    return {
      objectId,
      error,
      results,
      loading,
      bulkQuery
    }
  }
})
</script>
<style>
.brokerResult {
  text-align: left;
}
</style>
