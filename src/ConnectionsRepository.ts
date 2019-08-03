import * as loader from './loader';
const config = loader.get('electron-json-config')

export class ConnectionsRepository {
    read(): any[] {
        return config.get('connections') || [];
    }

    save(connections: any[]) {
        config.set('connections', connections);

        return true;
    }

    add(connection: any[]) {
        const connections = this.read();

        connections.push(connection);
        config.set('connections', connections);

        return true;
    }
}