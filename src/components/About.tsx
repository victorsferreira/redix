import React from 'react';
import { Sidebar } from "./Sidebar";
import { StyledContent } from "./styled";
import { Row, Col } from 'react-grid-system';
import styled from 'styled-components';
import logo from '../assets/512x512.png';

const { remote } = (window as any).require("electron");
const { app } = remote;
const packageJson = remote.getGlobal('packageJson');

const StyledAboutContent = styled.div`
  padding: 0px 20px;
`;

export class About extends React.Component {
  render() {
    return (
      <div id="about" className="about">
        <Sidebar {...this.props} />
        <StyledContent>
          <StyledAboutContent>
            <Row>
              <Col md={7}>
                <h1>About Redix</h1>
                <p>
                  {packageJson.description}
                </p>
                <p>
                  Please, check our <a target="_blank" href="https://github.com/victorsferreira/redix">Github</a> for critics, contributions and issues and the <a target="_blank" href="https://victorsferreira.github.io/">Official Page</a> for latest news and download the newest version.
                </p>
                <p>Current version: {app.getVersion()}</p>
                <br />
                <br />
                <img className="logo small" src={logo} />
              </Col>
            </Row>
          </StyledAboutContent>
        </StyledContent>
      </div>
    );
  }
}
