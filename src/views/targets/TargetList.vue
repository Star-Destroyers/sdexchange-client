<template>
  <table class="min-w-full divide-y divide-gray-200 mt-5">
    <thead class="bg-gray-50 text-left">
      <tr>
        <th>Name</th>
        <th>Classification</th>
        <th>UTC</th>
        <th>Ra</th>
        <th>Dec</th>
        <th>Latest r Mag</th>
        <th>Latest g Mag</th>
        <th>Max r Mag</th>
        <th>Max g Mag</th>
        <th>Lightcurve</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="target in targets" class="border-solid border-t border-b border-gray-400" v-bind:key="target.id">
        <td class="border-gray-400"><router-link :to="'/objectdetails?object=' + target.name">{{ target.name }}</router-link></td>
        <td class="border-gray-400">{{ target.classification }}</td>
        <td class="border-gray-400">{{ target.utc }}</td>
        <td class="border-gray-400">{{ target.ra.toFixed(2) }}</td>
        <td class="border-gray-400">{{ target.dec.toFixed(2) }}</td>
        <td class="border-gray-400">{{ target.latest_r_mag ? target.latest_r_mag.toFixed(2) : '' }}</td>
        <td class="border-gray-400">{{ target.latest_g_mag ? target.latest_g_mag.toFixed(2) : '' }}</td>
        <td class="border-gray-400">{{ target.max_r_mag ? target.max_r_mag.toFixed(2) : '' }}</td>
        <td class="border-gray-400">{{ target.max_g_mag ? target.max_g_mag.toFixed(2) : '' }}</td>
        <td><spark-line :sldata="target.sparkline"></spark-line></td>
      </tr>
    </tbody>
  </table>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store/index'
import SparkLine from '@/components/SparkLine.vue'

export default defineComponent({
  components: {
    SparkLine
  },
  setup () {
    const store = useStore()
    return {
      targets: computed(() => store.state.targets.targets)
    }
  }
})
</script>
