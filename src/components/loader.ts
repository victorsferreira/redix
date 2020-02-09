const electron = (window as any).require('electron');
const remote = electron.remote;

export function get(moduleName): any {
    return remote.require(moduleName);
}