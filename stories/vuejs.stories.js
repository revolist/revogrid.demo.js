import VueJs from 'vue';
import '../assets/local.grid.scss';
const Vue = VueJs;

const people = require('../assets/people').default;

export default {
    title: 'Source Api/VueJs'
};

export const basicSample = () => {
    const vueJsGs = () => {
        Vue.config.ignoredElements = [/revo-\w*/]; // Set ignore web-component and avoid parsing it as vuejs

        Vue.component('revogrid-vue-wrapper', {
            template: '<revo-grid class="grid-component" :source.prop="source" :columns.prop="columns" :dimensions.prop="dimensions" @beforeEdit="beforeEdit" @headerClick="columnClick"/>',
            data() {
                return {
                    asc: true,
                    columns: [
                        {
                            prop: 'name',
                            name: 'Name',
                            readonly: true
                        },
                        {
                            prop: 'eyeColor',
                            name: 'Eyes',
                            cellTemplate: (h, props) => {
                                const text = props.model[props.prop];
                                return h('div', {
                                    class: `inner-cell ${text}`
                                },  text);
                            }
                        },
                        {
                            prop: 'gender',
                            name: 'Gender',
                            cellTemplate: (h, props) => {
                                const text = props.model[props.prop];
                                return h('i', { class: `fas ${text === 'male' ? 'fa-mars' : 'fa-venus'}` },  '');
                            }
                        }
                    ],
                    source: people,
                    dimensions: {
                        col: { 0: 500 }
                    }
                };
            },
            methods: {
                beforeEdit(e)  {
                    // e.detail
                },
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
        });

        new Vue({ render: h => h('revogrid-vue-wrapper') }).$mount('#app');
    };


    // storybook
    const div = document.createElement('div');
    div.setAttribute('id', 'app');
    setTimeout(() => vueJsGs(), 0);
    return div;
};
