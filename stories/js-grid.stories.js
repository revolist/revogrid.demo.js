import {generateFakeData} from "../utils/generatorsJs";

export default {
    title: 'Source/Example/JavaScript',
    id: 'js',
    component: 'revo-grid',
};

export const Default = () => {
    const div = document.createElement('div');
    div.innerHTML = '<revo-grid class="grid-component"></revo-grid>';
    const grid = div.querySelector('revo-grid');

    if (grid) {
        const data = generateFakeData(1000, 100);
        grid.columns = data.headers;
        grid.source = data.rows;
    }
    return div;
};


export const CustomCell = () => {
    const columns = [{
        name: 'Person',
        prop: 'name',
        cellTemplate: (h, props) => {
            return h('span', {
                style: {
                    color: 'red'
                },
            }, props.model[props.prop]);
        },
    }];

    const source = [{
        name: 'Steve'
    }, {
        name: 'John'
    }];

    const div = document.createElement('div');
    div.innerHTML = '<revo-grid class="grid-component small"></revo-grid>';

    const grid = div.querySelector('revo-grid');
    grid.columns = columns;
    grid.source = source;

    return div;
};




export const ColumnResize = () => {
    const columns = [{
        name: 'Person',
        prop: 'name',
        resize: true
    },
    {
        name: 'Age',
        prop: 'age',
        resize: true
    }];

    const source = [{
        name: 'Steve',
        age: 10
    }, {
        name: 'John'
    }];

    const div = document.createElement('div');
    div.innerHTML = '<revo-grid class="grid-component small"></revo-grid>';

    const grid = div.querySelector('revo-grid');
    grid.resize = true;
    grid.columns = columns;
    grid.source = source;

    return div;
};
