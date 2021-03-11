<template>
  <div class="home">
    <LasairQuery />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LasairQuery from '@/components/LasairQuery.vue'

export default defineComponent({
  name: 'Home',
  components: {
    LasairQuery
  }
})
</script>
