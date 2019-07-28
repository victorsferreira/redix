import React from 'react';
import { Sidebar } from "./Sidebar";
import { Form } from "./Form";
import { observer, inject } from 'mobx-react';
import { ConnectionsProvider } from './ConnectionsProvider';
import { IConnectionObserverProps, IRouteProps } from "./CustomComponent";

interface IProps extends IConnectionObserverProps, IRouteProps { }

@inject("connectionsStore")
@observer
export class Edit extends React.Component<IProps> {
  private provider: ConnectionsProvider;

  constructor(props) {
    super(props);
    this.provider = new ConnectionsProvider();
  }

  render() {
    const { id } = this.props.location.state;
    const connection = this.provider.getById(id);

    return (
      <div className="Edit">
        <Sidebar />
        <div className="content">
          <Form data={connection} />
        </div>
      </div>
    );
  }
}
