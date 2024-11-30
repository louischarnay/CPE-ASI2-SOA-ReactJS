import { Game, GameCard } from "../../models/game.model";
import User from "../../models/user.model";

const initialState = {
    game: {} as Game,
    firstSelectedCard: {} as GameCard,
    secondSelectedCard: {} as GameCard,
    winner: {} as User
};

export const gameReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'UPDATE_GAME':
            return {
                ...state,
                game: action.payload,
            };
        case 'UPDATE_FIRST_CARD':
            return {
                ...state,
                firstSelectedCard: action.payload,
            };
        case 'UPDATE_SECOND_GAME':
            return {
                ...state,
                secondSelectedCard: action.payload,
            };
        case 'RESET_SELECTED_CARDS':
            return {
                ...state,
                firstSelectedCard: {},
                secondSelectedCard: {}
            }
        case 'UPDATE_WINNER': 
            return {
                ...state,
                winner: action.payload
            }
        default:
            return state;
    }
};
