import {addDecorator, addParameters} from "@storybook/client-api";

addParameters({
    options: {
        showRoots: true
    },
    dependencies: {
        //display only dependencies/dependents that have a story in storybook
        //by default this is false
        withStoriesOnly: true,

        //completely hide a dependency/dependents block if it has no elements
        //by default this is false
        hideEmpty: true,
    }
});

const storyAsString = (story) => `<div class="container m-5">${story}</div>`;
const storyAsNode = (story) => {
    const head = document.head || document.getElementsByTagName('head')[0];
    const style = document.createElement('style');
    const css = require('!css-to-string-loader!css-loader!../stories/global.css');
    head.appendChild(style);

    style.type = 'text/css';
    style.appendChild(document.createTextNode(css));
    console.log(head);


    const wrapper = document.createElement('div');
    wrapper.className = 'container m-5';
    wrapper.appendChild(story);
    return wrapper;
};

addDecorator(story => {
    const tale = story();
    return typeof tale === "string" ? storyAsString(tale) : storyAsNode(tale);
});
