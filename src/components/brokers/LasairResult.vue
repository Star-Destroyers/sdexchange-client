<template>
  <div>
    <div class="bg-blue-200 border-b border-gray-500 text-lg p-2">Lasair</div>
    <!-- top links -->
    <p>
      <a :href="result.url" target="_blank">View on lasair-iris.roe.ac.uk</a>
    </p>

    <!-- Crossmatches table -->
    <table class="table-auto divide-y divide-gray-200 mt-2">
      <caption>Crossmatches</caption>
      <thead>
        <tr>
          <th>Type</th><th class="px-2">Catalogue</th><th class="px-2">Id</th><th class="px-2">Mag</th><th class="px-2">Separation</th><th class="px-2">RA</th><th class="px-2">Dec</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="cm in result.classification.crossmatches" :key="cm.catalog_object_id">
          <td>{{ cm.catalogue_object_type }}</td>
          <td class="px-2">{{ cm.catalogue_table_name.split('/')[0] }}</td>
          <td class="px-2"><a :href="'http://skyserver.sdss.org/dr12/en/tools/explore/Summary.aspx?id=' + cm.catalogue_object_id" target="_blank">{{ cm.catalogue_object_id }}</a></td>
          <td class="px-2"><em>{{ cm.MagFilter }}</em> {{ cm.Mag.toFixed(2) }}</td>
          <td class="px-2">{{ cm.separationArcsec.toFixed(2) }} arc sec.</td>
          <td class="px-2">{{ cm.raDeg.toFixed(4) }}</td>
          <td class="px-2">{{ cm.decDeg.toFixed(4) }}</td>
        </tr>
      </tbody>
    </table>

    <!-- Classification table -->
    <p class="mt-2">Classification: <strong>{{ result.classification.type }}</strong></p>
    <div v-html="result.classification.description"></div>

    <!-- magnitute table -->
    <table class="text-left table-auto divide-y divide-gray-200 mt-2">
      <caption>Magnitudes</caption>
      <thead>
        <tr>
          <th>Color</th><th class="px-2">Mag</th><th class="px-2">Min</th><th class="px-2">Max</th><th class="px-2">Mean</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="text-red-700">R</td>
          <td class="px-2">{{ result.rmag.toFixed(2) }}</td>
          <td class="px-2">{{ result.magrmax.toFixed(2) }}</td>
          <td class="px-2">{{ result.magrmin.toFixed(2) }}</td>
          <td class="px-2">{{ result.magrmean.toFixed(2) }}</td>
        </tr>
        <tr>
          <td class="text-green-700">G</td>
          <td class="px-2">{{ result.gmag.toFixed(2) }}</td>
          <td class="px-2">{{ result.maggmax.toFixed(2) }}</td>
          <td class="px-2">{{ result.maggmin.toFixed(2) }}</td>
          <td class="px-2">{{ result.maggmean.toFixed(2) }}</td>
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
      type: Object,
      required: true
    }
  },
  setup () {
    return {}
  }
})
</script>
