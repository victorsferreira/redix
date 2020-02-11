import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import * as serviceWorker from './components/serviceWorker';
import { Provider } from "mobx-react";
import connectionsStore from "./components/ConnectionsStore";
import { ConnectionsProvider } from "./components/ConnectionsProvider";
import './components/global.css';

const provider = new ConnectionsProvider();
const list = provider.list();
connectionsStore.set(list);

console.group("Provider will be rendered");
ReactDOM.render((
<Provider connectionsStore={ connectionsStore }>
    <App/>
</Provider>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
