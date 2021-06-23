<template>
  <div :class="alertStyle" class="border px-4 py-3 rounded relative mt-2" v-if="alert.message" role="alert">
    <span class="block sm:inline">{{ alert.message }}</span>
    <span class="absolute top-0 bottom-0 right-0 px-4 py-3 cursor-pointer" @click="dismiss">
      <Cross :color="alert.type === 'alert-danger' ? 'text-red-400' : 'text-green-400'"></Cross>
    </span>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from '@/store/index'

import Cross from '@/components/ui/icons/Cross.vue'

export default defineComponent({
  components: {
    Cross
  },
  setup () {
    const store = useStore()
    const route = useRoute()
    const alert = computed(() => store.state.alert)
    const alertStyle = computed(() => {
      if (store.state.alert.type === 'alert-danger') {
        return 'bg-red-100 border-red-400 text-red-700'
      } else {
        return 'bg-green-100 border-green-400 text-green-700'
      }
    })
    watch(() => route.path, () => {
      store.dispatch('alert/clear')
    })
    const dismiss = () => {
      store.dispatch('alert/clear')
    }
    return {
      alert,
      dismiss,
      alertStyle
    }
  }
})
</script>
