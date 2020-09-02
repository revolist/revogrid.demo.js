interface ColumnDataSchemaRegular {
    name: string;
    readonly?: boolean|((row: number, col: number) => boolean);
    size?: number;
    minSize?: number;
    cellTemplate?: (generator: FuncGenerator, props: ColumnDataSchemaModel) => VNode;
    prop: string|number;
    pin?: 'colPinStart'|'colPinEnd';
}

type VNode = Object; // Stencil virtual node generated based on FuncGenerator

type ColumnDataSchemaModel = {
    prop: string|number;
    model: any;
    data: DataSource;
};

type FuncGenerator = (h: HyperFunc<VNode>, props: ColumnDataSchemaModel) => VNode;

interface HyperFunc<T> {
    (sel: string, data?: object, text?: string): T;
}

type DataType = { [prop: string]: any };
type DataSource = DataType[];
