<template>
  <div class="main">
    <input type="text" v-model="objectId">
    <button class="btn btn-blue ml-2" @click="bulkQuery">Search</button>
    <div v-if="results">
      <p><strong>ZTF Object ID: {{ results.name }}</strong></p>
      <div v-if="results.failed.length > 0">
        <h2>Brokers with no data:</h2>
        <div v-for="(failed, idx) in results.failed" :key="idx">
          <p><strong>{{ failed.broker }}</strong>. Error: {{ failed.error }}</p>
        </div>
      </div>
      <div class="brokerResult" v-if="results.mars">
        <h2>Mars</h2>
        <MarsResult :result="results.mars"></MarsResult>
      </div>
      <div class="brokerResult" v-if="results.lasair">
        <h2>Lasair</h2>
        <LasairResult :result="results.lasair"></LasairResult>
      </div>
      <div class="brokerResult" v-if="results.alerce">
        <h2>Alerce</h2>
        <AlerceResult :result="results.alerce"></AlerceResult>
      </div>
      <div class="brokerResult" v-if="results.antares">
        <h2>Antares</h2>
        <AntaresResult :result="results.antares"></AntaresResult>
      </div>
    </div>
    <div v-else>
      <Spinner v-show="loading"></Spinner>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

import Spinner from '@/components/ui/Spinner.vue'
import LasairResult from '@/components/brokers/LasairResult.vue'
import AntaresResult from '@/components/brokers/AntaresResult.vue'
import MarsResult from '@/components/brokers/MarsResult.vue'
import AlerceResult from '@/components/brokers/AlerceResult.vue'
import alertApi from '@/api/alerts'

export default defineComponent({
  components: {
    LasairResult,
    AntaresResult,
    AlerceResult,
    MarsResult,
    Spinner
  },
  setup () {
    const objectId = ref('ZTF18aaviokz')
    const error = ref('')
    const results = ref(null)
    const loading = ref(false)

    const bulkQuery = async () => {
      error.value = ''
      results.value = null
      loading.value = true
      try {
        results.value = await alertApi.objectInfo(objectId.value)
      } catch (e) {
        error.value = e
      }
      loading.value = false
    }

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
