<template>
    <div>
      <div class="bg-blue-200 border-b border-gray-500 text-lg p-2">Mars</div>
      <p>
        <a :href="data.url" target="_blank">View on mars.lco.global</a>
        <a class="ml-4" :href="data.data.avro" target="_blank">Download full .avro file</a>
        <a class="ml-4" :href="jsonURL" target="_blank">View as JSON</a>
      </p>
      <table class="table-auto">
        <tbody>
          <tr>
            <td>Latest Detection</td><td class="px-4">{{ data.data.candidate.wall_time}}</td>
          </tr>
          <tr>
            <td>Star Galaxy Score</td>
            <td class="px-4">
              {{ data.data.candidate.sgscore1.toFixed(3)}},
              {{ data.data.candidate.sgscore2.toFixed(3)}},
              {{ data.data.candidate.sgscore3.toFixed(3)}}
             </td>
          </tr>
          <tr>
            <td>Num. Previous Detections</td><td class="px-4">{{ numDetections }}</td>
          </tr>
          <tr>
            <td>Num. Non Detections</td><td class="px-4">{{ numNonDetections }}</td>
          </tr>
          <tr>
            <td>FWHM</td><td class="px-4">{{ data.data.candidate.fwhm.toFixed(3) }}</td>
          </tr>
          <tr>
            <td>Mag PSF</td><td class="px-4">{{ data.data.candidate.magpsf.toFixed(3) }}</td>
          </tr>
          <tr>
            <td>Mag Difference</td><td class="px-4">{{ data.data.candidate.magdiff.toFixed(3) }}</td>
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
      type: Object,
      required: true
    }
  },
  components: {
  },
  setup (props) {
    const dataDisplay = computed(() => {
      return JSON.stringify(props.result, null, 2)
    })
    const numDetections = computed(() => {
      if (!props.result) {
        return 0
      }
      const detections = props.result.data.prv_candidate.filter((c: Record<string, any>) => {
        return c.candidate.magpsf !== undefined
      })
      return detections.length + 1
    })

    const numNonDetections = computed(() => {
      if (!props.result) {
        return 0
      }
      return props.result.data.prv_candidate.length - numDetections.value + 1
    })

    const jsonURL = computed(() => {
      return props.result.url + '?format=json'
    })

    return { data: props.result, dataDisplay, numDetections, numNonDetections, jsonURL }
  }
})
</script>
