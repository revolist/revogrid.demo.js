import {HTMLStencilElement} from '@revolist/revogrid/dist/types/stencil-public-runtime';
import {Components} from '@revolist/revogrid/dist/types/components';
import {generateFakeDataObject} from '../utils/generators';

interface HTMLRevoGridElement extends Components.RevoGrid, HTMLStencilElement {}
export default {
    title: 'Source/Example/Typescript',
    id: 'ts'
};

export const basicSample = () => {
    const div: HTMLDivElement = document.createElement('div');
    div.innerHTML = '<revo-grid class="grid-component"></revo-grid>';

    const grid: HTMLRevoGridElement|null = div.querySelector('revo-grid');
    if (grid) {
        const data = generateFakeDataObject(1000, 100);
        grid.columns = data.headers;
        grid.source = data.rows;
    }
    return div;
};
