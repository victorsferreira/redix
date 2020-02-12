import React, { Fragment } from "react";
import { IConnectionCollection } from "./types";
import { ConnectionsProvider } from "./ConnectionsProvider";
import { inject, observer } from "mobx-react";
import { IConnectionObserverProps, CustomComponent } from "./CustomComponent";
import { Button } from "./Button";
import ConnectionsStore from "./ConnectionsStore";
import { StyledSidebar } from "./styled";
import { ConnectionItem } from "./ConnectionItem";
import { RadialButton } from "./RadialButton";
import { TextButton } from "./TextButton";
// import { RadialButton } from './RadialButton';

interface IProps extends IConnectionObserverProps {
    history?: any;
}

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
        this.props.history.push('edit', { id });
    }

    openConnection = (id) => {
        console.log("Vai entrar?", this.props)
        this.props.history.push('connection');
        this.store.select(id);
    }

    goToCreate(id) {
        this.provider.delete(id);
    }

    getConnectionItemClassName(id) {
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
                                history={this.props.history}
                                key={i}
                                selected={this.getConnectionItemClassName(connection.id)}
                                delete={this.delete}
                                goToEdit={this.goToEdit}
                                openConnection={this.openConnection}
                                {...connection}
                            />
                        })
                    }

                    {
                        connections.length === 0 && (
                            <div className="no-connections">
                                <span className="title">
                                    No connections yet
                                </span>
                                <span className="subtitle">
                                    <TextButton small link="create">Create your first connection</TextButton> to start using <strong>Redix</strong>
                                </span>
                            </div>
                        )
                    }
                </div>

                <div className="add-controls">
                    <RadialButton big icon="plus" link="create" />
                </div>

                {/* <Button className="create-connection" link="create" icon="plus">
                    Create connection
                </Button> */}
            </StyledSidebar>
        );
    }
}