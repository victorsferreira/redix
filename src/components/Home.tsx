import React from 'react';
import { Sidebar } from "./Sidebar";
import { Link } from "react-router-dom";
import { StyledContent } from "./styled";

export class Home extends React.Component {
  render() {
    return (
      <div id="home" className="Home">
        <Sidebar {...this.props} />
        <StyledContent className="content">
          <div className="home-content">
            <h2>
              Select a connection to get started!
          </h2>
            <p>
              Need help using <strong>Redix</strong>? <br />
              Please check out our <a target="_blank" href="https://github.com/victorsferreira/redix">Github</a>, create an issue, <br />
              browse for answers and submit your Pull Request!
          </p>
          </div>
        </StyledContent>
      </div>
    );
  }
}
