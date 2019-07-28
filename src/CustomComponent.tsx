import React from 'react';
import { history } from "./history";

export interface IRouteProps {
    location: any;
}

export interface IConnectionObserverProps {
    connectionsStore?: any;
}

export class CustomComponent<U, T> extends React.Component<U, T> {
    private history;

    constructor(props) {
        super(props);

        this.history = history;
    }

    go(path, params) {
        this.history.push(path, params);
    }

    getRouteParams(): any {
        const props = this.props as any;
        const state = props.location.state;
        const params = props.match.params;

        return {...params, ...state};
    }

    getRouteParam(name): any {
        const params = this.getRouteParams();
        return params[name];
    }
}
