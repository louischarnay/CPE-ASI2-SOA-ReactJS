import { Box } from "@mui/material";
import MessageComponent from "../MessageComponent/MessageComponent";
import { useCallback, useEffect, useState } from "react";
import { socket } from "../../socket/socket";
import User from "../../models/user.model";
import { useDispatch, useSelector } from "react-redux";
import { UserService } from "../../services/user.service";
import { MessageService } from "../../services/message.service";
import "./Chat.css";
import { GlobalMessageReceived, PrivateMessageReceived } from "../../models/message.model";

interface APIMessage {
    targetId: number;
    message: string;
    userId: number;
    timestamp: string;
}

const Chat = () => {
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    const messagesPrivate: PrivateMessageReceived[] = useSelector((state: any) => state.messageReducer.messagesPrivate);
    const messagesGlobal: GlobalMessageReceived[] = useSelector((state: any) => state.messageReducer.messagesGlobal);
    const targetId: number = useSelector((state: any) => state.messageReducer.targetId);
    const currentUser: User = useSelector((state: any) => state.userReducer.currentUser);
    const typeChat: string = useSelector((state: any) => state.messageReducer.typeChat);

    const convertApiMessage = async (apiMessage: APIMessage) => {
        const user = await UserService.getUserById(apiMessage.userId)
        return {
            userId: apiMessage.userId,
            content: apiMessage.message,
            date: (new Date(apiMessage.timestamp)).toISOString(),
            userName: user.surName,
            ...(apiMessage.targetId !== -1 && { targetId: apiMessage.targetId })
        };
    };

    const loadMessageHistory = async () => {
        // Si on est en mode privé et qu'il n'y a pas de targetId, on ne charge pas les messages
        if (typeChat === "private" && !targetId) {
            dispatch({ type: 'EMPTY_MESSAGES' });
            return;
        }

        if (typeChat === "private" && targetId === 0) {
            return;
        }

        try {
            setIsLoading(true);
            const response = await MessageService.getAllMessages(currentUser.id);
            const allMessages = Array.isArray(response) ? response : [];

            // On vide d'abord les messages avant d'ajouter les nouveaux
            dispatch({ type: 'EMPTY_MESSAGES' });

            if (typeChat === "global") {
                const globalMessages = await Promise.all(
                    allMessages
                        .filter((msg: APIMessage) => msg.targetId === -1)
                        .map(async (msg) => await convertApiMessage(msg))
                );
                dispatch({
                    type: 'SET_MESSAGES_GLOBAL',
                    payload: globalMessages
                });
            } else if (typeChat === "private" && targetId) {
                const privateMessages = await Promise.all(
                    allMessages
                        .filter((msg: APIMessage) =>
                            (msg.targetId === targetId && msg.userId === currentUser.id) ||
                            (msg.targetId === currentUser.id && msg.userId === targetId)
                        )
                        .map(async (msg) => await convertApiMessage(msg))
                );

                dispatch({
                    type: 'SET_MESSAGES_PRIVATE',
                    payload: privateMessages
                });
            }
        } catch (error) {
            console.error("Error loading message history:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const updateMessagesPrivate = useCallback((newMessage: PrivateMessageReceived) => {
        dispatch({
            type: 'UPDATE_MESSAGES_PRIVATE',
            payload: newMessage,
        });
    }, [dispatch]);

    const updateMessagesGlobal = useCallback((newMessage: GlobalMessageReceived) => {
        dispatch({
            type: 'UPDATE_MESSAGES_GLOBAL',
            payload: newMessage,
        });
    }, [dispatch]);

    const onMessageReceivedPrivate = useCallback((value: PrivateMessageReceived) => {
        if ((value.userId === currentUser.id && value.targetId === targetId) ||
            (value.targetId === currentUser.id && value.userId === targetId)) {
            updateMessagesPrivate(value);
        }
    }, [targetId, currentUser.id, updateMessagesPrivate]);

    const onMessageReceivedGlobal = useCallback((value: GlobalMessageReceived) => {
        updateMessagesGlobal(value);
    }, [updateMessagesGlobal]);



    useEffect(() => {
        socket.emit('register', currentUser.id);

        socket.on("message-receive-private", onMessageReceivedPrivate);
        socket.on("message-receive-global", onMessageReceivedGlobal);

        loadMessageHistory()

        return () => {
            socket.off("message-receive-private", onMessageReceivedPrivate);
            socket.off("message-receive-global", onMessageReceivedGlobal);
        };
    }, [currentUser.id, onMessageReceivedPrivate, onMessageReceivedGlobal]);

    useEffect(() => {
        loadMessageHistory();
    }, [typeChat, targetId]);

    const showGlobalMessages = () => {
        const copyGlobal = [...messagesGlobal]
        return copyGlobal
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            .map((message, index) => (
                <MessageComponent key={`global-${index}`} message={message} />
            ))
    }

    const showPrivateMessages = () => {
        const copyPrivate = [...messagesPrivate]
        return copyPrivate
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            .map((message, index) => (
                <MessageComponent key={`private-${index}`} message={message} />
            ))
    }

    return (
        <Box className="fexible messages-container">
            {isLoading ? (
                <div>Loading messages...</div>
            ) : typeChat === "global" ? (
                showGlobalMessages()
            ) : targetId ? (
                showPrivateMessages()
            ) : (
                <div>Please select a user to start chatting</div>
            )}
        </Box>
    );
};

export default Chat;
