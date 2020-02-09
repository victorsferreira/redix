import React from "react";
import { IConnectionCollection } from "./types";
import { ConnectionsProvider } from "./ConnectionsProvider";
import { inject, observer } from "mobx-react";
import { history } from "./history";
import { IConnectionObserverProps, CustomComponent } from "./CustomComponent";
import { Button } from "./Button";
import ConnectionsStore from "./ConnectionsStore";
import { StyledSidebar } from "./styled";
import { ConnectionItem } from "./ConnectionItem";

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

    delete = (id) => {
        if (window.confirm("Are you sure?")) {
            this.provider.delete(id);
        }
    }

    goToEdit = (id) => {
        history.push('/edit', { id });
    }

    openConnection = (id) => {            
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
            <StyledSidebar className="sidebar">
                <div className="connection-list">
                    {
                        connections.map((connection, i) => {
                            return <ConnectionItem
                                key={i}
                                selected={this.getConnectionItemClassName(connection.id)}
                                delete={this.delete}
                                goToEdit={this.goToEdit}
                                openConnection={this.openConnection}
                                {...connection}
                            />
                        })
                    }
                </div>

                <Button className="create-connection" link="/create" icon="new">
                    Create connection
                </Button>
            </StyledSidebar>
        );
    }
}