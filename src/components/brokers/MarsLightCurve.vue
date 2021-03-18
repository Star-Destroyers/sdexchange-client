<template>
  <div>
    <p>This is a MARS lightcurve</p>
    <div id="plot" ref="plot"></div>
  </div>
</template>
<script lang="ts">
import Plotly from 'plotly.js-basic-dist'
import { defineComponent, ref, onMounted, PropType } from 'vue'

const FILTERS = ['g', 'r', 'i']
const UNIX_EPOCH_JULIAN_DAY = 2440587
const DAY = 86400000
const FILTER_COLORSCALE = [[0, 'rgb(0, 255, 0)'], [0.5, 'rgb(255, 0, 0)'], [1, 'rgb(0, 0, 255)']]

function jdToDate (jd: number) {
  return new Date((Number(jd) - UNIX_EPOCH_JULIAN_DAY) * DAY)
}

interface Candidate {
  fid: number;
  magpsf: number;
  sigmapsf: number;
  isdiffpos: string;
  candid: number | undefined;
  jd: number;
  diffmaglim: number;
}

interface PrvCandidate {
  candidate: Candidate;
}

interface LightCurve {
  candidate: Candidate;
  prv_candidate: PrvCandidate[];
}

export default defineComponent({
  props: {
    lightcurve: {
      type: Object as PropType<LightCurve>,
      required: true
    }
  },
  setup (props) {
    const plot = ref<HTMLElement | null>(null)
    console.log(props)

    const buildSeries = (fid: number) => {
      // Finds all previous candidates of this object with the same filter that are not non-detections
      const matches = props.lightcurve.prv_candidate.filter((prvCandidate: PrvCandidate) => {
        return prvCandidate.candidate.fid === fid && prvCandidate.candidate.magpsf !== undefined
      })

      // Gets the magpsf value of all matching previous candidates
      const mags = matches.map((prvCandidate: PrvCandidate) => {
        return prvCandidate.candidate.magpsf.toFixed(2)
      })

      // Gets the error of the magpsf value of all matching previous candidates
      const magErr = matches.map((prvCandidate: PrvCandidate) => {
        return prvCandidate.candidate.sigmapsf.toFixed(2)
      })

      // Gets the timestamp of all matching previous candidates
      const jds = matches.map((prvCandidate: PrvCandidate) => {
        return prvCandidate.candidate.jd
      })

      const symbols = matches.map((prvCandidate: PrvCandidate) => {
        if (['t', '1'].includes(prvCandidate.candidate.isdiffpos)) {
          return 'circle'
        } else {
          return 'circle-open'
        }
      })

      // Adds the current candidate data for that filter to the previously constructed arrays
      if (props.lightcurve.candidate.fid === fid) {
        mags.push(props.lightcurve.candidate.magpsf.toFixed(2))
        magErr.push(props.lightcurve.candidate.sigmapsf.toFixed(2))
        jds.push(props.lightcurve.candidate.jd)
      }

      return {
        y: mags,
        x: jds.map(jd => { return jdToDate(jd) }),
        text: jds.map(jd => { return 'jd: ' + jd }),
        // eslint-disable-next-line @typescript-eslint/camelcase
        error_y: {
          type: 'data',
          array: magErr,
          visible: true,
          color: FILTER_COLORSCALE[fid - 1][1]
        },
        mode: 'markers',
        type: 'scatter',
        name: FILTERS[fid - 1],
        marker: {
          symbol: symbols,
          color: FILTER_COLORSCALE[fid - 1][1],
          size: 9
        }
      }
    }

    const buildPlot = () => {
      let filterIds = props.lightcurve.prv_candidate.map((prvCandidate: PrvCandidate) => {
        return prvCandidate.candidate.fid
      })

      filterIds.push(props.lightcurve.candidate.fid)

      filterIds = filterIds.filter((fid, index) => {
        return filterIds.indexOf(fid) === index
      })

      const plotData = []
      for (let i = 0; i < filterIds.length; i++) {
        plotData.push(buildSeries(filterIds[i]))
      }

      const nonDetections = props.lightcurve.prv_candidate.filter((prvCandidate: PrvCandidate) => {
        return prvCandidate.candidate.candid !== undefined
      })

      plotData.push({
        x: nonDetections.map(nd => { return jdToDate(nd.candidate.jd) }),
        y: nonDetections.map(nd => { return nd.candidate.diffmaglim }),
        mode: 'markers',
        type: 'scatter',
        name: 'non-detections',
        marker: {
          symbol: 'triangle-down',
          color: nonDetections.map(nd => { return (nd.candidate.fid - 1) / 2 }),
          colorscale: FILTER_COLORSCALE,
          cmin: -0.5,
          cmax: 2.5
        }
      })

      const layout = {
        title: 'Light Curve',
        yaxis: {
          title: 'magnitude',
          autorange: 'reversed'
        },
        xaxis: {
          title: 'date'
        }
      }

      if (plot.value != null) {
        Plotly.newPlot(plot.value, plotData as Plotly.Data[], layout as Plotly.Layout)
      }
    }

    onMounted(() => {
      buildPlot()
    })

    return {
      plot
    }
  }
})
</script>
