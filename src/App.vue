<template>
  <RouterView/>
</template>

<script>
import {RouterView} from 'vue-router'
import {useStore} from './stores'

export default {
  name: 'App',
  components: {
    RouterView,
  },
  mounted() {
    const store = useStore()
    const electronAPI = window.electronAPI

    if (electronAPI) {
      this.handleEndClicks(electronAPI, store)
      this.handleMouseMovements(electronAPI, store)
      this.handleEndScreenshots(electronAPI, store)
      this.handleScreenshotsProgress(electronAPI, store)
    }
  },

  methods: {
    handleEndClicks(electronAPI, store) {
      electronAPI.on('end-clicks', (clicksData, time, full_dimensions) => {
        store.setClicksData(clicksData)
        store.setTotalTime(time)
        store.setDimensionsPerUrl(full_dimensions)
        console.log('clicks data', clicksData)
      })
    },

    handleMouseMovements(electronAPI, store) {
      electronAPI.on('end-mouse', (movementsData, time, full_dimensions) => {
        store.setMovementsData(movementsData)
        store.setTotalTime(time)
        store.setDimensionsPerUrl(full_dimensions)
        console.log('mouse movements', movementsData)
      })
    },

    handleEndScreenshots(electronAPI, store) {
      electronAPI.on('end-screenshots', (images) => {
        store.setUrlImages(images)
      })
    },

    handleScreenshotsProgress(electronAPI, store) {
      electronAPI.on('screenshots-progress', (progress, fails) => {
        store.setProgress(progress, fails)
      })
    },
  },
}
</script>

<style></style>
