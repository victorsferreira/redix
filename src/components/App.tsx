import React from 'react';
import { MemoryRouter as Router, Route, Switch } from "react-router-dom";
import { Home } from "./Home";
import { Create } from "./Create";
import { Edit } from "./Edit";
import { Connection } from "./Connection";
import { About } from './About';

const electron = (window as any).require("electron");
const { ipcRenderer } = electron;

(global as any).ReactRouterDom = {};

export default class App extends React.Component {
  constructor(props) {
    super(props);

    ipcRenderer.on('open-about-page', () => {
      (global as any).ReactRouterDom.history.push('about');
    });
  }

  setup = (props) => {
    (global as any).ReactRouterDom = { history: props.history };
    props.history.push('home');
    return null;
  }

  render() {
    return (
      <Router
        initialEntries={["setup", "home", "create", "edit", "connection", "about"]}
        initialIndex={0}
      >
        <Switch>
          <Route exact path="setup" render={this.setup} />
          <Route exact path="home" component={Home} />
          <Route exact path="create" component={Create} />
          <Route exact path="edit" component={Edit} />
          <Route exact path="connection" component={Connection} />
          <Route exact path="about" component={About} />
        </Switch>
      </Router>
    );
  }
}
