<template>
  <div>
    <div class="bg-blue-200 border-b border-gray-500 text-lg p-2">TNS Cone Search</div>
    <p>For <em>{{ props.ra.toFixed(2) }}, {{ props.dec.toFixed(2) }}</em></p>
    <table class="table-auto divide-y divide-gray-200 mt-2">
      <thead>
        <tr>
          <th>Object Name</th><th class="px-2">Prefix</th><th class="px-2">Object Id</th>
        </tr>
      </thead>
      <tbody>
        <tr @click="getDetails(result.objname)" v-for="result in results" v-bind:key="result.objid" class="hover:bg-blue-200 cursor-pointer">
          <td>{{ result.objname }}</td>
          <td class="px-2">{{ result.prefix }}</td>
          <td class="px-2">{{ result.objid }}</td>
        </tr>
      </tbody>
    </table>
    <div class="bg-gray-400 m-2 p-2" v-if="details">
      <strong>{{ details.objname }}</strong>
      <br/>
      <a :href="'https://www.wis-tns.org/object/' + details.objname" target="_blank"> View on TNS</a>
      <table class="table-auto">
        <tbody>
          <tr>
            <td>Redshift</td><td>{{ details.redshift }}</td>
          </tr>
          <tr>
            <td>Host Name</td><td>{{ details.hostname }}</td>
          </tr>
          <tr>
            <td>Host Redshift</td><td>{{ details.host_redshift }}</td>
          </tr>
          <tr>
            <td>Internal Names</td><td>{{ details.internal_names }}</td>
          </tr>
          <tr>
            <td>Discovery Date</td><td>{{ details.discoverydate }}</td>
          </tr>
          <tr>
            <td>Reporter</td><td>{{ details.reporter }}</td>
          </tr>
          <tr>
            <td>Reporter Id</td><td>{{ details.reporterid }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      Click on a row to view additional details.
      <Spinner v-show="loadingDetails"></Spinner>
    </div>
  </div>
</template>
<script lang="ts">
import alertApi from '@/api/alerts'
import { defineComponent, onMounted, ref } from 'vue'
import Spinner from '@/components/ui/icons/Spinner.vue'

export default defineComponent({
  props: {
    ra: {
      type: Number,
      required: true
    },
    dec: {
      type: Number,
      required: true
    }
  },
  components: {
    Spinner
  },
  setup (props) {
    const results = ref([])
    const error = ref(null)
    const loading = ref(false)
    const details = ref(null)
    const loadingDetails = ref(false)

    const fetchTnsCone = async () => {
      results.value = []
      loading.value = true
      error.value = null

      try {
        results.value = await alertApi.tnsCone(props.ra, props.dec)
        loading.value = false
      } catch (e) {
        error.value = e
      }
    }

    onMounted(() => {
      fetchTnsCone()
    })

    const getDetails = async (objname: string) => {
      loadingDetails.value = true
      error.value = null
      try {
        details.value = await alertApi.tnsDetail(objname)
        loadingDetails.value = false
      } catch (e) {
        error.value = e
      }
    }

    return { results, loading, error, props, getDetails, details, loadingDetails }
  }
})
</script>
