import { Socket } from "socket.io";
import { GameManager } from "../manager/game.manager";
import { EndTurn, Game, GamePlay } from "../models/game.model";

const GAME_PLAYER_ATTACK_EVENT = 'game-player-attack';
const GAME_PLAYER_ATTACKED_EVENT = 'game-player-attacked';
const GAME_PLAYER_END_TURN_EVENT = 'game-player-end-turn';
const GAME_PLAYER_NEXT_TURN_EVENT = 'game-player-next-turn';
const GAME_END_EVENT = 'game-end';

export class GameSocket {
  constructor(private readonly gameManager: GameManager) { }

  runSocket(socket: Socket, userSockets: Map<number, Socket>) {
    socket.on(GAME_PLAYER_ATTACK_EVENT, async (data: GamePlay) => {
      console.log(`Player ${data.playerId} attacking with card ${data.cardId} in game ${data.gameId}`);

      const game = await this.gameManager.play(data);
      const opponentSocket = this.getOpponentSocket(data.playerId, game, userSockets);

      socket.emit(GAME_PLAYER_ATTACKED_EVENT, game);
      opponentSocket?.emit(GAME_PLAYER_ATTACKED_EVENT, game);

      if (this.gameManager.checkTurnEnd(data)) {
        const opponentSocket = this.getOpponentSocket(data.playerId, game, userSockets);

        socket.emit(GAME_PLAYER_NEXT_TURN_EVENT, game);
        opponentSocket?.emit(GAME_PLAYER_NEXT_TURN_EVENT, game);
      }

      const winner = this.gameManager.findWinnerIfExists(data.gameId);
      if (winner) {
        socket.emit(GAME_END_EVENT, { winner });
        opponentSocket?.emit(GAME_END_EVENT, { winner });
      }
    });

    socket.on(GAME_PLAYER_END_TURN_EVENT, (data: EndTurn) => {
      console.log(`Player ${data.playerId} ended their turn in game ${data.gameId}`);

      const game = this.gameManager.endTurn(data);
      const opponentSocket = this.getOpponentSocket(data.playerId, game, userSockets);

      socket.emit(GAME_PLAYER_NEXT_TURN_EVENT, game);
      opponentSocket?.emit(GAME_PLAYER_NEXT_TURN_EVENT, game);
    });
  }

  private getOpponentSocket(playerId: number, game: Game, userSockets: Map<number, Socket>): Socket | undefined {
    const opponentId = game.player1.id === playerId ? game.player2.id : game.player1.id;
    return userSockets.get(opponentId);
  }
}
