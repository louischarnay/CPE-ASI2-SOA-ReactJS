export type MessageSentByClient = {
    userId: number;
    content: string;
};

export type MessageReceivedByClient = {
    userId: number;
    userName: string;
    content: string;
    date: Date;
};