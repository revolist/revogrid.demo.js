import {ColumnDataSchema, DataType} from "@revolist/revogrid/dist/types/interfaces";
import {HTMLStencilElement} from "@revolist/revogrid/dist/types/stencil-public-runtime";
import {Components} from "@revolist/revogrid/dist/types/components";

interface HTMLRevoGridElement extends Components.RevoGrid, HTMLStencilElement {}
export default {
    title: 'Source Api/Typescript'
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

    // fake data generation as Object input source
    function generateFakeDataObject(rowsNumber: number, colsNumber: number) {
        const result: DataType[] = [];
        const headers: ColumnDataSchema[] = [];
        const all = colsNumber * rowsNumber;
        for (let j: number = 0; j < all; j++) {
            let col: number = j%colsNumber;
            let row: number = j/colsNumber|0;
            if (!result[row]) {
                result[row] = {};
            }
            result[row][col] = row + ':' + col;
            if (!headers[col]) {
                headers[col] = {
                    name: generateHeader(col),
                    prop: col.toString()
                }
            }
        }
        return {
            rows: result,
            headers: headers
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
