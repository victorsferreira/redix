import React from 'react';
import { Sidebar } from "./Sidebar";
import { Link } from "react-router-dom";

export class Home extends React.Component {
  render() {
    return (
      <div className="Home">
        <Sidebar {...this.props} />
        <div className="content">
          <div className="home-content">
            <h2>
              Select a connection to get started!
          </h2>
            <p>
              Need help using <strong>Redix</strong>? <br />
              Please check out our <Link to="https://github.com/victorsferreira/redix">Github</Link>, create an issue, <br />
              browse for answers and submit your Pull Request!
          </p>
          </div>
        </div>
      </div>
    );
  }
}
