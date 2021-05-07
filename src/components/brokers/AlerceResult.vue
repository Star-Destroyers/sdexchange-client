<template>
<div>
  <div class="bg-blue-200 border-b border-gray-500 text-lg p-2">Alerce</div>
  <a :href="result.url" target="_blank">View on alerce.online</a>
  <p>Most probable classification: <strong>{{ result.classification.type }} {{ result.classification.probability.toFixed(2) }}% </strong></p>
  <table class="table-auto divide-y divide-gray-200 mt-2">
    <caption>Classification</caption>
    <thead>
      <tr>
        <th>Class</th>
        <th class="px-1">AGN-I</th>
        <th class="px-1">Blazar</th>
        <th class="px-1">CV/Nova</th>
        <th class="px-1">SNIa</th>
        <th class="px-1">SNIbc</th>
        <th class="px-1">SNII</th>
        <th class="px-1">SNIIn</th>
        <th class="px-1">SLSN</th>
        <th class="px-1">EBSD/D</th>
        <th class="px-1">EBC</th>
        <th class="px-1">DSCT</th>
        <th class="px-1">RRL</th>
        <th class="px-1">Ceph</th>
        <th class="px-1">LPV</th>
        <th class="px-1">Other</th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="result.classification.late">
        <td>Late</td>
        <td>{{ result.classification.late.agn_i.toFixed(2) }}</td>
        <td>{{ result.classification.late.blazar.toFixed(2) }}</td>
        <td>{{ result.classification.late.cv_nova.toFixed(2) }}</td>
        <td>{{ result.classification.late.snia.toFixed(2) }}</td>
        <td>{{ result.classification.late.snibc.toFixed(2) }}</td>
        <td>{{ result.classification.late.snii.toFixed(2) }}</td>
        <td>{{ result.classification.late.sniin.toFixed(2) }}</td>
        <td>{{ result.classification.late.slsn.toFixed(2) }}</td>
        <td>{{ result.classification.late.ebsd_d.toFixed(2) }}</td>
        <td>{{ result.classification.late.ebc.toFixed(2) }}</td>
        <td>{{ result.classification.late.dsct.toFixed(2) }}</td>
        <td>{{ result.classification.late.rrl.toFixed(2) }}</td>
        <td>{{ result.classification.late.ceph.toFixed(2) }}</td>
        <td>{{ result.classification.late.lpv.toFixed(2) }}</td>
        <td>{{ result.classification.late.periodic_other.toFixed(2) }}</td>
      </tr>
      <tr v-if="result.classification.early">
        <td>Early</td>
        <td>{{ result.classification.early.agn_i.toFixed(2) }}</td>
        <td>{{ result.classification.early.blazar.toFixed(2) }}</td>
        <td>{{ result.classification.early.cv_nova.toFixed(2) }}</td>
        <td>{{ result.classification.early.snia.toFixed(2) }}</td>
        <td>{{ result.classification.early.snibc.toFixed(2) }}</td>
        <td>{{ result.classification.early.snii.toFixed(2) }}</td>
        <td>{{ result.classification.early.sniin.toFixed(2) }}</td>
        <td>{{ result.classification.early.slsn.toFixed(2) }}</td>
        <td>{{ result.classification.early.ebsd_d.toFixed(2) }}</td>
        <td>{{ result.classification.early.ebc.toFixed(2) }}</td>
        <td>{{ result.classification.early.dsct.toFixed(2) }}</td>
        <td>{{ result.classification.early.rrl.toFixed(2) }}</td>
        <td>{{ result.classification.early.ceph.toFixed(2) }}</td>
        <td>{{ result.classification.early.lpv.toFixed(2) }}</td>
        <td>{{ result.classification.early.periodic_other.toFixed(2) }}</td>
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
