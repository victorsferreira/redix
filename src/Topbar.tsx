import React from "react";
import { ICommand } from "./types";
import { Button } from "./Button";

interface IProps {
    run: (string, any) => {}
}

interface IState {
    key: string;
    value: string;
    pattern: string;
    ttl: number;
    command: ICommand;    
}

export class Topbar extends React.Component<IProps, IState> {
    private commandInputs: object;

    constructor(props) {
        super(props);

        this.state = {
            command: ICommand.GET,
            pattern: '',
            value: '',
            key: '',
            ttl: null,
        };

        this.commandInputs = {
            SET: ['KEY', 'VALUE', 'TTL'],
            GET: ['KEY'],
            DELETE: ['KEY'],
            SEARCH: ['PATTERN'],
            FLUSH: [],
            EXPIRE: [],
        };
    }

    run() {
        const { pattern, key, value, ttl } = this.state;
        const input = { pattern, key, value, ttl };
        this.props.run(this.state.command, input);
    }

    onChangeHandler(fieldName, e) {
        const { value } = e.target;

        const data = {};
        data[fieldName] = value;

        this.setState(data);
    }

    shouldShowInput = (input) => {
        if (!this.state.command) return false;

        return this.commandInputs[
            this.state.command
        ].includes(input);
    }

    render() {
        return (
            <form className="topbar">
                {this.shouldShowInput('PATTERN') && <input type="text" onChange={this.onChangeHandler.bind(this, 'PATTERN')} placeholder="Pattern" />}
                {this.shouldShowInput('KEY') && <input type="text" onChange={this.onChangeHandler.bind(this, 'KEY')} placeholder="Key" />}
                {this.shouldShowInput('VALUE') && <input type="text" onChange={this.onChangeHandler.bind(this, 'VALUE')} placeholder="Value" />}
                {this.shouldShowInput('TTL') && <input type="text" onChange={this.onChangeHandler.bind(this, 'TTL')} placeholder="Time to live" />}

                <select onChange={this.onChangeHandler.bind(this, 'command')} >
                    <option value="GET">Get</option>
                    <option value="SET">Set</option>
                    <option value="SEARCH">Search</option>
                    <option value="DELETE">Delete</option>
                    <option value="FLUSH">Flush</option>
                    {/* <option value="EXPIRE">Expire</option> */}
                </select>

                <Button
                    icon="run"
                    onClick={this.run.bind(this)}
                >
                    Run
                </Button>
            </form>
        );
    }
}