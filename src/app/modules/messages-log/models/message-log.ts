import { MessageType } from './message-type';

export interface MessageLog {
    title: string;
    text: string;
    html: any;
    isHtml: boolean;
    type: MessageType;
    date: Date;
}

export function successTextMessageLog(title: string, text: string = null): MessageLog {
    return {
        title,
        text,
        type: MessageType.SUCCESS
    } as MessageLog;
}

export function errorTextMessageLog(title: string, text: string = null): MessageLog {
    return {
        title,
        text,
        type: MessageType.ERROR
    } as MessageLog;
}

export function infoTextMessageLog(title: string, text: string = null): MessageLog {
    return {
        title,
        text,
        type: MessageType.INFO
    } as MessageLog;
}

export function warningTextMessageLog(title: string, text: string = null): MessageLog {
    return {
        title,
        text,
        type: MessageType.WARNING
    } as MessageLog;
}

export function neutralTextMessageLog(title: string, text: string = null): MessageLog {
    return {
        title,
        text,
        type: MessageType.NEUTRAL
    } as MessageLog;
}

export function successHtmlMessageLog(title: string, html: any): MessageLog {
    return {
        title,
        html,
        isHtml: true,
        type: MessageType.SUCCESS
    } as MessageLog;
}

export function errorHtmlMessageLog(title: string, html: any): MessageLog {
    return {
        title,
        html,
        isHtml: true,
        type: MessageType.ERROR
    } as MessageLog;
}

export function infoHtmlMessageLog(title: string, html: any): MessageLog {
    return {
        title,
        html,
        isHtml: true,
        type: MessageType.INFO
    } as MessageLog;
}

export function warningHtmlMessageLog(title: string, html: any): MessageLog {
    return {
        title,
        html,
        isHtml: true,
        type: MessageType.WARNING
    } as MessageLog;
}

export function neutralHtmlMessageLog(title: string, html: any): MessageLog {
    return {
        title,
        html,
        isHtml: true,
        type: MessageType.NEUTRAL
    } as MessageLog;
}
