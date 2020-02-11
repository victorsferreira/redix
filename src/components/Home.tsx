import React from 'react';
import { Sidebar } from "./Sidebar";
import { Link } from "react-router-dom";
import { StyledContent } from "./styled";

export class Home extends React.Component {
  render() {
    (global as any).HISTORY = (this.props as any).history;

    return (
      <div className="Home">
        <Sidebar {...this.props} />
        <StyledContent className="content">
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
        </StyledContent>
      </div>
    );
  }
}
