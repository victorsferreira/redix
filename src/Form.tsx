import React from "react";
import { IConnection, IConnectionRequest } from "./types";
import { ConnectionsProvider } from "./ConnectionsProvider";

interface IProps {
    data?: IConnection;
}

interface IState extends IConnectionRequest { }

export class Form extends React.Component<IProps, IState> {
    private provider: ConnectionsProvider;

    constructor(props) {
        super(props);

        this.provider = new ConnectionsProvider();
    }

    onChangeHandler(fieldName, e) {
        const { value } = e.target;

        const data = {};
        data[fieldName] = value;

        this.setState(data);
    }

    save() {
        if (this.props.data && this.props.data.id) {
            // Edit
            this.provider.edit(this.props.data.id, this.state);
        } else {
            // Create
            this.provider.create(this.state);
        }
    }

    render() {
        return (
            <form>
                <input onChange={this.onChangeHandler.bind(this, 'name')} placeholder="Name" />
                <input onChange={this.onChangeHandler.bind(this, 'host')} placeholder="Host" />
                <input onChange={this.onChangeHandler.bind(this, 'port')} placeholder="Port" />
                <input onChange={this.onChangeHandler.bind(this, 'password')} placeholder="Password" type="password" />

                <button type="button" onClick={this.save.bind(this)}>Save</button>
            </form>
        );
    }
}