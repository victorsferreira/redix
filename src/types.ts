export type Remove<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

export interface IConnection {
    id: string;
    name: string;
    host: string;
    port: string;
    password: string;
}

export interface IConnectionCollection extends Array<IConnection> {}

export interface IConnectionRequest extends Remove<IConnection, "id"> { }
