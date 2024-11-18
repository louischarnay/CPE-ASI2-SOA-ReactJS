import { Socket } from "socket.io";
import { GameManager } from "../manager/game.manager";
import { CardService } from "../services/card.service";

const GAME_PLAYER_ATTACK_EVENT = 'game-player-attack';
const GAME_PLAYER_ATTACKED_EVENT = 'game-player-attacked';
const GAME_PLAYER_END_TURN_EVENT = 'game-player-end-turn-attacked';
const GAME_PLAYER_NEXT_TURN_EVENT = 'game-player-next-turn-attacked';
const GAME_END_EVENT = 'game-end-attacked';

export class GameSocket {
  private constructor(
    private readonly gameManager: GameManager,
    private readonly cardService: CardService
  ) {}

  static async init(gameManager: GameManager): Promise<GameSocket> {
    const cardService = new CardService();
    await cardService.fetchAllCards();
    return new GameSocket(gameManager, cardService);
  }

  runSocket(socket: Socket, userSockets: Map<number, Socket>) {
    
  }
}