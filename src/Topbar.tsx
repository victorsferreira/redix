import React from "react";
import { IConnection, IConnectionRequest } from "./types";
import { ConnectionsProvider } from "./ConnectionsProvider";

interface IProps {
    data?: IConnection;
}

interface IState extends IConnectionRequest { }

export class Topbar extends React.Component<IProps, IState> {
    private provider: ConnectionsProvider;

    constructor(props) {
        super(props);

        this.provider = new ConnectionsProvider();
    }

    run() {

    }

    onChangeHandler(fieldName, e) {
        const { value } = e.target;

        const data = {};
        data[fieldName] = value;

        this.setState(data);
    }

    render() {
        return (
            <form>
                <input onChange={this.onChangeHandler.bind(this, 'name')} placeholder="Name" />
                <input onChange={this.onChangeHandler.bind(this, 'host')} placeholder="Host" />
                <input onChange={this.onChangeHandler.bind(this, 'port')} placeholder="Port" />
                <input onChange={this.onChangeHandler.bind(this, 'password')} placeholder="Password" type="password" />

                <button type="button" onClick={this.run.bind(this)}>Run</button>
            </form>
        );
    }
}