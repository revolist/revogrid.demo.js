import {
    ColumnData,
    ColumnDataSchemaModel
} from "@revolist/revogrid/dist/types/interfaces";
import {HTMLStencilElement, VNode} from "@revolist/revogrid/dist/types/stencil-public-runtime";
import {Components} from "@revolist/revogrid/dist/types/components";

interface HTMLRevoGridElement extends Components.RevoGrid, HTMLStencilElement {}
export default {
    title: 'Source/Example/Typescript'
};

export const basicSample = () => {

    // header labels generation
    function generateHeader(index: number) {
        let dividend: number = index + 1;
        let columnLabel = '';
        let modulo;
        while (dividend > 0) {
            modulo = (dividend - 1) % 26;
            columnLabel = String.fromCharCode(65 + modulo) + columnLabel;
            dividend = parseInt(((dividend - modulo) / 26).toString(), 10);
        }
        return columnLabel;
    }

    function generateFakeDataObject(rowsNumber: number, colsNumber: number) {
        const result: {[key: string]: string}[] = [];
        const headers: ColumnData = [];
        const all = colsNumber * rowsNumber;
        for (let j = 0; j < all; j++) {
            let col = j%colsNumber;
            let row = j/colsNumber|0;
            if (!result[row]) {
                result[row] = {};
            }
            result[row][col] = row + ':' + col;
            if (!headers[col]) {
                headers[col] = {
                    name: generateHeader(col),
                    prop: col,
                    pin: j === 4 || j === 10 ? 'colPinStart' : j === 6 || j === 9 ? 'colPinEnd' : undefined,
                    readonly: !!(col%2),
                    cellTemplate: (h: Function, props: ColumnDataSchemaModel): VNode => {
                        return h('div', {
                            class: {
                                'inner-cell': true,
                                'active': j%2
                            }
                        }, props.model[props.prop.toString()] || '');
                    }
                }
            }
        }
        const pinnedTopRows = result[10] && [result[10]] || [];
        const pinnedBottomRows = result[1] && [result[1]] || [];
        return {
            rows: result,
            pinnedTopRows,
            pinnedBottomRows,
            headers
        };
    }


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
