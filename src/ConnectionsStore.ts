import  { observable, action, autorun } from "mobx";

class ConnectionsStore {
    @observable connections = [];
    @observable selected = null;
    @observable resultSet = null;
    @observable output = null;
    @observable cleared = null;

    constructor() {
        autorun(() => console.log(this.connections, this.selected));
    }

    @action set = (_connections: any[]) => {
        this.connections = _connections;
    }

    @action select = (connection: any) => {
        this.selected = connection;
    }

    @action setResult = (resultSet: any[], output: any, cleared: boolean = false) => {
        this.resultSet = resultSet;
        this.output = output;
        this.cleared = cleared;
    }
}

const store = new ConnectionsStore();

export default store;