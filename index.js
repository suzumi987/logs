const logger = require('loglevel') 
const jwt = require('jsonwebtoken') 
const moment = require('moment')
// import { MaledService } from '@svcs/maled/MaledService.svsc'
// moment.tz('Asia/Bangkok')

// log Data
const logg = {
    // Init Log
    detail: (session, initInvoke, scenario, method, token) => {
        const tokenDecode = jwt.decode(token)
        detailLog.InputTimeStamp = moment().format('YYYY-MM-DDTHH:mm:ss.SSS')
        detailLog.Session = session
        detailLog.InitInvoke = initInvoke
        detailLog.Scenario = scenario
        detailLog.Method = method
        detailLog.Token = token || null
        detailLog.User = tokenDecode ? tokenDecode.user_id : null
    },
    // add Input Req and Response
    addInputRequest: (node, cmd, url, protocol, rawData) => {
        addInput(node, cmd, url, protocol, rawData);
    },
    addOutputResponse: (node, cmd, invoke, protocol, rawData) => {
        addOutput(node, cmd, invoke, protocol, rawData);
    },
    // add service **** Daos Service ****
    addOutputRequest: (node, cmd, invoke, rawData) => {
        addServiceOut(node, cmd, invoke, rawData);
    },
    addInputResponse: (node, cmd, invoke, rawData) => {
        addServiceIn(node, cmd, invoke, rawData);
    },
    // close Log
    end: (err) => {
        // const maledsvsc = new MaledService()
        const logDetail = process.env.LOG_DETAIL || 'N'
        if (!detailLog.OutputTimeStamp) detailLog.OutputTimeStamp = moment().format('YYYY-MM-DDTHH:mm:ss.SSS')
        detailLog.ProcessingTime = moment().diff(moment(detailLog.InputTimeStamp)) + ' ms'
        detailLog.Error = err || null
        detailLog.Status = err ? 'FAIL' : 'SUCCESS'
        // maledsvsc.addMaledEvent(detailLog)
        if (logDetail === 'Y') logger.warn(detailLog)
        detailLog.Session = null
        detailLog.InitInvoke = null
        detailLog.Scenario = null
        detailLog.Identity = null
        detailLog.Input = []
        detailLog.Output = []
        detailLog.service = []
        detailLog.Token = null
        detailLog.User = null
        detailLog.Method = null
        detailLog.OutputTimeStamp = null
        detailLog.InputTimeStamp = null
        detailLog.ProcessingTime = null
        detailLog.Error = null
    },
    getDetail: (err) => {
        if (!detailLog.OutputTimeStamp) detailLog.OutputTimeStamp = moment().format('YYYY-MM-DDTHH:mm:ss.SSS')
        detailLog.ProcessingTime = moment().diff(moment(detailLog.InputTimeStamp)) + ' ms'
        detailLog.Error = err || null
        detailLog.Status = err ? 'FAIL' : 'SUCCESS'
        return detailLog
    },
    warn: (str, data) => {
        const logWarn = process.env.LOG_WARN || 'N'
        if (logWarn === 'Y') logger.warn(str, data)
    },
    setUser: (user) => {
        detailLog.User = user
    }
}
const detailLog = {
    LogType: "DETAIL_LOG",
    AppName: process.env.APP_NAME || 'APPLICATION',
    Token: null,
    User: null,
    Session: null,
    InitInvoke: null,
    Scenario: null,
    Identity: null,
    Method: null,
    Status: null,
    InputTimeStamp: null,
    Input: [],
    service: [],
    OutputTimeStamp: null,
    Output: [],
    ProcessingTime: null,
    Error: null
}

const addInput = (node, cmd, url, protocol, rawData) => {
    const input = {
        Url: url,
        Event: node + '.' + cmd,
        // Protocol: '',
        Type: 'REQUEST',
        RawData: rawData,
    };
    detailLog.Input.push(input);
}
const addOutput = (node, cmd, invoke, protocol, rawData) => {
    const output = {
        Invoke: invoke,
        Event: node + '.' + cmd,
        // Protocol: '',
        Type: 'RESPONSE',
        RawData: rawData,
    };
    detailLog.Output.push(output);
}

const addServiceOut = (node, cmd, invoke, rawData) => {
    // outputTime = moment().format()
    const output = {
        ReqTime: moment().format('YYYY-MM-DDTHH:mm:ss.SSS'),
        Invoke: invoke,
        Event: node + '.' + cmd,
        // Protocol: '',
        Type: 'REQUEST',
        RawData: typeof rawData === 'string' ? rawData : JSON.stringify(rawData),
    };
    detailLog.service.push(output);
}

const addServiceIn = (node, cmd, invoke, rawData) => {
    const output = {
        ResTime: moment().format('YYYY-MM-DDTHH:mm:ss.SSS'),
        Invoke: invoke,
        Event: node + '.' + cmd,
        // Protocol: '',
        Type: 'RESPONSE',
        RawData: rawData,
    };
    detailLog.service.push(output);
}

module.exports = logg;