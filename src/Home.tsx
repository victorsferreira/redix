import React from 'react';
import { Sidebar } from "./Sidebar";
import { Form } from "./Form";

export class Home extends React.Component {
  render() {
    return (
      <div className="Home">
        <Sidebar />
        <div>
          Home
        </div>
      </div>
    );
  }
}
