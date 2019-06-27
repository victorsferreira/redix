import React from 'react';
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

export class Connection extends React.Component {
  render() {
    return (
      <div className="Create">
        <Sidebar />
        <div>
          <Topbar />
        </div>
      </div>
    );
  }
}
