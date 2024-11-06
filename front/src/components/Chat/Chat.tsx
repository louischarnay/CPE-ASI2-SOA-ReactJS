import { Button, TextField, Select, MenuItem, FormControl, InputLabel, Box } from "@mui/material";
import Message from "../../models/message.model";
import MessageComponent from "../MessageComponent/MessageComponent";
import { useEffect, useState } from "react";
import { socket } from "../../socket/socket";
import User from "../../models/user.model";
import { useSelector } from "react-redux";
import { UserService } from "../../services/user.service";
import "./Chat.css"; // Import du fichier CSS

type ChatProps = {
    typeChat: string;
};

const Chat = ({ typeChat }: ChatProps) => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([] as Message[]);
    const [targetList, setTargetList] = useState([] as User[]);
    const [selectedTarget, setSelectedTarget] = useState({} as User);
    const [isConnected, setIsConnected] = useState(socket.connected);

    const currentUser: User = useSelector((state: any) => state.userReducer.currentUser);

    useEffect(() => {
        getTargets();

        function onConnect() {
            setIsConnected(true);
        }

        function onDisconnect() {
            setIsConnected(false);
        }

        function onMessageReceived(value: Message) {
            console.log(value);
            setMessages((prevMessages) => [...prevMessages, value]);
        }

        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);
        socket.on("message-receive", onMessageReceived);

        return () => {
            socket.off("connect", onConnect);
            socket.off("disconnect", onDisconnect);
            socket.off("message-receive", onMessageReceived);
        };
    }, []);

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
