import '../assets/local.grid.scss';

import VueJs from 'vue';
import RevoGrid from "../components/VueJsOverview";
const Vue = VueJs;

export default {
    title: 'Source/Example/VueJs'
};

export const basicSample = () => {
    const vueJsGs = () => {
        new Vue({
            components: {
                RevoGrid
            },
            render: createElement => createElement('revogrid-vue-wrapper'),
        }).$mount('#app');
    };

    // storybook
    const div = document.createElement('div');
    div.setAttribute('id', 'app');
    setTimeout(() => vueJsGs(), 0);
    return div;
};
