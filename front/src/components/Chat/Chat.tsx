import { Button, TextField, Select, MenuItem, FormControl, InputLabel, Box } from "@mui/material";
import MessageComponent from "../MessageComponent/MessageComponent";
import { useCallback, useEffect, useState } from "react";
import { socket } from "../../socket/socket";
import User from "../../models/user.model";
import { useDispatch, useSelector } from "react-redux";
import { UserService } from "../../services/user.service";
import "./Chat.css";
import { GlobalMessageReceived, GlobalMessageSent, PrivateMessageReceived, PrivateMessageSent } from "../../models/message.model";

type ChatProps = { typeChat: string; };

const Chat = ({ typeChat }: ChatProps) => {
    const [message, setMessage] = useState("");
    const [targetList, setTargetList] = useState([] as User[]);

    const dispatch = useDispatch();

    const messagesPrivate: PrivateMessageReceived[] = useSelector((state: any) => state.messageReducer.messagesPrivate);
    const messagesGlobal: GlobalMessageReceived[] = useSelector((state: any) => state.messageReducer.messagesGlobal);
    const targetId: number = useSelector((state: any) => state.messageReducer.targetId);
    const currentUser: User = useSelector((state: any) => state.userReducer.currentUser);

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
        // Vérification que la conversation concerne soit l'expéditeur soit le destinataire
        if ((value.userId === currentUser.id && value.targetId === targetId) || 
            (value.targetId === currentUser.id && value.userId === targetId)) {
            updateMessagesPrivate(value);
        }
    }, [targetId, currentUser.id, updateMessagesPrivate]); // Ajout de targetId dans les dépendances

    const onMessageReceivedGlobal = useCallback((value: GlobalMessageReceived) => {
        updateMessagesGlobal(value);
    }, [updateMessagesGlobal]);

    const getTargets = async () => {
        const targets: User[] = await UserService.getAllUsers();
        setTargetList(targets);
    };

    const sendMessage = () => {
        if (message.trim() === "") return;

        if (typeChat === "global") {
            socket.emit("message-send-global", { 
                content: message, 
                userId: currentUser.id 
            } as GlobalMessageSent);
        } else if (targetId) {
            socket.emit("message-send-private", { 
                content: message, 
                userId: currentUser.id, 
                targetId: targetId 
            } as PrivateMessageSent);
        }
        setMessage("");
    };

    // Effet pour gérer les connexions socket
    useEffect(() => {
        getTargets();
        socket.open();
        socket.emit('register', currentUser.id);

        socket.on("message-receive-private", onMessageReceivedPrivate);
        socket.on("message-receive-global", onMessageReceivedGlobal);

        return () => {
            socket.off("message-receive-private", onMessageReceivedPrivate);
            socket.off("message-receive-global", onMessageReceivedGlobal);
            socket.close();
        };
    }, [currentUser.id, onMessageReceivedPrivate, onMessageReceivedGlobal]);

    // Effet pour nettoyer les messages quand on change de destinataire
    useEffect(() => {
        if (typeChat === "private") {
            dispatch({ type: 'EMPTY_MESSAGES' });
        }
    }, [targetId, dispatch, typeChat]);

    return (
        <>
            <h1>Chat</h1>
            {typeChat === "private" && (
                <FormControl fullWidth variant="filled" margin="normal">
                    <InputLabel>Select Target</InputLabel>
                    <Select
                        value={targetId || ""}
                        onChange={(e) => {
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
                {typeChat === "global" ?
                    messagesGlobal
                        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                        .map((message, index) => (
                            <MessageComponent key={index} message={message} />
                        )) :
                    messagesPrivate
                        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                        .map((message, index) => (
                            <MessageComponent key={index} message={message} />
                        ))}
            </Box>

            <div className="input-bar">
                <TextField
                    fullWidth
                    label="Send a message"
                    variant="filled"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
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
