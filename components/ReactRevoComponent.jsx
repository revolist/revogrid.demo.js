import * as React from "react";
import {RevoGrid} from '@revolist/revogrid-react';

export default class ReactRevoComponent extends React.Component {
    constructor(props) {
        super(props);
        const columns = [{ name: 'Person', prop: 'name', }];
        const source = [{ name: 'Steve' }, { name: 'John', }];
        this.state = { columns, source };
    }

    // edit event catch
    afterEdit(e) {
        console.log(e.detail);
    }

    render() {
        return <RevoGrid columns={this.state.columns} source={this.state.source} onAfterEdit={this.afterEdit}/>;
    }
}
