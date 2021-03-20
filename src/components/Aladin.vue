<template>
  <div class="min-w-full mt-4" style="height:400px;" id="aladin"></div>
</template>
<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import jQuery from 'jquery'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const window: any
window.jQuery = window.$ = jQuery

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
  setup (props) {
    const loadAladin = () => {
      console.log('confused')
      return new Promise<void>((resolve) => {
        const script = document.createElement('script')
        script.setAttribute(
          'src',
          'https://aladin.u-strasbg.fr/AladinLite/api/v2/latest/aladin.min.js'
        )
        script.async = true
        script.onload = () => {
          resolve()
        }
        document.head.appendChild(script)
      })
    }
    onMounted(() => {
      loadAladin().then(() => {
        window.A.aladin('#aladin', { survey: 'P/DSS2/color', fov: 0.15, target: `${props.ra} ${props.dec}` })
      })
    })
    return {}
  }
})
</script>
<style>
  @import "https://aladin.u-strasbg.fr/AladinLite/api/v2/latest/aladin.min.css";
</style>
