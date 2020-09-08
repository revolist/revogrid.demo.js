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

export const CustomEditor = () => {
    const customSelect = function (column, editCallback) {
        return {
            element: null, // will be setup up after render
            editCell: null, // will be setup up after render
            /**
             * required, define custom component structure
             * @param createElement: (tagName: string, properties?: object, value?: any, children: Array) => VNode
             */
            render(createElement) {
                return createElement(
                    'select',
                    {
                        class: { 'customSelect': true },
                        // call editCallback when editing finished
                        onChange: (e) => editCallback(e.target.value)
                    },
                    undefined,
                    getOptions(createElement, column.source, this.editCell.val)
                );
            },
            componentDidRender() {}, // optional, called after component rendered
            disconnectedCallback() {}, // optional, called after component destroyed

        };

        function getOptions(createElement, source, defaultValue) {
            const options = [];
            for (let i = 0; i < source.length; i++) {
                options.push(
                    createElement(
                        'option',
                        {
                            value:  source[i],
                            selected: defaultValue === source[i]
                        },
                        source[i]
                    )
                );
            }
            return options;
        }
    };
    const columns = [{
        name: 'Person',
        prop: 'name',
        editor: 'select', // define editor name
        source: ['John', 'Nataniel', 'Steve'],
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
        name: 'John',
        age: 20
    }];

    const div = document.createElement('div');
    div.innerHTML = '<revo-grid class="grid-component small"></revo-grid>';

    const grid = div.querySelector('revo-grid');

    // define editor
    grid.editors = {
        'select': customSelect
    };
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
