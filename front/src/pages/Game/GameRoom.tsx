import { useDispatch, useSelector } from "react-redux";
import { EndTurn, Game, GameCard, GamePlay, Player } from "../../models/game.model";
import PlayerCards from "../../components/Game/PlayerCards";
import User from "../../models/user.model";
import { Button } from "@mui/material";
import { useSocket } from "../../socket/socketGameContext";
import { useEffect } from "react";
import { UserService } from "../../services/user.service";
import { useNavigate } from "react-router-dom";

const GameRoom = () => {
    const { gameSocket } = useSocket();

    const currentGame: Game = useSelector((state: any) => state.gameReducer.game);
    const firstSelectedCard: GameCard = useSelector((state: any) => state.gameReducer.firstSelectedCard);
    const secondSelectedCard: GameCard = useSelector((state: any) => state.gameReducer.secondSelectedCard);
    const currentUser: User = useSelector((state: any) => state.userReducer.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleAttack = () => {
        if (!gameSocket) return;

        const gamePlay: GamePlay = {
            gameId: currentGame.id,
            playerId: currentUser.id,
            cardId: secondSelectedCard.id,
            targetCardId: firstSelectedCard.id,
        };

        console.log(currentGame)
        dispatch({
            type: "RESET_SELECTED_CARDS",
        });
        gameSocket.emit("game-player-attack", gamePlay);

    };

    const handleGameUpdate = (room: Game) => {
        console.log("Player attacked:", room);
        dispatch({
            type: 'UPDATE_GAME',
            payload: room
        })
    };

    const handleEndTurn = () => {
        if (!gameSocket) return;
        const endTurn: EndTurn = {
            gameId: currentGame.id,
            playerId: currentUser.id
        };
        gameSocket.emit("game-player-end-turn", endTurn);
    }

    const handleGameEnd = async (winner: any) => {
        console.log("winner", winner)
        const winnerUser: User = await UserService.getUserById(winner.winner.id);
        console.log("winnerUser", winnerUser)
        dispatch({
            type: 'UPDATE_WINNER',
            payload: winnerUser
        })
        navigate("/winner/")
    }

    useEffect(() => {
        if (!gameSocket) return;

        gameSocket.on("game-player-attacked", handleGameUpdate);
        gameSocket.on("game-player-next-turn", handleGameUpdate);
        gameSocket.on("game-end", handleGameEnd);

        return () => {
            gameSocket.off("game-player-attacked", handleGameUpdate);
            gameSocket.off("game-player-next-turn", handleGameUpdate);
            gameSocket.off("game-end", handleGameEnd);

        };
    }, [gameSocket]);

    return (
        <>
            <h1>Game</h1>
            {!firstSelectedCard && !secondSelectedCard && <p>Select cards to attack</p>}
            <h2>Opponent Cards</h2>
            {currentUser.id === currentGame.player1.id ?
                <PlayerCards
                    cards={currentGame.player2.cards}
                    targetCard="firstSelectedCard"
                    isSelectable
                /> :
                <PlayerCards
                    cards={currentGame.player1.cards}
                    targetCard="firstSelectedCard"
                    isSelectable
                />
            }

            {/* Attack button visible only for the current player */}
            {currentUser.id === currentGame.currentPlayer && (
                <>
                    {
                        (firstSelectedCard && secondSelectedCard) && (
                            <Button onClick={handleAttack} disabled={!firstSelectedCard || !secondSelectedCard}>
                                Attack
                            </Button>
                        )
                    }
                    <Button onClick={handleEndTurn} disabled={!firstSelectedCard || !secondSelectedCard}>
                        End Turn
                    </Button>
                </>
            )}

            <h2>Your Cards</h2>
            {currentUser.id === currentGame.player1.id ?
                <PlayerCards
                    cards={currentGame.player1.cards}
                    targetCard="secondSelectedCard"
                    isSelectable
                /> :
                <PlayerCards
                    cards={currentGame.player2.cards}
                    targetCard="secondSelectedCard"
                    isSelectable
                />
            }

        </>
    );
};

export default GameRoom;
