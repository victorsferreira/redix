import React from 'react';
import { Sidebar } from "./Sidebar";
import { Form } from "./Form";

export class Edit extends React.Component {
  render() {
    return (
      <div className="Edit">
        <Sidebar />
        <Form />
      </div>
    );
  }
}
