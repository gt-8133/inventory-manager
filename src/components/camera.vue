<template>
  <div>
    <div id="app">
      <div class="sidebar">
        <section class="cameras">
          <h2>Cameras</h2>
          <ul>
            <li
              v-if="cameras.length === 0"
              class="empty"
            >No cameras found</li>
            <li
              v-for="(camera,i) in cameras"
              :key="i"
            >
              <span
                v-if="camera.id == activeCameraId"
                :title="formatName(camera.name)"
                class="active"
              >{{ formatName(camera.name) }}</span>
              <span
                v-if="camera.id != activeCameraId"
                :title="formatName(camera.name)"
              >
                <a @click.stop="selectCamera(camera)">{{ formatName(camera.name) }}</a>
              </span>
            </li>
          </ul>
        </section>
        <section class="scans">
          <h2>Scans</h2>
          <ul v-if="scans.length === 0">
            <li class="empty">No scans yet</li>
          </ul>
          <transition-group
            name="scans"
            tag="ul"
          >
            <li
              v-for="scan in scans"
              :key="scan.date"
              :title="scan.content"
            >{{ scan.content }}</li>
          </transition-group>
        </section>
      </div>
      <div class="preview-container">
        <video id="preview" />
      </div>
    </div>
  </div>
</template>

<script>
import Instascan from 'instascan'

export default {
  data() {
    return {
      scanner: null,
      activeCameraId: null,
      cameras: [],
      scans: [],
    }
  },
  mounted() {
    const self = this
    self.scanner = new Instascan.Scanner({
      video: document.getElementById('preview'),
      scanPeriod: 5,
    })
    self.scanner.addListener('scan', (content, image) => {
      self.scans.unshift({ date: +(Date.now()), content })
    })
    Instascan.Camera.getCameras().then((cameras) => {
      self.cameras = cameras
      if (cameras.length > 0) {
        self.activeCameraId = cameras[0].id
        self.scanner.start(cameras[0])
      } else {
        console.error('No cameras found.')
      }
    }).catch((e) => {
      console.error(e)
    })
  },
  methods: {
    formatName(name) {
      return name || '(unknown)'
    },
    selectCamera(camera) {
      this.activeCameraId = camera.id
      this.scanner.start(camera)
    },
  },
}
</script>
