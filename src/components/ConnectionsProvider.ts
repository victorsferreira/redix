import { IConnectionRequest, IConnection, IConnectionCollection } from "./types";
import { ConnectionsRepository } from './ConnectionsRepository';
import * as uuid from "uuid/v4";
import ConnectionsStore from "./ConnectionsStore";

export class ConnectionsProvider {
    private repository: ConnectionsRepository;
    private store: any;

    constructor() {
        this.repository = new ConnectionsRepository();
        this.store = ConnectionsStore;
    }

    list(): IConnectionCollection {
        return this.repository.read();
    }

    getById(id: string): IConnection {
        const list = this.list();
        const item = list.find(item => item.id === id);
        return item;
    }

    delete(id: string): boolean {
        const list = this.list();
        const newList = list.filter(item => item.id !== id);
        this.store.set(newList);
        return this.repository.save(newList);
    }

    create(data: IConnectionRequest): IConnection {
        const id = uuid();
        const newItem: IConnection = { ...data, id };

        const list = this.list();
        list.push(newItem);

        this.repository.save(list);
        this.store.set(list);
        
        return newItem;
    }

    edit(id: string, data: IConnectionRequest): IConnection {
        const list = this.list();
        const newItem: IConnection = { ...data, id };

        const newList = list.map((item) => {
            if (item.id === id) return newItem;
            return item;
        });

        this.repository.save(newList);
        this.store.set(newList);
        
        return newItem;
    }
}