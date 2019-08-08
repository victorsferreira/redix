import React from "react";
import { inject, observer } from "mobx-react";
import { IConnectionObserverProps, CustomComponent } from "./CustomComponent";
import { KeyValue } from "./KeyValue";
import { autorun } from "mobx";
import store from "./ConnectionsStore";
import { StyledResult } from "./styled";

interface IProps extends IConnectionObserverProps {
    resultSet: any[];
    output: any;
}

interface IState {
    resultSet: any[];
    output: any;
    showAsJson: boolean;
}

@inject("connectionsStore")
@observer
export class Result extends CustomComponent<IProps, IState> {
    private store: any;
    constructor(props) {
        super(props);

        this.state = {
            resultSet: null,
            output: null,
            showAsJson: false,
        }

        this.store = store;

        autorun(() => {
            const { resultSet, output } = this.props.connectionsStore;

            this.update({ resultSet, output });
        })
    }

    componentDidUpdate(props) {
        // this.update(props);
    }

    update(props){
        if(props.resultSet) this.setState({resultSet: props.resultSet});
        if(props.output) this.setState({output: props.output});
    }

    changeShowAsJson = () => {
        this.setState({
            showAsJson: !this.state.showAsJson
        });
    }

    render() {
        const { resultSet, output } = this.state;
        return (
            <StyledResult>
                {
                    output && (
                        <div className="output">
                            {/* <div className="output-command">{output.command}</div> */}
                            <div className={`output-message ${output.success ? 'su`output-message`ccess' : 'error'}`}>
                                {output.message}
                            </div>
                            {/* <div className="output-success">{output.success}</div> */}
                        </div>
                    )
                }
                {
                    resultSet && (
                        <div className="result-set">
                            <header>
                                <span>Records in result set: {resultSet.length}</span>
                                <span className="show-as-json">Show as JSON <input type="checkbox" onChange={this.changeShowAsJson} /></span>
                            </header>
                            <div className="list">
                            {
                                resultSet.map((item, i) => {
                                    return (
                                        <KeyValue
                                            key={i}
                                            recordKey={item.key}
                                            value={item.value}
                                            showAsJson={this.state.showAsJson}
                                        />
                                    );
                                })
                            }
                            </div>
                        </div>
                    )
                }
            </StyledResult>
        );
    }
}