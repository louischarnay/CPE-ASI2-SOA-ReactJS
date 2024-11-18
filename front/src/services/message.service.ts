import { GlobalMessageReceived, PrivateMessageReceived } from "../models/message.model";
import { apiFetch } from "../utils/apiFetch";
import config from "../config/config.json"

export class MessageService {
    static async getAllMessages(userId: number): Promise<PrivateMessageReceived | GlobalMessageReceived> {
        return apiFetch(`/messages?userId=${userId}`, 'GET', undefined, undefined, config.messagesUrl)
    }

}