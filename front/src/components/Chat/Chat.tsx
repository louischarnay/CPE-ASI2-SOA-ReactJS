import { Button, TextField, Select, MenuItem, FormControl, InputLabel, Box } from "@mui/material";
import MessageComponent from "../MessageComponent/MessageComponent";
import { useCallback, useEffect, useState } from "react";
import { socket } from "../../socket/socket";
import User from "../../models/user.model";
import { useDispatch, useSelector } from "react-redux";
import { UserService } from "../../services/user.service";
import { MessageService } from "../../services/message.service";
import "./Chat.css";
import { GlobalMessageReceived, PrivateMessageReceived } from "../../models/message.model";

type ChatProps = { typeChat: string; };

interface APIMessage {
    targetId: number;
    message: string;
    userId: number;
    timestamp: string;
}

const Chat = ({ typeChat }: ChatProps) => {
    const [message, setMessage] = useState("");
    const [targetList, setTargetList] = useState([] as User[]);
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    const messagesPrivate: PrivateMessageReceived[] = useSelector((state: any) => state.messageReducer.messagesPrivate);
    const messagesGlobal: GlobalMessageReceived[] = useSelector((state: any) => state.messageReducer.messagesGlobal);
    const targetId: number = useSelector((state: any) => state.messageReducer.targetId);
    const currentUser: User = useSelector((state: any) => state.userReducer.currentUser);

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

        if (typeChat === "private" && targetId == 0) {
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

    const getTargets = async () => {
        const targets: User[] = await UserService.getAllUsers();
        setTargetList(targets.filter(target => target.id !== currentUser.id)); // Filtrer l'utilisateur courant
    };

    const sendMessage = () => {
        if (message.trim() === "") return;

        if (typeChat === "global") {
            socket.emit("message-send-global", {
                content: message,
                userId: currentUser.id
            });
        } else if (targetId) {
            socket.emit("message-send-private", {
                content: message,
                userId: currentUser.id,
                targetId: targetId
            });
        }
        setMessage("");
    };

    useEffect(() => {
        getTargets();
        socket.open();
        socket.emit('register', currentUser.id);

        socket.on("message-receive-private", onMessageReceivedPrivate);
        socket.on("message-receive-global", onMessageReceivedGlobal);

        loadMessageHistory()

        return () => {
            socket.off("message-receive-private", onMessageReceivedPrivate);
            socket.off("message-receive-global", onMessageReceivedGlobal);
            socket.close();
        };
    }, [currentUser.id, onMessageReceivedPrivate, onMessageReceivedGlobal]);

    useEffect(() => {
        console.log(typeChat)
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
        <>
            <h1>Chat</h1>
            {typeChat === "private" && (
                <FormControl fullWidth variant="filled" margin="normal">
                    <InputLabel>Select Target</InputLabel>
                    <Select
                        value={targetId || ""}
                        onChange={(e: any) => {
                            const newTargetId = e.target.value as number;
                            dispatch({
                                type: 'UPDATE_TARGET_ID',
                                payload: newTargetId,
                            });
                        }}
                    >
                        {targetList.map((target) => (
                            <MenuItem key={target.id} value={target.id}>
                                {target.surName} {target.lastName} ({target.login})
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            )}
            <Box className="messages-container">
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

            <div className="input-bar">
                <TextField
                    fullWidth
                    label="Send a message"
                    variant="filled"
                    value={message}
                    onChange={(e: any) => setMessage(e.target.value)}
                    className="input-field"
                />
                <Button
                    variant="contained"
                    onClick={sendMessage}
                    disabled={typeChat === "private" && !targetId}
                    className="send-button"
                >
                    Send
                </Button>
            </div>
        </>
    );
};

export default Chat;
