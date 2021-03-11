<template>
  <div class="main">
    <h1>Lasair Query</h1>
    <p>Enter the <a href="https://lasair-iris.roe.ac.uk/querylist/">Lasair Iris stored query</a> name here to fetch current results.</p>
    <input v-model="queryId" />
    <button @click="fetchLasairQuery">Search</button>
    <div v-if="error">
      <span class="error">There was a problem fetching that query: {{ error }}</span>
    </div>
    <div v-if="results">
      <p><strong>Last Entry: {{ results.last_entry }}</strong></p>
      <table>
        <thead>
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
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import alertApi from '@/api/alerts'
export default defineComponent({
  setup () {
    const queryId = ref('2TDE-candidates-EA')
    const results = ref(null)
    const error = ref('')

    const fetchLasairQuery = async () => {
      results.value = null
      error.value = ''

      try {
        results.value = await alertApi.lasairQuery(queryId.value)
      } catch (e) {
        error.value = e
      }
    }

    return {
      queryId: queryId,
      results: results,
      fetchLasairQuery: fetchLasairQuery,
      error: error
    }
  }
})
</script>
<style>
table {
  width: 100%
}
.error {
  color: orangered
}
</style>
