// header labels generation
import {RevoGrid} from "@revolist/revogrid/dist/types/interfaces";

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
                prop: col
            }
        }
    }
    return {
        rows: result,
        headers
    };
}