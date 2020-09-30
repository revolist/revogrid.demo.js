
<script>
    import Vue from 'vue';
    const people = require('../assets/people').default;
    Vue.config.ignoredElements = [/revo-\w*/]; // Set ignore web-component and avoid parsing it as vuejs
    export default {
        name: 'revo-component',
        props: ['canFocus', 'colSize', 'columns', 'editors', 'frameSize', 'pinnedBottomSource', 'pinnedTopSource', 'range',
        'readonly', 'refresh', 'resize', 'rowClass', 'rowSize', 'source', 'theme'],
        data() {
            return {
                asc: true
            };
        },
        render: function (createElement) {
            return createElement(
                'revo-grid',
                {
                   class: "grid-component",
                   domProps: this.$props
                },
            );
        },
    }
</script>
