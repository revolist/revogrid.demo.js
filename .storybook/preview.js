import { setCustomElements } from '@storybook/web-components';
import customElements from '../assets/custom-elements.json';

setCustomElements(customElements);

const storyAsString = (story) => `<div class='container m-5'>${story}</div>`;
const storyAsNode = (story) => {
    const head = document.head || document.getElementsByTagName('head')[0];
    const style = document.createElement('style');
    const css = require('!css-to-string-loader!css-loader!../assets/global.css');
    head.appendChild(style);

    style.type = 'text/css';
    style.appendChild(document.createTextNode(css));


    const wrapper = document.createElement('div');
    wrapper.className = 'container m-5';
    wrapper.appendChild(story);
    return wrapper;
};

export const parameters = {
    options: {
        storySort: (a, b) => {
            if (a[1].kind === b[1].kind) {
                return 0;
            }
            return a[1].id.localeCompare(b[1].id, undefined, { numeric: true })
        },
    },
    dependencies: {
        //display only dependencies/dependents that have a story in storybook
        //by default this is false
        withStoriesOnly: true,

        //completely hide a dependency/dependents block if it has no elements
        //by default this is false
        hideEmpty: true,
    },
};

export const decorators = [
    story => {
        const tale = story();
        return typeof tale === 'string' ? storyAsString(tale) : storyAsNode(tale);
    },
];