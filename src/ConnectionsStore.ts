import  { observable, action, autorun } from "mobx";

class ConnectionsStore {
    @observable connections = [];
    @observable selected = null;
    @observable resultSet = null;
    @observable output = null;

    constructor() {
        autorun(() => console.log(this.connections, this.selected));
    }

    @action set = (_connections: any[]) => {
        this.connections = _connections;
    }

    @action select = (connection: any) => {
        this.selected = connection;
    }

    @action setResult = (resultSet: any[], output: any) => {
        console.log("setResult")
        this.resultSet = resultSet;
        this.output = output;
    }
}

const store = new ConnectionsStore();

export default store;