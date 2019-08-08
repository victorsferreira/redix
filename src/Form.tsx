import React from "react";
import { IConnection, IConnectionRequest } from "./types";
import { ConnectionsProvider } from "./ConnectionsProvider";
import { history } from "./history";
import { Button } from "./Button";
import { StyledForm } from "./styled";

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

        history.push("/home");
    }

    render() {
        const data: any = this.props.data || {};
        return (
            <StyledForm className="connection-form">
                <div className="controls">
                    <Button
                        className="save green"
                        onClick={this.save.bind(this)}
                        icon="save"
                    >
                        Save
                    </Button>
                </div>

                <div className="main">
                    <input defaultValue={data.name} onChange={this.onChangeHandler.bind(this, 'name')} placeholder="Name" type="text" />
                    <input defaultValue={data.host} onChange={this.onChangeHandler.bind(this, 'host')} placeholder="Host" type="text" />
                    <input defaultValue={data.port} onChange={this.onChangeHandler.bind(this, 'port')} placeholder="Port" type="text" />
                    <input defaultValue={data.password} onChange={this.onChangeHandler.bind(this, 'password')} placeholder="Password" type="password" />
                </div>
            </StyledForm>
        );
    }
}