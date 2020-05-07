import {generateFakeData} from "../utils";
import { applyPolyfills, defineCustomElements } from '@revolist/revogrid/loader';
applyPolyfills().then(() => {
    defineCustomElements();
});

export default {
    title: 'Basic'
};


const GettingStartedStory = function () {
    const div = document.createElement('div');
    div.innerHTML = '<revo-grid class="grid-component"></revo-grid>';


    const grid: HTMLRevoGridElement|null = div.querySelector('revo-grid');
    if (grid) {
        const data = generateFakeData(1000, 100);
        grid.columns = data.headers;
        grid.source = data.rows;
    }
    return div;
};

GettingStartedStory.story = {
    name: 'Getting started'
};

export {
    GettingStartedStory
};
