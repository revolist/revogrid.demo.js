import VueJs from 'vue';
const Vue = VueJs;

import RevoComponent from "../components/RevoComponent";
import {generateHeader} from "../utils/generate-header";
const people = require('../assets/people').default;
export default {
    title: 'Source/Example/VueJs',
    id: 'overview'
};

export const story = () => {
    const data = generateFakeDataObject(people, 100);
    const vueJsGs = () => {
        new Vue({
            components: {
                RevoComponent
            },
            render: createElement => createElement('revo-component', {
                props: {
                    source: data.rows,
                    columns: data.headers,
                    pinnedTopSource: data.pinnedTopRows,
                    pinnedBottomSource: data.pinnedBottomRows,
                }
            })
        }).$mount('#app');
    };

    // storybook
    const div = document.createElement('div');
    div.setAttribute('id', 'app');
    setTimeout(() => vueJsGs(), 0);
    return div;
};


function generateFakeDataObject(rows, colsNumber) {
    const result = [...rows];
    const columns = [
        {
            name: 'Name',
            prop: 'name',
            size: 200,
            pin: 'colPinStart',
            readonly: true
        },
        {
            name: 'Personal',
            children: [
                {
                    name: 'Eyes',
                    prop: 'eyeColor',
                    cellTemplate: (createElement, props) => {
                        return createElement('span', {
                            style: {
                                color: props.model[props.prop]
                            },
                            class: {
                                'fas fa-eye-dropper': true
                            }
                        }, '');
                    },
                },
                {
                    name: 'Age',
                    prop: 'age',
                    pin: 'colPinEnd',
                },
                {
                    name: 'Company',
                    prop: 'company',
                    size: 100,
                },
            ]
        }
    ];

    for (let j = 0; j < colsNumber; j++) {
        columns.push({
            name: generateHeader(j),
            prop: j
        });
    }

    for (let i in result) {
        for (let j = 0; j < colsNumber; j++) {
            result[i][j] = `${i}:${j}`;
        }
    }
    const pinnedTopRows = result[10] && [result[10]] || [];
    const pinnedBottomRows = result[1] && [result[1]] || [];

    return {
        rows: result,
        pinnedTopRows,
        pinnedBottomRows,
        headers: columns,
    };
}