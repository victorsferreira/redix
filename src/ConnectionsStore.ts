import  { observable, action, autorun } from "mobx";

class ConnectionsStore {
    @observable connections = [];

    constructor() {
        autorun(() => console.log(this.connections));
    }

    @action set = (_connections: any[]) => {
        this.connections = _connections;
    }
}

const store = new ConnectionsStore();

export default store;