<template>
  <Navbar></Navbar>
  <router-view/>
</template>
<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useStore } from '@/store/index'
import Navbar from '@/layout/Navbar.vue'

export default defineComponent({
  components: {
    Navbar
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
