import { Client } from "stompit";
import { UserService } from "../services/user.service";
import { MessageSentByClient } from "../models/message.model";
import { Socket } from "socket.io";
import stompit from "stompit";
import { ESB_CONFIG } from "./esb.config";

const MESSAGE_SEND_EVENT = 'message-send';
const MESSAGE_RECEIVE_EVENT = 'message-receive';

export class ChatSocket {
  private readonly userService: UserService;

  constructor(private readonly socket: Socket) {
    this.userService = new UserService();
    this.userService.fetchAllUsers();
  }

  init() {
    this.socket.on(MESSAGE_SEND_EVENT, async (data: MessageSentByClient) => {
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
          'destination': '/queue/test',
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

      this.socket.emit(MESSAGE_RECEIVE_EVENT, messageReceived);
    });
  }
}