import React from "react";
import { IConnection, IConnectionRequest } from "./types";
import { ConnectionsProvider } from "./ConnectionsProvider";
import { history } from "./history";
import { Button } from "./Button";
import { StyledForm } from "./styled";
import { Col, Row } from "react-grid-system";

interface IProps {
    data?: IConnection;
}

interface IState extends IConnectionRequest {
    name: string;
    port: string;
    host: string;
    password: string;
}

export class Form extends React.Component<IProps, IState> {
    private provider: ConnectionsProvider;

    constructor(props) {
        super(props);

        this.state = {
            name: "",
            port: "",
            host: "",
            password: "",
        };

        this.provider = new ConnectionsProvider();

        this.setDefaults();
    }

    onChangeHandler(fieldName, e) {
        const { value } = e.target;

        const data = {};
        data[fieldName] = value;

        this.setState(data);
    }

    componentDidMount() {
        if (this.props.data) {
            this.setState(this.props.data);
        }
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

    clearFields = () => {
        this.setState({
            name: "",
            host: "",
            port: "",
            password: ""
        });
    }

    setDefaults = () => {
        this.setState({
            name: "New connection",
            host: "localhost",
            port: "5379",
            password: ""
        });
    }

    render() {
        const data: any = this.props.data || {};
        return (
            <StyledForm className="connection-form">
                <Row nogutter>
                    <Col md={3} className="controls">
                        <Button
                            className="save green"
                            onClick={this.save.bind(this)}
                            icon="save"
                        >
                            Save
                    </Button>
                        <Button onClick={this.clearFields}>Clear fields</Button>
                        <Button onClick={this.setDefaults}>Set defaults</Button>
                    </Col>

                    <Col md={9} className="main">
                        <input value={this.state.name} onChange={this.onChangeHandler.bind(this, 'name')} placeholder="Name" type="text" />
                        <input value={this.state.host} onChange={this.onChangeHandler.bind(this, 'host')} placeholder="Host" type="text" />
                        <input value={this.state.port} onChange={this.onChangeHandler.bind(this, 'port')} placeholder="Port" type="text" />
                        <input value={this.state.password} onChange={this.onChangeHandler.bind(this, 'password')} placeholder="Password" type="password" />
                    </Col>
                </Row>
            </StyledForm>
        );
    }
}