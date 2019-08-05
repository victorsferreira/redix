import React from "react";
import { IConnectionCollection } from "./types";
import { ConnectionsProvider } from "./ConnectionsProvider";
import { inject, observer } from "mobx-react";
import { history } from "./history";
import { IConnectionObserverProps, CustomComponent } from "./CustomComponent";
import { Button } from "./Button";
import ConnectionsStore from "./ConnectionsStore";

interface IProps extends IConnectionObserverProps { }

interface IState {
    connections: IConnectionCollection
}

@inject("connectionsStore")
@observer
export class Sidebar extends CustomComponent<IProps, IState> {
    private provider: ConnectionsProvider;
    private store: any;

    constructor(props) {
        super(props);

        this.provider = new ConnectionsProvider();

        this.state = {
            connections: []
        }

        this.store = ConnectionsStore;
    }

    delete(id) {
        if (window.confirm("Are you sure?")) {
            this.provider.delete(id);
        }
    }

    goToEdit(id) {
        history.push('/edit', { id });
    }

    openConnection(id) {            
        history.push('/connection');
        this.store.select(id);
    }

    goToCreate(id) {
        this.provider.delete(id);
    }

    getConnectionItemClassName(id){
        return this.props.connectionsStore.selected === id ? 
        'selected' : 
        '';
    }

    render() {
        const { connections } = this.props.connectionsStore;
        return (
            <div className="sidebar">
                <div className="connection-list">
                    {
                        connections.map((connection, i) => {
                            return (
                                <div className={`connection-item ${this.getConnectionItemClassName(connection.id)}`} key={i}>
                                    <span onClick={this.openConnection.bind(this, connection.id)} className="name">{connection.name}</span>
                                    <div className="controls">
                                        <Button icon="delete" onClick={this.delete.bind(this, connection.id)}>
                                            {/* Delete */}
                                        </Button>
                                        <Button icon="edit" onClick={this.goToEdit.bind(this, connection.id)}>
                                            {/* Edit */}
                                        </Button>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>

                <Button className="create-connection" link="/create" icon="new">
                    Create connection
                </Button>
            </div>
        );
    }
}