import {generateHeader} from "../utils/generate-header";
const people = require('../assets/people').default;

export default {
    title: 'Source/Example/Overview'
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
                    cellTemplate: (h, props) => {
                        return h('div', {
                            style: {
                                backgroundColor: props.model[props.prop],
                                opacity: '0.6'
                            },
                            class: {
                                'inner-cell': true
                            }
                        }, props.model[props.prop] || '');
                    },
                },
                {
                    name: 'Age',
                    prop: 'age',
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
        })
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


export const basicSample = () => {
    const div = document.createElement('div');
    div.innerHTML = '<revo-grid class="grid-component"></revo-grid>';
    const grid = div.querySelector('revo-grid');

    if (grid) {
        const data = generateFakeDataObject(people, 100);
        grid.columns = data.headers;
        grid.source = data.rows;
        grid.pinnedTopSource = data.pinnedTopRows;
        grid.pinnedBottomSource = data.pinnedBottomRows;
    }

    return div;
};

