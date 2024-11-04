export type MessageSentByClient = {
    userId: number;
    targetId?: number;
    content: string;
};

export type MessageReceivedByClient = {
    userId: number;
    userName: string;
    targetId?: number;
    content: string;
    date: Date;
};