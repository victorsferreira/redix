import React from "react";
import { inject, observer } from "mobx-react";
import { IConnectionObserverProps, CustomComponent } from "./CustomComponent";
import { KeyValue } from "./KeyValue";
import { autorun } from "mobx";
import store from "./ConnectionsStore";
import { StyledResult } from "./styled";
import { Icon } from "./Icon";
import { colors } from './styleGuide';
import { Row, Col } from "react-grid-system";
import { TextButton } from "./TextButton";

interface IProps extends IConnectionObserverProps {
    resultSet: any[];
    output: any;
}

interface IState {
    resultSet: any[];
    output: any;
    // cleared: boolean;
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
            // cleared: false,
            showAsJson: false,
        }

        this.store = store;

        autorun(() => {
            const { resultSet, output, cleared } = this.props.connectionsStore;
            // console.log("cleared", cleared);
            this.update({ resultSet, output, cleared });
        })
    }

    componentDidUpdate(props) {
        // this.update(props);
    }

    update(props) {
        if (props.resultSet) this.setState({ resultSet: props.resultSet });
        if (props.output) this.setState({ output: props.output });
        if (props.cleared) {
            this.setState({ output: null, resultSet: null });
        }
    }

    changeShowAsJson = () => {
        this.setState({
            showAsJson: !this.state.showAsJson
        });
    }

    render() {
        const { resultSet, output, showAsJson } = this.state;
        console.log("Render result", resultSet, output);
        console.log("Show JSON", showAsJson);

        return (
            <StyledResult>
                {
                    output && (
                        <div className="output">
                            <Row className="output-wrapper">
                                <Col md={9}>
                                    {/* <div className="output-command">{output.command}</div> */}
                                    <div className={`output-message ${output.success ? 'success' : 'error'}`}>
                                        {output.command}: <strong>{output.success ? 'Success' : 'Failed'}</strong>
                                        {output.success ? <Icon size="1em" type="check" color={colors.green} /> : <Icon size="1em" type="error" color={colors.red} />}
                                    </div>
                                </Col>
                                {
                                    resultSet && (
                                        <Col md={3} className="results-info">
                                            <span className="results-count">Results: {resultSet.length}</span>
                                            <TextButton
                                                className={`show-as-json ${this.state.showAsJson ? 'active' : ''}`}
                                                onClick={this.changeShowAsJson}
                                            >{this.state.showAsJson}Show as JSON {this.state.showAsJson && <Icon color={colors.gold} type="check" />}</TextButton>
                                        </Col>
                                    )
                                }
                            </Row>
                        </div>
                    )
                }

                {
                    resultSet && (
                        <div className="result-set">
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