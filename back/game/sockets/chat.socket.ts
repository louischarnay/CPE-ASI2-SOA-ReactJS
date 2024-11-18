import { Client } from "stompit";
import { UserService } from "../services/user.service";
import { Server, Socket } from "socket.io";
import stompit from "stompit";
import { ESB_CONFIG } from "./esb.config";
import { GlobalMessageReceivedByClient, PrivateMessageReceivedByClient, PrivateMessageSentByClient } from "../models/message.model";

const MESSAGE_SEND_GLOBAL_EVENT = 'message-send-global';
const MESSAGE_SEND_PRIVATE_EVENT = 'message-send-private';
const MESSAGE_RECEIVE_GLOBAL_EVENT = 'message-receive-global';
const MESSAGE_RECEIVE_PRIVATE_EVENT = 'message-receive-private';

const HEADERS = {
  'destination': '/topic/message',
  'content-type': 'application/json',
};

export class ChatSocket {
  private constructor(private readonly userService: UserService) { }

  static async init(): Promise<ChatSocket> {
    const userService = new UserService();
    await userService.fetchAllUsers();
    return new ChatSocket(userService);
  }

  runSocket(socket: Socket, ioServer: Server, userSockets: Map<number, Socket>) {
    socket.on(MESSAGE_SEND_PRIVATE_EVENT, async (data: PrivateMessageSentByClient) => {
      const messageReceived = await this.handlePrivateMessage(data);
      if (!messageReceived) return;

      this.sendToESB(messageReceived);

      const senderSocket = userSockets.get(data.userId);
      const targetSocket = userSockets.get(data.targetId);

      senderSocket?.emit(MESSAGE_RECEIVE_PRIVATE_EVENT, messageReceived);
      targetSocket?.emit(MESSAGE_RECEIVE_PRIVATE_EVENT, messageReceived);
    });

    socket.on(MESSAGE_SEND_GLOBAL_EVENT, async (data: PrivateMessageSentByClient) => {
      const messageReceived = await this.handleGlobalMessage(data);
      if (!messageReceived) return;

      this.sendToESB(messageReceived);

      ioServer.emit(MESSAGE_RECEIVE_GLOBAL_EVENT, messageReceived);
    });
  }

  private async handlePrivateMessage(data: PrivateMessageSentByClient): Promise<PrivateMessageReceivedByClient | undefined> {
    console.log(`Private message received from client ${data.userId}: ${data.content}`);

    const userName = await this.userService.getUserName(data.userId);
    if (!userName) {
      console.error(`User with ID ${data.userId} not found`);
      return;
    }

    return {
      userId: data.userId,
      userName,
      targetId: data.targetId,
      content: data.content,
      date: new Date(),
    };
  }

  private async handleGlobalMessage(data: PrivateMessageSentByClient): Promise<GlobalMessageReceivedByClient | undefined> {
    console.log(`Global message received from client ${data.userId}: ${data.content}`);

    const userName = await this.userService.getUserName(data.userId);
    if (!userName) {
      console.error(`User with ID ${data.userId} not found`);
      return;
    }

    return {
      userId: data.userId,
      userName,
      content: data.content,
      date: new Date(),
    };
  }

  private sendToESB(data: PrivateMessageReceivedByClient | GlobalMessageReceivedByClient) {
    stompit.connect(ESB_CONFIG, (error: Error | null, client: Client) => {
      if (error) {
        console.error('Connection error:', error.message);
        return;
      }

      const frame = client.send(HEADERS);
      frame.write(JSON.stringify(data));
      frame.end();
    });
  }
}
