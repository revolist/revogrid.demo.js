<template>
    <revo-grid
            class="grid-component"
            theme="material"
            range="true"
            :source.prop="source"
            :columns.prop="columns"
            :pinnedTopSource.prop="pinnedTopSource"
            :pinnedBottomSource.prop="pinnedBottomSource"
            @headerClick="columnClick"/>
</template>

<script>
    import Vue from 'vue';
    const people = require('../assets/people').default;
    Vue.config.ignoredElements = [/revo-\w*/]; // Set ignore web-component and avoid parsing it as vuejs
    export default {
        name: 'revo-component',
        props: {
            source: {
                type: Array,
                default: () => ([]),
            },
            columns: {
                type: Array,
                default: () => ([]),
            },
            pinnedTopSource: {
                type: Array,
                default: () => ([]),
            },
            pinnedBottomSource: {
                type: Array,
                default: () => ([]),
            }
        },
        data() {
            return {
                asc: true
            };
        },
    }
</script>

<style lang="scss">
</style>