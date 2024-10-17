const initialState = {
    userCards: [],
    buyCards: []
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
        default:
            return state;
    }
};
