<template>
  <div>
    <v-text-field
      ref="fileTextField"
      v-model="filename"
      prepend-icon="attach_file"
      single-line
      :label="label.toUpperCase()"
      :required="required"
      :disabled="disabled"
      @click.native="onFocus"
    />
    <input
      ref="fileInput"
      type="file"
      :accept="accept"
      :multiple="multiple"
      :disabled="disabled"
      @change="onFileChange"
    >
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: [Array, String],
      default: 'asdf',
    },
    accept: {
      type: String,
      default: '*',
    },
    label: {
      type: String,
      default: 'choose_file',
    },
    required: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      filename: '',
    }
  },
  watch: {
    value(v) {
      this.filename = v
    },
  },
  mounted() {
    this.filename = this.value
  },
  methods: {
    getFormData(files) {
      const forms = []
      // eslint-disable-next-line
      for (const file of files) {
        const form = new FormData()
        form.append('data', file, file.name)
        forms.push(form)
      }
      return forms
    },
    onFocus() {
      if (!this.disabled) {
        this.$refs.fileInput.click()
      }
    },
    onFileChange($event) {
      const files = $event.target.files || $event.dataTransfer.files
      const form = this.getFormData(files)
      if (files) {
        if (files.length > 0) {
          this.filename = [...files].map(file => file.name).join(', ')
        } else {
          this.filename = null
        }
      } else {
        this.filename = $event.target.value.split('\\').pop()
      }
      this.$emit('input', this.filename)
      this.$emit('formData', form)
    },
  },
}

/* EXAMPLE

<template>
  <fileInput
    v-model="filename"
    @formData="()=>({})"
  >
    <v-btn @click.native="uploadFiles" />
  </fileInput>
</template>
<script>
import fileInput from './components/file-input.vue'

export default {
  ...
  components: {
    fileInput
  }
}

*/
</script>

<style scoped>
  input[type=file] {
    position: absolute;
    left: -99999px;
  }
</style>
