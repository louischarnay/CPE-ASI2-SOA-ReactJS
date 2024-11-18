import express, { Express, Request, Response } from "express";
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

const userSockets = new Map<number, Socket>();

(async () => {
  const gameManager = new GameManager();
  const chatSocket = await ChatSocket.init();
  const roomSocket = RoomSocket.init(gameManager);
  const gameSocket = await GameSocket.init(gameManager);

  ioServer.on('connection', (socket: Socket) => {
    socket.on('register', (userId: number) => {
      userSockets.set(userId, socket);
      console.log(`User ${userId} connected`);

      chatSocket.runSocket(socket, ioServer, userSockets);
      roomSocket.runSocket(socket, userSockets);
      gameSocket.runSocket(socket, userSockets);
      
      socket.on('disconnect', () => {
        userSockets.delete(userId);
        console.log(`User ${userId} disconnected`);
      });
    });
  });

  server.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
  });
})();