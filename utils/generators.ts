// header labels generation
import {RevoGrid} from "@revolist/revogrid/dist/types/interfaces";
import {VNode} from "@revolist/revogrid/dist/types/stencil-public-runtime";

export function generateHeader(index: number) {
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

export function generateFakeDataObject(rowsNumber: number, colsNumber: number) {
    const result: {[key: string]: string}[] = [];
    const headers: RevoGrid.ColumnData = [];
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
                cellTemplate: (h: Function, props: RevoGrid.ColumnDataSchemaModel): VNode => {
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