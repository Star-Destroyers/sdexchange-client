<template>
  <div>
    <div class="bg-blue-200 border-b border-gray-500 text-lg p-2">Antares</div>
    <a :href="data.url" target="_blank">View on antares.noirlab.edu</a>
    <table class="table-auto">
      <tbody>
        <tr><td>Antares Id</td><td class="px-4">{{ data.broker_id }}</td></tr>
        <tr><td>Crossmatch</td><td class="px-4">{{ data.data.data[0].attributes.catalogs.join(' ')}}</td></tr>
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
