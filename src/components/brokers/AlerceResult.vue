<template>
<div>
  <div class="bg-blue-200 border-b border-gray-500 text-lg p-2">Alerce</div>
  <a :href="data.url" target="_blank">View on alerce.online</a>
  <table class="table-auto divide-y divide-gray-200 mt-2">
    <caption>Classification</caption>
    <thead>
      <tr>
        <th>Classifier</th><th class="px-2">Bogus Prob</th><th class="px-2">AGN</th><th class="px-2">SN</th><th class="px-2">VS</th><th class="px-2">Asteroid</th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="data.classification.late_classifier.bogus_prob">
        <td>Late</td>
        <td>{{ data.classification.late_classifier.bogus_prob.toFixed(2) }}</td>
        <td>{{ data.classification.late_classifier.agn_prob.toFixed(2) }}</td>
        <td>{{ data.classification.late_classifier.sn_prob.toFixed(2) }}</td>
        <td>{{ data.classification.late_classifier.vs_prob.toFixed(2) }}</td>
        <td>{{ data.classification.late_classifier.asteroid_prob.toFixed(2) }}</td>
      </tr>
      <tr v-if="data.classification.early_classifier.bogus_prob">
        <td>Early</td>
        <td>{{ data.classification.early_classifier.bogus_prob.toFixed(2) }}</td>
        <td>{{ data.classification.early_classifier.agn_prob.toFixed(2) }}</td>
        <td>{{ data.classification.early_classifier.sn_prob.toFixed(2) }}</td>
        <td>{{ data.classification.early_classifier.vs_prob.toFixed(2) }}</td>
        <td>{{ data.classification.early_classifier.asteroid_prob.toFixed(2) }}</td>
      </tr>
    </tbody>
  </table>
</div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  props: {
    result: {
      type: Object
    }
  },
  setup (props) {
    const dataDisplay = computed(() => {
      return JSON.stringify(props.result, null, 2)
    })

    return { data: props.result, dataDisplay: dataDisplay }
  }
})
</script>
