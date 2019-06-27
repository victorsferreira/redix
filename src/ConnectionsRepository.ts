let base: any = [];

export class ConnectionsRepository {
    read(): any[] {
        return base;
    }

    save(data: any) {
        base = data;
        return true;
    }
}