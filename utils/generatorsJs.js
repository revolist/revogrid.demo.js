// header labels generation
export function generateHeader(index) {
    let dividend = index + 1;
    let columnLabel = '';
    let modulo;
    while (dividend > 0) {
        modulo = (dividend - 1) % 26;
        columnLabel = String.fromCharCode(65 + modulo) + columnLabel;
        dividend = parseInt(((dividend - modulo) / 26).toString(), 10);
    }
    return columnLabel;
}

// fake data generation as Array input source
export function generateFakeData(rowsNumber, colsNumber) {
    const result = [];
    const rowMin = [];
    const headers = [];
    for (let j = 0; j < colsNumber; j++) {
        rowMin.push(j);
        headers.push({
            prop: j,
            name: generateHeader(j),
            cellTemplate: (h, props) => {
                const text = props.model[props.prop];
                return h('div', {
                    style: {
                        backgroundColor: j%4 ? undefined : 'gray'
                    },
                    class: 'inner-cell'
                },  text);
            }
        });
    }
    for (let i = 0; i < rowsNumber; i++) {
        result.push(rowMin);
    }
    return {
        rows: result,
        headers: headers
    };
}