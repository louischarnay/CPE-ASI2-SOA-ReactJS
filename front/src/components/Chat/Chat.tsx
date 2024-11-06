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

    const messages: Message[] = useSelector((state: any) => state.messageReducer.messages);
    const currentUser: User = useSelector((state: any) => state.userReducer.currentUser);   

    const updateMessages = useCallback((newMessage: Message) => {
        dispatch({
            type: 'UPDATE_MESSAGES',
            payload: newMessage, // Envoie seulement le nouveau message
        });
    }, [dispatch]);
    
    
    const onMessageReceived = useCallback((value: Message) => {
        updateMessages(value);
    }, [updateMessages]);

    const getTargets = async () => {
        const targets: User[] = await UserService.getAllUsers();
        setTargetList(targets); // Mets à jour la liste des cibles
    };

    const sendMessage = () => {
        if (typeChat === "global") {
            socket.emit("message-send", { content: message, userId: currentUser.id });
        } else {
            socket.emit("message-send", { content: message, userId: currentUser.id, targetId: selectedTarget.id });
        }
        setMessage("");
    };

    useEffect(() => {
        getTargets();
        socket.emit('register', currentUser.id);
        
        socket.on("message-receive", onMessageReceived);
    
        return () => {
            socket.off("message-receive", onMessageReceived);
        };
    }, [currentUser.id, onMessageReceived]); 

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
                {messages
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
