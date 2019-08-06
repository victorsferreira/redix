import React from 'react';
import { Sidebar } from "./Sidebar";
import { Form } from "./Form";
import { StyledContent } from './styled';

export class Create extends React.Component {
  render() {
    return (
      <div className="create">
        <Sidebar {...this.props} />
        <StyledContent className="content">
          <Form {...this.props} />
        </StyledContent>
      </div>
    );
  }
}
