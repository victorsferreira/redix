import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from "mobx-react";
import connectionsStore from "./ConnectionsStore";
import { ConnectionsProvider } from "./ConnectionsProvider";
import './global.css';

const provider = new ConnectionsProvider();
const list = provider.list();
connectionsStore.set(list);

ReactDOM.render((
<Provider connectionsStore={ connectionsStore }>
    <App/>
</Provider>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
