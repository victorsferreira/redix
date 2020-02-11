import React, { Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

export interface IRouteProps {
    location: any;
}

export interface IConnectionObserverProps {
    connectionsStore?: any;
}

export class CustomComponent<U, T> extends React.Component<U, T> {
    protected history: any;

    constructor(props) {
        super(props);

        this.history = (global as any).HISTORY;
    }

    go(path, params = {}) {
        const props = this.props as any;
        props.history.push(path, params);
    }

    getRouteParams(): any {
        const props = this.props as any;
        const state = props.location.state;
        const params = props.match.params;

        return { ...params, ...state };
    }

    getRouteParam(name): any {
        const params = this.getRouteParams();
        return params[name];
    }
}

export const CustomComponentWithRouter = withRouter<any, any>(CustomComponent);

// interface III {
//     history?: any;
// }

// export class Foo<U, T> extends CustomComponentWithRouter<RouteComponentProps & III & U, T>{
    
//     render() {
//         return <CustomComponentWithRouter {...this.props} />
//     }
// }