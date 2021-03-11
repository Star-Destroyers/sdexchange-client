<template>
  <div class="main">
    <h1>Object Details</h1>
    <p>Please enter a ZTF ObjectId. This service will attempt to gather information from a variety of services
      and display the results.
    </p>
    <BulkQuery />
  </div>
</template>
<script>
import BulkQuery from '@/components/BulkQuery.vue'
import { defineComponent } from 'vue'
export default defineComponent({
  components: {
    BulkQuery
  },
  setup () {
    return {}
  }
})
</script>
