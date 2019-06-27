import React from "react";
import { IConnectionCollection } from "./types";
import { ConnectionsProvider } from "./ConnectionsProvider";
import ConnectionsStore from "./ConnectionsStore";
import { inject, observer } from "mobx-react";
import { Link } from "react-router-dom";

interface IProps {
    connectionsStore?: any
}

interface IState {
    connections: IConnectionCollection
}

@inject("connectionsStore")
@observer
export class Sidebar extends React.Component<IProps, IState> {
    private provider: ConnectionsProvider;
    private store: any;

    constructor(props) {
        super(props);

        this.provider = new ConnectionsProvider();

        this.state = {
            connections: []
        }
    }

    delete(id) {
        if (window.confirm("Are you sure?")) {
            this.provider.delete(id);
        }
    }

    goToEdit(id) {
        this.provider.delete(id);
    }

    goToCreate(id) {
        this.provider.delete(id);
    }

    render() {
        const { connections } = this.props.connectionsStore;
        return (
            <div>
                {
                    connections.map((connection, i) => {
                        return (
                            <div className="connection-item" key={i}>
                                <span className="name">{connection.name}</span>
                                <button onClick={this.delete.bind(this, connection.id)}>Delete</button>
                                <button onClick={this.goToEdit.bind(this, connection.id)}>Edit</button>
                            </div>
                        );
                    })
                }

                <Link to="/create">Create new connection</Link>
            </div>
        );
    }
}