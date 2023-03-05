declare interface Ilogger {
    detail: (session: any, initInvoke: any, scenario: any, method: any, token: any) => any
    addInputRequest: (node: any, cmd: any, url: any, protocol: any, rawData: any) => any
    addOutputResponse: (node: any, cmd: any, invoke: any, protocol: any, rawData: any) => any
    addOutputRequest: (node: any, cmd: any, invoke: any, rawData: any) => any
    addInputResponse: (node: any, cmd: any, invoke: any, rawData: any) => any
    end: (err?: any) => any
    getDetail: (err?: any) => any,
    warn: (str: any, data: any) => any,
    setUser: (user:any) => any
}

declare const logg: Ilogger;

export default logg