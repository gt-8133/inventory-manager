<template>
  <div>
    <div id="app">
      <div class="sidebar">
        <section class="cameras">
          <v-container fluid grid-list-lg>
            <v-layout row wrap>
              <v-flex xs12>
                <v-card color="primary" class="white--text darken-1">
                  <v-card-title primary-title>
                    <div class="headline">Scan the code.</div>
                    <v-flex xs12>
                      <div>Point your camera at the QR code label.</div>
                    </v-flex>
                    <v-flex align-center align-content-center justify-center>
                      <v-flex>
                        <div class="preview-container" style="position:relative">
                          <v-select
                            v-model="activeCamera"
                            style="position:absolute;top:0;right:0;z-index:10"
                            solo
                            :items="cameras"
                            item-text="name"
                            return-object
                            append-icon="switch_camera"
                            @input="selectCamera()"
                          />
                          <!-- <v-responsive :aspect-ratio="9/9"> -->
                          <video id="preview" width="100%"/>
                          <!-- </v-responsive> -->
                        </div>
                      </v-flex>
                    </v-flex>
                  </v-card-title>
                  <!-- <v-spacer /> -->
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </section>
        <v-subheader v-if="scans.length" inset>
          <v-icon>history</v-icon>&nbsp;Recent Scans
        </v-subheader>
        <section class="scans">
          <v-list-tile v-for="item in scans" :key="item.name" avatar>
            <v-list-tile-avatar>
              <v-icon :class="[item.iconClass]">control_camera</v-icon>
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>{{ item.name }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ item.date.toISOString().substring(0, 10) }}</v-list-tile-sub-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-btn icon ripple>
                <v-icon color="grey lighten-1">info</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </section>
      </div>
    </div>

    <v-dialog
      v-if="dialogItem"
      v-model="dialog"
      :fullscreen="this.$vuetify.breakpoint.xsOnly"
      @keydown.esc="dialog=false"
    >
      <v-card>
        <v-flex xs12>
          <v-layout row wrap>
            <v-flex xs12 md3>
              <v-badge bottom right>
                <span slot="badge">{{ dialogItem.quantity }}</span>
                <v-avatar size="100">
                  <v-img :src="dialogItem.imageUrl" height="125px" contain/>
                </v-avatar>
              </v-badge>
            </v-flex>
            <v-flex xs7>
              <v-card-title primary-title>
                <div>
                  <div class="headline">{{ dialogItem.name }}</div>
                  <div>{{ dialogItem.description }}</div>
                  <div>(2013)</div>
                </div>
              </v-card-title>
            </v-flex>
          </v-layout>
          <v-divider light/>
          <v-card-actions class="pa-3">
            <v-btn @click="dialog=false">
              <v-icon>close</v-icon>
            </v-btn>

            <v-spacer/>
            <v-text-field
              v-model="dialogQuantity"
              label="amount"
              type="number"
              style="padding: 10px 20px 0 20px;vertical-align:bottom"
            />
            <v-spacer/>
            <v-btn @click="checkout">
              <v-icon dark>shopping_cart</v-icon>Checkout
            </v-btn>
          </v-card-actions>
        </v-flex>
      </v-card>
    </v-dialog>
    <v-btn @click="loadItem(1)">fake scan</v-btn>
  </div>
</template>

<script>
import * as Instascan from 'instascan'
import models from '../../server/models/models'
import io from 'socket.io-client'
// import { UserSession } from '../../server/models/models'

// const userSession = new UserSession({
//   user: {
//     id: 1,
//     firstName: 'George',
//     lastName: 'Burdell',
//     age: 130,
//   },
// })

export default {
  // components: { itemCheckout },
  data() {
    return {
      quantity: 0,
      scanner: null,
      activeCamera: null,
      cameras: [],
      // camera: null,
      scans: [],
      dialog: false,
      dialogItem: null,
      dialogQuantity: 1,
      dialogLoading: false,
    }
  },
  async mounted() {
    models.getItem(1)

    window.scanQrCode = id => {
      this.loadItem(id)
    }
    this.scanner = new Instascan.Scanner({
      video: document.getElementById('preview'),
      scanPeriod: 5,
      mirror: false,
    })
    this.scanner.addListener('scan', content => {
      this.loadItem(content)
    })
    Instascan.Camera.getCameras().then(cameras => {
      this.cameras = cameras
      if (cameras.length > 0) {
        this.activeCamera = this.cameras[this.cameras.length - 1]
        this.scanner.camera = this.activeCamera
        this.scanner.start()
      } else {
        alert('No cameras found.')
      }
    })
  },

  methods: {
    formatName(name) {
      return name || '(unknown)'
    },
    selectCamera() {
      this.scanner.camera = this.activeCamera
      this.scanner.start()
    },
    async loadItem(id) {
      console.log('load item')
      const item = await models.getItem(id)
      console.log('found item', item)
      this.dialogItem = item
      this.dialogQuantity = 1
      this.dialog = true

      /*
        this.$apollo.query({
          query: item,
          variables: { name },
          loadingKey: 'itemLoading',
        })
          .then((data) => {
            console.log(data)
            const newItem = data.data.item
            if (!this.scans.map(scan => scan.name).includes(newItem.name)) {
              this.scans.unshift({ name: newItem.name, date: new Date() })
            }
            this.dialogItem = newItem
            this.dialog = true
          })
        */
    },

    async checkout() {
      const someuser = await models.getUser()
      models.checkoutItem(this.dialogItem, this.dialogQuantity, someuser)
      this.dialog = false
    },
  },
}
</script>

<style>
/* .v-card .v-btn {
  margin: 0;
  height: 100%;
  min-width: 0;
  width: 53px;
} */

.preview-container {
  border: 6px solid white;
  border-radius: 4px;
  line-height: 0;
  /* animation: pulse 1s infinite; */
}

@keyframes pulse {
  0%,
  100% {
  }
  50% {
    border-color: rgba(0, 0, 0, 0);
  }
}

.v-select.v-input {
  flex: 0;
  display: inline-flex;
}

.v-select__selections {
  display: none;
}

.v-select .v-input__append-inner {
  margin: 0;
  padding: 0;
}
.v-dialog:not(.v-dialog--fullscreen) {
  max-width: 600px;
}
</style>
