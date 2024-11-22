import { Card } from "../models/card.model";
import { EndTurn, Game, GamePlay } from "../models/game.model";
import { NewPlayer, Player, GameCard } from "../models/game.model";
import { CardService } from "../services/card.service";

export const DEFAULT_REMAINING_ACTIONS = 3;

export class GameManager {
  private cards: Card[] = [];
  private games: Game[] = [];

  constructor() {}

  async initRoom(player1: NewPlayer, player2: NewPlayer): Promise<Game> {
    const game: Game = {
      id: this.generateRoomId(),
      player1: await this.buildPlayer(player1),
      player2: await this.buildPlayer(player2),
      currentPlayer: Math.random() > 0.5 ? player1.id : player2.id,
    };
    this.games.push(game);
    return game;
  }

  async play(play: GamePlay): Promise<Game> {
    const game = this.findGameById(play.gameId);
    if (game.currentPlayer !== play.playerId) {
      throw new Error(`Player ${play.playerId} is not allowed to play in game ${play.gameId}.`);
    }

    const player = this.findPlayerById(game, play.playerId);
    const opponent = this.getOpponent(game, play.playerId);

    const card = this.findCardById(player.cards, play.cardId);
    const targetCard = this.findCardById(opponent.cards, play.targetCardId);

    const damage = Math.max(Math.floor(card.attack * (1 - targetCard.defence / 100)), 1);
    targetCard.currentHp -= damage;

    if (targetCard.currentHp <= 0) {
      opponent.cards = opponent.cards.filter((c) => c.id !== targetCard.id);
    }

    player.remainingActions--;
    return game;
  }

  checkTurnEnd({ gameId, playerId }: EndTurn): boolean {
    const game = this.findGameById(gameId);
    const player = this.findPlayerById(game, playerId);

    if (player.remainingActions <= 0) {
      this.endTurn({ gameId, playerId });
      return true;
    }
    return false;
  }

  endTurn({ gameId, playerId }: EndTurn): Game {
    const game = this.findGameById(gameId);
    const player = this.findPlayerById(game, playerId);

    player.remainingActions = DEFAULT_REMAINING_ACTIONS;
    game.currentPlayer = this.getOpponent(game, playerId).id;

    return game;
  }

  findWinnerIfExists(gameId: number): Player | null {
    const game = this.findGameById(gameId);

    if (game.player1.cards.length === 0) return game.player2;
    if (game.player2.cards.length === 0) return game.player1;

    return null;
  }

  private generateRoomId(): number {
    return this.games.length > 0 ? Math.max(...this.games.map((room) => room.id)) + 1 : 0;
  }

  private async buildPlayer(player: NewPlayer): Promise<Player> {
    const cards = await Promise.all(
      player.cards.map(async (cardId) => await this.getCardById(cardId))
    );
    return {
      id: player.id,
      cards,
      remainingActions: DEFAULT_REMAINING_ACTIONS,
    };
  }

  public findGameById(gameId: number): Game {
    const game = this.games.find((g) => g.id === gameId);
    if (!game) throw new Error(`Game with ID ${gameId} not found.`);
    return game;
  }

  private findPlayerById(game: Game, playerId: number): Player {
    const player = [game.player1, game.player2].find((p) => p.id === playerId);
    if (!player) throw new Error(`Player with ID ${playerId} not found in game ${game.id}.`);
    return player;
  }

  private findCardById(cards: GameCard[], cardId: number): GameCard {
    const card = cards.find((c) => c.id === cardId);
    if (!card) throw new Error(`Card with ID ${cardId} not found.`);
    return card;
  }

  private getOpponent(game: Game, playerId: number): Player {
    return game.player1.id === playerId ? game.player2 : game.player1;
  }

  private async getCardById(id: number): Promise<GameCard> {
    const existingCard = this.cards.find((c) => c.id === id);
    if (existingCard) return {...existingCard, currentHp: existingCard.hp};

    const card = await CardService.getCardById(id);
    if (!card) throw new Error(`Card with ID ${id} not found.`);
    
    this.cards.push(card);
    return {...card, currentHp: card.hp};
  }
}
