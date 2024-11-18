import { Socket } from "socket.io";
import { NewPlayer } from "../models/game.model";
import { GameManager } from "../manager/game.manager";

const JOIN_QUEUE_EVENT = 'join-queue';
const JOINED_QUEUE_EVENT = 'joined-queue';
const LEAVE_QUEUE_EVENT = 'leave-queue';
const LEFT_QUEUE_EVENT = 'left-queue';
const CREATED_ROOM_EVENT = 'created-room';

export class RoomSocket {
  private queue: NewPlayer[] = [];

  private constructor(private readonly gameManager: GameManager) {}

  static init(gameManager: GameManager): RoomSocket {
    return new RoomSocket(gameManager);
  }

  runSocket(socket: Socket, userSockets: Map<number, Socket>) {
    socket.on(JOIN_QUEUE_EVENT, async (player: NewPlayer) => {
      console.log(`Queue joined by client ${player.id}`);

      this.queue.push(player);
      socket.emit(JOINED_QUEUE_EVENT);

      if (this.queue.length < 2) return;

      const player1 = this.queue.shift();
      const player2 = this.queue.shift();
      if (!player1 || !player2) {
        console.error('Players not found in queue');
        return;
      }

      const room = this.gameManager.initRoom(player1, player2);
      
      const player1Socket = userSockets.get(room.player1.id);
      const player2Socket = userSockets.get(room.player2.id);

      player1Socket?.emit(CREATED_ROOM_EVENT, room);
      player2Socket?.emit(CREATED_ROOM_EVENT, room);
    });

    socket.on(LEAVE_QUEUE_EVENT, async ({ id }: { id: number }) => {
      console.log(`Queue left by client ${id}`);
      this.queue = this.queue.filter((player) => player.id !== id);
      socket.emit(LEFT_QUEUE_EVENT);
    });
  }
}