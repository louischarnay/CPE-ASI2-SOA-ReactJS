type WithTargetId = {
  targetId: number;
};

export type GlobalMessageSentByClient = {
  userId: number;
  content: string;
};

export type PrivateMessageSentByClient = GlobalMessageSentByClient & WithTargetId;

export type GlobalMessageReceivedByClient = {
  userId: number;
  userName: string;
  content: string;
  date: Date;
};

export type PrivateMessageReceivedByClient = GlobalMessageReceivedByClient & WithTargetId;