type WithTargetId = {
    targetId: number;
};

export type GlobalMessageSent = {
    userId: number;
    content: string;
};

export type PrivateMessageSent = GlobalMessageSent & WithTargetId;

export type GlobalMessageReceived = {
    userId: number;
    userName: string;
    content: string;
    date: Date;
};

export type PrivateMessageReceived = GlobalMessageReceived & WithTargetId;