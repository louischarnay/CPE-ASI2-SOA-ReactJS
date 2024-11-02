import Card from "../../models/card.model";

const initialState = {
    userCards: [],
    buyCards: [],
    generatedCard: {} as Card
};

export const cardReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'UPDATE_USER_CARDS':
            return {
                ...state,
                userCards: action.payload,
            };
        case 'UPDATE_BUY_CARDS':
            return {
                ...state,
                buyCards: action.payload,
            };
        case 'UPDATE_GENERATED_CARD':
            return {
                ...state,
                generatedCard: action.payload,
            };
        default:
            return state;
    }
};
