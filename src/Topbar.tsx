import React from "react";
import { Command } from "./types";
import { ConnectionsProvider } from "./ConnectionsProvider";

interface IProps { }

interface IState {
    key: string;
    value: string;
    pattern: string;
    command: Command;
}

export class Topbar extends React.Component<IProps, IState> {
    // private provider: ConnectionsProvider;
    private commandInputs: object;

    constructor(props) {
        super(props);

        // this.provider = new ConnectionsProvider();

        this.state = {
            command: Command.GET,
            pattern: '',
            value: '',
            key: '',
        };

        this.commandInputs = {
            set: ['key', 'value'],
            get: ['key'],
            delete: ['key'],
            search: ['pattern'],
            flush: [],
        };
    }

    run() {
        console.log(this.state)
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
            <form>
                { this.shouldShowInput('pattern') && <input onChange={this.onChangeHandler.bind(this, 'pattern')} placeholder="Pattern" /> }
                { this.shouldShowInput('key') && <input onChange={this.onChangeHandler.bind(this, 'key')} placeholder="Key" /> }
                { this.shouldShowInput('value') && <input onChange={this.onChangeHandler.bind(this, 'value')} placeholder="Value" /> }
                
                <select onChange={this.onChangeHandler.bind(this, 'command')} >
                    <option value="get">Get</option>
                    <option value="set">Set</option>
                    <option value="search">Search</option>
                    <option value="delete">Delete</option>
                    <option value="flush">Flush</option>
                </select>

                <button type="button" onClick={this.run.bind(this)}>Run</button>
            </form>
        );
    }
}