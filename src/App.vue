<template>
  <component :is='component'>
    <slot />
  </component>
</template>

<script >
import Main from './layouts/Main.vue'

export default {
  name: 'App',
  computed: {
    component() {
      return Main
    },
  },
}
</script>
