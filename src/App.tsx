import React from 'react';
import { MemoryRouter, Route, Switch } from "react-router-dom";
import { Home } from "./Home";
import { Create } from "./Create";
import { Edit } from "./Edit";
import { Connection } from "./Connection";

export default class App extends React.Component {
  render() {
    return (
      <MemoryRouter
        initialEntries={["/home", "/create", "/edit", "/connection"]}
        initialIndex={0}
      >
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route exact path="/create" component={Create} />
          <Route exact path="/edit" component={Edit} />
          <Route exact path="/connection" component={Connection} />
        </Switch>
      </MemoryRouter>
    );
  }
}
