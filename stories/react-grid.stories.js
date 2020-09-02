import * as React from "react";
import ReactDOM from 'react-dom';
import RevoGrid from "../components/ReactRevoComponent";

export default {
    title: 'Source/Example/ReactJs',
    id: 'react',
};


export const Default = () => {
    const div = document.createElement('div');
    div.className = 'grid-component small';

    const grid = React.createElement(RevoGrid);
    ReactDOM.render(grid, div);
    return div;
};


