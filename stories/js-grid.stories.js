import {generateFakeData} from "../utils/generatorsJs";

export default {
    title: 'Source/Example/JavaScript'
};

export const basicSample = () => {
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

