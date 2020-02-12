import React from "react";
import { IConnectionObserverProps, CustomComponent } from "./CustomComponent";
import { RedisClient, client as redisClient } from "./RedisClient";
import ReactJson from 'react-json-view'
import { Button } from "./Button";
import { StyledKeyValueItem } from "./styled";
import { RadialButton } from "./RadialButton";
import { colors } from "./styleGuide";
import { Icon } from "./Icon";
import { Row, Col } from "react-grid-system";

interface IProps extends IConnectionObserverProps {
    recordKey: string;
    value: any;
    showAsJson: boolean;
}

interface IState {
    recordKey: string;
    value: any;
    showAsJson: boolean;
    isDeleted: boolean;
}

export class KeyValue extends CustomComponent<IProps, IState> {
    private redisClient: RedisClient;

    constructor(props) {
        super(props);

        this.state = {
            recordKey: "",
            value: null,
            showAsJson: false,
            isDeleted: false
        };

        this.redisClient = redisClient;
    }

    deleteKey = async () => {
        const result = await this.redisClient.delete(this.state.recordKey);
        if (result) this.setState({ isDeleted: true });
    }

    getValue = async () => {
        const value = await this.redisClient.get(this.state.recordKey);
        console.log("Key-Value found", value)
        this.setState({ value });
    }

    loadPropsToState() {
        const { recordKey, value, showAsJson } = this.props;
        this.setState({ recordKey, value, showAsJson });
    }

    loadShowAsJsonProps() {
        const { showAsJson } = this.props;
        this.setState({ showAsJson });
    }

    componentDidMount() {
        this.loadPropsToState();
    }

    componentDidUpdate(props) {
        if (
            props.recordKey !== this.props.recordKey ||
            props.value !== this.props.value
        ) {
            this.loadPropsToState();
        }

        if (props.showAsJson !== this.props.showAsJson) {
            this.loadShowAsJsonProps();
        }
    }

    render() {
        let jsonValue = null;

        try {
            if (this.state.value && this.state.showAsJson) {
                console.log("Will try to parse JSON", this.state.value)
                jsonValue = JSON.parse(this.state.value);
                console.log("JSON value", jsonValue);
            }
        } catch (err) {
            console.log(jsonValue, 'jsonValue');
            console.log("Could not parse JSON");
        }

        console.log("Show key-value as JSON", this.state.showAsJson)

        return (
            <StyledKeyValueItem className="key-value-item">
                <Row nogutter>
                    <Col md={11}>
                        <div className="key">{this.state.recordKey}</div>
                    </Col>
                    <Col md={1}>
                        {
                            this.state.isDeleted === false && (
                                <div className="controls">
                                    {
                                        this.state.value === null && (
                                            <RadialButton small onClick={this.getValue.bind(this)} icon="get" />
                                        )
                                    }

                                    <RadialButton small onClick={this.deleteKey.bind(this)} icon="delete" />
                                </div>
                            )
                        }
                    </Col>
                    <Col md={12}>
                        <div className="value">
                            {
                                jsonValue && typeof (jsonValue) === 'object' ?
                                    <ReactJson src={jsonValue} /> :
                                    <span>{this.state.value}</span>
                            }

                            {
                                this.state.isDeleted && (
                                    <div className="is-deleted">
                                        <span>Item was deleted <Icon type="error" small color={colors.red} /></span>
                                    </div>
                                )
                            }
                        </div>
                    </Col>
                </Row>
            </StyledKeyValueItem>
        );
    }
}