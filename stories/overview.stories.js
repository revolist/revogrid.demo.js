import VueJs from 'vue';
import RevoComponent from "../components/RevoComponent";
import {generateHeader} from "../utils/generate-header";

const people = require('../assets/people').default;
const Vue = VueJs;

const columns = [
	{
		name: 'Name',
		prop: 'name',
		rowDrag: true,
		sortable: true,
		order: 'asc',
		size: 200,
		pin: 'colPinStart',
		// readonly: true
	},
	{
		name: 'Personal',
		children: [
			{
				name: 'Eyes',
				prop: 'eyeColor',
				sortable: true,
				cellTemplate: (createElement, props) => {
						return createElement('span', {
								class: 'bubble',
								style: {
										backgroundColor: props.model[props.prop]
								},
						}, props.model[props.prop]);
				},
			},
			{
				sortable: true,
				name: 'Age',
				prop: 'age',
				// pin: 'colPinEnd',
			},
			{
				sortable: true,
				name: 'Company',
				prop: 'company',
				size: 100,
			},
		]
	}
];

export default {
    title: 'Source/Example/Overview',
    id: 'overview'
};

export const story = (a, b) => {
	const data = generateFakeDataObject(people, 100);
	let theme = 'material';
	if (a.theme) {
		theme = a.theme;
	}
    const vueJsGs = () => {
        new Vue({
            components: {
                RevoComponent
            },
            render: createElement => createElement('revo-component', {
				attrs: {
					'row-headers': true,
				},
                props: {
                    source: data.rows,
					columns: data.headers,
					theme: theme,
					rowClass: 'highlighted',
					range: true,
					pinnedTopSource: data.pinnedTopRows,
                    // pinnedBottomSource: data.pinnedBottomRows,
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

    for (let j = 0; j < colsNumber; j++) {
        columns.push({
            name: generateHeader(j),
            prop: j
        });
    }

    for (let i in result) {
        result[i]['highlighted'] = result[i]['eyeColor'];
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