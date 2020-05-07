import {DataType} from "@revolist/revogrid/dist/types/interfaces";

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

export function generateFakeData(rowsNumber: number, colsNumber: number) {
    const result: DataType[] = [];
    const rowMin: number[] = [];
    const headers = [];
    for (let j = 0; j < colsNumber; j++) {
        rowMin.push(j);
        headers.push({
            prop: j,
            name: generateHeader(j),
            cellTemplate: (h: Function, props: any) => {
                const text = props.model[props.prop];
                return h('div', {
                    style: {
                        backgroundColor: j%4 ? undefined : 'red'
                    },
                    class: 'inner-cell'
                },  text);
            }
        });
    }
    for (let i = 0; i < rowsNumber; i++) {
        result.push(rowMin as unknown as DataType);
    }
    return {
        rows: result,
        headers: headers
    };
}


export function generateFakeDataObject(rowsNumber: number, colsNumber: number) {
    const result = [];
    const rowData = [];
    const headers = [];
    for (let j = 0; j < colsNumber; j++) {
        rowData.push(j.toString());
        headers.push({
            prop: j,
            name: generateHeader(j),
            cellTemplate: (h: Function, props: any) => {
                return h('div', {
                    style: {
                        backgroundColor: j%2 ? 'red' : undefined
                    },
                    class: 'inner-cell'
                }, props.model[props.prop] || '');
            }
        });
    }
    for (let i = 0; i < rowsNumber; i++) {
        result.push(rowData);
    }
    return {
        rows: result,
        headers: headers
    };
}