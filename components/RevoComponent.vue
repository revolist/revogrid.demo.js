<template>
    <revo-grid
            class="grid-component"
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
        methods: {
            columnClick(e) {
                const col = e.detail.prop;
                const s = this.source.sort((a, b) => {
                    if(a[col] < b[col]) { return this.asc ? -1 : 1; }
                    if(a[col] > b[col]) { return this.asc ? 1 : -1; }
                    return 0;
                });
                this.asc = !this.asc;
                this.source = [...s];
            }
        },
    }
</script>

<style lang="scss">
    .grid-component {
        .header-wrapper {
            :not(.group-row) {
                .data-header-cell {
                    cursor: pointer;
                    &:hover {
                        background: #d9fcff;
                    }
                }
            }
        }
    }
</style>