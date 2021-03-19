<template>
  <div class="main">
    <p>Enter the <a href="https://lasair-iris.roe.ac.uk/querylist/">Lasair Iris stored query</a> name here to fetch current results.</p>
    <input type="text" v-model="queryId" class="mr-2"/>
    <button class="btn btn-blue inline-flex items-center" @click="fetchLasairQuery">
      Search
     </button>
    <div v-if="error">
      <span class="error">There was a problem fetching that query: {{ error }}</span>
    </div>
    <div v-if="results">
      <table class="min-w-full divide-y divide-gray-200 mt-5">
        <thead class="bg-gray-50 text-left">
          <tr>
            <th>ObjectId</th>
            <th>UTC</th>
            <th>Rising</th>
            <th>Fading</th>
            <th>Age</th>
            <th>g</th>
            <th>r</th>
            <th>g max</th>
            <th>r max</th>
            <th>Sherlock</th>
            <th>SG score</th>
          </tr>
         </thead>
        <tbody>
          <tr v-for="object in results.digest" :key="object.objectId">
            <td>{{ object.objectId }}</td>
            <td>{{ object.UTC }}</td>
            <td>{{ object.rising }}</td>
            <td>{{ object.fading }}</td>
            <td>{{ object.age }}</td>
            <td>{{ object.g }}</td>
            <td>{{ object.r }}</td>
            <td>{{ object.g_max }}</td>
            <td>{{ object.r_max }}</td>
            <td>{{ object.sherlock }}</td>
            <td>{{ object.sg_score }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <Spinner v-show="loading"></Spinner>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

import alertApi from '@/api/alerts'
import Spinner from '@/components/ui/icons/Spinner.vue'

export default defineComponent({
  components: {
    Spinner
  },
  setup () {
    const queryId = ref('2TDE-candidates-EA')
    const results = ref(null)
    const error = ref('')
    const loading = ref(false)

    const fetchLasairQuery = async () => {
      results.value = null
      error.value = ''
      loading.value = true

      try {
        results.value = await alertApi.lasairQuery(queryId.value)
      } catch (e) {
        error.value = e
      }
      loading.value = false
    }

    return {
      queryId,
      results,
      fetchLasairQuery,
      error,
      loading
    }
  }
})
</script>
