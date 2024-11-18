import { Button, TextField, Select, MenuItem, FormControl, InputLabel, Box } from "@mui/material";
import Message from "../../models/message.model";
import MessageComponent from "../MessageComponent/MessageComponent";
import { useCallback, useEffect, useState } from "react";
import { socket } from "../../socket/socket";
import User from "../../models/user.model";
import { useDispatch, useSelector } from "react-redux";
import { UserService } from "../../services/user.service";
import "./Chat.css"; // Import du fichier CSS

type ChatProps = { typeChat: string; };

const Chat = ({ typeChat }: ChatProps) => {
    const [message, setMessage] = useState("");
    const [targetList, setTargetList] = useState([] as User[]);
    const [selectedTarget, setSelectedTarget] = useState({} as User);

    const dispatch = useDispatch();

    const messagesPrivate: Message[] = useSelector((state: any) => state.messageReducer.messagesPrivate);
    const messagesGlobal: Message[] = useSelector((state: any) => state.messageReducer.messagesGlobal);
    const currentUser: User = useSelector((state: any) => state.userReducer.currentUser);

    const updateMessagesPrivate = useCallback((newMessage: Message) => {
        dispatch({
            type: 'UPDATE_MESSAGES_PRIVATE',
            payload: newMessage, // Envoie seulement le nouveau message
        });
    }, [dispatch]);

    const updateMessagesGlobal = useCallback((newMessage: Message) => {
        dispatch({
            type: 'UPDATE_MESSAGES_GLOBAL',
            payload: newMessage, // Envoie seulement le nouveau message
        });
    }, [dispatch]);


    const onMessageReceivedPrivate = useCallback((value: Message) => {
        updateMessagesPrivate(value);
    }, [updateMessagesPrivate]);

    const onMessageReceivedGlobal = useCallback((value: Message) => {
        updateMessagesGlobal(value);
    }, [updateMessagesGlobal]);

    const getTargets = async () => {
        const targets: User[] = await UserService.getAllUsers();
        setTargetList(targets); // Mets à jour la liste des cibles
    };

    const sendMessage = () => {
        if (typeChat === "global") {
            socket.emit("message-send-global", { content: message, userId: currentUser.id });
        } else {
            socket.emit("message-send-private", { content: message, userId: currentUser.id, targetId: selectedTarget.id });
        }
        setMessage("");
    };

    useEffect(() => {
        getTargets();
        socket.emit('register', currentUser.id);

        socket.on("message-receive-private", onMessageReceivedPrivate);
        socket.on("message-receive-global", onMessageReceivedGlobal);

        return () => {
            socket.off("message-receive", onMessageReceivedPrivate);
            socket.off("message-receive", onMessageReceivedGlobal);
        };
    }, [currentUser.id, onMessageReceivedPrivate, onMessageReceivedGlobal]);

    return (
        <>
            <h1>Chat</h1>
            {typeChat === "private" && (
                <FormControl fullWidth variant="filled" margin="normal">
                    <InputLabel>Select Target</InputLabel>
                    <Select
                        value={selectedTarget.id || ""}
                        onChange={(e) => {
                            const target = targetList.find((user) => user.id === e.target.value);
                            if (target) {
                                setSelectedTarget(target);
                            }
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
                    className="send-button"
                >
                    Send
                </Button>
            </div>
        </>
    );
};

export default Chat;
