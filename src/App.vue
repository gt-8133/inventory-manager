<template>
    <component :is="component">
        <slot />
    </component>
</template>

<script>
    import Main from './layouts/Main.vue'
    export default {
        name: 'App',
        components: {
            Main
        },
        computed: {
            component () {
                return Main
            }
        }
    }
</script>