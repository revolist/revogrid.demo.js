import Vue from 'vue';
const people = require('../assets/people').default;

// Set ignore web-component and avoid parsing it as vuejs
Vue.config.ignoredElements = [/revo-\w*/];

const RevoGrid = Vue.component('revogrid-vue-wrapper', {
    template: '<revo-grid class="grid-component left" theme="compact" :source.prop="source" :columns.prop="columns"/>',
    data() {
        return {
            asc: true,
            columns: [
                {
                    prop: 'name',
                    name: 'Name',
                    sortable: true,
                    readonly: true,
                    size: 250
                },
                {
                    prop: 'eyeColor',
                    name: 'Eyes',
                    size: 100,
                    rowDrag: true,
                    cellTemplate: (createElement, props) => {
                        const text = props.model[props.prop];
                        return createElement('span', {
                            class: 'bubble small',
                            style: {
                                backgroundColor: props.model[props.prop]
                            },
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
                    cellTemplate: (_h, props) => {
                        const text = props.model[props.prop];
                        return text === 'male' ? '♂' : '♀';
                    },
                    size: 80,
                }
            ],
            source: people
        };
    },
});

export default RevoGrid;
