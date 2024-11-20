import { describe, it, expect, beforeEach, vi } from "vitest";
import { DEFAULT_REMAINING_ACTIONS, GameManager } from "./game.manager";
import { CardService } from "../services/card.service";
import { EndTurn, GamePlay, NewPlayer } from "../models/game.model";

const DEFAULT_HP = 100;
const DEFAULT_ATTACK = 10;

describe("GameManager", () => {
  let gameManager: GameManager;
  let mockCardService: CardService;

  const createMockPlayer = (id: number, cards: number[]): NewPlayer => ({ id, cards });

  beforeEach(() => {
    mockCardService = {
      getCardById: vi.fn((id: number) =>
        Promise.resolve({ id, attack: DEFAULT_ATTACK, currentHp: DEFAULT_HP })
      ),
    } as unknown as CardService;

    gameManager = new GameManager(mockCardService);
  });

  it("should initialize a game room with two players", async () => {
    const player1 = createMockPlayer(1, [1, 2]);
    const player2 = createMockPlayer(2, [3, 4]);

    const game = await gameManager.initRoom(player1, player2);

    expect(game.player1.id).toBe(1);
    expect(game.player2.id).toBe(2);
    expect(game.player1.cards).toHaveLength(2);
    expect(game.player2.cards).toHaveLength(2);
    expect(mockCardService.getCardById).toHaveBeenCalledTimes(4);
  });

  it("should execute a play action successfully", async () => {
    const player1 = createMockPlayer(1, [1]);
    const player2 = createMockPlayer(2, [2]);

    const game = await gameManager.initRoom(player1, player2);
    console.log(game.player1.cards);
    const currentPlayer = game.currentPlayer === 1 ? player1 : player2;
    const opponent = game.currentPlayer === 1 ? player2 : player1;

    const play: GamePlay = {
      gameId: game.id,
      playerId: currentPlayer.id,
      cardId: currentPlayer.cards[0],
      targetCardId: opponent.cards[0],
    };

    const updatedGame = await gameManager.play(play);

    const opponentCard = updatedGame.currentPlayer === 1 ? updatedGame.player2.cards[0] : updatedGame.player1.cards[0];
    expect(opponentCard.currentHp).toBe(opponentCard.currentHp - DEFAULT_ATTACK);

    const player = updatedGame.currentPlayer === 1 ? updatedGame.player1 : updatedGame.player2;
    expect(player.remainingActions).toBe(2);
  });

  it("should throw an error if game ID is invalid in play action", async () => {
    const play: GamePlay = {
      gameId: 999, // Invalid ID
      playerId: 1,
      cardId: 1,
      targetCardId: 2,
    };

    await expect(gameManager.play(play)).rejects.toThrow("Game with ID 999 not found.");
  });
  
  it("should handle end of turn when all actions are used", async () => {
    const player1 = createMockPlayer(1, [1, 2, 3]);
    const player2 = createMockPlayer(2, [4, 5, 6]);
  
    const game = await gameManager.initRoom(player1, player2);
  
    const currentPlayer = game.currentPlayer === 1 ? game.player1 : game.player2;
    const opponent = game.currentPlayer === 1 ? game.player2 : game.player1;
  
    for (let i = 0; i < 3; i++) {
      await gameManager.play({
        gameId: game.id,
        playerId: currentPlayer.id,
        cardId: currentPlayer.cards[i].id,
        targetCardId: opponent.cards[i].id,
      });
    }
  
    const turnEnded = gameManager.checkTurnEnd({
      gameId: game.id,
      playerId: currentPlayer.id,
    });
  
    expect(turnEnded).toBe(true);
  
    const updatedGame = gameManager.findGameById(game.id);
    const newCurrentPlayer = updatedGame.currentPlayer === 1 ? updatedGame.player1 : updatedGame.player2;
  
    expect(updatedGame.currentPlayer).not.toBe(currentPlayer.id);
    expect(newCurrentPlayer.remainingActions).toBe(DEFAULT_REMAINING_ACTIONS);
  });
  
  it("should handle manual end of turn and switch current player", async () => {
    const player1 = createMockPlayer(1, [1]);
    const player2 = createMockPlayer(2, [2]);
  
    const game = await gameManager.initRoom(player1, player2);
    
    const endTurn: EndTurn = {
      gameId: game.id,
      playerId: game.currentPlayer,
    };
    const updatedGame = gameManager.endTurn(endTurn);
    expect(endTurn.playerId).not.toBe(game.currentPlayer);

    const newCurrentPlayer = updatedGame.currentPlayer === 1 ? updatedGame.player1 : updatedGame.player2;
    expect(newCurrentPlayer.remainingActions).toBe(DEFAULT_REMAINING_ACTIONS);
  });
  
  it("should not end the turn if player still has remaining actions", async () => {
    const player1 = createMockPlayer(1, [1, 2]);
    const player2 = createMockPlayer(2, [3, 4]);
  
    const game = await gameManager.initRoom(player1, player2);
    const currentPlayer = game.currentPlayer === 1 ? game.player1 : game.player2;
    const opponent = game.currentPlayer === 1 ? game.player2 : game.player1;
  
    await gameManager.play({
      gameId: game.id,
      playerId: currentPlayer.id,
      cardId: currentPlayer.cards[0].id,
      targetCardId: opponent.cards[0].id,
    });
  
    const turnEnded = gameManager.checkTurnEnd({
      gameId: game.id,
      playerId: currentPlayer.id,
    });
  
    expect(turnEnded).toBe(false);
  
    const updatedGame = gameManager.findGameById(game.id);
    expect(updatedGame.currentPlayer).toBe(currentPlayer.id);
    expect(currentPlayer.remainingActions).toBe(2);
  });  

  it("should correctly check if the game ends", async () => {
    const player1 = createMockPlayer(1, [1]);
    const player2 = createMockPlayer(2, []);

    const game = await gameManager.initRoom(player1, player2);

    const winner = gameManager.findWinnerIfExists(game.id);
    expect(winner).toBe(game.player1);
  });

  it("should return null if the game is not yet over", async () => {
    const player1 = createMockPlayer(1, [1]);
    const player2 = createMockPlayer(2, [2]);

    const game = await gameManager.initRoom(player1, player2);

    const winner = gameManager.findWinnerIfExists(game.id);

    expect(winner).toBeNull();
  });
});
