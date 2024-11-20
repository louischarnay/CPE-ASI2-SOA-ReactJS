import { GlobalMessageReceived, PrivateMessageReceived } from "../../models/message.model";

const initialState = {
    messagesGlobal: [] as GlobalMessageReceived[],
    messagesPrivate: [] as PrivateMessageReceived[],
    targetId: 0
};

export const messageReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'UPDATE_MESSAGES_PRIVATE':
            return {
                ...state,
                messagesPrivate: [...state.messagesPrivate, action.payload],
            };
        case 'UPDATE_MESSAGES_GLOBAL':
            return {
                ...state,
                messagesGlobal: [...state.messagesGlobal, action.payload],
            };
        case 'SET_MESSAGES_PRIVATE':
            return {
                ...state,
                messagesPrivate: action.payload,
            };
        case 'SET_MESSAGES_GLOBAL':
            return {
                ...state,
                messagesGlobal: action.payload,
            };
        case 'EMPTY_MESSAGES':
            return {
                ...state,
                messagesPrivate: [], 
                messagesGlobal: []
            };
        case 'UPDATE_TARGET_ID':
            return {
                ...state,
                targetId: action.payload
            };
        default:
            return state;
    }
};