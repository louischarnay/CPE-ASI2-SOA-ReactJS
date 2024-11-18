import { Game } from "../models/game.model";
import { NewPlayer, Player } from "../models/game.model";

export class GameManager {
  private rooms: Game[] = [];

  constructor() { }

  initRoom(player1: NewPlayer, player2: NewPlayer): Game {
    const room: Game = {
      id: this.generateRoomId(),
      player1: this.buildPlayer(player1),
      player2: this.buildPlayer(player2),
      currentPlayer: Math.random() > 0.5 ? player1.id : player2.id,
    };
    this.rooms.push(room);
    return room;
  }

  private generateRoomId(): number {
    if (this.rooms.length === 0) return 0;
    const ids = this.rooms.map((room) => room.id);
    const maxId = Math.max(...ids);
    return maxId + 1;
  }

  private buildPlayer(player: NewPlayer): Player {
    return {
      id: player.id,
      cards: [], // TODO: Replace with actual cards
    };
  }
}