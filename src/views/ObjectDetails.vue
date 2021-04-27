<template>
  <div class="main">
    <p>Please enter a ZTF ObjectId. This service will attempt to gather information from a variety of services
      and display the results.
    </p>
    <BulkQuery />
  </div>
</template>
<script>
import BulkQuery from '@/components/BulkQuery.vue'
import { defineComponent, onMounted } from 'vue'
import { useStore } from '@/store/index'
export default defineComponent({
  components: {
    BulkQuery
  },
  setup () {
    const store = useStore()
    onMounted(() => {
      store.dispatch('fetchTargets')
    })
    return {}
  }
})
</script>
