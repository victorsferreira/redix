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

export enum ICommand {
    GET = "GET",
    SET = "SET",
    DELETE = "DELETE",
    SEARCH = "SEARCH",
    FLUSH = "FLUSH",
    ALL = "ALL",
    EXPIRE = "EXPIRE",
}

export enum IInput{
    PATTERN='PATTERN',
    KEY='KEY',
    VALUE='VALUE',
    TTL='TTL',
}