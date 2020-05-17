import VueJs from 'vue';
import '../assets/local.grid.scss';
const Vue = VueJs;

const {applyPolyfills, defineCustomElements} = require('@revolist/revogrid/loader');
const people = require('../assets/people').default;

export default {
    title: 'Source Api/VueJs'
};

export const basicSample = () => {
    const vueJsGs = () => {
        // define custom element '<revo-grid/>', we can ignore applyPolyfills if we are not supporting IE11
        applyPolyfills().then(() => { defineCustomElements(); });
        Vue.config.ignoredElements = [/revo-\w*/]; // Set ignore web-component and avoid parsing it as vuejs

        Vue.component('revogrid-vue-wrapper', {
            template: '<revo-grid class="grid-component" :source.prop="source" :columns.prop="columns" :dimensions.prop="dimensions"/>',
            data() {
                return {
                    columns: [{
                        prop: 'name',
                        name: 'Name'
                    },
                        {
                            prop: 'eyeColor',
                            name: 'Eyes',
                            cellTemplate: (h, props) => {
                                const text = props.model[props.prop];
                                return h('div', {
                                    style: {
                                        backgroundColor: text
                                    },
                                    class: 'inner-cell'
                                },  text);
                            }
                        },
                        {
                            prop: 'gender',
                            name: 'Gender'
                        }],
                    source: people,
                    dimensions: {
                        col: { 0: 500 }
                    }
                };
            }
        });

        new Vue({ render: h => h('revogrid-vue-wrapper') }).$mount('#app');
    };


    // storybook
    const div = document.createElement('div');
    div.setAttribute('id', 'app');
    setTimeout(() => vueJsGs(), 0);
    return div;
};
