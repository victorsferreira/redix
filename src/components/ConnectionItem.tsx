import React from "react";
import { IConnectionObserverProps, CustomComponent } from "./CustomComponent";
import { Button } from "./Button";
import { StyledConnectionItem } from "./styled";
import { RadialButton } from "./RadialButton";

interface IProps extends IConnectionObserverProps {
}

interface IState {
}

export class ConnectionItem extends CustomComponent<IProps, IState> {
    constructor(props) {
        super(props);
    }

    render() {
        const props: any = this.props;
        const connection: any = props;
        return (
            <StyledConnectionItem className={`connection-item ${props.selected ? 'selected' : null}`}>

                <div className="main"
                    onClick={props.openConnection.bind(this, connection.id)}
                >
                    <span className="name">
                        {connection.name}
                    </span>

                    <span className="host">
                        {connection.host}
                    </span>

                    <span className="port">
                        {connection.port}
                    </span>
                </div>

                <div className="controls">
                    {/* <Button icon="delete" onClick={props.delete.bind(this, connection.id)}></Button>
                    <Button icon="edit" onClick={props.goToEdit.bind(this, connection.id)}></Button> */}
                    {/* <Button radial small icon="delete" onClick={props.delete.bind(this, connection.id)} />
                    <Button radial small icon="edit" onClick={props.goToEdit.bind(this, connection.id)} />
                     */}
                    <RadialButton small icon="delete" onClick={props.delete.bind(this, connection.id)} />
                    <RadialButton small icon="edit" onClick={props.goToEdit.bind(this, connection.id)} />
                </div>
            </StyledConnectionItem>
        );
    }
}