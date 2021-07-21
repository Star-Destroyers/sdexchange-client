<template>
<div>
  <div class="bg-blue-200 border-b border-gray-500 text-lg p-2">Alerce</div>
  <a :href="result.url" target="_blank">View on alerce.online</a>
  <p>Most probable classification: <strong>{{ result.classifications[0].probability.toFixed(2) }}% {{ result.classifications[0].class_name }} </strong></p>
  <table class="table-auto divide-y divide-gray-200 mt-2">
    <caption>Classifications</caption>
    <thead>
      <tr>
        <th>Class Name</th>
        <th>Probability</th>
        <th>Ranking</th>
        <th>Classifier Name</th>
        <th>Classifier Version</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(classification, idx) in result.classifications" :key="idx">
        <td>{{ classification.class_name }}</td>
        <td>{{ classification.probability.toFixed(2) }}</td>
        <td>{{ classification.ranking }}</td>
        <td>{{ classification.classifier_name }}</td>
        <td>{{ classification.classifier_version }}</td>
      </tr>
    </tbody>
  </table>
</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    result: {
      type: Object
    }
  },
  setup () {
    return { }
  }
})
</script>
