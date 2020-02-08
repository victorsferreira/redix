import React from "react";
import { IConnectionObserverProps, CustomComponent } from "./CustomComponent";
import { RedisClient, client as redisClient } from "./RedisClient";
import ReactJson from 'react-json-view'
import { Button } from "./Button";
import { StyledKeyValueItem } from "./styled";

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
        };

        this.redisClient = redisClient;
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

    loadShowAsJsonProps(){
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

        if(props.showAsJson !== this.props.showAsJson) {
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
            console.log("Could not parse JSON");
        }

        console.log("Show key-value as JSON", this.state.showAsJson)

        return (
            <StyledKeyValueItem className="key-value-item">
                <div className="key">{this.state.recordKey}</div>

                <div className="controls">
                    {
                        this.state.value === null && (
                            <Button onClick={this.getValue.bind(this)} icon="get"></Button>
                        )
                    }
                </div>

                <div className="value">
                    {
                        jsonValue ?
                            <ReactJson src={jsonValue} /> :
                            <span>{this.state.value}</span>
                    }
                </div>
            </StyledKeyValueItem>
        );
    }
}