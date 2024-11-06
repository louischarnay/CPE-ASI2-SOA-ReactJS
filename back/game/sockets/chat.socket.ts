import { Client } from "stompit";
import { UserService } from "../services/user.service";
import { MessageSentByClient } from "../models/message.model";
import { Server, Socket } from "socket.io";
import stompit from "stompit";
import { ESB_CONFIG } from "./esb.config";

const MESSAGE_SEND_EVENT = 'message-send';
const MESSAGE_RECEIVE_EVENT = 'message-receive';

export class ChatSocket {
  private constructor(private readonly userService: UserService) { }

  static async init(): Promise<ChatSocket> {
    const userService = new UserService();
    await userService.fetchAllUsers();
    return new ChatSocket(userService);
  }

  runSocket(socket: Socket, ioServer: Server, userSockets: Map<number, Socket>) {
    socket.on(MESSAGE_SEND_EVENT, async (data: MessageSentByClient) => {
      console.log(`Message received from client ${data.userId}: ${data.content}`);

      const userName = await this.userService.getUserName(data.userId);
      if (!userName) {
        console.error(`User with ID ${data.userId} not found`);
        return;
      }

      stompit.connect(ESB_CONFIG, (error: Error | null, client: Client) => {
        if (error) {
          console.error('Connection error:', error.message);
          return;
        }

        const sendHeaders = {
          'destination': '/topic/message',
          'content-type': 'application/json',
        };

        const frame = client.send(sendHeaders);
        frame.write(JSON.stringify(data));
        frame.end();
      });

      const messageReceived = {
        userId: data.userId,
        userName,
        content: data.content,
        date: new Date(),
      };

      if (!data.targetId) {
        console.log("all", MESSAGE_RECEIVE_EVENT, messageReceived)
        ioServer.emit(MESSAGE_RECEIVE_EVENT, messageReceived);
        return;
      }

      const senderSocket = userSockets.get(data.userId);
      console.log(senderSocket)
      const targetSocket = userSockets.get(data.targetId);
      console.log(targetSocket)

      senderSocket?.emit(MESSAGE_RECEIVE_EVENT, messageReceived);
      targetSocket?.emit(MESSAGE_RECEIVE_EVENT, messageReceived);

    });
  }
}
