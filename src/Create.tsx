import React from 'react';
import { Sidebar } from "./Sidebar";
import { Form } from "./Form";

export class Create extends React.Component {
  render() {
    return (
      <div className="Create">
        <Sidebar />
        <Form />
      </div>
    );
  }
}
