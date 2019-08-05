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
        this.clearInputs();
    }

    onChangeHandler(fieldName, e) {
        const { value } = e.target;

        const data = {} as any;
        data[fieldName] = value;

        if(fieldName === 'command'){
            this.clearInputs();
        }

        this.setState(data);
    }

    clearInputs () {
        const data = {
            key: '',
            value: '',
            pattern: '',
            ttl: null,
        };

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
                {this.shouldShowInput('PATTERN') && <input value={this.state.pattern} type="text" onChange={this.onChangeHandler.bind(this, 'pattern')} placeholder="Pattern" />}
                {this.shouldShowInput('KEY') && <input value={this.state.key} type="text" onChange={this.onChangeHandler.bind(this, 'key')} placeholder="Key" />}
                {this.shouldShowInput('VALUE') && <input value={this.state.value} type="text" onChange={this.onChangeHandler.bind(this, 'value')} placeholder="Value" />}
                {this.shouldShowInput('TTL') && <input value={this.state.ttl} type="text" onChange={this.onChangeHandler.bind(this, 'ttl')} placeholder="Time to live" />}

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