import express, { Express } from "express";
import { Server, Socket } from 'socket.io';
import { createServer } from 'http';
import { ChatSocket } from "./sockets/chat.socket";
import { RoomSocket } from "./sockets/room.socket";
import { GameManager } from "./manager/game.manager";
import { GameSocket } from "./sockets/game.socket";

const app: Express = express();
const PORT = 4000;

const server = createServer(app);

const ioServer = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const chatUserSockets = new Map<number, Socket>();
const gameUserSockets = new Map<number, Socket>();

(async () => {
  const chatSocket = new ChatSocket();
  const gameManager = new GameManager();
  const roomSocket = new RoomSocket(gameManager);
  const gameSocket = new GameSocket(gameManager);

  ioServer.on('connection', (socket: Socket) => {
    socket.on('register-chat', (userId: number) => {
      if(chatUserSockets.has(userId)) {
        console.log(`User ${userId} already connected in chat`);
        return;
      }
      chatUserSockets.set(userId, socket);
      console.log(`User ${userId} connected in chat`);

      chatSocket.runSocket(socket, ioServer, chatUserSockets);
      
      socket.on('disconnect', () => {
        chatUserSockets.delete(userId);
        console.log(`User ${userId} disconnected from chat`);
      });
    });
    socket.on('register-game', (userId: number) => {
      if(gameUserSockets.has(userId)) {
        console.log(`User ${userId} already connected in game`);
        return;
      }
      gameUserSockets.set(userId, socket);
      console.log(`User ${userId} connected in game`);

      roomSocket.runSocket(socket, chatUserSockets);
      gameSocket.runSocket(socket, chatUserSockets);

      socket.on('disconnect', () => {
        gameUserSockets.delete(userId);
        console.log(`User ${userId} disconnected from game`);
      });
    });
  });

  server.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
  });
})();