import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { socket } from "../../socket/socket";
import User from "../../models/user.model";

const ChatSender = () => {
    const [message, setMessage] = useState("");

    const typeChat: string = useSelector((state: any) => state.messageReducer.typeChat);
    const currentUser: User = useSelector((state: any) => state.userReducer.currentUser);
    const targetId: number = useSelector((state: any) => state.messageReducer.targetId);

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

    const handleKeyDown = (event: any) => {
        if (event.key === "Enter") {
            event.preventDefault(); // Empêche un comportement par défaut (souvent utilisé dans les formulaires)
            sendMessage();
        }
    };

    return (
        <div className="input-bar">
                <TextField
                    fullWidth
                    label="Send a message"
                    variant="filled"
                    value={message}
                    onChange={(e: any) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
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
    )
}

export default ChatSender;