import Vue from 'vue';
const people = require('../assets/people').default;

// Set ignore web-component and avoid parsing it as vuejs
Vue.config.ignoredElements = [/revo-\w*/];

const RevoGrid = Vue.component('revogrid-vue-wrapper', {
    template: '<revo-grid class="grid-component" :source.prop="source" :columns.prop="columns" @headerClick="columnClick"/>',
    data() {
        return {
            asc: true,
            columns: [
                {
                    prop: 'name',
                    name: 'Name',
                    readonly: true,
                    pin: 'colPinStart',
                    size: 250
                },
                {
                    prop: 'eyeColor',
                    name: 'Eyes',
                    size: 350,
                    cellTemplate: (h, props) => {
                        const text = props.model[props.prop];
                        return h('div', {
                            class: `inner-cell ${text}`
                        },  text);
                    }
                },
                {
                    prop: 'age',
                    name: 'Age',
                    readonly: true,
                    size: 100
                },
                {
                    prop: 'email',
                    name: 'Mail',
                    readonly: true,
                    size: 250
                },
                {
                    prop: 'gender',
                    name: 'Gender',
                    pin: 'colPinEnd',
                    cellTemplate: (h, props) => {
                        const text = props.model[props.prop];
                        return h('i', { class: `fas ${text === 'male' ? 'fa-mars' : 'fa-venus'}` },  '');
                    },
                    size: 80,
                }
            ],
            source: people
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
});

export default RevoGrid;
