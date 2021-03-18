<template>
  <MarsLightCurve :lightcurve="result.data"></MarsLightCurve>
  <p><pre>{{ dataDisplay }}</pre></p>
</template>
<script lang="ts">
import { defineComponent, computed, defineAsyncComponent } from 'vue'
const MarsLightCurve = defineAsyncComponent(() => import(
  /* webpackChunkName: "mars-light-curve" */ '@/components/brokers/MarsLightCurve.vue'
))

export default defineComponent({
  props: {
    result: {
      type: Object
    }
  },
  components: {
    MarsLightCurve
  },
  setup (props) {
    const dataDisplay = computed(() => {
      return JSON.stringify(props.result, null, 2)
    })

    return { data: props.result, dataDisplay: dataDisplay }
  }
})
</script>
