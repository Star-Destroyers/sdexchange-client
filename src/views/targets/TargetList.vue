<template>
  <table class="min-w-full divide-y divide-gray-200 mt-5">
    <thead class="bg-gray-50 text-left">
      <tr>
        <th>Name</th>
        <th>Classification</th>
        <th>UTC</th>
        <th>Latest r Mag</th>
        <th>Latest g Mag</th>
        <th>Max r Mag</th>
        <th>Max g Mag</th>
        <th>Ra</th>
        <th>Dec</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="target in targets" v-bind:key="target.id">
        <td><router-link :to="'/objectdetails?object=' + target.name">{{ target.name }}</router-link></td>
        <td>{{ target.classification }}</td>
        <td>{{ target.utc }}</td>
        <td>{{ target.latest_r_mag }}</td>
        <td>{{ target.latest_g_mag }}</td>
        <td>{{ target.max_r_mag }}</td>
        <td>{{ target.max_g_mag }}</td>
        <td>{{ target.ra.toFixed(2) }}</td>
        <td>{{ target.dec.toFixed(2) }}</td>
      </tr>
    </tbody>
  </table>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store/index'

export default defineComponent({
  setup () {
    const store = useStore()
    return {
      targets: computed(() => store.state.targets.targets)
    }
  }
})
</script>
