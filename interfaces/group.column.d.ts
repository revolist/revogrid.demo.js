interface ColumnDataSchemaGrouping {
    // children can be group or regular column
    children: (ColumnDataSchemaGrouping | ColumnDataSchemaRegular)[];
    name: string;
}
