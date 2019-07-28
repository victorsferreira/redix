import React from "react";
import { IConnectionObserverProps, CustomComponent } from "./CustomComponent";
import { RedisClient, client as redisClient } from "./RedisClient";
import ReactJson from 'react-json-view'
import { Button } from "./Button";

interface IProps extends IConnectionObserverProps {
    recordKey: string;
    value: any;
    showAsJson: boolean;
}

interface IState {
    recordKey: string;
    value: any;
    showAsJson: boolean;
}

export class KeyValue extends CustomComponent<IProps, IState> {
    private redisClient: RedisClient;

    constructor(props) {
        super(props);

        this.state = {
            recordKey: "",
            value: null,
            showAsJson: false,
        }
    }

    getValue = async () => {
        if (!this.redisClient) this.redisClient = redisClient;
        const value = await this.redisClient.get(this.state.recordKey);
        this.setState({ value });
    }

    loadPropsToState() {
        const { recordKey, value, showAsJson } = this.props;
        this.setState({ recordKey, value, showAsJson });
    }

    componentDidMount() {
        this.loadPropsToState();
    }

    componentDidUpdate(props) {
        if (
            props.recordKey !== this.props.recordKey ||
            props.value !== this.props.value ||
            props.showAsJson !== this.props.showAsJson
        ) {
            this.loadPropsToState();
        }
    }

    render() {
        return (
            <div>
                <div className="key">{this.state.recordKey}</div>
                <div className="value">
                    {
                        this.state.value && this.state.showAsJson ?
                            <ReactJson src={JSON.parse(this.state.value)} /> :
                            <span>{this.state.value}</span>
                    }
                </div>
                <div className="controls">
                    {
                        this.state.value === null && (
                            <Button onClick={this.getValue.bind(this)} icon="get">Get</Button>
                        )
                    }
                </div>
            </div>
        );
    }
}