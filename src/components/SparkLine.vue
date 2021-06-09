<template>
  <div ref="sparkline"></div>
</template>
<script>

function drawPoint (element, x, y, color) {
  console.log('drawing a point')
  const line = document.createElementNS('http://www.w3.org/2000/svg', 'rect')

  line.setAttributeNS(null, 'x', x)
  line.setAttributeNS(null, 'y', y)
  line.setAttributeNS(null, 'width', 2)
  line.setAttributeNS(null, 'height', 2)

  line.setAttributeNS(null, 'stroke', color)
  line.setAttributeNS(null, 'stroke-width', 2)

  element.appendChild(line)
}

function createSparkline (data, spacing, height, color, element) {
  console.log(data)
  const min = Math.min(...data.filter(x => x != null))
  const max = Math.max(...data.filter(x => x != null))
  const range = max - min
  const pixelsperunit = height / range

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')

  svg.setAttributeNS(null, 'width', spacing * (data.length - 1))
  svg.setAttributeNS(null, 'height', height + 10)

  let x = 0
  for (let i = 0, l = data.length - 1; i < l; i++) {
    if (data[i] != null) {
      const y = height - ((data[i] - min) * pixelsperunit)
      drawPoint(svg, x, y, color)
    }
    x += spacing
  }

  element.appendChild(svg)
}

export default {
  name: 'SparkLine',
  props: ['sldata'],
  data () {
    return {}
  },
  mounted () {
    createSparkline(this.sldata, 3, 20, '#EB0D30', this.$refs.sparkline)
  }
}
</script>
