<template>
  <div>
    <div class="bg-blue-200 border-b border-gray-500 text-lg p-2">Antares</div>
    <a :href="result.url" target="_blank">View on antares.noirlab.edu</a>
    <table class="table-auto">
      <tbody>
        <tr><td>Antares Id</td><td class="px-4">{{ result.broker_id }}</td></tr>
        <tr><td>Crossmatch</td><td class="px-4">{{ result.crossmatch.join(' ')}}</td></tr>
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
    return {}
  }
})
</script>
