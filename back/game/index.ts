import express, { Express, Request, Response } from "express";
import { Server, Socket } from 'socket.io';
import { createServer } from 'http';
import { ChatSocket } from "./sockets/chat.socket";
import { RoomSocket } from "./sockets/room.socket";
import { GameManager } from "./manager/game.manager";
import { GameSocket } from "./sockets/game.socket";
import { CardService } from "./services/card.service";
import { UserService } from "./services/user.service";

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
  const cardService = new CardService();
  await cardService.fetchAllCards();
  const userService = new UserService();
  await userService.fetchAllUsers();

  const gameManager = new GameManager(cardService);
  const chatSocket = new ChatSocket(userService);
  const roomSocket = new RoomSocket(gameManager);
  const gameSocket = new GameSocket(gameManager);

  ioServer.on('connection', (socket: Socket) => {
    socket.on('register', (userId: number) => {
      if(userSockets.has(userId)) {
        console.log(`User ${userId} already connected`);
        return;
      }
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