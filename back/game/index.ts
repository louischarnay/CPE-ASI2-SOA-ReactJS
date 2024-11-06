import express, { Express, Request, Response } from "express";
import stompit, { Client } from "stompit";
import { Server, Socket } from 'socket.io';
import { createServer } from 'http';
import { MessageSentByClient } from "./models/message.model";
import { UserService } from "./services/user.service";
import { ChatSocket } from "./sockets/chat.socket";

const app: Express = express();
const PORT = 4000;

const server = createServer(app);

const ioServer = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
})
const userService = new UserService();

ioServer.on('connection', (socket: Socket) => {
  console.log('a user connected');

  const chatSocket = new ChatSocket(socket);
  chatSocket.init();
});

server.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});