import { Server, Socket } from "socket.io";
import { generateRoomId, Room, Player } from "../models/room.model";

const JOIN_QUEUE_EVENT = 'join-queue';
const JOINED_QUEUE_EVENT = 'joined-queue';
const LEAVE_QUEUE_EVENT = 'leave-queue';
const LEFT_QUEUE_EVENT = 'left-queue';
const CREATED_ROOM_EVENT = 'created-room';

export class RoomSocket {
  private rooms: Room[] = [];
  private queue: Player[] = [];

  private constructor() {}

  static init(): RoomSocket {
    return new RoomSocket();
  }

  runSocket(socket: Socket, ioServer: Server) {
    socket.on(JOIN_QUEUE_EVENT, async (player: Player) => {
      console.log(`Queue joined by client ${player.id} with cards ${player.cards}`);

      this.queue.push(player);
      socket.emit(JOINED_QUEUE_EVENT);

      if (this.queue.length >= 2) {
        const player1 = this.queue.shift();
        const player2 = this.queue.shift();
        if (!player1 || !player2) {
          console.error('Players not found in queue');
          return;
        }

        const room: Room = {
          id: generateRoomId(this.rooms),
          player1,
          player2,
        };
        this.rooms.push(room);
        console.log(`Room created: ${room.id} with players ${room.player1.id} and ${room.player2.id}`);
        ioServer.emit(CREATED_ROOM_EVENT, room);
      }
    });

    socket.on(LEAVE_QUEUE_EVENT, async ({ id }: { id: number }) => {
      console.log(`Queue left by client ${id}`);
      this.queue = this.queue.filter((player) => player.id !== id);
      socket.emit(LEFT_QUEUE_EVENT);
    });
  }
}