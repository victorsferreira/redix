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
        this.setState({ value });
    }

    loadPropsToState() {
        const { recordKey, value } = this.props;
        this.setState({ recordKey, value });
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
                jsonValue = JSON.parse(this.state.value);
            }
        } catch (err) {}

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