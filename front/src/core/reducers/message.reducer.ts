import Message from "../../models/message.model";

const initialState = {
    messages: [] as Message[]
};

export const messageReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'UPDATE_MESSAGES':
            return {
                ...state,
                messages: [...state.messages, action.payload], // Ajouter le message sans doublons
            };
        case 'EMPTY_MESSAGES':
            return {
                ...state,
                messages: [],
            }
        default:
            return state;
    }
};
